// src/app/blog/[slug]/page.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';

// Cette interface peut être déplacée dans un fichier types.ts séparé
interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
  };
  tags: string[];
  imageUrl: string;
}

// Ces données peuvent être déplacées dans un fichier data.ts séparé
const BLOG_POSTS: Record<string, BlogPost> = {
  'les-meilleures-pratiques-react-2024': {
    id: '1',
    title: 'Les meilleures pratiques React en 2024',
    content: `
    # Les meilleures pratiques React en 2024

    React continue d'évoluer et avec lui les meilleures pratiques pour développer des applications modernes et performantes. Dans cet article, nous allons explorer les principales approches recommandées pour 2024.

    ## 1. Utilisation des Hooks

    Les Hooks sont devenus la norme pour la gestion de l'état et des effets dans React. Voici quelques bonnes pratiques :

    - Préférez useCallback pour les fonctions passées comme props
    - Utilisez useMemo pour les calculs coûteux
    - Créez des hooks personnalisés pour la logique réutilisable

    ## 2. Performance et optimisation

    La performance est cruciale pour une bonne expérience utilisateur :

    - Utilisez React.memo judicieusement
    - Implémentez le code splitting avec React.lazy
    - Optimisez les rendus avec useCallback et useMemo

    ## 3. Architecture et organisation

    Une bonne architecture est essentielle pour la maintenabilité :

    - Adoptez une structure de dossiers claire et cohérente
    - Séparez la logique métier des composants UI
    - Utilisez des patterns comme le Container/Presenter
    `,
    date: '15 Oct 2024',
    readTime: '5 min',
    author: {
      name: 'Achour Mezdad',
      avatar: '/api/placeholder/40/40'
    },
    tags: ['React', 'JavaScript', 'Web Development'],
    imageUrl: '/api/placeholder/1200/600'
  }
  // Ajoutez d'autres articles ici
};

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug as string;
  const post = BLOG_POSTS[slug];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Article non trouvé</h1>
          <Link 
            href="/blog" 
            className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux articles
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link 
          href="/blog" 
          className="text-gray-400 hover:text-white inline-flex items-center gap-2 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux articles
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
          
          <div className="flex items-center gap-6 text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <img 
                src={post.author.avatar} 
                alt={post.author.name}
                className="w-10 h-10 rounded-full"
              />
              <span>{post.author.name}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-xl"
          />
        </header>

        <div className="prose prose-invert max-w-none">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        <footer className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-wrap gap-4 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-gray-400">Partager :</span>
              <button className="text-gray-400 hover:text-white">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-white">
                <Linkedin className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-white">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </footer>
      </motion.div>
    </article>
  );
}