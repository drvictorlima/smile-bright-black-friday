export const OFFERS = {
  ten: { original: 5489, price: 2899, installments: 12 },
  twenty: { original: 8998, price: 5498, installments: 12 },
};

export function installmentAmount(offer: { price: number; installments: number }) {
  return Math.round((offer.price / offer.installments) * 100) / 100;
}

export function savings(offer: { original: number; price: number }) {
  return offer.original - offer.price;
}

export function currency(value: number) {
  return `R$ ${value.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}`;
}

export function installmentText(offer: { price: number; installments: number }) {
  const amount = installmentAmount(offer).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${offer.installments}x de R$ ${amount} sem juros`;
}