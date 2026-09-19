'use client';

/**
 * Browser-side PIAX API client.
 *
 * Mirrors the app's ApiClient call-for-call so a website order goes through
 * exactly the same backend flow as an app order:
 *   POST /auth/device → POST /users/me/addresses → DELETE + POST /cart
 *   → POST /payments/razorpay/create-order → POST /orders
 * Prices, discount and delivery fee are always the backend's, never the site's.
 */

import { API_BASE_URL, Product } from './api';

const DEVICE_ID_KEY = 'piax_device_id';
const DEVICE_SECRET_KEY = 'piax_device_secret';
const TOKEN_KEY = 'piax_access_token';
const LAST_ORDER_KEY = 'piax_last_order_id';

export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

function randomHex(bytes: number): string {
  const buf = new Uint8Array(bytes);
  crypto.getRandomValues(buf);
  return Array.from(buf, (b) => b.toString(16).padStart(2, '0')).join('');
}

function store(key: string, value?: string | null): string | null {
  try {
    if (value === undefined) return localStorage.getItem(key);
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    // Private mode / blocked storage: the session still works, it just isn't remembered.
  }
  return value ?? null;
}

/** Registers this browser like an app install (the backend requires a 16+ char id and 32+ char secret). */
async function deviceLogin(): Promise<string> {
  let deviceId = store(DEVICE_ID_KEY);
  let secret = store(DEVICE_SECRET_KEY);
  if (!deviceId || !secret) {
    deviceId = store(DEVICE_ID_KEY, `web_${randomHex(16)}`)!;
    secret = store(DEVICE_SECRET_KEY, randomHex(32))!;
  }
  const res = await fetch(`${API_BASE_URL}/auth/device`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ device_id: deviceId, device_secret: secret, platform: 'web', name: 'PIAX Web' }),
  });
  if (!res.ok) throw new ApiError('Could not connect to PIAX. Please try again.', res.status);
  const data = await res.json();
  store(TOKEN_KEY, data.access_token);
  return data.access_token;
}

async function request<T>(path: string, init: RequestInit = {}, retried = false): Promise<T> {
  const token = store(TOKEN_KEY) || (await deviceLogin());
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...init.headers },
  });
  if (res.status === 401 && !retried) {
    store(TOKEN_KEY, null);
    return request<T>(path, init, true);
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const detail = typeof body.detail === 'string' ? body.detail : 'Something went wrong. Please try again.';
    throw new ApiError(detail, res.status);
  }
  return (res.status === 204 ? undefined : await res.json()) as T;
}

// ------------------------------------------------------------------ catalog

/** Live products, so the bag always orders the backend's current IDs and prices. */
export async function getLiveProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/products`);
  if (!res.ok) throw new ApiError('Could not load the latest prices.', res.status);
  return res.json();
}

// ------------------------------------------------------------------ checkout

export interface AddressInput {
  recipient_name: string;
  recipient_phone: string;
  flat_house_no: string;
  area_road: string;
  directions: string;
  latitude?: number;
  longitude?: number;
}

export async function saveAddress(address: AddressInput): Promise<{ id: string }> {
  return request('/users/me/addresses', {
    method: 'POST',
    body: JSON.stringify({ label: 'Web order', ...address }),
  });
}

/** Replaces the server cart with the bag's contents (the order is built from the server cart). */
export async function syncServerCart(lines: { product: Product; quantity: number }[]): Promise<void> {
  await request('/cart', { method: 'DELETE' });
  for (const { product, quantity } of lines) {
    await request('/cart', {
      method: 'POST',
      body: JSON.stringify({ product_id: product.id, quantity, selected_size: product.size }),
    });
  }
}

export interface PaymentProof {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayOrder {
  order_id: string;
  amount: number;
  currency: string;
  key_id: string;
  name: string;
  description: string;
  mock: boolean;
}

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

function loadRazorpayScript(): Promise<void> {
  if (window.Razorpay) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
    s.onload = () => resolve();
    s.onerror = () => reject(new ApiError('Could not open the payment window. Check your connection.', 0));
    document.body.appendChild(s);
  });
}

/**
 * Takes payment for `amount` through Razorpay. While the backend has no live
 * Razorpay keys it hands out test orders (order_test_…); those are completed
 * without charging, exactly as the app's test checkout does.
 */
export async function pay(
  amount: number,
  prefill: { name: string; contact: string },
  description: string,
): Promise<PaymentProof> {
  const order = await request<RazorpayOrder>('/payments/razorpay/create-order', {
    method: 'POST',
    body: JSON.stringify({ amount }),
  });

  if (order.mock) {
    return {
      razorpay_order_id: order.order_id,
      razorpay_payment_id: `pay_${randomHex(7)}`,
      razorpay_signature: randomHex(16),
    };
  }

  await loadRazorpayScript();
  return new Promise<PaymentProof>((resolve, reject) => {
    const checkout = new window.Razorpay!({
      key: order.key_id,
      order_id: order.order_id,
      amount: order.amount,
      currency: order.currency,
      name: 'PIAX',
      description,
      prefill,
      theme: { color: '#007f6d' },
      handler: (res: PaymentProof) => resolve(res),
      modal: { ondismiss: () => reject(new ApiError('Payment was cancelled. Your bag is saved.', 0)) },
    });
    checkout.open();
  });
}

// ------------------------------------------------------------------ orders

export interface OrderEvent {
  status: string;
  at: string;
  note: string;
}

export interface Order {
  id: string;
  order_status: string;
  total: number;
  subtotal: number;
  discount: number;
  delivery_charge: number;
  payment_method: string;
  payment_status: string;
  estimated_arrival_minutes: number;
  recipient_name: string;
  delivery_code: string | null;
  pickup_store: { name: string; address: string } | null;
  delivery_partner: { name: string; phone: string | null; vehicle_type: string; vehicle_number: string } | null;
  timeline: OrderEvent[];
  can_cancel: boolean;
  items: { product: Product; quantity: number; unit_price: number }[];
}

export async function placeOrder(payload: {
  address_id: string;
  payment_method: 'Razorpay' | 'COD';
  delivery_instructions: string[];
} & Partial<PaymentProof>): Promise<Order> {
  const order = await request<Order>('/orders', { method: 'POST', body: JSON.stringify(payload) });
  store(LAST_ORDER_KEY, order.id);
  return order;
}

export async function getOrder(orderId: string): Promise<Order> {
  return request<Order>(`/orders/${orderId}`);
}

export async function cancelOrder(orderId: string, reason: string): Promise<Order> {
  return request<Order>(`/orders/${orderId}/cancel`, { method: 'POST', body: JSON.stringify({ reason }) });
}

export function lastOrderId(): string | null {
  return store(LAST_ORDER_KEY);
}

export function forgetLastOrder(): void {
  store(LAST_ORDER_KEY, null);
}

// ------------------------------------------------------------------ subscriptions

export async function subscribe(planId: string, payment: PaymentProof): Promise<{ id: string; status: string }> {
  return request('/subscriptions/subscribe', {
    method: 'POST',
    body: JSON.stringify({ plan_id: planId, ...payment }),
  });
}
