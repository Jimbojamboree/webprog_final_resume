import SectionHeader from './SectionHeader';
import ChromaGrid from '@/components/ui/ChromaGrid';

const galleryItems = [
  {
    image: '/images/img_1.png',
    title: 'Snapshot 01',
    subtitle: 'Captured Moment',
    borderColor: '#6366F1',
    gradient: 'linear-gradient(145deg, #6366F1 0%, #0f0f1a 100%)',
  },
  {
    image: '/images/img_2.png',
    title: 'Snapshot 02',
    subtitle: 'Captured Moment',
    borderColor: '#10B981',
    gradient: 'linear-gradient(165deg, #10B981 0%, #0f0f1a 100%)',
  },
  {
    image: '/images/img_3.png',
    title: 'Snapshot 03',
    subtitle: 'Captured Moment',
    borderColor: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #0f0f1a 100%)',
  },
  {
    image: '/images/img_4.png',
    title: 'Snapshot 04',
    subtitle: 'Captured Moment',
    borderColor: '#EF4444',
    gradient: 'linear-gradient(195deg, #EF4444 0%, #0f0f1a 100%)',
  },
  {
    image: '/images/img_5.png',
    title: 'Snapshot 05',
    subtitle: 'Captured Moment',
    borderColor: '#8B5CF6',
    gradient: 'linear-gradient(225deg, #8B5CF6 0%, #0f0f1a 100%)',
  },
  {
    image: '/images/img_6.png',
    title: 'Snapshot 06',
    subtitle: 'Captured Moment',
    borderColor: '#06B6D4',
    gradient: 'linear-gradient(115deg, #06B6D4 0%, #0f0f1a 100%)',
  },
  {
    image: '/images/img_7.png',
    title: 'Snapshot 07',
    subtitle: 'Captured Moment',
    borderColor: '#EC4899',
    gradient: 'linear-gradient(155deg, #EC4899 0%, #0f0f1a 100%)',
  },
  {
    image: '/images/img_8.png',
    title: 'Snapshot 08',
    subtitle: 'Captured Moment',
    borderColor: '#F97316',
    gradient: 'linear-gradient(175deg, #F97316 0%, #0f0f1a 100%)',
  },
  {
    image: '/images/img_9.png',
    title: 'Snapshot 09',
    subtitle: 'Captured Moment',
    borderColor: '#84CC16',
    gradient: 'linear-gradient(210deg, #84CC16 0%, #0f0f1a 100%)',
  },
];

interface GallerySectionProps {
  className?: string;
}

const GallerySection = ({ className = '' }: GallerySectionProps) => {
  return (
    <section id="gallery" className={`py-24 ${className}`}>
      <div className="px-6 max-w-6xl mx-auto">
        <SectionHeader number="03.5" title="Gallery" />
        <p className="text-muted-foreground mb-10">
          A visual archive — hover to explore.
        </p>
      </div>

      <div style={{ position: 'relative', minHeight: '600px' }}>
        <ChromaGrid
          items={galleryItems}
          radius={320}
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
          columns={3}
        />
      </div>
    </section>
  );
};

export default GallerySection;
