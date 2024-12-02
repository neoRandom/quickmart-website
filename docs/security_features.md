# Protocolos de segurança

TODO: Melhorar, claro

(A mesma história, 4 camadinhas de segurança, uma sopa de hash com, claro, salt)

- Sistema de endpoints: Os arquivos não são acessados diretamente quando tem uma requisição, mas sim tem uma chamada do servidor pra ele fazer alguma coisa, que depende das regras dele. O que ele vai fazer de acordo com essa requisição depende muito, ele pode não retornar nada (tipo executando algum algoritmo interno que não retorna nada) ou retornar a página em si.

- Sessões com JSON Web Tokens (JWT): Criptografia em tokens, guardado com HttpOnly e essas coisas. As trêsparteszinhas separadas pelo ponto e asseguradas com uma chave do servidor (e muita fé).

- Autenticação com hash e salt: Uso de hash (mais especificamente SHA256, com os 64 caracteres guardados no banco de dados como varchar, claro) e salt (que calhou de ser um unsigned de 32 bits aleatório, será que 4 bilhões de combinações é o suficiente?). Serve pra, primeiro, não terem acesso direto à sua senha (porque é quase impossível achar a string base do hash, ainda mais com salt pra ter segurança anti-rainbow attack) e, segundo, parecer muito legal.

nota pra seu eu do futuro: criar uma lista com os tipos de ataque (hack) que essas camadas de segurança impedem, ou deviam impedir, tipo um LFI da vida.

nota pra seu eu do futuro 2: acabei de me lembrar que o JWT ainda tem uma pancada de vulnerabilidades, então seria melhor adicionar algum sistema de segurança a mais, tipo um mutual connection, mas não tenho certeza de nada agora.
