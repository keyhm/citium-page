'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useState, useEffect } from 'react';

export default function SidebarFilter({ dict }: { dict: any }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Local state to hold temporary filter values before pushing to URL (optional, but good for text inputs)
    const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
    const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

    // Sync input state if URL changes externally
    useEffect(() => {
        setMinPrice(searchParams.get('minPrice') || '');
        setMaxPrice(searchParams.get('maxPrice') || '');
    }, [searchParams]);

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

    // Apply array-like amenities
    const toggleAmenities = (amenity: string) => {
        const currentAms = searchParams.getAll('amenities');
        const params = new URLSearchParams(searchParams.toString());

        if (currentAms.includes(amenity)) {
            // Uncheck: we need to reconstruct the params array since URLSearchParams delete removes all
            params.delete('amenities');
            currentAms.filter(a => a !== amenity).forEach(a => params.append('amenities', a));
        } else {
            params.append('amenities', amenity);
        }

        router.push(pathname + '?' + params.toString(), { scroll: false });
    };

    const handlePriceBlur = () => {
        const params = new URLSearchParams(searchParams.toString());
        if (minPrice) params.set('minPrice', minPrice);
        else params.delete('minPrice');

        if (maxPrice) params.set('maxPrice', maxPrice);
        else params.delete('maxPrice');

        router.push(pathname + '?' + params.toString(), { scroll: false });
    };

    const resetFilters = () => {
        router.push(pathname, { scroll: false });
    };

    const currentType = searchParams.get('type') || '';
    const currentBeds = searchParams.get('beds') || '';
    const currentCategories = searchParams.get('category')?.split(',') || [];
    const currentAmenities = searchParams.getAll('amenities');

    return (
        <aside className="w-80 hidden lg:flex flex-col border-r border-gray-200 bg-surface-light overflow-y-auto z-10 shrink-0">
            <div className="p-5 border-b border-gray-100 sticky top-0 bg-surface-light z-10">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg text-text-main">{dict.properties.sidebar.title}</h3>
                    <button onClick={resetFilters} className="text-sm text-primary font-medium hover:underline">{dict.properties.sidebar.reset}</button>
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
                    <button
                        onClick={() => applyFilter('type', 'sold')}
                        className={`flex-1 py-1.5 text-sm font-medium rounded-md text-center transition-colors ${currentType === 'sold' ? 'bg-white shadow-sm text-text-main' : 'text-text-muted hover:text-text-main'}`}
                    >
                        {dict.properties.sidebar.sold}
                    </button>
                </div>
            </div>
            <div className="p-5 space-y-6">
                {/* Property Type */}
                <div>
                    <h4 className="font-semibold text-sm text-text-main mb-3">{dict.properties.sidebar.propertyType}</h4>
                    <div className="space-y-2">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                                checked={currentCategories.includes('house')}
                                onChange={() => toggleCategories('house')}
                                className="form-checkbox rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" type="checkbox"
                            />
                            <span className="text-sm text-text-muted group-hover:text-primary transition-colors">{dict.properties.sidebar.typeHouses}</span>
                            <div className="ml-auto size-2 rounded-full bg-accent-blue"></div>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                                checked={currentCategories.includes('commercial')}
                                onChange={() => toggleCategories('commercial')}
                                className="form-checkbox rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" type="checkbox"
                            />
                            <span className="text-sm text-text-muted group-hover:text-primary transition-colors">{dict.properties.sidebar.typeCommercial}</span>
                            <div className="ml-auto size-2 rounded-full bg-accent-grey"></div>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                                checked={currentCategories.includes('land')}
                                onChange={() => toggleCategories('land')}
                                className="form-checkbox rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" type="checkbox"
                            />
                            <span className="text-sm text-text-muted group-hover:text-primary transition-colors">{dict.properties.sidebar.typeLand}</span>
                            <div className="ml-auto size-2 rounded-full bg-accent-green"></div>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                                checked={currentCategories.includes('apartment')}
                                onChange={() => toggleCategories('apartment')}
                                className="form-checkbox rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" type="checkbox"
                            />
                            <span className="text-sm text-text-muted group-hover:text-primary transition-colors">Apartments</span>
                            <div className="ml-auto size-2 rounded-full bg-accent-blue"></div>
                        </label>
                    </div>
                </div>
                {/* Price Range */}
                <div>
                    <h4 className="font-semibold text-sm text-text-main mb-3">{dict.properties.sidebar.priceRange}</h4>
                    <div className="flex items-center gap-2 mb-2">
                        <input
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            onBlur={handlePriceBlur}
                            className="w-full text-sm border-gray-200 rounded-lg bg-background-light focus:ring-primary focus:border-primary px-3 py-2"
                            placeholder={dict.properties.sidebar.min} type="text"
                        />
                        <span className="text-gray-400">-</span>
                        <input
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            onBlur={handlePriceBlur}
                            className="w-full text-sm border-gray-200 rounded-lg bg-background-light focus:ring-primary focus:border-primary px-3 py-2"
                            placeholder={dict.properties.sidebar.max} type="text"
                        />
                    </div>
                </div>
                {/* Beds & Baths */}
                <div>
                    <h4 className="font-semibold text-sm text-text-main mb-3">{dict.properties.sidebar.bedrooms}</h4>
                    <div className="flex gap-2">
                        <button onClick={() => applyFilter('beds', null)} className={`flex-1 py-1.5 border rounded-md text-sm transition-colors ${!currentBeds ? 'bg-primary text-white border-primary' : 'border-gray-200 hover:border-primary hover:text-primary text-text-muted'}`}>{dict.properties.sidebar.any}</button>
                        <button onClick={() => applyFilter('beds', '1')} className={`flex-1 py-1.5 border rounded-md text-sm transition-colors ${currentBeds === '1' ? 'bg-primary text-white border-primary' : 'border-gray-200 hover:border-primary hover:text-primary text-text-muted'}`}>1+</button>
                        <button onClick={() => applyFilter('beds', '2')} className={`flex-1 py-1.5 border rounded-md text-sm transition-colors ${currentBeds === '2' ? 'bg-primary text-white border-primary' : 'border-gray-200 hover:border-primary hover:text-primary text-text-muted'}`}>2+</button>
                        <button onClick={() => applyFilter('beds', '3')} className={`flex-1 py-1.5 border rounded-md text-sm transition-colors ${currentBeds === '3' ? 'bg-primary text-white border-primary' : 'border-gray-200 hover:border-primary hover:text-primary text-text-muted'}`}>3+</button>
                        <button onClick={() => applyFilter('beds', '4')} className={`flex-1 py-1.5 border rounded-md text-sm transition-colors ${currentBeds === '4' ? 'bg-primary text-white border-primary' : 'border-gray-200 hover:border-primary hover:text-primary text-text-muted'}`}>4+</button>
                    </div>
                </div>
                {/* Amenities */}
                <div>
                    <h4 className="font-semibold text-sm text-text-main mb-3">{dict.properties.sidebar.amenities}</h4>
                    <div className="grid grid-cols-2 gap-2">
                        {/* We use english base names for Strapi filtering matching the mock, ideally these are keys */}
                        {['Pool', 'Garage', 'Garden', 'Waterfront'].map(amenity => (
                            <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    checked={currentAmenities.includes(amenity)}
                                    onChange={() => toggleAmenities(amenity)}
                                    className="form-checkbox rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                                    type="checkbox"
                                />
                                <span className="text-sm text-text-muted">{dict.properties.sidebar[amenity.toLowerCase()] || amenity}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
}
