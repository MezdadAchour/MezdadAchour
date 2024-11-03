"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Types
interface NavItem {
  name: string;
  href: string;
}

// Configuration
const navItems: NavItem[] = [
  { name: "Accueil", href: "#home" },
  { name: "À propos", href: "#about" },
  { name: "Compétences", href: "#skills" },
  { name: "Projets", href: "#projects" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

// Animations
const menuVariants = {
  open: {
    opacity: 1,
    height: "auto",
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  closed: {
    opacity: 0,
    height: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
};

const logoVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

export default function Navbar() {
  // États
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hasScrolled, setHasScrolled] = useState(false);
  
  // Hooks de scroll
  const { scrollY } = useScroll();

  // Animations de la navbar
  const logoOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const logoScale = useTransform(scrollY, [0, 100], [0.8, 1]);
  const logoTranslateY = useTransform(scrollY, [0, 100], [20, 0]);
  const navbarBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(17, 24, 39, 0)", "rgba(17, 24, 39, 0.9)"]
  );

  // Fonction de scroll personnalisée optimisée
  const smoothScroll = useCallback((targetPosition: number) => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start: number | null = null;

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);

      const ease = (t: number) => t < 0.5 
        ? 4 * t * t * t 
        : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

      window.scrollTo(0, startPosition + (distance * ease(progress)));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }, []);

  // Gestionnaire de navigation optimisé
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const navbarHeight = document.querySelector('nav')?.offsetHeight || 64;
      const targetPosition = element.offsetTop - navbarHeight;
      
      // Si le menu mobile est ouvert, le fermer de manière asynchrone
      if (isOpen) {
        setIsOpen(false);
        // Démarrer le scroll immédiatement
        smoothScroll(targetPosition);
      } else {
        // Si le menu n'est pas ouvert, scroll immédiatement
        smoothScroll(targetPosition);
      }
    }
  }, [smoothScroll, isOpen]);

  // Détection de la section active
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);

      const sections = navItems.map(item => item.href.substring(1));
      let currentSection = sections[0];
      let minDistance = Infinity;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const distance = Math.abs(element.getBoundingClientRect().top);
          if (distance < minDistance) {
            minDistance = distance;
            currentSection = section;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      style={{ backgroundColor: navbarBackground }}
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        hasScrolled ? "backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/5" : ""
      )}
    >
      {/* Header de la navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            style={{ 
              opacity: logoOpacity,
              y: logoTranslateY,
              scale: logoScale,
            }}
            variants={logoVariants}
            whileHover="hover"
            className="relative"
          >
            <Link 
              href="#home"
              className="text-xl font-bold relative group flex items-center gap-2"
              onClick={(e) => handleNavClick(e, "#home")}
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400 bg-clip-text text-transparent hover:from-blue-300 hover:via-purple-300 hover:to-violet-300 transition-all duration-300">
                Achour Mezdad
              </span>
              <motion.div 
                className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>

          {/* Navigation desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="relative group px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300"
                >
                  <span className="relative z-10">{item.name}</span>
                  <motion.span 
                    className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-violet-500/0"
                    whileHover={{
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span 
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400"
                    initial={{ width: activeSection === item.href.substring(1) ? "100%" : "0%" }}
                    animate={{ width: activeSection === item.href.substring(1) ? "100%" : "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Bouton menu mobile */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-violet-500/20 focus:outline-none transition-all duration-300"
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </div>

      {/* Menu mobile */}
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        className="md:hidden overflow-hidden backdrop-blur-md border-t border-white/10"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={(e) => handleNavClick(e, item.href)}
              className={cn(
                "w-full flex items-center px-3 py-2 rounded-md text-base font-medium transition-all duration-300",
                activeSection === item.href.substring(1)
                  ? "text-white bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-violet-500/20"
                  : "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/10 hover:via-purple-500/10 hover:to-violet-500/10"
              )}
              aria-current={activeSection === item.href.substring(1) ? "page" : undefined}
            >
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: activeSection === item.href.substring(1) ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="w-4 h-4 mr-2" />
              </motion.div>
              {item.name}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}