import { type Product } from '@/lib/mock-products';
import { Zap } from 'lucide-react';

export default function ProductSpecs({ product }: { product: Product }) {
    return (
        <div className="mb-10">
            <h3 className="text-xl font-semibold mb-5 flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-400" />
                Технические характеристики
            </h3>
            <div className="space-y-3">
                {Object.entries(product.specs).map(([key, value]) => (
                    <div
                        key={key}
                        className="flex justify-between bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4"
                    >
                        <span className="text-zinc-400">{key}</span>
                        <span className="font-medium">{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}