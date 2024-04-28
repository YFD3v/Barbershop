import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const params = Object.fromEntries(url.searchParams.entries());
  const { serviceId } = params;
  try {
    await db.service.delete({
      where: {
        id: serviceId,
      },
    });
    revalidatePath("/admin");
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ ok: false });
  }
}

export async function PUT(req: any) {
  const { serviceId, formData } = await req.json();
  try {
    await db.service.update({
      where: {
        id: serviceId as string,
      },
      data: {
        name: formData.name,
        price: formData.price,
        description: formData.description,
        imageUrl: formData.imageUrl,
      },
    });
    revalidatePath("/admin");
    return Response.json({ ok: true });
  } catch (error) {
    console.log(error);
    return Response.json({ ok: false });
  }
}

export async function POST(req: Request) {
  const { barbershopId, formData } = await req.json();
  try {
    const services = await db.service.findMany();
    const existingService = services.filter(
      (service) => service.name === formData.name
    );
    if (existingService.length > 1) {
      return new Response(JSON.stringify("Esse serviço já existe"), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 400,
      });
    }
    await db.service.create({
      data: {
        name: formData.name,
        description: formData.description,
        imageUrl: formData.imageUrl,
        price: formData.price,
        barbershopId,
      },
    });
    revalidatePath("/admin");
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Error creating service:", error);
    return new Response(JSON.stringify(error), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 400,
    });
  }
}
