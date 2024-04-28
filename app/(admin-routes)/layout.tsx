
import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
interface PrivateLayoutProps {
  children: ReactNode;
}

const PrivateLayout = async ({ children }: PrivateLayoutProps) => {
  const session = cookies().get("session");
  if (!session) return redirect("/login");

  return <>{children}</>;
};

export default PrivateLayout;
