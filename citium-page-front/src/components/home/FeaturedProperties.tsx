'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import PropertyCard from '@/components/shared/PropertyCard';
import { useFeaturedProperties } from '@/hooks/useProperties';
import { Dictionary } from '@/types/types';

export default function FeaturedProperties({ dict, locale }: { dict: Dictionary ; locale: 'en' | 'es' }) {
    const { data: properties, isLoading, isError } = useFeaturedProperties();
    const carouselControls = useAnimationControls();
    const isPausedRef = useRef(false);

    const items = properties ? [...properties, ...properties] : [];

    const startCarousel = async () => {
        if (items.length === 0 || isPausedRef.current) return;

        await carouselControls.start({
            x: ["0%", "-50%"],
            transition: {
                duration: 20,
                ease: "linear",
            },
        });

        carouselControls.set({ x: "0%" });

        if (!isPausedRef.current) {
            startCarousel();
        }
    };

    useEffect(() => {
        startCarousel();
    }, [items.length]);

    const handleMouseEnter = () => {
        isPausedRef.current = true;
        carouselControls.stop();
    };

    const handleMouseLeave = () => {
        isPausedRef.current = false;
        startCarousel(); // reinicia animación
    };

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

                    <a
                        className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-text-main transition-colors hover:border-primary hover:text-primary"
                        href={`/${locale}/properties`}
                    >
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

                {!isLoading && !isError && properties && properties.length > 0 && (
                    <div
                        className="overflow-hidden"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <motion.div animate={carouselControls} className="flex gap-8">
                            {items.map((property, index) => (
                                <div
                                    key={`${property.id}-${index}`}
                                    className="shrink-0 w-full sm:w-80 md:w-96"
                                >
                                    <PropertyCard {...property} dict={dict} />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                )}

                {!isLoading && !isError && (!properties || properties.length === 0) && (
                    <div className="text-center text-gray-400 py-10">
                        No properties available.
                    </div>
                )}
            </div>
        </section>
    );
}