# Envio de "Purchase" pela API de Conversões: não será feito

## Decisão
O site não vai enviar à Meta o evento "Purchase" nem os dados do formulário (nome, e-mail, telefone, unidade, pacote, valor), nem pelo navegador nem pelo servidor. As regras da Meta proíbem compartilhar agendamentos de tratamento de saúde e dados de pacientes, mesmo com hash, servidor ou outro nome de evento.

## O que fica como está
- O formulário, a validação e o envio ao WhatsApp continuam iguais, com o valor do pacote já incluído na mensagem.
- A campanha usa o que a Meta já mede sozinha: impressões, cliques e custo por clique.
- Os resultados se comparam contando os leads que chegam no WhatsApp.

## Opções seguras, se você quiser depois
- Página de demonstração para a aula, sem enviar nada.
- Controle interno de leads por dia e valor do pacote, sem enviar nada à Meta.

## Detalhes técnicos
Nenhuma alteração de código, função de servidor ou chave de acesso.
