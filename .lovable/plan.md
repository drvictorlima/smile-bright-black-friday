# Medição da campanha sem enviar dados de pacientes à Meta

## O que não será feito
Não vamos enviar leads ou dados do formulário para o Pixel nem para a API de Conversões (CAPI). Isso vale para nome, e-mail, telefone, unidade, pacote e data, e também para um evento "Purchase" disparado no redirecionamento ao WhatsApp. Os Termos das Ferramentas de Negócios da Meta proíbem compartilhar agendamentos de tratamento de saúde e dados de pacientes, mesmo com criptografia (hash), consentimento ou outro nome de evento. Aceitar a responsabilidade não remove a proibição, e fazer isso coloca em risco o Pixel e a conta de anúncios.

## O que fica como está
- O site continua sem Pixel. Os leads seguem direto para o WhatsApp, e nenhum dado sai para a Meta.
- A campanha de tráfego usa os números que a própria Meta mede sem nada instalado: impressões, cliques no link e custo por clique.
- Para avaliar o resultado, a clínica conta no WhatsApp quantos leads chegaram por dia e compara com o investimento no Gerenciador de Anúncios.

## Próximo passo opcional
Se você conectar sua conta de anúncios, posso verificar no Gerenciador de Eventos as restrições do Pixel 1866189184381180. Assim confirmamos se algum evento de navegação, sem dados de pacientes, é permitido para este site.

## Detalhes técnicos
Nenhuma alteração de código. As proteções de segurança atuais do site continuam bloqueando endereços externos de rastreamento.
