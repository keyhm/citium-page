'use client'

import { useState } from 'react'

export default function PropertyGallery({ dict, images }: { dict: any; images: string[] }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  if (!images || images.length === 0) return null

  const nextImage = () => {
    if (selectedImage === null) return
    setSelectedImage((selectedImage + 1) % images.length)
  }

  const prevImage = () => {
    if (selectedImage === null) return
    setSelectedImage((selectedImage - 1 + images.length) % images.length)
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-[400px] md:h-[500px] rounded-xl overflow-hidden">
        
        {/* Imagen principal */}
        <div className="md:col-span-1 h-full relative group cursor-pointer"
          onClick={() => setSelectedImage(0)}
        >
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${images[0]}')` }}
          />
        </div>

        <div className="md:col-span-1 grid grid-rows-2 gap-2 h-full">

          <div className="relative group cursor-pointer"
            onClick={() => setSelectedImage(1)}
          >
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url('${images[1] || images[0]}')` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">

            <div className="relative group cursor-pointer"
              onClick={() => setSelectedImage(2)}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${images[2] || images[0]}')` }}
              />
            </div>

            <div className="relative group cursor-pointer"
              onClick={() => setSelectedImage(3)}
            >
              <div className="absolute inset-0 bg-black/20 hover:bg-black/30 transition-colors z-10 flex items-center justify-center">
                <span className="text-white font-medium text-lg flex items-center gap-1">
                  <span className="material-symbols-outlined">grid_view</span>
                  {dict.propertyDetails.showAllPhotos}
                </span>
              </div>
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${images[3] || images[0]}')` }}
              />
            </div>

          </div>
        </div>
      </div>

      {/* MODAL */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
            className="absolute left-6 text-white text-4xl"
          >
            ‹
          </button>

          {/* Imagen */}
          <img
            src={images[selectedImage]}
            alt="Property image"
            className="max-w-[90%] max-h-[90%] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
            className="absolute right-6 text-white text-4xl"
          >
            ›
          </button>

          {/* Close */}
          <button
            className="absolute top-6 right-6 text-white text-3xl"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </button>
        </div>
      )}
    </>
  )
}