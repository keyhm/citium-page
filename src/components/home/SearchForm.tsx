'use client';

import { useParams, useRouter } from 'next/navigation';
import { FormEvent } from 'react';

export default function SearchForm({ dict }: { dict: any }) {
    const router = useRouter();
    const params = useParams();
    const locale = params.locale || 'en';

    const categories = [
        'casa',
        'apartamento',
        'aparta estudio',
        'local',
        'lote',
        'finca',
        'edificio',
        'bodega',
        'consultorio'
    ];

    const locations = [
        "Pereira",
        "Dosquebradas",
        "Santa Rosa",
        "La Virginia",
        "Cerritos",
        "Guacari",
        "Arjona",
    ];

    const priceRanges = [
        { value: '100-300', label: '$100k - $300k' },
        { value: '300-600', label: '$300k - $600k' },
        { value: '600-1000', label: '$600k - $1M' },
        { value: '1000+', label: '$1M+' }
    ];

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const searchParams = new URLSearchParams();

        const location = formData.get('location') as string;
        const category = formData.get('category') as string;
        const priceRange = formData.get('priceRange') as string;

        if (location) searchParams.set('location', location);
        if (category) searchParams.set('category', category);

        if (priceRange) {
            if (priceRange === '100-300') {
                searchParams.set('minPrice', '100000');
                searchParams.set('maxPrice', '300000');
            } else if (priceRange === '300-600') {
                searchParams.set('minPrice', '300000');
                searchParams.set('maxPrice', '600000');
            } else if (priceRange === '600-1000') {
                searchParams.set('minPrice', '600000');
                searchParams.set('maxPrice', '1000000');
            } else if (priceRange === '1000+') {
                searchParams.set('minPrice', '1000000');
            }
        }

        router.push(`/${locale}/properties?${searchParams.toString()}`);
    };

    return (
        <div className="w-full max-w-5xl rounded-2xl bg-surface-light p-4 shadow-2xl md:p-6">
            <form onSubmit={handleSearch} className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6">

                {/* Location */}
                <div className="relative">
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted">
                        {dict.hero.location}
                    </label>

                    <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            location_on
                        </span>

                        <select
                            name="location"
                            className="w-full appearance-none rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 px-12 py-3 text-sm font-medium text-text-main shadow-sm transition-all duration-200 hover:border-primary hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary cursor-pointer"
                        >
                            <option value="">{dict.hero.locationAny}</option>

                            {locations.map(loc => (
                                <option key={loc} value={loc}>
                                    {dict.properties?.tags?.[loc] || loc}
                                </option>
                            ))}
                        </select>

                        <span className="material-symbols-outlined absolute right-2 text-text-muted pointer-events-none">
                            expand_more
                        </span>
                    </div>
                </div>

                {/* Property Type */}
                <div className="relative">
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted">
                        {dict.hero.type}
                    </label>

                    <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            home
                        </span>

                        <select
                            name="category"
                            className="w-full appearance-none rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 px-12 py-3 text-sm font-medium text-text-main shadow-sm transition-all duration-200 hover:border-primary hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary cursor-pointer"
                        >
                            <option value="">{dict.hero.typeAny}</option>

                            {categories.map(cat => (
                                <option key={cat} value={cat}>
                                    {dict.properties?.tags?.[cat] || cat}
                                </option>
                            ))}
                        </select>

                        <span className="material-symbols-outlined absolute right-2 text-text-muted pointer-events-none">
                            expand_more
                        </span>
                    </div>
                </div>

                {/* Price Range */}
                <div className="relative">
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted">
                        {dict.hero.priceRange}
                    </label>

                    <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-4 text-text-muted">
                            attach_money
                        </span>

                        <select
                            name="priceRange"
                            className="w-full appearance-none rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 px-12 py-3 text-sm font-medium text-text-main shadow-sm transition-all duration-200 hover:border-primary hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary cursor-pointer"
                        >
                            <option value="">{dict.hero.priceAny}</option>

                            {priceRanges.map(pr => (
                                <option key={pr.value} value={pr.value}>
                                    {pr.label}
                                </option>
                            ))}
                        </select>

                        <span className="material-symbols-outlined absolute right-2 text-text-muted pointer-events-none">
                            expand_more
                        </span>
                    </div>
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                    <button
                        type="submit"
                        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 font-bold text-white transition-all hover:bg-primary/90 hover:shadow-lg focus:ring-2 focus:ring-primary focus:ring-offset-2 md:h-14"
                    >
                        <span className="material-symbols-outlined">search</span>
                        <span>{dict.hero.search}</span>
                    </button>
                </div>

            </form>
        </div>
    );
}