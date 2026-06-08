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
            {/* Бренд + Категория */}
            <div className="flex items-center gap-3 mb-3">
                <span className="text-yellow-400 font-semibold text-base sm:text-lg">
                    {brandName}
                </span>
                <span className="text-zinc-500">•</span>
                <span className="text-zinc-500 text-sm sm:text-base">
                    {categoryName}
                </span>
            </div>

            {/* Название товара */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-5 sm:mb-6">
                {product.name}
            </h1>

            {/* Цена */}
            <div className="flex items-end gap-3 sm:gap-4 mb-6 sm:mb-8">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-400">
                    {product.price.toLocaleString('ru')} ₽
                </span>
                {product.oldPrice && (
                    <span className="text-xl sm:text-2xl line-through text-zinc-500">
                        {product.oldPrice.toLocaleString('ru')} ₽
                    </span>
                )}
            </div>

            {/* Наличие */}
            <div className="flex items-center gap-3 text-emerald-400 mb-8 sm:mb-10">
                <span className="text-base sm:text-lg">
                    {product.stock > 5 ? '✅ В наличии' : '⚠ Осталось мало'}
                </span>
                <span className="text-zinc-500 text-sm sm:text-base">
                    • {product.stock} шт.
                </span>
            </div>
        </>
    );
}