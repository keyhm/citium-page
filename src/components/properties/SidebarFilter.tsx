'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { formatNumber, unformatNumber } from '@/lib/format';

export default function SidebarFilter({ dict, mobile = false }: { dict: any; mobile?: boolean }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // categories must mirror the Strapi enumeration values
    const categories = Object.keys(dict.properties.tags);

    // Local state to hold temporary filter values before pushing to URL (optional, but good for text inputs)
    // keep the raw numeric string (digits only) in state; display formatting is handled on render
    const [minPrice, setMinPrice] = useState(() => unformatNumber(searchParams.get('minPrice') || ''));
    const [maxPrice, setMaxPrice] = useState(() => unformatNumber(searchParams.get('maxPrice') || ''));

    const currentType = (searchParams.get('type') as 'sale' | 'rent' | 'sale_rent') || 'sale';

    // Apply a single filter to the URL
    const applyFilter = useCallback(
        (name: string, value: string | null) => {
            const params = new URLSearchParams(searchParams.toString());

            if (value === null || value === '') {
                params.delete(name);
            } else {
                params.set(name, value);
            }

            // Push the new URL without refreshing the page
            router.push(pathname + '?' + params.toString(), { scroll: false });
        },
        [searchParams, pathname, router]
    );

    // Apply array-like filters (e.g., categories separated by comma)
    const toggleCategories = (category: string) => {
        const currentCats = searchParams.get('category')?.split(',') || [];
        let newCats: string[];

        if (currentCats.includes(category)) {
            newCats = currentCats.filter(c => c !== category);
        } else {
            newCats = [...currentCats, category];
        }

        applyFilter('category', newCats.length ? newCats.join(',') : null);
    };

    const handlePriceBlur = () => {
        const params = new URLSearchParams(searchParams.toString());
        // state already holds plain digits; that's what we send to the URL
        if (minPrice) params.set('minPrice', minPrice);
        else params.delete('minPrice');

        if (maxPrice) params.set('maxPrice', maxPrice);
        else params.delete('maxPrice');

        router.push(pathname + '?' + params.toString(), { scroll: false });
    };

    const resetFilters = () => {
        setMinPrice('');
        setMaxPrice('');
        router.push(pathname, { scroll: false });
    };

    const currentBeds = searchParams.get('beds') || '';
    const currentCategories = searchParams.get('category')?.split(',') || [];
    const currentBaths = searchParams.get('baths') || '';

    const content = (
        <>
            <div className="p-5 border-b border-gray-100 sticky top-0 bg-surface-light z-10">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg text-text-main">{dict.properties.sidebar.title}</h3>
                    <button onClick={resetFilters} className="text-sm text-primary font-medium cursor-pointer">{dict.properties.sidebar.reset}</button>
                </div>
                {/* Status Toggle */}
                <div className="flex bg-background-light p-1 rounded-lg mb-4">
                    <button
                        onClick={() => applyFilter('type', 'sale')}
                        className={`flex-1 py-1.5 text-sm font-medium rounded-md text-center transition-colors ${currentType === 'sale' ? 'bg-white shadow-sm text-text-main' : 'text-text-muted hover:text-text-main'}`}
                    >
                        {dict.properties.sidebar.buy}
                    </button>
                    <button
                        onClick={() => applyFilter('type', 'rent')}
                        className={`flex-1 py-1.5 text-sm font-medium rounded-md text-center transition-colors ${currentType === 'rent' ? 'bg-white shadow-sm text-text-main' : 'text-text-muted hover:text-text-main'}`}
                    >
                        {dict.properties.sidebar.rent}
                    </button>
                </div>
            </div>
            <div className="p-5 space-y-6">
                {/* Property Type */}
                <div>
                    <h4 className="font-semibold text-sm text-text-main mb-3">{dict.properties.sidebar.propertyType}</h4>
                    <div className="space-y-2">
                        {categories.map(cat => (
                            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    checked={currentCategories.includes(cat)}
                                    onChange={() => toggleCategories(cat)}
                                    className="form-checkbox rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" type="checkbox"
                                />
                                <span className="text-sm text-text-muted group-hover:text-primary transition-colors">
                                    {dict.properties.tags?.[cat] || cat}
                                </span>
                                <div className="ml-auto size-2 rounded-full bg-accent-blue"></div>
                            </label>
                        ))}
                    </div>
                </div>
                {/* Price Range */}
                <div>
                    <h4 className="font-semibold text-sm text-text-main mb-3">{dict.properties.sidebar.priceRange}</h4>
                    <div className="flex items-center gap-2 mb-2">
                        <input
                            value={formatNumber(minPrice)}
                            onChange={(e) => setMinPrice(unformatNumber(e.target.value))}
                            onBlur={handlePriceBlur}
                            className="w-full text-sm border-gray-200 rounded-lg bg-background-light focus:ring-primary focus:border-primary px-3 py-2"
                            placeholder={dict.properties.sidebar.min} type="text"
                        />
                        <span className="text-gray-400">-</span>
                        <input
                            value={formatNumber(maxPrice)}
                            onChange={(e) => setMaxPrice(unformatNumber(e.target.value))}
                            onBlur={handlePriceBlur}
                            className="w-full text-sm border-gray-200 rounded-lg bg-background-light focus:ring-primary focus:border-primary px-3 py-2"
                            placeholder={dict.properties.sidebar.max} type="text"
                        />
                    </div>
                </div>
                {/* Beds */}
                <div>
                    <h4 className="font-semibold text-sm text-text-main mb-3">{dict.properties.sidebar.bedrooms}</h4>
                    <div className="flex gap-2">
                        <button onClick={() => applyFilter('beds', null)} className={`flex-1 py-1.5 border rounded-md text-sm transition-colors ${!currentBeds ? 'bg-primary text-white border-primary' : 'border-gray-200 hover:border-primary hover:text-primary text-text-muted'}`}>{dict.properties.sidebar.any}</button>
                        <button onClick={() => applyFilter('beds', '1')} className={`flex-1 py-1.5 border rounded-md text-sm transition-colors ${currentBeds === '1' ? 'bg-primary text-white border-primary' : 'border-gray-200 hover:border-primary hover:text-primary text-text-muted'}`}>1</button>
                        <button onClick={() => applyFilter('beds', '2')} className={`flex-1 py-1.5 border rounded-md text-sm transition-colors ${currentBeds === '2' ? 'bg-primary text-white border-primary' : 'border-gray-200 hover:border-primary hover:text-primary text-text-muted'}`}>2</button>
                        <button onClick={() => applyFilter('beds', '3')} className={`flex-1 py-1.5 border rounded-md text-sm transition-colors ${currentBeds === '3' ? 'bg-primary text-white border-primary' : 'border-gray-200 hover:border-primary hover:text-primary text-text-muted'}`}>3</button>
                        <button onClick={() => applyFilter('beds', '4')} className={`flex-1 py-1.5 border rounded-md text-sm transition-colors ${currentBeds === '4' ? 'bg-primary text-white border-primary' : 'border-gray-200 hover:border-primary hover:text-primary text-text-muted'}`}>4+</button>
                    </div>
                </div>

                {/* Baths */}
                <div>
                    <h4 className="font-semibold text-sm text-text-main mb-3">{dict.properties.sidebar.bathrooms}</h4>
                    <div className="flex gap-2">
                        <button onClick={() => applyFilter('baths', null)} className={`flex-1 py-1.5 border rounded-md text-sm transition-colors ${!currentBaths ? 'bg-primary text-white border-primary' : 'border-gray-200 hover:border-primary hover:text-primary text-text-muted'}`}>{dict.properties.sidebar.any}</button>
                        <button onClick={() => applyFilter('baths', '1')} className={`flex-1 py-1.5 border rounded-md text-sm transition-colors ${currentBaths === '1' ? 'bg-primary text-white border-primary' : 'border-gray-200 hover:border-primary hover:text-primary text-text-muted'}`}>1</button>
                        <button onClick={() => applyFilter('baths', '2')} className={`flex-1 py-1.5 border rounded-md text-sm transition-colors ${currentBaths === '2' ? 'bg-primary text-white border-primary' : 'border-gray-200 hover:border-primary hover:text-primary text-text-muted'}`}>2</button>
                        <button onClick={() => applyFilter('baths', '3')} className={`flex-1 py-1.5 border rounded-md text-sm transition-colors ${currentBaths === '3' ? 'bg-primary text-white border-primary' : 'border-gray-200 hover:border-primary hover:text-primary text-text-muted'}`}>3</button>
                        <button onClick={() => applyFilter('baths', '4')} className={`flex-1 py-1.5 border rounded-md text-sm transition-colors ${currentBaths === '4' ? 'bg-primary text-white border-primary' : 'border-gray-200 hover:border-primary hover:text-primary text-text-muted'}`}>4+</button>
                    </div>
                </div>
            </div>
        </>
    );

    if (mobile) {
        return <div className="flex flex-col">{content}</div>;
    }

    return (
        <aside className="w-80 hidden lg:flex flex-col border-r border-gray-200 bg-surface-light overflow-y-auto z-10 shrink-0">
            {content}
        </aside>
    );
}
