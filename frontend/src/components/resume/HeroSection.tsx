import { ChevronDown } from 'lucide-react';
import Shuffle from '@/components/ui/Shuffle';

interface HeroSectionProps {
  introPhase?: 'closed' | 'opening' | 'done';
  isTransition?: boolean;
}

const HeroSection = ({ introPhase = 'done', isTransition = false }: HeroSectionProps) => {
  const showStatic = introPhase === 'closed' || isTransition;
  const opacityClass = introPhase === 'closed' ? 'opacity-0' : 'opacity-100';

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-16">
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-[56] w-full max-w-7xl flex flex-col lg:flex-row items-center lg:items-center justify-between gap-8 pointer-events-none">
        {/* Left: Text content */}
        <div className="text-left max-w-2xl lg:flex-1">
          {showStatic ? (
            <>
              <div className={`font-mono text-sm tracking-[0.3em] text-muted-foreground mb-8 uppercase min-h-[20px] ${opacityClass}`}>
                <p className="shuffle-parent is-ready" style={{ textAlign: 'left' }}>
                  Portfolio / 2026
                </p>
              </div>

              <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-8 text-foreground ${opacityClass}`} style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="shuffle-parent is-ready" style={{ textAlign: 'left' }}>John Michael</div>
                <div className="shuffle-parent is-ready" style={{ textAlign: 'left' }}>Corpuz</div>
              </h1>

              <div className={`font-mono text-sm text-muted-foreground max-w-lg mb-2 leading-relaxed min-h-[40px] ${opacityClass}`}>
                <p className="shuffle-parent is-ready" style={{ textAlign: 'left' }}>
                  Aspiring Full Stack Developer & UI/UX Enthusiast.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="font-mono text-sm tracking-[0.3em] text-muted-foreground mb-8 uppercase min-h-[20px]">
                <Shuffle
                  text="Portfolio / 2026"
                  shuffleDirection="down"
                  duration={1.5}
                  stagger={0.08}
                  shuffleTimes={3}
                  tag="p"
                  textAlign="left"
                />
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-8 text-foreground" style={{ display: 'flex', flexDirection: 'column' }}>
                <Shuffle
                  text="John Michael"
                  shuffleDirection="right"
                  duration={1.8}
                  stagger={0.05}
                  shuffleTimes={4}
                  tag="div"
                  textAlign="left"
                />
                <Shuffle
                  text="Corpuz"
                  shuffleDirection="right"
                  duration={1.8}
                  stagger={0.05}
                  shuffleTimes={4}
                  maxDelay={0.3}
                  tag="div"
                  textAlign="left"
                />
              </h1>

              <div className="font-mono text-sm text-muted-foreground max-w-lg mb-2 leading-relaxed min-h-[40px]">
                <Shuffle
                  text="Aspiring Full Stack Developer & UI/UX Enthusiast."
                  shuffleDirection="up"
                  duration={1.5}
                  stagger={0.04}
                  shuffleTimes={3}
                  tag="p"
                  textAlign="left"
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="absolute bottom-12 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="font-mono text-xs tracking-[0.3em]">SCROLL</span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
