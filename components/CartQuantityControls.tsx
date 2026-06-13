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
                className={`w-full mt-5 bg-zinc-950 hover:bg-zinc-900 
                border-2 border-yellow-400 hover:border-yellow-300
                text-yellow-600 hover:text-yellow-200 font-semibold py-4 rounded-4xl 
                flex items-center justify-center gap-3 transition-all text-base 
                active:scale-[0.97] ${className}`}
            >
                <ShoppingCart className="w-5 h-5" />
                Добавить в корзину
            </button>
        );
    }

    // Компактный счётчик
    return (
        <div className={`w-full ${className}`}>
            <div className="flex items-center justify-center gap-4 bg-zinc-900 border border-zinc-700 rounded-4xl py-2.5 px-2">

                <button
                    onClick={handleDecrease}
                    className="w-9 h-9 flex items-center justify-center hover:bg-zinc-800 rounded-xl transition-colors active:scale-90"
                >
                    <Minus className="w-4 h-4" />
                </button>

                <span className="text-lg text-yellow-400 font-semibold w-10 text-center tabular-nums">
                {cartItem.quantity}
            </span>

                <button
                    onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                    className="w-9 h-9 flex items-center justify-center hover:bg-zinc-800 rounded-xl transition-colors active:scale-90"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}