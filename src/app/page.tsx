// src/app/page.tsx
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { LoadingScreen } from '@/components/LoadingScreen';

// Lazy loading des sections
const Navbar = dynamic(() => import('@/components/Navbar'), {
  loading: () => <div className="h-20" /> // Placeholder pendant le chargement
});

const Hero = dynamic(() => import('@/components/sections/Hero'));
const About = dynamic(() => import('@/components/sections/About'));
const Skills = dynamic(() => import('@/components/sections/Skills'));
const Projects = dynamic(() => import('@/components/sections/Projects'));
const Blog = dynamic(() => import('@/components/sections/Blog'));
const Contact = dynamic(() => import('@/components/sections/Contact'));
const Footer = dynamic(() => import('@/components/Footer'));

export default function Home() {
  return (
    <main>
      <Navbar />
      <Suspense fallback={<LoadingScreen />}>
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Blog />
        <Contact />
        <Footer />
      </Suspense>
    </main>
  );
}