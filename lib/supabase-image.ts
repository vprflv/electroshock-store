

export const getImageUrl = (filename?: string | null): string => {
    if (!filename) {
        return 'images/placeholder-product.jpg';
    }


    if (filename.startsWith('http')) {
        return filename;
    }


    const SUPABASE_PUBLIC_URL = 'https://wxbhvhqqtimovksbulxd.supabase.co';

    return `${SUPABASE_PUBLIC_URL}/storage/v1/object/public/product-images/${filename}`;
};



