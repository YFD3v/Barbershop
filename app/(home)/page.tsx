import { format } from "date-fns";
import Header from "../_components/Header";
import { ptBR } from "date-fns/locale";
import Search from "./_components/search";
import BookingItem from "../_components/BookingItem";
import { db } from "../_lib/prisma";
import BarbershopItem from "./_components/BarbershopItem";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const [barbershops, recommendedBarbershops, confirmedBookings] =
    await Promise.all([
      db.barbershop.findMany({ include: { rating: true } }),
      db.barbershop.findMany({
        orderBy: {
          id: "asc",
        },
        include: { rating: true },
      }),
      session?.user
        ? db.booking.findMany({
            where: {
              userId: (session.user as any).id,
              date: {
                gte: new Date(),
              },
            },
            include: {
              service: true,
              barbershop: true,
            },
          })
        : Promise.resolve([]),
    ]);

  return (
    <div>
      <Header />
      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">
          {session?.user
            ? `Olá, ${session.user.name?.split(" ")[0]}`
            : "Olá! Vamos agendar um corte?"}
        </h2>
        <p suppressHydrationWarning className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>
      <div className="px-5 mt-6">
        <Search />
      </div>
      <div className="mt-6">
        {confirmedBookings.length > 0 && (
          <>
            <h2 className="pl-5 text-sm uppercase text-gray-400 font-bold mb-3">
              Agendamentos
            </h2>
            <div className=" px-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map((booking) => (
                <BookingItem booking={booking} key={booking.id} />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mt-6">
        <h2 className="px-5 text-sm uppercase text-gray-400 font-bold mb-3">
          Recomendados
        </h2>

        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <div className="min-w-[167px] max-w-[167px]" key={barbershop.id}>
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 mb-[4.5rem]">
        <h2 className="px-5 text-sm uppercase text-gray-400 font-bold mb-3">
          Populares
        </h2>

        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {recommendedBarbershops.map((barbershop) => (
            <div className="min-w-[167px]" key={barbershop.id}>
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
