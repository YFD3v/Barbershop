import FormRegister from "./_components/FormRegister";

const Register = async () => {

  return (
    <div className="flex flex-col p-6 justify-center w-full h-full">
      <div className="my-5 text-center">
        <h1 className="text-5xl font-bold text-primary spacing tracking-wider uppercase">
          Barbershops Yan
        </h1>
      </div>
      <div>
        <h2 className="text-xl my-3">Registre-se</h2>
        <FormRegister />
      </div>
    </div>
  );
};

export default Register;
