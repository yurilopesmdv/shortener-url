# 🔗 URL Shortener API

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=prisma&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=white)

## 📝 Descrição do Projeto

Este projeto é uma **API REST robusta e escalável** para encurtamento de URLs, desenvolvida com **NestJS** (Node.js framework) e **PostgreSQL**. O sistema permite que usuários **encurtem URLs** de forma simples, com ou sem autenticação, e oferece funcionalidades avançadas de **gerenciamento de URLs** para usuários autenticados, incluindo listagem, edição e exclusão lógica.

A aplicação foi desenvolvida seguindo os princípios de uma API REST madura (Maturidade 2), com foco em:

* **Autenticação JWT** para acesso seguro.
* **Validação de entrada** rigorosa em todos os endpoints.
* **Contabilização de cliques** para cada URL encurtada.
* **Exclusão lógica** de registros, mantendo a integridade dos dados.
* **Documentação interativa** com Swagger (OpenAPI).
* **Ambiente de desenvolvimento padronizado** com Docker Compose.

---

## 🚀 Funcionalidades Principais

* **Encurtamento de URL:**
    * Endpoint único para encurtar URLs.
    * Aceita requisições **com e sem autenticação**.
    * Se autenticado, a URL é vinculada ao usuário.
    * Geração de códigos curtos de **6 caracteres**.
* **Autenticação de Usuários:**
    * Cadastro de novos usuários (`/auth/register`).
    * Login com e-mail e senha, retornando um **Bearer Token (JWT)** (`/auth/login`).
* **Gerenciamento de URLs (para Usuários Autenticados):**
    * **Listar:** Visualizar todas as URLs encurtadas pelo usuário, incluindo a contagem de cliques.
    * **Editar:** Alterar a URL original de um código curto específico.
    * **Excluir:** Realiza uma exclusão lógica, tornando a URL inacessível e inoperável.
* **Redirecionamento Inteligente:**
    * Endpoint dedicado para redirecionar um código curto para a URL original, **contabilizando cada acesso**.

---

## 🛠️ Tecnologias Utilizadas

