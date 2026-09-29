'use client'

import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const FREE = ['Diagnóstico da sua marca', '10 créditos iniciais, uma vez', 'Conversa e glossário sem limite']
const PRO = [
  '100 créditos por mês',
  'Publicar conteúdos aprovados sem gastar créditos',
  'Campanhas, calendário e resultados',
  'Conversa e glossário sem limite',
]
const RECHARGES = [
  ['25 créditos', 'R$ 59'],
  ['50 créditos', 'R$ 99'],
  ['100 créditos', 'R$ 179'],
]

export function Plans() {
  const [annual, setAnnual] = useState(false)

  return (
    <section id="planos" aria-labelledby="planos-title" className="bg-mist py-32">
      <div className="mx-auto max-w-[1360px] px-10">
        <div className="flex items-end justify-between gap-10">
          <div>
            <p className="text-[13px] font-bold tracking-[0.18em] text-otto uppercase">Planos</p>
            <h2
              id="planos-title"
              className="mt-4 text-[60px] leading-[1] font-semibold tracking-[-0.05em] text-ink"
            >
              Comece grátis.
              <br />
              Cresça no seu ritmo.
            </h2>
          </div>
          <div role="radiogroup" aria-label="Período de cobrança" className="flex rounded-full bg-white p-1 ring-1 ring-line">
            {[
              { v: false, l: 'Mensal' },
              { v: true, l: 'Anual' },
            ].map((o) => (
              <button
                key={o.l}
                type="button"
                role="radio"
                aria-checked={annual === o.v}
                onClick={() => setAnnual(o.v)}
                className={cn(
                  'rounded-full px-5 py-2 text-[14px] font-semibold transition-colors',
                  annual === o.v ? 'bg-ink text-white' : 'text-ink/70 hover:text-ink',
                )}
              >
                {o.l}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid grid-cols-[1fr_1.35fr_0.9fr] gap-5">
          <article className="flex flex-col rounded-[28px] bg-white p-9 ring-1 ring-line">
            <h3 className="text-[20px] font-semibold text-ink">Free</h3>
            <p className="mt-1 text-[14px] text-muted">Para experimentar.</p>
            <p className="mt-8 text-[56px] leading-none font-semibold tracking-[-0.05em] text-ink">Grátis</p>
            <ul className="mt-8 mb-10 flex flex-col gap-3">
              {FREE.map((f) => (
                <li key={f} className="flex gap-2.5 text-[15px] text-ink">
                  <Check className="mt-0.5 size-4 shrink-0 text-otto" /> {f}
                </li>
              ))}
            </ul>
            <a
              href="#topo"
              className="mt-auto inline-flex h-14 items-center justify-center gap-2 rounded-full whitespace-nowrap border border-ink/15 text-[14px] font-semibold tracking-wide text-ink uppercase transition-colors hover:border-ink"
            >
              Criar minha conta grátis
            </a>
          </article>

          <article className="relative flex flex-col overflow-hidden rounded-[28px] bg-otto p-9 text-white">
            <div className="flex items-center justify-between">
              <h3 className="text-[20px] font-semibold">Pro</h3>
              <span className="rounded-full bg-white/15 px-3 py-1 text-[12px] font-semibold">Recomendado</span>
            </div>
            <p className="mt-1 text-[14px] text-white/75">Para manter o marketing em movimento.</p>
            <p className="mt-8 flex items-baseline gap-2">
              <span className="text-[56px] leading-none font-semibold tracking-[-0.05em]">
                {annual ? 'R$ 1.990' : 'R$ 199'}
              </span>
              <span className="text-[16px] text-white/75">{annual ? '/ano' : '/mês'}</span>
            </p>
            <p className="mt-2 h-5 text-[13px] text-white/80">
              {annual ? '+100 créditos de bônus na contratação e em cada renovação' : ''}
            </p>
            <ul className="mt-6 mb-10 flex flex-col gap-3">
              {PRO.map((f) => (
                <li key={f} className="flex gap-2.5 text-[15px]">
                  <Check className="mt-0.5 size-4 shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <a
              href="#topo"
              className="mt-auto inline-flex h-14 items-center justify-center gap-2 rounded-full whitespace-nowrap bg-white text-[14px] font-semibold tracking-wide text-otto uppercase transition-colors hover:bg-lilac"
            >
              Assinar o Pro <ArrowRight className="size-4" />
            </a>
          </article>

          <article className="flex flex-col rounded-[28px] bg-ink p-9 text-white">
            <h3 className="text-[20px] font-semibold">Recargas</h3>
            <p className="mt-1 text-[14px] text-white/65">Acabaram os créditos? É só recarregar.</p>
            <ul className="mt-8 flex flex-col divide-y divide-white/10">
              {RECHARGES.map(([c, p]) => (
                <li key={c} className="flex items-baseline justify-between py-4">
                  <span className="text-[15px] text-white/80">{c}</span>
                  <span className="text-[24px] font-semibold tracking-[-0.03em]">{p}</span>
                </li>
              ))}
            </ul>
            <p className="mt-auto text-[13px] leading-relaxed text-white/60">
              Você sempre vê quantos créditos uma entrega usa antes de confirmar.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
