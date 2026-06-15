// hooks/useCatalogPagination.ts
import { useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export function useCatalogPagination() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const goToPage = useCallback((page: number) => {
        const params = new URLSearchParams(searchParams.toString());

        if (page === 1) {
            params.delete('page');
        } else {
            params.set('page', page.toString());
        }

        const newUrl = `${pathname}?${params.toString()}`;

        router.replace(newUrl, { scroll: false });
    }, [searchParams, pathname, router]);

    return { goToPage };
}