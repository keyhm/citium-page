import PropertiesClientLayout from '@/components/properties/PropertiesClientLayout';
import { getDictionary } from '@/lib/dictionary';
import { Suspense } from 'react';

export default async function PropertiesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const dict = await getDictionary(locale as 'en' | 'es');

    return (
        <Suspense fallback={<div className="h-screen bg-background-light animate-pulse" />}>
            <PropertiesClientLayout dict={dict} />
        </Suspense>
    );
}
