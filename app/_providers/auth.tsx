import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
console.log(typeof SessionProvider);
const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
