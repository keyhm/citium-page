import { formatPrice } from '@/lib/format';
import { Dictionary } from '@/types/types';
import { Property } from '@/types/property';

export default function PropertyHeader({ dict, property }: { dict: Dictionary; property: Property }) {
    return (
        <>
            {/* Header Info (Mobile Only) */}
            <div className="block lg:hidden mb-6">
                <h1 className="text-2xl font-bold text-text-main mb-2">{property.title}</h1>
                <p className="text-lg font-medium text-text-muted">{formatPrice(property.price, dict?.featured?.notPriced)}</p>
                <p className="text-text-muted text-sm">{property.location}</p>
            </div>

            {/* Property Info Header (Desktop) */}
            <div className="hidden lg:block">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-text-main mb-2">{property.title}</h1>
                        <p className="text-text-muted flex items-center gap-1">
                            <span className="material-symbols-outlined text-[18px]">location_on</span>
                            {property.location}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{formatPrice(property.price, dict?.featured?.notPriced)}</p>
                        <p className="text-sm text-text-muted">{property.pricePerSqm}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
