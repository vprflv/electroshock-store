import { handlers } from '@/auth';

export const { GET, POST } = handlers;

export const runtime = 'nodejs';           // ← Принудительно Node.js
export const dynamic = 'force-dynamic';