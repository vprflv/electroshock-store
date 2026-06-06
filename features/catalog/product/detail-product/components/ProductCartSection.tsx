'use client';


import { type Product } from '@/lib/mock-products';
import CartQuantityControls from "@/components/CartQuantityControls";
import {useCart} from "@/store/useCart";

type Props = {
    product: Product;
    onOpenCart: () => void;
};

export default function ProductCartSection({ product, onOpenCart }: Props) {
    const { items } = useCart();
    const isInCart = items.some(item => item.id === product.id);
    return (
        <div className="mb-8">
            <CartQuantityControls product={product} />

            {/* Кнопка "Перейти в корзину" показывается ТОЛЬКО если товар уже в корзине */}
            {isInCart && (
                <button
                    onClick={onOpenCart}
                    className="mt-4 w-full text-center bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-4 rounded-3xl transition-colors"
                >
                    Перейти в корзину →
                </button>
            )}
        </div>
    );
}