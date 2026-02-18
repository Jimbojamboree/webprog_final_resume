import SectionHeader from './SectionHeader';
import ProfileCard from './ProfileCard';

interface AboutSectionProps {
  className?: string;
}

const AboutSection = ({ className = '' }: AboutSectionProps) => (
  <section id="about" className={`py-24 ${className}`}>
    <div className="px-6 max-w-5xl mx-auto">
      <SectionHeader number="00" title="About Me" />

      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Left: ProfileCard */}
        <div className="md:w-2/5 flex-shrink-0 flex justify-center relative">
          {/* Decorative corner accents */}
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary rounded-tl-sm z-10" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary rounded-br-sm z-10" />
          <ProfileCard
            name="John Michael Corpuz"
            title="Developer"
            handle="Jimbojamboree"
            status="Online"
            contactText="Contact Me"
            avatarUrl="/images/img_1.png"
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={false}
            onContactClick={() => window.location.href = '#terminal'}
            behindGlowColor="rgba(125, 190, 255, 0.67)"
            behindGlowEnabled
            innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
          />
        </div>

        {/* Right: About text */}
        <div className="md:w-3/5">
          <h3 className="font-mono text-sm tracking-[0.3em] text-primary mb-4 uppercase">
            Who I Am
          </h3>
          <p className="text-lg text-foreground/90 leading-relaxed mb-6">
            Hey! I'm <span className="text-primary font-semibold">John Michael Corpuz</span>, a self-taught
            developer from Las Piñas, NCR who genuinely enjoys building stuff for the web.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            I've been coding for about a year now and I'm hooked. I started with curiosity,
            stayed for the thrill of seeing my ideas come to life on screen. Right now I'm
            into React, TypeScript, and making things look and feel good with Tailwind.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            I'm always learning, whether it's picking up a new framework, messing around
            with side projects, or just trying to write cleaner code than yesterday.
          </p>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-6 border-t border-border pt-6">
            <div>
              <span className="block text-2xl font-bold text-primary font-mono">1+</span>
              <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Year Coding</span>
            </div>
            <div>
              <span className="block text-2xl font-bold text-primary font-mono">5+</span>
              <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Projects</span>
            </div>
            <div>
              <span className="block text-2xl font-bold text-primary font-mono">∞</span>
              <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Curiosity</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
