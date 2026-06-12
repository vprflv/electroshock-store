'use client';

import { X, Truck, CheckCircle, Clock, XCircle, Package, Save } from 'lucide-react';
import { AdminOrder } from '@/features/admin/types/admin';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useEffect, useState } from "react";
import { getProductImage } from "@/lib/utils/product-image-store";

type OrderDetailModalProps = {
    order: AdminOrder | null;
    isOpen: boolean;
    onClose: () => void;
    onStatusChange: (id: string, status: AdminOrder['status']) => void;
};

const statusConfig = {
    PENDING: { label: 'Новый', color: 'yellow', icon: Clock },
    PROCESSING: { label: 'В обработке', color: 'blue', icon: Package },
    SHIPPED: { label: 'Отправлен', color: 'purple', icon: Truck },
    DELIVERED: { label: 'Доставлен', color: 'green', icon: CheckCircle },
    CANCELLED: { label: 'Отменён', color: 'red', icon: XCircle },
};

export default function OrderDetailModal({ order, isOpen, onClose, onStatusChange }: OrderDetailModalProps) {
    const [selectedStatus, setSelectedStatus] = useState<AdminOrder['status'] | null>(null);

    useEffect(() => {
        if (isOpen && order) {
            setSelectedStatus(null);
        }
    }, [isOpen, order]);

    if (!isOpen || !order) return null;

    const currentStatus = selectedStatus || order.status;
    const statusInfo = statusConfig[currentStatus];

    const handleSave = () => {
        if (selectedStatus && selectedStatus !== order.status) {
            onStatusChange(order.id, selectedStatus);
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/80 p-0 md:p-4">
            <div className="bg-zinc-900 border border-zinc-700 rounded-t-3xl md:rounded-3xl w-full max-w-3xl max-h-[95vh] md:max-h-[90vh] overflow-hidden flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-zinc-700 px-5 md:px-8 py-4 md:py-5">
                    <div>
                        <div className="text-xl md:text-2xl font-bold">Заказ #{order.orderNumber}</div>
                        <div className="text-xs md:text-sm text-zinc-500">
                            {format(new Date(order.createdAt), 'dd MMMM yyyy, HH:mm', { locale: ru })}
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 md:p-2 hover:bg-zinc-800 rounded-xl transition"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-auto p-5 md:p-8 space-y-8">

                    {/* Выбор статуса */}
                    <div>
                        <p className="text-sm text-zinc-500 mb-3">Статус заказа</p>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                            {Object.entries(statusConfig).map(([key, config]) => {
                                const isSelected = currentStatus === key;
                                return (
                                    <button
                                        key={key}
                                        onClick={() => setSelectedStatus(key as AdminOrder['status'])}
                                        className={`flex flex-col items-center gap-2 py-4 px-3 md:px-4 rounded-2xl transition-all border text-sm ${
                                            isSelected
                                                ? `bg-${config.color}-500/10 border-${config.color}-500 text-${config.color}-400`
                                                : 'bg-zinc-800 border-transparent hover:bg-zinc-700 text-zinc-400'
                                        }`}
                                    >
                                        <config.icon className="w-6 h-6" />
                                        <span className="font-medium">{config.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Информация о клиенте */}
                    <div>
                        <h3 className="font-semibold mb-4 text-lg">Информация о клиенте</h3>
                        <div className="grid grid-cols-1 gap-4 bg-zinc-950 rounded-2xl p-5 md:p-6">
                            <div>
                                <p className="text-xs text-zinc-500">ФИО</p>
                                <p className="font-medium">{order.customerName}</p>
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500">Телефон</p>
                                <p className="font-medium">{order.customerPhone}</p>
                            </div>
                            {order.customerEmail && (
                                <div>
                                    <p className="text-xs text-zinc-500">Email</p>
                                    <p className="font-medium">{order.customerEmail}</p>
                                </div>
                            )}
                            <div>
                                <p className="text-xs text-zinc-500">Адрес доставки</p>
                                <p className="font-medium leading-relaxed">{order.customerAddress}</p>
                            </div>
                        </div>
                    </div>

                    {/* Товары */}
                    <div>
                        <h3 className="font-semibold mb-4 text-lg">
                            Товары в заказе ({order.items.length})
                        </h3>
                        <div className="space-y-4">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex gap-4 bg-zinc-950 rounded-2xl p-4 md:p-5">
                                    {/* Изображение */}
                                    <div className="w-16 h-16 md:w-20 md:h-20 bg-zinc-800 rounded-xl overflow-hidden flex-shrink-0">
                                        <img
                                            src={getProductImage(item.product.images?.[0])}
                                            alt={item.product.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.src = '/placeholder-product.jpg';
                                            }}
                                        />
                                    </div>

                                    {/* Информация */}
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium leading-tight">{item.product.name}</p>
                                        <p className="text-sm text-zinc-500">Арт. {item.product.article}</p>
                                    </div>

                                    {/* Количество и цена */}
                                    <div className="text-right flex-shrink-0">
                                        <p className="font-semibold text-lg">{item.quantity} шт.</p>
                                        <p className="text-yellow-400 font-medium">
                                            {(item.priceAtTime * item.quantity).toLocaleString('ru')} ₽
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Итоговая сумма */}
                    <div className="bg-zinc-950 rounded-2xl p-6 flex justify-between items-center text-xl md:text-2xl">
                        <span className="font-medium">Итого к оплате</span>
                        <span className="font-bold text-yellow-400">
                            {order.total.toLocaleString('ru')} ₽
                        </span>
                    </div>

                    {/* Комментарий клиента */}
                    {order.customerComment && (
                        <div>
                            <h3 className="font-semibold mb-3">Комментарий клиента</h3>
                            <div className="bg-zinc-950 rounded-2xl p-6 text-zinc-300 leading-relaxed">
                                {order.customerComment}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-zinc-700 p-5 md:p-6">
                    <button
                        onClick={handleSave}
                        className="w-full md:w-auto flex items-center justify-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-10 py-4 rounded-2xl transition text-base"
                    >
                        <Save className="w-5 h-5" />
                        Сохранить изменения
                    </button>
                </div>
            </div>
        </div>
    );
}