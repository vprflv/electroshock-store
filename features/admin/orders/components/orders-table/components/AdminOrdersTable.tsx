// features/admin/orders/components/AdminOrdersTable.tsx
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
import { toast } from 'sonner';

import { AdminOrder } from '@/features/admin/types/admin';
import OrderDetailModal from "@/features/admin/orders/components/OrderDetailModal";


import { ordersTableColumns } from '../config/ordersTableColumns';
import {useAdminOrders} from "@/features/admin/orders/hooks/useAdminOrders";
import AdminOrdersHeader from "@/features/admin/orders/components/orders-table/components/AdminOrdersHeader";
import AdminOrdersSearch from "@/features/admin/orders/components/orders-table/components/AdminOrdersSearch";
import AdminOrdersDataTable from "@/features/admin/orders/components/orders-table/components/AdminOrdersDataTable";
import AdminOrdersPagination from "@/features/admin/orders/components/orders-table/components/AdminOrdersPagination";

export default function AdminOrdersTable() {
    const { orders, isLoading, updateOrderStatus, deleteOrder } = useAdminOrders();

    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

    const handleViewOrder = (order: AdminOrder) => setSelectedOrder(order);

    const handleDeleteOrder = (id: string, orderNumber: string) => {
        toast.error(`Удалить заказ #${orderNumber}?`, {
            description: "Это действие нельзя отменить",
            action: {
                label: "Удалить",
                onClick: () => {
                    deleteOrder(id);
                    toast.success(`Заказ #${orderNumber} успешно удалён`);
                },
            },
            cancel: {
                label: "Отмена",
                onClick: () => console.log("отмена"),
            },
            duration: 6000,
        });
    };

    const handleStatusChange = (id: string, status: AdminOrder['status']) => {
        updateOrderStatus({ id, status });
    };

    const columns = useMemo(
        () => ordersTableColumns({
            onView: handleViewOrder,
            onDelete: handleDeleteOrder,
        }),
        []
    );

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
            <div className="flex items-center justify-center py-20 md:py-32">
                <Loader2 className="w-8 h-8 animate-spin text-yellow-400" />
            </div>
        );
    }

    return (
        <>
            <div className="p-4 md:p-6">
                <AdminOrdersHeader totalOrders={orders.length} />

                {/*<AdminOrdersSearch*/}
                {/*    value={globalFilter}*/}
                {/*    onChange={setGlobalFilter}*/}
                {/*/>*/}

                <AdminOrdersDataTable table={table} />

                <AdminOrdersPagination table={table} />
            </div>

            {/* Модальное окно */}
            <OrderDetailModal
                order={selectedOrder}
                isOpen={!!selectedOrder}
                onClose={() => setSelectedOrder(null)}
                onStatusChange={handleStatusChange}
            />
        </>
    );
}