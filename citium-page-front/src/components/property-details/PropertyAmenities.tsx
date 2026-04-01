import { Dictionary } from "@/types/types";

export default function PropertyAmenities({ dict, amenities }: { dict: Dictionary; amenities: string[] }) {
    if (!amenities || amenities.length === 0) return null;

    return (
        <div className="space-y-4 pt-6 border-t border-gray-200">
            <h3 className="text-xl font-bold text-text-main">{dict.propertyDetails.amenities.title}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6">
                {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2 text-text-muted">
                        <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                        <span>{amenity}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
