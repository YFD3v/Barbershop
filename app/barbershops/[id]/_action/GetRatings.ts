"use server";

import { db } from "@/app/_lib/prisma";

export const getRatings = async (barbershopId: string, userId?:string) => {
  const ratings = await db.ratings.findMany({
    where: {
      barbershopId, userId
    },
    include:{
      user: true
    }
  });
  return ratings;
};
