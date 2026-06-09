export const SUPABASE_PUBLIC_URL = 'https://wxbhvhqqtimovksbulxd.supabase.co';

export const getImageUrl = (filename: string): string => {
    if (!filename) return 'https://picsum.photos/id/106/600/600';
    if (filename.startsWith('http')) return filename;

    return `${SUPABASE_PUBLIC_URL}/storage/v1/object/public/product-images/${filename}`;
};



