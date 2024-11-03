'use client';
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { GraduationCap, Code, Briefcase, Laptop, LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface TimelineItem {
  icon: LucideIcon;
  title: string;
  place: string;
  date: string;
  description: string;
  category: string;
  color: string;
  details?: string[];
}

const timeline: TimelineItem[] = [
  {
    icon: GraduationCap,
    title: "Master en Automatique et Informatique",
    place: "Université Mouloud Mammeri",
    date: "2014 - 2019",
    description: "Formation approfondie en systèmes automatisés et contrôle industriel",
    category: "Formation",
    color: "from-blue-500 to-indigo-600"
  },
  {
    icon: Briefcase,
    title: "Ingénieur en Automatique",
    place: "MFG",
    date: "6 mois",
    description: "Conception, mise en œuvre et optimisation de systèmes automatisés",
    category: "Expérience",
    color: "from-purple-500 to-pink-600"
  },
  {
    icon: Laptop,
    title: "Responsable Informatique & Développeur Web",
    place: "Entreprise",
    date: "2022 - 2024",
    description: "Gestion du parc informatique, développement de solutions web et création d'applications internes",
    details: [
      "Maintenance du parc informatique et gestion des systèmes",
      "Développement d'un site e-commerce complet",
      "Création d'applications internes de gestion"
    ],
    category: "Expérience",
    color: "from-rose-500 to-red-600"
  },
  {
    icon: GraduationCap,
    title: "Web Development Essentials",
    place: "GOMYCODE",
    date: "2024",
    description: "Formation intensive couvrant les bases du développement web, incluant HTML, CSS, JavaScript, gestion du DOM, intégration Fullstack et contrôle de version avec Git. Acquisition des compétences fondamentales pour construire des interfaces web interactives et modernes.",
    category: "Formation",
    color: "from-cyan-500 to-blue-600"
  },
  {
    icon: GraduationCap,
    title: "Front End Developer - React JS Certified",
    place: "GOMYCODE",
    date: "2024",
    description: "Certification en développement front-end avec React : composants, état, hooks, Redux, TypeScript, et Next.js. Formation axée sur les meilleures pratiques pour créer des applications web modernes.",
    category: "Formation",
    color: "from-emerald-500 to-teal-600"
  },
  {
    icon: Code,
    title: "Développeur Web Freelance",
    place: "Indépendant",
    date: "2024 - Présent",
    description: "Développement de solutions web sur mesure pour divers clients, incluant des sites vitrines et des applications interactives, avec un focus sur l'optimisation, la performance, et le design responsive.",
    category: "Expérience",
    color: "from-violet-500 to-purple-600"
}
];

const containerAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

interface TimelineCardProps {
  item: TimelineItem;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ item }) => {
  return (
    <motion.div
      variants={itemAnimation}
      className="group relative"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div 
        className={`
          absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 
          transition-all duration-500 bg-gradient-to-br ${item.color}
          blur-xl -z-10
        `}
      />
      
      <Card className="h-full p-6 rounded-2xl border-2 border-white/5 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all duration-300">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl bg-gradient-to-br ${item.color} bg-opacity-20`}>
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-white/80 bg-white/5 px-3 py-1 rounded-full">
                {item.category}
              </span>
            </div>
            <span className="text-sm font-medium text-white/60">
              {item.date}
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-400 transition-all duration-300">
              {item.title}
            </h3>
            <p className="text-white/60 font-medium text-sm">
              {item.place}
            </p>
            <p className="text-white/80 text-sm leading-relaxed">
              {item.description}
            </p>

            {item.details && (
              <motion.ul 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 space-y-2"
              >
                {item.details.map((detail: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/50" />
                    {detail}
                  </li>
                ))}
              </motion.ul>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const About: React.FC = () => {
  return (
    <section id="about" className="relative min-h-screen pt-24 pb-16 overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-[#0A0F1C]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 30%),
            radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.08) 0%, transparent 30%)
          `
        }}
      >
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
          <div className="absolute inset-0 backdrop-blur-3xl" />
        </motion.div>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-rose-400 animate-gradient">
              Mon Parcours
            </span>
          </motion.h2>
          <p className="mt-4 text-blue-200/80 max-w-2xl mx-auto">
            Une évolution professionnelle marquée par la passion du développement
            et l&apos;innovation technologique
          </p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-600"
          />
        </motion.div>

        <motion.div
          variants={containerAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {timeline.map((item, index) => (
            <TimelineCard key={index} item={item} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          whileHover={{ scale: 1.02 }}
          className="mt-16 p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 shadow-xl shadow-blue-500/5"
        >
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <motion.h3 
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              Ma Vision
            </motion.h3>
            <p className="text-blue-200 leading-relaxed">
              Passionné par le développement web et fort d&apos;une expérience en automatique,
              je combine expertise technique et créativité pour créer des solutions numériques
              innovantes. Mon approche unique me permet d&apos;apporter une vision globale aux projets,
              en alliant performance technique et expérience utilisateur optimale.
            </p>
            <motion.div 
              className="pt-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm hover:bg-blue-500/20 transition-colors duration-300">
                <Code className="w-4 h-4" />
                Développement Web Moderne
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;