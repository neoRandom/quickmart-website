# QuickMart Website - Projeto Multiplataforma

> "Não importa a aparência do carro, sem um bom motor ele só serve para impressionar quem vê sua garagem"

O **QuickMart** Website é um dos dois sistemas para o projeto interdisciplinar da Feira Tecnológica da Etec da Zona Leste (2024), que tem como objetivo criar um sistema multiplataforma para uma empresa fictícia.

Meu objetivo principal foi desenvolver um sistema de forma profissional, visando utilizar as técnicas e tecnologias necessárias para tal, além de um código limpo, escalável e legível. Tenho como meta um sistema seguro, escalável, profissional e de fácil manutenção.

Link para o outro sistema do projeto interdisciplinar: [Projeto Minimercado](https://github.com/neoRandom/projeto-minimercado)

## Sumário

- [Guia de instalação](#guia-de-instala%C3%A7%C3%A3o)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Documentação](#documenta%C3%A7%C3%A3o)
- [Diferenciais](#diferenciais)
- [To-do list](#lista-de-funcionalidades-to-do-list)
- [Desenvolvedores](#desenvolvedores)
- [Licença](#licen%C3%A7a)

## Guia de instalação

Este guia de instalação é para usuários de Windows.

> Nota 1: O projeto foi feito majoritariamente em Linux, para ver o guia de instalação para Linux, clique [aqui](docs/installation_guide.md#linux).

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

## Tecnologias Utilizadas

<img src="https://skillicons.dev/icons?i=html,css,js,ts,tailwind,php,mysql,npm,figma,bash,postman" />

> - Figma: Design das páginas.
> - Bash: Scripts para automação.
> - Postman: Teste dos endpoints e requisições.
> - XAMPP (não incluído na lista visual): *Server Tech Stack* utilizado no desenvolvimento.

## Documentação

Os diagramas relacionados ao Banco de Dados podem ser encontrados [aqui](/). (Link incompleto)

Grande parte do funcionamento do sistema já é descrito no próprio código (com *Self-Documenting Code*, *Docstrings*, entre outros), mas uma visão completa pode ser encontrada na pasta [docs](docs/index.md), clique para saber mais.

Entre os elementos da documentação, estão incluidos:
- Descrição do projeto (features e diferenciais)
- Guia de instalação
- Estrutura de pastas (baseado em Laravel)
- Arquitetura geral
- Utilização das tecnologias
- *To-do list* completa
- Fluxo do código
- Lista de *endpoints*
- Protocolos de segurança
- Referências de estudo

## Diferenciais

> Para ver a lista completa, clique [aqui](docs/unique_features.md).

> Nota: Essa lista é principalmente em relação a outros trabalhos da mesma Feira Tecnológica, não refletindo práticas comuns no mercado (autenticação com hash e salt, por exemplo).

- Scripts (tanto para Windows quanto Linux) para desenvolvimento mais dinâmico.
- Renderizador de HTML baseado em TypeScript (mini-micro-framework pessoal).
- Sistema de requisições baseado em *endpoints*.
- Uso de *environment variables* (.env) para segurança de dados do servidor.
- Uso de *hash* (SHA256) e *salt* (random unsigned 32-bits number) para as credenciais.
- Uso de *JSON Web Tokens* (JWT) para manter a sessão do usuário.
- Para fins de aprendizado, o código de todos os componentes foram manualmente feitos do zero.

## Lista de funcionalidades (To-do list)

> Para ver a lista completa, clique [aqui](docs/todo_list.md).

- [x] Banco de Dados
    - [x] Criação da estrutura (schema)
    - [x] Criação dos dados (data)

- [x] Back-end
    - [x] Autoloader
    - [x] Controllers
    - [x] Database (classe de Conexão)
    - [x] Model (classes de modelagem)
    - [x] Utilities (classes para lidar com)

- [ ] Front-end
    - [ ] Assets
    - [x] TypeScript
    - [x] TailwindCSS/CSS
    - [x] Dashboard
    - [x] Login

- [x] Public
    - [x] Definir os endpoints
    - [x] Configurar os endpoints

- [x] Testes

## Licença

Esse repositório atualmente não possui licenças externas.
