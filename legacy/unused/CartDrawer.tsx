'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatRupees, orderTotals, sizeMm, type Product } from '@/lib/api';
import {
  ApiError,
  cancelOrder,
  forgetLastOrder,
  getLiveProducts,
  getOrder,
  lastOrderId,
  pay,
  placeOrder,
  saveAddress,
  syncServerCart,
  type Order,
} from '@/lib/client';
import styles from './CartDrawer.module.css';

type View = 'bag' | 'checkout' | 'tracking';

// Same quick notes the app offers at checkout.
const INSTRUCTIONS = ['Leave at the door', 'Avoid calling', 'Call on arrival'];

const DETAILS_KEY = 'piax_checkout_details';

interface Details {
  name: string;
  phone: string;
  flat: string;
  area: string;
  landmark: string;
}

const EMPTY_DETAILS: Details = { name: '', phone: '', flat: '', area: '', landmark: '' };

const STATUS_STEPS = [
  { key: 'Placed', label: 'Order placed' },
  { key: 'Confirmed', label: 'Store is packing it' },
  { key: 'OutForDelivery', label: 'On the way' },
  { key: 'Arrived', label: 'At your door' },
  { key: 'Delivered', label: 'Delivered' },
];

function friendlyError(err: unknown): string {
  if (err instanceof ApiError) return err.message;
  return 'We could not reach PIAX. Please check your internet and try again.';
}

