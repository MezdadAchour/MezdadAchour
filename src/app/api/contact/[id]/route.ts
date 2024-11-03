// src/app/api/contact/[id]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await req.json()
        const { status } = body

        const contact = await prisma.contact.update({
            where: { id: params.id },
            data: { status }
        })

        return NextResponse.json({ success: true, data: contact })
    } catch (error) {
        console.error('Error updating contact:', error)
        return NextResponse.json(
            { success: false, error: 'Something went wrong' },
            { status: 500 }
        )
    }
}