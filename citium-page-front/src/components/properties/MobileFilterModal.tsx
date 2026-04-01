'use client';

import { useEffect, useRef } from 'react';
import SidebarFilter from './SidebarFilter';
import { Dictionary } from '@/types/types';

type Props = {
    dict: Dictionary;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onApply: () => void; // 🔥 nuevo
};

export default function MobileFilterModal({
    dict,
    isOpen,
    onOpen,
    onClose,
    onApply,
}: Props) {
    const startY = useRef(0);
    const currentY = useRef(0);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleTouchStart = (e: React.TouchEvent) => {
        startY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        currentY.current = e.touches[0].clientY;
        const diff = currentY.current - startY.current;

        if (diff > 0 && modalRef.current) {
            modalRef.current.style.transform = `translateY(${diff}px)`;
        }
    };

    const handleTouchEnd = () => {
        const diff = currentY.current - startY.current;

        if (diff > 100) {
            onClose();
        } else if (modalRef.current) {
            modalRef.current.style.transform = '';
        }
    };

    return (
        <>
            {/* Botón abrir */}
            <button
                onClick={onOpen}
                className="lg:hidden fixed bottom-6 right-6 z-40 bg-primary text-white px-5 py-3 rounded-full shadow-lg shadow-primary/40 flex items-center gap-2 font-semibold active:scale-95 transition"
            >
                <span className="material-symbols-outlined">tune</span>
                {dict.properties.sidebar.title}
            </button>

            {/* Modal */}
            <div className={`fixed inset-0 z-50 lg:hidden ${isOpen ? '' : 'pointer-events-none'}`}>
                
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
                        isOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                    onClick={onClose}
                />

                {/* Contenedor */}
                <div
                    ref={modalRef}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[85vh] flex flex-col transition-transform duration-500 ${
                        isOpen ? 'translate-y-0' : 'translate-y-full'
                    }`}
                >
                    {/* Handle */}
                    <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-3" />

                    {/* Contenido scrolleable */}
                    <div className="flex-1 overflow-y-auto px-4 pb-28">
                        <SidebarFilter dict={dict} isMobile={true} />
                    </div>

                    {/* BOTÓN FIJO */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                        <button
                            onClick={() => {
                                onApply();   // aplicar filtros
                                onClose();   // cerrar modal
                            }}
                            className="w-full bg-primary text-white py-3 rounded-xl font-semibold text-lg active:scale-95 transition"
                        >
                            {dict.properties?.quickFilters.apply}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}