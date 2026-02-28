import Link from 'next/link';
import LanguageSwitcher from '../shared/LanguageSwitcher';

export default function Header({ dict, locale }: { dict: any; locale: string }) {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-surface-light/95 px-6 py-4 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                <Link href={`/${locale}`} className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white">
                        <span className="material-symbols-outlined text-[20px]">real_estate_agent</span>
                    </div>
                    <h1 className="font-display text-xl font-bold tracking-tight text-primary">Estate</h1>
                </Link>
                <nav className="hidden md:flex items-center gap-8">
                    <Link className="text-sm font-medium text-text-main hover:text-primary transition-colors" href={`/${locale}/properties`}>{dict.header.buy}</Link>
                    <a className="text-sm font-medium text-text-main hover:text-primary transition-colors" href="#">{dict.header.rent}</a>
                    <a className="text-sm font-medium text-text-main hover:text-primary transition-colors" href="#">{dict.header.sell}</a>
                    <a className="text-sm font-medium text-text-main hover:text-primary transition-colors" href="#">{dict.header.agents}</a>
                </nav>
                <div className="flex items-center gap-4">
                    <LanguageSwitcher />
                    <button className="hidden md:flex text-sm font-medium text-text-main hover:text-primary transition-colors">{dict.header.logIn}</button>
                    <button className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                        {dict.header.listProperty}
                    </button>
                </div>
            </div>
        </header>
    );
}
