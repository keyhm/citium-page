import { Property, PropertyCardDTO } from '@/types/property';

// Mock Data
const MOCK_PROPERTIES: Property[] = [
    {
        id: "1",
        title: "Modern Loft in Arts District",
        description: "A beautiful modern loft with high ceilings and exposed brick walls, located in the vibrant Arts District. Perfect for creatives and professionals looking for a unique living space.",
        price: "$980,000",
        location: "Arts District, NY",
        type: "sale",
        category: "apartment",
        beds: 2,
        baths: 2,
        area: 120,
        parking: 1,
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuD7hPKoIUkdNNKNtmh5yeEV98DWoH_qsFst0hbyyv8AtR1IECv0vEjpOvA3pSGNALHEcX7BXBzZ_B0E8e2ufA0xhcXLzS_Qg3PNKvOqDJh8_B1TDUkKa4fPI5RggqA7jsu6NrXFGA8AMiWvHZcvim0xkfqA1rRWrWBD-g_NSjuhKYkFoDEyRD4mqM0s5xdSDyRwzvl5oTMG9FL1yVmR5M1a8G633hG4XYLXm_lDgmBdeQW3fHPyHIZkNOw_pld8Em6NEADRWQPulN8"
        ],
        amenities: ["Air Conditioning", "Gym", "Doorman"],
        coordinates: [40.730610, -73.935242],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "2",
        title: "Family Home with Garden",
        description: "Spacious family home featuring a large backyard garden, updated kitchen, and cozy fireplace. Located in a top-rated school district.",
        price: "$1,150,000",
        location: "Suburbs, NY",
        type: "sale",
        category: "house",
        beds: 4,
        baths: 3,
        area: 210,
        parking: 2,
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAY_sFqkavzMtflUHPuppkjjHpm8a2U4NHIm60frq_UBHF5jKZRnP53r_aajLSRADOS3kVhgWYPaLfGca1RoaM9-DI0scJkXCUGpLt9-uWM8nKwkgZ8TtJtLcghXpRdGiwvNBx8BVX1ymfbdMydB3YBqHujX2QF_ed9mDjgCiJ1eQ0cy-ZORoPCZrwrdNYGcltGWJg_jOSL0F1HdXtuNjcogCA7dpsEuNnkKzy3ue4naCYQPLMjAHupuo72tZtBcPgAHs0AMd-rOtY"
        ],
        amenities: ["Garden", "Garage", "Air Conditioning"],
        coordinates: [40.8000, -73.9000],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "3",
        title: "Penthouse View Suite",
        description: "Luxury penthouse suite offering panoramic city views. Features include a private terrace, floor-to-ceiling windows, and premium finishes throughout.",
        price: "$2,400,000",
        location: "Downtown, NY",
        type: "sale",
        category: "apartment",
        beds: 3,
        baths: 3,
        area: 180,
        parking: 2,
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCNKhvnOzNY_tDkSw3aFXF2atgKWCH7EyzMqa2jJ55KnpWIZlkY7OFzi5rjfck5BK_XW4dS3dUTSOC_y7Fq3BKxyOz5NNdiRkKvl1kE2fwSYNU-twuwCnNJTb3KZyiqSG6kYs4iiv_2W_c5SgsFUDU5YzARly5TeX1mrg0fHSlw5Q73hbpnZe-WMlPQdo_nC8sU7OHySdreRIvhCMQVqiAOM07xHRmdU3L_v0hTum8nrZ8QEUbpzdM3RMitkXRVx8Vz09RzL8yruis"
        ],
        amenities: ["Swimming Pool", "Gym", "Concierge", "Balcony"],
        coordinates: [40.7128, -74.0060],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "123", // Using 123 to match the current Detail page mock
        title: "Luxury 3-Bedroom Apartment in Downtown",
        description: "Experience the height of luxury living in this stunning 3-bedroom, 2.5-bathroom apartment located in the heart of Metro City's vibrant Downtown district.\n\nThe open-concept living area features wide-plank oak flooring and custom built-ins. The chef's kitchen is equipped with top-of-the-line appliances, quartz countertops, and a waterfall island perfect for entertaining.\n\nBuilding amenities include a 24-hour concierge, fitness center, rooftop pool, and private residents' lounge.",
        price: "$1,250,000",
        location: "123 Skyline Ave, Metro City",
        type: "sale",
        category: "apartment",
        beds: 3,
        baths: 2.5,
        area: 147,
        parking: 2,
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCDcmPWiHD_G0lNbpNIP7JZ2A3h9s17uJY2D4K5VB16kOsK38p6jAKzjg_6EW-Cb2Z7envYa9eoAVCrVgFQatZfbh_wutL-wRcJIhF207A5VsSlXkIAuysiD0lQHEYkb5oIhOy5uJYRFxkUdThXyxc_bZFb9sH7lidZKH-2pbcYuThFblXuejNkuoaswOP-3PTEVg7hOZMWX-w6QD3pbbQxZ1ZQBhWUthWWpSp2Jf9MbWQfWjLNpHLB2s3PX49d1RJHAFP8IJL8TGw",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCxFxaCf6Z7BOr_7gWtVlhrBE2d-ry1O1Ck6e2oUIno7Z2cWDt179xC0zcCVwE9XP2OszR14dvkrmGbvlAhbrRBGNMgSMbZZYmOnp8RLeOXJ8hKesLvEGDGm1oGPvfyd0f7tFX3j4ZVlpmkVRstoFU7n_lPLrycp5P_y7WTAkDBteQTBK7A01Q2Fwv8vROfrpsf3qD_EQTHCWIkNmGT039-dy5WXPJoiH5EskMeTPDUvtm8t4VOUp8MSr6hmICoERtj03ibhdxTNec",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCb_0ZGVpbh4V4awWx90zR5GYJSOliWwxfquWggWnmq_Wz0kb1ebQ4dCriM2TYFRGiWoXLiEArZjsE5fgeJ9UnmZzT9X8EkccFfG4jb5JhlzeBKp_xOMYLrE4kGq3zQoaAwa629JeJxlH1Yf15_-IDmCJmZ8R-uCqJuRsFMWEH0CxBmpC7mQsZWsePE2gdxr8RUEwkJO_s8xK39LjXPVAxu0J0cLYXeAoxx6o1OxpdlhYjxOCsujS3YM75GDQwtQvyTduiCf-y-Vs8",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBCa5mmBMcArSV5ec6DfQo0Uxxs6T76_802WmKJfS7dWLkIOMGdHIgO62EEJwHbKra1yo0c2y6TtLEDNioYh7T9Q18HWK59RRoGXYOiPB9B1plwRFVHZWRP9tljUkGagEkRsu6Sw86YaVUCTdqjrQjI6w2s4slt3g2a6d9U7JzW83u8Gp223w5QG7YkyMagWElBaGSsornCpnIfudMiabAfIMWGRJymsgPYtPLwyEKh0kPofyWNiDSE-HmOjRB3OWcr0aV0V0rqt4k"
        ],
        amenities: ["Air Conditioning", "Swimming Pool", "Central Heating", "Laundry Room", "Gym", "Alarm"],
        coordinates: [40.7128, -74.0060],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

