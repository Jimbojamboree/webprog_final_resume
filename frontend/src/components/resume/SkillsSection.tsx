import SectionHeader from './SectionHeader';

const skills = [
  { name: 'React', level: 'Advanced' },
  { name: 'TypeScript', level: 'Advanced' },
  { name: 'JavaScript', level: 'Advanced' },
  { name: 'HTML / CSS', level: 'Advanced' },
  { name: 'Tailwind CSS', level: 'Advanced' },
  { name: 'Node.js', level: 'Intermediate' },
  { name: 'Python', level: 'Intermediate' },
  { name: 'Git', level: 'Advanced' },
  { name: 'Figma', level: 'Intermediate' },
  { name: 'SQL', level: 'Intermediate' },
];

interface SkillsSectionProps {
  className?: string;
}

const SkillsSection = ({ className = "" }: SkillsSectionProps) => (
  <section id="skills" className={`py-24 ${className}`}>
    <div className="px-6 max-w-4xl mx-auto">
      <SectionHeader number="02" title="Skills" />

      <div className="flex flex-wrap gap-4">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="px-5 py-3 border border-border rounded-lg bg-card flex items-center gap-3 hover:border-primary/40 transition-colors"
          >
            <span className="font-semibold text-foreground">{skill.name}</span>
            <span className="text-xs text-muted-foreground">{skill.level}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
