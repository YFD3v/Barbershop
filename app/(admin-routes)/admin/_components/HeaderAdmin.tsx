"use client";
import MenuAdmin from "./MenuAdmin";
import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { MenuIcon } from "lucide-react";
const HeaderAdmin = () => {
  return (
    <header className="flex px-5 py-7 items-center justify-between border-b-2 border-solid border-primary">
      <div>
        <h1 className="text-2xl font-bold">Página Admin</h1>
        <h5 className="text-sm">Atualize a página para ver as modificações</h5>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="h-12 w-12">
            <MenuIcon size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <MenuAdmin />
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default HeaderAdmin;
