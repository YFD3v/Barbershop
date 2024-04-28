"use client";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Booking, Ratings, Service, } from "@prisma/client";
import AddServiceCard from "./AddServiceCard";
import CardContentAdmin from "./CardContentAdmin";
interface CardAdminProps {
  barbershopId: string;
  ratings?: Ratings[];
  bookings?: Booking[];
  services?: Service[];
}

const CardAdmin = ({
  ratings,
  bookings,
  services,
  barbershopId,
}: CardAdminProps) => {

  return (
    <>
      <Card>
        <CardHeader>
          {ratings && <CardTitle>Avaliações dos clientes</CardTitle>}
          {bookings && <CardTitle>Agendamentos</CardTitle>}
          {services && (
            <>
              <CardTitle>Serviços disponíveis</CardTitle>
              <div className="text-sm text-left cursor-pointer hover:underline">
                Adicionar serviço
              </div>
              <AddServiceCard barbershopId={barbershopId} />
            </>
          )}
        </CardHeader>
        <CardContentAdmin barbershopId={barbershopId} bookings={bookings} ratings={ratings} services={services} />
      </Card>
    </>
  );
};

export default CardAdmin;
