'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AppSidebar } from '@/components/app/app-sidebar'
import { OttoEyes } from '@/components/otto/eyes'
import { cn } from '@/lib/utils'
import { DemoChat } from './demo-chat'
import { DemoContext } from './demo-context'
import { STEPS } from './steps'

const NAV_HEIGHT = 72

export function DemoSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0
    const measure = () => {
      raf = 0
      const el = trackRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const distance = rect.height - (window.innerHeight - NAV_HEIGHT)
      const p = Math.min(1, Math.max(0, (NAV_HEIGHT - rect.top) / distance))
      setProgress(p)
      setStep(Math.min(STEPS.length - 1, Math.floor(p * STEPS.length)))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const goTo = useCallback((target: number) => {
    const el = trackRef.current
    if (!el) return
    const distance = el.offsetHeight - (window.innerHeight - NAV_HEIGHT)
    const top = el.offsetTop - NAV_HEIGHT + distance * ((target + 0.35) / STEPS.length)
    window.scrollTo({ top, behavior: 'smooth' })
  }, [])

  const current = STEPS[step]

  return (
    <section id="como-funciona" aria-labelledby="demo-title" className="bg-mist">
      <div className="mx-auto grid max-w-[1360px] grid-cols-[1fr_auto] items-end gap-10 px-10 pt-32 pb-12">
        <div>
          <p className="text-[13px] font-bold tracking-[0.18em] text-otto uppercase">Como funciona</p>
          <h2 id="demo-title" className="mt-4 text-[60px] leading-[1] font-semibold tracking-[-0.05em] text-ink">
            Uma conversa.
            <br />
            Do pedido ao resultado.
          </h2>
        </div>
        <p className="max-w-[360px] pb-2 text-[17px] leading-relaxed text-muted">
          Role e acompanhe o Otto criando uma promoção de verdade para um café de bairro.
        </p>
      </div>

      <div ref={trackRef} style={{ height: `${STEPS.length * 75 + 100}vh` }} className="relative">
        <div
          className="sticky flex flex-col px-10 pb-8"
          style={{ top: NAV_HEIGHT, height: `calc(100vh - ${NAV_HEIGHT}px)` }}
        >
          <div className="mx-auto flex h-full w-full max-w-[1360px] flex-col">
            <div className="flex items-center gap-6 pt-3 pb-5">
              <div className="flex w-[300px] shrink-0 items-center gap-3" aria-live="polite">
                <span className="grid size-11 place-items-center rounded-full bg-otto">
                  <OttoEyes className="w-[26px] text-white" mode={current.mode} />
                </span>
                <span>
                  <span className="block text-[11px] font-bold tracking-[0.16em] text-muted uppercase">
                    Passo {step + 1} de {STEPS.length}
                  </span>
                  <span key={step} className="rise block text-[20px] font-semibold tracking-[-0.03em] text-ink">
                    {current.title}
                  </span>
                </span>
              </div>
              <ol className="flex flex-1 gap-2">
                {STEPS.map((s, i) => {
                  const fill = Math.min(1, Math.max(0, progress * STEPS.length - i))
                  return (
                    <li key={s.label} className="flex-1">
                      <button
                        type="button"
                        onClick={() => goTo(i)}
                        aria-current={i === step ? 'step' : undefined}
                        className="group w-full text-left"
                      >
                        <span className="block h-1 overflow-hidden rounded-full bg-ink/10">
                          <span className="block h-full rounded-full bg-otto" style={{ width: `${fill * 100}%` }} />
                        </span>
                        <span
                          className={cn(
                            'mt-2 block text-[12px] font-semibold transition-colors',
                            i === step ? 'text-otto' : i < step ? 'text-ink' : 'text-muted group-hover:text-ink',
                          )}
                        >
                          {s.label}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ol>
            </div>

            <div className="flex min-h-0 flex-1 overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_40px_100px_-40px_rgba(23,24,43,0.28)]">
              <AppSidebar active="chat" credits={step >= 4 ? 70 : 72} />
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex h-14 shrink-0 items-center justify-between border-b border-line px-8">
                  <span className="text-[14px] font-semibold text-ink">Chat com Otto</span>
                  <span className="flex items-center gap-2 text-[12px] font-medium text-muted">
                    <span className={cn('size-2 rounded-full', step === 3 ? 'animate-pulse bg-otto' : 'bg-emerald-500')} />
                    {current.status}
                  </span>
                </div>
                <div className="flex min-h-0 flex-1">
                  <DemoChat step={step} onGoTo={goTo} />
                  <DemoContext step={step} />
                </div>
              </div>
            </div>
            <p className="mt-3 text-center text-[12px] text-muted">
              Demonstração. Café da Praça é uma marca fictícia.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
