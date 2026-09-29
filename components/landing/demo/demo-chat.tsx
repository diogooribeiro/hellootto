'use client'
import { Instagram } from '@/components/otto/brand-icons'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowUp, Check, Paperclip, PencilLine, RefreshCcw, CalendarCheck, TrendingUp } from 'lucide-react'
import { OttoEyes, type OttoMode } from '@/components/otto/eyes'
import { CafePost } from '@/components/app/cafe-post'
import { cn } from '@/lib/utils'
import { REQUEST } from './steps'

const SUGGESTIONS = [
  'Quero começar minha marca.',
  'Preciso criar uma nova promoção.',
  'Post aprovado. Publique amanhã às 18h.',
  'Como foram meus resultados hoje?',
]

function useElapsed(active: boolean) {
  const [ms, setMs] = useState(0)
  useEffect(() => {
    if (!active) return
    setMs(0)
    const start = performance.now()
    const id = window.setInterval(() => setMs(performance.now() - start), 60)
    return () => window.clearInterval(id)
  }, [active])
  return ms
}

function Human({ children }: { children: ReactNode }) {
  return (
    <div className="rise ml-auto max-w-[70%] rounded-[20px] rounded-br-[6px] bg-lilac px-5 py-3.5 text-[15px] leading-relaxed text-ink">
      {children}
    </div>
  )
}

