import { type Product } from '@/lib/mock-products';

export default function ProductDescription({ product }: { product: Product }) {
    return (
        <div className="mb-10">
            <h3 className="text-xl font-semibold mb-4">Описание</h3>
            <p className="text-zinc-300 leading-relaxed text-lg">
                {product.description}
            </p>
        </div>
    );
}