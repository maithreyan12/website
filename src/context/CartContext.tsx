'use client';

import React, { createContext, useContext, useState } from 'react';
import { Product, SiteConfig, productOfSize, sizeMm } from '@/lib/api';
import type { AppEntry, AppScreen } from '@/lib/appBridge';

/** Her cycle as saved in PIAX (reported by the app), so the calculator matches the tracker. */
export interface SavedCycle {
  last: string; // yyyy-mm-dd
  cycle: number;
  period: number;
}

/** Packs of each size, as chosen in the box builder. */
export interface PackSelection {
  large: number; // 240 mm
  extraLong: number; // 290 mm
  doubleXl: number; // 330 mm
}

interface CartContextType {
  /** Admin catalog and settings, shared by every section that sells or prices something. */
  products: Product[];
  config: SiteConfig;

  // Shopping and cart methods
  openCart: () => void;
  addToCart: (product: Product, quantity?: number) => void;
  addPacksToCart: (packs: PackSelection) => void;

  // Flow recommendation quiz modal
  isQuizOpen: boolean;
  openQuiz: () => void;
  closeQuiz: () => void;

  // Box builder shared selection
  customPacks: PackSelection;
  setCustomPacks: React.Dispatch<React.SetStateAction<PackSelection>>;

  // App bridge methods
  openApp: (open: AppScreen, params?: Record<string, string>) => void;
  itemCount: number;
  appEntry: AppEntry | null;
  isAppOpen: boolean;
  closeApp: () => void;
  setItemCount: (count: number) => void;
  savedCycle: SavedCycle | null;
  setSavedCycle: (cycle: SavedCycle) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

/** "<productId>:<packs>:<mm>" — the app matches by id, then by pad length. */
function bagItem(product: Product, packs: number): string {
  return `${product.id}:${packs}:${sizeMm(product)}`;
}

export const CartProvider: React.FC<{
  children: React.ReactNode;
  products: Product[];
  config: SiteConfig;
}> = ({ children, products, config }) => {
  const [appEntry, setAppEntry] = useState<AppEntry | null>(null);
  const [isAppOpen, setIsAppOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const [savedCycle, setSavedCycle] = useState<SavedCycle | null>(null);

  const [customPacks, setCustomPacks] = useState<PackSelection>({
    doubleXl: 1,
    extraLong: 1,
    large: 1,
  });

  const openApp = (open: AppScreen, params?: Record<string, string>) => {
    setAppEntry({ open, params });
    setIsAppOpen(true);
  };

  const addItems = (items: string[], mode?: 'box') => {
    if (items.length === 0) return;
    openApp('add', mode ? { items: items.join(','), mode } : { items: items.join(',') });
  };

  const addToCart = (product: Product, quantity: number = 1) => addItems([bagItem(product, quantity)]);

  // A box sets the bag to exactly these packs (0 takes a size out), so the bag
  // and checkout show the box she built, however often she taps "Add".
  const addPacksToCart = (packs: PackSelection) =>
    addItems(
      [
        { mm: 240, quantity: packs.large },
        { mm: 290, quantity: packs.extraLong },
        { mm: 330, quantity: packs.doubleXl },
      ].flatMap(({ mm, quantity }) => {
        const product = productOfSize(products, mm);
        return product ? [bagItem(product, Math.max(0, quantity))] : [];
      }),
      'box',
    );

  return (
    <CartContext.Provider
      value={{
        products,
        config,
        openCart: () => openApp('cart'),
        addToCart,
        addPacksToCart,
        isQuizOpen,
        openQuiz: () => setIsQuizOpen(true),
        closeQuiz: () => setIsQuizOpen(false),
        customPacks,
        setCustomPacks,
        openApp,
        itemCount,
        appEntry,
        isAppOpen,
        closeApp: () => setIsAppOpen(false),
        setItemCount,
        savedCycle,
        setSavedCycle,
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
