import { format } from "date-fns";
import Header from "../_components/Header";
import { ptBR } from "date-fns/locale";
import Search from "./_components/search";
import BookingItem from "../_components/BookingItem";
import { db } from "../_lib/prisma";
import BarbershopItem from "./_components/BarbershopItem";

export default async function Home() {
  //Chamando prisma e pegando barbearias
  //Foi criado o prisma em _lib
  const barbershops = await db.barbershop.findMany({});
  console.log(barbershops);
  return (
    <div>
      <Header />
      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá, yan!</h2>
        {/* Instalei date-fns para formatar a data 
          Importante essa propriedade para nao dar erro de hidratação do next, 
          pelo fato de ser uma data que pega na hora, pode haver conflito.
        */}
        <p suppressHydrationWarning className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>
      <div className="px-5 mt-6">
        <Search />
      </div>
      <div className="px-5 mt-6">
        <h2 className="text-sm uppercase text-gray-400 font-bold mb-3">
          Agendamentos
        </h2>
        {/* <BookingItem /> */}
      </div>

      <div className="mt-6">
        <h2 className="px-5 text-sm uppercase text-gray-400 font-bold mb-3">
          Recomendados
        </h2>

        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
      <div className="mt-6 mb-[4.5rem]">
        <h2 className="px-5 text-sm uppercase text-gray-400 font-bold mb-3">
          Populares
        </h2>

        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  );
}
