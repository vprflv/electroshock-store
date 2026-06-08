import { type Product } from '@/lib/mock-products';

export default function ProductInfo({ product }: { product: Product }) {

    const brandName = typeof product.brand === 'object' && product.brand !== null
        ? product.brand.name
        : product.brand || '';

    const categoryName = typeof product.category === 'object' && product.category !== null
        ? product.category.name
        : product.category || '';


    return (
        <>
            <div className="flex items-center gap-3 mb-2">
                <span className="text-yellow-400 font-semibold">{brandName}</span>
                <span className="text-zinc-500">•</span>
                <span className="text-zinc-500">{categoryName}</span>
            </div>

            <h1 className="text-4xl font-bold leading-tight mb-6">{product.name}</h1>

            <div className="flex items-end gap-4 mb-8">
        <span className="text-5xl font-bold text-yellow-400">
          {product.price.toLocaleString('ru')} ₽
        </span>
                {product.oldPrice && (
                    <span className="text-2xl line-through text-zinc-500">
            {product.oldPrice.toLocaleString('ru')} ₽
          </span>
                )}
            </div>

            <div className="flex items-center gap-3 text-emerald-400 mb-10">
                {product.stock > 5 ? '✅ В наличии' : '⚠ Осталось мало'}
                <span className="text-zinc-500">• {product.stock} шт.</span>
            </div>
        </>
    );
}