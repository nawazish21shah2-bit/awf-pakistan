"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface PKProgramGalleryProps {
  title: string;
  images: string[];
}

export function PKProgramGallery({ title, images }: PKProgramGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOpen = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleNext, handlePrev]);

  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-3 pt-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold uppercase tracking-wider text-primary">
          Project Photo Gallery
        </h4>
        <span className="text-xs text-muted font-medium">
          {images.length} photo{images.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {images.map((src, idx) => (
          <button
            key={`${src}-${idx}`}
            type="button"
            onClick={() => handleOpen(idx)}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label={`View photo ${idx + 1} of ${title}`}
          >
            <Image
              src={src}
              alt={`Gallery image ${idx + 1} for ${title}`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 200px"
            />
            <div className="absolute inset-0 bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="p-2 rounded-full bg-white/90 text-primary shadow-sm">
                <Maximize2 className="w-4 h-4" />
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Interactive Fullscreen Lightbox Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} image gallery`}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white z-10">
            <span className="text-xs sm:text-sm font-medium tracking-wide text-white/80">
              {title} &bull; Photo {currentIndex + 1} of {images.length}
            </span>
            <button
              onClick={handleClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none"
              aria-label="Close photo gallery"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Center Image with Navigation Buttons */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 z-20 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all transform hover:scale-110 focus:outline-none"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            <div className="relative w-full h-full max-w-5xl max-h-[75vh]">
              <Image
                src={images[currentIndex]}
                alt={`Photo ${currentIndex + 1} of ${title}`}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 95vw, 1200px"
                priority
              />
            </div>

            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 z-20 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all transform hover:scale-110 focus:outline-none"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 max-w-4xl mx-auto px-4">
            {images.map((src, idx) => (
              <button
                key={`thumb-${src}-${idx}`}
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-14 h-10 sm:w-20 sm:h-14 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                  currentIndex === idx
                    ? "border-accent scale-105 shadow-glow"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
                aria-label={`Thumbnail ${idx + 1}`}
              >
                <Image
                  src={src}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
