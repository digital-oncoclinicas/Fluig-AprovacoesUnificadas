# FAQ — Aprovação Unificada (Usuários e Gestores)

## O que este processo faz?
Ele monta a lista de aprovadores necessários para uma solicitação e popula a tabela filha `targetAprovadores` do fluxo.

## Quem pode aprovar minha solicitação?
Aprova apenas quem está configurado nas regras de alçada: por Classe de Valor, Centro de Custo, Filial ou tipo de operação (ex.: Reembolso/Adiantamento). A lista é construída automaticamente com base nestes critérios.

## O que é a "Carta de Exceção"?
Quando marcada, o sistema passa a usar o valor informado no campo `valorCartaExcecao` como referência para definir aprovadores. Pode alterar quem precisa aprovar.

## Por que minha solicitação foi bloqueada com erro?
Erros comuns:
- Valor inválido (nulo ou 0).
- Classe de Valor informada, mas sem aprovador cadastrado.
- Aprovador não cadastrado no Fluig, com múltiplos cadastros ou bloqueado.
- Falha em recuperar filial ou centro de custo.
Você deve encaminhar a mensagem de erro e o número do processo e abrir um chamado no ISM.

## Posso ser meu próprio aprovador?
O sistema tenta evitar conflito de interesse. Se detectar que o aprovador e o solicitante (ou fornecedor) são a mesma pessoa, ele procura um aprovador financeiro alternativo; caso não encontre, o processo pode exigir intervenção.

## Por que alguns aprovadores foram ignorados?
Motivos possíveis:
- Já aprovaram o mesmo processo pai (o script ignora aprovadores com status "Aprovado" em subprocessos anteriores).
- Filtragem por `usabilidade` (no caso de Pagamento Antecipado).
- O aprovador está bloqueado/inativo ou seu cadastro é inconsistente.

## Quantos aprovadores posso ter?
O código limita a inclusão até 7 aprovadores por regra (valor codificado). Algumas operações têm limites menores (ex.: 1 para medição de contrato, 2 para adiantamento/reembolso).

## Como é tratada a moeda?
O script detecta símbolos (R$, US$, €, ﷼) e aplica cotação. Tenta buscar a cotação no Banco Central; se falhar, usa valores padrão definidos no código.

## Onde vejo quem foi incluído como aprovador?
Na tabela filha `targetAprovadores` do processo (visualização do formulário / histórico do processo).

## O que devo enviar ao suporte quando houver erro?
Abrir chamado no sistema ISM e enviar:
- Número do processo (WKNumProces).
- Mensagem de erro exibida.
- Prints ou descrição dos campos principais (valor, centro de custo, classe de valor, operação).

## Abertura de Chamados
SM > Tecnologia da Informação > Sistemas Corporativos > Fluig > Reportar Problemas