// Map full properties to DTOs for lists
const mapToCardDTO = (p: Property): PropertyCardDTO => ({
    id: p.id,
    title: p.title,
    price: p.price,
    location: p.location,
    type: p.type,
    category: p.category,
    beds: p.beds,
    baths: p.baths,
    area: p.area,
    image: p.images[0] || ''
});

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const propertyService = {
    /**
     * Fetch a paginated list of properties with optional filters
     */
    getProperties: async (filters?: any): Promise<{ data: PropertyCardDTO[], total: number }> => {
        // In a real app, this would be a fetch call to Strapi like:
        // const res = await fetch(`${STRAPI_URL}/api/properties?populate=*&filters...`);
        // const json = await res.json();

        await delay(800); // Simulate network latency

        const data = MOCK_PROPERTIES.map(mapToCardDTO);
        return {
            data,
            total: data.length
        };
    },

    /**
     * Fetch a single property by ID
     */
    getPropertyById: async (id: string): Promise<Property | null> => {
        await delay(600);

        const property = MOCK_PROPERTIES.find(p => p.id === id);
        return property || null;
    },

    /**
     * Fetch featured properties (e.g., for Homepage)
     */
    getFeaturedProperties: async (): Promise<PropertyCardDTO[]> => {
        await delay(500);

        // Simulating returning the first 3 as featured
        return MOCK_PROPERTIES.slice(0, 3).map(mapToCardDTO);
    },

    /**
     * Fetch similar properties based on a reference property ID
     */
    getSimilarProperties: async (currentId: string): Promise<PropertyCardDTO[]> => {
        await delay(400);
        return MOCK_PROPERTIES.filter(p => p.id !== currentId).slice(0, 3).map(mapToCardDTO);
    }
};
