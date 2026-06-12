// features/admin/products/components/AdminProductsTable.tsx
'use client';

import { useState, useMemo } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    type SortingState,
} from '@tanstack/react-table';
import { Loader2 } from 'lucide-react';

import { useAdminProducts } from '../hooks/useAdminProducts';
import {productsTableColumns} from "@/features/admin/products/products-table/config/ProductsTableColumns";
import AdminProductsHeader from "@/features/admin/products/products-table/components/AdminProductsHeader";
import AdminProductsSearch from "@/features/admin/products/products-table/components/AdminProductsSearch";
import AdminProductsDataTable from "@/features/admin/products/products-table/components/AdminProductsDataTable";
import AdminProductsPagination from "@/features/admin/products/products-table/components/AdminProductsPagination";



export default function AdminProductsTable() {
    const { products, isLoading, deletingId, deleteProduct } = useAdminProducts();

    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState('');

    const columns = useMemo(
        () => productsTableColumns(deletingId, deleteProduct),
        [deletingId, deleteProduct]
    );

    const table = useReactTable({
        data: products,
        columns,
        state: { sorting, globalFilter },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20 md:py-32">
                <Loader2 className="w-8 h-8 animate-spin text-yellow-400" />
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6">
            <AdminProductsHeader totalProducts={products.length} />
            <AdminProductsSearch
                value={globalFilter}
                onChange={setGlobalFilter}
            />
            <AdminProductsDataTable table={table} />
            <AdminProductsPagination table={table} />
        </div>
    );
}