
import { db } from "../_lib/prisma";

export const fetchUsers = async () => {
  return await db.user.findMany();
};

export const createUser = async (email: string, username: string) => {
  const users = await fetchUsers();
  const user = users.find(
    (user) => user.email === email && user.name === username
  );
  if (user) {
    console.log("esse user existe");
    return false;
  }
  await db.user.create({ data: { name: username, email } });
  console.log("criado");
  return true;
};
