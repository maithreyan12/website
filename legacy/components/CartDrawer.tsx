'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { submitOrder } from '@/lib/api';
import styles from './CartDrawer.module.css';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discount,
    total,
    freeShippingThreshold,
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  // Checkout modal state
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cod'>('online');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccessId, setOrderSuccessId] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const freeShippingDiff = Math.max(0, freeShippingThreshold - subtotal);
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 40;
  const promoDiscount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const finalTotal = subtotal - promoDiscount + shippingFee;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'CARE25') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try CARE25');
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      alert('Please fill in your name, phone number, and delivery address.');
      return;
    }

    setIsSubmitting(true);
    const orderItems = cart.map((item) => ({
      product_id: item.productId === 'custom_piax_box' ? 'prod_pad_xl_290' : item.productId,
      quantity: item.quantity,
      selected_size: item.size || '290 mm',
    }));

    const result = await submitOrder({
      items: orderItems,
      delivery_address: address,
      customer_name: name,
      customer_phone: phone,
      payment_method: paymentMethod,
    });

    setIsSubmitting(false);
    if (result.success) {
      setOrderSuccessId(result.orderId || 'PIAX-' + Math.floor(100000 + Math.random() * 900000));
      clearCart();
    } else {
      alert(`Order error: ${result.error || 'Please try again.'}`);
    }
  };

  return (
    <div className={styles.overlay} onClick={closeCart}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className={styles.drawerHeader}>
          <div className={styles.headerLeft}>
            <h3>Your Bag</h3>
            <span className={styles.itemCountBadge}>
              {cart.reduce((acc, i) => acc + i.quantity, 0)} items
            </span>
          </div>
          <button className={styles.closeBtn} onClick={closeCart} aria-label="Close cart">
            ✕
          </button>
        </div>

        {/* Success Confirmation View */}
        {orderSuccessId ? (
          <div className={styles.successView}>
            <div className={styles.successIcon}>🎉</div>
            <h3>Order Confirmed!</h3>
            <span className={styles.orderIdBadge}>Order #{orderSuccessId}</span>
            <p>
              Thank you, {name}! Your PIAX order is logged in our central fulfillment system. Our
              delivery partners have received the dispatch notice.
            </p>
            <div className={styles.successCard}>
              <span>🛵 Live Tracking Available</span>
              <p>Download the PIAX Partner/Customer App to track your live rider location.</p>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => {
                setOrderSuccessId(null);
                setIsCheckingOut(false);
                closeCart();
              }}
              style={{ width: '100%', marginTop: '16px' }}
            >
              Continue Browsing
            </button>
          </div>
        ) : isCheckingOut ? (
          /* Direct Checkout Form */
          <div className={styles.checkoutFormView}>
            <div className={styles.checkoutHeaderRow}>
              <button
                className={styles.backBtn}
                onClick={() => setIsCheckingOut(false)}
              >
                ← Back to Bag
              </button>
              <h4>Direct Checkout</h4>
            </div>

            <form onSubmit={handlePlaceOrder} className={styles.formFields}>
              <div className={styles.field}>
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Kaavya Raman"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Phone Number (for Delivery SMS / Tracking)</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Delivery Street Address & Pincode</label>
                <textarea
                  rows={3}
                  placeholder="Flat / House No, Apartment Name, Street, Landmark, Pincode"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Payment Method</label>
                <div className={styles.paymentMethods}>
                  <label
                    className={`${styles.payLabel} ${
                      paymentMethod === 'online' ? styles.payActive : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'online'}
                      onChange={() => setPaymentMethod('online')}
                    />
                    <span>UPI / Cards / NetBanking (Razorpay)</span>
                  </label>
                  <label
                    className={`${styles.payLabel} ${
                      paymentMethod === 'cod' ? styles.payActive : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                    />
                    <span>Cash on Delivery (COD)</span>
                  </label>
                </div>
              </div>

              <div className={styles.orderSummarySnippet}>
                <div className={styles.summaryRow}>
                  <span>Total Amount Payable:</span>
                  <strong>₹{finalTotal}</strong>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={isSubmitting}
                style={{ width: '100%', marginTop: '10px' }}
              >
                {isSubmitting ? 'Placing Order...' : `Place Order (₹${finalTotal}) →`}
              </button>
            </form>
          </div>
        ) : (
          /* Normal Cart Bag View */
          <>
            {/* Free Shipping Progress */}
            <div className={styles.shippingBarContainer}>
              <div className={styles.shippingBarHeader}>
                {freeShippingDiff === 0 ? (
                  <span>🎉 You have unlocked <strong>FREE Delivery!</strong></span>
                ) : (
                  <span>
                    Add <strong>₹{freeShippingDiff}</strong> more for Free Shipping
                  </span>
                )}
              </div>
              <div className={styles.progressBarBg}>
                <div
                  className={styles.progressBarFill}
                  style={{
                    width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Cart Items Scroll Area */}
            <div className={styles.itemsList}>
              {cart.length === 0 ? (
                <div className={styles.emptyCart}>
                  <span className={styles.emptyIcon}>🛍️</span>
                  <h4>Your bag is empty</h4>
                  <p>Customize a period box or pick a standard pack to get started.</p>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      closeCart();
                      window.location.href = '#custom-box';
                    }}
                    style={{ marginTop: '12px' }}
                  >
                    Build Custom Box →
                  </button>
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
                    />

                    <div className={styles.itemDetails}>
                      <div className={styles.itemTopRow}>
                        <h4 className={styles.itemName}>{item.name}</h4>
                        <button
                          className={styles.removeBtn}
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove item"
                        >
                          ✕
                        </button>
                      </div>

                      {item.size && (
                        <span className={styles.itemSizeDesc}>{item.size}</span>
                      )}

                      <div className={styles.itemBottomRow}>
                        <div className={styles.qtyControl}>
                          <button
                            className={styles.qtyBtn}
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            −
                          </button>
                          <span className={styles.qtyNum}>{item.quantity}</span>
                          <button
                            className={styles.qtyBtn}
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            +
                          </button>
                        </div>

                        <div className={styles.itemPriceCol}>
                          <span className={styles.itemPrice}>
                            ₹{item.price * item.quantity}
                          </span>
                          {item.originalPrice && (
                            <span className={styles.itemOrigPrice}>
                              ₹{item.originalPrice * item.quantity}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer & Checkout Action */}
            {cart.length > 0 && (
              <div className={styles.drawerFooter}>
                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className={styles.promoForm}>
                  <input
                    type="text"
                    placeholder="Coupon (try CARE25)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className={styles.promoInput}
                  />
                  <button type="submit" className={styles.applyBtn}>
                    Apply
                  </button>
                </form>
                {promoApplied && (
                  <span className={styles.promoSuccess}>✓ CARE25 applied (10% extra savings)</span>
                )}
                {promoError && <span className={styles.promoErr}>{promoError}</span>}

                {/* Subtotals */}
                <div className={styles.totalsBox}>
                  <div className={styles.totalRow}>
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>

                  {promoApplied && (
                    <div className={styles.totalRowSavings}>
                      <span>Promo Discount</span>
                      <span>− ₹{promoDiscount}</span>
                    </div>
                  )}

                  <div className={styles.totalRow}>
                    <span>Shipping</span>
                    <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                  </div>

                  <div className={styles.finalTotalRow}>
                    <strong>Estimated Total</strong>
                    <strong>₹{finalTotal}</strong>
                  </div>
                </div>

                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => setIsCheckingOut(true)}
                  style={{ width: '100%' }}
                >
                  Proceed to Checkout (₹{finalTotal}) →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
