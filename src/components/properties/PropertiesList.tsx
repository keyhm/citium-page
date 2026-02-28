'use client';

import PropertyCard from '@/components/shared/PropertyCard';
import Pagination from '@/components/shared/Pagination';
import { useProperties } from '@/hooks/useProperties';
import { useSearchParams } from 'next/navigation';

export default function PropertiesList({ dict }: { dict: any }) {
    const searchParams = useSearchParams();

    // Construct filters object from URL
    const filters = {
        type: searchParams.get('type') || undefined,
        category: searchParams.get('category') || undefined,
        minPrice: searchParams.get('minPrice') || undefined,
        maxPrice: searchParams.get('maxPrice') || undefined,
        beds: searchParams.get('beds') || undefined,
        amenities: searchParams.getAll('amenities'),
        page: parseInt(searchParams.get('page') || '1', 10),
        pageSize: 12
    };

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
                    <select className="form-select border-none bg-transparent text-sm font-semibold text-text-main focus:ring-0 cursor-pointer py-0 pl-0 pr-8">
                        <option>{dict.properties.sortNewest}</option>
                        <option>{dict.properties.sortHighToLow}</option>
                        <option>{dict.properties.sortLowToHigh}</option>
                    </select>
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
                        {data.data.map((property: any) => (
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
