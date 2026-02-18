import { Briefcase, GraduationCap } from 'lucide-react';
import SectionHeader from './SectionHeader';

const experiences = [
  {
    period: '2023 — Present',
    title: 'Emerging Developer',
    description:
      'Building web applications and exploring modern tech stacks. Focused on React, TypeScript, and full-stack development.',
    icon: <Briefcase size={16} />,
  },
  {
    period: '2022 — 2023',
    title: 'Freelance Projects',
    description:
      'Developed websites and digital solutions for local businesses. Gained hands-on experience with real-world client requirements.',
    icon: <Briefcase size={16} />,
  },
  {
    period: '2021 — Present',
    title: 'Computer Science / IT',
    description:
      'Pursuing studies in technology and software engineering. Passionate about system design and clean architecture.',
    icon: <GraduationCap size={16} />,
  },
];

const ExperienceSection = () => (
  <section id="experience" className="py-24 px-6 max-w-4xl mx-auto">
    <SectionHeader number="01" title="Experience" />

    <div className="relative ml-4">
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />

      {experiences.map((exp, i) => (
        <div key={i} className="relative pl-10 pb-16 last:pb-0">
          {/* Dot */}
          <div className="absolute left-0 -translate-x-1/2 w-8 h-8 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground">
            {exp.icon}
          </div>

          <p className="font-mono text-sm text-muted-foreground mb-2">{exp.period}</p>
          <h3 className="text-xl font-bold mb-3 text-foreground">{exp.title}</h3>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">{exp.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default ExperienceSection;
