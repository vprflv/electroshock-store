import { prisma } from '@/lib/prisma';

async function main() {
    try {
        const count = await prisma.product.count();
        console.log(`✅ Подключение успешно! В базе ${count} товаров.`);
    } catch (error) {
        console.error('❌ Ошибка подключения:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();