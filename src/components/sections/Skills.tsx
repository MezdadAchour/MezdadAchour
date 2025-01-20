'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Wrench, Braces, LucideIcon } from 'lucide-react';

interface Skill {
  name: string;
}

interface Category {
  title: string;
  icon: LucideIcon;
  color: string;
  description: string;
  skills: string[];
}

interface SkillCardProps {
  skill: string;
}

interface CategorySectionProps {
  category: Category;
}

const skillCategories: Category[] = [
  {
    title: "Front-end",
    icon: Code2,
    color: "from-blue-500/20 to-cyan-500/20",
    description: "Création d'interfaces utilisateur modernes",
    skills: [
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "CSS/SCSS",
      "Tailwind CSS"
    ]
  },
  {
    title: "Back-end",
    icon: Braces,
    color: "from-emerald-500/20 to-green-500/20",
    description: "APIs et bases de données",
    skills: [
      "Node.js",
      "Express",
      "MongoDB",
      "PostgreSQL",
      "REST API",
      "GraphQL"
    ]
  },
  {
    title: "Outils",
    icon: Wrench,
    color: "from-orange-500/20 to-amber-500/20",
    description: "Développement et design",
    skills: [
      "Git/GitHub",
      "Figma"
    ]
  }
];

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.02 }}
    className="group relative"
  >
    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative h-full px-6 py-4 rounded-xl bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 transition-colors duration-300">
      <div className="flex items-center justify-between">
        <span className="text-gray-200 font-medium">{skill}</span>
        <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  </motion.div>
);

const CategorySection: React.FC<CategorySectionProps> = ({ category }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="mb-16"
  >
    <div className="relative flex items-center gap-4 mb-8 group">
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        className={`p-3 rounded-xl bg-gradient-to-r ${category.color} backdrop-blur-md`}
      >
        <category.icon className="w-5 h-5 text-white" />
      </motion.div>
      <div>
        <h3 className="text-xl font-medium text-white">{category.title}</h3>
        <p className="text-gray-400 mt-1">{category.description}</p>
      </div>
      <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-gray-800/0 via-gray-800/5 to-gray-800/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {category.skills.map((skill: string) => (
        <SkillCard 
          key={skill} 
          skill={skill}
        />
      ))}
    </div>
  </motion.div>
);

const Skills: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gray-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-[0.03]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">
            Technologies
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="h-px w-24 mt-4 bg-gradient-to-r from-blue-500 to-purple-500"
          />
        </motion.div>

        <div>
          {skillCategories.map((category) => (
            <CategorySection key={category.title} category={category} />
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl opacity-30 mix-blend-soft-light pointer-events-none" />
    </section>
  );
};

export default Skills;