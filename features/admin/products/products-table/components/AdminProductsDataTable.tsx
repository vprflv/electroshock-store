'use client';

import {
    flexRender,
    type Table,
} from '@tanstack/react-table';
import { AdminProduct } from "@/features/admin/types/admin";

interface AdminProductsDataTableProps {
    table: Table<AdminProduct>;
}

export default function AdminProductsDataTable({ table }: AdminProductsDataTableProps) {
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                    <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id} className="border-b border-zinc-800">
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    className="px-4 md:px-6 py-4 text-left text-xs md:text-sm font-medium text-zinc-400 cursor-pointer hover:text-white whitespace-nowrap"
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {header.column.getIsSorted() && (
                                        <span className="ml-1">
                                                {header.column.getIsSorted() === 'desc' ? '↓' : '↑'}
                                            </span>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map(row => (
                            <tr
                                key={row.id}
                                className="border-b border-zinc-800 hover:bg-zinc-800/60 transition"
                            >
                                {row.getVisibleCells().map(cell => (
                                    <td
                                        key={cell.id}
                                        className="px-4 md:px-6 py-4 text-sm md:text-base"
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="py-16 text-center text-zinc-500">
                                Товары не найдены
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}