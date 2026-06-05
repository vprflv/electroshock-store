'use client';

export default function ProductCardSkeleton() {
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
            {/* Изображение */}
            <div className="relative h-64 bg-zinc-950 overflow-hidden">
                <div className="w-full h-full bg-zinc-800 animate-pulse" />

                {/* Фейковые бейджи */}
                <div className="absolute top-4 left-4 w-16 h-6 bg-zinc-700 rounded-full animate-pulse" />
                <div className="absolute top-4 right-4 w-20 h-6 bg-zinc-700 rounded-full animate-pulse" />
            </div>

            {/* Контент карточки */}
            <div className="p-6 space-y-5">
                {/* Бренд + Артикул */}
                <div className="flex justify-between items-center">
                    <div className="h-4 w-28 bg-zinc-700 rounded animate-pulse" />
                    <div className="h-4 w-16 bg-zinc-700 rounded animate-pulse" />
                </div>

                {/* Категория */}
                <div className="h-3 w-20 bg-zinc-700 rounded animate-pulse" />

                {/* Название товара (две строки) */}
                <div className="space-y-2">
                    <div className="h-5 bg-zinc-700 rounded animate-pulse" />
                    <div className="h-5 w-11/12 bg-zinc-700 rounded animate-pulse" />
                </div>

                {/* Цена */}
                <div className="flex items-center gap-3">
                    <div className="h-9 w-32 bg-zinc-700 rounded-xl animate-pulse" />
                    <div className="h-5 w-24 bg-zinc-700 rounded animate-pulse" />
                </div>

                {/* Наличие */}
                <div className="h-5 w-36 bg-zinc-700 rounded animate-pulse" />
            </div>

            {/* Блок с кнопкой "В корзину" */}
            <div className="px-6 pb-6 pt-1">
                <div className="h-12 w-full bg-zinc-800 rounded-2xl animate-pulse" />
            </div>
        </div>
    );
}