"use lcient";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { signIn, useSession } from "next-auth/react";

const Header = () => {
  //Aula 2 parte 2 NextAuth
  const {data} = useSession();
  const handleLoginClick = async () => {
    await signIn();
  };
  //
  return (
    <Card>
      <CardContent className="p-5 justify-between items-center flex flex-row">
        <Image src="/logo.png" alt="FSW Barber" height={22} width={120} />
        <Button variant="outline" size="icon" className="h-8 w-8">
          <MenuIcon size={16} />
        </Button>
      </CardContent>
    </Card>
  );
};
//Passo 3 - adicionei npx shadcn-ui@latest  add card
//E o button npx shadcn-ui@latest add button
export default Header;
