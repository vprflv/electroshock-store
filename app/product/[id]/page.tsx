// app/product/[id]/page.tsx
import { Suspense } from 'react';
import ProductPageClient from "@/features/catalog/product/detail-product/ProductPageClient";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: Props) {
    const { id } = await params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
        return <div>Неверный ID товара</div>;
    }

    return (
        <Suspense >
            <ProductPageClient id={productId} />
        </Suspense>
    );
}