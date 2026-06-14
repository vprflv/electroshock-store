import { Suspense } from 'react';
import ThankYouContent from "@/features/thank-you/ThankYouContent";


export default function ThankYouPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <div className="text-yellow-400 text-xl">Загрузка...</div>
            </div>
        }>
            <ThankYouContent />
        </Suspense>
    );
}