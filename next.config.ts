/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },

            {
                protocol: 'https',
                hostname: '**.picsum.photos',
            },
            // Разрешаем любые домены (только для dev/prod если доверяешь источникам)
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
        dangerouslyAllowSVG: true,
        minimumCacheTTL: 60,
    },
};

export default nextConfig;