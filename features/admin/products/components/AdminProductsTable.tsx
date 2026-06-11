// features/admin/products/components/AdminProductsTable.tsx
'use client';

import { useState, useMemo } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
    type ColumnDef,
    type SortingState,
} from '@tanstack/react-table';
import { Plus, Edit2, Trash2, Search, Loader2 } from 'lucide-react';
import Link from 'next/link';

import { useAdminProducts } from '../hooks/useAdminProducts';
import { AdminProduct } from "@/features/admin/types/admin";

export default function AdminProductsTable() {
    const { products, isLoading, deletingId, deleteProduct } = useAdminProducts();

    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState('');

    const columns = useMemo<ColumnDef<AdminProduct>[]>(() => [
        {
            accessorKey: 'article',
            header: 'Артикул',
            cell: ({ row }) => <span className="font-mono text-yellow-400">{row.getValue('article')}</span>,
        },
        {
            accessorKey: 'name',
            header: 'Название',
            cell: ({ row }) => <div className="max-w-md truncate font-medium">{row.getValue('name')}</div>,
        },
        {
            accessorKey: 'brand',
            header: 'Бренд',
            cell: ({ row }) => row.original.brand?.name || '—',
        },
        {
            accessorKey: 'category',
            header: 'Категория',
            cell: ({ row }) => row.original.category?.name || '—',
        },
        {
            accessorKey: 'price',
            header: 'Цена',
            cell: ({ row }) => `${(row.getValue('price') as number).toLocaleString('ru-RU')} ₽`,
        },
        {
            accessorKey: 'stock',
            header: 'Остаток',
            cell: ({ row }) => {
                const stock = row.getValue<number>('stock');
                return <span className={stock > 0 ? 'text-green-400' : 'text-red-400'}>{stock} шт.</span>;
            },
        },
        {
            id: 'actions',
            header: 'Действия',
            size: 120,
            cell: ({ row }) => {
                const product = row.original;
                const isDeleting = deletingId === product.id;

                return (
                    <div className="flex items-center gap-2">
                        <Link
                            href={`/admin/products/${product.id}/edit`}
                            className="p-2 hover:bg-zinc-800 rounded-lg transition text-blue-400 hover:text-blue-500"
                            title="Редактировать"
                        >
                            <Edit2 className="w-4 h-4" />
                        </Link>

                        <button
                            onClick={() => deleteProduct(product.id, product.name)}
                            disabled={isDeleting}
                            className="p-2 hover:bg-zinc-800 rounded-lg text-red-400 hover:text-red-500 transition disabled:opacity-50"
                            title="Удалить"
                        >
                            {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </button>
                    </div>
                );
            },
        },
    ], [deletingId, deleteProduct]);

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
            <div className="flex items-center justify-center py-32">
                <Loader2 className="w-8 h-8 animate-spin text-yellow-400" />
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Товары</h1>
                    <p className="text-zinc-400">Всего товаров: {products.length}</p>
                </div>

                <Link
                    href="/admin/products/new"
                    className="flex items-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-xl transition"
                >
                    <Plus className="w-5 h-5" />
                    Добавить товар
                </Link>
            </div>

            {/* Поиск */}
            <div className="relative mb-6 max-w-md">
                <Search className="absolute left-4 top-3.5 text-zinc-500" />
                <input
                    value={globalFilter}
                    onChange={e => setGlobalFilter(e.target.value)}
                    placeholder="Поиск по названию или артикулу..."
                    className="w-full bg-zinc-900 border border-zinc-700 pl-11 py-3 rounded-xl focus:border-yellow-400 outline-none"
                />
            </div>

            {/* Таблица */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                <table className="w-full">
                    <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id} className="border-b border-zinc-800">
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    className="px-6 py-4 text-left text-sm font-medium text-zinc-400 cursor-pointer hover:text-white"
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {header.column.getIsSorted() && (
                                        <span>{header.column.getIsSorted() === 'desc' ? ' ↓' : ' ↑'}</span>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="border-b border-zinc-800 hover:bg-zinc-800/60 transition">
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="px-6 py-4">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="py-12 text-center text-zinc-500">
                                Товары не найдены
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* Пагинация */}
            <div className="flex items-center justify-between mt-6 text-sm text-zinc-400">
                <div>
                    Страница {table.getState().pagination.pageIndex + 1} из {table.getPageCount() || 1}
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="px-4 py-2 border border-zinc-700 rounded-lg disabled:opacity-50"
                    >
                        Назад
                    </button>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="px-4 py-2 border border-zinc-700 rounded-lg disabled:opacity-50"
                    >
                        Вперед
                    </button>
                </div>
            </div>
        </div>
    );
}