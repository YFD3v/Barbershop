import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const params = Object.fromEntries(url.searchParams.entries());
  const { bookingId } = params;
  try {
    await db.booking.delete({
      where: {
        id: bookingId,
      },
    });
    revalidatePath("/admin");
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ ok: false, error });
  }
}
