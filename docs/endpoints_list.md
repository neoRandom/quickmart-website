# Endpoints List

Atualmente, os únicos endpoints funcionando estão na pasta `public/admin`, e são:

- `insert`:
    Request method: apenas POST
    Requisitos: JWT de administrador válido
    Campos do body:
    - id: number = ID da tabela desejada

- `create_user`:  
    Request method: apenas POST
    Requisitos: JWT de administrador válido
    Campos do body:
    - usuario: string = Nome de usuário
    - senha: string = Senha desejada
    - cod_acesso: number = Código de acesso do usuário

- `update`:
    Request method: apenas POST
    Requisitos: JWT de administrador válido
    Campos do body:
    - id: number = ID da tabela desejada

- `delete`: 
    Request method: apenas POST
    Requisitos: JWT de administrador válido
    Campos do body:
    - id: number = ID da tabela desejada

- `get_metadata`: 
    Request method: apenas GET
    Requisitos: JWT de administrador válido
    Campos do body:
    - id: number = ID da tabela desejada

- `get_registers`:  
    Request method: apenas GET
    Requisitos: JWT de administrador válido
    Campos do body:
    - id: number = ID da tabela desejada
    - key: number = coluna de pesquisa (opcional)
    - value: string = valor da coluna (opcional)
    - limit: number = limite por query (opcional)
    - offset: number = valor de offset (opcional)

- `login`: 
    Request method: GET e POST
    - POST:
        Campos do body:
        - username: string = Nome de usuário
        - password: string = Senha do usuário

- `logout`: 
    Request method: qualquer tipo de requisição
