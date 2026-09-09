import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {

  // Get the data from the request body
  const profile_picture = req.body.profile_picture
  const developer_name = req.body.developer_name
  const developer_about = req.body.developer_about
  const developer_wallet = req.body.developer_wallet
  const developer_website = req.body.developer_website
  const developer_twitter = req.body.developer_twitter
  const developer_telegram = req.body.developer_telegram
  const contract_address = req.body.contract_address
  const telegram_project = req.body.telegram_project

  const prisma = new PrismaClient();
  
  const developerExisting = await prisma.developer.findMany({
    where: {
        OR: [
            {developer_wallet: developer_wallet},
            {contract_address: contract_address},
        ],
    }
  })

  // console.log(req.body.profile_picture)

  // Create a new user in the database
  try{
  const developer = await prisma.developer.create({
    data: {
      profile_picture: profile_picture,
      developer_name: developer_name,
      developer_about: developer_about,
      developer_wallet: developer_wallet,
      developer_website: developer_website,
      developer_twitter: developer_twitter,
      developer_telegram: developer_telegram,
      contract_address: contract_address,
      telegram_project: telegram_project,
      verified: false,
    },
  })


  // Return the user data
  res.status(200).json(developer);
  } catch (error) {
   console.log(error)
  }

  // res.status(200).json({message: "success"});

}
