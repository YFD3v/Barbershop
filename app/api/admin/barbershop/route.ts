import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

export async function PUT(req: Request) {
  const { property, barbershopId, value } = await req.json();
  try {
    if (value === "Photo") {
      await db.barbershop.update({
        where: { id: barbershopId },
        data: {
          imageUrl: property,
        },
      });
      return Response.json({ ok: true });
    } else if (value === "Name") {
      await db.barbershop.update({
        where: { id: barbershopId },
        data: {
          name: property,
        },
      });

      return Response.json({ ok: true });
    }
    revalidatePath("/admin");
  } catch (error) {
    console.log("Error updating barbershop photo", error);
    return Response.json({ ok: false, error });
  }
}
