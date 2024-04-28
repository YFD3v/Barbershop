import { db } from "@/app/_lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: any, res: NextApiResponse) {
  const { email, username } = await req.json();
  try {
    const existingUser = await db.user.findUnique({
      where: {
        email,
        name: { contains: username },
      },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const newUser = await db.user.create({
      data: {
        email,
        name: username,
        ownsBarbershop: true,
      },
    });
    return new Response(JSON.stringify(newUser), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 201,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(JSON.stringify(error), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 400,
    });
  }
}
