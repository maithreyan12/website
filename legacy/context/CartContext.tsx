'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '@/lib/api';

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, quantity?: number, selectedSize?: string) => void;
  addCustomBoxToCart: (config: {
    large: number;
    extraLong: number;
    doubleXl: number;
    isSubscription: boolean;
  }) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  subtotal: number;
  discount: number;
  total: number;
  itemCount: number;
  freeShippingThreshold: number;
  isQuizOpen: boolean;
  openQuiz: () => void;
  closeQuiz: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('piax_web_cart');
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading cart', e);
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('piax_web_cart', JSON.stringify(cart));
      } catch (e) {
        console.error('Error saving cart', e);
      }
    }
  }, [cart, isLoaded]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openQuiz = () => setIsQuizOpen(true);
  const closeQuiz = () => setIsQuizOpen(false);

  const addToCart = (product: Product, quantity: number = 1, selectedSize?: string) => {
    const size = selectedSize || product.size;
    const itemId = `${product.id}_${size}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id,
          name: product.name,
          size: size,
          price: product.price,
          originalPrice: product.original_price,
          quantity: quantity,
          imageUrl: product.image_url || '/images/home_product_pad.png',
        },
      ];
    });
    setIsCartOpen(true);
  };

  const addCustomBoxToCart = (config: {
    large: number;
    extraLong: number;
    doubleXl: number;
    isSubscription: boolean;
  }) => {
    const totalPads = config.large + config.extraLong + config.doubleXl;
    if (totalPads <= 0) return;

    // Pricing calculation based on unit cost
    // Large (240mm): ₹14.8/pad; XL (290mm): ₹16.5/pad; XXL (330mm): ₹19.8/pad
    const basePrice = Math.round(
      config.large * 14.8 + config.extraLong * 16.5 + config.doubleXl * 19.8
    );
    // 25% discount for auto-repeat subscriptions (like Nua's model)
    const finalPrice = config.isSubscription ? Math.round(basePrice * 0.75) : basePrice;

    const itemId = `custom_box_${config.large}_${config.extraLong}_${config.doubleXl}_${
      config.isSubscription ? 'sub' : 'onetime'
    }`;

    const title = config.isSubscription
      ? `Custom Box (${totalPads} Pads) · Auto-Repeat (Save 25%)`
      : `Custom Box (${totalPads} Pads) · One-Time`;

    const customSizeDesc = [
      config.doubleXl > 0 ? `${config.doubleXl} Heavy (330mm)` : null,
      config.extraLong > 0 ? `${config.extraLong} Medium (290mm)` : null,
      config.large > 0 ? `${config.large} Light (240mm)` : null,
    ]
      .filter(Boolean)
      .join(' + ');

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: 'custom_piax_box',
          name: title,
          size: customSizeDesc,
          price: finalPrice,
          originalPrice: config.isSubscription ? basePrice : undefined,
          quantity: 1,
          imageUrl: '/images/home_savers_six.png',
          isCustomBox: true,
          customDetails: config,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const originalSubtotal = cart.reduce(
    (acc, item) => acc + (item.originalPrice || item.price) * item.quantity,
    0
  );
  const discount = Math.max(0, originalSubtotal - subtotal);
  const freeShippingThreshold = 299;
  const total = subtotal;
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        addCustomBoxToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        discount,
        total,
        itemCount,
        freeShippingThreshold,
        isQuizOpen,
        openQuiz,
        closeQuiz,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
