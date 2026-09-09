import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {

  // Get the data from the request body
  const wallet_address = req.body.wallet_address
  const prisma = new PrismaClient();
  

  // console.log(req.body.profile_picture)

  // Create a new user in the database
  try{
  const voters = await prisma.voter.findMany({
    where: {
      wallet_address: wallet_address,
    },
  })


  // Return the user data
  res.status(200).json(voters);
  } catch (error) {
   console.log(error)
  }

  // res.status(200).json({message: "success"});

}
