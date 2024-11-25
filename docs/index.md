# Estrutura de pastas:

- `app`: Principais arquivos PHP, utiliza o modelo MVC
    - `controller`: Lógica principal
    - `database`: Lógica relacionada ao banco de dados
    - `middleware`: Códigos a serem executados antes do `controller`
    - `model`: Classes de modelagem
    - `view`: Templates das páginas
- `assets`: Arquivos estáticos a serem usados pelas páginas
- `config`: Arquivos de configuração para o projeto (variáveis de ambiente e scripts)
- `database`: Arquivos SQL, como o Schema do banco de dados, testes e registros
- `docs`: Documentação, como arquivos Markdown e Diagramas
- `public`: Diretório que os usuários devem acessar, os arquivos aqui chamam os controllers que chamam os views
- `resources`: Arquivos estáticos a serem compilados, como o `input.css` do Tailwind (vão para a pasta `assets`)

<br />

# Pré-requisitos para rodar

- Carregar um servidor, de preferencia o Apache por meio do XAMPP/LAMPP.

- Carregar o Schema do banco de dados MySQL, de preferencia pelo phpMyAdmin.

- Criar um arquivo de variáveis de ambiente na pasta `config/` chamado `.env`, seguindo o exemplo do arquivo `config/.env.example`.

- Instalar os módulos necessários com o comando `npm install`

- Rodar o script `npm run dev:l` (se estiver usando LAMPP), ou `npm run dev:w` (se estiver usando WAMPP).

- Abrir o projeto no seu navegador favorito.

# Notas

- o administrador `admin` tem a senha `1234` e o caixa `joao` tem a senha `abcd`
