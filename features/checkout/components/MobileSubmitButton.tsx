'use client';

type MobileSubmitButtonProps = {
    isSubmitting: boolean;
    totalPrice: number;
    onSubmit: (e: React.FormEvent) => void;
};

export default function MobileSubmitButton({
                                               isSubmitting,
                                               totalPrice,
                                               onSubmit,
                                           }: MobileSubmitButtonProps) {
    return (
        <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-zinc-950 border-t border-zinc-800 p-4 z-50 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Итого:</span>
                <span className="text-2xl font-bold text-yellow-400">
                    {totalPrice.toLocaleString('ru')} ₽
                </span>
            </div>

            <button
                onClick={onSubmit}
                disabled={isSubmitting}
                className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:bg-zinc-700 text-black font-semibold text-lg py-4 rounded-2xl transition-colors"
            >
                {isSubmitting ? 'Оформляем заказ...' : 'Подтвердить заказ'}
            </button>
        </div>
    );
}