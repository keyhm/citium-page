import { getDictionary } from '@/lib/dictionary';
import PropertyDetailsClientWrapper from '@/components/property-details/PropertyDetailsClientWrapper';
import { Suspense } from 'react';

async function PropertyDetailsContent({ params }: { params: Promise<{ locale: string; id: string }> }) {
    const { locale, id } = await params;
    const dict = await getDictionary(locale as 'en' | 'es');

    return (
        <PropertyDetailsClientWrapper dict={dict} locale={locale} id={id} />
    );
}

export default function PropertyDetailsPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
    return (
        <Suspense fallback={
            <div className="flex flex-col items-center justify-center p-24 text-gray-400 min-h-[60vh]">
                <span className="material-symbols-outlined text-4xl animate-spin mb-4">progress_activity</span>
                <p>Loading property details...</p>
            </div>
        }>
            <PropertyDetailsContent params={params} />
        </Suspense>
    );
}
