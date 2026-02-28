export default function QuickFilters({ dict }: { dict: any }) {
    return (
        <div className="border-t border-gray-200 bg-surface-light py-3 px-6 flex flex-wrap gap-2 items-center">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background-light hover:bg-gray-100 text-sm font-medium text-text-muted transition-colors">
                <span>{dict.properties.quickFilters.price}</span>
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium transition-colors">
                <span>{dict.properties.quickFilters.forSale}</span>
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
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
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                <span className="material-symbols-outlined text-[20px]">bookmark</span>
                <span>{dict.properties.quickFilters.saveSearch}</span>
            </button>
        </div>
    );
}
