import { type Product } from '@/lib/mock-products';
import { Zap } from 'lucide-react';

export default function ProductSpecs({ product }: { product: Product }) {
    return (
        <div className="mb-10">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-400" />
                Технические характеристики
            </h3>

            <div className="space-y-4">
                {Object.entries(product.specs).map(([key, value]) => (
                    <div
                        key={key}
                        className="flex items-center border-b  border-zinc-950 pb-3 last:border-none last:pb-0"
                    >
                        {/* Название характеристики */}
                        <span className="text-zinc-400 min-w-[140px] flex-shrink-0">
                            {key}
                        </span>

                        {/* Пунктирная линия */}
                        <div className="flex-1 border-b border-dashed border-zinc-700 mx-4 relative -top-px" />

                        {/* Значение */}
                        <span className="font-medium text-right text-white min-w-[80px] flex-shrink-0">
                            {value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}