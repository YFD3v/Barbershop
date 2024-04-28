"use client";

import CardAdmin from "./CardAdmin/CardAdmin";
import { Barbershop, Prisma } from "@prisma/client";
import { JWTPayload } from "jose";
import BarbershopPhoto from "./BarbershopPhoto";
import BarbershopName from "./BarbershopName";

interface ContentAdminProps {
  barbershops: Prisma.BarbershopGetPayload<{
    include: {
      rating: true;
      bookings: true;
      services: true;
      owner: true;
    };
  }>[];
  contentSession: JWTPayload;
}

const ContentAdmin = ({ barbershops, contentSession }: ContentAdminProps) => {
  const barbershop = barbershops.filter(
    (barbershop) => contentSession.id === barbershop.ownerId
  );
  return (
    <>
      <CardAdmin
        barbershopId={barbershop[0].id}
        bookings={barbershop[0].bookings}
      ></CardAdmin>
      <CardAdmin
        barbershopId={barbershop[0].id}
        services={barbershop[0].services}
      ></CardAdmin>
      <CardAdmin
        barbershopId={barbershop[0].id}
        ratings={barbershop[0].rating}
      ></CardAdmin>
      <BarbershopPhoto barbershop={barbershop[0]} />
      <BarbershopName barbershop={barbershop[0]} />
    </>
  );
};

export default ContentAdmin;
