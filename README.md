# Projeto TFC - Site Informativo sobre Partidas e Classificações de Futebol

O Projeto TFC é um site informativo sobre partidas e classificações de futebol. Este README contém informações sobre a estrutura do projeto, configurações e como executar as diferentes partes do projeto.

Lembrando que esse projeto foi desenvolvido como parte da formação do curso de Desenvolvedor Fullstack da Trybe.
## Estrutura do Projeto

O projeto é composto por quatro entidades importantes:

1. **Banco de Dados (db):**
   - Um container Docker MySQL configurado no docker-compose.
   - Fornecerá dados para o serviço de backend.
   - Pode ser acessado via `sequelize` e através da porta `3002` do `localhost`.
   - Você pode conectar a um Cliente MySQL (por exemplo, Workbench, Beekeeper, DBeaver) usando as credenciais configuradas no docker-compose no serviço `db`.

2. **Back-end (backend):**
   - Deve rodar na porta `3001`, pois o front-end faz requisições para ele por padrão.
   - A aplicação deve ser inicializada a partir do arquivo `app/backend/src/server.ts`.
   - Certifique-se de que o Express está em execução e a aplicação ouve a porta definida nas variáveis de ambiente.
   - Todas as dependências extras, como `joi`, `boom`, `express-async-errors`, devem ser listadas em `app/backend/packages.npm`.

3. **Front-end (frontend):**
   - Os testes a partir do requisito de login usam o `puppeteer` para simular uma pessoa acessando o site `http://localhost:3000/`.
   - O front-end se comunica com o serviço de back-end pela URL `http://localhost:3001` através dos endpoints que devem ser construídos nos requisitos.

4. **Docker:**
   - O `docker-compose` unifica todos os serviços conteinerizados (backend, frontend e db) e inicia o projeto completo com o comando `npm run compose:up`.
   - É necessário configurar corretamente os `Dockerfiles` nas raízes do front-end e back-end para inicializar a aplicação.

## Configuração Inicial

Antes de executar o projeto, certifique-se de ter o Docker instalado e configurado em seu sistema.

## Executando o Projeto

Para executar o projeto completo, siga estas etapas:

1. Clone o repositório do projeto:

```bash
git clone https://seu-repositorio.git
cd seu-repositorio
