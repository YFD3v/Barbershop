//Aula 2
import { db } from "@/app/_lib/prisma";
import BarbershopInfo from "./_components/BarbershopInfo";
import ServiceItem from "./_components/ServiceItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface BarberShopDetailsPageProps {
  //Resgatando o param id da URL
  params: {
    id?: string;
  };
}

const BarberShopDetailsPage = async ({
  params,
}: BarberShopDetailsPageProps) => {
  //Usando em server ccomponentes para pegar a session ao inves de useSession
  const session = await getServerSession(authOptions);

  if (!params.id) {
    //Redirecionar para home page
    return null;
  }
  const barbershop = await db.barbershop.findUnique({
    where: { id: params.id },
    //Como existe uma relação entre Barbershop e Services que são2  tabelas diferentes, para resgatar os servicos da barbearia, tem que fazer isso independemente se no schema ja estiver services Service[]
    include: { services: true },
  });

  if (!barbershop) {
    //Redirecionar para home page
    return null;
  }
  return (
    <div>
      <BarbershopInfo barbershop={barbershop} />
      <div className="px-5 py-3 flex flex-col gap-4">
        {barbershop.services.map((service) => (
          <ServiceItem
            key={service.id}
            service={service}
            isAuthenticaded={!!session?.user}
            barbershop={barbershop}
          />
        ))}
      </div>
    </div>
  );
};

export default BarberShopDetailsPage;
