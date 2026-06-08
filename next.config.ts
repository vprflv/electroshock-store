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
                hostname: '*.picsum.photos',
            },
            {
                protocol: 'https',
                hostname: 'wxbhvhqqtimovksbulxd.supabase.co',
            },
            {
                protocol: 'https',
                hostname: '*.supabase.co',
            },
        ],
        unoptimized: false,   // можно попробовать false
    },
};

export default nextConfig;