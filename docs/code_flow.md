# Fluxo do Código

TODO: Melhorar, ainda tá muito ruim

Back-end:

Endpoint -> Controller -> View (básico)

AdminController -> requestHandler -> Autenticação -> JWT -> Middleware (parte das requisições para o AdminController)

Front-end (aqui que a mãe chora e o filho não vê):

loadPage -> (função de criar estrutura) -> (pegar metadados) -> (de fato renderizar a estrutura) ->
(função de carregar os registros) -> (pegar os registros) -> (muitas e muitas funções pra criar as parteszinhas da listagem)

Notas pro seu futuro eu: como eu explico o caminho da renderização? ou a estrutura da renderização, mas isso é mais pro "general_architecture" da vida, eu acho, por mais que também seja uma das features unicas.

Notas pro seu futuro eu 2: um diagrama de sequência seria bom pra isso, hein? é um vai e volta de função, a stack fica doida. Eu me pergunto se isso tira performance, tipo recursão em Python. Como seria bom um inline function em JavaScript.
