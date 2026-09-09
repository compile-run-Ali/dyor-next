import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    const prisma = new PrismaClient();
    
    const developer = await prisma.developer.findMany({
        where:{
            closed: false
        }
    })
    res.status(200).json(developer);
}