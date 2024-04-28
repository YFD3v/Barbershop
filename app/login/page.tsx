"use server";
import FormLogin from "./_components/FormLogin";
import { fetchUsers } from "../_actions/handleUsers";

const Login = async () => {
  const users = await fetchUsers();

  return (
    <div className="flex flex-col p-6 justify-center w-full h-full">
      <div className="my-5 text-center">
        <h1 className="text-5xl font-bold text-primary spacing tracking-wider uppercase">
          Barbershops Yan
        </h1>
      </div>
      <div>
        <h2 className="text-xl my-3">Login</h2>
        <FormLogin users={users} />
      </div>
    </div>
  );
};

export default Login;
