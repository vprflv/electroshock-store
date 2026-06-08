import { type Product } from '@/lib/mock-products';
import { Zap } from 'lucide-react';

export default function ProductSpecs({ product }: { product: Product }) {
    return (
        <div className="mb-8 sm:mb-10">
            <h3 className="text-lg sm:text-xl font-semibold mb-5 sm:mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                Технические характеристики
            </h3>

            <div className="space-y-3 sm:space-y-4">
                {Object.entries(product.specs).map(([key, value]) => (
                    <div
                        key={key}
                        className="flex items-start sm:items-center border-b border-zinc-800 pb-3 last:border-none last:pb-0 gap-3 sm:gap-4"
                    >
                        {/* Название характеристики */}
                        <span className="text-zinc-400 text-sm sm:text-base min-w-[120px] sm:min-w-[140px] flex-shrink-0">
                            {key}
                        </span>

                        {/* Пунктирная линия */}
                        <div className="flex-1 border-b border-dashed border-zinc-700 relative -top-px hidden sm:block" />

                        {/* Значение */}
                        <span className="font-medium text-white text-sm sm:text-base text-right flex-1 sm:flex-none sm:min-w-[100px]">
                            {value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}