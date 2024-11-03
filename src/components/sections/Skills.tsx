'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Wrench, Braces, Terminal, Star, CloudCog } from 'lucide-react';

const skillCategories = [
  {
    title: "Frontend",
    icon: Code2,
    color: "from-blue-500 to-cyan-500",
    description: "Technologies pour créer des interfaces modernes et réactives",
    skills: [
      { name: "HTML5", level: "Expert", icon: Code2 },
      { name: "CSS3", level: "Expert", icon: Code2 },
      { name: "JavaScript", level: "Expert", icon: Code2 },
      { name: "TypeScript", level: "Avancé", icon: Code2 },
      { name: "React", level: "Expert", icon: Code2 },
      { name: "Next.js", level: "Avancé", icon: Code2 },
      { name: "Tailwind CSS", level: "Expert", icon: Code2 }
    ]
  },
  {
    title: "Outils & Technologies",
    icon: Wrench,
    color: "from-purple-500 to-pink-500",
    description: "Outils et technologies pour un développement efficace",
    skills: [
      { name: "Git", level: "Expert", icon: CloudCog },
      { name: "GitHub", level: "Avancé", icon: CloudCog },
      { name: "VS Code", level: "Expert", icon: Wrench },
      { name: "npm", level: "Expert", icon: Wrench },
      { name: "Redux", level: "Avancé", icon: Wrench },
      { name: "React Router", level: "Expert", icon: Wrench },
      { name: "Jest", level: "Avancé", icon: Wrench }
    ]
  }
];

const SkillCard = ({ name, level, delay = 0, icon: SkillIcon }) => {
  const levelColors = {
    Expert: "text-emerald-400",
    Avancé: "text-blue-400"
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className="relative group"
    >
      {/* Effet de brillance au hover */}
      <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-75 blur-lg transition-all duration-500 group-hover:duration-200 animate-tilt"></div>
      
      {/* Carte principale */}
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
        
        {/* Indicateur visuel de niveau */}
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

const CategorySection = ({ category, index }) => (
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

const BackgroundDecorations = () => (
  <>
    {/* Motif de fond amélioré */}
    <div className="absolute inset-0 bg-[#020617]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
      
      <div className="absolute inset-0 opacity-[0.07]">
        <pattern
          id="grid"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(30)"
        >
          <path
            d="M0 20h40M20 0v40"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </div>
      
      {/* Effets de lumière améliorés */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full filter blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full filter blur-[120px] animate-pulse" />
    </div>
  </>
);

const FloatingIcons = () => (
  <>
    <motion.div
      animate={{
        y: [0, -20, 0],
        rotate: [0, 10, 0]
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute top-20 right-10 opacity-10"
    >
      <Braces className="w-20 h-20 text-blue-500" />
    </motion.div>
    
    <motion.div
      animate={{
        y: [0, 20, 0],
        rotate: [0, -10, 0]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute bottom-20 left-10 opacity-10"
    >
      <Terminal className="w-20 h-20 text-purple-500" />
    </motion.div>
  </>
);

export default function Skills() {
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
}