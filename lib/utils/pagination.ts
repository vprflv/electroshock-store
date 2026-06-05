
export default function getPaginationPages(current: number, total: number): (number | string)[] {
    if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];

    const side = 2;

    pages.push(1);

    if (current > side + 2) {
        pages.push('...');
    }

    const start = Math.max(2, current - side);
    const end = Math.min(total - 1, current + side);

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (current < total - side - 1) {
        pages.push('...');
    }

    if (total > 1) {
        pages.push(total);
    }

    return pages;
}