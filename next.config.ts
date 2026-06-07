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
                hostname: '**.picsum.photos',   // важно для поддоменов (cdn и т.д.)
            },
        ],
    },
};

export default nextConfig;