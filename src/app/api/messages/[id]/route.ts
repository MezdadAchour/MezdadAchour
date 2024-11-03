// app/api/messages/[id]/route.ts
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.message.delete({
            where: {
                id: params.id
            }
        })
        return NextResponse.json({ message: 'Message supprimé' })
    } catch (error) {
        return NextResponse.json(
            { error: 'Erreur lors de la suppression du message' },
            { status: 500 }
        )
    }
}