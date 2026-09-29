'use client'

import { useEffect, useRef, type RefObject } from 'react'

export type OttoMode = 'idle' | 'typing' | 'thinking' | 'happy' | 'pop'

type GazeOptions = {
  mode?: OttoMode
  /** Elemento para onde os olhos olham enquanto o modo é "typing". */
  target?: RefObject<HTMLElement | null>
  /** Posição horizontal (0–1) dentro do alvo — acompanha o texto digitado. */
  targetX?: number
}

type Subscriber = { tick: (now: number) => void }

const pointer = { x: 0, y: 0, at: 0 }
const subscribers = new Set<Subscriber>()
let loopStarted = false

function startLoop() {
  if (loopStarted || typeof window === 'undefined') return
  loopStarted = true
  window.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType === 'touch') return
      pointer.x = e.clientX
      pointer.y = e.clientY
      pointer.at = performance.now()
    },
    { passive: true },
  )
  let last = 0
  const frame = (now: number) => {
    if (now - last > 60 && !document.hidden) {
      last = now
      subscribers.forEach((s) => s.tick(now))
    }
    requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}

const WANDER: [number, number][] = [
  [0, 0],
  [-6, 2],
  [5, -2],
  [-2, 4],
  [0, 0],
  [7, 3],
]

/**
 * Faz os olhos do Otto ganharem vida: piscam, acompanham o cursor,
 * olham para o input durante a digitação e reagem ao modo atual.
 */
export function useOttoGaze(
  ref: RefObject<SVGSVGElement | null>,
  { mode = 'idle', target, targetX = 0.5 }: GazeOptions = {},
) {
  const opts = useRef({ mode, target, targetX })
  opts.current = { mode, target, targetX }

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    startLoop()

    let nextBlink = performance.now() + 1200 + Math.random() * 3000
    let wanderIndex = Math.floor(Math.random() * WANDER.length)
    let nextWander = 0
    let px = 0
    let py = 0

    const set = (x: number, y: number) => {
      const rx = Math.round(x * 2) / 2
      const ry = Math.round(y * 2) / 2
      if (rx === px && ry === py) return
      px = rx
      py = ry
      el.style.setProperty('--px', `${rx}px`)
      el.style.setProperty('--py', `${ry}px`)
    }

    const lookAtPoint = (rect: DOMRect, x: number, y: number) => {
      const dx = x - (rect.left + rect.width / 2)
      const dy = y - (rect.top + rect.height / 2)
      set(Math.tanh(dx / 320) * 9, Math.tanh(dy / 240) * 8)
    }

    const blink = () => {
      el.classList.remove('otto-blink')
      void el.getBoundingClientRect()
      el.classList.add('otto-blink')
      window.setTimeout(() => el.classList.remove('otto-blink'), 180)
    }

    const sub: Subscriber = {
      tick(now) {
        const rect = el.getBoundingClientRect()
        if (rect.bottom < 0 || rect.top > window.innerHeight) return
        const { mode, target, targetX } = opts.current

        if (now > nextBlink && mode !== 'thinking') {
          blink()
          if (Math.random() < 0.2) window.setTimeout(blink, 260)
          nextBlink = now + 2400 + Math.random() * 3600
        }

        if (mode === 'thinking') {
          set(0, -3)
          return
        }
        if (mode === 'typing' && target?.current) {
          const t = target.current.getBoundingClientRect()
          lookAtPoint(rect, t.left + t.width * targetX, t.top + t.height / 2)
          return
        }
        if (now - pointer.at < 2600) {
          lookAtPoint(rect, pointer.x, pointer.y)
          return
        }
        if (now > nextWander) {
          wanderIndex = (wanderIndex + 1) % WANDER.length
          nextWander = now + 1400 + Math.random() * 1600
        }
        const [wx, wy] = WANDER[wanderIndex]
        set(wx, wy)
      },
    }
    subscribers.add(sub)
    return () => {
      subscribers.delete(sub)
    }
  }, [ref])
}

/** Os dois “Os” do HelloOtto em coordenadas 0 0 174 108. */
export function EyesGlyph() {
  return (
    <>
      <g className="otto-eye-l">
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M 0 54 a46 46 0 1 0 92 0 a46 46 0 1 0 -92 0 M 22 54 a24 24 0 1 0 48 0 a24 24 0 1 0 -48 0"
        />
        <g className="otto-lid">
          <g className="otto-mode">
            <circle className="otto-pupil" fill="currentColor" cx="46" cy="54" r="12" />
          </g>
        </g>
      </g>
      <g className="otto-eye-r">
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M 82 54 a46 46 0 1 0 92 0 a46 46 0 1 0 -92 0 M 104 54 a24 24 0 1 0 48 0 a24 24 0 1 0 -48 0"
        />
        <g className="otto-lid">
          <g className="otto-mode">
            <circle className="otto-pupil" fill="currentColor" cx="128" cy="54" r="12" />
          </g>
        </g>
      </g>
    </>
  )
}

type OttoEyesProps = GazeOptions & {
  className?: string
  label?: string
}

export function OttoEyes({ className, label, mode = 'idle', target, targetX }: OttoEyesProps) {
  const ref = useRef<SVGSVGElement>(null)
  useOttoGaze(ref, { mode, target, targetX })
  return (
    <svg
      ref={ref}
      viewBox="-2 -2 178 112"
      className={className}
      data-otto-mode={mode}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      overflow="visible"
    >
      <EyesGlyph />
    </svg>
  )
}
