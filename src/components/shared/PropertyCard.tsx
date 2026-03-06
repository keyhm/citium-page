'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PropertyCardDTO } from '@/types/property';
import { formatPrice } from '@/lib/format';

interface PropertyProps extends PropertyCardDTO {
    dict: any;
}

export default function PropertyCard({
    id, image, location, title, price, beds, baths, area, type, category, dict
}: PropertyProps) {

    const getBadgeColor = () => {
        // assign colors to a handful of common categories, any unknowns fall back to house styling
        switch (category) {
            case 'apartamento':
            case 'estudio':
                return 'bg-accent-blue text-slate-900';
            case 'local':
            case 'edificio':
            case 'bodega':
            case 'consultorio':
                return 'bg-accent-grey text-slate-900';
            case 'lote':
            case 'finca':
                return 'bg-accent-green text-slate-900';
            case 'casa':
            default:
                return 'bg-white/90 text-primary';
        }
    };

    const getTypeColor = () => {
        switch (type) {
            case 'sale':
                return 'bg-blue-500 text-white';
            case 'rent':
                return 'bg-grey-500 text-white';
            case 'sale_rent':
                // both sale and rent; stick with primary so it's neutral
                return 'bg-primary text-white';
            default:
                return 'bg-primary text-white';
        }
    };

    const getTypeText = () => {
        // show a localized label for the property's transaction type.  the
        // value is driven by the `type` field on the DTO which can be
        // "sale", "rent" or "sale_rent" (when both prices are supplied).
        // we fall back to the raw value if the dictionary is missing.
        if (!dict || !dict.featured) return type;

        switch (type) {
            case 'sale':
                return dict.featured.forSale;
            case 'rent':
                return dict.featured.forRent;
            case 'sale_rent':
                // English/Spanish dictionaries already include this key
                return dict.featured.forSaleRent || 'Sale_Rent';
            default:
                return type;
        }
    };

    // Fallback translation mapping
    const getCategoryText = () => {
        if (!dict || !dict.properties || !dict.properties.tags) return category;
        return dict.properties.tags[category] || category;
    }

    const pathname = usePathname();
    // first segment of pathname is locale (e.g. /en or /es)
    const locale = pathname?.split('/')?.[1] || 'en';

    const cardContent = (
        <div className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-xl border border-gray-100 flex flex-col">
            <div className="relative aspect-[4/3] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${image}')` }}
                />
                <div className="absolute left-3 top-3 flex gap-1">
                    <div className={`rounded-md px-2.5 py-1 text-xs font-bold shadow-sm backdrop-blur-sm ${getBadgeColor()}`}>
                        {getCategoryText()}
                    </div>
                    <div className={`rounded-md px-2.5 py-1 text-xs font-bold shadow-sm backdrop-blur-sm ${getTypeColor()}`}>
                        {getTypeText()}
                    </div>
                </div>
                {/* <button
                    onClick={useFavorites().toggleFavorite.bind(null, id)}
                    className="absolute right-3 top-3 rounded-full bg-black/20 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-black/40"
                >
                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                </button> */}
            </div>
            <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-text-main">
                        {formatPrice(price)}
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

    return (
        <Link href={`/${locale}/properties/${id}`} className="block">
            {cardContent}
        </Link>
    );
}
