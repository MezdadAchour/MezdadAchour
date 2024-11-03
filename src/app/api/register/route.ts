import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json()
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        })

        return NextResponse.json({ message: 'Utilisateur créé' }, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            { error: 'Erreur lors de la création de l\'utilisateur' },
            { status: 500 }
        )
    }
}
