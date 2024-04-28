import { cookies } from "next/headers";
import { db } from "../../_lib/prisma";
import ContentAdmin from "./_components/ContentAdmin";
import HeaderAdmin from "./_components/HeaderAdmin";
import AuthService from "@/app/_services/authService";
import { redirect } from "next/navigation";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";

const AdmingPage = async () => {
  const barbershops = await db.barbershop.findMany({
    include: { rating: true, bookings: true, services: true, owner: true },
  });
  const session = cookies().get("session");
  if (!session) return redirect("/login");
  const contentSession = await AuthService.openSessionToken(session.value);
  const user = await db.user.findUnique({
    where: {
      id: contentSession.id as string,
    },
  });

  return (
    <div>
      <HeaderAdmin />
      {user?.ownsBarbershop ? (
        <>
          <ContentAdmin
            barbershops={barbershops}
            contentSession={contentSession}
          />
        </>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <Button>
            <Link href="/admin/register">Cadastre sua barbearia</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdmingPage;
