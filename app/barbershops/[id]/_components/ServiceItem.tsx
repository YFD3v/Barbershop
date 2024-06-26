"use client";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Barbershop, Service } from "@prisma/client";
import Image from "next/image";
import SheetService from "./SheetService";

interface ServiceItemProps {
  barbershop: Barbershop;
  service: Service;
  isAuthenticaded: Boolean;
}

const ServiceItem = ({
  service,
  isAuthenticaded,
  barbershop,
}: ServiceItemProps) => {
  return (
    <>
      <Card>
        <CardContent className="p-3 w-full">
          <div className="flex gap-4 items-center w-full">
            <div className="relative min-h-[110px] min-w-[110px]">
              <Image
                src={service.imageUrl}
                alt={service.name}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>

            <div className="flex flex-col">
              <h2 className="font-bold">{service.name}</h2>
              <p className="text-sm text-gray-400">{service.description}</p>

              <div className="flex items-center justify-between mt-2">
                <p className="text-primary font-bold">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(+service.price)}
                </p>
                <SheetService
                  barbershop={barbershop}
                  service={service}
                  isAuthenticaded={isAuthenticaded}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ServiceItem;
