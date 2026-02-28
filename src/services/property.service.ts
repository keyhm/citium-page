import { Property, PropertyCardDTO } from '@/types/property';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

const mapStrapiToProperty = (item: any): Property => {
    // Strapi REST API formats: `attributes` wrapper (v4) or flattened (v5)
    const attr = item.attributes || item;

    // Extract images parsing Strapi's media format
    let imageUrls: string[] = [];
    if (attr.images?.data) {
        imageUrls = attr.images.data.map((img: any) => {
            const url = img.attributes?.url || img.url;
            return url?.startsWith('http') ? url : `${STRAPI_URL}${url}`;
        });
    } else if (Array.isArray(attr.images)) {
        imageUrls = attr.images.map((img: any) => {
            const url = img.url;
            return url?.startsWith('http') ? url : `${STRAPI_URL}${url}`;
        });
    }

    return {
        id: item.documentId || item.id?.toString() || '',
        title: attr.title || '',
        description: attr.description || '',
        price: attr.price || '',
        location: attr.location || '',
        type: attr.type || 'sale',
        category: attr.category || 'house',
        beds: attr.beds || 0,
        baths: attr.baths || 0,
        area: attr.area || 0,
        parking: attr.parking || 0,
        images: imageUrls,
        amenities: attr.amenities || [],
        coordinates: attr.coordinates || [0, 0],
        createdAt: attr.createdAt || new Date().toISOString(),
        updatedAt: attr.updatedAt || new Date().toISOString()
    };
};

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
    image: p.images[0] || 'https://placehold.co/600x400?text=No+Image' // Fallback image if Strapi returns empty media
});

export const propertyService = {
    /**
     * Fetch a paginated list of properties with optional filters
     */
    getProperties: async (filters?: {
        type?: string;
        category?: string;
        location?: string;
        minPrice?: string;
        maxPrice?: string;
        beds?: string;
        amenities?: string[];
        page?: number;
        pageSize?: number;
    }): Promise<{
        data: PropertyCardDTO[],
        meta: {
            pagination: {
                page: number;
                pageSize: number;
                pageCount: number;
                total: number
            }
        }
    }> => {
        try {
            // Base query fetching all relations
            const params = new URLSearchParams();
            params.append('populate', '*');

            // Pagination
            const page = filters?.page || 1;
            const pageSize = filters?.pageSize || 12;
            params.append('pagination[page]', page.toString());
            params.append('pagination[pageSize]', pageSize.toString());

            // Build Strapi REST filters array dynamically
            if (filters) {
                if (filters.location) {
                    params.append('filters[location][$contains]', filters.location);
                }
                if (filters.type) {
                    params.append('filters[type][$eq]', filters.type);
                }

                if (filters.category && filters.category !== 'all') {
                    // Split if multiple comma-separated categories are passed somehow, otherwise just append
                    const categories = filters.category.split(',');
                    categories.forEach((cat, idx) => {
                        params.append(`filters[category][$in][${idx}]`, cat);
                    });
                }

                // Price Range
                if (filters.minPrice) {
                    const min = parseInt(filters.minPrice.replace(/\D/g, ''));
                    // Note: If you saved price as string in Strapi "$1,200", filtering greater/less than won't work perfectly on DB side
                    // Ideally you want an integer field if doing range queries, but this is the syntax
                    params.append('filters[priceNumber][$gte]', min.toString());
                }

                if (filters.maxPrice) {
                    const max = parseInt(filters.maxPrice.replace(/\D/g, ''));
                    params.append('filters[priceNumber][$lte]', max.toString());
                }

                // Minimum Beds
                if (filters.beds && filters.beds !== 'any') {
                    const minBeds = parseInt(filters.beds);
                    params.append('filters[beds][$gte]', minBeds.toString());
                }

                // Amenities
                if (filters.amenities && filters.amenities.length > 0) {
                    // Requires $contains for arrays or text fields in Strapi
                    filters.amenities.forEach((amenity, idx) => {
                        params.append(`filters[amenities][$contains][${idx}]`, amenity);
                    });
                }
            }

            const res = await fetch(`${STRAPI_URL}/api/properties?${params.toString()}`, {
                cache: 'no-store'
            });
            if (!res.ok) throw new Error(`Strapi response error: ${res.status}`);

            const json = await res.json();
            if (!json.data) {
                return {
                    data: [],
                    meta: { pagination: { page, pageSize, pageCount: 0, total: 0 } }
                };
            }

            const properties: Property[] = Array.isArray(json.data) ? json.data.map(mapStrapiToProperty) : [];
            const meta = json.meta || { pagination: { page, pageSize, pageCount: 1, total: properties.length } };

            return {
                data: properties.map(mapToCardDTO),
                meta
            };
        } catch (error) {
            console.error("Error fetching properties from Strapi:", error);
            return {
                data: [],
                meta: { pagination: { page: 1, pageSize: 12, pageCount: 0, total: 0 } }
            };
        }
    },

    /**
     * Fetch a single property by ID or DocumentID
     */
    getPropertyById: async (id: string): Promise<Property | null> => {
        try {
            // Querying exactly the endpoint for single match
            const res = await fetch(`${STRAPI_URL}/api/properties/${id}?populate=*`, {
                cache: 'no-store'
            });

            if (!res.ok) return null;

            const json = await res.json();
            if (!json.data) return null;

            return mapStrapiToProperty(json.data);
        } catch (error) {
            console.error(`Error fetching property ${id} from Strapi:`, error);
            return null;
        }
    },

    /**
     * Fetch featured properties (e.g., for Homepage)
     */
    getFeaturedProperties: async (): Promise<PropertyCardDTO[]> => {
        try {
            const res = await fetch(`${STRAPI_URL}/api/properties?populate=*&pagination[limit]=3`, {
                cache: 'no-store'
            });
            if (!res.ok) throw new Error(`Strapi response error: ${res.status}`);

            const json = await res.json();
            if (!json.data) return [];

            const properties: Property[] = Array.isArray(json.data) ? json.data.map(mapStrapiToProperty) : [];
            return properties.map(mapToCardDTO);
        } catch (error) {
            console.error("Error fetching featured properties from Strapi:", error);
            return [];
        }
    },

    /**
     * Fetch similar properties based on a reference property ID
     */
    getSimilarProperties: async (currentId: string): Promise<PropertyCardDTO[]> => {
        try {
            // Fetch excluding current ID and limiting to 3
            // In Strapi v4/v5 you can filter using id or documentId
            const res = await fetch(`${STRAPI_URL}/api/properties?populate=*&filters[documentId][$ne]=${currentId}&filters[id][$ne]=${currentId}&pagination[limit]=3`, {
                cache: 'no-store'
            });
            if (!res.ok) throw new Error(`Strapi response error: ${res.status}`);

            const json = await res.json();
            if (!json.data) return [];

            const properties: Property[] = Array.isArray(json.data) ? json.data.map(mapStrapiToProperty) : [];
            return properties.map(mapToCardDTO);
        } catch (error) {
            console.error("Error fetching similar properties from Strapi:", error);
            return [];
        }
    }
};
