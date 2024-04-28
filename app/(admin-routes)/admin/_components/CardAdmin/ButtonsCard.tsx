import { Button } from "@/app/_components/ui/button";
import { Service } from "@prisma/client";
import { Check, Edit, Trash, X } from "lucide-react";

interface ButtonCardProps {
  isEditing: boolean;
  service: Service;
  serviceIDEditing: string;
  editService: (value: Service) => void;
  handleSubmit: (value: string) => void;
}

const ButtonsCard = ({
  isEditing,
  editService,
  service,
  serviceIDEditing,
  handleSubmit,
}: ButtonCardProps) => {
  return (
    <>
      {isEditing && serviceIDEditing === service.id ? (
        <>
          <Button
            size="icon"
            className="w-[18px] h-[18px]"
            variant="outline"
            onClick={() => handleSubmit(service.id)}
          >
            <Check scale="1.05" size="16px" />
          </Button>
          <Button
            size="icon"
            className="w-[18px] h-[18px]"
            variant="outline"
            onClick={() => editService(service)}
          >
            <X scale="1.05" size="16px" />
          </Button>
        </>
      ) : (
        <>
          <Button
            size="icon"
            className="w-[18px] h-[18px]"
            variant="outline"
            onClick={() => editService(service)}
          >
            <Edit scale="1.05" size="16px" />
          </Button>
          
        </>
      )}
      
    </>
  );
};

export default ButtonsCard;
