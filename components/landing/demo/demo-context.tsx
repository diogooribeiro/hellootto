import { Check } from 'lucide-react'
import { Instagram } from '@/components/otto/brand-icons'
import { cn } from '@/lib/utils'

function Panel({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <div className="rise flex h-full flex-col">
      <span className="text-[11px] font-bold tracking-[0.16em] text-muted uppercase">{label}</span>
      <h4 className="mt-1.5 text-[19px] font-semibold tracking-[-0.03em] text-ink">{title}</h4>
      <div className="mt-5 flex flex-1 flex-col">{children}</div>
    </div>
  )
}

function BrandPanel({ reading }: { reading: boolean }) {
  return (
    <Panel label="Minha marca" title="Café da Praça">
      <div className="flex aspect-[16/10] flex-col justify-between rounded-2xl bg-cafe-green p-4 text-cafe-cream">
        <span className="text-[10px] tracking-[0.2em] uppercase opacity-70">Cafeteria de bairro</span>
        <span className="font-serif text-[34px] leading-none italic">Café da Praça</span>
      </div>
      <div className="mt-3 flex gap-1.5">
        {['bg-cafe-green', 'bg-cafe-clay', 'bg-cafe-cream'].map((c) => (
          <span key={c} className={cn('h-8 flex-1 rounded-lg border border-black/5', c)} />
        ))}
      </div>
      <dl className="mt-5 flex flex-col gap-4 text-[13px]">
        <div>
          <dt className="text-muted">Tom de voz</dt>
          <dd className="mt-1.5 flex gap-1.5">
            {['Próxima', 'Direta'].map((t) => (
              <span key={t} className="rounded-full bg-mist px-2.5 py-1 font-medium text-ink">
                {t}
              </span>
            ))}
          </dd>
        </div>
        <div>
          <dt className="text-muted">Produtos</dt>
          <dd className="mt-1 font-medium text-ink">Espresso, cappuccino, bolo do dia</dd>
        </div>
        <div>
          <dt className="text-muted">Para quem</dt>
          <dd className="mt-1 font-medium text-ink">Vizinhos e quem trabalha no centro</dd>
        </div>
      </dl>
      <p
        className={cn(
          'mt-auto rounded-xl bg-lilac px-3 py-2.5 text-[12px] font-medium',
          reading ? 'shimmer-text bg-lilac' : 'text-otto',
        )}
      >
        {reading ? 'Otto está consultando sua marca…' : 'Otto lembra disso em toda conversa.'}
      </p>
    </Panel>
  )
}

function TaskPanel({ step }: { step: number }) {
  const stages = ['Pedido', 'Entendimento', 'Criação', 'Aprovação', 'Publicação']
  const current = step === 2 ? 2 : step === 3 ? 2 : 3
  return (
    <Panel label="Tarefa atual" title="Promoção de amanhã">
      <ol className="flex flex-col">
        {stages.map((s, i) => {
          const done = i < current || (step === 2 && i < 2)
          const active = i === current
          return (
            <li key={s} className="flex gap-3">
              <span className="flex flex-col items-center">
                <span
                  className={cn(
                    'grid size-6 place-items-center rounded-full text-[11px] font-semibold transition-colors',
                    done ? 'bg-otto text-white' : active ? 'bg-lilac text-otto ring-2 ring-otto' : 'bg-mist text-muted',
                  )}
                >
                  {done ? <Check className="size-3.5" strokeWidth={3} /> : i + 1}
                </span>
                {i < stages.length - 1 && <span className={cn('h-7 w-px', done ? 'bg-otto' : 'bg-line')} />}
              </span>
              <span className={cn('pt-0.5 text-[14px]', active ? 'font-semibold text-ink' : done ? 'text-ink' : 'text-muted')}>
                {s}
                {active && step === 3 && <span className="block text-[12px] font-normal text-otto">Em andamento</span>}
                {active && step === 4 && (
                  <span className="block text-[12px] font-normal text-otto">Aguardando você</span>
                )}
              </span>
            </li>
          )
        })}
      </ol>
      <div className="mt-auto flex flex-col gap-2 rounded-2xl bg-mist p-4 text-[13px]">
        <div className="flex justify-between">
          <span className="text-muted">Canal</span>
          <span className="flex items-center gap-1 font-medium text-ink">
            <Instagram className="size-3.5" /> Instagram
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Créditos</span>
          <span className="font-medium text-ink">2</span>
        </div>
      </div>
    </Panel>
  )
}

