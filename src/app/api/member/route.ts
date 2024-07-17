import prisma from "@/lib/prisma";
import { FaceEncodings, RecognizedFaces } from "@prisma/client";
import { NextResponse } from "next/server";

// GET /api/member
// GET /api/member?skip=0&take=10
// To fetch all members with pagination
// GET /api/member?image_name=xxxx
// To fetch all member in an image
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const skip = searchParams.get('skip')
    const take = searchParams.get('take')
    const image_name = searchParams.get('image_name')

    if (image_name) {
        const data = await prisma.recognizedFaces.findMany({
            where: {
                image_name: image_name
            }
        })
        const members = await prisma.faceEncodings.findMany({
            where: {
                id: {
                    in: data.map((d) => d.id)
                }
            }
        })

        return NextResponse.json({ members })
    }

    let data: Omit<FaceEncodings, "encoding">[]
    if (skip && take) {
        data = await prisma.faceEncodings.findMany({
            skip: parseInt(skip),
            take: parseInt(take),
            select: {
                id: true,
                name: true,
                FAMILYID: true,
            }
        })
        return NextResponse.json(data)
    }

    data = await prisma.faceEncodings.findMany({
        skip: 0,
        take: 10,
        select: {
            id: true,
            name: true,
            FAMILYID: true,
        }
    })

    return NextResponse.json(data)
}