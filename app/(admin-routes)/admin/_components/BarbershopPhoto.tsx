import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Barbershop } from "@prisma/client";
import { FormEvent, useState } from "react";
import { updatePropertyBarbershop } from "../_actions/utils";
import { toast } from "sonner";

interface BarbershopPhotoProps {
  barbershop: Barbershop;
}

const BarbershopPhoto = ({ barbershop }: BarbershopPhotoProps) => {
  const [imageUrl, setImageUrl] = useState(() => barbershop.imageUrl);

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      await updatePropertyBarbershop(imageUrl, "Photo", barbershop.id);
      toast.success("Foto atualizada com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar foto!");
    }
  };

  return (
    <div className="mt-5 p-5 flex flex-col  justify-center">
      <h2 className="text-2xl font-bold">Atualize a foto de sua barbearia: </h2>
      <div>
        <h3>Foto atual:</h3>
        <img src={barbershop.imageUrl} alt={barbershop.name} />
      </div>
      <form onSubmit={handleSubmit} className="py-5">
        <Input
          name="imageUrl"
          placeholder="Link da imagem"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
        <Button className="mt-5" type="submit">
          Atualizar
        </Button>
      </form>
    </div>
  );
};

export default BarbershopPhoto;
