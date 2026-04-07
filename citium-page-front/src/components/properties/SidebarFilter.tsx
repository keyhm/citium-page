"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useState } from "react";
import { formatNumber, unformatNumber } from "@/lib/format";
import QuickFilters from "./QuickFilters";
import { Dictionary } from "@/types/dictionary";

export default function SidebarFilter({ dict, isMobile = false }: {
    dict: Dictionary,  isMobile?: boolean;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const sort = searchParams.get('sort') || 'newest';

    const handleSortChange = (newSort: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('sort', newSort);
        params.set('page', '1'); // Reset to first page when sorting changes
        router.push(pathname + '?' + params.toString(), { scroll: false });
    };

  const [open, setOpen] = useState(false);

  const options = [
    { value: "newest", label: dict.properties.sortNewest },
    { value: "priceHighToLow", label: dict.properties.sortHighToLow },
    { value: "priceLowToHigh", label: dict.properties.sortLowToHigh },
  ];

  const selected = options.find((opt) => opt.value === sort);

    // categories must mirror the Strapi enumeration values
    const categories = Object.keys(dict.properties.tags);

    // Local state to hold temporary filter values before pushing to URL (optional, but good for text inputs)
    // keep the raw numeric string (digits only) in state; display formatting is handled on render
    const [minPrice, setMinPrice] = useState(() =>
        unformatNumber(searchParams.get("minPrice") || ""),
    );
    const [maxPrice, setMaxPrice] = useState(() =>
        unformatNumber(searchParams.get("maxPrice") || ""),
    );

    // Apply a single filter to the URL
    const applyFilter = useCallback(
        (name: string, value: string | null) => {
            const params = new URLSearchParams(searchParams.toString());

            if (value === null || value === "") {
                params.delete(name);
            } else {
                params.set(name, value);
            }

            // Push the new URL without refreshing the page
            router.push(pathname + "?" + params.toString(), { scroll: false });
        },
        [searchParams, pathname, router],
    );

    // Apply array-like filters (e.g., categories separated by comma)
    const toggleCategories = (category: string) => {
        const currentCats = searchParams.get("category")?.split(",") || [];
        let newCats: string[];

        if (currentCats.includes(category)) {
            newCats = currentCats.filter((c) => c !== category);
        } else {
            newCats = [...currentCats, category];
        }

        applyFilter("category", newCats.length ? newCats.join(",") : null);
    };

    const handlePriceBlur = () => {
        const params = new URLSearchParams(searchParams.toString());
        // state already holds plain digits; that's what we send to the URL
        if (minPrice) params.set("minPrice", minPrice);
        else params.delete("minPrice");

        if (maxPrice) params.set("maxPrice", maxPrice);
        else params.delete("maxPrice");

        router.push(pathname + "?" + params.toString(), { scroll: false });
    };

    const resetFilters = () => {
        setMinPrice("");
        setMaxPrice("");
        router.push(pathname, { scroll: false });
    };

    const currentBeds = searchParams.get('beds') || '';
    const currentCategories = searchParams.get('category')?.split(',') || [];
    const currentBaths = searchParams.get('baths') || '';

    const content = (
        <>
            <div className="p-4 border-b border-gray-100 sticky top-0 bg-surface-light z-10">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg text-text-main">
                        {dict.properties.sidebar.title}
                    </h3>
                    <button
                        onClick={resetFilters}
                        className="text-sm text-primary font-medium cursor-pointer"
                    >
                        {dict.properties.sidebar.reset}
                    </button>
                </div>

            </div>
            <div className="p-5 space-y-6">
                <div className="flex flex-row-reverse">
                    {/* type toggle */}
                    <Suspense fallback={<div className="h-10 animate-pulse" />}>
                        <QuickFilters dict={dict} />
                    </Suspense>
                </div>

                {/* Property Type */}
                <div>
                    <h4 className="font-semibold text-sm text-text-main mb-3">
                        {dict.properties.sidebar.propertyType}
                    </h4>
                    <div className="space-y-2">
                        {categories.map((cat) => (
                            <label
                                key={cat}
                                className="flex items-center gap-3 cursor-pointer group"
                            >
                                <input
                                    checked={currentCategories.includes(cat)}
                                    onChange={() => toggleCategories(cat)}
                                    className="form-checkbox rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                                    type="checkbox"
                                />
                                <span className="text-sm text-text-muted group-hover:text-primary transition-colors">
                                    {dict.properties.tags?.[cat as keyof typeof dict.properties.tags] || cat}
                                </span>
                                <div className="ml-auto size-2 rounded-full bg-accent-blue"></div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div>
                    <h4 className="font-semibold text-sm text-text-main mb-3">
                        {dict.properties.sidebar.priceRange}
                    </h4>
                    <div className="flex items-center gap-2 mb-2">
                        <input
                            value={formatNumber(minPrice)}
                            onChange={(e) => setMinPrice(unformatNumber(e.target.value))}
                            onBlur={handlePriceBlur}
                            className="w-full text-sm border-gray-200 rounded-lg bg-background-light focus:ring-primary focus:border-primary px-3 py-2"
                            placeholder={dict.properties.sidebar.min}
                            type="text"
                        />
                        <span className="text-gray-400">-</span>
                        <input
                            value={formatNumber(maxPrice)}
                            onChange={(e) => setMaxPrice(unformatNumber(e.target.value))}
                            onBlur={handlePriceBlur}
                            className="w-full text-sm border-gray-200 rounded-lg bg-background-light focus:ring-primary focus:border-primary px-3 py-2"
                            placeholder={dict.properties.sidebar.max}
                            type="text"
                        />
                    </div>
                </div>
                {/* Beds */}
                <div>
                    <h4 className="font-semibold text-sm text-text-main mb-3">
                        {dict.properties.sidebar.bedrooms}
                    </h4>
                    <div className="flex gap-2">
                        <button
                            onClick={() => applyFilter("beds", null)}
                            className={`flex-1 py-1.5 border rounded-md text-sm transition-colors ${!currentBeds ? "bg-primary text-white border-primary" : "border-gray-200 hover:border-primary hover:text-primary text-text-muted"}`}
                        >
                            {dict.properties.sidebar.any}
                        </button>
                        <button
                            onClick={() => applyFilter("beds", "1")}
                            className={`flex-1 py-1.5 border rounded-md text-sm transition-colors ${currentBeds === "1" ? "bg-primary text-white border-primary" : "border-gray-200 hover:border-primary hover:text-primary text-text-muted"}`}
                        >
                            1
                        </button>
                        <button
                            onClick={() => applyFilter("beds", "2")}
                            className={`flex-1 py-1.5 border rounded-md text-sm transition-colors ${currentBeds === "2" ? "bg-primary text-white border-primary" : "border-gray-200 hover:border-primary hover:text-primary text-text-muted"}`}
                        >
                            2
                        </button>
                        <button
                            onClick={() => applyFilter("beds", "3")}
                            className={`flex-1 py-1.5 border rounded-md text-sm transition-colors ${currentBeds === "3" ? "bg-primary text-white border-primary" : "border-gray-200 hover:border-primary hover:text-primary text-text-muted"}`}
                        >
                            3
                        </button>
                        <button
                            onClick={() => applyFilter("beds", "4")}
                            className={`flex-1 py-1.5 border rounded-md text-sm transition-colors ${currentBeds === "4" ? "bg-primary text-white border-primary" : "border-gray-200 hover:border-primary hover:text-primary text-text-muted"}`}
                        >
                            4+
                        </button>
                    </div>
                </div>

                {/* Baths */}
                <div>
                    <h4 className="font-semibold text-sm text-text-main mb-3">
                        {dict.properties.sidebar.bathrooms}
                    </h4>
                    <div className="flex gap-2">
                        <button
                            onClick={() => applyFilter("baths", null)}
                            className={`flex-1 py-1.5 border rounded-md text-sm transition-colors ${!currentBaths ? "bg-primary text-white border-primary" : "border-gray-200 hover:border-primary hover:text-primary text-text-muted"}`}
                        >
                            {dict.properties.sidebar.any}
                        </button>
                        <button
                            onClick={() => applyFilter("baths", "1")}
                            className={`flex-1 py-1.5 border rounded-md text-sm transition-colors ${currentBaths === "1" ? "bg-primary text-white border-primary" : "border-gray-200 hover:border-primary hover:text-primary text-text-muted"}`}
                        >
                            1
                        </button>
                        <button
                            onClick={() => applyFilter("baths", "2")}
                            className={`flex-1 py-1.5 border rounded-md text-sm transition-colors ${currentBaths === "2" ? "bg-primary text-white border-primary" : "border-gray-200 hover:border-primary hover:text-primary text-text-muted"}`}
                        >
                            2
                        </button>
                        <button
                            onClick={() => applyFilter("baths", "3")}
                            className={`flex-1 py-1.5 border rounded-md text-sm transition-colors ${currentBaths === "3" ? "bg-primary text-white border-primary" : "border-gray-200 hover:border-primary hover:text-primary text-text-muted"}`}
                        >
                            3
                        </button>
                        <button
                            onClick={() => applyFilter("baths", "4")}
                            className={`flex-1 py-1.5 border rounded-md text-sm transition-colors ${currentBaths === "4" ? "bg-primary text-white border-primary" : "border-gray-200 hover:border-primary hover:text-primary text-text-muted"}`}
                        >
                            4+
                        </button>
                    </div>
                </div>

                {/* sorted the filters in a more logical order: type toggle at the top, then category, then price, then beds/baths */}
                <div>
                    <h4 className="font-semibold text-sm text-text-main mb-3">
                        {dict.properties.sortBy}
                    </h4>
                    <div className="relative w-full">
                        {/* Botón */}
                        <button
                            onClick={() => setOpen(!open)}
                            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-10 text-sm font-semibold text-left hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary flex items-center justify-between"
                        >
                            {selected?.label}
                            <span className="material-symbols-outlined text-gray-400 overlay-auto">
                                expand_more
                            </span>
                        </button>

                        {/* Opciones */}
                        {open && (
                            <ul className="absolute z-10 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
                                {options.map((opt) => (
                                    <li
                                        key={opt.value}
                                        onClick={() => {
                                            handleSortChange(opt.value);
                                            setOpen(false);
                                        }}
                                        className={`cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 ${sort === opt.value ? "bg-gray-50 font-semibold" : ""
                                            }`}
                                    >
                                        {opt.label}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </>
    );

    if (isMobile) {
        return <div className="flex flex-col">{content}</div>;
    }

    return (
        <aside className="w-80 hidden lg:flex flex-col border-r border-gray-200 bg-surface-light overflow-y-auto z-10 shrink-0">
            {content}
        </aside>
    );
}
