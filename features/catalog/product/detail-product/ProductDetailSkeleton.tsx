// app/product/[id]/ProductDetailSkeleton.tsx
export default function ProductDetailSkeleton() {
    return (
        <div className="max-w-7xl bg-zinc-950 mx-auto px-6 py-10">
            <div className="flex flex-col lg:flex-row gap-10">
                {/* Левая колонка — изображения */}
                <div className="lg:w-1/2">
                    <div className="aspect-square bg-zinc-900 rounded-3xl animate-pulse" />

                    {/* Галерея миниатюр */}
                    <div className="flex gap-4 mt-6">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={i}
                                className="w-20 h-20 bg-zinc-900 rounded-2xl animate-pulse"
                            />
                        ))}
                    </div>
                </div>

                {/* Правая колонка — информация о товаре */}
                <div className="lg:w-1/2 space-y-8">
                    {/* Бренд и категория */}
                    <div className="flex gap-3">
                        <div className="h-5 w-24 bg-zinc-900 rounded animate-pulse" />
                        <div className="h-5 w-32 bg-zinc-900 rounded animate-pulse" />
                    </div>

                    {/* Название товара */}
                    <div className="h-10 bg-zinc-900 rounded-2xl w-4/5 animate-pulse" />

                    {/* Цена */}
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-40 bg-zinc-900 rounded-2xl animate-pulse" />
                        <div className="h-6 w-28 bg-zinc-900 rounded animate-pulse" />
                    </div>

                    {/* Характеристики */}
                    <div className="grid grid-cols-2 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="h-9 bg-zinc-900 rounded-xl animate-pulse" />
                        ))}
                    </div>

                    {/* Описание */}
                    <div className="space-y-3">
                        <div className="h-4 bg-zinc-900 rounded w-full animate-pulse" />
                        <div className="h-4 bg-zinc-900 rounded w-11/12 animate-pulse" />
                        <div className="h-4 bg-zinc-900 rounded w-4/5 animate-pulse" />
                    </div>

                    {/* Кнопка */}
                    <div className="h-14 bg-zinc-900 rounded-3xl animate-pulse mt-8" />
                </div>
            </div>
        </div>
    );
}