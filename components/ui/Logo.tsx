// components/ui/Logo.tsx
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
    href?: string;
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Logo({
                                 href = "/",
                                 className = "",
                                 size = 'md'
                             }: LogoProps) {

    const sizes = {
        sm: { img: "h-12 sm:h-14", text: "text-2xl sm:text-3xl", ml: "ml-6", pt: "pt-3 sm:pt-4" },
        md: { img: "h-16 sm:h-20 md:h-24", text: "text-3xl sm:text-4xl md:text-5xl", ml: "ml-8", pt: "pt-4 sm:pt-5 md:pt-6" },
        lg: { img: "h-20 sm:h-24 md:h-28 lg:h-32", text: "text-4xl sm:text-5xl md:text-6xl", ml: "ml-10", pt: "pt-5 sm:pt-6 md:pt-7" },
        xl: { img: "h-24 sm:h-28 md:h-32 lg:h-36", text: "text-5xl sm:text-6xl md:text-7xl", ml: "ml-12", pt: "pt-6 sm:pt-7 md:pt-8" },
    }[size];

    return (
        <Link
            href={href}
            className={`flex items-center gap-3 flex-shrink-0 group relative ${className}`}
        >
            {/* Логотип-изображение */}
            <Image
                src="/logo.png"
                alt="ElectroShock"
                width={140}
                height={140}
                className={`${sizes.img} w-auto object-contain 
                   drop-shadow-[0_0_2px_#facc15] 
                   absolute -top-6 sm:-top-8 md:-top-10 lg:-top-12 xl:-top-14
                   -left-2 sm:-left-3 md:-left-4 transition-all duration-300 z-10`}
                priority
            />

            {/* Текстовая часть */}
            <div className={`flex ${sizes.ml} flex-col ${sizes.pt}`}>
                <div className={`${sizes.text} font-black tracking-tighter text-yellow-400 leading-none`}>
                    О.СА
                </div>
                <div className="text-[10px] sm:text-xs text-zinc-500 font-medium tracking-widest">
                    СРЕДСТВА ДЛЯ САМОЗАЩИТЫ
                </div>
            </div>
        </Link>
    );
}