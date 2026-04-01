import { getDictionary } from '@/lib/dictionary';
import ServicesSection from '@/components/home/ServicesSection';

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    await getDictionary(locale as 'en' | 'es');

    return <ServicesSection />;
}
