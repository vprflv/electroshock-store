'use client';

import { useState } from 'react';

export type Spec = { key: string; value: string };

export function useSpecs() {
    const [specs, setSpecs] = useState<Spec[]>([]);

    const addSpec = (key: string, value: string) => {
        setSpecs(prev => [...prev, { key, value }]);
    };

    const removeSpec = (index: number) => {
        setSpecs(prev => prev.filter((_, i) => i !== index));
    };

    const updateSpecs = (newSpecs: Spec[]) => {
        setSpecs(newSpecs);
    };

    return { specs, addSpec, removeSpec, updateSpecs };
}