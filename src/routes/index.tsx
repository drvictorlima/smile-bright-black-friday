import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { OFFERS, currency, installmentText, savings } from "@/lib/offers";
import { leadDestination, leadSchema, whatsappUrl } from "@/lib/lead";
import { Button } from "@/components/ui/button";

// Troque pelo número real (com DDI 55 + DDD), só dígitos.
const WHATSAPP = "5511912686897";

const TITLE = `Black Friday: Lentes em Resina Estratificada a partir de ${currency(OFFERS.ten.price)} | Até 47% OFF`;
const DESC =
  "Lentes em resina sem desgaste na técnica estratificada realista, prontas em 3h, 10 anos de garantia e 12x sem juros. Cupom SORRISOBLACKFRIDAY. Últimas 4 vagas com desconto, só para quem realizar o procedimento ainda esta semana.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "preload", href: "/img/ba.webp", as: "image" }],
  }),
  component: Index,
});

function useCountdown() {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const tick = () => setLeft(Math.max(0, end.getTime() - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const s = Math.floor((left ?? 0) / 1000);
  const p = (n: number) => String(n).padStart(2, "0");
  return { h: p(Math.floor(s / 3600)), m: p(Math.floor((s % 3600) / 60)), s: p(s % 60) };
}

const Cta = ({ children = "Garantir meu desconto Black Friday" }: { children?: string }) => (
  <Button asChild className="btn-cta h-auto whitespace-normal text-base">
    <a href="#vaga">{children}</a>
  </Button>
);

const Warn = () => (
  <p className="mt-3 text-center text-xs text-muted-foreground">
    ⏳ Quando o cronômetro zerar, o desconto acaba e o preço volta ao valor cheio.
  </p>
);

function Index() {
  const t = useCountdown();
  return (
    <div className="mx-auto min-h-screen max-w-md pb-24 font-sans">
      {/* Faixa de urgência */}
      <div className="sticky top-0 z-30 flex items-center justify-between gap-2 bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground">
        <span>🔥 BLACK FRIDAY • ENCERRA EM</span>
        <span className="font-display text-lg tracking-wider tabular-nums">
          {t.h}:{t.m}:{t.s}
        </span>
      </div>

      {/* Hero */}
      <header className="px-5 pt-8 text-center">
        <p className="inline-block rounded-full border border-primary/40 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
          Últimas 4 vagas desta semana — até 47% OFF
        </p>
        <h1 className="mt-4 font-display text-5xl leading-[0.95]">
          Lentes em resina <span className="text-gold">sem desgaste</span> na técnica <span className="text-gold">estratificada realista</span>
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Camadas de resina que imitam a cor e o brilho natural do dente. Resultado realista, sem desgastar seus dentes. + 1ª manutenção de brinde + limpeza cortesia.
        </p>
        <div className="mt-5 grid grid-cols-3 gap-2 text-xs font-semibold">
          {["⏱️ Pronto em 3h", "🛡️ 10 anos de garantia", "💳 12x sem juros"].map((b) => (
            <div key={b} className="rounded-lg bg-card px-2 py-3">
              {b}
            </div>
          ))}
        </div>
        <img
          src="/img/ba.webp"
          alt="Antes e depois de lentes em resina"
          width={800}
          height={800}
          fetchPriority="high"
          className="mt-6 aspect-square w-full rounded-2xl border border-border object-cover"
        />
        <p className="mt-3 text-sm">⭐⭐⭐⭐⭐ +55.000 sorrisos transformados • 99% de satisfação</p>
        <div className="mt-5">
          <Cta />
          <p className="mt-3 text-xs text-muted-foreground">
            Últimas <strong className="text-accent">4 vagas</strong> com desconto — somente para quem fizer ainda esta semana
          </p>
        </div>
      </header>

      <Coupon />

      {/* Exclusividades */}
      <section className="mx-5 mt-12 rounded-2xl border-2 border-primary bg-card p-6">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary">
          Exclusivo Black Friday
        </p>
        <h2 className="mt-1 text-center font-display text-4xl leading-none">
          A <span className="text-gold">única clínica</span> que oferece tudo isso
        </h2>
        <p className="mt-3 text-center text-sm text-muted-foreground">
          Para você não se preocupar com qualidade nem durabilidade: os melhores materiais, a melhor
          técnica e a transformação do seu sorriso <strong className="text-foreground">sem desgaste</strong>.
        </p>
        <ul className="mt-5 space-y-3 text-sm">
          {[
            ["🛡️", "10 anos de garantia em contrato", "Segurança total: se algo acontecer, você está coberto por uma década."],
            ["🎁", "1ª manutenção de brinde", "Sua primeira manutenção sai por nossa conta."],
            ["✨", "Limpeza de cortesia", "Limpeza prévia antes da instalação das lentes, sem custo."],
            ["💳", "Parcelamento em até 12x sem juros no cartão de crédito. ", "Você paga no seu ritmo, sem pagar nada a mais por isso."],
          ].map(([icon, title, desc]) => (
            <li key={title} className="flex gap-3 rounded-xl bg-background p-4">
              <span className="text-xl">{icon}</span>
              <span>
                <strong className="block">
                  Única clínica que oferece <span className="text-gold">{title}</span>
                </strong>
                <span className="text-xs text-muted-foreground">{desc}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-center text-xs font-semibold text-accent">
          Nenhuma outra clínica reúne todos esses benefícios em um só tratamento.
        </p>
      </section>

      {/* Por que */}
      <section className="mx-5 mt-12 rounded-2xl border border-primary/30 bg-card p-6">
        <h2 className="font-display text-3xl">Por que esse desconto só existe agora?</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Esse é um <strong className="text-foreground">preço exclusivo de Black Friday</strong>, com
          agenda limitada. Você recebe os{" "}
          <strong className="text-foreground">melhores materiais importados</strong>, aplicados por
          profissionais experientes —{" "}
          <strong className="text-accent">NÃO é realizado por dentistas iniciantes.</strong>
        </p>
        <p className="mt-3 text-sm font-semibold">Só as últimas 4 vagas desta semana têm desconto. Depois, os valores voltam ao preço cheio.</p>
      </section>

      {/* Como funciona */}
      <section className="px-5 pt-12">
        <h2 className="text-center font-display text-4xl">Como funciona</h2>
        <ol className="mt-6 space-y-3">
          {[
            "Você envia foto do sorriso pelo WhatsApp",
            "Sendo aprovado, agendamos a data de instalação",
            "Você realiza as lentes em 3h, sem desgastar os dentes em 99% dos casos",
            "Você recebe contrato com 10 anos de garantia, 1ª manutenção de brinde e limpeza prévia",
          ].map((s, i) => (
            <li key={s} className="flex gap-4 rounded-xl bg-card p-4 text-sm">
              <span className="bg-gold flex size-8 shrink-0 items-center justify-center rounded-full font-display text-xl text-primary-foreground">
                {i + 1}
              </span>
              <span className="self-center">{s}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Depoimentos */}
      <section className="px-5 pt-12">
        <h2 className="text-center font-display text-4xl">Quem fez, recomenda</h2>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          <strong className="text-primary">4,9 ★</strong> no Google • +2.300 avaliações
        </p>
        <div className="mt-6 space-y-4">
          {REVIEWS.map((r) => (
            <figure key={r.name} className="rounded-2xl bg-card p-5">
              <div className="flex items-center gap-3">
                <img
                  src={r.img}
                  alt={r.name}
                  width={44}
                  height={44}
                  loading="lazy"
                  className="size-11 rounded-full object-cover"
                />
                <div className="text-sm">
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {r.city} • {r.when}
                  </p>
                </div>
              </div>
              <p className="mt-2 text-sm text-primary">★★★★★</p>
              <blockquote className="mt-2 text-sm leading-relaxed text-muted-foreground">
                "{r.text}"
              </blockquote>
            </figure>
          ))}
        </div>
      </section>

      {/* Instagram */}
      <section className="px-5 pt-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Veja mais resultados no Instagram do coordenador
        </p>
        <p className="mt-2 block font-display text-3xl">
          @drvictorlima ✓
        </p>
        <img
          src="/img/ig.webp"
          alt="Perfil do Instagram Dr. Victor Lima"
          width={600}
          height={1231}
          loading="lazy"
          className="mx-auto mt-4 w-3/4 rounded-2xl border border-border"
        />
      </section>

      <LeadForm />

      {/* Números */}
      <section className="mt-12 grid grid-cols-3 gap-2 px-5 text-center">
        {[
          ["55 mil+", "Sorrisos transformados"],
          ["99%", "Satisfação"],
          ["3h", "Sessão única"],
        ].map(([n, l]) => (
          <div key={n} className="rounded-xl bg-card p-3">
            <p className="text-gold font-display text-3xl">{n}</p>
            <p className="text-xs text-muted-foreground">{l}</p>
          </div>
        ))}
      </section>

      <Loss />

      {/* Ofertas */}
      <section className="px-5 pt-12">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary">
          Oferta Black Friday
        </p>
        <h2 className="mt-1 text-center font-display text-4xl">Veja quanto você economiza</h2>
        <Scarcity />
        <div className="mt-6 space-y-4">
          <Offer
            tag="Mais procurado"
            title="10 Lentes"
            from={currency(OFFERS.ten.original)}
            price={currency(OFFERS.ten.price)}
            inst={installmentText(OFFERS.ten)}
            save={currency(savings(OFFERS.ten))}
          />
          <Offer
            highlight
            tag="Resultado completo"
            title="20 Lentes — sorriso completo"
            from={currency(OFFERS.twenty.original)}
            price={currency(OFFERS.twenty.price)}
            inst={installmentText(OFFERS.twenty)}
            save={currency(savings(OFFERS.twenty))}
          />
        </div>
        <ul className="mt-6 space-y-2 rounded-2xl bg-card p-5 text-sm">
          {[
            "Única clínica com 10 anos de garantia em contrato",
            "Pronto em 3 horas, sem desgaste nos dentes",
            "Única clínica com limpeza de cortesia antes da instalação das lentes",
            "Única clínica com 1ª manutenção de brinde",
            "Única clínica com parcelamento em até 12x sem juros",
          ].map((i) => (
            <li key={i}>✅ {i}</li>
          ))}
        </ul>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Quando a agenda lotar, o desconto acaba. Sem prorrogação.
        </p>
      </section>

      <section className="px-5 pt-12 text-center">
        <h2 className="font-display text-4xl">
          Daqui a pouco <span className="text-gold">esse preço não existe mais</span>
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Quem deixar pra depois vai pagar {currency(OFFERS.twenty.original)} pelo mesmo sorriso. Cupom{" "}
          <strong className="text-primary">SORRISO BLACK FRIDAY</strong>. Agenda quase lotada.
        </p>
        <div className="mt-5">
          <Cta>Garantir uma das últimas 4 vagas</Cta>
        </div>
        <Warn />
      </section>

      <footer className="mt-12 px-5 text-center text-xs text-muted-foreground">
        *Válido apenas durante a Black Friday. Sujeito à disponibilidade nas unidades do Tatuapé, SP
        ou Savassi, BH.
      </footer>

      {/* Barra fixa */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur">
        <div className="mx-auto max-w-md">
          <Button asChild className="btn-cta h-auto whitespace-normal text-sm" style={{ animation: "none" }}>
            <a href="#vaga">
            Garantir meu desconto Black Friday
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

function Coupon() {
  return (
    <section className="mx-5 mt-10 rounded-2xl border-2 border-dashed border-primary p-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        🎉 Cupom Black Friday desbloqueado
      </p>
      <p className="text-gold mt-2 font-display text-5xl leading-none tracking-wider">SORRISO BLACK FRIDAY</p>
      <Button asChild variant="secondary" className="mt-3 h-auto min-h-11 whitespace-normal px-5 py-2 text-sm font-semibold">
        <a href="#vaga">Usar meu cupom Black Friday</a>
      </Button>
      <p className="mt-3 text-xs text-muted-foreground">
        Válido só durante a Black Friday. Depois disso, o cupom expira.
      </p>
    </section>
  );
}

function Offer(p: {
  tag: string;
  title: string;
  from: string;
  price: string;
  inst: string;
  save: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`relative rounded-2xl p-6 ${p.highlight ? "border-2 border-primary bg-card" : "border border-border bg-card"}`}
    >
      <span
        className={`absolute -top-3 left-5 rounded-full px-3 py-1 text-xs font-bold uppercase ${p.highlight ? "bg-gold text-primary-foreground" : "bg-accent text-accent-foreground"}`}
      >
        {p.tag}
      </span>
      <h3 className="font-display text-3xl">{p.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        De <s>{p.from}</s> por
      </p>
      <p className="text-gold font-display text-6xl leading-none">{p.price}</p>
      <p className="mt-1 text-sm">ou {p.inst}</p>
      <p className="mt-3 inline-block rounded-md bg-accent/15 px-2 py-1 text-sm font-semibold text-accent">
        Economia de {p.save}
      </p>
      <div className="mt-5">
        <Cta>Quero essa oferta</Cta>
      </div>
      <Warn />
    </div>
  );
}

function LeadForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const result = leadSchema.safeParse(Object.fromEntries(f));
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Confira os dados do formulário.");
      return;
    }
    setError("");
    if (leadDestination(result.data.prazo) === "agradecimento") {
      void navigate({ to: "/obrigado" });
      return;
    }
    const url = whatsappUrl(result.data, WHATSAPP);
    if (url) window.location.assign(url);
  };
  const input =
    "min-h-12 w-full rounded-lg border border-input bg-background px-4 text-base outline-none focus:border-primary";
  return (
    <section id="vaga" className="mx-5 mt-12 scroll-mt-14 rounded-2xl border-2 border-primary bg-card p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">
        Atenção — o desconto acaba quando o cronômetro zerar
      </p>
      <h2 className="mt-2 font-display text-4xl leading-none">
        Sua última oportunidade: de <s className="text-muted-foreground">{currency(OFFERS.twenty.original)}</s> por <span className="text-gold">{currency(OFFERS.twenty.price)}</span>
      </h2>
      <p className="mt-3 text-sm text-muted-foreground">
        O desconto vale só para as últimas 4 vagas desta semana, preenchidas por ordem de chegada. Datas futuras pagam o valor cheio.
      </p>
      <Scarcity />
      <form onSubmit={submit} className="mt-5 space-y-3">
        <input name="nome" required minLength={2} maxLength={100} aria-label="Seu nome" placeholder="Seu nome" autoComplete="name" className={input} />
        <input
          name="whats"
          required
          type="tel"
          inputMode="tel"
          placeholder="WhatsApp com DDD"
          autoComplete="tel"
          maxLength={25}
          aria-label="WhatsApp com DDD"
          className={input}
        />
        <input
          name="email"
          required
          type="email"
          placeholder="Seu e-mail"
          autoComplete="email"
          maxLength={255}
          aria-label="Seu e-mail"
          className={input}
        />
        <select name="unidade" required aria-label="Unidade de preferência" className={input} defaultValue="">
          <option value="" disabled>
            Unidade de preferência
          </option>
          <option>Tatuapé - SP</option>
          <option>Santos - SP</option>
          <option>Savassi - BH</option>
        </select>
        <fieldset className="space-y-3 py-2">
          <legend className="text-sm font-semibold">Quando você quer realizar o procedimento?</legend>
          <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border border-input px-4 py-3 text-sm">
            <input type="radio" name="prazo" value="esta-semana" required className="size-4 shrink-0 accent-primary" />
            Nesta semana — quero uma das 4 vagas com desconto
          </label>
          <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border border-input px-4 py-3 text-sm">
            <input type="radio" name="prazo" value="data-futura" required className="size-4 shrink-0 accent-primary" />
            Em uma data futura — valor cheio, sem desconto
          </label>
        </fieldset>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <Button type="submit" className="btn-cta h-auto whitespace-normal text-sm">
          Garantir minha vaga desta semana
        </Button>
      </form>
      <Warn />
      <p className="mt-2 text-center text-xs text-muted-foreground">
        🔒 Seus dados são tratados com sigilo.
      </p>
    </section>
  );
}

const REVIEWS = [
  {
    name: "Carla Mendonça Ribeiro",
    city: "Belo Horizonte",
    when: "há 2 semanas",
    img: "/img/t2.webp",
    text: "Sempre tive vergonha de sorrir e o atendimento foi excepcional do início ao fim. Em 3 horas minha vida mudou. Equipe maravilhosa, clínica impecável e o resultado superou todas as minhas expectativas!",
  },
  {
    name: "Rafael Siqueira Albuquerque",
    city: "São Paulo",
    when: "há 1 mês",
    img: "/img/t1.webp",
    text: "Tinha muito medo de desgastar os dentes naturais. Não precisou desgastar absolutamente nada e o resultado ficou perfeito. Dr. e a equipe dele foram muito atenciosos, explicaram cada etapa. Recomendo demais!",
  },
  {
    name: "Amanda Pacheco Nogueira",
    city: "São Paulo",
    when: "há 3 semanas",
    img: "/img/t3.webp",
    text: "O parcelamento em 12x sem juros foi decisivo pra eu finalmente realizar esse sonho. Melhor investimento que já fiz na minha autoestima. Hoje sorrio em todas as fotos sem pensar duas vezes!",
  },
];

function Scarcity() {
  return (
    <div className="mt-5 rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm">
      <p className="font-semibold">
        🚨 Últimas <span className="text-accent">4 vagas</span> com desconto nesta semana
      </p>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
        <div className="h-full w-[87%] rounded-full bg-accent" />
      </div>
      <p className="mt-1 text-xs text-muted-foreground">87% da agenda já preenchida</p>
    </div>
  );
}

function Loss() {
  return (
    <section className="mx-5 mt-10 text-center">
      <h2 className="font-display text-4xl leading-none">
        Não deixe <span className="text-accent">{currency(savings(OFFERS.twenty))}</span> na mesa
      </h2>
      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl border-2 border-primary bg-card p-4">
          <p className="text-xs text-muted-foreground">Fazendo esta semana</p>
          <p className="text-gold font-display text-4xl">{currency(OFFERS.twenty.price)}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 opacity-80">
          <p className="text-xs text-muted-foreground">Em data futura</p>
          <p className="font-display text-4xl line-through">{currency(OFFERS.twenty.original)}</p>
        </div>
      </div>
      <p className="mt-3 text-sm font-semibold text-accent">Se deixar passar, você perde {currency(savings(OFFERS.twenty))}.</p>
    </section>
  );
}
