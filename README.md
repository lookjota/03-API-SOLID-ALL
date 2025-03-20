    
###  Bibliotecas


### Test Environment

- testes end to end e2e
- isolado
- minima ou ate zero de interferencia de outros testes
que executaram antes dele
  ex: 
    um teste que criou um usuario, nao pode afetar um outro teste
- o usuario que criamos no primeiro teste nao pode aparecer no proximo teste

- esse processo de ter um banco limpo a cada teste executado eh mais penoso
- comecamos a ter q colocar na balanca ate onde isso vai ser proveitoso pra gente ou nao 

- precisamos fazer escolhas de performance e efetividade
- quando criamos um arquivo e dentro desse arquivos, temos varios testes 
- temos uma swtich de testes separados das demais

- se ao inves de criar um ambiente isolado para cada um desses testes
- eu criar na verdade um ambiente isolado no meu banco de dados para cada
swtich de testes
- com isso temos mais performance e podemos evitar que algo que eu criei dentro do teste
atrapalhe outro teste

- dentro do vitest tem varias formas de criarmos testes 

# test Environment
  - o teste Environment eh basicamente uma configuracao, de ambiente para alguns tipos
  de terstes especifico  

  - podemos configurar as variaveis ambiente, para apenas arquivos de testes especificos
ex: todos os testes que estiverem dentro desta pasta, eu quero que usem esse Environment
 - dentro desse ambiente podemos configurar umas coisas 
 ex: executar migrates do banco dde ddados 


- o vitest por ser uma ferramenta nova
ele ainda nao tem opcao para criar environments dentro do nosso projeto

- agente so pode utilizar um environment diferente se agente criar um pacote
npm que tenha o nome vitest-environment - alguma coisa

## com esse comando vamos criar para esse package
como se fosse um repositorio de pacotes local nessa maquina
C:\Users\lookj\Documents\Project\Nodejs\store\03-API-SOLID-ALL\prisma\vitest-environment-prisma>
$ npm link

- agora conseguir voltar na nossa aplicacao instalar esse package
que eu criei o link na minha aplicacao global

C:\Users\lookj\Documents\Project\Nodejs\store\03-API-SOLID-ALL\
$ npm link vitest-environment-prisma

## JWT

Modelo de antenticacao,
Verificar modelo, aula anterior

Vamos implementar a parte de autenticacao na aplicacao 

eh um modelo de autenticacao utilizado principalmente, 
em 99% dos casos de uso, para as rotas http

ou seja quando eu tenho por ex uma aplicacao front-end
e quer se comunicar com o meu back-end.
Se eu tenho algum outro tipo de comunicacao com a minha aplicacao
ex:
  Eu quero integrar a minha apliacacao com uma aplicacao externa
  - aplicacao de um terceiro
  <> Nesse caso o JwT nao seja melhor opcao </>

  Exitem varios metodos de autenticacao
  temos:
   - Api token 
   - api oauth

- JWT vamos usa-lo somente para rotas da nossa aplicacao 
- sao a rotas que vamos expor para o front-end consumir
- Essa parte de Token de JWT, ela vai estar toda exclusiva, dentro da camada http
da nossa aplicacao, ou seja
 Dentro da parte dos controlers
- Nao vou ter nada relacionado a autenticacao, dentro dos caso de uso 
- pq os casos de uso sao as funcionalidades mais puras da nossa aplicacao
- desconectadas do seu meio externo 
por ex:
  - o caso de uso de criacao de uma academia create-gym.ts
  - nao faz sentido ele ter informacoes ou ele determinar ou estar ligado
  especificamente a uma forma de ele criar academias
  - Nao interessa pro caso de uso se a academia esta sendo criada, atravez do front-end
  ou do aplicativo mobile,
  ou integracao com o sistema de academia 
  ou integracao com o sistema da prefeitura
  ou quando uma academia eh registrada no cnpj, cria uma academia no nossso sistema
  - O Caso de uso esta desconectado do mundo externo
  - o caso de uso eh funcionalidade pura, 
  - eh o requisito, eh a regra de negocio
  Por isso tudo que for do meio externo, 
  que sao restricoes para que esse caso de uso seja chamado, seja acessivel
  sempre vai ficar nas camadas mais externas 
  - nao vamos colocar criacao, de jwt ou qualquer coisa assim
  - dentro do caso de uso
  pq se um dia ele for utilizado fora do contexto, de http de uma rota do front end,
  o jwt ali ficara inutil, nao ira servir pra nada, ou ate vai atrabalhar

  - toda a parte HTTP vai ficar na parte JWT da applicacao 
  - como estamos usando o fastify
  - tem um modulo que eh o fastify JWT

  ### Fastify JWT
  - integra toda a parte de geracao de token do JWT de uma maneira muito simples pra gente

  <Install>
  $ npm i @fastify/jwt

  - para configurar ele vamos configruar app.ts
  $
  app.ts
  export const app = fastify()
  app.register(fastifyJwt)

## jwtVerify() - uma function
  - Essa funcao faz duas coisas
  1- Buscar o token dentro dos cabecalhos
  2- vai validar se esso token realmente foi gerado 


    


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


### install dependencies supertest 

  $ npm i supertest -D
  $ npm i @types/supertest -D

# App
GymPass style app.


## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter o seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas;
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;


## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após ser criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;


## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
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