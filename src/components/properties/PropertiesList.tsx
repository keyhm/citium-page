'use client';

import PropertyCard from '@/components/shared/PropertyCard';
import Pagination from '@/components/shared/Pagination';
import { useProperties } from '@/hooks/useProperties';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { PropertyCardDTO } from '@/types/property';

export default function PropertiesList({ dict }: { dict: Record<string, any> }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // Construct filters object from URL
    // build filters object; the toggle cycles through three values (sale, rent, sale_rent)
    // and we want the backend to honour whichever is currently selected.  Previously the
    // "sale_rent" case omitted the `type` filter entirely so that every listing would
    // be returned, which made the toggle misleading.  All three values are now passed
    // through directly and the service will apply an equality filter against `type`.
    const rawType = searchParams.get('type');
    const sort = searchParams.get('sort') || 'newest';
    const filters: Record<string, unknown> = {
        location: searchParams.get('location') || undefined,
        category: searchParams.get('category') || undefined,
        beds: searchParams.get('beds') || undefined,
        baths: searchParams.get('baths') || undefined,
        amenities: searchParams.getAll('amenities'),
        page: parseInt(searchParams.get('page') || '1', 10),
        pageSize: 12,
        sort
    };

    if (rawType) {
        filters.type = rawType;
    }

    // price / sale-rent pricing
    if (searchParams.get('minPrice')) filters.minPrice = searchParams.get('minPrice');
    if (searchParams.get('maxPrice')) filters.maxPrice = searchParams.get('maxPrice');
    if (searchParams.get('minPriceSale')) filters.minPriceSale = searchParams.get('minPriceSale');
    if (searchParams.get('maxPriceSale')) filters.maxPriceSale = searchParams.get('maxPriceSale');
    if (searchParams.get('minPriceRent')) filters.minPriceRent = searchParams.get('minPriceRent');
    if (searchParams.get('maxPriceRent')) filters.maxPriceRent = searchParams.get('maxPriceRent');

    // pass filters to React Query hook
    const { data, isLoading, isError } = useProperties(filters);

    const totalCount = data?.meta?.pagination?.total || 0;
    const pageCount = data?.meta?.pagination?.pageCount || 1;
    const currentPage = data?.meta?.pagination?.page || 1;

    // Process dynamic location text
    const rawLocation = searchParams.get('location');
    const displayLocation = rawLocation
        ? rawLocation.charAt(0).toUpperCase() + rawLocation.slice(1).toLowerCase()
        : dict.properties.allLocations || 'Any Location';

    const breadcrumbText = dict.properties.breadcrumbs?.replace('{{location}}', displayLocation) || `Home / Search / ${displayLocation}`;
    const titleText = dict.properties.title?.replace('{{location}}', displayLocation) || `${displayLocation} Properties`;

    const handleSortChange = (newSort: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('sort', newSort);
        params.set('page', '1'); // Reset to first page when sorting changes
        router.push(pathname + '?' + params.toString(), { scroll: false });
    };

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between md:items-end mb-6 gap-4">
                <div>
                    <div className="text-sm text-text-muted mb-1">
                        {breadcrumbText}
                    </div>
                    <h1 className="text-2xl font-bold text-text-main flex items-center gap-3">
                        {titleText}
                        {data && !isLoading && (
                            <span className="text-base font-medium text-text-muted bg-gray-100 px-3 py-1 rounded-full">
                                {totalCount} {totalCount === 1 ? 'Result' : 'Results'}
                            </span>
                        )}
                    </h1>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-text-muted">{dict.properties.sortBy}</span>
                    <div className="relative inline-block w-40">
                        <select 
                            value={sort}
                            onChange={(e) => handleSortChange(e.target.value)}
                            className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-1.5 px-3 text-sm font-semibold text-text-main transition-colors hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                            <option value="newest">{dict.properties.sortNewest}</option>
                            <option value="priceHighToLow">{dict.properties.sortHighToLow}</option>
                            <option value="priceLowToHigh">{dict.properties.sortLowToHigh}</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-2 top-1/2 transform -translate-y-1/2 text-text-muted pointer-events-none">expand_more</span>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center p-12 text-gray-400 min-h-[400px]">
                    <span className="material-symbols-outlined text-4xl animate-spin mb-4">progress_activity</span>
                    <p>Loading properties...</p>
                </div>
            ) : isError || !data ? (
                <div className="flex flex-col items-center justify-center p-12 text-red-400 min-h-[400px]">
                    <span className="material-symbols-outlined text-4xl mb-4">error</span>
                    <p>Error loading properties. Please try again.</p>
                </div>
            ) : data.data.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-gray-400 min-h-[400px]">
                    <span className="material-symbols-outlined text-4xl mb-4">search_off</span>
                    <p>No properties found.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
                        {data.data.map((property: PropertyCardDTO) => (
                            <PropertyCard
                                key={property.id}
                                {...property}
                                dict={dict}
                            />
                        ))}
                    </div>

                    <Pagination currentPage={currentPage} pageCount={pageCount} />
                </>
            )}
        </>
    );
}
