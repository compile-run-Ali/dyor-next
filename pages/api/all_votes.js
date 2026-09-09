import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {

  const prisma = new PrismaClient();
  


  // Get all the users from the database
  try{
  const voters = await prisma.voter.findMany()


  // Return the user data
  res.status(200).json(voters);
  } catch (error) {
   console.log(error)
  }

  // res.status(200).json({message: "success"});

}
