import { Sun, Moon } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  onToggle: (e: React.MouseEvent) => void;
}

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Hobbies', href: '#hobbies' },
  { label: 'Terminal', href: '#terminal' },
];

const Navbar = ({ isDarkMode, onToggle }: NavbarProps) => (
  <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      {/* Left nav links */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.slice(0, 2).map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Center — Name */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
          JC
        </div>
        <div className="text-center">
          <span className="font-bold text-sm tracking-wide text-foreground uppercase">
            John Michael Corpuz
          </span>
        </div>
      </div>

      {/* Right nav links + theme toggle */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.slice(2).map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {link.label}
          </a>
        ))}
        <button
          onClick={onToggle}
          className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors"
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <Sun size={16} className="text-foreground" />
          ) : (
            <Moon size={16} className="text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile: theme toggle only */}
      <button
        onClick={onToggle}
        className="md:hidden w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors"
        aria-label="Toggle theme"
      >
        {isDarkMode ? (
          <Sun size={16} className="text-foreground" />
        ) : (
          <Moon size={16} className="text-foreground" />
        )}
      </button>
    </div>
  </nav>
);

export default Navbar;
