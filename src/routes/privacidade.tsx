import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacidade")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Política de Privacidade | Black Friday Lentes em Resina" },
      { name: "description", content: "Como tratamos os dados informados no formulário da campanha Black Friday de lentes em resina, conforme a LGPD." },
      { property: "og:title", content: "Política de Privacidade | Black Friday Lentes em Resina" },
      { property: "og:description", content: "Como tratamos os dados informados no formulário da campanha, conforme a LGPD." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <main className="mx-auto max-w-xl space-y-4 px-5 py-10 text-sm leading-relaxed text-muted-foreground">
      <h1 className="font-display text-4xl text-foreground">Política de Privacidade</h1>
      <p>Esta página explica como tratamos os dados informados no formulário da campanha Black Friday de lentes em resina da equipe Dr. Victor Lima, conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018).</p>
      <h2 className="text-lg font-semibold text-foreground">Quais dados coletamos</h2>
      <p>Nome, WhatsApp, e-mail, unidade de preferência, pacote de interesse e quando deseja realizar o procedimento.</p>
      <h2 className="text-lg font-semibold text-foreground">Para que usamos</h2>
      <p>Para entrar em contato sobre o agendamento e as condições da campanha. Os dados não são armazenados neste site: ao enviar o formulário, nome, WhatsApp, e-mail e valor do pacote são enviados à ferramenta de atendimento e automação da clínica, e seguem também na mensagem que você mesmo envia pelo WhatsApp.</p>
      <h2 className="text-lg font-semibold text-foreground">Compartilhamento</h2>
      <p>Não vendemos nem compartilhamos seus dados com terceiros para fins de publicidade. A conversa ocorre pelo WhatsApp, sujeito à política de privacidade do próprio WhatsApp.</p>
      <h2 className="text-lg font-semibold text-foreground">Seus direitos</h2>
      <p>Você pode pedir acesso, correção ou exclusão dos seus dados a qualquer momento, enviando uma mensagem no mesmo WhatsApp da clínica.</p>
      <h2 className="text-lg font-semibold text-foreground">Anúncios</h2>
      <p>Este site pode receber visitantes vindos de anúncios no Facebook e Instagram. Não instalamos ferramentas de rastreamento de anúncios nesta página.</p>
      <Link to="/" className="inline-block pt-4 font-semibold text-primary underline">Voltar para a oferta</Link>
    </main>
  );
}
