// src/components/ui/card.tsx
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<'div'> {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <motion.div
      className={cn(
        'glass p-6 hover:bg-white/15 transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
