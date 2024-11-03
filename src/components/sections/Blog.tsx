'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionTitle } from '../ui/section-title';
import { Card } from '../ui/card';
import { Calendar, Clock, ArrowRight, Tag, ChevronRight, BookOpen } from 'lucide-react';
import { useRef, useState } from 'react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  imageUrl: string;
  tags: string[];
  category?: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Les meilleures pratiques React en 2024',
    excerpt: 'Découvrez les dernières tendances et meilleures pratiques pour développer des applications React modernes et performantes.',
    date: '15 Oct 2024',
    readTime: '5 min',
    imageUrl: '/api/placeholder/800/400',
    tags: ['React', 'JavaScript', 'Web Development'],
    category: 'Frontend'
  },
  {
    id: '2',
    title: 'Introduction à Tailwind CSS',
    excerpt: 'Un guide complet pour débuter avec Tailwind CSS et créer des interfaces utilisateur modernes.',
    date: '12 Oct 2024',
    readTime: '4 min',
    imageUrl: '/api/placeholder/800/400',
    tags: ['CSS', 'Tailwind', 'Design'],
    category: 'CSS'
  },
  {
    id: '3',
    title: "L'importance de l'accessibilité web",
    excerpt: 'Comment rendre vos applications web accessibles à tous les utilisateurs.',
    date: '10 Oct 2024',
    readTime: '6 min',
    imageUrl: '/api/placeholder/800/400',
    tags: ['Accessibilité', 'Web', 'UX'],
    category: 'UX/UI'
  }
];

const BlogCard = ({ post, index }: { post: BlogPost; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <Card className="h-full overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent backdrop-blur-sm border-0 shadow-none hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-700">
        <div className="relative h-56 overflow-hidden rounded-t-lg">
          <motion.img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.7 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {post.category && (
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white border border-white/10 backdrop-blur-md">
              {post.category}
            </span>
          )}
        </div>

        <div className="p-6 space-y-4">
          <motion.h3
            className="text-2xl font-bold text-white"
          >
            {post.title}
          </motion.h3>

          <motion.p
            className="text-gray-400 line-clamp-2 font-light"
          >
            {post.excerpt}
          </motion.p>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 text-white/70 text-xs backdrop-blur-sm"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </motion.span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="font-light">{post.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="font-light">{post.readTime}</span>
              </div>
            </div>

            <motion.a
              href={`/blog/${post.id}`}
              whileHover={{ x: 5 }}
              className="inline-flex items-center gap-1 text-white/70 text-sm hover:text-white transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Lire
              <ChevronRight className="w-3 h-3" />
            </motion.a>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const FeaturedPost = ({ post }: { post: BlogPost }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group col-span-full mb-8"
  >
    <Card className="overflow-hidden bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm border-0 shadow-none hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-700">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative h-80 md:h-full overflow-hidden">
          <motion.img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7 }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

          {post.category && (
            <span className="absolute top-6 left-6 px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white border border-white/10 backdrop-blur-md">
              {post.category}
            </span>
          )}
        </div>

        <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {post.title}
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed font-light">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="font-light">{post.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="font-light">{post.readTime}</span>
            </div>
          </div>

          <motion.a
            href={`/blog/${post.id}`}
            whileHover={{ x: 5 }}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors group w-fit"
          >
            <BookOpen className="w-5 h-5" />
            Lire l'article
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>
      </div>
    </Card>
  </motion.div>
);

export default function Blog() {
  const [featuredPost, ...otherPosts] = BLOG_POSTS;

  return (
    <section id="blog" className="py-20 relative overflow-hidden">
      {/* Fond avec des cercles lumineux flous et mobiles */}
      <div className="absolute inset-0">
        <motion.div 
          animate={{ 
            x: [0, 100, 0], 
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }} 
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "linear" 
          }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full filter blur-[100px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0], 
            y: [0, -50, 0],
            scale: [1, 1.1, 1]
          }} 
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            ease: "linear" 
          }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-500/5 rounded-full filter blur-[100px]" 
        />
        <div className="absolute inset-0 bg-noise opacity-[0.015]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Blog" 
          subtitle="Découvrez mes derniers articles sur le développement web, les technologies front-end et les bonnes pratiques." 
        />

        <div className="grid grid-cols-1 gap-8">
          <FeaturedPost post={featuredPost} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="/blog"
            className="group inline-flex items-center gap-2 px-8 py-4 text-white/80 hover:text-white transition-colors"
          >
            <span className="relative font-medium">
              Voir tous les articles
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}