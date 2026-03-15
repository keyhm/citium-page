'use client';

import { useState } from 'react';
import SidebarFilter from './SidebarFilter';

export default function MobileFilterModal({ dict }: { dict: any }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Filter Floating Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden fixed bottom-6 right-6 z-40 bg-primary text-white px-5 py-3 rounded-full shadow-lg shadow-primary/40 flex items-center gap-2 font-semibold"
            >
                <span className="material-symbols-outlined">tune</span>
                {dict.properties.sidebar.title}
            </button>

            {/* Modal */}
            <div className={`fixed inset-0 z-50 lg:hidden ${isOpen ? '' : 'pointer-events-none'}`}>
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setIsOpen(false)}
                ></div>

                {/* Modal Content */}
                <div className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto transition-transform duration-500 ease-out ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="font-bold text-lg text-text-main">{dict.properties.sidebar.title}</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                    <div className="p-4">
                        <SidebarFilter dict={dict} mobile={true} />
                    </div>
                </div>
            </div>
        </>
    );
}