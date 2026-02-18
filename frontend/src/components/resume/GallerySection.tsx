import { useState } from 'react';
import SectionHeader from './SectionHeader';

const galleryImages = [
  { src: '/images/img_1.png', alt: 'Gallery image 1' },
  { src: '/images/img_2.png', alt: 'Gallery image 2' },
  { src: '/images/img_3.png', alt: 'Gallery image 3' },
  { src: '/images/img_4.png', alt: 'Gallery image 4' },
  { src: '/images/img_5.png', alt: 'Gallery image 5' },
];

interface GallerySectionProps {
  className?: string;
}

const GallerySection = ({ className = '' }: GallerySectionProps) => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="gallery" className={`py-24 ${className}`}>
      <div className="px-6 max-w-6xl mx-auto">
        <SectionHeader number="03.5" title="Gallery" />

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`group relative overflow-hidden rounded-lg border border-border hover:border-primary/50 transition-all duration-300 ${
                i === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover aspect-square transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-mono text-xs text-foreground tracking-wider">
                  [ {String(i + 1).padStart(2, '0')} ]
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-6 right-6 font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setSelected(null)}
          >
            [ CLOSE ]
          </button>
          <img
            src={galleryImages[selected].src}
            alt={galleryImages[selected].alt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg border border-border"
            onClick={(e) => e.stopPropagation()}
          />
          {/* Nav arrows */}
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 font-mono text-2xl text-muted-foreground hover:text-foreground transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setSelected((selected - 1 + galleryImages.length) % galleryImages.length);
            }}
          >
            ‹
          </button>
          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 font-mono text-2xl text-muted-foreground hover:text-foreground transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setSelected((selected + 1) % galleryImages.length);
            }}
          >
            ›
          </button>
          <span className="absolute bottom-6 font-mono text-xs text-muted-foreground tracking-wider">
            [ {String(selected + 1).padStart(2, '0')} / {String(galleryImages.length).padStart(2, '0')} ]
          </span>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
