'use client';

import React, { useEffect } from 'react';
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
        opacity: 0.15,
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

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { scrollY } = useScroll();
  const controls = useAnimation();

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const nameOpacity = useTransform(scrollY, [0, 100], [1, 0]);
  const nameScale = useTransform(scrollY, [0, 100], [1, 0.8]);
  const nameTranslateY = useTransform(scrollY, [0, 100], [0, -50]);

  const light1X = useTransform(x, [0, 1000], [-50, 50]);
  const light1Y = useTransform(y, [0, 1000], [-50, 50]);
  const light2X = useTransform(x, [0, 1000], [50, -50]);
  const light2Y = useTransform(y, [0, 1000], [50, -50]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const normalizedX = (clientX / innerWidth) * 1000;
      const normalizedY = (clientY / innerHeight) * 1000;
      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  const socialLinks = [
    { icon: <Github className="w-6 h-6" />, href: "https://github.com/MezdadAchour", label: "GitHub" },
    { icon: <Linkedin className="w-6 h-6" />, href: "https://www.linkedin.com/in/achour-mezdad-b04526197/", label: "LinkedIn" },
    { icon: <Mail className="w-6 h-6" />, href: "mailto:mezdad.achour@hotmail.fr", label: "Email" }
  ];

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0F]"
    >
      {/* Fond amélioré */}
      <div className="absolute inset-0">
        {/* Grille plus subtile */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(0deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>
        
        {/* Lumières d'ambiance améliorées */}
        <motion.div
          style={{ x: light1X, y: light1Y }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-[100px]"
        />
        <motion.div
          style={{ x: light2X, y: light2Y }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-[100px]"
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-950/30 border border-blue-800/30 mb-8 group hover:border-blue-700/50 transition-colors duration-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-sm text-blue-200 group-hover:text-blue-100 transition-colors duration-300">
              Disponible pour des projets
            </span>
            <Sparkles className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
          </motion.div>

          {/* Titre principal */}
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
                className="block text-blue-100 mb-4"
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400">
                  Achour Mezdad
                </span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 origin-left"
                />
              </motion.span>
            </motion.h1>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl text-blue-200/80 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            Développeur web passionné par des designs élégants et performants pour des expériences web modernes et immersives
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
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative text-white font-medium">
                Voir mes projets
              </span>
              <ArrowRight className="relative w-5 h-5 text-white transition-transform group-hover:translate-x-1" />
            </motion.a>
            
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-950/30 border border-blue-800/30 text-blue-100 font-medium hover:bg-blue-900/30 hover:border-blue-700/50 transition-all"
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
                className="group p-3 rounded-full border border-blue-800/30 hover:border-blue-500 bg-blue-950/30 transition-all duration-300"
                aria-label={link.label}
              >
                <div className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                  {link.icon}
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Éléments flottants */}
      <FloatingIcon 
        icon={<Code2 className="text-blue-500/50" size={48} />} 
        className="absolute top-1/4 left-10" 
        delay={0.5}
      />
      <FloatingIcon 
        icon={<Globe className="text-indigo-500/50" size={48} />} 
        className="absolute bottom-1/4 right-10" 
        delay={0.8}
      />
    </section>
  );
}