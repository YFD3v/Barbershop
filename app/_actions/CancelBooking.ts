"use server";

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

//Aula 4.2 - fazendo o cancelamento do agendamtno

export const cancelBooking = async (bookingId: string) => {
  await db.booking.delete({
    where: {
      id: bookingId,
    },
  });

  revalidatePath("/bookings");
  revalidatePath("/")
};
