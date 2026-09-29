import { FileImage, FileText, Film, TrendingUp } from 'lucide-react'
import { CafePost } from '@/components/app/cafe-post'
import { OttoEyes } from '@/components/otto/eyes'
import { cn } from '@/lib/utils'

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn('text-[11px] font-bold tracking-[0.18em] uppercase', className)}>{children}</span>
  )
}

function BrandModule() {
  return (
    <div className="flex flex-col rounded-[24px] bg-cafe-green p-6 text-cafe-cream">
      <Label className="text-cafe-cream/60">Minha marca</Label>
      <p className="mt-10 font-serif text-[38px] leading-[0.95] italic">Café da Praça</p>
      <p className="mt-2 text-[13px] text-cafe-cream/70">Cafeteria de bairro, desde 2011.</p>
      <div className="mt-6 flex items-end gap-1.5">
        <span className="h-8 flex-[2] rounded-lg bg-cafe-cream" />
        <span className="h-6 flex-1 rounded-lg bg-cafe-clay" />
        <span className="h-4 flex-1 rounded-lg border border-cafe-cream/25" />
      </div>
      <dl className="mt-5 flex flex-col gap-3 border-t border-cafe-cream/15 pt-4 text-[13px]">
        <div className="flex justify-between gap-3">
          <dt className="text-cafe-cream/55">Tom de voz</dt>
          <dd className="font-medium">Próximo e direto</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-cafe-cream/55">Objetivo</dt>
          <dd className="font-medium">Vender mais</dd>
        </div>
      </dl>
    </div>
  )
}

function Swatch({ title, tone }: { title: React.ReactNode; tone: 'clay' | 'green' }) {
  const top = tone === 'clay'
  return (
    <div
      className={cn(
        'flex aspect-square rounded-[6px] p-3.5 font-serif leading-[0.9] text-cafe-cream',
        top ? 'flex-col bg-cafe-clay' : 'flex-col-reverse bg-[#2f4a3a]',
      )}
    >
      <span className="text-[24px]">{title}</span>
      <span className={cn('text-[11px] italic opacity-75', top ? 'mt-auto' : 'mb-auto self-end')}>Café da Praça</span>
    </div>
  )
}

const STATUS = {
  Agendado: 'bg-otto text-white',
  Publicado: 'bg-ink text-white',
  Rascunho: 'bg-white text-muted ring-1 ring-line',
} as const

function Piece({
  status,
  when,
  className,
  children,
}: {
  status: keyof typeof STATUS
  when: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <figure className={cn('shrink-0', className)}>
      <div className="shadow-[0_24px_48px_-28px_rgba(23,24,43,0.4)]">{children}</div>
      <figcaption className="mt-3 flex items-center gap-2 whitespace-nowrap">
        <span className={cn('rounded-full px-2.5 py-1 text-[11px] font-semibold', STATUS[status])}>{status}</span>
        <span className="text-[12px] text-muted">{when}</span>
      </figcaption>
    </figure>
  )
}

function ContentModule() {
  return (
    <div className="flex flex-col">
      <Label className="text-muted">Conteúdos</Label>
      <div className="mt-6 flex items-end">
        <Piece status="Publicado" when="Ter, 12h" className="w-[27%] -rotate-2">
          <Swatch
            tone="clay"
            title={
              <>
                Bolo
                <br />
                do dia
              </>
            }
          />
        </Piece>
        <Piece status="Agendado" when="Qua, 18h" className="relative z-10 -ml-4 w-[48%] [&>figcaption]:pl-8">
          <CafePost />
        </Piece>
        <Piece status="Rascunho" when="Sem data" className="ml-6 w-[27%]">
          <Swatch
            tone="green"
            title={
              <>
                Playlist
                <br />
                da casa
              </>
            }
          />
        </Piece>
      </div>
    </div>
  )
}

function CampaignModule() {
  const total = 7
  const done = 5
  return (
    <div className="flex flex-col rounded-[20px] bg-white p-5 ring-1 ring-line">
      <Label className="text-otto">Campanha</Label>
      <p className="mt-2.5 text-[18px] leading-[1.1] font-semibold tracking-[-0.03em] text-ink">
        Semana do cappuccino
      </p>
      <p className="mt-1 text-[12px] text-muted">14 a 20 de setembro</p>
      <div className="mt-4 flex gap-1">
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={cn('h-1.5 flex-1 rounded-full', i < done ? 'bg-otto' : 'bg-lilac-strong')} />
        ))}
      </div>
      <p className="mt-2 text-[12px] font-medium text-ink">
        {done} de {total} peças prontas
      </p>
    </div>
  )
}

