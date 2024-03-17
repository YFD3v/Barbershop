"use client";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  MenuIcon,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet";
import Link from "next/link";
import SideMenu from "./SideMenu";

const Header = () => {1
  //Aula 2 parte 2 NextAuth, adicionei tudo que ta no Sheet
  return (
    <header>
      <Card>
        <CardContent className="p-5 justify-between items-center flex flex-row">
          <Link href="/">
            <Image src="/logo.png" alt="FSW Barber" height={22} width={120} />
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <MenuIcon size={16} />
              </Button>
            </SheetTrigger>
            <SheetContent className="p-0">
              <SideMenu />
            </SheetContent>
          </Sheet>
        </CardContent>
      </Card>
    </header>
  );
};
//Passo 3 - adicionei npx shadcn-ui@latest  add card
//E o button npx shadcn-ui@latest add button
export default Header;
