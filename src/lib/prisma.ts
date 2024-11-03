import { PrismaClient } from '@prisma/client';

declare global {
    let prisma: PrismaClient | undefined; // Utiliser 'let' pour la variable globale
}

// Initialiser le client Prisma
const prisma = global.prisma || new PrismaClient({
    log: ['query', 'error', 'warn'],
});

// Ne pas conserver la référence globale en production
if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma; // Assurez-vous que cette ligne ne sera pas exécutée en production
}

// Exporter le client Prisma
export { prisma };
