import { type ColumnDef } from '@tanstack/react-table';
import { Edit2, Trash2, Loader2 } from 'lucide-react';
import Link from 'next/link';

import { AdminProduct } from "@/features/admin/types/admin";

export const productsTableColumns = (
    deletingId: number | null,           // ← number | null
    deleteProduct: (id: number, name: string) => void
): ColumnDef<AdminProduct>[] => [
    {
        accessorKey: 'article',
        header: 'Артикул',
        cell: ({ row }) => (
            <span className="font-mono text-yellow-400 text-sm md:text-base">
                {row.getValue('article')}
            </span>
        ),
    },
    {
        accessorKey: 'name',
        header: 'Название',
        cell: ({ row }) => (
            <div className="max-w-[180px] md:max-w-md truncate font-medium text-sm md:text-base">
                {row.getValue('name')}
            </div>
        ),
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
        cell: ({ row }) => (
            <span className="font-medium text-sm md:text-base">
                {(row.getValue('price') as number).toLocaleString('ru-RU')} ₽
            </span>
        ),
    },
    {
        accessorKey: 'stock',
        header: 'Остаток',
        cell: ({ row }) => {
            const stock = row.getValue<number>('stock');
            return (
                <span className={`font-medium text-sm md:text-base ${stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {stock} шт.
                </span>
            );
        },
    },
    {
        id: 'actions',
        header: 'Действия',
        size: 100,
        cell: ({ row }) => {
            const product = row.original;
            const isDeleting = deletingId === product.id;   // теперь типы совпадают

            return (
                <div className="flex items-center gap-1 md:gap-2">
                    <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="p-3 md:p-2 hover:bg-zinc-800 rounded-xl transition text-blue-400 hover:text-blue-500"
                        title="Редактировать"
                    >
                        <Edit2 className="w-5 h-5 md:w-4 md:h-4" />
                    </Link>

                    <button
                        onClick={() => deleteProduct(product.id, product.name)}
                        disabled={isDeleting}
                        className="p-3 md:p-2 hover:bg-zinc-800 rounded-xl text-red-400 hover:text-red-500 transition disabled:opacity-50"
                        title="Удалить"
                    >
                        {isDeleting ? (
                            <Loader2 className="w-5 h-5 md:w-4 md:h-4 animate-spin" />
                        ) : (
                            <Trash2 className="w-5 h-5 md:w-4 md:h-4" />
                        )}
                    </button>
                </div>
            );
        },
    },
];