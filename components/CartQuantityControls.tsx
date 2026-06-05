'use client';

import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCart } from '@/store/useCart';
import { type Product } from '@/lib/mock-products';
import { useState } from 'react';

type AddToCartButtonProps = {
    product: Product;
    className?: string;
    size?: 'default' | 'large';
};

export default function AddToCartButton({
                                            product,
                                            className = "",
                                            size = 'large'
                                        }: AddToCartButtonProps) {

    const { addToCart, items, updateQuantity, removeFromCart, setIsCartOpen } = useCart();
    // ↑ setIsCartOpen нужно будет добавить в store позже

    const cartItem = items.find(item => item.id === product.id);
    const isInCart = !!cartItem;

    const handleAdd = () => {
        addToCart(product);
    };

    const handleDecrease = () => {
        if (cartItem?.quantity === 1) {
            removeFromCart(product.id);
        } else if (cartItem) {
            updateQuantity(product.id, cartItem.quantity - 1);
        }
    };

    if (!isInCart) {
        return (
            <button
                onClick={handleAdd}
                className={`w-full bg-white hover:bg-yellow-400 active:bg-yellow-500 text-black font-semibold 
          ${size === 'large' ? 'text-xl py-5' : 'py-4'} 
          rounded-3xl flex items-center justify-center gap-3 transition-all ${className}`}
            >
                <ShoppingCart className={size === 'large' ? 'w-7 h-7' : 'w-5 h-5'} />
                Добавить в корзину
            </button>
        );
    }

    return (
        <div className={`w-full ${className}`}>
            {/* Контроллер количества */}
            <div className="flex items-center justify-center gap-8 bg-zinc-900 border border-zinc-700 rounded-3xl py-5 mb-4">
                <button
                    onClick={handleDecrease}
                    className="w-12 h-12 flex items-center justify-center hover:bg-zinc-800 rounded-2xl transition-colors active:scale-90"
                >
                    <Minus className="w-6 h-6" />
                </button>

                <span className="text-4xl font-semibold w-16 text-center">
          {cartItem.quantity}
        </span>

                <button
                    onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-zinc-800 rounded-2xl transition-colors active:scale-90"
                >
                    <Plus className="w-6 h-6" />
                </button>
            </div>

            {/* Кнопка открытия корзины */}
            <button
                onClick={() => setIsCartOpen(true)}
                className="w-full text-center bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-4 rounded-3xl transition-colors"
            >
                Перейти в корзину →
            </button>
        </div>
    );
}