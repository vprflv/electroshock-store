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
import { Search, Loader2, Eye } from 'lucide-react';

import { useAdminOrders } from '../hooks/useAdminOrders';
import { AdminOrder } from '@/features/admin/types/admin';
import OrderDetailModal from "@/features/admin/orders/components/OrderDetailModal";
import {updateOrderStatus} from "@/features/actions/productActions";

export default function AdminOrdersTable() {
    const { orders, isLoading } = useAdminOrders();

    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState('');

    const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

    const columns = useMemo<ColumnDef<AdminOrder>[]>(() => [
        {
            accessorKey: 'orderNumber',
            header: '№ Заказа',
            cell: ({ row }) => (
                <span className="font-mono font-semibold text-yellow-400">
                    #{row.getValue('orderNumber')}
                </span>
            ),
        },
        {
            accessorKey: 'customerName',
            header: 'Клиент',
            cell: ({ row }) => (
                <div>
                    <div className="font-medium">{row.original.customerName}</div>
                    <div className="text-sm text-zinc-500">{row.original.customerPhone}</div>
                </div>
            ),
        },
        {
            accessorKey: 'total',
            header: 'Сумма',
            cell: ({ row }) => (
                <span className="font-semibold">
                    {(row.getValue('total') as number).toLocaleString('ru-RU')} ₽
                </span>
            ),
        },
        {
            accessorKey: 'status',
            header: 'Статус',
            cell: ({ row }) => {
                const status = row.getValue('status') as string;
                const colors: Record<string, string> = {
                    PENDING: 'bg-yellow-500/10 text-yellow-500',
                    PROCESSING: 'bg-blue-500/10 text-blue-500',
                    SHIPPED: 'bg-purple-500/10 text-purple-500',
                    DELIVERED: 'bg-green-500/10 text-green-500',
                    CANCELLED: 'bg-red-500/10 text-red-500',
                };

                return (
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-zinc-500/10 text-zinc-400'}`}>
                        {status === 'PENDING' && 'Новый'}
                        {status === 'PROCESSING' && 'В обработке'}
                        {status === 'SHIPPED' && 'Отправлен'}
                        {status === 'DELIVERED' && 'Доставлен'}
                        {status === 'CANCELLED' && 'Отменён'}
                    </span>
                );
            },
        },
        {
            accessorKey: 'createdAt',
            header: 'Дата',
            cell: ({ row }) => {
                const date = new Date(row.getValue('createdAt'));
                return date.toLocaleDateString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                });
            },
        },
        {
            id: 'actions',
            header: '',
            cell: ({ row }) => (
                <button
                    onClick={() => setSelectedOrder(row.original)}
                    className="p-2 hover:bg-zinc-800 rounded-lg text-blue-400 hover:text-blue-500 transition"
                >
                    <Eye className="w-4 h-4" />
                </button>
            ),
        },
    ], []);

    const table = useReactTable({
        data: orders,
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
                    <h1 className="text-3xl font-bold">Заказы</h1>
                    <p className="text-zinc-400">Всего заказов: {orders.length}</p>
                </div>
            </div>

            {/* Поиск */}
            <div className="relative mb-6 max-w-md">
                <Search className="absolute left-4 top-3.5 text-zinc-500" />
                <input
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Поиск по номеру, клиенту или телефону..."
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
                            <td colSpan={6} className="py-20 text-center text-zinc-500">
                                Заказы не найдены
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

            <OrderDetailModal
                order={selectedOrder}
                isOpen={!!selectedOrder}
                onClose={() => setSelectedOrder(null)}
                onStatusChange={updateOrderStatus}
            />

        </div>
    );
}