import { getDictionary } from '@/lib/dictionary';
import SidebarFilter from '@/components/properties/SidebarFilter';
import QuickFilters from '@/components/properties/QuickFilters';
import Pagination from '@/components/shared/Pagination';
import PropertiesList from '@/components/properties/PropertiesList';

export default async function PropertiesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const dict = await getDictionary(locale as 'en' | 'es');

    return (
        <div className="flex flex-col min-h-[calc(100vh-80px)]">
            <QuickFilters dict={dict} />

            <main className="flex flex-1 overflow-hidden h-full">
                {/* Sidebar */}
                <SidebarFilter dict={dict} />

                {/* Results Grid */}
                <section className="flex-1 overflow-y-auto bg-background-light p-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between md:items-end mb-6 gap-4">
                            <div>
                                <div className="text-sm text-text-muted mb-1">
                                    {dict.properties.breadcrumbs}
                                </div>
                                <h1 className="text-2xl font-bold text-text-main">
                                    {dict.properties.title}
                                </h1>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-text-muted">{dict.properties.sortBy}</span>
                                <select className="form-select border-none bg-transparent text-sm font-semibold text-text-main focus:ring-0 cursor-pointer py-0 pl-0 pr-8">
                                    <option>{dict.properties.sortNewest}</option>
                                    <option>{dict.properties.sortHighToLow}</option>
                                    <option>{dict.properties.sortLowToHigh}</option>
                                </select>
                            </div>
                        </div>

                        {/* React Query Client Component */}
                        <PropertiesList dict={dict} />

                        {/* Pagination */}
                        <Pagination />
                    </div>
                </section>

                {/* Mobile Filter Floating Button */}
                <button className="lg:hidden fixed bottom-6 right-6 z-40 bg-primary text-white px-5 py-3 rounded-full shadow-lg shadow-primary/40 flex items-center gap-2 font-semibold">
                    <span className="material-symbols-outlined">tune</span>
                    {dict.properties.sidebar.title}
                </button>
            </main>
        </div>
    );
}
