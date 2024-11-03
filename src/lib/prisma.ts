import { PrismaClient } from '@prisma/client';

// Étendre les types globaux de Node.js
declare global {
    var prisma: PrismaClient | undefined; // Utiliser 'var' pour la variable globale
}

// Initialiser le client Prisma
const prisma = globalThis.prisma || new PrismaClient({
    log: ['query', 'error', 'warn'],
});

// Ne pas conserver la référence globale en production
if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = prisma; // Assurez-vous que cette ligne ne sera pas exécutée en production
}

// Exporter le client Prisma
export { prisma };
