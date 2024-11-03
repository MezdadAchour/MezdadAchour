import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { sendNewMessageNotification } from '@/lib/email'

export async function POST(request: Request) {
    try {
        const data = await request.json()

        // Créer le message dans la base de données
        const message = await prisma.message.create({
            data: {
                name: data.name,
                email: data.email,
                message: data.message,
            },
        })

        // Envoyer la notification par email
        await sendNewMessageNotification({
            name: data.name,
            email: data.email,
            message: data.message,
        })

        return NextResponse.json(message, { status: 201 })
    } catch (error) {
        console.error('Erreur:', error)
        return NextResponse.json(
            { error: 'Erreur lors de l\'envoi du message' },
            { status: 500 }
        )
    }
}
