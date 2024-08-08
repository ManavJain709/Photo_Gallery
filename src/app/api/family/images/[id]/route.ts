import { prisma } from "@/lib";

const getSingleFamily = async (id: string, skip: number, take: number) => {
    const members = await prisma.faceEncodings.findMany({
        where: {
            FAMILYID: id,
        },
        select: {
            id: true,
            name: true,
        },
    });

    const ids = members.map((m) => m.id);

    const result = await prisma.recognizedFaces.findMany({
        where: {
            id: {
                in: ids,
            },
        },
        select: {
            image_name: true,
            IMAGEID: true,
        },
        distinct: ['IMAGEID'],
    });



    return result
}

// GET /api/family/[id]?skip=0&take=10
// Gets all information about a family with id
export async function GET(
    req: Request,
    {
        params,
    }: {
        params: { id: string };
    }
) {
    const { searchParams } = new URL(req.url);
    const skip = searchParams.get('skip') ?? '0';
    const take = searchParams.get('take') ?? '10';
    const id = params.id;

    const family = await prisma.gFAMILY.findUnique({
        where: {
            FAMILYID: id,
        },
    });

    if (!family) {
        return Response.json({ message: "Family not found" }, { status: 404 });
    }

    const data = await getSingleFamily(id, parseInt(skip), parseInt(take));

    return Response.json(data);
}
