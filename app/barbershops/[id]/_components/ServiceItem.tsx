//Aula 2
"use client";
import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { Barbershop, Service } from "@prisma/client";
import { ptBR } from "date-fns/locale/pt-BR";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { generateDayTimeList } from "../_helpers/hours";
import { format } from "date-fns";

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
  //Aula 3 fazendo a reserva
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<string | undefined>();

  const handleHourClick = (time: string) => {
    setHour(time);
  };

  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  };

  //UseMemo so executa a função se o array de dependencia mudar
  const timeList = useMemo(() => {
    return date ? generateDayTimeList(date) : [];
  }, [date]);
  //
  const handleBookingClick = () => {
    if (!isAuthenticaded) return signIn("google");
  };
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
                <Sheet>
                  <SheetTrigger asChild>
                    <Button onClick={handleBookingClick} variant="secondary">
                      Reservar
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="p-0">
                    <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                      <SheetTitle>Fazer Reserva</SheetTitle>
                    </SheetHeader>
                    <div className="py-6">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateClick}
                        fromDate={new Date()}
                        locale={ptBR}
                        //Usando a estilização conforme a documentação do ReactDayPicker
                        styles={{
                          head_cell: {
                            width: "100%",
                            textTransform: "capitalize",
                          },
                          cell: {
                            width: "100%",
                          },
                          button: {
                            width: "100%",
                          },
                          nav_button_previous: {
                            width: "2rem",
                            height: "2rem",
                          },
                          nav_button_next: {
                            width: "2rem",
                            height: "2rem",
                          },
                          caption: {
                            textTransform: "capitalize",
                          },
                        }}
                      />
                    </div>
                    {date && (
                      <div className=" flex gap-3 overflow-x-auto py-6 px-5 border-t border-solid border-secondary [&::-webkit-scrollbar]:hidden">
                        {timeList.map((time) => (
                          <Button
                            onClick={() => handleHourClick(time)}
                            variant={hour === time ? "default" : "outline"}
                            className="rounded-full"
                            key={time}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    )}
                    <div className="px-5 border-t border-solid border-secondary py-6">
                      <Card>
                        <CardContent className="p-3 gap-3 flex flex-col">
                          <div className="flex justify-between">
                            <h2 className="font-bold">{service.name}</h2>
                            <h3 className="font-bold text-sm">
                              {Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(+service.price)}
                            </h3>
                          </div>
                          {/* Ajustar essa logica para ser um carrinho ao invés de um serviço específico */}
                          {date && (
                            <div className="flex justify-between">
                              <h3 className="text-gray-400 text-sm">Data </h3>
                              <h4 className="text-sm">
                                {format(date, "dd 'de' MMMM", {
                                  locale: ptBR,
                                })}
                              </h4>
                            </div>
                          )}
                          {hour && (
                            <div className="flex justify-between">
                              <h3 className="text-gray-400 text-sm">
                                Horário{" "}
                              </h3>
                              <h4 className="text-sm">
                                {format(hour, "dd 'de' MMMM", {
                                  locale: ptBR,
                                })}
                              </h4>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <h3 className="text-gray-400 text-sm">Barbearia</h3>
                            <h4 className="text-sm">{barbershop.name}</h4>
                          </div>
                        </CardContent>
                      </Card>
                      <SheetFooter className="px-5">
                        <Button disabled={!hour || !date}>
                          Confirmar Reserva
                        </Button>
                      </SheetFooter>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ServiceItem;
