'use client';

import Link from 'next/link';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white pb-20">
            <div className="max-w-3xl mx-auto px-6 pt-12 pb-10">
                <Link href="/" className="text-yellow-400 hover:text-yellow-300 mb-10 inline-flex items-center gap-2">
                    ← На главную
                </Link>

                <h1 className="text-4xl md:text-5xl font-bold mb-10">
                    Политика конфиденциальности
                </h1>

                <div className="prose prose-invert prose-zinc max-w-none text-[17px] leading-relaxed">
                    <p className="text-zinc-400 mb-10">
                        Последняя редакция: 14 июня 2026 года
                    </p>

                    <h2 className="text-2xl font-semibold mt-12 mb-4">1. Общие положения</h2>
                    <p>
                        Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональной информации пользователей сайта ОСА (далее — Сайт).
                    </p>

                    <h2 className="text-2xl font-semibold mt-12 mb-4">2. Какие данные мы собираем</h2>
                    <ul className="list-disc pl-6 space-y-3">
                        <li>Фамилия, имя и отчество</li>
                        <li>Номер телефона</li>
                        <li>Адрес электронной почты</li>
                        <li>Адрес доставки</li>
                        <li>Данные о заказах</li>
                        <li>Данные cookies и техническая информация (IP-адрес, тип устройства, браузер)</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-12 mb-4">3. Цели обработки данных</h2>
                    <p>Мы используем ваши данные исключительно для:</p>
                    <ul className="list-disc pl-6 space-y-3">
                        <li>Обработки и доставки заказов</li>
                        <li>Уведомлений о статусе заказа</li>
                        <li>Ответов на ваши обращения</li>
                        <li>Улучшения работы сайта и сервиса</li>
                        <li>Выполнения требований законодательства РФ</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-12 mb-4">4. Cookies и аналогичные технологии</h2>
                    <p>
                        Сайт использует cookies для повышения удобства пользования. Вы можете отключить cookies в настройках вашего браузера. Однако это может повлиять на корректную работу некоторых функций сайта.
                    </p>

                    <h2 className="text-2xl font-semibold mt-12 mb-4">5. Передача данных третьим лицам</h2>
                    <p>
                        Мы не продаём и не передаём ваши персональные данные третьим лицам для маркетинговых целей.
                        Передача возможна только:
                    </p>
                    <ul className="list-disc pl-6 space-y-3">
                        <li>Службам доставки (для выполнения заказа)</li>
                        <li>Платёжным системам (для обработки оплаты)</li>
                        <li>По требованию государственных органов в соответствии с законодательством РФ</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-12 mb-4">6. Ваши права</h2>
                    <p>Вы имеете право:</p>
                    <ul className="list-disc pl-6 space-y-3">
                        <li>Получить информацию о своих персональных данных</li>
                        <li>Потребовать исправления или удаления данных</li>
                        <li>Отозвать согласие на обработку данных</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-12 mb-4">7. Безопасность данных</h2>
                    <p>
                        Мы принимаем все необходимые технические и организационные меры для защиты ваших данных от несанкционированного доступа, изменения, раскрытия или уничтожения.
                    </p>

                    <h2 className="text-2xl font-semibold mt-12 mb-4">8. Изменения в Политике</h2>
                    <p>
                        Мы можем обновлять данную Политику. Актуальная версия всегда доступна на этой странице.
                        Продолжая использовать Сайт после изменений, вы соглашаетесь с новой редакцией Политики.
                    </p>

                    <div className="mt-16 p-8 bg-zinc-900 border border-zinc-700 rounded-3xl">
                        <p className="font-medium">По всем вопросам, связанным с обработкой персональных данных, вы можете обращаться по адресу:</p>
                        <p className="mt-4 text-yellow-400">support@osa.store</p>
                    </div>
                </div>
            </div>
        </div>
    );
}