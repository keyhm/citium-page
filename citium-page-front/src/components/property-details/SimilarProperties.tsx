'use client';

import PropertyCard from '@/components/shared/PropertyCard';
import { useSimilarProperties } from '@/hooks/useProperties';
import { Dictionary } from '@/types/dictionary';

export default function SimilarProperties({ dict, currentId }: { dict: Dictionary, currentId: string }) {
    const { data: properties, isLoading, isError } = useSimilarProperties(currentId);

    if (isLoading) {
        return (
            <div className="mt-16 mb-8 flex flex-col items-center justify-center p-12 text-gray-400">
                <span className="material-symbols-outlined text-4xl animate-spin mb-4">progress_activity</span>
            </div>
        );
    }

    if (isError || !properties || properties.length === 0) {
        return null; // Don't show the section if there's an error or no similar properties
    }

    return (
        <div className="mt-16 mb-8">
            <h3 className="text-2xl font-bold text-text-main mb-6">{dict.propertyDetails.similar.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map(property => (
                    <PropertyCard key={property.id} dict={dict} {...property} />
                ))}
            </div>
        </div>
    );
}
