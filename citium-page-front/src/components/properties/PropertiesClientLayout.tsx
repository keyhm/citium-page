'use client';

import { useState } from 'react';
import { Suspense } from 'react';
import SidebarFilter from '@/components/properties/SidebarFilter';
import PropertiesList from '@/components/properties/PropertiesList';
import MobileFilterModal from '@/components/properties/MobileFilterModal';

interface PropertiesClientLayoutProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dict: any;
    children?: React.ReactNode;
}

export default function PropertiesClientLayout({ dict }: PropertiesClientLayoutProps) {
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-[calc(100vh-80px)]">
            
            <main className="flex flex-1 overflow-hidden h-full">
                {/* Sidebar - Desktop Only */}
                <Suspense fallback={<aside className="w-80 hidden lg:block border-r border-gray-200 bg-surface-light shrink-0 animate-pulse" />}>
                    <aside className="w-80 hidden lg:flex flex-col border-r border-gray-200 bg-surface-light overflow-y-auto z-10 shrink-0">
                        <SidebarFilter dict={dict} />
                    </aside>
                </Suspense>

                {/* Results Grid */}
                <section className="flex-1 overflow-y-auto bg-background-light p-6">
                    <div className="max-w-7xl mx-auto">
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
                <button
                    onClick={() => setIsFilterModalOpen(true)}
                    className="lg:hidden fixed bottom-6 right-6 z-40 bg-primary text-white px-5 py-3 rounded-full shadow-lg shadow-primary/40 flex items-center gap-2 font-semibold hover:bg-primary/90 transition-colors"
                    aria-label="Open filters"
                >
                    <span className="material-symbols-outlined">tune</span>
                    {dict.properties.sidebar.title}
                </button>
            </main>

            {/* Mobile Filter Modal */}
            <MobileFilterModal
                dict={dict}
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
            />
        </div>
    );
}
