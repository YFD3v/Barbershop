import { format } from "date-fns";
import Header from "../_components/Header";
import { ptBR } from "date-fns/locale";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá, yan!</h2>
        {/* Instalei date-fns para formatar a data */}
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>
    </div>
  );
}
