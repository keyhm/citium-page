import { getDictionary } from '@/lib/dictionary';
import Link from 'next/link';

export default async function PropertyDetailsPage({ params }: { params: Promise<{ locale: string, id: string }> }) {
    const { locale, id } = await params;
    const dict = await getDictionary(locale as 'en' | 'es');

    return (
        <div className="bg-background-light py-12 px-6 lg:py-20">
            <div className="mx-auto max-w-7xl">
                <Link
                    href={`/${locale}/properties`}
                    className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors"
                >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    Back to Properties
                </Link>

                <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
                    <div className="relative aspect-video w-full md:aspect-[21/9]">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD4muSDBxrW9EN01SV1EMa9JSs4RdFmuN61kYXUcnCIroMvw62sMo_gxg6Im7GxBtLeEFL9CWBML-zYIJau8iLhU4M0ktFQXRCUO75RNjCx2pbfw8nsuXgEBCu8WAcu2LUBeqQFmYMa3JuTpv3lwZJKNIMpj6pVHt-pC19QhXRILOvBbLpaTQqnFKOtR31AfnTm7wa3tZYb4rcYKagW5ZaLy_FyzZb6lY8qo7b_BNb5pZjbMA6Uv9F5m26T6GyHR1IbjZqyzyLmp_Q')" }}
                        />
                    </div>

                    <div className="p-8 md:p-12">
                        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <p className="mb-2 text-sm font-medium uppercase tracking-wider text-secondary">Malibu, CA</p>
                                <h1 className="font-display text-4xl font-bold text-text-main md:text-5xl">Modern Beachfront Villa</h1>
                            </div>
                            <div className="text-right">
                                <p className="text-4xl font-bold text-primary">$4,500,000</p>
                                <p className="text-sm font-medium text-text-muted">Property ID: {id}</p>
                            </div>
                        </div>

                        <div className="mb-10 flex flex-wrap items-center gap-8 border-y border-gray-100 py-6 text-text-main">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-2xl text-primary">bed</span>
                                <span className="text-lg font-bold">4 <span className="text-sm font-medium text-text-muted">{dict.featured.beds}</span></span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-2xl text-primary">bathtub</span>
                                <span className="text-lg font-bold">3 <span className="text-sm font-medium text-text-muted">{dict.featured.baths}</span></span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-2xl text-primary">square_foot</span>
                                <span className="text-lg font-bold">2,500 <span className="text-sm font-medium text-text-muted">{dict.featured.sqft}</span></span>
                            </div>
                        </div>

                        <div>
                            <h2 className="mb-4 font-display text-2xl font-bold text-text-main">Property Details</h2>
                            <p className="text-lg leading-relaxed text-text-muted">
                                Experience unparalleled luxury in this stunning modern beachfront villa. Featuring floor-to-ceiling windows that offer panoramic ocean views, this meticulously designed home seamlessly blends indoor and outdoor living. The gourmet kitchen boasts state-of-the-art appliances and custom cabinetry, while the spacious master suite provides a private sanctuary complete with a spa-inspired en-suite bathroom. Enjoy breathtaking sunsets from your private terrace or step directly onto the pristine sands of Malibu beach.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
