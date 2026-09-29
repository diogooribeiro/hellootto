import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * Peça criada pelo Otto para a marca fictícia Café da Praça — identidade própria, não HelloOtto.
 * Todas as medidas usam cqw para a arte escalar igual em qualquer tamanho.
 */
export function CafePost({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative aspect-square overflow-hidden rounded-[6px] bg-cafe-cream text-cafe-green [container-type:inline-size]',
        className,
      )}
    >
      <div className="absolute top-[6cqw] right-[6cqw] bottom-[6cqw] w-[46cqw] overflow-hidden rounded-t-[23cqw] rounded-b-[1.5cqw]">
        <Image
          src="/images/cafe-da-praca-promo.png"
          alt="Dois cappuccinos com latte art em xícaras verdes, sob a luz da tarde"
          fill
          sizes="(max-width: 768px) 50vw, 200px"
          className="object-cover object-[50%_80%]"
        />
      </div>

      <div className="absolute top-[6cqw] bottom-[6cqw] left-[6cqw] flex w-[40cqw] flex-col">
        <span className="font-serif text-[5cqw] leading-none italic">Café da Praça</span>
        <span className="mt-[1.4cqw] font-sans text-[1.8cqw] font-semibold tracking-[0.18em] text-cafe-green/60 uppercase">
          Cafeteria de bairro
        </span>

        <span className="mt-auto flex items-center gap-[1.5cqw] font-sans text-[2.1cqw] font-bold tracking-[0.2em] text-cafe-clay uppercase">
          <span className="h-px w-[5cqw] bg-cafe-clay" />
          Só amanhã
        </span>
        <p className="mt-[2.5cqw] font-serif text-[11cqw] leading-[0.86] tracking-[-0.02em]">
          Leve 2,
          <br />
          <span className="text-cafe-clay italic">pague 1.</span>
        </p>

        <div className="mt-[7cqw] border-t border-cafe-green/20 pt-[2.4cqw] font-sans text-[2.2cqw] leading-[1.35]">
          <span className="block font-semibold">Quarta, 16 de setembro</span>
          <span className="block text-cafe-green/70">Em qualquer café da casa.</span>
        </div>
      </div>

      <span className="absolute right-[40cqw] bottom-[13cqw] grid size-[17cqw] rotate-[-10deg] place-items-center rounded-full bg-cafe-green text-center text-cafe-cream shadow-[0_1.5cqw_3cqw_-1cqw_rgba(34,57,44,0.55)]">
        <span className="font-serif leading-[0.9]">
          <span className="block text-[5.6cqw] italic">2 por 1</span>
          <span className="mt-[0.6cqw] block font-sans text-[1.5cqw] font-bold tracking-[0.2em] uppercase">
            cafés
          </span>
        </span>
      </span>
    </div>
  )
}
