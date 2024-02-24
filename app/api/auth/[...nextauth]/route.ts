//Aula 2 parte -2 Instalação do next Auth
//A reticências na pasta serve para que caso o usuário digite algo a mais na url ele seja redirecionado para a rota padrão
import { db } from "@/app/_lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";
import Google from "next-auth/providers/google";

const handler = NextAuth({
  //Indicando o adaptador que será utilizado, nesse caso o Prisma
  adapter: PrismaAdapter(db) as Adapter,
  //Indicando os provedores das informações
  providers: [
    Google({
      clientId: "",
      clientSecret: "",
    }),
  ],
});

export { handler as GET, handler as POST };
