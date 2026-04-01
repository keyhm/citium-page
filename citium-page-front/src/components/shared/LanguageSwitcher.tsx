'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function LanguageSwitcher() {
    const pathname = usePathname();

    const getPathForLocale = (locale: string) => {
        if (!pathname) return '/';
        const segments = pathname.split('/');
        segments[1] = locale;
        return segments.join('/');
    };

    const isEs = pathname?.startsWith('/es');

    return (
        <div className="flex bg-gray-100 rounded-lg p-1">
            <Link
                href={getPathForLocale('en')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${!isEs ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-primary'}`}
            >
                EN
            </Link>
            <Link
                href={getPathForLocale('es')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${isEs ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-primary'}`}
            >
                ES
            </Link>
        </div>
    );
}
