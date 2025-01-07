    
### start project
   $ npm run start:dev

### start build
  $ npm run build 

### start para producao
  $ 

### Subir banco de dados Docker

  $ docker compose up -d

  - parar container
  $ docker compose stop

  - deleta todos os container
  $ docker compose down


### vitest

  $ npm run test
  $ npm run test:watch

  $ npm run test:coverage

  $ npm run test:ui

### docker config

  $ docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql

- mostrar container rodando
  $ docker ps

- mostra todos os container ja criados
  $ docker ps -a

- start project
  $ docker start api-solid-pg

- stop project
  $ docker stop api-solid-pg

- deletar um container
  $ docker rm api-solid-pg

- mostrar os logs do seu container
  $ docker logs api-solid-pg

- mostrar e manter seguindo os logs
  $ docker logs  api-solid-pg -f



### atualiza o banco de dados
  $ npx prisma migrate dev

- interface grafica do banco de dados prisma studio
- para navegar pelas tabelas de banco de dados 
  $ npx prisma studio

### pega as migration ja criadas e roda elas 
  $ npx prisma migrate deploy


# App
GymPass style app.


## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter o seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;


## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após ser criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;


## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);



#### Passo a passo

### fixando versoes de dependencias
.npmrc

### carregando variaveis ambiente




#### TDD & Mocking

TDD (Test Driven Development) eh uma abordagem de desnvoolvimento de 
software em que os testes sao escritos antes do codigo.
TDD aplicado no desenvolvimento da funcionalidade que valida se um usuario ja realizou check-in no mesmo dia.
Primeiramente sera criado o teste unitaio e em seguida, o codigo sera desenvolvido para que esse teste passe

red, green and Refactor:

Red: Escreve um test que deve falhar, ou seja, ele garante que o teste nao passra sem implementar o codigo necessario

Green: Escreve a quatidade minima de codigo necessaria para fazer o teste passar.

Refactor: apos o teste passar, o desenvolvedor refatora o codigo para melhorar a qualidade, sem alterar seu comportamento

- Mocking trata de datas