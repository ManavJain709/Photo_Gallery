import { prisma } from "@/lib";
import { Prisma } from "@prisma/client";


export type FamilyDetails = {
    name: string | null;
    family: string;
    result: {
        image_name: string;
    }[];
    members: {
        id: number;
        name: string | null;
    }[];
}

const getSingleFamily = async (id: string) => {
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

    const idsString = ids.length > 0 ? Prisma.join(ids) : ids.join(",");

    // Execute a raw SQL query
    const result = await prisma.$queryRaw`
        SELECT rf.image_name
        FROM ganesha.RecognizedFaces rf
        JOIN dbo.FaceEncodings fe ON rf.id = fe.id
        WHERE fe.id IN (${idsString})
        GROUP BY rf.image_name
        HAVING COUNT(DISTINCT fe.id) = ${ids.length}
    `;

    return {
        family: id,
        result: result,
        members: members,
    };
}

// GET /api/family/[id]
// Gets all information about a family with id
export async function GET(
    req: Request,
    {
        params,
    }: {
        params: { id: string };
    }
) {
    const id = params.id;

    if (id === "all") {
        const families = await prisma.aFAMILY.findMany();

        let allFamily = [];

        for (let family of families) {

            const familyData = await getSingleFamily(family.FAMILYID);

            allFamily.push({ ...familyData, name: family.FAMILYNAME });
        }

        return Response.json(allFamily);
    }

    const family = await prisma.aFAMILY.findUnique({
        where: {
            FAMILYID: id,
        },
    });

    if (!family) {
        return Response.json({ message: "Family not found" }, { status: 404 });
    }

    const data = await getSingleFamily(id);

    return Response.json({
        ...data,
        name: family.FAMILYNAME,
    });
}