* **Backend:**
    * [Node.js](https://nodejs.org/): Plataforma de execução.
    * [NestJS](https://nestjs.com/): Framework progressivo para Node.js (construção de APIs REST).
    * [TypeScript](https://www.typescriptlang.org/): Linguagem de programação tipada.
    * [Prisma ORM](https://www.prisma.io/): ORM moderno e type-safe para interações com o banco de dados.
    * [Class-validator](https://github.com/typestack/class-validator): Validação de dados robusta e declarativa.
    * [Passport.js](http://www.passportjs.org/): Middleware de autenticação para Node.js (com estratégia JWT).
    * [nanoid](https://github.com/ai/nanoid): Gerador de IDs pequenos, seguros e únicos.
* **Banco de Dados:**
    * [PostgreSQL](https://www.postgresql.org/): Banco de dados relacional robusto.
* **Ferramentas de Desenvolvimento:**
    * [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/): Para orquestração do ambiente de desenvolvimento.
    * [Swagger (OpenAPI)](https://swagger.io/): Para documentação interativa da API.

---

## ⚙️ Configuração do Ambiente Local

Este projeto utiliza Docker Compose para um ambiente de desenvolvimento isolado e fácil de configurar.

### Pré-requisitos

* [Docker Desktop](https://www.docker.com/products/docker-desktop) (inclui Docker Engine e Docker Compose).
* [Node.js](https://nodejs.org/en/download/) (LTS, preferencialmente a última versão estável) e [npm](https://www.npmjs.com/) (gerenciador de pacotes).

### Passos para Rodar a Aplicação

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/yurilopesmdv/shortener-url.git](https://github.com/yurilopesmdv/shortener-url.git)
    cd seu-projeto-url-shortener
    ```

2.  **Crie o arquivo de variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do projeto (mesmo nível do `docker-compose.yml`) com as seguintes variáveis:

    ```env
    # Variáveis de Ambiente
    DATABASE_URL="postgresql://postgres:postgres@postgres:5432/urlshortener"
    JWT_SECRET="SEGREDO_SUPER_SECRETO_E_FORTE_PARA_JWT" # Altere para uma string aleatória forte
    BASE_URL="http://localhost:3000"
    PORT=3000
    ```
    **Observação:**
    * A `DATABASE_URL` deve apontar para o serviço de banco de dados do Docker Compose.
    * `JWT_SECRET` é crucial para a segurança dos tokens.
    * `BASE_URL` é usado para gerar as URLs encurtadas completas.

3.  **Instale as dependências Node.js:**

    ```bash
    npm install
    ```

4.  **Inicie os serviços com Docker Compose:**
    Este comando irá construir as imagens Docker, subir o contêiner do PostgreSQL e o contêiner da sua aplicação NestJS.

    ```bash
    docker-compose up --build -d
    ```


5.  **Verifique se a aplicação está rodando:**
    Você deverá ver logs indicando que a aplicação NestJS está ouvindo na porta `3000`.

    ```bash
    docker-compose logs -f app
    ```

---

## 📚 Documentação da API (Swagger/OpenAPI)

A documentação interativa da API está disponível no endpoint Swagger.

* **URL:** `http://localhost:3000/api`

Você pode usar esta interface para explorar todos os endpoints disponíveis, entender os modelos de dados (DTOs), testar requisições e visualizar respostas.

---

## 🎯 Endpoints da API

A API está acessível em `http://localhost:3000`.

### Autenticação (`/auth`)

* **`POST /auth/register`**: Registra um novo usuário.
    * **Body:** `RegisterDto` (email, password)
* **`POST /auth/login`**: Realiza o login, retornando um token JWT.
    * **Body:** `LoginDto` (email, password)
    * **Response:** `{ "access_token": "..." }`

### Gerenciamento de URLs (`/url`)

* **`POST /url`**: Encurta uma URL.
    * **Body:** `CreateUrlDto` (originalUrl)
    * **Auth:** Opcional (se fornecido, a URL é associada ao usuário).
    * **Response:** `{ "originalUrl": "...", "shortUrl": "...", "shortCode": "..." }`
* **`GET /url`**: Lista todas as URLs encurtadas pelo usuário autenticado.
    * **Auth:** Obrigatório (Bearer Token JWT).
* **`PATCH /url/:id`**: Atualiza a URL original de um código curto específico.
    * **Path Params:** `id` (ID numérico da URL)
    * **Body:** `UpdateUrlDto` (originalUrl)
    * **Auth:** Obrigatório (Bearer Token JWT).
* **`DELETE /url/:id`**: Exclui logicamente uma URL encurtada.
    * **Path Params:** `id` (ID numérico da URL)
    * **Auth:** Obrigatório (Bearer Token JWT).

### Redirecionamento de URL (`/`)

* **`GET /:shortCode`**: Redireciona um código curto para a URL original e contabiliza o clique.
    * **Path Params:** `shortCode` (o código curto de 6 caracteres)
    * **Auth:** Não requer autenticação.

---

## 📈 Escalabilidade Vertical e Considerações Futuras

O projeto foi construído com NestJS, que é um framework Node.js que por padrão utiliza um modelo single-threaded, beneficiando-se da escalabilidade vertical (aumento de recursos na mesma máquina). O uso de um ORM como Prisma otimiza as interações com o banco de dados.

Para uma **escalabilidade horizontal** (distribuir a carga entre múltiplas instâncias), alguns pontos de melhoria futuros incluem:

* **Gerenciamento de Sessão/Token Distribuído:** Se fosse além do JWT (que é stateless), um Redis seria necessário.
* **Balanceamento de Carga:** Utilizar um Load Balancer (ex: Nginx, AWS ALB) para distribuir requisições entre múltiplas instâncias da API.
* **Filas de Mensagens (Message Queues):** Para operações demoradas (ex: processamento assíncrono de URLs, notificação), o uso de RabbitMQ ou Kafka pode desacoplar e escalar processos.
* **Otimização do Banco de Dados:** Além do Prisma, índices otimizados, particionamento e réplicas de leitura para PostgreSQL.
* **Geração de ShortCode:** Para evitar colisões em grande escala, poderia-se considerar algoritmos de geração de IDs distribuídos ou serviços dedicados.

---

## ✅ Pontos de Destaque e Boas Práticas

* **Docker Compose:** Facilita a configuração e padronização do ambiente de desenvolvimento.
* **Validação de Entrada:** Uso de `class-validator` e `ValidationPipe` global para garantir a integridade dos dados recebidos.
* **Autenticação JWT:** Implementação padrão e segura para autenticação de usuários.
* **Organização de Código:** Estrutura modular do NestJS (`app.module`, `auth.module`, `url.module`, `database.module`, `redirect.module`) para clareza e manutenção.
* **Princípios SOLID & DRY:** Código modular e reutilizável, seguindo boas práticas de design.
* **Deleção Lógica:** Garantia da persistência histórica dos dados.
* **Tratamento de Exceções:** Lançamento de `HttpException` para respostas de erro padronizadas e claras.

---

## 👨‍💻 Contato

Se tiver alguma dúvida ou sugestão sobre o projeto, sinta-se à vontade para entrar em contato:

* **Nome:** Yuri Lopes
* **GitHub:** [yurilopesmdv](https://github.com/yurilopesmdv)
* **Email:** [contato.yurilopesm@gmail.com](mailto:contato.yurilopesm@gmail.com)

---