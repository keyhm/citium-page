'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export default function QuickFilters({ dict }: { dict: any }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentType = searchParams.get('type') || 'sale';

    const toggleType = () => {
        const params = new URLSearchParams(searchParams.toString());
        if (currentType === 'sale') {
            params.set('type', 'rent');
        } else {
            params.set('type', 'sale');
        }
        router.push(pathname + '?' + params.toString(), { scroll: false });
    };

    return (
        <div className="border-t border-gray-200 bg-surface-light py-3 px-6 flex flex-wrap gap-2 items-center z-10 relative">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background-light hover:bg-gray-100 text-sm font-medium text-text-muted transition-colors">
                <span>{dict.properties.quickFilters.price}</span>
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
            </button>
            <button
                onClick={toggleType}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium transition-colors hover:bg-primary/20"
            >
                <span>{currentType === 'sale' ? dict.properties.quickFilters.forSale : dict.properties.sidebar.rent}</span>
                <span className="material-symbols-outlined text-[18px]">swap_vert</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background-light hover:bg-gray-100 text-sm font-medium text-text-muted transition-colors">
                <span>{dict.properties.quickFilters.bedsBaths}</span>
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background-light hover:bg-gray-100 text-sm font-medium text-text-muted transition-colors">
                <span>{dict.properties.quickFilters.homeType}</span>
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
            </button>
            <div className="flex-1"></div>

        </div>
    );
}
