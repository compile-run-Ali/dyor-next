import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    const prisma = new PrismaClient();
    
    const developer = await prisma.developer.update({
        where: {
            contract_address: req.body.previous_contract_address
        },
        data: {
            closed: true,
        }
    });

    const new_developer = await prisma.developer.create({
        data: {
            profile_picture: developer.profile_picture,
            developer_name: developer.developer_name,
            developer_about: developer.developer_about,
            developer_wallet: developer.developer_wallet,
            developer_website: developer.developer_website,
            developer_twitter: developer.developer_twitter,
            developer_telegram: developer.developer_telegram,
            contract_address: req.body.new_contract_address,
            telegram_project: developer.telegram_project,
        },
    })
    res.status(200).json(new_developer);
}