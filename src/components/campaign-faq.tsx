import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BLACK_FRIDAY_COUPON } from "@/lib/lead";

// Questions extracted from the reference site's FAQPage data.
// Answers follow the current campaign instead of its outdated offer and direct contact flow.
const QUESTIONS = [
  {
    question: "Qual a melhor clínica para fazer lentes em resina?",
    answer: "Ao escolher uma clínica, considere a experiência dos profissionais, os materiais utilizados, o planejamento do caso e as condições da garantia. Nossa equipe trabalha com a técnica estratificada realista, materiais importados e garantia de 10 anos em contrato, com limpeza de cortesia antes da instalação e a primeira manutenção de brinde.",
  },
  {
    question: "Qual a melhor clínica para fazer lentes em porcelana?",
    answer: "A escolha deve considerar a avaliação de um profissional e o planejamento adequado ao seu sorriso. Esta campanha Black Friday é exclusiva para lentes em resina; as condições anunciadas não se aplicam às lentes em porcelana.",
  },
  {
    question: "Como agendar lente em resina nas Clínicas VIP?",
    answer: `Preencha o formulário, escolha o pacote de até 10 ou até 20 lentes, a unidade e confirme que está ciente do valor. Ao selecionar “Nesta semana”, você será direcionado ao WhatsApp com suas informações e o cupom ${BLACK_FRIDAY_COUPON}. Envie uma foto do sorriso para avaliação profissional; caso aprovado, agende a data e o horário e realize o pagamento do planejamento digital. Para datas futuras, você verá uma página de agradecimento e o procedimento terá valor cheio, sem desconto.`,
  },
  {
    question: "Qual a melhor clínica em SP para fazer lentes em resina?",
    answer: "Procure uma equipe especializada em estética, com planejamento individual e condições claras de atendimento. Para esta campanha, o formulário permite escolher as unidades Tatuapé - SP ou Santos - SP. O agendamento depende da avaliação profissional e da disponibilidade desta semana.",
  },
  {
    question: "Qual a melhor clínica em BH para fazer lentes em resina?",
    answer: "Em Belo Horizonte, selecione a unidade Savassi - BH no formulário. Nossa equipe realiza a avaliação profissional e o planejamento digital do sorriso antes do procedimento. As condições Black Friday são válidas para as vagas disponíveis desta semana.",
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