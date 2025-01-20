'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Code, Briefcase, Laptop, LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface TimelineItem {
  icon: LucideIcon;
  title: string;
  place: string;
  date: string;
  category: string;
  color: string;
}

const timeline: TimelineItem[] = [
  {
    icon: GraduationCap,
    title: "Master en Automatique et Informatique",
    place: "Université Mouloud Mammeri",
    date: "2014 - 2019",
    category: "Formation",
    color: "from-blue-500 to-indigo-600"
  },
  {
    icon: Briefcase,
    title: "Ingénieur en Automatique",
    place: "MFG",
    date: "6 mois",
    category: "Expérience",
    color: "from-purple-500 to-pink-600"
  },
  {
    icon: Laptop,
    title: "Responsable Informatique & Développeur Web",
    place: "EDA",
    date: "2022 - 2024",
    category: "Expérience",
    color: "from-rose-500 to-red-600"
  },
  {
    icon: GraduationCap,
    title: "Web Development Essentials",
    place: "GOMYCODE",
    date: "2024",
    category: "Formation",
    color: "from-cyan-500 to-blue-600"
  },
  {
    icon: GraduationCap,
    title: "Front End Developer - React JS Certified",
    place: "GOMYCODE",
    date: "2024",
    category: "Formation",
    color: "from-emerald-500 to-teal-600"
  },
  {
    icon: Code,
    title: "Développeur Web Freelance",
    place: "Indépendant",
    date: "2024 - Présent",
    category: "Expérience",
    color: "from-violet-500 to-purple-600"
  }
];

const TimelineCard: React.FC<{ item: TimelineItem }> = ({ item }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className="group relative"
    >
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 
        transition-all duration-500 bg-gradient-to-br ${item.color} blur-xl -z-10`}
      />
      
      <Card className="h-full p-6 rounded-2xl border-2 border-white/5 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all duration-300">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl bg-gradient-to-br ${item.color}`}>
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

          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-400">
              {item.title}
            </h3>
            <p className="text-white/60 font-medium text-sm mt-1">
              {item.place}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const About: React.FC = () => {
  return (
    <section id="about" className="relative py-20 overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-[#0A0F1C]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-rose-400">
            Mon Parcours
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="mt-4 h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-600"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {timeline.map((item, index) => (
            <TimelineCard key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;