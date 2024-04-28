"use client";

import { Button } from "@/app/_components/ui/button";
import { DoorOpenIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MenuAdmin = () => {
  return (
    <div>
      <h2>Menu</h2>

      <div className="flex flex-col items-center justify-center gap-5 py-12 border-b-2 border-solid border-primary ">
        <Image
          alt="User image"
          src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
          width={128}
          height={128}
          className="rounded-full"
        />
        <h3>Yan Ferreira</h3>
      </div>
      <div className="py-5 text-xl ">
        <p className="border-b-2 border-solid border-primary py-4">
          Bem-vindo (a)
        </p>
      </div>
      <Button>
        <DoorOpenIcon />
        <span className="ml-2">
          <Link href={"/api/logout"}>Sair</Link>
        </span>
      </Button>
    </div>
  );
};

export default MenuAdmin;
