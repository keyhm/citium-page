import { PropertyCardDTO } from '@/types/property';

interface PropertyProps extends PropertyCardDTO {
    dict: any;
}

export default function PropertyCard({
    id, image, location, title, price, beds, baths, area, type, category, dict
}: PropertyProps) {

    const getBadgeColor = () => {
        switch (category) {
            case 'apartment': return 'bg-accent-blue text-slate-900';
            case 'commercial': return 'bg-accent-grey text-slate-900';
            case 'land': return 'bg-accent-green text-slate-900';
            case 'house':
            default: return 'bg-white/90 text-primary';
        }
    };

    // Fallback translation mapping
    const getCategoryText = () => {
        if (!dict || !dict.properties || !dict.properties.tags) return category;
        return dict.properties.tags[category] || category;
    }

    return (
        <div className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-xl border border-gray-100 flex flex-col">
            <div className="relative aspect-[4/3] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${image}')` }}
                />
                <div className={`absolute left-3 top-3 rounded-md px-2.5 py-1 text-xs font-bold shadow-sm backdrop-blur-sm ${getBadgeColor()}`}>
                    {getCategoryText()}
                </div>
                <button className="absolute right-3 top-3 rounded-full bg-black/20 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-black/40">
                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                </button>
            </div>
            <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-text-main">
                        {price}
                    </h3>
                </div>
                <p className="text-sm font-medium text-text-muted mb-3 truncate">{title} - {location}</p>
                <div className="flex items-center gap-4 text-xs font-medium text-text-muted mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">bed</span>
                        <span>{beds} {dict?.featured?.beds || 'Beds'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">bathtub</span>
                        <span>{baths} {dict?.featured?.baths || 'Baths'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">square_foot</span>
                        <span>{area} {dict?.featured?.sqft || 'Sqft'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
