import { notFound } from 'next/navigation';
import EditProductForm from "@/features/admin/products/edit/components/EditProductForm";


export default async function EditProductPage({
                                                  params
                                              }: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-zinc-950 py-10">
            <div className="max-w-5xl mx-auto px-6">
                <EditProductForm productId={productId} />
            </div>
        </div>
    );
}