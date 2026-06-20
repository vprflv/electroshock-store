import CatalogClient from "@/features/catalog/CatalogClient";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { Suspense } from 'react';
import HomeClient from "@/features/catalog/CatalogClient";

export default function HomePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-zinc-950" />}>
            <CatalogClient />
        </Suspense>
    );
}