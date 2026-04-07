'use client';

import { Dictionary } from '@/types/dictionary';
import dynamic from 'next/dynamic';

const PropertyMapInner = dynamic(() => import('./PropertyMapInner'), {
    ssr: false,
    loading: () => (
        <div className="space-y-4 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-text-main">...</h3>
            </div>
            <div className="w-full h-80 rounded-xl bg-gray-100 animate-pulse border border-gray-200"></div>
        </div>
    )
});

export default function PropertyMap({ dict, location, coordinates }: { dict: Dictionary; location: string; coordinates: [number, number] }) {
    return <PropertyMapInner dict={dict} location={location} coordinates={coordinates} />;
}
