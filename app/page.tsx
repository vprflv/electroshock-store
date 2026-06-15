export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { Suspense } from 'react';
import HomeClient from "@/features/home/HomeClient";

export default function HomePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-zinc-950" />}>
            <HomeClient />
        </Suspense>
    );
}