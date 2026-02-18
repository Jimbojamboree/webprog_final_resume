import SectionHeader from './SectionHeader';

interface AboutSectionProps {
  className?: string;
}

const AboutSection = ({ className = '' }: AboutSectionProps) => (
  <section id="about" className={`py-24 ${className}`}>
    <div className="px-6 max-w-5xl mx-auto">
      <SectionHeader number="00" title="About Me" />

      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Left: Image */}
        <div className="md:w-2/5 flex-shrink-0">
          <div className="relative group">
            <div className="absolute -inset-2 bg-primary/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative overflow-hidden rounded-xl border border-border">
              <img
                src="/images/img_1.png"
                alt="John Michael Corpuz"
                className="w-full aspect-[3/4] object-cover"
              />
            </div>
            {/* Decorative corner accents */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary rounded-tl-sm" />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary rounded-br-sm" />
          </div>
        </div>

        {/* Right: About text */}
        <div className="md:w-3/5">
          <h3 className="font-mono text-sm tracking-[0.3em] text-primary mb-4 uppercase">
            Who I Am
          </h3>
          <p className="text-lg text-foreground/90 leading-relaxed mb-6">
            Hi, I'm <span className="text-primary font-semibold">John Michael Corpuz</span> — a passionate
            front-end developer based in Las Piñas, NCR. I love turning ideas into
            interactive, pixel-perfect digital experiences.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            With a strong foundation in React, TypeScript, and modern CSS frameworks,
            I focus on building responsive and accessible web applications. I believe
            great software is built at the intersection of clean code and thoughtful design.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            When I'm not coding, you'll find me exploring new technologies, contributing
            to open-source projects, or leveling up my skills through personal projects
            and experiments.
          </p>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-6 border-t border-border pt-6">
            <div>
              <span className="block text-2xl font-bold text-primary font-mono">3+</span>
              <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Years Coding</span>
            </div>
            <div>
              <span className="block text-2xl font-bold text-primary font-mono">10+</span>
              <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Projects</span>
            </div>
            <div>
              <span className="block text-2xl font-bold text-primary font-mono">5+</span>
              <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Technologies</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
