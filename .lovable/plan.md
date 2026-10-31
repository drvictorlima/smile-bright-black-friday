# Apontar megadescontoblackfriday.com para a Vercel

Não consigo desconectar domínios nem editar registros DNS por aqui. Você faz isso na tela do Lovable, e nada no site muda. Siga os passos abaixo, nesta ordem.

## 1. Desconectar o domínio deste projeto
1. Abra **Configurações do projeto → Domínios**.
2. Em **megadescontoblackfriday.com**, clique em **⋯ → Remover/Desconectar**. Se ele for o domínio **Principal**, clique antes em **Deixar de ser principal**.
3. Faça o mesmo com **www.megadescontoblackfriday.com**, caso ele apareça separado.
4. Desconectar costuma apagar sozinho o registro A (185.158.133.1) e os TXT `_lovable` / `_lovable.www`. Confira no passo 2.

## 2. Editar o DNS (domínio comprado pelo Lovable)
Caminho: **Configurações do espaço de trabalho → Domínios do espaço de trabalho → megadescontoblackfriday.com → Configurar** (ou **Configurações do domínio → Avançado**) **→ Registros DNS**.

Apague apenas estes registros, se ainda existirem:
- A `@` → 185.158.133.1
- A `www` → 185.158.133.1 (é preciso apagar, porque um CNAME não pode ficar junto com outro registro em `www`)
- TXT `_lovable` e TXT `_lovable.www` (valores `lovable_verify=…`)

Adicione:
| Tipo | Host | Valor | TTL |
|---|---|---|---|
| A | @ | 216.198.79.1 | 300 |
| CNAME | www | 38c156a018c80c94.vercel-dns-017.com | 300 |

Não altere:
- os servidores de nome (nameservers);
- os registros MX, nem os TXT de e-mail (SPF `v=spf1…`, DKIM, `_dmarc`).

## 3. Na Vercel
- Adicione os dois domínios ao projeto na Vercel e aguarde a verificação. A propagação costuma levar de alguns minutos a algumas horas.

## Observações
- Enquanto o DNS se propaga, o site pode ficar fora do ar por algum tempo.
- O endereço smile-bright-black-friday.lovable.app continua funcionando.
- Se o Lovable não deixar apagar algum registro porque ele ainda está ligado ao projeto, volte ao passo 1 e confirme que a desconexão terminou.
