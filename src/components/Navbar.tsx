"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Accueil", href: "#home" },
  { name: "À propos", href: "#about" },
  { name: "Compétences", href: "#skills" },
  { name: "Projets", href: "#projects" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

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
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hasScrolled, setHasScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Amélioration des animations du logo
  const logoOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const logoScale = useTransform(scrollY, [0, 100], [0.8, 1]);
  const logoTranslateY = useTransform(scrollY, [0, 100], [20, 0]);
  
  // Animation du fond de la navbar améliorée
  const navbarBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(17, 24, 39, 0)", "rgba(17, 24, 39, 0.9)"]
  );

  const navbarBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(8px)"]
  );

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

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const navbarHeight = 64;
      const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      style={{ backgroundColor: navbarBackground }}
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        hasScrolled ? "backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/5" : ""
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo avec animations améliorées */}
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
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#home");
              }}
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

          {/* Navigation bureau améliorée */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
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

          {/* Bouton menu mobile amélioré */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-violet-500/20 focus:outline-none transition-all duration-300"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </div>

      {/* Navigation mobile améliorée */}
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        className="md:hidden overflow-hidden backdrop-blur-md border-t border-white/10"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-base font-medium transition-all duration-300",
                activeSection === item.href.substring(1)
                  ? "text-white bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-violet-500/20"
                  : "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/10 hover:via-purple-500/10 hover:to-violet-500/10"
              )}
            >
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: activeSection === item.href.substring(1) ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="w-4 h-4 mr-2" />
              </motion.div>
              {item.name}
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}