interface PropertyProps {
    id: string | number;
    image: string;
    badge: { type: 'sale' | 'rent' | 'new', text: string, color?: 'blue' | 'grey' | 'green' | 'default' };
    location: string;
    title: string;
    price: string;
    priceSuffix?: string;
    beds: number;
    baths: number;
    sqft: string;
    dict: any;
}

export default function PropertyCard({
    image, badge, location, title, price, priceSuffix, beds, baths, sqft, dict
}: PropertyProps) {

    const getBadgeColor = () => {
        switch (badge.color) {
            case 'blue': return 'bg-accent-blue text-slate-900';
            case 'grey': return 'bg-accent-grey text-slate-900';
            case 'green': return 'bg-accent-green text-slate-900';
            default: return 'bg-white/90 text-primary';
        }
    };

    return (
        <div className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-xl border border-gray-100 flex flex-col">
            <div className="relative aspect-[4/3] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${image}')` }}
                />
                <div className={`absolute left-3 top-3 rounded-md px-2.5 py-1 text-xs font-bold shadow-sm backdrop-blur-sm ${getBadgeColor()}`}>
                    {badge.text}
                </div>
                <button className="absolute right-3 top-3 rounded-full bg-black/20 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-black/40">
                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                </button>
            </div>
            <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-text-main">
                        {price} {priceSuffix && <span className="text-sm font-normal text-text-muted">{priceSuffix}</span>}
                    </h3>
                </div>
                <p className="text-sm font-medium text-text-muted mb-3 truncate">{title} - {location}</p>
                <div className="flex items-center gap-4 text-xs font-medium text-text-muted mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">bed</span>
                        <span>{beds} {dict.featured.beds}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">bathtub</span>
                        <span>{baths} {dict.featured.baths}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">square_foot</span>
                        <span>{sqft} {dict.featured.sqft}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
