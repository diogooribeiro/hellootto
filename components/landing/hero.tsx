'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowUp } from 'lucide-react'
import { OttoLogo } from '@/components/otto/logo'
import type { OttoMode } from '@/components/otto/eyes'

const PROMPTS = [
  'Otto, preciso criar uma nova promoção.',
  'Quero começar minha marca.',
  'Post aprovado. Publica amanhã às 18h.',
  'Como foram meus resultados hoje?',
]

function useAutoType(active: boolean) {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'hold' | 'erasing'>('typing')

  useEffect(() => {
    if (!active) return
    const full = PROMPTS[index]
    let delay = 48
    if (phase === 'typing' && text === full) {
      delay = 0
    }
    const id = window.setTimeout(() => {
      if (phase === 'typing') {
        if (text.length < full.length) setText(full.slice(0, text.length + 1))
        else setPhase('hold')
      } else if (phase === 'hold') {
        setPhase('erasing')
      } else if (text.length > 0) {
        setText(text.slice(0, -1))
      } else {
        setIndex((index + 1) % PROMPTS.length)
        setPhase('typing')
      }
    }, phase === 'hold' ? 2200 : phase === 'erasing' ? 18 : delay + Math.random() * 40)
    return () => window.clearTimeout(id)
  }, [active, text, index, phase])

  return { text, isHolding: phase === 'hold' }
}

export function Hero() {
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const [mode, setMode] = useState<OttoMode>('idle')
  const [reply, setReply] = useState<string | null>(null)
  const caretRef = useRef<HTMLSpanElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const autoTyping = !focused && value === '' && reply === null
  const auto = useAutoType(autoTyping)
  const shown = autoTyping ? auto.text : value

  let eyesMode: OttoMode = mode
  if (mode === 'idle') {
    if (focused || (autoTyping && !auto.isHolding && auto.text.length > 0)) eyesMode = 'typing'
  }

  const submit = (text: string) => {
    const message = text.trim() || PROMPTS[0]
    setValue(message)
    setMode('pop')
    inputRef.current?.blur()
    window.setTimeout(() => setMode('thinking'), 550)
    window.setTimeout(() => {
      setMode('happy')
      setReply('Deixa comigo. Olha só como eu faço.')
    }, 1700)
    window.setTimeout(() => {
      document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })
    }, 2700)
    window.setTimeout(() => {
      setMode('idle')
      setReply(null)
      setValue('')
    }, 5200)
  }

  return (
    <section id="topo" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="mx-auto flex max-w-[1360px] flex-col items-center px-10 pt-16 pb-24">
        <p className="rise mb-10 flex items-center gap-2 rounded-full bg-lilac px-4 py-2 text-[13px] font-semibold text-otto">
          <span className="size-1.5 rounded-full bg-otto" aria-hidden />
          Parceiro de marketing com IA para pequenos negócios
        </p>

        <OttoLogo
          className="rise w-[860px] max-w-full text-otto [animation-delay:80ms]"
          mode={eyesMode}
          target={caretRef}
        />

        <form
          className="rise relative mt-10 w-[940px] max-w-full [animation-delay:160ms]"
          onSubmit={(e) => {
            e.preventDefault()
            submit(value)
          }}
        >
          <label htmlFor="hero-input" className="sr-only">
            Converse com o Otto
          </label>
          <div
            className={`relative flex h-[92px] items-center rounded-full border-2 bg-white pl-10 pr-3 shadow-[0_24px_60px_-28px_rgba(52,48,255,0.35)] transition-colors ${
              focused ? 'border-otto' : 'border-ink/10'
            }`}
          >
            <div className="relative flex-1 text-[28px] font-medium tracking-[-0.02em]">
              <input
                ref={inputRef}
                id="hero-input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                autoComplete="off"
                className="w-full bg-transparent text-ink caret-otto outline-none focus-visible:outline-none"
              />
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-0 flex items-center whitespace-pre ${
                  autoTyping ? 'text-ink' : 'text-transparent'
                }`}
              >
                {shown}
                <span ref={caretRef} className={autoTyping ? 'caret' : 'inline-block w-px'} />
              </div>
            </div>
            <button
              type="submit"
              aria-label="Enviar para o Otto"
              className="grid size-[66px] shrink-0 place-items-center rounded-full bg-otto text-white transition-transform hover:scale-105 active:scale-95"
            >
              <ArrowUp className="size-7" strokeWidth={2.4} />
            </button>
          </div>

          <div className="mt-4 flex h-9 items-center justify-center gap-2" aria-live="polite">
            {reply ? (
              <p className="rise flex items-center gap-2 text-[15px] font-medium text-otto">
                {reply}
                <ArrowRight className="size-4 rotate-90" />
              </p>
            ) : mode === 'thinking' ? (
              <p className="shimmer-text text-[15px] font-medium">Otto está entendendo seu pedido…</p>
            ) : (
              <>
                <span className="mr-1 text-[13px] text-muted">Experimente:</span>
                {PROMPTS.slice(1).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => submit(p)}
                    className="rounded-full border border-line px-3.5 py-1.5 text-[13px] text-ink/80 transition-colors hover:border-otto hover:text-otto"
                  >
                    {p}
                  </button>
                ))}
              </>
            )}
          </div>
        </form>

        <div className="rise mt-20 grid w-full max-w-[1280px] grid-cols-[auto_1fr] items-end gap-12 [animation-delay:240ms]">
          <h1
            id="hero-title"
            className="text-[64px] leading-[1] font-semibold tracking-[-0.055em] whitespace-nowrap text-ink"
          >
            Você conta o que precisa.
            <br />
            <span className="text-otto">O Otto resolve.</span>
          </h1>
          <div className="pb-2">
            <p className="text-[19px] leading-relaxed text-muted text-pretty">
              Seu parceiro de marketing com IA, que conhece sua marca e ajuda a planejar, criar,
              publicar e acompanhar.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a
                href="#planos"
                className="inline-flex h-14 shrink-0 items-center gap-3 rounded-full bg-otto px-6 whitespace-nowrap text-[15px] font-semibold tracking-wide text-white uppercase transition-colors hover:bg-otto-deep"
              >
                Criar minha conta grátis
                <ArrowRight className="size-4" />
              </a>
              <a
                href="#como-funciona"
                className="inline-flex h-14 shrink-0 items-center rounded-full border border-ink/15 px-6 whitespace-nowrap text-[15px] font-semibold tracking-wide text-ink uppercase transition-colors hover:border-ink"
              >
                Ver como funciona
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
