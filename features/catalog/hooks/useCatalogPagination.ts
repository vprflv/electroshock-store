'use client';

import { useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export function useCatalogPagination() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const goToPage = useCallback((page: number) => {
        console.log(`[goToPage] → ${page} (текущая: ${parseInt(searchParams.get('page') || '1')})`);

        const params = new URLSearchParams(searchParams.toString());
        if (page === 1) params.delete('page');
        else params.set('page', page.toString());

        const newUrl = `${pathname}?${params.toString()}`;

        console.log(`[goToPage] router.replace → ${newUrl}`);

        router.replace(newUrl, { scroll: false });


        setTimeout(() => {
            router.refresh();
        }, 30);
    }, [searchParams, pathname, router]);

    return { goToPage };
}