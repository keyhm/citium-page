import { Property, PropertyCardDTO } from '@/types/property';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

interface StrapiItem {
    id?: number;
    documentId?: string;
    attributes?: StrapiAttributes;
    [key: string]: unknown;
}

interface StrapiAttributes {
    title?: string;
    description?: string;
    price?: string;
    priceSale?: string;
    priceRent?: string;
    location?: string;
    type?: string;
    category?: string;
    beds?: number;
    baths?: number;
    area?: number;
    parking?: number;
    images?: {
        data?: Array<{
            attributes?: {
                url?: string;
            };
            url?: string;
        }>;
    } | Array<{
        url?: string;
    }>;
    amenities?: string[];
    coordinates?: [number, number];
    createdAt?: string;
    updatedAt?: string;
}

const mapStrapiToProperty = (item: StrapiItem): Property => {
    // Strapi REST API formats: `attributes` wrapper (v4) or flattened (v5)
    const attr = item.attributes || (item as StrapiAttributes);

    // Extract images parsing Strapi's media format
    let imageUrls: string[] = [];
    if ((attr as any).images?.data) {
        imageUrls = (attr as any).images.data.map((img: any) => {
            const url = img.attributes?.url || img.url;
            return url?.startsWith('http') ? url : `${STRAPI_URL}${url}`;
        });
    } else if (Array.isArray((attr as any).images)) {
        imageUrls = (attr as any).images.map((img: any) => {
            const url = img.url;
            return url?.startsWith('http') ? url : `${STRAPI_URL}${url}`;
        });
    }

    // determine primary display price and normalized type
    // we look at the explicit sale/rent price fields first; Strapi sometimes
    // populates the generic `price` which is typically used for sale values
    // but may be missing when the record is rent-only, so we treat that as a
    // fallback.  Computing the type from the actual price fields ensures the
    // toggle filter behaviour stays in sync with the data.
    const salePrice = attr.priceSale || '';
    const rentPrice = attr.priceRent || '';
    const genericPrice = attr.price || '';

    let displayPrice = '';
    let typeVal: 'sale' | 'rent' | 'sale_rent' = (attr.type as 'sale' | 'rent' | 'sale_rent') || 'sale';

    if (salePrice && rentPrice) {
        // has both prices
        displayPrice = `${salePrice} / ${rentPrice}`;
        typeVal = 'sale_rent';
    } else if (rentPrice) {
        displayPrice = rentPrice;
        typeVal = 'rent';
    } else if (salePrice) {
        displayPrice = salePrice;
        typeVal = 'sale';
    } else if (genericPrice) {
        displayPrice = genericPrice;
        // honour explicit type only if it matches one of the two modes
        if (typeVal === 'rent' || typeVal === 'sale_rent') {
            // keep as-is
        } else {
            typeVal = 'sale';
        }
    }

    return {
        id: item.documentId || item.id?.toString() || '',
        title: attr.title || '',
        description: attr.description || '',
        price: displayPrice,
        priceSale: attr.priceSale || undefined,
        priceRent: attr.priceRent || undefined,
        location: attr.location || '',
        type: typeVal,
        // Strapi now uses Spanish enum values; fall back to a generic 'casa' if missing
        category: (attr.category as Property['category']) || 'casa',
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
    priceSale: p.priceSale,
    priceRent: p.priceRent,
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
        // generic price range (used when type is sale or rent)
        minPrice?: string;
        maxPrice?: string;
        // when the UI is in "sale_rent" mode we expose explicit fields
        minPriceSale?: string;
        maxPriceSale?: string;
        minPriceRent?: string;
        maxPriceRent?: string;
        beds?: string;
        baths?: string;
        amenities?: string[];
        page?: number;
        pageSize?: number;
        sort?: string;
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

            // Sorting
            if (filters?.sort === 'priceHighToLow') {
                params.append('sort', 'priceSale:desc,priceRent:desc');
            }

            if (filters?.sort === 'priceLowToHigh') {
                params.append('sort', 'priceSale:asc,priceRent:asc');
            }

            // Build Strapi REST filters array dynamically
            if (filters) {
                if (filters.location) {
                    params.append('filters[location][$contains]', filters.location);
                }
                if (filters.type) {
                    // Filter based on price field presence to determine listing mode
                    const t = filters.type;
                    if (t === 'sale') {
                        // Sale: only properties with priceSale set
                        params.append('filters[priceSale][$notNull]', 'true');
                    } else if (t === 'rent') {
                        // Rent: only properties with priceRent set
                        params.append('filters[priceRent][$notNull]', 'true');
                    } else if (t === 'sale_rent') {
                        // Sale & Rent: properties with both sale and rent prices
                        params.append('filters[priceSale][$notNull]', 'true');
                        params.append('filters[priceRent][$notNull]', 'true');
                    } else {
                        params.append('filters[type][$eq]', t);
                    }
                }

                if (filters.category && filters.category !== 'all') {
                    // Strapi expects a comma-separated list for $in filters;
                    // previous implementation appended indexed params which are ignored,
                    // leading to no filtering when a category was selected.
                    const categories = filters.category.split(',');
                    params.append('filters[category][$in]', categories.join(','));
                }

                // Price Range (generic) - filter properties by sale price when type is sale
                if (filters.minPrice) {
                    const min = parseInt(filters.minPrice.replace(/\D/g, ''));
                    params.append('filters[priceSale][$gte]', min.toString());
                }
                if (filters.maxPrice) {
                    const max = parseInt(filters.maxPrice.replace(/\D/g, ''));
                    params.append('filters[priceSale][$lte]', max.toString());
                }

                // specialized ranges when both sale and rent may be shown
                if (filters.minPriceSale) {
                    const min = parseInt(filters.minPriceSale.replace(/\D/g, ''));
                    params.append('filters[priceSale][$gte]', min.toString());
                }
                if (filters.maxPriceSale) {
                    const max = parseInt(filters.maxPriceSale.replace(/\D/g, ''));
                    params.append('filters[priceSale][$lte]', max.toString());
                }
                if (filters.minPriceRent) {
                    const min = parseInt(filters.minPriceRent.replace(/\D/g, ''));
                    params.append('filters[priceRent][$gte]', min.toString());
                }
                if (filters.maxPriceRent) {
                    const max = parseInt(filters.maxPriceRent.replace(/\D/g, ''));
                    params.append('filters[priceRent][$lte]', max.toString());
                }

                // Beds filter
                if (filters.beds && filters.beds !== 'any') {
                    const bedsValue = parseInt(filters.beds);
                    if (bedsValue === 4) {
                        // For 4+, filter beds >= 4
                        params.append('filters[beds][$gte]', bedsValue.toString());
                    } else {
                        // For 1,2,3, filter exactly that number
                        params.append('filters[beds][$eq]', bedsValue.toString());
                    }
                }

                // Baths filter
                if (filters.baths && filters.baths !== 'any') {
                    const bathsValue = parseInt(filters.baths);
                    if (bathsValue === 4) {
                        // For 4+, filter baths >= 4
                        params.append('filters[baths][$gte]', bathsValue.toString());
                    } else {
                        // For 1,2,3, filter exactly that number
                        params.append('filters[baths][$eq]', bathsValue.toString());
                    }
                }

                // Amenities
                if (filters.amenities && filters.amenities.length > 0) {
                    // Requires $contains for arrays or text fields in Strapi
                    filters.amenities.forEach((amenity, idx) => {
                        params.append(`filters[amenities][$contains][${idx}]`, amenity);
                    });
                }
            }

            const url = `${STRAPI_URL}/api/properties?${params.toString()}`;
            // debug: log the generated URL so issues with filter encoding can
            // be observed in the browser console
            if (process.env.NODE_ENV === 'development') {
                console.debug('PropertyService query URL:', url);
            }
            const res = await fetch(url, {
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
