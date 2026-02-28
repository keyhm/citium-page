export default function SearchForm({ dict }: { dict: any }) {
    return (
        <div className="w-full max-w-5xl rounded-2xl bg-surface-light p-4 shadow-2xl md:p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6">
                {/* Location */}
                <div className="relative">
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted">{dict.hero.location}</label>
                    <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-0 text-text-muted">location_on</span>
                        <input
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
                        <select className="w-full border-0 border-b-2 border-gray-200 bg-transparent py-2 pl-8 pr-2 text-sm font-medium text-text-main focus:border-primary focus:ring-0">
                            <option>{dict.hero.typeAny}</option>
                            <option>{dict.hero.typeHouse}</option>
                            <option>{dict.hero.typeApartment}</option>
                            <option>{dict.hero.typeCondo}</option>
                            <option>{dict.hero.typeVilla}</option>
                        </select>
                    </div>
                </div>

                {/* Price Range */}
                <div className="relative">
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted">{dict.hero.priceRange}</label>
                    <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-0 text-text-muted">attach_money</span>
                        <select className="w-full border-0 border-b-2 border-gray-200 bg-transparent py-2 pl-8 pr-2 text-sm font-medium text-text-main focus:border-primary focus:ring-0">
                            <option>{dict.hero.priceAny}</option>
                            <option>$100k - $300k</option>
                            <option>$300k - $600k</option>
                            <option>$600k - $1M</option>
                            <option>$1M+</option>
                        </select>
                    </div>
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                    <button className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 font-bold text-white transition-all hover:bg-primary/90 hover:shadow-lg focus:ring-2 focus:ring-primary focus:ring-offset-2 md:h-14">
                        <span className="material-symbols-outlined">search</span>
                        <span>{dict.hero.search}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
