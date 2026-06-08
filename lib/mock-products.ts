
export type Product = {
    id: number;
    article: string;
    name: string;
    brand?: {
        id: string;
        name: string;
        slug: string;
    } | null;

    category?: {
        id: string;
        name: string;
        slug: string;
    } | null;
    price: number;
    oldPrice?: number;
    stock: number;
    images: string[];

    imagePaths?: string[];

    // category: string;
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
        brand: {
            id: "pol",
            name: "Police",
            slug: "police"
        },
        category: {
            id: "esh",
            name: "Электрошокеры",
            slug: "electroshockers"
        },
        price: 4290,
        oldPrice: 4990,
        stock: 12,
        images: ["https://picsum.photos/id/1015/600/600", "https://picsum.photos/id/1016/600/600"],
        imagePaths: ["police_1101_1.jpg", "police_1101_2.jpg"],
        voltage: 1100000,
        description: "Профессиональная модель с возможностью дистанционного поражения.",
        features: ["Дистанционное поражение", "Лазерный целеуказатель", "Картриджи в комплекте"],
        specs: {
            "Напряжение": "1 100 000 В",
            "Дальность": "до 4.5 м",
            "Вес": "340 г",
        },
    },
    {
        id: 2,
        article: "TAS-X26P",
        name: "Электрошокер Taser X26P",
        brand: {
            id: "tas",
            name: "Taser",
            slug: "taser"
        },
        category: {
            id: "esh",
            name: "Электрошокеры",
            slug: "electroshockers"
        },
        price: 12490,
        stock: 5,
        images: ["https://picsum.photos/id/1020/600/600"],
        imagePaths: ["taser_x26p.jpg"],
        voltage: 50000,
        description: "Профессиональная модель с возможностью дистанционного поражения.",
        features: ["Дистанционное поражение", "Лазерный целеуказатель"],
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
        brand: {
            id: "osa",
            name: "Оса",
            slug: "osa"
        },
        category: {
            id: "esh",
            name: "Электрошокеры",
            slug: "electroshockers"
        },
        price: 2890,
        oldPrice: 3290,
        stock: 23,
        images: ["https://picsum.photos/id/106/600/600"],
        imagePaths: ["osa_118.jpg"],
        voltage: 900000,
        description: "Самый популярный бюджетный электрошокер российского производства.",
        features: ["Компактный размер", "Высокая надёжность"],
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
        brand: {
            id: "spk",
            name: "Spark",
            slug: "spark"
        },
        category: {
            id: "esh",
            name: "Электрошокеры",
            slug: "electroshockers"
        },
        price: 6750,
        stock: 8,
        images: ["https://picsum.photos/id/201/600/600"],
        imagePaths: ["spark_500.jpg"],
        voltage: 1200000,
        description: "Мощный шокер с очень ярким фонарём 500 люмен.",
        features: ["Сверхъяркий фонарь", "USB зарядка"],
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
        brand: {
            id: "pol",
            name: "Police",
            slug: "police"
        },
        category: {
            id: "gel",
            name: "Перцовые баллончики",
            slug: "pepper-sprays"
        },
        price: 890,
        stock: 45,
        images: ["https://picsum.photos/id/1074/600/600"],
        imagePaths: ["police_gel.jpg"],
        description: "Гелевый перцовый баллончик — не разносится ветром.",
        features: ["Гелевый состав", "Дальность 5 метров"],
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
        brand: {
            id: "pol",
            name: "Police",
            slug: "police"
        },
        category: {
            id: "dub",
            name: "Дубинки и стеки",
            slug: "batons"
        },
        price: 2450,
        stock: 18,
        images: ["https://picsum.photos/id/180/600/600"],
        imagePaths: ["police_21.jpg"],
        description: "Прочная телескопическая дубинка из стали.",
        features: ["Быстрое раскрытие", "Противоскользящая рукоятка"],
        specs: {
            "Длина": "21 дюйм (53 см)",
            "Материал": "Сталь + резина",
            "Вес": "420 г",
        },
    },

    // ==================== ДОПОЛНИТЕЛЬНЫЕ 6 ТОВАРОВ ====================

    {
        id: 7,
        article: "ES-700-PRO",
        name: "Электрошокер Police Pro 700",
        brand: { id: "pol", name: "Police", slug: "police" },
        category: { id: "esh", name: "Электрошокеры", slug: "electroshockers" },
        price: 5790,
        oldPrice: 6490,
        stock: 15,
        images: ["https://picsum.photos/id/201/600/600"],
        imagePaths: ["police_pro_700.jpg"],
        voltage: 700000,
        description: "Улучшенная профессиональная модель.",
        features: ["Мощный фонарь", "Ударопрочный корпус"],
        specs: {
            "Напряжение": "700 000 В",
            "Дальность": "до 5 м",
            "Вес": "380 г",
        },
    },
    {
        id: 8,
        article: "GEL-150",
        name: "Перцовый баллончик Police Gel 150 мл",
        brand: { id: "pol", name: "Police", slug: "police" },
        category: { id: "gel", name: "Перцовые баллончики", slug: "pepper-sprays" },
        price: 1190,
        stock: 38,
        images: ["https://picsum.photos/id/1074/600/600"],
        imagePaths: ["police_gel_150.jpg"],
        description: "Увеличенный объём гелевого баллончика.",
        features: ["Гелевый состав", "Дальность 6 метров"],
        specs: {
            "Объём": "150 мл",
            "Дальность": "6 м",
        },
    },
    {
        id: 9,
        article: "DUB-26",
        name: "Телескопическая дубинка Police 26\"",
        brand: { id: "pol", name: "Police", slug: "police" },
        category: { id: "dub", name: "Дубинки и стеки", slug: "batons" },
        price: 3190,
        oldPrice: 3590,
        stock: 11,
        images: ["https://picsum.photos/id/180/600/600"],
        imagePaths: ["police_26.jpg"],
        description: "Длинная телескопическая дубинка.",
        features: ["Длина 26 дюймов", "Быстрое раскрытие"],
        specs: {
            "Длина": "26 дюймов (66 см)",
            "Вес": "520 г",
        },
    },
    {
        id: 10,
        article: "FLASH-900",
        name: "Тактический фонарь Police 900 люмен",
        brand: { id: "pol", name: "Police", slug: "police" },
        category: { id: "acc", name: "Фонари и аксессуары", slug: "accessories" },
        price: 1890,
        stock: 27,
        images: ["https://picsum.photos/id/201/600/600"],
        imagePaths: ["police_flash_900.jpg"],
        description: "Мощный тактический фонарь.",
        features: ["900 люмен", "USB зарядка"],
        specs: {
            "Яркость": "900 люмен",
            "Время работы": "до 8 часов",
            "Вес": "180 г",
        },
    },
    {
        id: 11,
        article: "KNIFE-TAC",
        name: "Тактический нож Police Tanto",
        brand: { id: "pol", name: "Police", slug: "police" },
        category: { id: "knife", name: "Ножи и инструменты", slug: "knives" },
        price: 2450,
        stock: 14,
        images: ["https://picsum.photos/id/180/600/600"],
        imagePaths: ["police_tanto.jpg"],
        description: "Тактический нож с фиксированным клинком.",
        features: ["Нержавеющая сталь", "Тактическая рукоять"],
        specs: {
            "Длина клинка": "12 см",
            "Материал": "440C сталь",
            "Вес": "210 г",
        },
    },
    {
        id: 12,
        article: "STUN-300",
        name: "Электрошокер-дубинка Police Stun 300",
        brand: { id: "pol", name: "Police", slug: "police" },
        category: { id: "esh", name: "Электрошокеры", slug: "electroshockers" },
        price: 4890,
        oldPrice: 5490,
        stock: 9,
        images: ["https://picsum.photos/id/106/600/600"],
        imagePaths: ["police_stun_300.jpg"],
        voltage: 300000,
        description: "Комбинированное устройство: дубинка + электрошокер.",
        features: ["Функция дубинки", "Электрошок", "Фонарь"],
        specs: {
            "Напряжение": "300 000 В",
            "Длина": "48 см",
            "Вес": "680 г",
        },
    },
];

