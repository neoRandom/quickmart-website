# Estrutura de pastas:

- `app`: Principais arquivos PHP, utiliza o modelo MVC
    - `controller`: Lógica principal
    - `database`: Lógica relacionada ao banco de dados
    - `model`: Classes de modelagem
    - `utilities`: Códigos auxiliares
    - `view`: Templates das páginas
- `assets`: Arquivos estáticos a serem usados pelas páginas
- `config`: Arquivos de configuração para o projeto (variáveis de ambiente e scripts)
- `database`: Arquivos SQL, como o Schema do banco de dados, testes e registros
- `docs`: Documentação, como arquivos Markdown e Diagramas
- `public`: Diretório que os usuários devem acessar, os arquivos aqui chamam os controllers que chamam os views
- `resources`: Arquivos estáticos a serem compilados, como o `input.css` do Tailwind (vão para a pasta `assets`)
