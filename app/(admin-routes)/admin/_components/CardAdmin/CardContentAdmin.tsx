import { Button } from "@/app/_components/ui/button";
import { CardContent } from "@/app/_components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";

import { Trash } from "lucide-react";
import ButtonsCard from "./ButtonsCard";
import { Input } from "@/app/_components/ui/input";
import {
  deleteBooking,
  deleteService,
  findUserAndServiceByBooking,
  updateService,
} from "../../_actions/utils";
import { toast } from "sonner";
import { Booking, Ratings, Service } from "@prisma/client";
import { isFuture } from "date-fns";
import { useEffect, useState } from "react";

export interface FormData {
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

interface CardContentAdminProps {
  services?: Service[];
  bookings?: Booking[];
  ratings?: Ratings[];
  barbershopId: string;
}

const CardContentAdmin = ({
  services,
  bookings,
  ratings,
  barbershopId,
}: CardContentAdminProps) => {
  const [returnBookings, setReturnBookings] = useState<any>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "",
    price: 0,
    imageUrl: "",
    description: "",
  });
  const [serviceIDEditing, setServiceIDEditing] = useState<string>("");


  const fetchData = async () => {
    const response = await findUserAndServiceByBooking(barbershopId);
    setReturnBookings(response);
    return bookings;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const checkDate = (date: Date) => {
    const check = isFuture(date);
    return check;
  };

  const editService = (service: Service) => {
   setIsEditing(!isEditing);
   setServiceIDEditing(service.id);
   setForm({
     name: service.name,
     price: +service.price,
     imageUrl: service.imageUrl,
     description: service.description,
   });
 };

  const handleSubmit = async (serviceId: string) => {
    try {
      await updateService(form, serviceId);
      toast.success("Serviço atualizado com sucesso");
      setIsEditing(false);
    } catch (error) {
      toast.error("Erro ao atualizar serviço");
      console.log(error);
    }
  };

  const handleDelete = async (serviceId?: string, bookingId?: string) => {
    if (serviceId) {
      try {
        await deleteService(serviceId);
        toast.success("Serviço deletado com sucesso");
      } catch (error) {
        toast.error("Erro ao deletar serviço");
        console.log(error);
      }
    } else if (bookingId) {
      try {
        await deleteBooking(bookingId);
        toast.success("Agendamento deletado com sucesso");
      } catch (error) {
        toast.error("Erro ao deletar agendamento");
        console.log(error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };


  return (
    <CardContent>
      {services && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Imagem</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                {!isEditing || serviceIDEditing !== service.id ? (
                  <>
                    <TableCell className="font-medium">
                      {service.name}
                    </TableCell>
                    <TableCell>
                      {Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(+service.price)}
                    </TableCell>
                    <TableCell>{service.imageUrl}</TableCell>
                    <TableCell>{service.description}</TableCell>
                    <TableCell>
                      <ButtonsCard
                        serviceIDEditing={serviceIDEditing}
                        editService={editService}
                        isEditing={isEditing}
                        handleSubmit={handleSubmit}
                        service={service}
                      />
                      <Button
                        size="icon"
                        className="w-[18px] h-[18px] ml-2"
                        variant="outline"
                        onClick={() => handleDelete(service.id)}
                      >
                        <Trash scale="1.05" size="16px" />
                      </Button>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell className="font-medium">
                      <Input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        step={0.01}
                        name="price"
                        min="0.01"
                        value={form.price}
                        onChange={handleChange}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        name="imageURL"
                        value={form.imageUrl}
                        onChange={handleChange}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                      />
                    </TableCell>
                    <TableCell>
                      <ButtonsCard
                        serviceIDEditing={serviceIDEditing}
                        service={service}
                        editService={editService}
                        isEditing={isEditing}
                        handleSubmit={handleSubmit}
                      />
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {ratings && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quantidade</TableHead>
              <TableHead>Avaliação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ratings.map((rating) => (
              <TableRow key={rating.id}>
                <TableCell className="font-medium">{ratings.length}</TableCell>
                <TableCell>{rating.rating}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {bookings && (
        <Table className="max-sm:text-xs">
          <TableHeader>
            <TableRow className="text-center ">
              <TableHead className="w-[100px]">Nome</TableHead>
              <TableHead className="">Data e Hora</TableHead>
              <TableHead>Serviço</TableHead>

              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking, index) => (
              <TableRow
                className={checkDate(booking.date) ? "" : "text-gray-500"}
                key={booking.id}
              >
                <TableCell className="font-medium">
                  {returnBookings[index]?.user?.name}
                </TableCell>
                <TableCell>
                  {booking.date.toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </TableCell>
                <TableCell>{returnBookings[index]?.service?.name}</TableCell>
                <TableCell>
                  <Button
                    size="icon"
                    className="w-[18px] h-[18px] ml-4"
                    variant="outline"
                    onClick={() => handleDelete(undefined, booking.id)}
                  >
                    <Trash scale="1.05" size="16px" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </CardContent>
  );
};

export default CardContentAdmin;
