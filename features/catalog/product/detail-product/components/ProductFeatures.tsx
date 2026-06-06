import { type Product } from '@/lib/mock-products';
import { Shield } from 'lucide-react';

export default function ProductFeatures({ product }: { product: Product }) {
    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">Особенности и комплектация</h3>
            <ul className="space-y-3">
                {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-zinc-300">
                        <Shield className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}