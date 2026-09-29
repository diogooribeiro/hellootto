'use client'

import { useRef } from 'react'
import { EyesGlyph, useOttoGaze, type OttoMode } from './eyes'
import type { RefObject } from 'react'

type LogoProps = {
  className?: string
  mode?: OttoMode
  target?: RefObject<HTMLElement | null>
  targetX?: number
}

export function OttoLogo({ className, mode = 'idle', target, targetX }: LogoProps) {
  const ref = useRef<SVGSVGElement>(null)
  useOttoGaze(ref, { mode, target, targetX })

  return (
    <svg
      ref={ref}
      viewBox="0 0 670 156"
      className={className}
      data-otto-mode={mode}
      role="img"
      aria-label="HelloOtto"
    >
      <g transform="translate(20 24)">
        <g fill="currentColor">
          <path d="M0 11Q0 0 11 0H23Q34 0 34 11V39H62V11Q62 0 73 0H85Q96 0 96 11V97Q96 108 85 108H73Q62 108 62 97V69H34V97Q34 108 23 108H11Q0 108 0 97Z" />
          <path
            fillRule="evenodd"
            d="M176 72H129Q132 84 144 84Q154 84 162 77L179 94Q166 111 144 111C116 111 100 93 100 68C100 43 118 25 142 25C169 25 184 47 180 67Q179 72 176 72Z M129 57H155Q153 46 143 46Q133 46 129 57Z"
          />
          <rect x="185" y="-4" width="30" height="112" rx="9" />
          <rect x="221" y="-4" width="30" height="112" rx="9" />
        </g>
        <g transform="translate(257 10)">
          <EyesGlyph />
        </g>
        <g fill="currentColor">
          <path d="M437 11Q437 0 448 0H457Q468 0 468 11V25H475Q485 25 485 35V43Q485 53 475 53H468V72Q468 82 478 82H485V101Q485 109 473 109H465Q437 109 437 79V53H434Q429 53 429 45V33Q429 25 437 25Z" />
          <path d="M495 11Q495 0 506 0H515Q526 0 526 11V25H533Q543 25 543 35V43Q543 53 533 53H526V72Q526 82 536 82H543V101Q543 109 531 109H523Q495 109 495 79V53H492Q487 53 487 45V33Q487 25 495 25Z" />
          <path
            fillRule="evenodd"
            d="M544 68a43 43 0 1 0 86 0a43 43 0 1 0 -86 0 M572 68a15 15 0 1 0 30 0a15 15 0 1 0 -30 0"
          />
        </g>
      </g>
    </svg>
  )
}