function CalendarModule() {
  const entries = [
    { day: 'Ter', n: 15, title: 'Bolo do dia', time: '12h', tone: 'bg-white/10 text-white' },
    { day: 'Qua', n: 16, title: 'Leve 2, pague 1', time: '18h', tone: 'bg-otto text-white' },
    { day: 'Qui', n: 17, title: 'Cappuccino gelado', time: '16h', tone: 'bg-white/10 text-white' },
    { day: 'Sex', n: 18, title: 'Playlist da casa', time: '17h', tone: 'bg-white/10 text-white' },
  ]
  return (
    <div className="flex flex-col rounded-[20px] bg-ink p-5 text-white">
      <div className="flex items-baseline justify-between">
        <Label className="text-white/50">Calendário</Label>
        <span className="text-[12px] text-white/50">Esta semana</span>
      </div>
      <ol className="mt-4 flex flex-col gap-2">
        {entries.map((e) => (
          <li key={e.n} className="flex items-center gap-3">
            <span className="w-8 shrink-0 text-center">
              <span className="block text-[10px] font-semibold tracking-wider text-white/45 uppercase">{e.day}</span>
              <span className="block text-[15px] leading-tight font-semibold">{e.n}</span>
            </span>
            <span className={cn('flex flex-1 items-center justify-between gap-2 rounded-lg px-3 py-2 text-[12px] font-semibold', e.tone)}>
              <span className="truncate">{e.title}</span>
              <span className="shrink-0 opacity-75">{e.time}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function UtilityStrip() {
  const used = 72
  const files = [
    { icon: FileImage, name: 'Logo.svg' },
    { icon: FileText, name: 'Brandbook.pdf' },
    { icon: Film, name: 'Reels.mp4' },
  ]
  return (
    <div className="mt-12 grid grid-cols-3 gap-10 border-t border-line pt-8">
      <div>
        <Label className="flex items-center gap-2 text-muted">
          <TrendingUp className="size-3.5 text-otto" /> Insight
        </Label>
        <p className="mt-2.5 text-[15px] leading-snug font-medium text-ink">
          Fim de tarde vem performando melhor. <span className="text-otto">2,4× mais alcance.</span>
        </p>
      </div>
      <div>
        <Label className="text-muted">Créditos</Label>
        <div className="mt-2.5 flex items-center gap-3">
          <p className="text-[15px] font-medium text-ink whitespace-nowrap">
            <span className="text-[20px] font-semibold tracking-[-0.03em]">{used}</span>
            <span className="text-muted"> / 100</span>
          </p>
          <span className="h-1.5 max-w-[180px] flex-1 overflow-hidden rounded-full bg-lilac-strong">
            <span className="block h-full rounded-full bg-otto" style={{ width: `${used}%` }} />
          </span>
        </div>
      </div>
      <div>
        <Label className="text-muted">Arquivos</Label>
        <ul className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[14px] font-medium text-ink">
          {files.map((f) => (
            <li key={f.name} className="flex items-center gap-1.5 whitespace-nowrap">
              <f.icon className="size-3.5 text-otto" />
              {f.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function ProductSection() {
  return (
    <section id="produto" aria-labelledby="produto-title" className="bg-white py-32">
      <div className="mx-auto max-w-[1360px] px-10">
        <div className="grid grid-cols-[1fr_auto] items-end gap-10">
          <div>
            <p className="text-[13px] font-bold tracking-[0.18em] text-otto uppercase">Produto</p>
            <h2
              id="produto-title"
              className="mt-4 text-[60px] leading-[1] font-semibold tracking-[-0.05em] text-ink"
            >
              Tudo que o Otto faz
              <br />
              fica organizado.
            </h2>
          </div>
          <div className="flex max-w-[380px] items-start gap-4 pb-2">
            <span className="mt-1 grid size-10 shrink-0 place-items-center rounded-full bg-otto">
              <OttoEyes className="w-[22px] text-white" />
            </span>
            <p className="text-[17px] leading-relaxed text-muted">
              Sua marca, as peças, campanhas, calendário e arquivos ficam num só lugar. E o Otto lembra de cada
              detalhe na próxima entrega.
            </p>
          </div>
        </div>

        <div
          aria-label="Visão geral da plataforma HelloOtto"
          role="img"
          className="mt-14 rounded-[36px] bg-mist px-12 pt-12 pb-10"
        >
          <div className="grid grid-cols-[240px_1fr_280px] items-start gap-10 xl:gap-14">
            <BrandModule />
            <ContentModule />
            <div className="flex flex-col gap-4">
              <CampaignModule />
              <CalendarModule />
            </div>
          </div>
          <UtilityStrip />
        </div>
      </div>
    </section>
  )
}
