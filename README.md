Utiliando o prisma como ORM ao invés do sequelize

1. Passo instalando o prisma npm i prisma --D
   1.1 npx prisma init --datasource-provider postgresql (Dizendo que vamos utiliar o PG)
   1.2 Foi configura o aplicativo schema.prisma em seguida foi criado a migrate com
   npx prisma migrate dev --name add_initial_tables
2. Criei a seed manualmente na pasta prisma 
2.1 Instalei o ts-node -D e coloquei uma chave "prisma" no package.json
2.2 Executei npx prisma db seed
3. Instalei o shadcnUi - npx shadcn-ui@latest init


#Basicamente na aula 1 foi feito o banco de dados, tabelas, população de tabelas e homePage


Parte 2




npx prisma studio 