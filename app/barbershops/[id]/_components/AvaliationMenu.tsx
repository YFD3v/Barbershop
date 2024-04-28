import { Button } from "@/app/_components/ui/button";
import { Rating } from "@mui/material";
import { Barbershop, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { saveRating, updateRating } from "../_action/SaveRating";
import { toast } from "sonner";
import { SheetClose } from "@/app/_components/ui/sheet";

interface AvalationMenuParams {
  barbershop: Barbershop;
  user: User;
  alreadyRated: boolean;
}

const AvaliationMenu = ({
  barbershop,
  user,
  alreadyRated,
}: AvalationMenuParams) => {
  const { data: session, status } = useSession();
  const [value, setValue] = useState<number | null>(1);
  if (!session?.user) return redirect("/");
  const handleSubmit = async () => {
    try {
      if (!value) return;
      const params = {
        barbershopId: barbershop.id,
        userId: user.id,
        rating: value,
      };
      if (alreadyRated) {
        await updateRating(params);
      } else {
        await saveRating(params);
      }
      toast.success("Avaliação enviada com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error(`Houve um erro: ${error}, tente novamente`);
    }
  };

  const handleChange = (value: number | null) => {
    setValue(value);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-primary gap-3 p-5">
      <h3>Avalie a barbearia</h3>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, value) => handleChange(value)}
      />
      <SheetClose>
        <Button className="bg-yellow-600" onClick={handleSubmit}>
          Enviar
        </Button>
      </SheetClose>
    </div>
  );
};

export default AvaliationMenu;
