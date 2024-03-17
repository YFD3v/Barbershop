"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

//Aula 3.2 Backend da reserva
interface SaveBookingParams {
  barbershopId: string;
  serviceId: string;
  userId: string;
  date: Date;
}

export const saveBooking = async (params: SaveBookingParams) => {
   await db.booking.create({
      data:{
         serviceId: params.serviceId,
         userId: params.userId,
         date: params.date,
         barbershopId: params.barbershopId
      }
   })

   //Serve para atualizar a rota, evitando que não apareça a reserva para o usuário
   revalidatePath("/bookings");
   revalidatePath("/");
};
