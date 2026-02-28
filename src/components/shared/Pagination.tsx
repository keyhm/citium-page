'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({
    currentPage = 1,
    pageCount = 1
}: {
    currentPage?: number;
    pageCount?: number;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    if (pageCount <= 1) return null;

    const onPageChange = (page: number) => {
        if (page < 1 || page > pageCount) return;
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.push(`${pathname}?${params.toString()}`, { scroll: true });
    };

    // Simple logic for the range of visible buttons
    const getVisiblePages = () => {
        const pages: (number | string)[] = [];
        if (pageCount <= 5) {
            for (let i = 1; i <= pageCount; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, '...', pageCount);
            } else if (currentPage >= pageCount - 2) {
                pages.push(1, '...', pageCount - 3, pageCount - 2, pageCount - 1, pageCount);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', pageCount);
            }
        }
        return pages;
    };

    return (
        <div className="flex justify-center items-center gap-2 pb-10 pt-6">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="size-10 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <span className="material-symbols-outlined text-text-muted">chevron_left</span>
            </button>

            {getVisiblePages().map((p, idx) => (
                p === '...' ? (
                    <span key={`dots-${idx}`} className="text-gray-400 px-2">...</span>
                ) : (
                    <button
                        key={p}
                        onClick={() => typeof p === 'number' && onPageChange(p)}
                        className={`size-10 flex items-center justify-center rounded-lg transition-colors font-medium border ${p === currentPage ? 'bg-primary text-white border-primary shadow-md shadow-primary/20' : 'border-gray-200 text-text-main hover:bg-gray-100'}`}
                    >
                        {p}
                    </button>
                )
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === pageCount}
                className="size-10 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <span className="material-symbols-outlined text-text-muted">chevron_right</span>
            </button>
        </div>
    );
}
