// app/admin/(protected)/layout.tsx
import { ReactNode } from 'react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import AdminLayoutContent from "@/features/admin/layout/components/AdminLayoutContent";


export default async function ProtectedAdminLayout({ children }: { children: ReactNode }) {
    const session = await auth();

    if (!session?.user || session.user.role !== 'ADMIN') {
        redirect('/admin/login');
    }

    return <AdminLayoutContent>{children}</AdminLayoutContent>;
}