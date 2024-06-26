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
import { Loader2 } from "lucide-react";
import { format, setHours, setMinutes } from "date-fns";
import { Barbershop, Booking, Service } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getDayBookings } from "../_action/GetDayBookings";
import { saveBooking } from "../_action/SaveBooking";
import { toast } from "sonner";
import { ptBR } from "date-fns/locale/pt-BR";
import { generateDayTimeList } from "../_helpers/hours";

interface SheetServiceProps {
  service: Service;
  barbershop: Barbershop;
  isAuthenticaded: Boolean;
}

const SheetService = ({ service, barbershop, isAuthenticaded}: SheetServiceProps) => {
  const [hour, setHour] = useState<string | undefined>();
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  const [dayBookings, setDayBookings] = useState<Booking[]>([]);

  const { data } = useSession();
  const router = useRouter();

  //Logica verificação para não poder reservar em um horario já reservado
  useEffect(() => {
    if (!date) return;
    const refreshAvailableHours = async () => {
      const _dayBookings = await getDayBookings(barbershop.id,date);
      setDayBookings(_dayBookings);
    };
    refreshAvailableHours();
  }, [date, barbershop.id]);
  //
  const handleHourClick = (time: string) => {
    setHour(time);
  };

  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  };

  const handleBookingSubmit = async () => {
    setSubmitIsLoading(true);
    try {
      if (!hour || !date || !data?.user) {
        return;
      }

      const dateHour = +hour.split(":")[0];
      const dateMinutes = +hour.split(":")[1];
      const newDate = setMinutes(setHours(date, dateHour), dateMinutes);
      await saveBooking({
        serviceId: service.id,
        barbershopId: barbershop.id,
        date: newDate,
        userId: (data?.user as any).id,
      });
      setSheetIsOpen(false);
      setHour(undefined);
      setDate(undefined);
      toast("Reserva realizada!", {
        description: format(newDate, "'Para' dd 'de' MMM 'às' HH':'mm '.'", {
          locale: ptBR,
        }),
        action: {
          label: "Visualizar",
          onClick: () => router.push("/bookings"),
        },
      });
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitIsLoading(false);
    }
  };

  const timeList = useMemo(() => {
    if (!date) return [];
    return generateDayTimeList(date).filter((time) => {

      const timeHour = +time.split(":")[0];
      const timeMinutes = +time.split(":")[1];
      const booking = dayBookings.find((booking) => {
        const bookingHour = booking.date.getHours();
        const bookingMinutes = booking.date.getMinutes();

        return bookingHour === timeHour && bookingMinutes === timeMinutes;
      });
      if (!booking) return true;
      return false;
    });
  }, [date, dayBookings]);
  //
  const handleBookingClick = () => {
    if (!isAuthenticaded) return signIn("google");
  };

  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
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
                  <h3 className="text-gray-400 text-sm">Horário</h3>
                  <h4 className="text-sm">{hour}</h4>
                </div>
              )}
              <div className="flex justify-between">
                <h3 className="text-gray-400 text-sm">Barbearia</h3>
                <h4 className="text-sm">{barbershop.name}</h4>
              </div>
            </CardContent>
          </Card>
          <SheetFooter className="p-5">
            <Button
              onClick={handleBookingSubmit}
              disabled={!hour || !date || submitIsLoading}
            >
              {submitIsLoading && (
                <Loader2 className="mr-2 h-6 w-4 animate-spin" />
              )}
              Confirmar Reserva
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SheetService;
