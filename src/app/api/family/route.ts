import { prisma } from "@/lib";

export type Family = {
    id: number;
    name: string;
};

// GET /api/family
// Get all families
export async function GET() {
    const family = await prisma.gFAMILY.findMany()

    const familyObj = family.map((f) => ({
        id: f.FAMILYID,
        name: f.FAMILYNAME,
    }))

    return Response.json(familyObj);
}