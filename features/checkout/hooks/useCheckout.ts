'use client';

import { useCart } from '@/store/useCart';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

type DeliveryType = 'courier' | 'pickup';
type PaymentType = 'online' | 'cash';

export function useCheckout() {
    const { items, removeFromCart, clearCart, totalPrice } = useCart();

    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        address: '',
        email: '',
        comment: '',
    });

    const [deliveryNeeded, setDeliveryNeeded] = useState(true);
    const [deliveryType, setDeliveryType] = useState<DeliveryType>('courier');
    const [paymentType, setPaymentType] = useState<PaymentType>('online');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.fullName.trim()) return toast.error('Введите ФИО');
        if (!formData.phone.trim()) return toast.error('Введите телефон');
        if (deliveryNeeded && deliveryType === 'courier' && !formData.address.trim()) {
            return toast.error('Укажите адрес доставки');
        }

        setIsSubmitting(true);

        try {
            const orderItems = items.map(item => ({
                productId: item.id,
                quantity: item.quantity,
                priceAtTime: item.price,
            }));

            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: formData.fullName.trim(),
                    phone: formData.phone.trim(),
                    address: deliveryNeeded && deliveryType === 'courier'
                        ? formData.address.trim()
                        : 'Самовывоз',
                    comment: formData.comment.trim(),
                    deliveryType,
                    paymentType,
                    items: orderItems,
                    total: totalPrice(),
                }),
            });

            const result = await res.json();

            if (!res.ok) throw new Error(result.error || 'Не удалось оформить заказ');

            toast.success(`✅ Заказ #${result.orderNumber} успешно оформлен!`, {
                description: 'Мы свяжемся с вами в ближайшее время',
                duration: 5000,
            });

            clearCart();
            localStorage.setItem('justOrdered', 'true');

            setTimeout(() => {
                router.push(`/thank-you?orderNumber=${result.orderNumber}`);
            }, 700);

        } catch (err: any) {
            console.error(err);
            toast.error('Ошибка при оформлении заказа', {
                description: err.message || 'Попробуйте ещё раз',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        deliveryNeeded,
        deliveryType,
        paymentType,
        isSubmitting,
        handleChange,
        removeFromCart,
        handleSubmit,
        setDeliveryNeeded,
        setDeliveryType,
        setPaymentType,
        totalPrice: totalPrice(),
        items,
    };
}