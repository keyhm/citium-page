import { Dictionary } from "@/types/types";
import { Property } from "@/types/property";

export default function PropertySpecs({ dict, property }: { dict: Dictionary; property: Property }) {
    return (
        <div className="flex flex-wrap gap-4 md:gap-8 py-6 border-y border-gray-200">
            <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-full bg-background-light text-text-muted">
                    <span className="material-symbols-outlined text-[24px]">bed</span>
                </div>
                <div>
                    <p className="text-sm text-text-muted font-medium">{dict.propertyDetails.specs.bedrooms}</p>
                    <p className="text-lg font-bold text-text-main">{property.beds}</p>
                </div>
            </div>

            <div className="w-px h-12 bg-gray-200 hidden md:block"></div>

            <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-full bg-background-light text-text-muted">
                    <span className="material-symbols-outlined text-[24px]">bathtub</span>
                </div>
                <div>
                    <p className="text-sm text-text-muted font-medium">{dict.propertyDetails.specs.bathrooms}</p>
                    <p className="text-lg font-bold text-text-main">{property.baths}</p>
                </div>
            </div>

            <div className="w-px h-12 bg-gray-200 hidden md:block"></div>

            <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-full bg-background-light text-text-muted">
                    <span className="material-symbols-outlined text-[24px]">square_foot</span>
                </div>
                <div>
                    <p className="text-sm text-text-muted font-medium">{dict.propertyDetails.specs.area}</p>
                    <p className="text-lg font-bold text-text-main">{property.area}</p>
                </div>
            </div>

            <div className="w-px h-12 bg-gray-200 hidden md:block"></div>

            <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-full bg-background-light text-text-muted">
                    <span className="material-symbols-outlined text-[24px]">garage_home</span>
                </div>
                <div>
                    <p className="text-sm text-text-muted font-medium">{dict.propertyDetails.specs.parking}</p>
                    <p className="text-lg font-bold text-text-main">{property.parking}</p>
                </div>
            </div>
        </div>
    );
}
