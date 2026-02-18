import { Sun, Moon } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  onToggle: (e: React.MouseEvent) => void;
}

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#experience' },
  { label: 'Project', href: '#skills' },
  { label: 'Contact', href: '#terminal' },
];

const Navbar = ({ isDarkMode, onToggle }: NavbarProps) => (
  <nav className="bg-background/90 backdrop-blur-sm border-b border-primary/20 transition-colors duration-1000">
    <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
      {/* Left nav links */}
      <div className="hidden md:flex items-center gap-10">
        {navLinks.slice(0, 2).map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="font-mono text-sm font-semibold tracking-widest text-foreground/80 hover:text-primary transition-all duration-1000 uppercase"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Center — Logo + Name */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-md bg-primary/20 border border-primary/40 flex items-center justify-center transition-colors duration-1000">
          <span className="font-mono font-bold text-sm text-primary transition-colors duration-1000">JC</span>
        </div>
        <div className="flex flex-col">
          <span className="font-mono font-bold text-sm tracking-[0.2em] text-foreground uppercase leading-tight transition-colors duration-1000">
            John Michael Corpuz
          </span>
          <span className="font-mono text-[10px] tracking-[0.3em] text-primary/70 uppercase leading-tight transition-colors duration-1000">
            Portfolio &bull; 2026
          </span>
        </div>
      </div>

      {/* Right nav links + theme toggle */}
      <div className="hidden md:flex items-center gap-10">
        {navLinks.slice(2).map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="font-mono text-sm font-semibold tracking-widest text-foreground/80 hover:text-primary transition-all duration-1000 uppercase"
          >
            {link.label}
          </a>
        ))}
        <button
          onClick={onToggle}
          className="w-9 h-9 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 transition-all duration-1000"
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <Sun size={16} className="text-primary transition-colors duration-1000" />
          ) : (
            <Moon size={16} className="text-primary transition-colors duration-1000" />
          )}
        </button>
      </div>

      {/* Mobile: theme toggle only */}
      <button
        onClick={onToggle}
        className="md:hidden w-9 h-9 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center hover:bg-primary/20 transition-all duration-1000"
        aria-label="Toggle theme"
      >
        {isDarkMode ? (
          <Sun size={16} className="text-primary" />
        ) : (
          <Moon size={16} className="text-primary" />
        )}
      </button>
    </div>
  </nav>
);

export default Navbar;
