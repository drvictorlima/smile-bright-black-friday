import { createFileRoute } from "@tanstack/react-router";
import { HeartHandshake } from "lucide-react";

export const Route = createFileRoute("/obrigado")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Obrigado pelo interesse | Sorriso Black Friday" },
      { name: "description", content: "Agradecemos seu interesse. Retorne na semana em que desejar realizar suas lentes em resina, com uma data exata definida." },
      { property: "og:title", content: "Obrigado pelo interesse | Sorriso Black Friday" },
      { property: "og:description", content: "Atendimento com qualidade do início ao fim. Retorne quando tiver uma data exata para realizar seu procedimento." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ThankYou,
});

function ThankYou() {
  return (
    <main className="mx-auto min-h-screen max-w-md px-6 py-16 font-sans">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">Sorriso Black Friday</p>
      <HeartHandshake className="mt-8 size-12 text-gold" aria-hidden="true" />
      <h1 className="mt-5 font-display text-4xl leading-tight">Obrigado pelo seu interesse!</h1>
      <p className="mt-6 text-base leading-relaxed text-muted-foreground">
        Nós agradecemos imensamente o interesse, porém nós focamos em prestar o melhor atendimento possível para os pacientes que têm mais urgência na realização do procedimento. Assim a gente garante qualidade do início ao fim.
      </p>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        No momento, não conseguimos atender o seu pedido: as condições de Black Friday valem somente para as últimas 4 vagas desta semana. Para datas futuras, o procedimento será realizado pelo valor total, sem o desconto.
      </p>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        Esse cuidado garante a qualidade do atendimento de todos os nossos pacientes.
      </p>
      <p className="mt-6 border-l-2 border-primary pl-4 text-base leading-relaxed">
        Assim que tiver uma data exata, volte a preencher o formulário na semana em que você for realizar o procedimento para entrar em contato conosco.
      </p>
      <p className="mt-6 text-sm text-muted-foreground">Será um prazer cuidar do seu sorriso no momento certo para você.</p>
    </main>
  );
}