function Otto({ children, mode = 'idle' }: { children: ReactNode; mode?: OttoMode }) {
  return (
    <div className="rise flex items-start gap-3">
      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-otto">
        <OttoEyes className="w-[22px] text-white" mode={mode} />
      </span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}

function WorkList({ done }: { done: boolean }) {
  const ms = useElapsed(!done)
  const items = ['Planejando a promoção', 'Criando a peça', 'Escrevendo a legenda', 'Preparando a publicação']
  const finished = done ? items.length : Math.min(items.length - 1, Math.floor(ms / 1100))
  return (
    <ul className="flex flex-col gap-2.5 rounded-2xl border border-line bg-white p-4">
      {items.map((item, i) => {
        const isDone = i < finished
        const isActive = i === finished && !done
        const visible = done || i <= finished
        return (
          <li
            key={item}
            className={cn(
              'flex items-center gap-3 text-[14px] transition-opacity duration-300',
              visible ? 'opacity-100' : 'opacity-25',
            )}
          >
            <span
              className={cn(
                'grid size-5 place-items-center rounded-full transition-colors',
                isDone ? 'bg-otto text-white' : 'border border-otto/40',
              )}
            >
              {isDone ? (
                <Check className="size-3" strokeWidth={3} />
              ) : isActive ? (
                <span className="size-1.5 animate-pulse rounded-full bg-otto" />
              ) : null}
            </span>
            <span className={cn(isActive ? 'shimmer-text font-medium' : isDone ? 'text-ink' : 'text-muted')}>
              {item}
              {isActive ? '…' : ''}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

function Brief() {
  const rows = [
    ['Objetivo', 'Movimentar o café amanhã'],
    ['Oferta', 'Leve 2, pague 1'],
    ['Canal', 'Instagram · Feed'],
    ['Quando', 'Amanhã'],
  ]
  return (
    <div className="mt-3 overflow-hidden rounded-2xl border border-line">
      <div className="flex items-center justify-between bg-mist px-4 py-2.5">
        <span className="text-[11px] font-bold tracking-[0.16em] text-ink uppercase">Café da Praça</span>
        <span className="text-[11px] text-muted">Usando sua marca e seu tom de voz</span>
      </div>
      <dl className="grid grid-cols-4 divide-x divide-line">
        {rows.map(([k, v], i) => (
          <div key={k} className="rise px-4 py-3" style={{ animationDelay: `${120 + i * 110}ms` }}>
            <dt className="text-[11px] text-muted">{k}</dt>
            <dd className="mt-0.5 text-[14px] font-semibold text-ink">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function Delivery({ step, onApprove }: { step: number; onApprove: () => void }) {
  const approved = step >= 5
  return (
    <div className="mt-3 flex gap-5 rounded-[22px] border border-line bg-white p-4">
      <CafePost className="w-[300px] shrink-0 shadow-[0_18px_40px_-20px_rgba(34,57,44,0.5)]" />
      <div className="flex min-w-0 flex-1 flex-col py-1">
        <span className="text-[11px] font-bold tracking-[0.16em] text-muted uppercase">Legenda</span>
        <p className="mt-2 text-[14px] leading-relaxed text-ink">
          Amanhã é dia de dividir. Leve 2 cafés e pague 1, em qualquer café da casa. Chama alguém e vem pra
          praça.
        </p>
        <p className="mt-1.5 text-[13px] text-otto">#cafedapraca #leve2pague1</p>
        <dl className="mt-auto grid grid-cols-2 gap-3 border-t border-line pt-3 text-[12px]">
          <div>
            <dt className="text-muted">Canal</dt>
            <dd className="mt-0.5 flex items-center gap-1.5 font-semibold text-ink">
              <Instagram className="size-3.5" /> Instagram
            </dd>
          </div>
          <div>
            <dt className="text-muted">Data sugerida</dt>
            <dd className="mt-0.5 font-semibold text-ink">Amanhã, 18h</dd>
          </div>
        </dl>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={onApprove}
            disabled={approved}
            className={cn(
              'inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full text-[13px] font-semibold transition-colors',
              approved ? 'bg-lilac text-otto' : 'bg-otto text-white hover:bg-otto-deep',
            )}
          >
            <Check className="size-4" /> {approved ? 'Aprovado' : 'Aprovar'}
          </button>
          <button
            type="button"
            className="inline-flex h-10 items-center gap-1.5 rounded-full border border-line px-3.5 text-[13px] font-medium text-ink hover:border-ink/30"
          >
            <PencilLine className="size-3.5" /> Editar
          </button>
          <button
            type="button"
            className="inline-flex h-10 items-center gap-1.5 rounded-full border border-line px-3.5 text-[13px] font-medium text-ink hover:border-ink/30"
          >
            <RefreshCcw className="size-3.5" /> Pedir ajuste
          </button>
        </div>
      </div>
    </div>
  )
}

function Results() {
  const metrics = [
    ['4,8 mil', 'pessoas alcançadas'],
    ['124', 'interações'],
    ['18', 'cliques'],
  ]
  return (
    <div className="mt-3 rounded-[22px] border border-line bg-white p-5">
      <span className="text-[11px] font-bold tracking-[0.16em] text-muted uppercase">Hoje · Leve 2, pague 1</span>
      <dl className="mt-3 grid grid-cols-3 gap-3">
        {metrics.map(([v, l], i) => (
          <div key={l} className="rise rounded-2xl bg-mist p-4" style={{ animationDelay: `${i * 120}ms` }}>
            <dd className="text-[30px] leading-none font-semibold tracking-[-0.04em] text-ink">{v}</dd>
            <dt className="mt-1.5 text-[12px] text-muted">{l}</dt>
          </div>
        ))}
      </dl>
      <p className="mt-4 flex items-center gap-2 text-[15px] font-medium text-ink">
        <TrendingUp className="size-4 text-otto" />
        Esse post performou melhor que sua média recente.
      </p>
      <p className="mt-1.5 text-[14px] leading-relaxed text-muted">
        A oferta combinada puxou as interações. Sugiro repetir o formato na sexta, no mesmo horário. Quer que eu
        prepare?
      </p>
      <div className="mt-3 flex gap-2">
        <span className="rounded-full bg-otto px-4 py-2 text-[13px] font-semibold text-white">Preparar para sexta</span>
        <span className="rounded-full border border-line px-4 py-2 text-[13px] font-medium text-ink">Agora não</span>
      </div>
    </div>
  )
}

type Props = { step: number; onGoTo: (step: number) => void }

export function DemoChat({ step, onGoTo }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputTargetRef = useRef<HTMLSpanElement>(null)
  const typedMs = useElapsed(step === 0)
  const typed = step === 0 ? REQUEST.slice(0, Math.max(0, Math.floor((typedMs - 600) / 45))) : ''

  useEffect(() => {
    const box = scrollRef.current
    if (!box) return
    const group = box.querySelector<HTMLElement>(`[data-step="${step}"]`)
    const top = group ? group.offsetTop - 24 : 0
    box.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
  }, [step])

  return (
    <div className="flex min-w-0 flex-1 flex-col bg-white">
      <div ref={scrollRef} className="no-scrollbar relative flex-1 overflow-y-auto px-8 pt-6 pb-10">
        {step === 0 ? (
          <div className="flex h-full flex-col items-center justify-center pb-6 text-center">
            <OttoEyes className="w-[84px] text-otto" mode="typing" target={inputTargetRef} />
            <h3 className="mt-6 text-[36px] font-semibold tracking-[-0.045em] text-ink">O que vamos criar hoje?</h3>
            <p className="mt-2 text-[15px] text-muted">Otto já conhece o Café da Praça. É só pedir.</p>
            <div className="mt-7 grid w-full max-w-[560px] grid-cols-2 gap-2.5">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => onGoTo(1)}
                  className={cn(
                    'rounded-2xl border px-4 py-3 text-left text-[14px] transition-colors hover:border-otto hover:text-otto',
                    i === 1 ? 'border-otto/40 bg-lilac/60 text-ink' : 'border-line text-ink/80',
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="text-center text-[11px] font-medium tracking-[0.14em] text-muted uppercase">Hoje, 10:12</div>
            <div data-step="1" className="flex flex-col gap-6">
              <Human>{REQUEST}</Human>
            </div>

            {step >= 2 && (
              <div data-step="2">
                <Otto>
                  <p className="text-[15px] leading-relaxed text-ink">
                    Entendi. Vamos movimentar o café amanhã com uma oferta simples e fácil de lembrar.
                  </p>
                  <Brief />
                  <p className="mt-2.5 text-[12px] text-muted">Essa entrega usa 2 créditos: 1 arte com legenda.</p>
                </Otto>
              </div>
            )}

            {step >= 3 && (
              <div data-step="3">
                <Otto mode={step === 3 ? 'thinking' : 'idle'}>
                  <p className="mb-3 text-[15px] text-ink">
                    {step === 3 ? 'Mãos à obra.' : 'Tudo pronto.'}
                  </p>
                  <WorkList done={step > 3} />
                </Otto>
              </div>
            )}

            {step >= 4 && (
              <div data-step="4">
                <Otto mode={step === 4 ? 'happy' : 'idle'}>
                  <p className="text-[15px] leading-relaxed text-ink">
                    Pronto. Usei as cores e o tom do Café da Praça. Quer publicar amanhã, no fim da tarde?
                  </p>
                  <Delivery step={step} onApprove={() => onGoTo(5)} />
                </Otto>
              </div>
            )}

            {step >= 5 && (
              <div data-step="5" className="flex flex-col gap-6">
                <Human>Aprovado. Publica amanhã às 18h.</Human>
                <Otto mode={step === 5 ? 'happy' : 'idle'}>
                  <p className="text-[15px] text-ink">Fechado. Amanhã, 18h.</p>
                  <span className="rise mt-2.5 inline-flex items-center gap-2 rounded-full bg-lilac px-3.5 py-2 text-[13px] font-semibold text-otto">
                    <CalendarCheck className="size-4" /> Agendado no Instagram · Quarta, 18h
                  </span>
                </Otto>
              </div>
            )}

            {step >= 6 && (
              <div data-step="6" className="flex flex-col gap-6">
                <div className="flex items-center gap-3 text-[11px] font-medium tracking-[0.14em] text-muted uppercase">
                  <span className="h-px flex-1 bg-line" /> Quarta, 21:40 <span className="h-px flex-1 bg-line" />
                </div>
                <Human>Como foram meus resultados hoje?</Human>
                <Otto>
                  <p className="text-[15px] text-ink">Foi um bom dia. Olha só:</p>
                  <Results />
                </Otto>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="px-8 pb-6">
        <div
          className={cn(
            'flex h-[58px] items-center gap-3 rounded-full border-2 bg-white pr-2 pl-5 transition-colors',
            step === 0 ? 'border-otto' : 'border-line',
          )}
        >
          <Paperclip className="size-4 text-muted" />
          <div className="flex-1 truncate text-[15px] whitespace-pre text-ink">
            {step === 0 ? (
              <>
                {typed}
                <span ref={inputTargetRef} className="caret" />
              </>
            ) : (
              <span className="text-muted">Escreva para o Otto…</span>
            )}
          </div>
          <button
            type="button"
            aria-label="Enviar"
            onClick={() => step === 0 && onGoTo(1)}
            className={cn(
              'grid size-[42px] place-items-center rounded-full transition-colors',
              step === 0 && typed.length > 10 ? 'bg-otto text-white' : 'bg-mist text-muted',
            )}
          >
            <ArrowUp className="size-5" strokeWidth={2.4} />
          </button>
        </div>
      </div>
    </div>
  )
}
