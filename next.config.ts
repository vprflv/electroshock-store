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
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
        unoptimized: true,
        domains: ['picsum.photos'],
        dangerouslyAllowSVG: true,
        minimumCacheTTL: 60,
    },
};

export default nextConfig;