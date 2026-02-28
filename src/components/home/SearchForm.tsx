'use client';

import { useParams, useRouter } from 'next/navigation';
import { FormEvent } from 'react';

export default function SearchForm({ dict }: { dict: any }) {
    const router = useRouter();
    const params = useParams();
    const locale = params.locale || 'en';

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
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted">{dict.hero.location}</label>
                    <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-0 text-text-muted">location_on</span>
                        <input
                            name="location"
                            className="w-full border-0 border-b-2 border-gray-200 bg-transparent py-2 pl-8 pr-2 text-sm font-medium text-text-main placeholder-gray-400 focus:border-primary focus:ring-0"
                            placeholder={dict.hero.locationPlaceholder}
                            type="text"
                        />
                    </div>
                </div>

                {/* Property Type */}
                <div className="relative">
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted">{dict.hero.type}</label>
                    <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-0 text-text-muted">home</span>
                        <select name="category" className="w-full border-0 border-b-2 border-gray-200 bg-transparent py-2 pl-8 pr-2 text-sm font-medium text-text-main focus:border-primary focus:ring-0">
                            <option value="">{dict.hero.typeAny}</option>
                            <option value="house">House</option>
                            <option value="apartment">Apartment</option>
                            <option value="commercial">Commercial</option>
                            <option value="land">Land</option>
                        </select>
                    </div>
                </div>

                {/* Price Range */}
                <div className="relative">
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted">{dict.hero.priceRange}</label>
                    <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-0 text-text-muted">attach_money</span>
                        <select name="priceRange" className="w-full border-0 border-b-2 border-gray-200 bg-transparent py-2 pl-8 pr-2 text-sm font-medium text-text-main focus:border-primary focus:ring-0">
                            <option value="">{dict.hero.priceAny}</option>
                            <option value="100-300">$100k - $300k</option>
                            <option value="300-600">$300k - $600k</option>
                            <option value="600-1000">$600k - $1M</option>
                            <option value="1000+">$1M+</option>
                        </select>
                    </div>
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                    <button type="submit" className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 font-bold text-white transition-all hover:bg-primary/90 hover:shadow-lg focus:ring-2 focus:ring-primary focus:ring-offset-2 md:h-14">
                        <span className="material-symbols-outlined">search</span>
                        <span>{dict.hero.search}</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
