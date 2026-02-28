'use client';

import PropertyCard from '@/components/shared/PropertyCard';
import { useProperties } from '@/hooks/useProperties';

export default function PropertiesList({ dict }: { dict: any }) {
    // using React Query hook
    const { data, isLoading, isError } = useProperties();

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-gray-400">
                <span className="material-symbols-outlined text-4xl animate-spin mb-4">progress_activity</span>
                <p>Loading properties...</p>
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-red-400">
                <span className="material-symbols-outlined text-4xl mb-4">error</span>
                <p>Error loading properties. Please try again.</p>
            </div>
        );
    }

    const properties = data.data;

    if (properties.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-gray-400">
                <span className="material-symbols-outlined text-4xl mb-4">search_off</span>
                <p>No properties found.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
            {properties.map((property) => (
                <PropertyCard
                    key={property.id}
                    {...property}
                    dict={dict}
                />
            ))}
        </div>
    );
}
