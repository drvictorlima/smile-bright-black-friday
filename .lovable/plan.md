# Envio do lead para o webhook do n8n + WhatsApp em nova aba

## O que muda
1. Quando o lead escolhe "Nesta semana" e o formulário é aprovado, o site envia para o webhook `https://acessodrvictorlima.app.n8n.cloud/` (POST, JSON):
   - `name`, `phone`, `email`
   - `value`: 2899 (até 10 lentes) ou 5498 (até 20 lentes), lidos da tabela de preços do site
   - `currency`: "BRL"
2. Logo depois, o WhatsApp abre em uma nova aba com a mensagem atual (nome, pacote, valor, cupom BLACKFRIDAY).
3. Nenhum script do Pixel da Meta é instalado no site.
4. Leads de "data futura" continuam indo para a página de agradecimento, sem envio ao webhook.
5. A Política de Privacidade passa a dizer que os dados do formulário vão para a ferramenta de atendimento da clínica.

## Observação
O que o n8n fizer depois com esses dados fica sob sua responsabilidade. Repassar à Meta dados de pacientes como "Purchase" continua sendo contra as regras dela.

## Detalhes técnicos
- `src/lib/lead.ts`: nova função `webhookPayload(lead)` que monta `{ name, phone, email, value, currency: "BRL" }` a partir de `OFFERS`, além de uma constante com a URL do webhook. Testes em `src/test/lead.test.ts` para os valores 2899/5498 e "BRL".
- `src/routes/index.tsx` (envio do formulário): abrir a aba com `window.open("about:blank")` na hora do clique, para o navegador não bloquear; enviar `fetch(url, { method: "POST", headers: {"Content-Type":"application/json"}, body, keepalive: true })` sem esperar resposta; depois apontar a aba para a URL do WhatsApp (se a aba for bloqueada, a própria página vai para o WhatsApp). O honeypot continua bloqueando robôs antes do envio.
- `src/server.ts`: incluir `https://acessodrvictorlima.app.n8n.cloud` em `connect-src` na CSP.
- `src/routes/privacidade.tsx`: parágrafo sobre o envio para a ferramenta de automação da clínica.
- `AGENTS.md`: trocar a regra "nenhum dado de lead é enviado a servidor" pela regra do webhook.
- O n8n precisa responder com CORS liberado para `https://megadescontoblackfriday.com` (ou responder a qualquer origem); sem isso, o navegador pode bloquear o envio.
