'use client'

import {
  BarChart3,
  CalendarDays,
  CreditCard,
  FolderClosed,
  LayoutGrid,
  Megaphone,
  MessageCircle,
  Plug,
  Store,
  type LucideIcon,
} from 'lucide-react'
import { OttoEyes } from '@/components/otto/eyes'
import { cn } from '@/lib/utils'

export type AppView =
  | 'chat'
  | 'marca'
  | 'conteudos'
  | 'campanhas'
  | 'calendario'
  | 'resultados'
  | 'arquivos'
  | 'creditos'
  | 'canais'

export const NAV_ITEMS: { id: AppView; label: string; icon: LucideIcon }[] = [
  { id: 'chat', label: 'Chat com Otto', icon: MessageCircle },
  { id: 'marca', label: 'Minha marca', icon: Store },
  { id: 'conteudos', label: 'Conteúdos', icon: LayoutGrid },
  { id: 'campanhas', label: 'Campanhas', icon: Megaphone },
  { id: 'calendario', label: 'Calendário', icon: CalendarDays },
  { id: 'resultados', label: 'Resultados', icon: BarChart3 },
  { id: 'arquivos', label: 'Arquivos', icon: FolderClosed },
]

type Props = {
  active: AppView
  onSelect?: (view: AppView) => void
  credits?: number
}

export function AppSidebar({ active, onSelect, credits = 72 }: Props) {
  const interactive = Boolean(onSelect)
  const Item = ({ id, label, icon: Icon }: (typeof NAV_ITEMS)[number]) => {
    const isActive = active === id
    const cls = cn(
      'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium transition-colors',
      isActive ? 'bg-white text-ink shadow-[0_1px_0_rgba(23,24,43,0.06)]' : 'text-ink/60',
      interactive && !isActive && 'hover:bg-white/60 hover:text-ink',
    )
    const content = (
      <>
        <Icon className={cn('size-[17px]', isActive && 'text-otto')} strokeWidth={1.9} />
        {label}
      </>
    )
    return interactive ? (
      <button type="button" className={cls} aria-current={isActive ? 'page' : undefined} onClick={() => onSelect?.(id)}>
        {content}
      </button>
    ) : (
      <div className={cls} aria-current={isActive ? 'page' : undefined}>
        {content}
      </div>
    )
  }

  return (
    <aside className="flex w-[212px] shrink-0 flex-col bg-mist p-3">
      <div className="flex items-center gap-2.5 px-2 pt-2 pb-5">
        <OttoEyes className="h-[18px] w-auto text-otto" />
        <span className="text-[15px] font-bold tracking-[-0.03em] text-ink">HelloOtto</span>
      </div>

      <nav aria-label="Navegação da plataforma" className="flex flex-col gap-0.5">
        {NAV_ITEMS.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-2">
        <button
          type="button"
          disabled={!interactive}
          onClick={() => onSelect?.('creditos')}
          className={cn(
            'rounded-2xl border bg-white p-3 text-left transition-colors',
            active === 'creditos' ? 'border-otto' : 'border-line',
            interactive && 'hover:border-otto/50',
          )}
        >
          <span className="flex items-center justify-between text-[11px] font-semibold text-muted">
            <span className="flex items-center gap-1.5">
              <CreditCard className="size-3.5" /> Créditos · Pro
            </span>
          </span>
          <span className="mt-1.5 block text-[18px] font-semibold tracking-tight text-ink">
            {credits}
            <span className="text-[12px] font-medium text-muted"> de 100 este mês</span>
          </span>
          <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-lilac">
            <span
              className="block h-full rounded-full bg-otto transition-[width] duration-700"
              style={{ width: `${credits}%` }}
            />
          </span>
        </button>
        <button
          type="button"
          disabled={!interactive}
          onClick={() => onSelect?.('canais')}
          className={cn(
            'flex items-center gap-2.5 rounded-xl p-2 text-left transition-colors',
            active === 'canais' ? 'bg-white' : '',
            interactive && 'hover:bg-white/60',
          )}
        >
          <span className="grid size-8 place-items-center rounded-full bg-cafe-green font-serif text-[15px] text-cafe-cream">
            C
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[12px] font-semibold text-ink">Café da Praça</span>
            <span className="flex items-center gap-1 text-[11px] text-muted">
              <Plug className="size-3" /> Conta e canais
            </span>
          </span>
        </button>
      </div>
    </aside>
  )
}
