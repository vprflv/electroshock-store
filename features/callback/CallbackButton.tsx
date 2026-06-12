'use client';

import { useState } from 'react';
import { Phone } from 'lucide-react';
import CallbackModal from './CallbackModal';

export default function CallbackButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-5 py-2.5 rounded-2xl transition-all active:scale-95 whitespace-nowrap"
            >
                {/*<Phone className="w-4 h-4" />*/}
                Перезвоните мне
            </button>

            <CallbackModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}