
'use client';

import { useQuery } from '@tanstack/react-query';
import { getProductForEdit } from "@/features/actions/productActions";

export const useAdminProduct = (id: number) => {
    return useQuery({
        queryKey: ['adminProduct', id],
        queryFn: () => getProductForEdit(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};