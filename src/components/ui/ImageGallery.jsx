import { useState } from 'react'
import PropTypes from 'prop-types'

/**
 * Image Gallery component with thumbnails and zoom
 */
export function ImageGallery({ images, alt = 'Image', className = '' }) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isZoomed, setIsZoomed] = useState(false)

    if (!images || images.length === 0) {
        return (
            <div className={`bg-slate-200 dark:bg-slate-700 rounded-2xl flex items-center justify-center h-80 ${className}`}>
                <span className="text-slate-400">No images available</span>
            </div>
        )
    }

    const activeImage = images[activeIndex]

    const goToPrev = () => {
        setActiveIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
    }

    const goToNext = () => {
        setActiveIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))
    }

    return (
        <div className={className}>
            {/* Main image */}
            <div className="relative group overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
                <img
                    src={activeImage}
                    alt={`${alt} ${activeIndex + 1}`}
                    className={`w-full h-80 md:h-96 object-cover transition-transform duration-300 ${isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
                        }`}
                    onClick={() => setIsZoomed(!isZoomed)}
                />

                {/* Navigation arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={goToPrev}
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/90 dark:bg-slate-800/90 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-slate-700"
                            aria-label="Previous image"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={goToNext}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/90 dark:bg-slate-800/90 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-slate-700"
                            aria-label="Next image"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </>
                )}

                {/* Zoom indicator */}
                <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    {isZoomed ? 'Click to zoom out' : 'Click to zoom'}
                </div>

                {/* Image counter */}
                <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/50 text-white text-sm rounded-lg">
                    {activeIndex + 1} / {images.length}
                </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide py-1">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`
                flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden transition-all
                ${index === activeIndex
                                    ? 'ring-2 ring-primary-500 ring-offset-2'
                                    : 'opacity-70 hover:opacity-100'
                                }
              `}
                        >
                            <img
                                src={image}
                                alt={`${alt} thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    alt: PropTypes.string,
    className: PropTypes.string
}

export default ImageGallery
