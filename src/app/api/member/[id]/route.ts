import { prisma, validateSchema } from '@/lib'
import { parse } from 'path'
import { z } from 'zod'

const UpdateMemberSchema = z.object({
    name: z.string().min(3).max(255),
    FAMILYID: z.string(),
})

const mergeMemberSchema = z.object({
    newId: z.string(),
})

// POST /api/member/[id]
// Add a member to a family
export async function POST(req: Request, { params }: {
    params: { id: string }
}) {
    const id = params.id
    const body: typeof UpdateMemberSchema = await req.json()

    const isValid = validateSchema(UpdateMemberSchema, body)
    if (!isValid) {
        return Response.json({ message: 'Invalid data' }, { status: 400 })
    }
    const data = await prisma.faceEncodings.update({
        where: {
            id: parseInt(id)
        },
        data: body
    })
    return Response.json(data)
}

// GET /api/member/[id]
// Get images of a member with id
export async function GET(req: Request, { params }: {
    params: { id: string }
}) {
    const id = params.id
    const data = await prisma.recognizedFaces.findMany({
        where: {
            id: parseInt(id)
        }
    })
    if (!data) {
        return Response.json({ message: 'No data found' }, { status: 404 })
    }
    return Response.json(data)
}

// PATCH /api/member/[id]
// Merge a member with another member
export async function PATCH(req: Request, { params }: {
    params: { id: string }
}) {
    const id = params.id
    const body = await req.json()
    const isValid = validateSchema(mergeMemberSchema, body)
    if (!isValid) {
        return Response.json({ message: 'Invalid data' }, { status: 400 })
    }
    const newId = body.newId

    const data = await prisma.recognizedFaces.updateMany({
        where: {
            id: parseInt(id)
        },
        data: {
            id: parseInt(newId)
        }
    })

    return Response.json(data)
}