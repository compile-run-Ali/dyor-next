import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    const prisma = new PrismaClient();
    
    const developer = await prisma.developer.findMany({
        where: {
            OR: [
                {developer_wallet: req.body.developer_wallet},
                {contract_address: req.body.contract_address},
            ],
        }
    })
    res.status(200).json(developer);
}