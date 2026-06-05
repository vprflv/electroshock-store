
export type Product = {
    id: number;
    article: string;
    name: string;
    brand: string;
    price: number;
    oldPrice?: number;
    stock: number;
    images: string[];
    category: string;
    subcategory?: string;
    voltage?: number;
    description: string;
    features: string[];
    specs: Record<string, string>;
};

export const mockProducts: Product[] = [
    {
        id: 1,
        article: "ES-1101-POL",
        name: "Электрошокер Police 1101",
        brand: "Police",
        price: 4290,
        oldPrice: 4990,
        stock: 12,
        images: [
            "https://picsum.photos/id/1015/600/600",
            "https://picsum.photos/id/1016/600/600",
            "https://picsum.photos/id/1018/600/600"
        ],
        category: "Электрошокеры",
        voltage: 1100000,
        description: "Профессиональная модель с возможностью дистанционного поражения.",
        features: ["Дистанционное поражение", "Лазерный целеуказатель", "Картриджи в комплекте"],
        specs: {
            "Напряжение": "50 000 В",
            "Дальность": "до 4.5 м",
            "Вес": "340 г",
        },
    },
    {
        id: 2,
        article: "TAS-X26P",
        name: "Электрошокер Taser X26P",
        brand: "Taser",
        price: 12490,
        stock: 5,
        images: ["https://picsum.photos/id/1020/400/300"],
        category: "Электрошокеры",
        voltage: 50000,
        description: "Профессиональная модель с возможностью дистанционного поражения.",
        features: ["Дистанционное поражение", "Лазерный целеуказатель", "Картриджи в комплекте"],
        specs: {
            "Напряжение": "50 000 В",
            "Дальность": "до 4.5 м",
            "Вес": "340 г",
        },
    },
    {
        id: 3,
        article: "OSA-118",
        name: "Шокер «Оса» 118",
        brand: "Оса",
        price: 2890,
        oldPrice: 3290,
        stock: 23,
        images: ["https://picsum.photos/id/106/400/300"],
        category: "Электрошокеры",
        voltage: 900000,
        description: "Самый популярный бюджетный электрошокер российского производства.",
        features: ["Компактный размер", "Высокая надёжность", "Простота использования"],
        specs: {
            "Напряжение": "900 000 В",
            "Вес": "140 г",
            "Гарантия": "2 года",
        },
    },
    {
        id: 4,
        article: "SPK-500",
        name: "Электрошокер Spark 500",
        brand: "Spark",
        price: 6750,
        stock: 8,
        images: ["https://picsum.photos/id/201/400/300"],
        category: "Электрошокеры",
        voltage: 1200000,
        description: "Мощный шокер с очень ярким фонарём 500 люмен.",
        features: ["Сверхъяркий фонарь", "USB зарядка", "Ударопрочный корпус"],
        specs: {
            "Напряжение": "1 200 000 В",
            "Фонарь": "500 люмен",
            "Вес": "220 г",
        },
    },
    {
        id: 5,
        article: "PER-900-GEL",
        name: "Перцовый баллончик Police Gel",
        brand: "Police",
        price: 890,
        stock: 45,
        images: ["https://picsum.photos/id/1074/400/300"],
        category: "Перцовые баллончики",
        description: "Гелевый перцовый баллончик — не разносится ветром.",
        features: ["Гелевый состав", "Дальность 5 метров", "Удобный карманный размер"],
        specs: {
            "Объём": "65 мл",
            "Дальность": "5 м",
            "Время распыления": "6 сек",
        },
    },
    {
        id: 6,
        article: "DUB-21",
        name: "Телескопическая дубинка Police 21\"",
        brand: "Police",
        price: 2450,
        stock: 18,
        images: ["https://picsum.photos/id/180/400/300"],
        category: "Дубинки и стеки",
        description: "Прочная телескопическая дубинка из стали.",
        features: ["Быстрое раскрытие", "Противоскользящая рукоятка", "Чехол в комплекте"],
        specs: {
            "Длина": "21 дюйм (53 см)",
            "Материал": "Сталь + резина",
            "Вес": "420 г",
        },
    },
];

export function getProductById(id: number) {
    return mockProducts.find(p => p.id === id);
}