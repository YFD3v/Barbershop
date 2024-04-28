import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { FormEvent, useState } from "react";
import { FormData } from "./CardAdmin";
import { createService } from "../../_actions/utils";
import { toast } from "sonner";

interface AddServiceCardProps {
  barbershopId: string;
}

const AddServiceCard = ({ barbershopId }: AddServiceCardProps) => {
  const [form, setForm] = useState<FormData>({
    name: "",
    price: 0,
    imageUrl: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await createService(form, barbershopId);
      if (response.ok) {
        toast.success("Serviço criado com sucesso!");
        setForm({ name: "", price: 0, imageUrl: "", description: "" });
      } else {
        throw new Error("Houve um erro, não coloque nomes iguais!");
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  return (
    <div>
      <form
        className="flex gap-3 flex-wrap justify-center items-center"
        onSubmit={handleSubmit}
      >
        <Input
          className="w-[20%] max-sm:w-[90%]"
          placeholder="Nome"
          name="name"
          onChange={handleChange}
          value={form.name}
          required
        />
        <Input
          className="w-[20%] max-sm:w-[90%]"
          placeholder="Preço"
          name="price"
          type="number"
          step={0.01}
          min="0.01"
          onChange={handleChange}
          value={form.price}
          required
        />
        <Input
          className="w-[20%] max-sm:w-[90%]"
          placeholder="Link da imagem"
          name="imageUrl"
          onChange={handleChange}
          value={form.imageUrl}
          required
        />
        <Input
          className="w-[20%] max-sm:w-[90%]"
          placeholder="Descrição curta"
          name="description"
          onChange={handleChange}
          value={form.description}
          required
        />
        <Button type="submit">Criar serviço</Button>
      </form>
    </div>
  );
};

export default AddServiceCard;
