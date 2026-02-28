'use client';

import PropertyCard from '@/components/shared/PropertyCard';
import { useFeaturedProperties } from '@/hooks/useProperties';

export default function FeaturedProperties({ dict }: { dict: any }) {
    const { data: properties, isLoading, isError } = useFeaturedProperties();

    return (
        <section className="bg-background-light px-6 py-20 lg:py-28">
            <div className="mx-auto max-w-7xl">
                <div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div>
                        <div className="flex items-center gap-2 mb-2 md:mb-0">
                            <span className="h-px w-8 bg-secondary"></span>
                            <span className="text-sm font-bold uppercase tracking-widest text-secondary">{dict.featured.subtitle}</span>
                        </div>
                        <h2 className="font-display text-3xl font-bold text-text-main md:text-4xl">{dict.featured.title}</h2>
                    </div>
                    <a className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-text-main transition-colors hover:border-primary hover:text-primary" href="#">
                        {dict.featured.viewAll}
                    </a>
                </div>

                {isLoading && (
                    <div className="flex justify-center items-center py-20">
                        <span className="material-symbols-outlined text-4xl text-gray-400 animate-spin">progress_activity</span>
                    </div>
                )}

                {isError && (
                    <div className="text-center text-red-500 py-10">
                        Error loading featured properties.
                    </div>
                )}

                {!isLoading && !isError && properties && (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {properties.map((property) => (
                            <PropertyCard
                                key={property.id}
                                {...property}
                                dict={dict}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
