import { type Product } from '@/lib/mock-products';
import { Shield } from 'lucide-react';

export default function ProductFeatures({ product }: { product: Product }) {
    return (
        <div className="mb-8 sm:mb-12">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5">
                Особенности и комплектация
            </h3>

            <ul className="space-y-3 sm:space-y-4">
                {product.features.map((feature, index) => (
                    <li
                        key={index}
                        className="flex items-start gap-3 text-zinc-300 text-base sm:text-lg"
                    >
                        <Shield
                            className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 mt-0.5 flex-shrink-0"
                        />
                        <span className="leading-relaxed">{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}