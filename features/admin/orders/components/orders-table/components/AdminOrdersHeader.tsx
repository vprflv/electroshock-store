export default function AdminOrdersHeader({ totalOrders }: { totalOrders: number }) {
    return (
        <div className="flex justify-between items-center mb-6 md:mb-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold">Заказы</h1>
                <p className="text-zinc-400 text-sm md:text-base">
                    Всего заказов: <span className="text-white">{totalOrders}</span>
                </p>
            </div>
        </div>
    );
}