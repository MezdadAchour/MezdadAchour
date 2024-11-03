// src/components/ui/skill-badge.tsx
'use client'
import { motion } from 'framer-motion';

interface SkillBadgeProps {
  name: string;
}

export function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-block px-4 py-2 rounded-full relative overflow-hidden group"
    >
      <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-violet-500/20 group-hover:from-blue-500/30 group-hover:to-violet-500/30 transition-all duration-300"></span>
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),transparent_80%)] transition-opacity duration-300"></span>
      <span className="relative font-medium text-sm text-gray-200 group-hover:text-white transition-colors duration-300">
        {name}
      </span>
    </motion.span>
  );
}