# Segurança máxima + abertura em até 2 segundos

## Análise (situação atual)
- O site não tem banco de dados nem login, e os dados do lead não ficam guardados em nenhum servidor: vão direto para o WhatsApp. Isso já elimina os maiores riscos (vazamento de dados, invasão de contas).
- Pontos que faltam: cabeçalhos de proteção do navegador, proteção contra o site ser embutido em páginas falsas (clickjacking), limites nos campos do formulário, limpeza do texto enviado ao WhatsApp e revisão das bibliotecas usadas.
- Velocidade: as fontes vêm do Google (3 conexões extras antes de exibir o texto), há imagens antigas sem uso na pasta do projeto e bibliotecas não utilizadas.

## Segurança — o que será feito
1. Cabeçalhos de proteção em todas as respostas do site:
   - Política de conteúdo (CSP) liberando só o próprio site, a CDN das fotos e o WhatsApp.
   - Bloqueio de exibição dentro de outros sites (anti-clickjacking).
   - HTTPS obrigatório (HSTS), bloqueio de "adivinhação" de tipo de arquivo, política de referência restrita, desativação de câmera/microfone/localização.
2. Formulário: limite de tamanho em cada campo, remoção de caracteres de controle/ocultos antes de montar a mensagem do WhatsApp, e o link do WhatsApp sempre gerado só para o número oficial.
3. Proteção básica contra robôs: campo invisível "armadilha" (honeypot) — se preenchido, o envio é ignorado silenciosamente.
4. Varredura de vulnerabilidades nas bibliotecas e atualização das que tiverem alerta.
5. Página de erro sem expor detalhes técnicos.

## Velocidade — o que será feito
1. Fontes Barlow e Bebas Neue servidas pelo próprio site (sem esperar o Google), só os pesos usados, com exibição imediata do texto.
2. Primeira foto do carrossel com prioridade máxima e pré-carregamento; demais fotos só após a página abrir (já parcialmente feito — será revisado).
3. Cache longo para fotos, fontes e arquivos do site.
4. Remover imagens antigas não usadas e conferir que nada pesado carrega antes da primeira tela.
5. Medir com teste de carregamento em celular (rede 4G simulada) antes e depois, com meta de primeira tela visível em até 2 s.

## Detalhes técnicos
- Cabeçalhos aplicados no `src/server.ts` (wrapper do fetch) em todas as respostas: `Content-Security-Policy`, `X-Frame-Options: DENY` + `frame-ancestors 'none'`, `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`. CSP com hash/'unsafe-inline' mínimo necessário para o script de hidratação do TanStack; validação no preview para não quebrar nada.
- `Cache-Control: public, max-age=31536000, immutable` para `/assets/*` e fontes.
- `src/lib/lead.ts`: `.max()` por campo, sanitização (strip de caracteres de controle/zero-width), honeypot no schema; testes novos em `src/test/lead.test.ts`.
- Fontes via `@fontsource` (woff2 latin, `font-display: swap`) + preload da fonte do título; remover links do Google Fonts no `__root.tsx`.
- Remover `.jpg` órfãos em `src/assets` e ponteiros CDN sem uso; avaliar dependências não usadas.
- Medição com Lighthouse/Playwright (throttling mobile) e registro da decisão em `AGENTS.md`.
