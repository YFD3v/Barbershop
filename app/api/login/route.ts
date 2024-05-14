import { db } from "@/app/_lib/prisma";
import AuthService from "@/app/_services/authService";
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
    if (!existingUser) {
      console.log("Usuário não existe");
      return;
    }
    await AuthService.createSessionToken({
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
    });

    return new Response(JSON.stringify(existingUser), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 201,
    });
  } catch (error) {
    console.error("Error at login:", error);
    return new Response(JSON.stringify(error), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 400,
    });
  }
}
