import { useState, useCallback, useRef } from 'react';
import { Sun, Moon } from 'lucide-react';
import HeroSection from '@/components/resume/HeroSection';
import ExperienceSection from '@/components/resume/ExperienceSection';
import SkillsSection from '@/components/resume/SkillsSection';
import HobbiesSection from '@/components/resume/HobbiesSection';
import TerminalSection from '@/components/resume/TerminalSection';
import FooterSection from '@/components/resume/FooterSection';

interface ContentProps {
  isDarkMode: boolean;
  onToggle: (e: React.MouseEvent) => void;
  scrollOffset?: number;
}

const ResumeContent = ({ isDarkMode, onToggle, scrollOffset }: ContentProps) => {
  const style = scrollOffset !== undefined ? { transform: `translateY(-${scrollOffset}px)` } : {};

  return (
    <div style={style}>
      <div className="min-h-screen bg-background text-foreground relative">
        <button
          onClick={onToggle}
          className="fixed top-6 right-6 z-40 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors"
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <Sun size={18} className="text-foreground" />
          ) : (
            <Moon size={18} className="text-foreground" />
          )}
        </button>

        <HeroSection />
        <ExperienceSection />
        <SkillsSection />
        <HobbiesSection />
        <TerminalSection />
        <FooterSection />
      </div>
    </div>
  );
};

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [ripplePos, setRipplePos] = useState({ x: 0, y: 0 });
  const [transitionScroll, setTransitionScroll] = useState(0);
  const isAnimating = useRef(false);

  const toggleTheme = useCallback((e: React.MouseEvent) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const x = e.clientX;
    const y = e.clientY;
    const currentScroll = window.scrollY;

    setRipplePos({ x, y });
    setTransitionScroll(currentScroll);
    setIsTransitioning(true);

    // Swap theme AFTER animation fully completes — no flicker
    setTimeout(() => {
      setIsDarkMode((prev) => !prev);
      setIsTransitioning(false);
      isAnimating.current = false;
    }, 1000);
  }, []);

  return (
    <>
      {/* LAYER 1: Base — stays in document flow, scroll position preserved */}
      <div className={isDarkMode ? 'theme-dark' : 'theme-light'}>
        <ResumeContent isDarkMode={isDarkMode} onToggle={toggleTheme} />
      </div>

      {/* LAYER 2: Transition overlay — renders TARGET theme, expands from click */}
      {isTransitioning && (
        <div
          className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
          style={{
            animation: 'explode-clip 1s ease-in-out forwards',
          }}
        >
          {/* Target theme content, synced to user's scroll position */}
          <div className={!isDarkMode ? 'theme-dark' : 'theme-light'}>
            <ResumeContent
              isDarkMode={!isDarkMode}
              onToggle={() => {}}
              scrollOffset={transitionScroll}
            />
          </div>

          {/* Glowing wavefront edge */}
          <div
            className="fixed rounded-full pointer-events-none"
            style={{
              top: ripplePos.y,
              left: ripplePos.x,
              transform: 'translate(-50%, -50%)',
              animation: 'explode-wave 1s ease-out forwards',
              borderStyle: 'solid',
              borderColor: !isDarkMode
                ? 'hsla(35, 90%, 55%, 0.25)'
                : 'hsla(220, 70%, 60%, 0.25)',
            }}
          />
        </div>
      )}

      {/* Dynamic keyframes scoped to click position */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes explode-clip {
              0% { clip-path: circle(0% at ${ripplePos.x}px ${ripplePos.y}px); }
              100% { clip-path: circle(200% at ${ripplePos.x}px ${ripplePos.y}px); }
            }
            @keyframes explode-wave {
              0% { width: 0px; height: 0px; opacity: 1; border-width: 60px; }
              40% { opacity: 1; border-width: 20px; }
              100% { width: 450vmax; height: 450vmax; opacity: 0; border-width: 0px; }
            }
          `,
        }}
      />
    </>
  );
};

export default Index;
