import { getDictionary } from '@/lib/dictionary';
import Hero from '@/components/home/Hero';
import AboutSection from '@/components/home/AboutSection';
import FeaturedProperties from '@/components/home/FeaturedProperties';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const dict = await getDictionary(locale as 'en' | 'es');

    return (
        <>
            <Hero dict={dict} />
            <AboutSection dict={dict} locale={locale} />
            <FeaturedProperties dict={dict} locale={locale} />
        </>
    );
}
