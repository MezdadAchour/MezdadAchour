// src/data/blog-posts.ts

export interface BlogPost {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    date: string;
    readTime: string;
    imageUrl: string;
    author: {
        name: string;
        avatar: string;
        bio: string;
    };
    tags: string[];
    category?: string;
}

export const BLOG_POSTS: BlogPost[] = [
    {
        id: 'les-meilleures-pratiques-react-2024',
        title: 'Les meilleures pratiques React en 2024',
        excerpt: 'Découvrez les dernières tendances et meilleures pratiques pour développer des applications React modernes et performantes.',
        content: `
  # Les meilleures pratiques React en 2024
  
  React continue d'évoluer rapidement, et avec lui les meilleures pratiques pour développer des applications modernes et performantes. Dans cet article, nous allons explorer les principales approches recommandées pour 2024.
  
  ## 1. Adopter les Server Components
  
  Les Server Components représentent un changement majeur dans la façon dont nous construisons des applications React. Voici pourquoi vous devriez les adopter :
  
  - Réduction significative du JavaScript côté client
  - Meilleure performance de rendu initial
  - Optimisation automatique du bundle
  - Intégration transparente avec le SSR
  
  ### Exemple pratique
  
  \`\`\`tsx
  // app/page.tsx
  export default async function Page() {
    const data = await fetchData() // Exécuté côté serveur
    return <Component data={data} />
  }
  \`\`\`
  
  ## 2. Utilisation stratégique des Hooks
  
  Les Hooks sont maintenant la norme pour la gestion de l'état et des effets dans React. Voici les meilleures pratiques à suivre :
  
  ### Custom Hooks pour la logique réutilisable
  
  \`\`\`tsx
  function useUserStatus(userId: string) {
    const [isOnline, setIsOnline] = useState(false)
    
    useEffect(() => {
      const subscribe = subscribeToUserStatus(userId, setIsOnline)
      return () => subscribe.unsubscribe()
    }, [userId])
    
    return isOnline
  }
  \`\`\`
  
  ### Optimisation des performances
  
  - Utilisez useCallback pour les fonctions passées en props
  - Appliquez useMemo pour les calculs coûteux
  - Évitez les re-rendus inutiles avec memo()
  
  ## 3. Gestion de l'état moderne
  
  L'écosystème de gestion d'état a évolué :
  
  - Zustand pour la gestion d'état globale simple
  - Jotai pour la gestion d'état atomique
  - TanStack Query pour la gestion des données serveur
  
  ## Conclusion
  
  En suivant ces pratiques, vous construirez des applications React plus performantes et maintenables. N'oubliez pas que ces recommandations évoluent avec le framework - restez à l'écoute des mises à jour de l'écosystème React.
      `,
        date: '15 Oct 2024',
        readTime: '8 min',
        imageUrl: '/images/react-trends-2024.png',
        author: {
            name: 'Achour Mezdad',
            avatar: '/images/person.png',
            bio: 'Développeur Frontend passionné par React et l\'écosystème JavaScript moderne.'
        },
        tags: ['React', 'JavaScript', 'Web Development'],
        category: 'Frontend'
    },
    {
        id: 'accessibilite-web-importance',
        title: "L'importance de l'accessibilité web en 2024",
        excerpt: 'Découvrez pourquoi l\'accessibilité web est cruciale et comment la mettre en œuvre dans vos projets modernes.',
        content: `
  # L'importance de l'accessibilité web en 2024
  
  L'accessibilité web n'est plus une option mais une nécessité. Dans cet article, nous explorons pourquoi l'accessibilité est cruciale et comment l'implémenter efficacement.
  
  ## 1. Pourquoi l'accessibilité est importante
  
  L'accessibilité web permet de :
  - Toucher un public plus large
  - Améliorer l'expérience utilisateur pour tous
  - Respecter les normes légales
  - Optimiser le SEO
  
  ## 2. Les principes WCAG 2.2
  
  Les Web Content Accessibility Guidelines (WCAG) définissent les standards :
  
  ### Perceptible
  - Fournir des alternatives textuelles
  - Créer du contenu adaptable
  - Rendre le contenu distinguable
  
  ### Exemple de bonne pratique
  
  \`\`\`tsx
  // Composant image accessible
  function AccessibleImage({ src, alt, caption }) {
    return (
      <figure>
        <img src={src} alt={alt} />
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    )
  }
  \`\`\`
  
  ## 3. Outils et tests
  
  ### Outils recommandés
  - WAVE Web Accessibility Tool
  - axe DevTools
  - Lighthouse
  - Screen readers
  
  ### Tests d'accessibilité
  
  \`\`\`tsx
  describe('AccessibilityTests', () => {
    it('should have proper ARIA labels', () => {
      const { getByRole } = render(<MyComponent />)
      expect(getByRole('button')).toHaveAttribute('aria-label')
    })
  })
  \`\`\`
  
  ## 4. Bonnes pratiques pour le développement
  
  - Utiliser des balises sémantiques
  - Implémenter une navigation au clavier
  - Assurer un contraste suffisant
  - Fournir des messages d'erreur clairs
  
  ## Conclusion
  
  L'accessibilité web est un investissement qui profite à tous les utilisateurs. En suivant ces principes, vous créez des applications plus inclusives et performantes.
      `,
        date: '10 Oct 2024',
        readTime: '6 min',
        imageUrl: '/images/webaccessibility-frsh.jpg',
        author: {
            name: 'Achour Mezdad',
            avatar: '/images/person.png',
            bio: 'Développeur Frontend passionné par React et l\'écosystème JavaScript moderne.'
        },
        tags: ['Accessibilité', 'Web', 'UX'],
        category: 'UX/UI'
    },
    {
        id: 'tailwind-css-guide-complet',
        title: 'Guide complet de Tailwind CSS',
        excerpt: 'Maîtrisez Tailwind CSS et ses fonctionnalités avancées pour créer des interfaces modernes et réactives.',
        content: `
  # Guide complet de Tailwind CSS
  
  Tailwind CSS est devenu un outil incontournable pour le développement d'interfaces modernes. Découvrons ensemble comment l'utiliser efficacement.
  
  ## 1. Les fondamentaux de Tailwind
  
  ### Installation et configuration
  
  \`\`\`bash
  npm install tailwindcss postcss autoprefixer
  npx tailwindcss init
  \`\`\`
  
  ### Configuration de base
  
  \`\`\`js
  // tailwind.config.js
  module.exports = {
    content: [
      './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        // Vos personnalisations ici
      },
    },
    plugins: [],
  }
  \`\`\`
  
  ## 2. Concepts avancés
  
  ### Le système de grille
  
  \`\`\`tsx
  function ResponsiveGrid() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">Item 1</div>
        <div className="p-4 bg-white rounded shadow">Item 2</div>
        <div className="p-4 bg-white rounded shadow">Item 3</div>
      </div>
    )
  }
  \`\`\`
  
  ### Personnalisation des thèmes
  
  - Création de variantes personnalisées
  - Extension des couleurs
  - Configuration des breakpoints
  
  ## 3. Optimisation et performance
  
  ### Stratégies de purge
  
  - Configuration du purge CSS
  - Gestion des classes dynamiques
  - Optimisation du bundle final
  
  ### Exemple d'optimisation
  
  \`\`\`js
  // tailwind.config.js
  module.exports = {
    purge: {
      content: ['./src/**/*.{js,ts,jsx,tsx}'],
      options: {
        safelist: [
          /^bg-/,
          /^text-/
        ]
      }
    }
  }
  \`\`\`
  
  ## 4. Composants réutilisables
  
  ### Création de composants avec Tailwind
  
  \`\`\`tsx
  function Button({ children, variant = 'primary' }) {
    const baseClasses = 'px-4 py-2 rounded font-medium'
    const variants = {
      primary: 'bg-blue-500 hover:bg-blue-600 text-white',
      secondary: 'bg-gray-500 hover:bg-gray-600 text-white'
    }
    
    return (
      <button className={\`\${baseClasses} \${variants[variant]}\`}>
        {children}
      </button>
    )
  }
  \`\`\`
  
  ## Conclusion
  
  Tailwind CSS offre un excellent équilibre entre flexibilité et productivité. En maîtrisant ces concepts, vous pourrez créer des interfaces élégantes et performantes.
      `,
        date: '12 Oct 2024',
        readTime: '7 min',
        imageUrl: '/images/plus-tailwind.jpg',
        author: {
            name: 'Achour Mezdad',
            avatar: '/images/person.png',
            bio: 'Développeur Frontend passionné par React et l\'écosystème JavaScript moderne.'
        },
        tags: ['CSS', 'Tailwind', 'Design'],
        category: 'CSS'
    }
];