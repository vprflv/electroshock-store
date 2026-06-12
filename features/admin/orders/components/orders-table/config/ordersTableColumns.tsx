import { type ColumnDef } from '@tanstack/react-table';
import { Eye, Trash2 } from 'lucide-react';

import { AdminOrder } from '@/features/admin/types/admin';

type OrdersColumnsProps = {
    onView: (order: AdminOrder) => void;
    onDelete: (id: string, orderNumber: string) => void;
};

export const ordersTableColumns = ({
                                       onView,
                                       onDelete,
                                   }: OrdersColumnsProps): ColumnDef<AdminOrder>[] => [
    {
        accessorKey: 'orderNumber',
        header: '№ Заказа',
        cell: ({ row }) => (
            <span className="font-mono font-semibold text-yellow-400 text-sm md:text-base">
                #{row.getValue('orderNumber')}
            </span>
        ),
    },
    {
        accessorKey: 'customerName',
        header: 'Клиент',
        cell: ({ row }) => (
            <div className="text-sm md:text-base">
                <div className="font-medium">{row.original.customerName}</div>
                <div className="text-zinc-500">{row.original.customerPhone}</div>
            </div>
        ),
    },
    {
        accessorKey: 'total',
        header: 'Сумма',
        cell: ({ row }) => (
            <span className="font-semibold text-sm md:text-base">
                {(row.getValue('total') as number).toLocaleString('ru-RU')} ₽
            </span>
        ),
    },
    {
        accessorKey: 'status',
        header: 'Статус',
        cell: ({ row }) => {
            const status = row.original.status;
            const colors: Record<string, string> = {
                PENDING: 'bg-yellow-500/10 text-yellow-500',
                PROCESSING: 'bg-blue-500/10 text-blue-500',
                SHIPPED: 'bg-purple-500/10 text-purple-500',
                DELIVERED: 'bg-green-500/10 text-green-500',
                CANCELLED: 'bg-red-500/10 text-red-500',
            };
            const labels: Record<string, string> = {
                PENDING: 'Новый',
                PROCESSING: 'В обработке',
                SHIPPED: 'Отправлен',
                DELIVERED: 'Доставлен',
                CANCELLED: 'Отменён',
            };

            return (
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
                    {labels[status]}
                </span>
            );
        },
    },
    {
        accessorKey: 'createdAt',
        header: 'Дата',
        cell: ({ row }) => (
            <span className="text-sm md:text-base whitespace-nowrap">
                {new Date(row.original.createdAt).toLocaleString('ru-RU')}
            </span>
        ),
    },
    {
        id: 'actions',
        header: '',
        size: 100,
        cell: ({ row }) => {
            const order = row.original;
            return (
                <div className="flex items-center gap-1 md:gap-2">
                    <button
                        onClick={() => onView(order)}
                        className="p-3 md:p-2 hover:bg-zinc-800 rounded-xl transition text-blue-400 hover:text-blue-500"
                        title="Просмотреть"
                    >
                        <Eye className="w-5 h-5 md:w-4 md:h-4" />
                    </button>

                    <button
                        onClick={() => onDelete(order.id, order.orderNumber)}
                        className="p-3 md:p-2 hover:bg-zinc-800 rounded-xl text-red-400 hover:text-red-500 transition"
                        title="Удалить"
                    >
                        <Trash2 className="w-5 h-5 md:w-4 md:h-4" />
                    </button>
                </div>
            );
        },
    },
];