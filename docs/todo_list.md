# Todo list

- [x] Configurações iniciais
    - [x] Criação da estrutura de pastas
    - [x] Adição do Node (NPM) no projeto
    - [x] Adição e configuração do TailwindCSS, PostCSS e autoprefixer
    - [x] Adição e configuração do TypeScript (compilador)
    - [x] Adição de um arquivo de exemplo para as variáveis de ambiente


- [ ] Scripts
    - [ ] Bash
        - [x] Iniciar o XAMPP
        - [ ] Carregar os arquivos do banco de dados para o phpMyAdmin 
        - [x] Carregar o projeto para a pasta `htdocs`
        - [ ] Deletar o projeto da pasta `htdocs`
    - [ ] Node
        - [x] Compilação do TypeScript
        - [x] Compilação do TailwindCSS
        - [x] Compilação geral
        - [x] Carregar o projeto para a pasta `htdocs` (wrapper)
        - [x] Script principal/geral para execução do projeto
        - [ ] Script principal/geral para configuração dos pré-requisitos


- [x] Banco de Dados
    - [x] Criação da estrutura (schema)
    - [x] Criação dos dados (data)


- [x] Back-end
    - [x] Autoloader
    - [x] Controllers
        - [x] Main
            - [x] Carregar página
            - [x] Carregar login
        - [x] Admin
            - [x] Wrapper para requisições
            - [x] POST
                - [x] Login
                - [x] Inserção
                - [x] Alteração
                - [x] Exclusão
                - [x] Criar usuário
            - [x] GET
                - [x] Login
                - [x] Logout
                - [x] Dashboard
                - [x] Metadados
                - [x] Registros
    - [x] Database (classe de Conexão)
        - [x] Criação da estrutura Singleton
        - [x] Execução de DQL
        - [x] Execução de DML
        - [x] Listagem de classes
        - [x] Envio de metadados
        - [x] Envio de registros
    - [x] Model (classes de modelagem)
        - [x] Definição do modelo base (superclass)
        - [x] Criação das classes para as 18 tabelas
    - [x] Utilities (classes para lidar com)
        - [x] Autenticação
            - [x] Cliente
            - [x] Administrador
        - [x] Hash e salt
        - [x] JSON Web Tokens (JWT)
            - [x] Criar Token
            - [x] Verificar Token
        - [x] Dados de uma requisição POST


- [ ] Front-end
    - [ ] Assets
        - [ ] Pegar imagens e vetores
            - [x] Logo do QuickMart
            - [x] Banners do QuickMart
            - [ ] Banners de divulgação e anúncios
            - [x] Ícones para botões
        - [x] Compilar arquivos da pasta `resources`
    - [x] TypeScript
        - [x] Definição dos `class`, `type`, `interface` e `enum` necessários
        - [x] Renderizador de HTML
            - [x] Renderizador geral de elementos
            - [x] Renderizador de notificações
        - [x] Criação dos modais
        - [x] Criação dos componentes
        - [x] Dashboard
            - [x] Base de requisições
            - [x] Pesquisa e listagem de registros
            - [x] POST de Inserção (Geral)
            - [x] POST de Inserção (Credenciais)
            - [x] POST de Alteração
            - [x] POST de Exclusão
    - [x] TailwindCSS/CSS
        - [x] Definição das variáveis (cores, tamanhos etc.)
        - [x] Estilização da barra de rolagem (scroll)
        - [x] Modificação da estilização padrão de tags necessárias
        - [x] Criação dos componentes de estilização
    - [x] Dashboard
        - [x] Modais
            - [x] Inserção
                - [x] Geral
                - [x] De Credenciais
            - [x] Alteração
                - [x] Em linha
                - [x] Em modal
            - [x] Exclusão
            - [x] Header
                - [x] Desenvolvedores
                - [x] Suporte / Fale Conosco
        - [x] Renderizador da tabela
            - [x] Metadados
                - [x] Estrutura
                - [x] Pesquisa
            - [x] Dados
                - [x] Registros
                - [x] Ações
                - [x] Paginação
    - [x] Login
        - [x] Principal
        - [x] Credenciais incorretas
        - [x] Sem autorização


- [x] Public
    - [x] Definir os endpoints
    - [x] Configurar os endpoints


- [x] Testes
    - [x] Endpoints (Postman)
    - [x] CRUD
    - [x] Estados
    - [x] Renderização dinâmica
    - [x] Modais
    - [x] Exclusão de dados
    - [x] Modificação de dados
