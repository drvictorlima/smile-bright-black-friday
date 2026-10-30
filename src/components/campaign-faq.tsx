import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
// Questions and answers extracted from https://resinavip.com/.
const QUESTIONS = [
  {
    question: "As lentes em resina quebram?",
    answer: "São super resistentes e não quebram facilmente. O paciente segue a vida normalmente, evitando hábitos prejudiciais.",
  },
  {
    question: "As lentes mudam de cor ou mancham?",
    answer: "Não! Não mudam de cor, não mancham e não amarelam. Você vive normalmente sem preocupações.",
  },
  {
    question: "Posso consumir café, vinho e açaí?",
    answer: "Sim! Nossas lentes são resistentes a manchas. Pode consumir tudo normalmente.",
  },
  {
    question: "Quanto tempo duram as lentes?",
    answer: "Mais de 10 anos. Todos recebem garantia em contrato de 10 anos.",
  },
  {
    question: "Quanto tempo dura o procedimento?",
    answer: "Em torno de 3 horas, em uma única sessão. Você sai com o novo sorriso no mesmo dia.",
  },
  {
    question: "É necessário desgastar os dentes?",
    answer: "Em 99% dos casos, não é realizado nenhum desgaste. Preservamos sua estrutura natural.",
  },
  {
    question: "Quais formas de pagamento?",
    answer: "Crédito, débito, Pix e dinheiro. Parcelamos em até 12x sem juros. Desconto especial à vista.",
  },
  {
    question: "Onde ficam as clínicas?",
    answer: "São Paulo (Tatuapé), Belo Horizonte (Savassi) e Santos (Avenida Conselheiro Nébias).",
  },
];

export function CampaignFaq() {
  return (
    <section aria-labelledby="faq-title" className="px-5 pt-12">
      <h2 id="faq-title" className="text-center font-display text-4xl">Dúvidas frequentes</h2>
      <Accordion type="single" collapsible className="mt-5">
        {QUESTIONS.map(({ question, answer }, index) => (
          <AccordionItem key={question} value={`question-${index}`} className="border-border">
            <AccordionTrigger className="min-h-12 gap-3 font-semibold">{question}</AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}