export interface Property {
    id: string;
    title: string;
    description: string;
    price: string;
    location: string;
    type: 'sale' | 'rent' | 'sold';
    category: 'house' | 'apartment' | 'commercial' | 'land';
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

export type PropertyCardDTO = Pick<Property, 'id' | 'title' | 'price' | 'location' | 'type' | 'category' | 'beds' | 'baths' | 'area'> & { image: string };
