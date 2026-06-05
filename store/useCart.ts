// store/useCart.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Product } from '@/lib/mock-products';

type CartItem = Product & {
    quantity: number;
};

type CartStore = {
    items: CartItem[];
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    totalPrice: () => number;
    totalItems: () => number;
};

export const useCart = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],

            addToCart: (product, quantity = 1) => {
                set((state) => {
                    const existing = state.items.find((item) => item.id === product.id);

                    if (existing) {
                        return {
                            items: state.items.map((item) =>
                                item.id === product.id
                                    ? { ...item, quantity: item.quantity + quantity }
                                    : item
                            ),
                        };
                    } else {
                        return {
                            items: [...state.items, { ...product, quantity }],
                        };
                    }
                });
            },

            removeFromCart: (id) =>
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id),
                })),

            updateQuantity: (id, quantity) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === id ? { ...item, quantity } : item
                    ),
                })),

            clearCart: () => set({ items: [] }),

            totalPrice: () => {
                return get().items.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                );
            },

            totalItems: () => {
                return get().items.reduce((sum, item) => sum + item.quantity, 0);
            },
        }),
        {
            name: 'electro-cart',
        }
    )
);