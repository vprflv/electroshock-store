'use client';

import {X, Truck, CheckCircle, Clock, XCircle, Package, Save} from 'lucide-react';
import { AdminOrder } from '@/features/admin/types/admin';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import {useEffect, useState} from "react";

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="bg-zinc-900 border border-zinc-700 rounded-3xl w-full max-w-3xl max-h-[95vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-zinc-700 px-8 py-5">
                    <div>
                        <div className="text-2xl font-bold">Заказ #{order.orderNumber}</div>
                        <div className="text-sm text-zinc-500">
                            {format(new Date(order.createdAt), 'dd MMMM yyyy, HH:mm', { locale: ru })}
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-zinc-800 rounded-xl transition"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-auto p-8 space-y-8">

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
                                        className={`flex flex-col items-center gap-2 py-4 px-4 rounded-2xl transition-all border ${
                                            isSelected
                                                ? `bg-${config.color}-500/10 border-${config.color}-500 text-${config.color}-400`
                                                : 'bg-zinc-800 border-transparent hover:bg-zinc-700 text-zinc-400'
                                        }`}
                                    >
                                        <config.icon className="w-6 h-6" />
                                        <span className="text-sm font-medium">{config.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Информация о клиенте */}
                    <div>
                        <h3 className="font-semibold mb-4">Информация о клиенте</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-zinc-950 rounded-2xl p-6">
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
                            <div className="md:col-span-2">
                                <p className="text-xs text-zinc-500">Адрес доставки</p>
                                <p className="font-medium">{order.customerAddress}</p>
                            </div>
                        </div>
                    </div>

                    {/* Товары */}
                    <div>
                        <h3 className="font-semibold mb-4">Товары в заказе ({order.items.length})</h3>
                        <div className="space-y-4">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex gap-4 bg-zinc-950 rounded-2xl p-5">
                                    <div className="w-16 h-16 bg-zinc-800 rounded-xl overflow-hidden flex-shrink-0">
                                        {item.product.images?.[0] && (
                                            <img
                                                src={item.product.images[0]}
                                                alt={item.product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium">{item.product.name}</p>
                                        <p className="text-sm text-zinc-500">Арт. {item.product.article}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">{item.quantity} шт.</p>
                                        <p className="text-yellow-400">
                                            {(item.priceAtTime * item.quantity).toLocaleString('ru')} ₽
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Итог */}
                    <div className="bg-zinc-950 rounded-2xl p-6 flex justify-between items-center text-xl">
                        <span className="font-medium">Итого к оплате</span>
                        <span className="font-bold text-yellow-400">
                            {order.total.toLocaleString('ru')} ₽
                        </span>
                    </div>

                    {/* Комментарий */}
                    {order.customerComment && (
                        <div>
                            <h3 className="font-semibold mb-3">Комментарий клиента</h3>
                            <div className="bg-zinc-950 rounded-2xl p-6 text-zinc-300">
                                {order.customerComment}
                            </div>
                        </div>
                    )}

                    {/* Footer с кнопкой "Сохранить" */}
                    <div className="border-t border-zinc-700 p-6 flex justify-end">
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-10 py-4 rounded-2xl transition"
                        >
                            <Save className="w-5 h-5" />
                            Сохранить изменения
                        </button>
                    </div>



                </div>
            </div>
        </div>
    );
}