'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Code, 
  Github,
  Globe,
  X,
  ChevronRight,
  Sparkles,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface Technology {
  name: string;
  color?: string;
}

interface Project {
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  technologies: Technology[];
  image: string;
  demoUrl: string;
  githubUrl: string;
  gradient: string;
}

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const projects: Project[] = [
  {
    title: "FitTrack",
    shortDescription: "Application web de suivi fitness avec authentification et tableau de bord personnalisé",
    fullDescription: "FitTrack est une application web de suivi de fitness développée avec React et Firebase. Elle offre aux utilisateurs une plateforme pour gérer leurs objectifs de remise en forme et suivre leurs progrès à travers un tableau de bord personnalisé.",
    features: [
      "Authentification sécurisée",
      "Tableau de bord personnalisé",
      "Gestion des objectifs",
      "Suivi des progrès",
      "Profil utilisateur",
      "Base de données temps réel"
    ],
    technologies: [
      { name: "React.js" },
      { name: "Firebase" },
      { name: "Context API" },
      { name: "React Router" },
      { name: "Tailwind CSS" }
    ],
    image: "/images/fittrack.png",
    demoUrl: "https://fittrack-m.netlify.app/",
    githubUrl: "https://github.com/MezdadAchour/fittrack.git",
    gradient: "from-emerald-400 via-teal-500 to-cyan-600"
  },
  {
    title: "EDAuto",
    shortDescription: "Site web professionnel pour un atelier d'électricité automobile avec système de gestion",
    fullDescription: "Plateforme complète pour un atelier d'électricité automobile incluant une vitrine des services, un système de rendez-vous en ligne et un tableau de bord administrateur pour la gestion des commandes.",
    features: [
      "Interface responsive",
      "Système de rendez-vous",
      "Gestion des commandes",
      "Espace client",
      "Tableau de bord admin",
      "Catalogue de produits"
    ],
    technologies: [
      { name: "HTML5" },
      { name: "CSS" },
      { name: "JavaScript" },
      { name: "Bootstrap" },
      { name: "PHP" },
      { name: "MySQL" }
    ],
    image: "/images/EDAuto.png",
    demoUrl: "https://edauto.netlify.app/",
    githubUrl: "https://github.com/MezdadAchour/EDA.git",
    gradient: "from-purple-400 via-fuchsia-500 to-pink-600"
  },
  {
    title: "Sigma Rédaction",
    shortDescription: "Site web professionnel de services rédactionnels avec CMS personnalisé",
    fullDescription: "Développement d'un site web professionnel pour une agence de rédaction web, incluant un système de gestion de contenu personnalisé et un panneau d'administration complet.",
    features: [
      "Interface moderne responsive",
      "Système d'authentification",
      "Panneau d'administration",
      "Gestion de contenu",
      "API RESTful",
      "Optimisation SEO"
    ],
    technologies: [
      { name: "React.js" },
      { name: "Node.js" },
      { name: "MongoDB" },
      { name: "Express.js" },
      { name: "JWT" },
      { name: "Tailwind CSS" }
    ],
    image: "/images/sigmaredaction.png",
    demoUrl: "https://sigma-redaction.netlify.app/",
    githubUrl: "https://github.com/MezdadAchour/sigmaredactionnew.git",
    gradient: "from-blue-400 via-indigo-500 to-violet-600"
  }
];

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-3xl max-h-[85vh] bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
      >
        {/* En-tête fixe */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-4 bg-gray-900/90 backdrop-blur border-b border-white/10">
          <h2 className="text-xl font-bold text-white">{project.title}</h2>
          <div className="flex items-center gap-3">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium hover:from-blue-600 hover:to-indigo-700 transition-all"
            >
              <Globe className="w-4 h-4" />
              <span>Site</span>
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-all border border-white/20"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Zone de scroll personnalisée avec ScrollArea */}
        <ScrollArea className="h-[calc(85vh-4rem)]">
          <div className="relative h-48 md:h-64">
            <Image 
              src={project.image} 
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
          </div>

          <div className="px-6 md:px-8 py-6 space-y-8">
            <p className="text-gray-300 leading-relaxed">
              {project.fullDescription}
            </p>

            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  Fonctionnalités
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.features.map((feature, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Code className="w-4 h-4 text-blue-400" />
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 rounded-full bg-white/10 text-gray-300 text-sm hover:bg-white/20 transition-colors"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </motion.div>
    </motion.div>
  );
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="group cursor-pointer h-full"
    onClick={onClick}
  >
    <Card className="relative flex flex-col h-[450px] bg-gradient-to-br from-gray-900 to-gray-800 border-white/5">
      <div className="relative h-52 overflow-hidden">
        <Image 
          src={project.image} 
          alt={project.title}
          fill
          className="object-cover transform group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>
      
      <div className="relative flex flex-col flex-grow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-400 transition-all">
            {project.title}
          </h3>
          <motion.div
            whileHover={{ rotate: 45 }}
            className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors"
          >
            <ArrowRight className="w-4 h-4 text-white" />
          </motion.div>
        </div>
        
        <p className="text-gray-400 flex-grow line-clamp-4">
          {project.shortDescription}
        </p>

        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-300"
            >
              {tech.name}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-300">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>
    </Card>
  </motion.div>
);

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[#0A0F1C]">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5" />
        <div className="absolute inset-0 backdrop-blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur mb-6">
            <Code className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-200">Portfolio</span>
            <Sparkles className="w-4 h-4 text-blue-400" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400">
              Mes Réalisations
            </span>
          </h2>
          
          <p className="text-blue-200/80 max-w-2xl mx-auto">
            Découvrez mes projets les plus récents, mettant en avant mes compétences 
            en développement d&apos;applications web et mobiles.
          </p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="mt-4 h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-600"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </motion.div>

        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              isOpen={!!selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;