export const CartDrawer: React.FC = () => {
  const {
    cart,
    config,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    refreshPrices,
    clearCart,
    subtotal,
    discount,
    delivery,
    total,
  } = useCart();

  const [view, setView] = useState<View>('bag');
  const [details, setDetails] = useState<Details>(EMPTY_DETAILS);
  const [remember, setRemember] = useState(true);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [instructions, setInstructions] = useState<string[]>([]);
  const [plainPackaging, setPlainPackaging] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'Razorpay' | 'COD'>('Razorpay');
  const [progress, setProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [savedOrderId, setSavedOrderId] = useState<string | null>(null);

  // Details she chose to remember last time, so a repeat order is two taps.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DETAILS_KEY);
      if (saved) setDetails({ ...EMPTY_DETAILS, ...JSON.parse(saved) });
    } catch {
      // Nothing remembered.
    }
  }, []);

  useEffect(() => {
    if (isCartOpen) setSavedOrderId(lastOrderId());
  }, [isCartOpen]);

  // Live tracking: refresh the order until it is delivered or cancelled.
  useEffect(() => {
    if (view !== 'tracking' || !order || ['Delivered', 'Cancelled'].includes(order.order_status)) return;
    const timer = setInterval(() => {
      getOrder(order.id).then(setOrder).catch(() => {});
    }, 15000);
    return () => clearInterval(timer);
  }, [view, order]);

  if (!isCartOpen) return null;

  const busy = progress !== null;
  const set = (key: keyof Details) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setDetails((d) => ({ ...d, [key]: e.target.value }));

  const shareLocation = () => {
    if (!navigator.geolocation) {
      setError('Your browser cannot share location. Your typed address is enough.');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        setLocating(false);
      },
      () => {
        setLocating(false);
        setError('Location was not shared. That is okay — we will use your typed address.');
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const openTracking = async (orderId: string) => {
    setError(null);
    setProgress('Loading your order…');
    try {
      setOrder(await getOrder(orderId));
      setView('tracking');
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) {
        forgetLastOrder();
        setSavedOrderId(null);
      }
      setError(friendlyError(err));
    } finally {
      setProgress(null);
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const phoneDigits = details.phone.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '');
    if (phoneDigits.length !== 10) {
      setError('Please enter a 10-digit mobile number so the delivery partner can reach you.');
      return;
    }

    try {
      // 1. Order at today's catalog prices (the backend charges these, not the saved bag).
      setProgress('Checking the latest prices…');
      const live = await getLiveProducts();
      const lines: { product: Product; quantity: number }[] = [];
      for (const item of cart) {
        const product = live.find((p) => sizeMm(p) === sizeMm(item) && !p.is_upcoming);
        if (!product) {
          removeFromCart(item.id);
          setError(`${item.name} is out of stock right now, so we removed it. Please review your bag.`);
          setView('bag');
          return;
        }
        lines.push({ product, quantity: item.quantity });
      }
      if (lines.some((l) => cart.some((i) => sizeMm(i) === sizeMm(l.product) && i.price !== l.product.price))) {
        refreshPrices(live);
        setError('A price has just been updated. Please check the new total and tap pay again.');
        return;
      }
      const amount = orderTotals(
        lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0),
        config,
      ).total;

      // 2. Same address + cart calls the app makes.
      setProgress('Saving your address…');
      const address = await saveAddress({
        recipient_name: details.name.trim(),
        recipient_phone: `+91${phoneDigits}`,
        flat_house_no: details.flat.trim(),
        area_road: details.area.trim(),
        directions: details.landmark.trim(),
        ...(location ?? {}),
      });
      try {
        if (remember) localStorage.setItem(DETAILS_KEY, JSON.stringify(details));
        else localStorage.removeItem(DETAILS_KEY);
      } catch {
        // Not remembered; the order still goes through.
      }
      await syncServerCart(lines);

      // 3. Payment, then the order itself.
      let proof = {};
      if (paymentMethod === 'Razorpay') {
        setProgress('Opening secure payment…');
        proof = await pay(amount, { name: details.name, contact: phoneDigits }, 'PIAX pads order');
      }
      setProgress('Placing your order…');
      const placed = await placeOrder({
        address_id: address.id,
        payment_method: paymentMethod,
        delivery_instructions: [...instructions, ...(plainPackaging ? ['Plain packaging'] : [])],
        ...proof,
      });

      clearCart();
      setOrder(placed);
      setSavedOrderId(placed.id);
      setView('tracking');
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setProgress(null);
    }
  };

  const handleCancel = async () => {
    if (!order || !window.confirm('Cancel this order?')) return;
    setProgress('Cancelling…');
    try {
      setOrder(await cancelOrder(order.id, 'Cancelled from website'));
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setProgress(null);
    }
  };

  const close = () => {
    setError(null);
    if (view === 'tracking') setView('bag');
    closeCart();
  };

  const stepIndex = order ? STATUS_STEPS.findIndex((s) => s.key === order.order_status) : -1;

  return (
    <div className={styles.overlay} onClick={close}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Your bag">
        <div className={styles.drawerHeader}>
          <div className={styles.headerLeft}>
            <h3>{view === 'tracking' ? 'Your order' : 'Your Bag'}</h3>
            {view !== 'tracking' && (
              <span className={styles.itemCountBadge}>
                {cart.reduce((acc, i) => acc + i.quantity, 0)} packs
              </span>
            )}
          </div>
          <button className={styles.closeBtn} onClick={close} aria-label="Close">
            ✕
          </button>
        </div>

        {error && (
          <div className={styles.errorBox} role="alert">
            {error}
          </div>
        )}

        {view === 'tracking' && order ? (
          <div className={styles.successView}>
            <div className={styles.successIcon}>{order.order_status === 'Cancelled' ? '🛑' : '💚'}</div>
            <h3>
              {order.order_status === 'Cancelled'
                ? 'Order cancelled'
                : order.order_status === 'Delivered'
                  ? 'Delivered. Take care!'
                  : `Arriving in about ${order.estimated_arrival_minutes} min`}
            </h3>
            <span className={styles.orderIdBadge}>Order #{order.id.slice(0, 8).toUpperCase()}</span>

            {order.order_status !== 'Cancelled' && (
              <ol className={styles.timeline}>
                {STATUS_STEPS.map((s, i) => (
                  <li key={s.key} className={i <= stepIndex ? styles.stepDone : ''}>
                    <span className={styles.stepDot} />
                    {s.label}
                  </li>
                ))}
              </ol>
            )}

            {order.delivery_code && order.order_status !== 'Delivered' && order.order_status !== 'Cancelled' && (
              <div className={styles.successCard}>
                <span>🔒 Delivery code: <strong>{order.delivery_code}</strong></span>
                <p>Share this with your delivery partner when they arrive.</p>
              </div>
            )}

            {order.delivery_partner && (
              <div className={styles.successCard}>
                <span>🛵 {order.delivery_partner.name}</span>
                <p>
                  {order.delivery_partner.vehicle_type} {order.delivery_partner.vehicle_number}
                  {order.delivery_partner.phone && (
                    <>
                      {' · '}
                      <a href={`tel:${order.delivery_partner.phone}`}>Call</a>
                    </>
                  )}
                </p>
              </div>
            )}

            {order.pickup_store && (
              <p className={styles.mutedNote}>Packed at {order.pickup_store.name}</p>
            )}

            <div className={styles.totalsBox} style={{ width: '100%' }}>
              <div className={styles.totalRow}>
                <span>Paid by</span>
                <span>
                  {order.payment_method === 'COD' ? 'Cash / UPI on delivery' : 'Online'}
                  {order.payment_method !== 'COD' && order.payment_status === 'paid' ? ' ✓' : ''}
                </span>
              </div>
              <div className={styles.finalTotalRow}>
                <strong>Total</strong>
                <strong>{formatRupees(order.total)}</strong>
              </div>
            </div>

            {order.can_cancel && (
              <button className="btn btn-secondary" onClick={handleCancel} disabled={busy} style={{ width: '100%' }}>
                Cancel order
              </button>
            )}
            <button
              className="btn btn-primary"
              onClick={() => {
                setView('bag');
                closeCart();
              }}
              style={{ width: '100%', marginTop: '8px' }}
            >
              Continue browsing
            </button>
          </div>
        ) : view === 'checkout' ? (
          <div className={styles.checkoutFormView}>
            <div className={styles.checkoutHeaderRow}>
              <button className={styles.backBtn} onClick={() => setView('bag')} disabled={busy}>
                ← Back to Bag
              </button>
              <h4>Delivery details</h4>
            </div>

            <form onSubmit={handlePlaceOrder} className={styles.formFields}>
              <div className={styles.field}>
                <label htmlFor="co-name">Name</label>
                <input id="co-name" autoComplete="name" value={details.name} onChange={set('name')} required />
              </div>

              <div className={styles.field}>
                <label htmlFor="co-phone">Mobile number</label>
                <input
                  id="co-phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="10-digit mobile number"
                  value={details.phone}
                  onChange={set('phone')}
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="co-flat">Flat / house no., building</label>
                <input id="co-flat" autoComplete="address-line1" value={details.flat} onChange={set('flat')} required />
              </div>

              <div className={styles.field}>
                <label htmlFor="co-area">Area, street and pincode</label>
                <input id="co-area" autoComplete="address-line2" value={details.area} onChange={set('area')} required />
              </div>

              <div className={styles.field}>
                <label htmlFor="co-landmark">Landmark (optional)</label>
                <input id="co-landmark" value={details.landmark} onChange={set('landmark')} />
              </div>

              <button type="button" className={styles.locationBtn} onClick={shareLocation} disabled={locating}>
                {location ? '📍 Location added ✓' : locating ? 'Finding you…' : '📍 Use my current location (faster delivery)'}
              </button>

              <div className={styles.field}>
                <label>Delivery notes</label>
                <div className={styles.chips}>
                  {INSTRUCTIONS.map((note) => (
                    <button
                      type="button"
                      key={note}
                      className={`${styles.chip} ${instructions.includes(note) ? styles.chipActive : ''}`}
                      onClick={() =>
                        setInstructions((list) =>
                          list.includes(note) ? list.filter((n) => n !== note) : [...list, note],
                        )
                      }
                    >
                      {note}
                    </button>
                  ))}
                </div>
                <label className={styles.checkRow}>
                  <input type="checkbox" checked={plainPackaging} onChange={(e) => setPlainPackaging(e.target.checked)} />
                  Plain packaging, no brand on the outside
                </label>
              </div>

              <div className={styles.field}>
                <label>Payment</label>
                <div className={styles.paymentMethods}>
                  <label className={`${styles.payLabel} ${paymentMethod === 'Razorpay' ? styles.payActive : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'Razorpay'}
                      onChange={() => setPaymentMethod('Razorpay')}
                    />
                    <span>UPI / Cards / NetBanking</span>
                  </label>
                  <label className={`${styles.payLabel} ${paymentMethod === 'COD' ? styles.payActive : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                    />
                    <span>Cash / UPI on delivery</span>
                  </label>
                </div>
              </div>

              <label className={styles.checkRow}>
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                Remember my details on this device
              </label>

              <div className={styles.orderSummarySnippet}>
                <div className={styles.summaryRow}>
                  <span>Total to pay:</span>
                  <strong>{formatRupees(total)}</strong>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={busy}
                style={{ width: '100%', marginTop: '10px', whiteSpace: 'normal' }}
              >
                {progress ?? (paymentMethod === 'COD' ? `Place order · ${formatRupees(total)}` : `Pay ${formatRupees(total)} & place order`)}
              </button>
            </form>
          </div>
        ) : (
          <>
            <div className={styles.itemsList}>
              {cart.length === 0 ? (
                <div className={styles.emptyCart}>
                  <span className={styles.emptyIcon}>🛍️</span>
                  <h4>Your bag is empty</h4>
                  <p>Build your box or pick a pack to get started.</p>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      closeCart();
                      window.location.href = '#custom-box';
                    }}
                    style={{ marginTop: '12px' }}
                  >
                    Build Your Box →
                  </button>
                  {savedOrderId && (
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => openTracking(savedOrderId)}
                      disabled={busy}
                      style={{ marginTop: '8px' }}
                    >
                      {progress ?? 'Track my last order'}
                    </button>
                  )}
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <Image
                      src={item.imageUrl || '/images/home_product_pad.png'}
                      alt={item.name}
                      width={70}
                      height={70}
                      className={styles.itemThumb}
                      unoptimized={/^https?:/.test(item.imageUrl ?? '')}
                    />

                    <div className={styles.itemDetails}>
                      <div className={styles.itemTopRow}>
                        <h4 className={styles.itemName}>{item.name}</h4>
                        <button
                          className={styles.removeBtn}
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.name}`}
                        >
                          ✕
                        </button>
                      </div>

                      <span className={styles.itemSizeDesc}>{item.size} · pack of 6</span>

                      <div className={styles.itemBottomRow}>
                        <div className={styles.qtyControl}>
                          <button
                            className={styles.qtyBtn}
                            onClick={() => updateQuantity(item.id, -1)}
                            aria-label="One pack fewer"
                          >
                            −
                          </button>
                          <span className={styles.qtyNum}>{item.quantity}</span>
                          <button
                            className={styles.qtyBtn}
                            onClick={() => updateQuantity(item.id, 1)}
                            aria-label="One pack more"
                          >
                            +
                          </button>
                        </div>

                        <div className={styles.itemPriceCol}>
                          <span className={styles.itemPrice}>{formatRupees(item.price * item.quantity)}</span>
                          {item.originalPrice && (
                            <span className={styles.itemOrigPrice}>
                              {formatRupees(item.originalPrice * item.quantity)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className={styles.drawerFooter}>
                <div className={styles.totalsBox}>
                  <div className={styles.totalRow}>
                    <span>Subtotal</span>
                    <span>{formatRupees(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className={styles.totalRowSavings}>
                      <span>Discount (applied automatically)</span>
                      <span>− {formatRupees(discount)}</span>
                    </div>
                  )}
                  <div className={styles.totalRow}>
                    <span>Delivery</span>
                    <span>{delivery === 0 ? 'FREE' : formatRupees(delivery)}</span>
                  </div>
                  <div className={styles.finalTotalRow}>
                    <strong>Total</strong>
                    <strong>{formatRupees(total)}</strong>
                  </div>
                </div>

                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => {
                    setError(null);
                    setView('checkout');
                  }}
                  style={{ width: '100%' }}
                >
                  Checkout · {formatRupees(total)} →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