function CalendarPanel() {
  const days = [
    { d: 'Seg', n: 14, items: ['Bastidores da torra'] },
    { d: 'Ter', n: 15, today: true, items: ['Bolo do dia'] },
    { d: 'Qua', n: 16, items: [], fresh: true },
    { d: 'Qui', n: 17, items: [] },
    { d: 'Sex', n: 18, items: ['Playlist da casa'] },
    { d: 'Sáb', n: 19, items: [] },
  ]
  return (
    <Panel label="Calendário" title="Esta semana">
      <ul className="flex flex-col gap-1.5">
        {days.map((day) => (
          <li
            key={day.d}
            className={cn('flex gap-3 rounded-xl p-2.5', day.fresh ? 'bg-lilac' : day.today ? 'bg-mist' : '')}
          >
            <span className="w-9 shrink-0 text-center">
              <span className="block text-[10px] font-semibold text-muted uppercase">{day.d}</span>
              <span className={cn('block text-[17px] font-semibold', day.fresh ? 'text-otto' : 'text-ink')}>{day.n}</span>
            </span>
            <span className="flex min-w-0 flex-1 flex-col justify-center gap-1">
              {day.items.map((it) => (
                <span key={it} className="truncate rounded-md bg-white px-2 py-1 text-[12px] text-ink/70 ring-1 ring-line">
                  {it}
                </span>
              ))}
              {day.fresh && (
                <span
                  className="rise flex items-center justify-between rounded-md bg-otto px-2 py-1.5 text-[12px] font-semibold text-white"
                  style={{ animationDelay: '350ms' }}
                >
                  18h · Leve 2, pague 1
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
              )}
              {day.items.length === 0 && !day.fresh && <span className="text-[12px] text-muted/60">—</span>}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-auto text-[12px] text-muted">Publicar conteúdo aprovado no Pro não consome créditos.</p>
    </Panel>
  )
}

function ResultsPanel() {
  const bars = [38, 52, 44, 61, 47, 100]
  return (
    <Panel label="Resultados" title="Alcance dos últimos posts">
      <div className="flex h-44 items-end gap-2.5 rounded-2xl bg-mist p-4">
        {bars.map((b, i) => (
          <span key={i} className="flex flex-1 flex-col items-center gap-1.5">
            <span
              className={cn('w-full rounded-md transition-all duration-700', i === bars.length - 1 ? 'bg-otto' : 'bg-lilac-strong')}
              style={{ height: `${b * 1.1}px` }}
            />
            <span className="text-[10px] text-muted">{i === bars.length - 1 ? 'Hoje' : `#${i + 1}`}</span>
          </span>
        ))}
      </div>
      <p className="mt-4 text-[14px] leading-relaxed text-ink">
        <span className="font-semibold">Acima da média recente.</span> Melhor horário da semana: fim de tarde.
      </p>
      <p className="mt-auto rounded-xl bg-lilac px-3 py-2.5 text-[12px] font-medium text-otto">
        Otto guarda esse aprendizado para os próximos posts.
      </p>
    </Panel>
  )
}

export function DemoContext({ step }: { step: number }) {
  return (
    <aside aria-label="Contexto" className="w-[292px] shrink-0 border-l border-line bg-white p-6">
      {step <= 1 && <BrandPanel key="brand" reading={step === 1} />}
      {step >= 2 && step <= 4 && <TaskPanel key="task" step={step} />}
      {step === 5 && <CalendarPanel key="cal" />}
      {step === 6 && <ResultsPanel key="res" />}
    </aside>
  )
}
