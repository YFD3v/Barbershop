"use client";
import React, { useEffect, useState } from "react";
import { Trash } from "lucide-react";
import { Label } from "@/app/_components/ui/label";
import { Input } from "@/app/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { Button } from "@/app/_components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { JWTPayload } from "jose";

export interface FormData {
  name: string;
  image: string;
  address: string;
  ownerId: string;
  services: {
    name: string;
    image: string;
    description: string;
    price: number;
  }[];
}

interface FormRegisterAdminProps {
  contentSession: JWTPayload;
}

const FormRegisterAdmin = ({ contentSession }: FormRegisterAdminProps) => {
  const router = useRouter();
  const [value, setValue] = useState<number>(0);
  const [form, setForm] = useState<FormData>({
    name: "",
    image: "",
    ownerId: contentSession.id as string,
    address: "",
    services: [],
  });
  const [quantityInputsServices, setQuantityInputsServices] = useState<
    number[]
  >([]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/createbs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      console.log("Ok");
      console.log(form);
      if (response.ok) {
        console.log("Ok2");
        toast.success("Barbearia criada com sucesso!");
        router.push("/admin");
      } else {
        console.log("Oo");
        const data = await response.json();
        console.error("Error creating barbershop: ", data);
      }
      console.table(form);
    } catch (error) {
      toast.error("Erro ao criar a barbearia");
      console.error("Error to submit the form: ", error);
    }
  };

  useEffect(() => {
    let newQuantityInputsServices: number[] = [];
    for (let i = 0; i < value; i++) {
      newQuantityInputsServices.push(i + 1);
    }
    setQuantityInputsServices(newQuantityInputsServices);
    setForm((prevForm) => ({
      ...prevForm,
      services: newQuantityInputsServices.map(() => ({
        name: "",
        image: "",
        description: "",
        price: 0,
      })),
    }));
  }, [value]);

  const handleDelete = (e: React.MouseEvent<HTMLElement>, index: number) => {
    e.preventDefault();
    setQuantityInputsServices((prevState) =>
      prevState.filter((_, i) => i !== index)
    );
    setForm((prevForm) => ({
      ...prevForm,
      services: prevForm.services.filter((_, i) => i !== index),
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleServiceInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      services: prevForm.services.map((service, i) =>
        i === index ? { ...service, [name]: value } : service
      ),
    }));
  };
  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      method="post"
      className="flex flex-col items-center justify-center gap-4 w-full"
    >
      <div className="w-full">
        <Label htmlFor="name">Nome da barbearia</Label>
        <Input
          type="text"
          name="name"
          className="w-full"
          value={form.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e)
          }
        />
      </div>
      <div className="w-full">
        <Label htmlFor="name">Link da imagem da barbearia</Label>
        <Input
          type="text"
          name="image"
          value={form.image}
          className="w-full"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e)
          }
        />
      </div>
      <div className="w-full">
        <Label htmlFor="name">Endereço da barbearia</Label>
        <Input
          type="text"
          name="address"
          value={form.address}
          className="w-full"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e)
          }
        />
      </div>
      <div className="w-full">
        <Label>Quantos serviços deseja?</Label>
        <Select onValueChange={(e: string) => setValue(parseInt(e))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione a quantidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">0</SelectItem>
            {Array.from({ length: 20 }, (_, i) => (
              <SelectItem key={i + 1} value={(i + 1).toString()}>
                {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-full">
        <Label>Serviços</Label>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Imagem</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Descrição curta</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quantityInputsServices.map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Input
                    value={form.services[index]?.name}
                    name="name"
                    className="w-full"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleServiceInputChange(e, index)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={form.services[index]?.image}
                    name="image"
                    className="w-full"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleServiceInputChange(e, index)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={form.services[index]?.price}
                    name="price"
                    className="w-full"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleServiceInputChange(e, index)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={form.services[index]?.description}
                    name="description"
                    className="w-full"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleServiceInputChange(e, index)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Button
                    size="icon"
                    className="w-[18px] h-[18px] ml-2"
                    variant="outline"
                    onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
                      handleDelete(e, index)
                    }
                  >
                    <Trash scale="1.05" size="16px" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="w-full mt-5 text-center">
        <Button className="inline-block uppercase" type="submit">
          Enviar
        </Button>
      </div>
    </form>
  );
};

export default FormRegisterAdmin;
