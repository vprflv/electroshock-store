// import { prisma } from '@/lib/prisma';
// import { mockProducts } from '@/lib/mock-products';
//
// async function main() {
//     console.log('🌱 Начинаем сидирование базы данных...');
//
//     // Очищаем старые данные
//     await prisma.product.deleteMany();
//     await prisma.category.deleteMany();
//     await prisma.brand.deleteMany();
//
//     console.log('🗑️ Старые данные удалены');
//
//     // === 1. Создаём уникальные категории ===
//     const uniqueCategories = [...new Set(mockProducts.map(p => p.category?.name).filter(Boolean))];
//
//     for (const name of uniqueCategories) {
//         await prisma.category.create({
//             data: {
//                 name,
//                 slug: name.toLowerCase()
//                     .replace(/[^a-zа-я0-9]+/g, '-')
//                     .replace(/^-|-$/g, ''),
//             },
//         });
//     }
//
//     // === 2. Создаём уникальные бренды ===
//     const uniqueBrands = [...new Set(mockProducts.map(p => p.brand?.name).filter(Boolean))];
//
//     for (const name of uniqueBrands) {
//         await prisma.brand.create({
//             data: {
//                 name,
//                 slug: name.toLowerCase()
//                     .replace(/[^a-zа-я0-9]+/g, '-')
//                     .replace(/^-|-$/g, ''),
//             },
//         });
//     }
//
//     console.log(`✅ Создано категорий: ${uniqueCategories.length}, брендов: ${uniqueBrands.length}`);
//
//     // === 3. Создаём товары ===
//     let successCount = 0;
//
//     for (const product of mockProducts) {
//         try {
//             if (!product.category?.name || !product.brand?.name) {
//                 console.warn(`⚠️ Пропущен товар: ${product.name} (нет бренда или категории)`);
//                 continue;
//             }
//
//             const category = await prisma.category.findUnique({
//                 where: { name: product.category.name }
//             });
//
//             const brand = await prisma.brand.findUnique({
//                 where: { name: product.brand.name }
//             });
//
//             if (!category || !brand) {
//                 console.warn(`⚠️ Пропущен товар: ${product.name} (не найдена категория или бренд)`);
//                 continue;
//             }
//
//             await prisma.product.create({
//                 data: {
//                     article: product.article,
//                     name: product.name,
//                     description: product.description || '',
//                     price: product.price,
//                     oldPrice: product.oldPrice,
//                     stock: product.stock,
//                     images: product.images || [],
//                     imagePaths: product.imagePaths || [],
//                     voltage: product.voltage,
//                     features: product.features || [],
//                     specs: product.specs || {},
//                     categoryId: category.id,
//                     brandId: brand.id,
//                 },
//             });
//
//             successCount++;
//             console.log(`✅ Добавлен: ${product.name}`);
//         } catch (error) {
//             console.error(`❌ Ошибка при добавлении ${product.name}:`, error);
//         }
//     }
//
//     console.log(`\n🎉 Сидирование завершено! Успешно добавлено товаров: ${successCount}/${mockProducts.length}`);
// }
//
// main()
//     .catch((e) => {
//         console.error('❌ Критическая ошибка сидирования:', e);
//         process.exit(1);
//     })
//     .finally(async () => {
//         await prisma.$disconnect();
//     });