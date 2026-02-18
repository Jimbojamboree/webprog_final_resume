import { Linkedin, ChevronDown } from 'lucide-react';

const HeroSection = () => (
  <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
    {/* Grid pattern overlay */}
    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage:
          'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }}
    />

    <div className="relative z-10 text-center max-w-4xl">
      <p className="font-mono text-sm tracking-[0.3em] text-muted-foreground mb-8 uppercase">
        Portfolio / 2026
      </p>

      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-8 text-foreground">
        John Michael
        <br />
        Corpuz
      </h1>

      <p className="font-mono text-sm text-muted-foreground max-w-lg mx-auto mb-2 leading-relaxed">
        Building digital experiences at the intersection of function and form.
      </p>
      <p className="font-mono text-sm text-muted-foreground mb-10">
        Based in Las Piñas, NCR.
      </p>

      <a
        href="#"
        className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-md text-sm text-foreground hover:bg-secondary transition-colors font-mono"
      >
        <Linkedin size={16} />
        LinkedIn
      </a>
    </div>

    <div className="absolute bottom-12 flex flex-col items-center gap-2 text-muted-foreground">
      <span className="font-mono text-xs tracking-[0.3em]">SCROLL</span>
      <ChevronDown size={16} className="animate-bounce" />
    </div>
  </section>
);

export default HeroSection;
