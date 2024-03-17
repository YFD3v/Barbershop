//Aula 2 parte -2 Instalação do next Auth
//A reticências na pasta serve para que caso o usuário digite algo a mais na url ele seja redirecionado para a rota padrão
import { authOptions } from "@/app/_lib/auth";
import NextAuth from "next-auth";



const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
