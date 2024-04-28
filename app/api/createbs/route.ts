import { db } from "@/app/_lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: any, res: NextApiResponse) {
  const data = await req.json();
  try {
    const barbershops = await db.barbershop.findMany();
    const existingBarbershop = barbershops.filter(
      (barbershop) => barbershop.ownerId === data.ownerId
    );
    if (existingBarbershop.length < 1) {
      await db.barbershop.create({
        data: {
          name: data.name,
          imageUrl: data.image,
          address: data.address,
          ownerId: data.ownerId,
          services: {
            create: data.services.map((service: any) => ({
              name: service.name,
              price: service.price,
              description: service.description,
              imageUrl: service.image,
            })),
          },
        },
      });
      await db.user.update({
        where: { id: data.ownerId },
        data: {
          ownsBarbershop: true,
        },
      });
    }

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 201,
    });
  } catch (error) {
    console.error("Error creating barbershop:", error);
    return new Response(JSON.stringify(error), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 400,
    });
  }
}
