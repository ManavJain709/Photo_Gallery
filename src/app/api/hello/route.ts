import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const family = await prisma.gFAMILY.count()
    return Response.json({ message: `Hello World! ${family}` });
}