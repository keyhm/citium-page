export default function PropertyGallery({ dict, images }: { dict: any; images: string[] }) {
    if (!images || images.length === 0) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-[400px] md:h-[500px] rounded-xl overflow-hidden">
            <div className="md:col-span-1 h-full relative group cursor-pointer">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10"></div>
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${images[0]}')` }}></div>
            </div>

            <div className="md:col-span-1 grid grid-rows-2 gap-2 h-full">
                <div className="relative group cursor-pointer">
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10"></div>
                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${images[1] || images[0]}')` }}></div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div className="relative group cursor-pointer">
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10"></div>
                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${images[2] || images[0]}')` }}></div>
                    </div>

                    <div className="relative group cursor-pointer">
                        <div className="absolute inset-0 bg-black/20 hover:bg-black/30 transition-colors z-10 flex items-center justify-center">
                            <span className="text-white font-medium text-lg flex items-center gap-1">
                                <span className="material-symbols-outlined">grid_view</span>
                                {dict.propertyDetails.showAllPhotos}
                            </span>
                        </div>
                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${images[3] || images[0]}')` }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
