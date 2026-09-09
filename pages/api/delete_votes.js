import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {

    // Get the data from the request body
    const prisma = new PrismaClient();


    if (req.body.password !== "AuthenticateMe") {
        res.status(401).json({message: "failed"});
        return
    }

    // console.log(req.body.profile_picture)

    // Create a new user in the database
    try {
        const voters = await prisma.voter.deleteMany()
        await prisma.developer.updateMany({
            data: {
                votes: 0,
            }
        })


        // Return the user data
        res.status(200).json(voters);
    } catch (error) {
        console.log(error)
    }

    // res.status(200).json({message: "success"});

}
