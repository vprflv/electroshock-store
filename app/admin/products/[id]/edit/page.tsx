import EditProductPage from "@/features/admin/products/eit/EditProductForm";


export default function Page({ params }: { params: Promise<{ id: string }> }) {
    return <EditProductPage params={params} />;
}