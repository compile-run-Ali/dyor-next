import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    const prisma = new PrismaClient();
    
    const developer = await prisma.developer.findMany({
        where: {
            developer_wallet: req.body.developer_wallet,
            closed: true,
        }
    })
    res.status(200).json(developer);
}