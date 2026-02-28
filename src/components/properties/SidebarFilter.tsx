export default function SidebarFilter({ dict }: { dict: any }) {
    return (
        <aside className="w-80 hidden lg:flex flex-col border-r border-gray-200 bg-surface-light overflow-y-auto z-10 shrink-0">
            <div className="p-5 border-b border-gray-100 sticky top-0 bg-surface-light z-10">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg text-text-main">{dict.properties.sidebar.title}</h3>
                    <button className="text-sm text-primary font-medium hover:underline">{dict.properties.sidebar.reset}</button>
                </div>
                {/* Status Toggle */}
                <div className="flex bg-background-light p-1 rounded-lg mb-4">
                    <button className="flex-1 py-1.5 text-sm font-medium bg-white shadow-sm rounded-md text-text-main text-center">{dict.properties.sidebar.buy}</button>
                    <button className="flex-1 py-1.5 text-sm font-medium text-text-muted hover:text-text-main text-center">{dict.properties.sidebar.rent}</button>
                    <button className="flex-1 py-1.5 text-sm font-medium text-text-muted hover:text-text-main text-center">{dict.properties.sidebar.sold}</button>
                </div>
            </div>
            <div className="p-5 space-y-6">
                {/* Property Type */}
                <div>
                    <h4 className="font-semibold text-sm text-text-main mb-3">{dict.properties.sidebar.propertyType}</h4>
                    <div className="space-y-2">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input defaultChecked className="form-checkbox rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                            <span className="text-sm text-text-muted group-hover:text-primary transition-colors">{dict.properties.sidebar.typeHouses}</span>
                            <div className="ml-auto size-2 rounded-full bg-accent-blue"></div>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input className="form-checkbox rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                            <span className="text-sm text-text-muted group-hover:text-primary transition-colors">{dict.properties.sidebar.typeCommercial}</span>
                            <div className="ml-auto size-2 rounded-full bg-accent-grey"></div>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input className="form-checkbox rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                            <span className="text-sm text-text-muted group-hover:text-primary transition-colors">{dict.properties.sidebar.typeLand}</span>
                            <div className="ml-auto size-2 rounded-full bg-accent-green"></div>
                        </label>
                    </div>
                </div>
                {/* Price Range */}
                <div>
                    <h4 className="font-semibold text-sm text-text-main mb-3">{dict.properties.sidebar.priceRange}</h4>
                    <div className="flex items-center gap-2 mb-2">
                        <input className="w-full text-sm border-gray-200 rounded-lg bg-background-light focus:ring-primary focus:border-primary px-3 py-2" placeholder={dict.properties.sidebar.min} type="text" />
                        <span className="text-gray-400">-</span>
                        <input className="w-full text-sm border-gray-200 rounded-lg bg-background-light focus:ring-primary focus:border-primary px-3 py-2" placeholder={dict.properties.sidebar.max} type="text" />
                    </div>
                </div>
                {/* Beds & Baths */}
                <div>
                    <h4 className="font-semibold text-sm text-text-main mb-3">{dict.properties.sidebar.bedrooms}</h4>
                    <div className="flex gap-2">
                        <button className="flex-1 py-1.5 border border-gray-200 rounded-md text-sm hover:border-primary hover:text-primary text-text-muted">{dict.properties.sidebar.any}</button>
                        <button className="flex-1 py-1.5 border border-gray-200 rounded-md text-sm hover:border-primary hover:text-primary text-text-muted">1+</button>
                        <button className="flex-1 py-1.5 bg-primary text-white border border-primary rounded-md text-sm">2+</button>
                        <button className="flex-1 py-1.5 border border-gray-200 rounded-md text-sm hover:border-primary hover:text-primary text-text-muted">3+</button>
                        <button className="flex-1 py-1.5 border border-gray-200 rounded-md text-sm hover:border-primary hover:text-primary text-text-muted">4+</button>
                    </div>
                </div>
                {/* Amenities */}
                <div>
                    <h4 className="font-semibold text-sm text-text-main mb-3">{dict.properties.sidebar.amenities}</h4>
                    <div className="grid grid-cols-2 gap-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input className="form-checkbox rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                            <span className="text-sm text-text-muted">{dict.properties.sidebar.pool}</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input className="form-checkbox rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                            <span className="text-sm text-text-muted">{dict.properties.sidebar.garage}</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input className="form-checkbox rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                            <span className="text-sm text-text-muted">{dict.properties.sidebar.garden}</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input className="form-checkbox rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                            <span className="text-sm text-text-muted">{dict.properties.sidebar.waterfront}</span>
                        </label>
                    </div>
                </div>
            </div>
        </aside>
    );
}
