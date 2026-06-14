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
        unoptimized: true,
    },
};

export default nextConfig;