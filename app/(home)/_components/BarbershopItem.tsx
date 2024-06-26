"use client";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { calculateRatingBarbershops } from "@/app/barbershops/[id]/_helpers/calculateRating";
import { Prisma,  } from "@prisma/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarbershopItemProps {
  barbershop: Prisma.BarbershopGetPayload<{
    include: {
      rating: true;
    };
  }>;
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  const valueStar = calculateRatingBarbershops(barbershop.rating);
  const router = useRouter();
  const handleBookingClick = () => {
    router.push(`/barbershops/${barbershop.id}/`);
  };
  return (
    <Card className="min-w-full rounded-2xl">
      <CardContent className="p-0 px-1 pt-1">
        <div className="relative w-full h-[159px]">
          <div className="absolute z-50 top-2 left-2">
            <Badge
              variant="secondary"
              className=" opacity-90 flex gap-2 item-center  "
            >
              <StarIcon size={12} className="fill-primary text-primary" />
              <span className="text-xs">{valueStar}</span>
            </Badge>
          </div>
          <Image
            alt={barbershop.name}
            src={barbershop.imageUrl}
            style={{ objectFit: "cover" }}
            className="h-[159px] rounded-2xl"
            fill
          />
        </div>
        <div className="px-3 pb-3">
          <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap">
            {barbershop.name}
          </h2>
          <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap">
            {barbershop.address}
          </p>
          <Button
            className="w-full mt-3"
            variant="secondary"
            onClick={handleBookingClick}
          >
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarbershopItem;
