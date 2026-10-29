# Página Black Friday — Lentes em Resina

Uma página única, ultra-leve e pensada primeiro para celular, usando apenas os dados do site de referência.

## Visual
- Estética Black Friday premium: fundo preto profundo, dourado como destaque e um vermelho de urgência só nos selos.
- Títulos em Bebas Neue (impacto), texto em Barlow. Fontes carregadas com prioridade, só os pesos usados.
- Botões grandes, fáceis de tocar com o polegar; barra fixa no rodapé do celular com "Garantir minha vaga".

## Seções (de cima para baixo)
1. **Faixa de urgência fixa** — "BLACK FRIDAY • só esta semana" + contagem regressiva.
2. **Abertura** — "Lentes em resina sem desgaste: 20 lentes de R$ 5.000 por R$ 2.199". Selos: pronto em 3h, 10 anos de garantia, 12x sem juros. Prova social: +55.000 sorrisos, 99% de satisfação. Unidades Tatuapé (SP) e Savassi (BH).
3. **Antes e depois** — foto do site de referência.
4. **Cupom SORRISO30** — bloco com botão "copiar cupom".
5. **Ofertas**
   - 10 lentes: de R$ 3.500 por R$ 1.749 (12x R$ 175) — economia R$ 1.751
   - 20 lentes (sorriso completo, destaque): de R$ 5.000 por R$ 2.199 (12x R$ 183,25) — economia R$ 2.801
   - Inclusos: 10 anos de garantia em contrato, limpeza prévia, 1ª manutenção de brinde, pronto em 3h.
6. **Por que é tão barato?** — vagas de cliente modelo para portfólio, NÃO feitas por dentistas iniciantes, materiais importados. Apenas 4 vagas.
7. **Como funciona** — 4 passos (foto pelo WhatsApp → aprovação → lentes em 3h → contrato + brindes).
8. **Depoimentos** — nota 4,9 com +2.300 avaliações Google, 3 depoimentos com foto (Carla, Rafael, Amanda).
9. **Instagram do coordenador** — @drvictorlima.
10. **Formulário** — nome, WhatsApp, e-mail, unidade (Tatuapé-SP, Santos-SP, Savassi-BH). Ao enviar, abre o WhatsApp com a mensagem já preenchida.
11. **Números + chamada final** — 55 mil+, 99%, 3h e último botão.

## Velocidade
- Sem bibliotecas extras de animação; só CSS leve.
- Imagens copiadas para o projeto e otimizadas (WebP, tamanho certo, carregamento sob demanda abaixo da primeira tela).
- Título, descrição e prévia de compartilhamento em português.

## Pendente
- **Número de WhatsApp** para receber os contatos: não encontrei no site de referência. Vou deixar um número provisório fácil de trocar — me envie o número real.

## Detalhes técnicos
- Tudo em `src/routes/index.tsx` dividido em componentes em `src/components/landing/`; cores como tokens em `src/styles.css`.
- Contagem regressiva calculada no navegador após carregar (sem erro de hidratação).
- Formulário sem banco de dados: monta link `wa.me` com os dados.
