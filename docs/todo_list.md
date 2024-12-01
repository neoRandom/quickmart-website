# Todo list

- [ ] Configurações iniciais
    - [ ] Criação da estrutura de pastas
    - [ ] Adição do Node (NPM) no projeto
    - [ ] Adição e configuração do TailwindCSS, PostCSS e autoprefixer
    - [ ] Adição e configuração do TypeScript (compilador)
    - [ ] Adição de um arquivo de exemplo para as variáveis de ambiente


- [ ] Scripts
    - [ ] Bash
        - [ ] Iniciar o XAMPP
        - [ ] Carregar os arquivos do banco de dados para o phpMyAdmin 
        - [ ] Carregar o projeto para a pasta `htdocs`
        - [ ] Deletar o projeto da pasta `htdocs`

    - [ ] Node
        - [ ] Compilação do TypeScript
        - [ ] Compilação do TailwindCSS
        - [ ] Compilação geral
        - [ ] Carregar o projeto para a pasta `htdocs` (wrapper)
        - [ ] Script principal/geral para execução do projeto
        - [ ] Script principal/geral para configuração dos pré-requisitos


- [ ] Banco de Dados
    - [ ] Criação da estrutura (schema)
    - [ ] Criação dos dados (data)


- [ ] Back-end
    - [ ] Autoloader
    - [ ] Controllers
        - [ ] Main
            - [ ] Carregar página
            - [ ] Carregar login
        
        - [ ] Admin
            - [ ] Wrapper para requisições
            - [ ] POST
                - [ ] Login
                - [ ] Inserção
                - [ ] Alteração
                - [ ] Exclusão
                - [ ] Criar usuário
            - [ ] GET
                - [ ] Login
                - [ ] Logout
                - [ ] Dashboard
                - [ ] Metadados
                - [ ] Registros
    - [ ] Database (classe de Conexão)
        - [ ] Criação da estrutura Singleton
        - [ ] Execução de DQL
        - [ ] Execução de DML
        - [ ] Listagem de classes
        - [ ] Envio de metadados
        - [ ] Envio de registros
    - [ ] Model (classes de modelagem)
        - [ ] Definição do modelo base (superclass)
        - [ ] Criação das classes para as 18 tabelas
    - [ ] Utilities (classes para lidar com)
        - [ ] Autenticação
            - [ ] Cliente
            - [ ] Administrador
        - [ ] Hash e salt
        - [ ] JSON Web Tokens (JWT)
            - [ ] Criar Token
            - [ ] Verificar Token
        - [ ] Dados de uma requisição POST


- [ ] Front-end
    - [ ] Assets
        - [ ] Pegar imagens e vetores
            - [ ] Logo do QuickMart
            - [ ] Banners do QuickMart
            - [ ] Banners de divulgação e anúncios
            - [ ] Ícones para botões
        - [ ] Compilar arquivos da pasta `resources`

    - [ ] TypeScript
        - [ ] Definição dos `class`, `type`, `interface` e `enum` necessários
        - [ ] Renderizador de HTML
            - [ ] Renderizador geral de elementos
            - [ ] Renderizador de notificações
        - [ ] Criação dos modais
        - [ ] Criação dos componentes
        - [ ] Dashboard
            - [ ] Base de requisições
            - [ ] Pesquisa e listagem de registros
            - [ ] POST de Inserção (Geral)
            - [ ] POST de Inserção (Credenciais)
            - [ ] POST de Alteração
            - [ ] POST de Exclusão

    - [ ] TailwindCSS/CSS
        - [ ] Definição das variáveis (cores, tamanhos etc.)
        - [ ] Estilização da barra de rolagem (scroll)
        - [ ] Modificação da estilização padrão de tags necessárias
        - [ ] Criação dos componentes de estilização

    - [ ] Dashboard
        - [ ] Modais
            - [ ] Inserção
                - [ ] Geral
                - [ ] De Credenciais
            - [ ] Alteração
                - [ ] Em linha
                - [ ] Em modal
            - [ ] Exclusão
            - [ ] Header
                - [ ] Desenvolvedores
                - [ ] Suporte / Fale Conosco
        - [ ] Renderizador da tabela
            - [ ] Metadados
                - [ ] Estrutura
                - [ ] Pesquisa
            - [ ] Dados
                - [ ] Registros
                - [ ] Ações
                - [ ] Paginação
    
    - [ ] Login
        - [ ] Principal
        - [ ] Credenciais incorretas
        - [ ] Sem autorização


- [ ] Public
    - [ ] Definir os endpoints
    - [ ] Configurar os endpoints


- [ ] Testes
    - [ ] CRUD
    - [ ] Estados
    - [ ] Renderização dinâmica
    - [ ] Modais
    - [ ] Exclusão de dados
    - [ ] Modificação de dados
