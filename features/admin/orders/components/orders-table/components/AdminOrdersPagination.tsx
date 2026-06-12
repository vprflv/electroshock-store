// features/admin/orders/components/AdminOrdersPagination.tsx
'use client';

import { Table } from '@tanstack/react-table';
import { AdminOrder } from '@/features/admin/types/admin';

interface AdminOrdersPaginationProps {
    table: Table<AdminOrder>;
}

export default function AdminOrdersPagination({ table }: AdminOrdersPaginationProps) {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 text-sm text-zinc-400">
            <div className="text-center sm:text-left">
                Страница {table.getState().pagination.pageIndex + 1} из {table.getPageCount() || 1}
            </div>

            <div className="flex gap-3">
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="px-5 py-3 border border-zinc-700 rounded-xl disabled:opacity-50 hover:bg-zinc-800 transition text-sm md:text-base"
                >
                    Назад
                </button>
                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="px-5 py-3 border border-zinc-700 rounded-xl disabled:opacity-50 hover:bg-zinc-800 transition text-sm md:text-base"
                >
                    Вперед
                </button>
            </div>
        </div>
    );
}