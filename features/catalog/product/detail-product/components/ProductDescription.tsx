import { type Product } from '@/lib/mock-products';

export default function ProductDescription({ product }: { product: Product }) {
    return (
        <div className="mb-8 sm:mb-10">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5">
                Описание
            </h3>

            <p className="text-zinc-300 leading-relaxed
                         text-base sm:text-lg
                         sm:leading-relaxed">
                {product.description}
            </p>
        </div>
    );
}