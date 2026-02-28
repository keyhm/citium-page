import { getDictionary } from '@/lib/dictionary';
import dynamic from 'next/dynamic';

// Static Components
import PropertyHeader from '@/components/property-details/PropertyHeader';
import PropertyGallery from '@/components/property-details/PropertyGallery';
import PropertySpecs from '@/components/property-details/PropertySpecs';
import PropertyAmenities from '@/components/property-details/PropertyAmenities';
import AgentContactForm from '@/components/property-details/AgentContactForm';
import SimilarProperties from '@/components/property-details/SimilarProperties';
import PropertyMap from '@/components/property-details/PropertyMap';

export default async function PropertyDetailsPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
    const { locale } = await params;
    const dict = await getDictionary(locale as 'en' | 'es');

    // Mock property data based on the HTML template
    const property = {
        title: "Luxury 3-Bedroom Apartment in Downtown",
        price: "$1,250,000",
        pricePerSqm: locale === 'es' ? "$8,500/m²" : "$8,500/sqm",
        location: "123 Skyline Ave, Metro City",
        beds: 3,
        baths: 2.5,
        sqft: locale === 'es' ? "147 m²" : "1,582 Sq Ft",
        parking: locale === 'es' ? "2 Espacios" : "2 Spots",
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCDcmPWiHD_G0lNbpNIP7JZ2A3h9s17uJY2D4K5VB16kOsK38p6jAKzjg_6EW-Cb2Z7envYa9eoAVCrVgFQatZfbh_wutL-wRcJIhF207A5VsSlXkIAuysiD0lQHEYkb5oIhOy5uJYRFxkUdThXyxc_bZFb9sH7lidZKH-2pbcYuThFblXuejNkuoaswOP-3PTEVg7hOZMWX-w6QD3pbbQxZ1ZQBhWUthWWpSp2Jf9MbWQfWjLNpHLB2s3PX49d1RJHAFP8IJL8TGw",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCxFxaCf6Z7BOr_7gWtVlhrBE2d-ry1O1Ck6e2oUIno7Z2cWDt179xC0zcCVwE9XP2OszR14dvkrmGbvlAhbrRBGNMgSMbZZYmOnp8RLeOXJ8hKesLvEGDGm1oGPvfyd0f7tFX3j4ZVlpmkVRstoFU7n_lPLrycp5P_y7WTAkDBteQTBK7A01Q2Fwv8vROfrpsf3qD_EQTHCWIkNmGT039-dy5WXPJoiH5EskMeTPDUvtm8t4VOUp8MSr6hmICoERtj03ibhdxTNec",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCb_0ZGVpbh4V4awWx90zR5GYJSOliWwxfquWggWnmq_Wz0kb1ebQ4dCriM2TYFRGiWoXLiEArZjsE5fgeJ9UnmZzT9X8EkccFfG4jb5JhlzeBKp_xOMYLrE4kGq3zQoaAwa629JeJxlH1Yf15_-IDmCJmZ8R-uCqJuRsFMWEH0CxBmpC7mQsZWsePE2gdxr8RUEwkJO_s8xK39LjXPVAxu0J0cLYXeAoxx6o1OxpdlhYjxOCsujS3YM75GDQwtQvyTduiCf-y-Vs8",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBCa5mmBMcArSV5ec6DfQo0Uxxs6T76_802WmKJfS7dWLkIOMGdHIgO62EEJwHbKra1yo0c2y6TtLEDNioYh7T9Q18HWK59RRoGXYOiPB9B1plwRFVHZWRP9tljUkGagEkRsu6Sw86YaVUCTdqjrQjI6w2s4slt3g2a6d9U7JzW83u8Gp223w5QG7YkyMagWElBaGSsornCpnIfudMiabAfIMWGRJymsgPYtPLwyEKh0kPofyWNiDSE-HmOjRB3OWcr0aV0V0rqt4k"
        ],
        description: [
            "Experience the height of luxury living in this stunning 3-bedroom, 2.5-bathroom apartment located in the heart of Metro City's vibrant Downtown district. Recently renovated with high-end finishes, this residence offers breathtaking panoramic views of the city skyline through floor-to-ceiling windows.",
            "The open-concept living area features wide-plank oak flooring and custom built-ins. The chef's kitchen is equipped with top-of-the-line appliances, quartz countertops, and a waterfall island perfect for entertaining. The master suite is a true sanctuary with a walk-in closet and a spa-like ensuite bathroom featuring a soaking tub and rain shower.",
            "Building amenities include a 24-hour concierge, fitness center, rooftop pool, and private residents' lounge. Just steps away from the best dining, shopping, and cultural attractions the city has to offer."
        ],
        amenities: [
            dict.propertyDetails.amenities.ac,
            dict.propertyDetails.amenities.pool,
            dict.propertyDetails.amenities.heating,
            dict.propertyDetails.amenities.laundry,
            dict.propertyDetails.amenities.gym,
            dict.propertyDetails.amenities.alarm
        ],
        coordinates: [40.7128, -74.0060] as [number, number]
    };

    return (
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-10 py-6">

            {/* Breadcrumb */}
            <div className="flex flex-wrap items-center gap-2 mb-6 text-sm">
                <a className="text-text-muted hover:text-primary transition-colors" href={`/${locale}`}>
                    {locale === 'es' ? 'Inicio' : 'Home'}
                </a>
                <span className="text-gray-400 material-symbols-outlined text-[16px]">chevron_right</span>
                <a className="text-text-muted hover:text-primary transition-colors" href={`/${locale}/properties`}>
                    {dict.properties.quickFilters.forSale}
                </a>
                <span className="text-gray-400 material-symbols-outlined text-[16px]">chevron_right</span>
                <span className="text-text-main font-medium">{property.title}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Main Content Column */}
                <div className="lg:col-span-8 flex flex-col gap-8">
                    {/* Header Info (Mobile Only) */}
                    <div className="block lg:hidden">
                        <PropertyHeader dict={dict} property={property} />
                    </div>

                    <PropertyGallery dict={dict} images={property.images} />

                    {/* Header Info (Desktop) */}
                    <div className="hidden lg:block relative -mt-4">
                        <PropertyHeader dict={dict} property={property} />
                    </div>

                    <PropertySpecs dict={dict} property={property} />

                    {/* Description */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-text-main">{dict.propertyDetails.description.title}</h3>
                        <div className="prose max-w-none text-text-muted leading-relaxed">
                            {property.description.map((p, index) => (
                                <p key={index} className={index > 0 ? "mt-4" : ""}>{p}</p>
                            ))}
                        </div>
                        <button className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
                            {dict.propertyDetails.description.showMore} <span className="material-symbols-outlined text-[16px]">expand_more</span>
                        </button>
                    </div>

                    <PropertyAmenities dict={dict} amenities={property.amenities} />

                    <PropertyMap dict={dict} location={property.location} coordinates={property.coordinates} />
                </div>

                {/* Sidebar Sticky Column */}
                <div className="lg:col-span-4 relative">
                    <div className="sticky top-24 space-y-6">
                        <AgentContactForm dict={dict} />

                        {/* Mini Safety Card */}
                        <div className="bg-background-light rounded-lg p-4 flex gap-3 items-start border border-gray-200">
                            <span className="material-symbols-outlined text-primary mt-1">shield</span>
                            <div>
                                <h5 className="font-bold text-text-main text-sm">{dict.propertyDetails.safety.title}</h5>
                                <p className="text-xs text-text-muted mt-1">
                                    {dict.propertyDetails.safety.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <SimilarProperties dict={dict} />
        </div>
    );
}
