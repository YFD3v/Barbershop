Utiliando o prisma como ORM ao invés do sequelize

1. Passo instalando o prisma npm i prisma --D
   1.1 npx prisma init --datasource-provider postgresql (Dizendo que vamos utiliar o PG)
   1.2 Foi configura o aplicativo schema.prisma em seguida foi criado a migrate com
   npx prisma migrate dev --name add_initial_tables
