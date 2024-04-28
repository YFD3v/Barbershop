"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../_components/ui/form";
import { Input } from "../../_components/ui/input";
import { z } from "zod";
import { Button } from "@/app/_components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

interface LoginProps {
  defaultValues?: z.infer<typeof formSchema>;
  users: User[];
}

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  email: z
    .string()
    .min(1, { message: "This filed has to be filled." })
    .email("This is not a valid email."),
});

const FormLogin = ({ defaultValues, users }: LoginProps) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    //Se tiver ownsBarbershops, continua caso contrário redireciona para register.
    try {
      const user = users.find(
        (user) => user.email === data.email && user.name === data.username
      );
      if (user) {
        const response = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          body: JSON.stringify({
            email: data?.email,
            username: data?.username,
          }),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          toast.success("Logado com sucesso!");
          router.push("/admin");
        } else {
          const data = await response.json();
          console.error("Error creating user: ", data.error);
        }
      } else {
        form.reset({ username: "", email: "" });
        toast.error("Username or email is incorrect");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  );
};

export default FormLogin;
