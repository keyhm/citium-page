export default function Pagination() {
    return (
        <div className="flex justify-center items-center gap-2 pb-10 pt-6">
            <button className="size-10 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                <span className="material-symbols-outlined text-text-muted">chevron_left</span>
            </button>
            <button className="size-10 flex items-center justify-center rounded-lg bg-primary text-white font-medium shadow-md shadow-primary/20">1</button>
            <button className="size-10 flex items-center justify-center rounded-lg border border-gray-200 text-text-main hover:bg-gray-100 transition-colors font-medium">2</button>
            <button className="size-10 flex items-center justify-center rounded-lg border border-gray-200 text-text-main hover:bg-gray-100 transition-colors font-medium">3</button>
            <span className="text-gray-400 px-2">...</span>
            <button className="size-10 flex items-center justify-center rounded-lg border border-gray-200 text-text-main hover:bg-gray-100 transition-colors font-medium">8</button>
            <button className="size-10 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                <span className="material-symbols-outlined text-text-muted">chevron_right</span>
            </button>
        </div>
    );
}
