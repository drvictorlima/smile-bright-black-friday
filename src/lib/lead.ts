import { z } from "zod";
import { OFFERS, currency } from "@/lib/offers";

export const leadSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome.").max(100, "Use até 100 caracteres no nome.")
    .regex(/^[\p{L}\p{M} '\-]+$/u, "Use somente letras no nome."),
  whats: z.string().trim().max(25).regex(/^[+\d\s().-]+$/, "Informe um WhatsApp válido com DDD.")
    .transform((value) => value.replace(/\D/g, ""))
    .refine((value) => /^(?:55)?[1-9]\d\d{8,9}$/.test(value), "Informe um WhatsApp válido com DDD."),
  email: z.string().trim().max(255).email("Informe um e-mail válido."),
  unidade: z.enum(["Tatuapé - SP", "Santos - SP", "Savassi - BH"], { message: "Selecione uma unidade." }),
  prazo: z.enum(["esta-semana", "data-futura"], { message: "Escolha quando deseja realizar o procedimento." }),
});

export function leadDestination(prazo: z.infer<typeof leadSchema>["prazo"]) {
  return prazo === "esta-semana" ? "whatsapp" : "agradecimento";
}

export function whatsappUrl(input: unknown, phone: string) {
  const lead = leadSchema.parse(input);
  if (leadDestination(lead.prazo) !== "whatsapp") return null;
  if (!/^\d{10,15}$/.test(phone)) return null;
  const message = `Olá! Quero garantir meu desconto de Black Friday (20 lentes por ${currency(OFFERS.twenty.price)}, cupom SORRISOBLACKFRIDAY).\n\nNome: ${lead.nome}\nWhatsApp: ${lead.whats}\nE-mail: ${lead.email}\nUnidade: ${lead.unidade}\nQuero realizar o procedimento nesta semana.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}