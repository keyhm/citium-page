import type { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '../globals.css';

export const metadata: Metadata = {
    title: 'Estate - Find Your Perfect Home',
    description: 'Discover your perfect sanctuary with Estate.',
};

export async function generateStaticParams() {
    return [{ locale: 'en' }, { locale: 'es' }];
}

export default async function RootLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale as 'en' | 'es');

    return (
        <html lang={locale} className="scroll-smooth">
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
            </head>
            <body className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-body antialiased selection:bg-primary selection:text-white">
                <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
                    <Header dict={dict} locale={locale} />
                    <main className="flex-1">
                        {children}
                    </main>
                    <Footer dict={dict} />
                </div>
            </body>
        </html>
    );
}
