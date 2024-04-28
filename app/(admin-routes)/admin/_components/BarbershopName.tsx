import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Barbershop } from "@prisma/client";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { updatePropertyBarbershop } from "../_actions/utils";

interface BarbershopNameProps {
  barbershop: Barbershop;
}

const BarbershopName = ({ barbershop }: BarbershopNameProps) => {
  const [nameBarbershop, setBarbershopName] = useState(() => barbershop.name);

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      await updatePropertyBarbershop(nameBarbershop, "Name", barbershop.id);
      toast.success("Nome atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar nome!");
    }
  };

  return (
    <div className="mt-5 p-5 flex flex-col  justify-center">
      <h2 className="text-2xl font-bold">{barbershop.name}</h2>
      <form onSubmit={handleSubmit} className="py-5">
        <Input
          name="name"
          placeholder="Link da imagem"
          value={nameBarbershop}
          onChange={(e) => setBarbershopName(e.target.value)}
          required
        />
        <Button className="mt-5" type="submit">
          Atualizar nome
        </Button>
      </form>
    </div>
  );
};

export default BarbershopName;
