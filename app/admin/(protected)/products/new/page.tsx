
'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ProductForm from "@/features/admin/products/new/components/ProductForm/ProductForm";


export default function NewProductPage() {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/products/new" className="hover:text-yellow-400 transition">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-3xl font-bold">Добавить новый товар</h1>
            </div>

            <ProductForm />
        </div>
    );
}