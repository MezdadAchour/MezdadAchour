'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Wrench, Braces, Terminal, Star, CloudCog, LucideIcon } from 'lucide-react';

interface Skill {
  name: string;
  level: 'Expert' | 'Avancé';
  icon: LucideIcon;
}

interface SkillCategory {
  title: string;
  icon: LucideIcon;
  color: string;
  description: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Développement Front-end",
    icon: Code2,
    color: "from-blue-600 to-cyan-500",
    description: "Maîtrise des technologies web modernes pour créer des interfaces utilisateur interactives et performantes.",
    skills: [
      { name: "React", level: "Expert", icon: Braces },
      { name: "JavaScript", level: "Expert", icon: Terminal },
      { name: "TypeScript", level: "Avancé", icon: Terminal },
      { name: "CSS/SCSS", level: "Expert", icon: Code2 },
      { name: "Tailwind CSS", level: "Avancé", icon: Wrench },
      { name: "Responsive Design", level: "Expert", icon: CloudCog }
    ]
  },
  {
    title: "Développement Back-end",
    icon: Braces,
    color: "from-green-600 to-lime-500", 
    description: "Maîtrise des langages et frameworks pour construire des API robustes et évolutives.",
    skills: [
      { name: "Node.js", level: "Expert", icon: Terminal },
      { name: "Express", level: "Expert", icon: Braces },
      { name: "MongoDB", level: "Avancé", icon: CloudCog },
      { name: "PostgreSQL", level: "Avancé", icon: CloudCog },
      { name: "REST API", level: "Expert", icon: Braces },
      { name: "GraphQL", level: "Avancé", icon: Braces }
    ]
  },
  {
    title: "Outils et méthodologies",
    icon: Wrench,
    color: "from-orange-600 to-amber-500",
    description: "Utilisation efficace des outils et des méthodologies pour une gestion de projet optimale.",
    skills: [
      { name: "Git/GitHub", level: "Expert", icon: Wrench },
      { name: "Docker", level: "Avancé", icon: CloudCog },
      { name: "Agile/Scrum", level: "Expert", icon: Wrench },
      { name: "Figma", level: "Expert", icon: Wrench },
      { name: "CI/CD", level: "Avancé", icon: CloudCog },
      { name: "AWS/GCP", level: "Avancé", icon: CloudCog }
    ]
  }
];

interface SkillCardProps {
  name: string;
  level: 'Expert' | 'Avancé';
  delay?: number;
  icon: LucideIcon;
}

const SkillCard: React.FC<SkillCardProps> = ({ name, level, delay = 0, icon: SkillIcon }) => {
  const levelColors: Record<'Expert' | 'Avancé', string> = {
    Expert: "text-emerald-400",
    Avancé: "text-blue-400"
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className="relative group sm:col-span-2 md:col-span-1"
    >
      <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-75 blur-lg transition-all duration-500 group-hover:duration-200 animate-tilt"></div>
      
      <div className="relative h-full bg-gray-900 rounded-lg p-6 flex flex-col transform transition-all duration-300 group-hover:scale-[1.02] group-hover:-translate-y-1 border border-gray-800 group-hover:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 rounded-lg bg-gray-800 group-hover:bg-gray-750 transition-colors duration-300">
            <SkillIcon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${levelColors[level]} bg-gray-800/50`}>
            {level}
          </div>
        </div>
        
        <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
          {name}
        </h4>
        
        <div className="flex items-center mt-auto space-x-1">
          {[...Array(level === "Expert" ? 5 : 4)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                level === "Expert" 
                  ? "text-emerald-500/40 group-hover:text-emerald-400" 
                  : "text-blue-500/40 group-hover:text-blue-400"
              } transition-colors duration-300`}
              fill="currentColor"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

interface CategorySectionProps {
  category: SkillCategory;
  index: number;
}

const CategorySection: React.FC<CategorySectionProps> = ({ category, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.2 }}
    className="relative"
  >
    <div className="mb-12">
      <div className="flex items-center mb-6">
        <div className={`p-4 rounded-xl bg-gradient-to-r ${category.color} shadow-lg`}>
          <category.icon className="w-6 h-6 text-white" />
        </div>
        <div className="ml-4">
          <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
          <p className="text-gray-400 text-sm">{category.description}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {category.skills.map((skill, skillIndex) => (
          <SkillCard
            key={skill.name}
            {...skill}
            delay={index * 0.1 + skillIndex * 0.1}
            icon={skill.icon || category.icon}
          />
        ))}
      </div>
    </div>
  </motion.div>
);

const BackgroundDecorations: React.FC = () => {
  // Décorations d'arrière-plan
  return null;
};

const FloatingIcons: React.FC = () => {
  // Icônes flottantes
  return null;
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <BackgroundDecorations />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400">
              Mes compétences
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Technologies et outils que je maîtrise pour créer des expériences web exceptionnelles
          </p>
          
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-600"
          />
        </motion.div>

        <div className="space-y-20">
          {skillCategories.map((category, index) => (
            <CategorySection key={category.title} category={category} index={index} />
          ))}
        </div>

        <FloatingIcons />
      </div>
    </section>
  );
};

export default Skills;