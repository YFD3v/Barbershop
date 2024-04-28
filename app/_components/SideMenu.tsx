"use client";
//Aula 2 parte 2
import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  UserIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { SheetHeader, SheetTitle } from "./ui/sheet";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const SideMenu = () => {
  const { data } = useSession();
  const handleLoginClick = () => signIn();

  const handleLoggoutClick = () => signOut();

  //
  return (
    <>
      <SheetHeader className="p-5 text-left border-b border-solid border-secondary">
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>
      {data?.user ? (
        <div className="flex justify-between px-5 py-6 item-center">
          <div className="flex item-center gap-3 ">
            <Avatar>
              <AvatarImage
                src={
                  data.user?.image ??
                  "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
                }
              />
            </Avatar>
            <h2 className="font-bold">{data.user.name}</h2>
          </div>
          <Button onClick={handleLoggoutClick} variant="secondary" size="icon">
            <LogOutIcon />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col px-5 py-6 gap-3">
          <div className="flex item-center gap-2 ">
            <UserIcon size={32} />
            <h2 className="font-bold">Olá, faça seu login!</h2>
          </div>
          <Button
            onClick={handleLoginClick}
            className="w-full justify-start"
            variant="secondary"
          >
            <LogInIcon className="mr-2" size={18} /> Fazer Login
          </Button>
        </div>
      )}
      <div className="flex flex-col gap-3">
        <Button variant="outline" className="justify-start" asChild>
          <Link href="/">
            <HomeIcon size={18} className="mr-2" />
            Início
          </Link>
        </Button>

        {data?.user && (
          <Button variant="outline" className="justify-start" asChild>
            <Link href="/bookings">
              <CalendarIcon size={18} className="mr-2" />
              Agendamentos
            </Link>
          </Button>
        )}
      </div>
    </>
  );
};

export default SideMenu;
