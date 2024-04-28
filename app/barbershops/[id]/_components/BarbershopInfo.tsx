"use client";

import SideMenu from "@/app/_components/SideMenu";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import { Barbershop, Ratings, User } from "@prisma/client";
import { ChevronLeftIcon, MapPinIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Rating from "@mui/material/Rating";
import AvaliationMenu from "./AvaliationMenu";
import { useEffect, useState } from "react";
import { calculateRatingBarbershops } from "../_helpers/calculateRating";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
interface BabershopInfoProps {
  barbershop: Barbershop;
  ratings: Ratings[];
  ratingsWithUserId: Ratings[];
}

const BarbershopInfo = ({
  barbershop,
  ratingsWithUserId,
  ratings,
}: BabershopInfoProps) => {
  const router = useRouter();
  const [alreadyRated, setAlreadyReated] = useState(false);
  const { data: session } = useSession();
  const [valueStars, setValueStars] = useState<number>(
    calculateRatingBarbershops(ratings)
  );

  const userRatedOrNot = () => {
    const rated = ratingsWithUserId.filter(
      (ratingWithUserId) =>
        ratingWithUserId.userId === session?.user.id &&
        ratingWithUserId.barbershopId === barbershop.id
    );
    if (rated.length > 0) {
      return setAlreadyReated(true);
    }
    return setAlreadyReated(false);
  };

  useEffect(() => {
    setValueStars(calculateRatingBarbershops(ratings));
    userRatedOrNot();
  }, []);

  const handleBackClick = () => {
    router.replace("/");
  };

  return (
    <>
      <div className="h-[250px] w-full relative">
        <Button
          onClick={handleBackClick}
          size="icon"
          variant="outline"
          className="z-50 absolute top-4 left-4 "
        >
          <ChevronLeftIcon />
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="z-50 absolute top-4 right-4 "
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="p-0">
            <SideMenu />
          </SheetContent>
        </Sheet>

        <Image
          src={barbershop.imageUrl}
          fill
          alt={barbershop.name}
          style={{
            objectFit: "cover",
          }}
          className="opacity-75"
        />
      </div>

      <div className="px-5 pt-3 pb-6 border-b border-solid border-secondary">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>
        <div className="flex items-center gap-1">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop.address}</p>
        </div>
        <div className="flex items-center gap-1">
          <Rating
            color="text-primary"
            name="half-rating-read"
            defaultValue={valueStars}
            precision={0.5}
            readOnly
          />
          <p className="text-sm">
            {valueStars}
            <span className="px-2">{`(${ratings.length} ${
              ratings.length > 1 ? "avaliações" : "avaliação"
            })`}</span>
          </p>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="mx-2">
                Avaliar
              </Button>
            </SheetTrigger>
            <SheetContent onClick={() => userRatedOrNot()} side="bottom" className="p-0">
              <AvaliationMenu
                barbershop={barbershop}
                user={session?.user as any}
                alreadyRated={alreadyRated}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
};

export default BarbershopInfo;
