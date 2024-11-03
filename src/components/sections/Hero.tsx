// src/components/Hero.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useTransform, 
  useScroll,
  useAnimation
} from 'framer-motion';
import { 
  ArrowRight, 
  Github, 
  Linkedin, 
  Code2, 
  Globe, 
  Sparkles,
  Mail
} from 'lucide-react';

interface FloatingIconProps {
  icon: React.ReactNode;
  className: string;
  delay?: number;
}

const FloatingIcon: React.FC<FloatingIconProps> = ({ icon, className, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 0.2,
        y: [0, -10, 0],
        rotate: [-5, 5, -5],
      }}
      transition={{
        delay,
        duration: 5,
        repeat: Infinity,
        opacity: { duration: 1, delay }
      }}
      className={className}
    >
      {icon}
    </motion.div>
  );
};

const GradientText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
    {children}
  </span>
);

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { scrollY } = useScroll();
  const controls = useAnimation();

  // Configuration des animations de spring
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Animations basées sur le scroll
  const nameOpacity = useTransform(scrollY, [0, 100], [1, 0]);
  const nameScale = useTransform(scrollY, [0, 100], [1, 0.8]);
  const nameTranslateY = useTransform(scrollY, [0, 100], [0, -50]);

  // Animation des lumières d'ambiance
  const light1X = useTransform(x, [0, 1000], [-100, 100]);
  const light1Y = useTransform(y, [0, 1000], [-100, 100]);
  const light2X = useTransform(x, [0, 1000], [100, -100]);
  const light2Y = useTransform(y, [0, 1000], [100, -100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Normaliser les coordonnées de la souris
      const normalizedX = (clientX / innerWidth) * 1000;
      const normalizedY = (clientY / innerHeight) * 1000;
      
      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
      setMousePosition({ x: normalizedX, y: normalizedY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Animation d'entrée séquentielle
  useEffect(() => {
    const sequence = async () => {
      await controls.start({ opacity: 1, y: 0 });
    };
    sequence();
  }, [controls]);

  const socialLinks = [
    { icon: <Github className="w-6 h-6" />, href: "https://github.com/votre-username", label: "GitHub" },
    { icon: <Linkedin className="w-6 h-6" />, href: "https://linkedin.com/in/votre-profile", label: "LinkedIn" },
    { icon: <Mail className="w-6 h-6" />, href: "mailto:votre@email.com", label: "Email" }
  ];

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Fond animé */}
      <div className="absolute inset-0 bg-gray-950">
        {/* Grille animée */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(56,189,248,0.07)_1px,transparent_1px),linear-gradient(0deg,rgba(56,189,248,0.07)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        </div>
        
        {/* Lumières d'ambiance */}
        <motion.div
          style={{ x: light1X, y: light1Y }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full filter blur-[128px]"
        />
        <motion.div
          style={{ x: light2X, y: light2Y }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/30 rounded-full filter blur-[128px]"
        />
      </div>

      {/* Contenu principal */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Badge de disponibilité */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 mb-8 group hover:border-gray-600 transition-colors duration-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
              Disponible pour des projets
            </span>
            <Sparkles className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
          </motion.div>

          {/* Titre principal avec animation par lettre */}
          <div className="overflow-hidden mb-8">
            <motion.h1 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className="text-5xl sm:text-7xl font-bold tracking-tight"
            >
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="block text-gray-300 mb-4"
              >
                Bonjour, je suis
              </motion.span>
              <motion.span 
                style={{
                  opacity: nameOpacity,
                  scale: nameScale,
                  y: nameTranslateY,
                }}
                className="relative inline-block"
              >
          <GradientText className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400">
              Achour Mezdad
            </span>
          </GradientText>                
          <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 origin-left"
                />
              </motion.span>
            </motion.h1>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            Développeur Front-end React passionné par la création d'expériences web
            modernes et interactives. Spécialisé dans la construction d'interfaces
            utilisateur performantes et accessibles.
          </motion.p>

          {/* Boutons d'action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-4 items-center mb-12"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative text-white font-medium">
                Voir mes projets
              </span>
              <ArrowRight className="relative w-5 h-5 text-white transition-transform group-hover:translate-x-1" />
            </motion.a>
            
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 text-white font-medium hover:bg-gray-800 transition-all"
            >
              <Mail className="w-5 h-5" />
              Me contacter
            </motion.a>
          </motion.div>

          {/* Réseaux sociaux */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex justify-center gap-6"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="group p-3 rounded-full border border-gray-700 hover:border-blue-500 transition-colors duration-300"
                aria-label={link.label}
              >
                <div className="text-gray-400 group-hover:text-blue-400 transition-colors duration-300">
                  {link.icon}
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Éléments flottants */}
      <FloatingIcon 
        icon={<Code2 size={48} />} 
        className="absolute top-1/4 left-10" 
        delay={0.5}
      />
      <FloatingIcon 
        icon={<Globe size={48} />} 
        className="absolute bottom-1/4 right-10" 
        delay={0.8}
      />
    </section>
  );
}