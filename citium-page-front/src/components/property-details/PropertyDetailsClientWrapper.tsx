'use client';

// Static Components
import PropertyHeader from '@/components/property-details/PropertyHeader';
import PropertyGallery from '@/components/property-details/PropertyGallery';
import PropertySpecs from '@/components/property-details/PropertySpecs';
import PropertyAmenities from '@/components/property-details/PropertyAmenities';
import AgentContactForm from '@/components/property-details/AgentContactForm';
import SimilarProperties from '@/components/property-details/SimilarProperties';
import PropertyMap from '@/components/property-details/PropertyMap';
import { usePropertyDetails } from '@/hooks/useProperties';
import { useState } from 'react';

export default function PropertyDetailsClientWrapper({
    dict,
    locale,
    id
}: {
    dict: any,
    locale: string,
    id: string
}) {
    const { data: property, isLoading, isError } = usePropertyDetails(id);
    const [expanded, setExpanded] = useState(false);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-24 text-gray-400 min-h-[60vh]">
                <span className="material-symbols-outlined text-4xl animate-spin mb-4">progress_activity</span>
                <p>Loading property details...</p>
            </div>
        );
    }

    if (isError || !property) {
        return (
            <div className="flex flex-col items-center justify-center p-24 text-red-500 min-h-[60vh]">
                <span className="material-symbols-outlined text-4xl mb-4">error</span>
                <p>Property not found or error loading details.</p>
                <a href={`/${locale}/properties`} className="mt-4 text-primary font-bold hover:underline">
                    {dict?.properties?.breadcrumbs || "Back to search"}
                </a>
            </div>
        );
    }

    // Process properties based on translation needs
    const processedProperty = {
        ...property,
        parkingText: locale === 'es' ? `${property.parking} Espacios` : `${property.parking} Spots`,
        sqftText: locale === 'es' ? `${property.area} m²` : `${property.area} Sq Ft`,
        description: property.description.split('\n\n')
    };

    return (
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-10 py-6">
            {/* Breadcrumb */}
            <div className="flex flex-wrap items-center gap-2 mb-6 text-sm">
                <a className="text-text-muted hover:text-primary transition-colors" href={`/${locale}`}>
                    {locale === 'es' ? 'Inicio' : 'Home'}
                </a>
                <span className="text-gray-400 material-symbols-outlined text-[16px]">chevron_right</span>
                <a className="text-text-muted hover:text-primary transition-colors" href={`/${locale}/properties`}>
                    {dict.properties.quickFilters?.forSaleRent || dict.properties.quickFilters?.forSale || "Properties"}
                </a>
                <span className="text-gray-400 material-symbols-outlined text-[16px]">chevron_right</span>
                <span className="text-text-main font-medium">{processedProperty.title}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content Column */}
                <div className="lg:col-span-8 flex flex-col gap-8">
                    {/* Header Info (Mobile Only) */}
                    <div className="block lg:hidden">
                        <PropertyHeader dict={dict} property={processedProperty} />
                    </div>

                    <PropertyGallery dict={dict} images={processedProperty.images} />

                    {/* Header Info (Desktop) */}
                    <div className="hidden lg:block relative -mt-4">
                        <PropertyHeader dict={dict} property={processedProperty} />
                    </div>

                    <PropertySpecs dict={dict} property={processedProperty} />

                    {/* Description */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-text-main">{dict.propertyDetails?.description?.title || "Description"}</h3>
                        <div  className={`prose max-w-none text-text-muted leading-relaxed ${!expanded ? "line-clamp-5" : ""}`}>
                            {processedProperty.description.map((p, index) => (
                                <p key={index} className={index > 0 ? "mt-4" : ""}>{p}</p>
                            ))}
                        </div>
                        <button onClick={() => setExpanded(!expanded)}
                            className="text-primary font-bold text-sm curs flex items-center gap-1 mt-2" >
                        {
                            expanded
                            ? dict.propertyDetails?.description?.showLess || "Show less"
                            : dict.propertyDetails?.description?.showMore || "Show more"
                        }

                        <span className="material-symbols-outlined text-[16px]">
                            {expanded ? "expand_less" : "expand_more"}
                        </span>
                    </button> 
                    </div>

                    <PropertyAmenities dict={dict} amenities={processedProperty.amenities} />

                    <PropertyMap dict={dict} location={processedProperty.location} coordinates={processedProperty.coordinates} />
                </div>

                {/* Sidebar Sticky Column */}
                <div className="lg:col-span-4 relative">
                    <div className="sticky top-24 space-y-6">
                        <AgentContactForm dict={dict} property={processedProperty} locale={locale} />

                        {/* Mini Safety Card */}
                        <div className="bg-background-light rounded-lg p-4 flex gap-3 items-start border border-gray-200">
                            <span className="material-symbols-outlined text-primary mt-1">shield</span>
                            <div>
                                <h5 className="font-bold text-text-main text-sm">{dict.propertyDetails?.safety?.title || "Safety Tips"}</h5>
                                <p className="text-xs text-text-muted mt-1">
                                    {dict.propertyDetails?.safety?.description || "Never send money over the internet."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <SimilarProperties dict={dict} currentId={id} />
        </div>
    );
}
