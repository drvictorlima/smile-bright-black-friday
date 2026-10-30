# Formulário no fim da página

Mover o formulário para o final, logo antes do rodapé, para que o lead leia tudo (benefícios, FAQ, números, perda, preços e chamada final) antes de preencher.

## Nova ordem (final da página)
1. ...seções atuais até Instagram
2. Dúvidas frequentes
3. Números (55 mil+, 99%, 3h)
4. O que você perde
5. Ofertas e preços
6. "Daqui a pouco esse preço não existe mais"
7. **Formulário** (novo lugar)
8. Rodapé

## O que continua igual
- Todos os botões continuam rolando até o formulário, agora no fim.
- O "Sim" da mensagem do contador continua levando ao formulário.
- Campos, validação e envio ao WhatsApp sem mudanças.

## Detalhe técnico
Em `src/routes/index.tsx`, mover `<LeadForm />` de antes da seção de números para depois da seção final de urgência, antes do `<footer>`. A âncora `#vaga` continua dentro do LeadForm.
