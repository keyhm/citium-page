'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LanguageSwitcher from '../shared/LanguageSwitcher'
import { Menu, X } from 'lucide-react'
import { Dictionary } from '@/types/dictionary'

export default function Header({ dict, locale }: { dict: Dictionary; locale: 'es' | 'en' }) {
    const [open, setOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-surface-light/95 px-6 py-4 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between">

                {/* Logo */}
                <Link href={`/${locale}`} className="flex items-center gap-3">
                    <Image src="/logo.png" alt="Logo" width={250} height={75}
                        className="h-10 md:h-12 w-auto object-contain scale-[1.2] md:scale-[1.2] origin-left"
                        priority
                    />
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link className="text-sm font-medium text-text-main hover:text-primary transition-colors"
                        href={`/${locale}/properties?type=sale`}
                    >
                        {dict.header.buy}
                    </Link>

                    <Link className="text-sm font-medium text-text-main hover:text-primary transition-colors"
                        href={`/${locale}/properties?type=rent`}
                    >
                        {dict.header.rent}
                    </Link>
                    
                    <Link className="text-sm font-medium text-text-main hover:text-primary transition-colors"
                        href={`/${locale}/services`}
                    >
                        {dict.header.services}
                    </Link>
                </nav>

                {/* Desktop actions */}
                <div className="hidden md:flex items-center gap-4">
                    <Suspense fallback={<div className="w-24 h-8 bg-gray-100 rounded-lg" />}>
                        <LanguageSwitcher />
                    </Suspense>

                    <a
                        href="https://wa.me/573218911436"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/90"
                    >
                        {dict.header.contactAgent}
                    </a>
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile dropdown */}
            {open && (
                <div className="md:hidden mt-4 border-t pt-4 flex flex-col gap-4">

                    <Link
                        onClick={() => setOpen(false)}
                        className="text-sm font-medium text-text-main"
                        href={`/${locale}/properties?filter=sale`}
                    >
                        {dict.header.buy}
                    </Link>

                    <Link
                        onClick={() => setOpen(false)}
                        className="text-sm font-medium text-text-main"
                        href={`/${locale}/properties?filter=rent`}
                    >
                        {dict.header.rent}
                    </Link>

                    <Link
                        onClick={() => setOpen(false)}
                        className="text-sm font-medium text-text-main"
                        href={`/${locale}/services`}
                    >
                        {dict.header.services}
                    </Link>

                    <a
                        href="https://wa.me/573218911436"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-text-main"
                    >
                        {dict.header.contactAgent}
                    </a>

                    <LanguageSwitcher />

                </div>
            )}
        </header>
    )
}