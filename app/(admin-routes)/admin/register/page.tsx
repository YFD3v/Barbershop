import { cookies } from "next/headers";
import FormRegisterAdmin from "./_component/FormRegisterAdmin";
import AuthService from "@/app/_services/authService";
import { redirect } from "next/navigation";
import { db } from "@/app/_lib/prisma";

const RegisterBarbershop = async () => {
  const session = cookies().get("session");
  if (!session) return redirect("/login");
  const contentSession = await AuthService.openSessionToken(session.value);
  const user = await db.user.findUnique({
    where: {
      id: contentSession.id as string,
    },
  });
  if (user?.ownsBarbershop) redirect("/admin");
  return (
    <div className="p-5 flex flex-col items-center justify-center gap-5 h-[90vh]">
      <h2 className="text-2xl text-center text-primary font-bold uppercase">
        Cadastre sua barbearia
      </h2>
      <FormRegisterAdmin contentSession={contentSession} />
    </div>
  );
};

export default RegisterBarbershop;
