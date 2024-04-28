import { db } from "@/app/_lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const params = Object.fromEntries(url.searchParams.entries());
  const { barbershopId } = params;
  try {
    await db.booking.findMany({
      where: {
        barbershopId,
      },
      include: { user: true, service: true },
    });
    return Response.json({ ok: true  });
  } catch (error) {
    return Response.json(error);
  }
}
