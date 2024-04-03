"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

//Aula 3.2 Backend da reserva
interface SaveRatingParams {
  barbershopId: string;
  userId: string;
  rating: number;
}

export const saveRating = async (params: SaveRatingParams) => {
  await db.ratings.create({
    data: {
      userId: params.userId,
      rating: params.rating,
      barbershopId: params.barbershopId,
    },
  });
  revalidatePath("/barbershops/" + params.barbershopId);
  revalidatePath("/");
};

export const updateRating = async (params: SaveRatingParams) => {
  await db.ratings.updateMany({
    where: {
      userId: params.userId,
      barbershopId: params.barbershopId,
    },
    data: {
      rating: params.rating,
    },
  });
  revalidatePath("/barbershops/" + params.barbershopId);
  revalidatePath("/");
};
