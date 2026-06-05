'use client';

import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCart } from '@/store/useCart';
import { type Product } from '@/lib/mock-products';

type CartQuantityControlsProps = {
    product: Product;
    className?: string;
};

export default function CartQuantityControls({
                                                 product,
                                                 className = '',
                                             }: CartQuantityControlsProps) {

    const { addToCart, items, updateQuantity, removeFromCart } = useCart();

    const cartItem = items.find(item => item.id === product.id);
    const isInCart = !!cartItem;

    const handleAdd = () => addToCart(product);

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
                className={`w-full bg-white hover:bg-yellow-400 active:bg-yellow-500 
                    text-black font-semibold py-4 rounded-3xl 
                    flex items-center justify-center gap-3 transition-all text-base ${className}`}
            >
                <ShoppingCart className="w-5 h-5" />
                Добавить в корзину
            </button>
        );
    }

    // Компактный счётчик
    return (
        <div className={`w-full ${className}`}>
            <div className="flex items-center justify-center gap-6 bg-zinc-900 border border-zinc-700 rounded-3xl py-3"> {/* py-3 — комфортная высота */}
                <button
                    onClick={handleDecrease}
                    className="w-10 h-10 flex items-center justify-center hover:bg-zinc-800 rounded-2xl transition-colors active:scale-90"
                >
                    <Minus className="w-5 h-5" />
                </button>

                <span className="text-xl font-semibold w-12 text-center">
                    {cartItem.quantity}
                </span>

                <button
                    onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-zinc-800 rounded-2xl transition-colors active:scale-90"
                >
                    <Plus className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}