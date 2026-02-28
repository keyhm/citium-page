import PropertyCard from '@/components/shared/PropertyCard';

export default function SimilarProperties({ dict }: { dict: any }) {
    // Mock similar properties data
    const properties = [
        {
            id: 101,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7hPKoIUkdNNKNtmh5yeEV98DWoH_qsFst0hbyyv8AtR1IECv0vEjpOvA3pSGNALHEcX7BXBzZ_B0E8e2ufA0xhcXLzS_Qg3PNKvOqDJh8_B1TDUkKa4fPI5RggqA7jsu6NrXFGA8AMiWvHZcvim0xkfqA1rRWrWBD-g_NSjuhKYkFoDEyRD4mqM0s5xdSDyRwzvl5oTMG9FL1yVmR5M1a8G633hG4XYLXm_lDgmBdeQW3fHPyHIZkNOw_pld8Em6NEADRWQPulN8",
            badge: { type: 'sale' as const, text: dict.properties.tags.house, color: 'blue' as const },
            location: "Arts District, NY",
            title: "Modern Loft in Arts District",
            price: "$980,000",
            beds: 2,
            baths: 2,
            sqft: "120" // Reusing the same props from PropertyCard
        },
        {
            id: 102,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAY_sFqkavzMtflUHPuppkjjHpm8a2U4NHIm60frq_UBHF5jKZRnP53r_aajLSRADOS3kVhgWYPaLfGca1RoaM9-DI0scJkXCUGpLt9-uWM8nKwkgZ8TtJtLcghXpRdGiwvNBx8BVX1ymfbdMydB3YBqHujX2QF_ed9mDjgCiJ1eQ0cy-ZORoPCZrwrdNYGcltGWJg_jOSL0F1HdXtuNjcogCA7dpsEuNnkKzy3ue4naCYQPLMjAHupuo72tZtBcPgAHs0AMd-rOtY",
            badge: { type: 'sale' as const, text: dict.properties.tags.house, color: 'blue' as const },
            location: "Suburbs, NY",
            title: "Family Home with Garden",
            price: "$1,150,000",
            beds: 4,
            baths: 3,
            sqft: "210"
        },
        {
            id: 103,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNKhvnOzNY_tDkSw3aFXF2atgKWCH7EyzMqa2jJ55KnpWIZlkY7OFzi5rjfck5BK_XW4dS3dUTSOC_y7Fq3BKxyOz5NNdiRkKvl1kE2fwSYNU-twuwCnNJTb3KZyiqSG6kYs4iiv_2W_c5SgsFUDU5YzARly5TeX1mrg0fHSlw5Q73hbpnZe-WMlPQdo_nC8sU7OHySdreRIvhCMQVqiAOM07xHRmdU3L_v0hTum8nrZ8QEUbpzdM3RMitkXRVx8Vz09RzL8yruis",
            badge: { type: 'sale' as const, text: dict.properties.tags.apartment, color: 'blue' as const },
            location: "Downtown, NY",
            title: "Penthouse View Suite",
            price: "$2,400,000",
            beds: 3,
            baths: 3,
            sqft: "180"
        }
    ];

    return (
        <div className="mt-16 mb-8">
            <h3 className="text-2xl font-bold text-text-main mb-6">{dict.propertyDetails.similar.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map(property => (
                    <PropertyCard key={property.id} dict={dict} {...property} />
                ))}
            </div>
        </div>
    );
}
