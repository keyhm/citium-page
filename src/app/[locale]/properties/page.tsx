import { getDictionary } from '@/lib/dictionary';
import { Suspense } from 'react';
import SidebarFilter from '@/components/properties/SidebarFilter';
import QuickFilters from '@/components/properties/QuickFilters';
import PropertiesList from '@/components/properties/PropertiesList';

export const dynamic = 'force-dynamic';

export default async function PropertiesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const dict = await getDictionary(locale as 'en' | 'es');

    return (
        <div className="flex flex-col min-h-[calc(100vh-80px)]">
            <Suspense fallback={<div className="h-12 border-t border-gray-200 bg-surface-light animate-pulse" />}>
                <QuickFilters dict={dict} />
            </Suspense>

            <main className="flex flex-1 overflow-hidden h-full">
                {/* Sidebar */}
                <Suspense fallback={<aside className="w-80 hidden lg:block border-r border-gray-200 bg-surface-light shrink-0 animate-pulse" />}>
                    <SidebarFilter dict={dict} />
                </Suspense>

                {/* Results Grid */}
                <section className="flex-1 overflow-y-auto bg-background-light p-6">
                    <div className="max-w-7xl mx-auto">
                        {/* React Query Client Component */}
                        <Suspense fallback={
                            <div className="flex flex-col items-center justify-center p-12 text-gray-400 min-h-[400px]">
                                <span className="material-symbols-outlined text-4xl animate-spin mb-4">progress_activity</span>
                                <p>Loading properties...</p>
                            </div>
                        }>
                            <PropertiesList dict={dict} />
                        </Suspense>
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
