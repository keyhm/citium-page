import PropertyCard from '@/components/shared/PropertyCard';

export default function FeaturedProperties({ dict }: { dict: any }) {
    const properties = [
        {
            id: 1,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4muSDBxrW9EN01SV1EMa9JSs4RdFmuN61kYXUcnCIroMvw62sMo_gxg6Im7GxBtLeEFL9CWBML-zYIJau8iLhU4M0ktFQXRCUO75RNjCx2pbfw8nsuXgEBCu8WAcu2LUBeqQFmYMa3JuTpv3lwZJKNIMpj6pVHt-pC19QhXRILOvBbLpaTQqnFKOtR31AfnTm7wa3tZYb4rcYKagW5ZaLy_FyzZb6lY8qo7b_BNb5pZjbMA6Uv9F5m26T6GyHR1IbjZqyzyLmp_Q",
            badge: { type: 'sale' as const, text: dict.featured.forSale },
            location: "Malibu, CA",
            title: "Modern Beachfront Villa",
            price: "$4,500,000",
            beds: 4,
            baths: 3,
            sqft: "2,500"
        },
        {
            id: 2,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHuXR6PDSuxk3J0gWaFb2ylal6T8dQ9HOCH8uskUYb5hIvgIpQLuwL6erB7zPMtaTzUMWfylpgn0LfZzu9EvfOO0d7_OuY-i5ztzF-tMcUm3cWlKn9ccZy-2AyYh6-AD2mwEg1PVe9-y5qr4CFj4FRTG2Zaagd3eNzfzo8sOwcs2YrERS2SojywhcodhT4QFse35NO4vNc9rrzsOkjiyFKHrajxqMbouUtizNhpX8Pmx8M8WWYA0Glh1PrWec_awZbd4P-Y4UKhMg",
            badge: { type: 'rent' as const, text: dict.featured.forRent },
            location: "Beverly Hills, CA",
            title: "Luxury Hillside Estate",
            price: "$15,000",
            priceSuffix: dict.featured.mo,
            beds: 5,
            baths: 6,
            sqft: "4,200"
        },
        {
            id: 3,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBy19A1DJpHZJHKt7OIFM0cGrPxN9u34Anp5rh9fQ_e5aFAukZaaphom9vxcgfpX6s0TlWJHWq006WNyXaKwHa_jX6ryfmvZQ-_foGRW9fUwZWwuSIrPJghq1oKvAMlztCTdYkmd9uQ05XtWTu-lfB-O-YrvGq-K_QJQcUoVjaS5rkP73sSGbSySQT7yx349ZjkdxWWV0i90fazZG8m1aBMm6d9g1H4pfcdV5oSDrbH2P5mXXdAW0MdC352CQUtXg77bs-5hTHjEAI",
            badge: { type: 'new' as const, text: dict.featured.new },
            location: "New York, NY",
            title: "Skyline Penthouse",
            price: "$8,250,000",
            beds: 3,
            baths: 3.5,
            sqft: "2,100"
        }
    ];

    return (
        <section className="bg-background-light px-6 py-20 lg:py-28">
            <div className="mx-auto max-w-7xl">
                <div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div>
                        <div className="flex items-center gap-2 mb-2 md:mb-0">
                            <span className="h-px w-8 bg-secondary"></span>
                            <span className="text-sm font-bold uppercase tracking-widest text-secondary">{dict.featured.subtitle}</span>
                        </div>
                        <h2 className="font-display text-3xl font-bold text-text-main md:text-4xl">{dict.featured.title}</h2>
                    </div>
                    <a className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-text-main transition-colors hover:border-primary hover:text-primary" href="#">
                        {dict.featured.viewAll}
                    </a>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {properties.map(property => (
                        <PropertyCard
                            key={property.id}
                            {...property}
                            dict={dict}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
