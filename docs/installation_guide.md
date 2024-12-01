# Guia de Instalação

## Pré-requisitos para rodar

- Carregar um servidor, de preferencia o Apache por meio do XAMPP/LAMPP.

- Carregar o Schema do banco de dados MySQL, de preferencia pelo phpMyAdmin.

- Criar um arquivo de variáveis de ambiente na pasta `config/` chamado `.env`, seguindo o exemplo do arquivo `config/.env.example`.

- Instalar os módulos necessários com o comando `npm install`

- Rodar o script `npm run dev:l` (se estiver usando LAMPP), ou `npm run dev:w` (se estiver usando WAMPP).

- Abrir o projeto no seu navegador favorito.

## Windows

Pré-requisitos:
- XAMPP/WAMPP instalado.
- NodeJS e NPM instalados.
- Conhecimento básico com Shell/CLI (CMD do Windows).
- Conhecimento básico com phpMyAdmin.
- Ter a pasta do projeto em sua máquina, seja baixando o `.zip` ou usando o comando `git clone https://github.com/neoRandom/quickmart-website.git`. Veja a `Nota 2` dessa seção.

Passo a Passo:
- Iniciar o Apache e o MySQL por meio do Painel de Controle do XAMPP.
- Carregar o Banco de Dados no phpMyAdmin.
  - Primeiro o *Schema* (estrutura) do arquivo (`./database/schema.sql`).
  - Em seguida, os registros (dados) do arquivo (`./database/data.sql`). (**opcional**)
- Configurar um arquivo `.env` (variáveis de ambiente) na pasta `config/`, se baseando no arquivo de exemplo `.env.example`.
- Instalar os módulos do Node usando o comando `npm install`.
- Executar o comando principal de execução (Windows) `npm run dev:w`.
- Abrir em um navegador a URL `http://localhost/quickmart/public/admin` [link](http://localhost/quickmart/public/admin).

> Nota 2: Não é necessário baixar o projeto na pasta `htdocs`, pois o comando principal de execução já adiciona todos os arquivos necessários para o website na pasta `htdocs/quickmart`.

## Linux

TODO
