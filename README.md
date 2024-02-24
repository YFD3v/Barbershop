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
Foi corrigido a falta da imageUrl no services,  rodou a migrate denovo.
Criou a pagina ed barbershops[id]
Instalei o next-auth e @auth/prisma-adapter
Fiz as atualizações no schema e rodei a migrate

Depois fui no google developer console, criei o projeto do FSW barber
criei a credencial adicionando em Origens Javascript Autorizadas:
http:localhost:3000 //No depoly terá que mudar
E em um URIS de redirecionamento autorizados eu coloquei o que a documentação do next Auth fala http://localhost:3000/api/auth/callback/google
Depois peguei o client id e secret criei uma variavel no env e configurei no route.ts


Mostra as tabelas organizadas
npx prisma studio 

Atualiza o db com o prisma
npx prisma db push