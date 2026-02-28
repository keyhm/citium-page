import { getDictionary } from '@/lib/dictionary';
import PropertyCard from '@/components/shared/PropertyCard';
import SidebarFilter from '@/components/properties/SidebarFilter';
import QuickFilters from '@/components/properties/QuickFilters';
import Pagination from '@/components/shared/Pagination';

export default async function PropertiesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const dict = await getDictionary(locale as 'en' | 'es');

    const properties = [
        {
            id: 1,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbEv7KGLrAUEgUp0JCwOMmJ4L9_AbpUQW2YamvPoWp74LrFVMoDX3r_--P8UVs07Lg6HclykEW7GmSRixG7eAHPjVUhCD3Pz_q-NVK4sWQL9EkIGdJFPP3dPAHLRI4aeWi82pzxWD4V8tQuiTAM2P_H5JBSOr5xgnIQtNO7guQ5bLYRaFCXd6HVWJJnmha7FU_YDSx4NDiugp9bpTfB5SgDmRvuJygTUmYA5_WvQTN3ZlQCFt38pZj9og4IcuHcPB4iLiC8Rdv9Qc",
            badge: { type: 'sale' as const, text: dict.properties.tags.house, color: 'blue' as const },
            location: "New York, NY 10004",
            title: "8421 Broad St",
            price: "$1,250,000",
            beds: 3,
            baths: 2,
            sqft: "1,850"
        },
        {
            id: 2,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQVSj9D1leaDNz3mjPnAdvNWKJ7IN3aC9iltyftOfDHnWJ9xaJzO367WWTFJEEla27Iyvcr3CizDNQEtx5u1XdOGALkhrex_jly6kkOcY13bBR9p18YWfsn70TnIl-T9encA89yssONE8hoWWZ1_emU4EljVNqB01w7mDJRGAGo86OLfEgTOzvL4HTVAzYZkHhqAhwJqp3Bf0VVpfyKajulEbC4uGgSSJSSq5jRXkrk6_-vx6dKq8ZZrK-D13TSWDxfKbTx8vFE2A",
            badge: { type: 'sale' as const, text: dict.properties.tags.apartment, color: 'blue' as const },
            location: "New York, NY",
            title: "20 W 34th St, Unit 4B",
            price: "$850,000",
            beds: 2,
            baths: 2,
            sqft: "1,100"
        },
        {
            id: 3,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAk-Q4xvMgeg9DwNpBSW2ppNnyfP71twrHEyM4iQCm7IFqlwIwg-P6WRO_nnAmOZniA3Xofkkgip7jcu3gSZsYQ24fKK-DXOFb7Vw5FMtpZ-_lxHMWFhHhzGzcWrF04p6MB-XD9jj41BX6hAsIa_NiQhbhseGcRptkfWVj0UCmVoVveUjfDBWbmQg9_IyXUGAKZzrsHmBA7W6ctPcwR1ptzHu6sytaMG9rUbUfAFrnGZjcz_WEu6wsuKW_9CPQ7qzfUR_cf6ZKpSok",
            badge: { type: 'sale' as const, text: dict.properties.tags.commercial, color: 'grey' as const },
            location: "New York",
            title: "120 Broadway, Office 500",
            price: "$4,200,000",
            beds: 4,
            baths: 2,
            sqft: "5,400"
        },
        {
            id: 4,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-k3PzYGBbUSHpGaVPgAqfTJX7SxhUuhyYkPep9JBJ0fZZrQualze8qbUF8MJx6wamej9PzCbSCTQxdAcBWcYdK0tc6CCFCH2mseA0hfsk_hM2vKNuvI_w3So8q4X-vy7EIprYL3aZfzk055ApaTsuipZqfH-VFONH97VoWmCq7tyOe0qv3jFTSbAkq-U_YkPvZpR4Z_lBSnKMAA9q3yobAJlE664NWl3rzPVMOU70qwANlivKDTJE8J6oLBSGfXjwUmq9qEsXuXw",
            badge: { type: 'sale' as const, text: dict.properties.tags.land, color: 'green' as const },
            location: "Upstate New York, Lot 42",
            title: "Land",
            price: "$250,000",
            beds: 0,
            baths: 0,
            sqft: "5 Acres"
        },
    ];

    return (
        <div className="flex flex-col min-h-[calc(100vh-80px)]">
            <QuickFilters dict={dict} />

            <main className="flex flex-1 overflow-hidden h-full">
                {/* Sidebar */}
                <SidebarFilter dict={dict} />

                {/* Results Grid */}
                <section className="flex-1 overflow-y-auto bg-background-light p-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between md:items-end mb-6 gap-4">
                            <div>
                                <div className="text-sm text-text-muted mb-1">
                                    {dict.properties.breadcrumbs}
                                </div>
                                <h1 className="text-2xl font-bold text-text-main">
                                    {dict.properties.title}
                                </h1>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-text-muted">{dict.properties.sortBy}</span>
                                <select className="form-select border-none bg-transparent text-sm font-semibold text-text-main focus:ring-0 cursor-pointer py-0 pl-0 pr-8">
                                    <option>{dict.properties.sortNewest}</option>
                                    <option>{dict.properties.sortHighToLow}</option>
                                    <option>{dict.properties.sortLowToHigh}</option>
                                </select>
                            </div>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
                            {properties.map(property => (
                                <PropertyCard
                                    key={property.id}
                                    {...property}
                                    dict={dict}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        <Pagination />
                    </div>
                </section>

                {/* Mobile Filter Floating Button */}
                <button className="lg:hidden fixed bottom-6 right-6 z-40 bg-primary text-white px-5 py-3 rounded-full shadow-lg shadow-primary/40 flex items-center gap-2 font-semibold">
                    <span className="material-symbols-outlined">tune</span>
                    {dict.properties.sidebar.title}
                </button>
            </main>
        </div>
    );
}
