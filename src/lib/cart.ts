import { useEffect, useState } from "react";

export interface CartItem {
  key: string; // deviceId + variant signature
  deviceId: string;
  model: string;
  storage: string;
  color: string;
  price: number;
  image: string;
  qty: number;
}

const STORAGE_KEY = "vault_cart_v1";
const EVENT = "vault:cart";

function read(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function write(items: CartItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function addToCart(item: Omit<CartItem, "qty"> & { qty?: number }) {
  const items = read();
  const existing = items.find((i) => i.key === item.key);
  if (existing) {
    existing.qty += item.qty ?? 1;
  } else {
    items.push({ ...item, qty: item.qty ?? 1 });
  }
  write(items);
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(read());
    const sync = () => setItems(read());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const count = items.reduce((n, i) => n + i.qty, 0);
  return { items, count };
}
