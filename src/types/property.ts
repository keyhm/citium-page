export interface Property {
    id: string;
    title: string;
    description: string;
    price: string;
    priceSale?: string;
    priceRent?: string;
    location: string;
    type: 'sale' | 'rent' | 'sale_rent';
    // categories align with Strapi enum values (Spanish)
    category:
        | 'casa'
        | 'apartamento'
        | 'estudio'
        | 'local'
        | 'lote'
        | 'finca'
        | 'edificio'
        | 'bodega'
        | 'consultorio'
        | 'otro';
    beds: number;
    baths: number;
    area: number;
    parking: number;
    images: string[];
    amenities: string[];
    coordinates: [number, number];
    createdAt: string;
    updatedAt: string;
}

export type PropertyCardDTO = Pick<Property, 'id' | 'title' | 'price' | 'priceSale' | 'priceRent' | 'location' | 'type' | 'category' | 'beds' | 'baths' | 'area'> & { image: string };
