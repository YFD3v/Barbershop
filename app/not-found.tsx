import Link from "next/link";

const NotFound = () => {
  return (
    <div className="w-full h-[100vh] flex items-center gap-6 justify-center">
      <h2 className="text-2xl">Página não encontrada</h2>
      <Link className=" underline text-sm text-slate-400" href="/">
        Volte para home
      </Link>
    </div>
  );
};

export default NotFound;
