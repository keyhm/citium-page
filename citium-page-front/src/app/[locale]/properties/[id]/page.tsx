import { getDictionary } from '@/lib/dictionary';
import PropertyDetailsClientWrapper from '@/components/property-details/PropertyDetailsClientWrapper';

export default async function PropertyDetailsPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
    const { locale, id } = await params;
    const dict = await getDictionary(locale as 'en' | 'es');

    return (
        <PropertyDetailsClientWrapper dict={dict} locale={locale} id={id} />
    );
}
