import { ArrowRight } from 'lucide-react'
import { OttoEyes } from '@/components/otto/eyes'
import { OttoLogo } from '@/components/otto/logo'

export function Closing() {
  return (
    <>
      <section aria-labelledby="final-title" className="bg-otto text-white">
        <div className="mx-auto flex max-w-[1360px] flex-col items-center px-10 py-32 text-center">
          <OttoEyes className="w-[180px] text-white" />
          <h2 id="final-title" className="mt-10 text-[84px] leading-[0.95] font-semibold tracking-[-0.055em]">
            Vamos resolver seu
            <br />
            marketing hoje?
          </h2>
          <p className="mt-6 max-w-[520px] text-[19px] leading-relaxed text-white/80">
            Crie sua conta grátis, conte sobre sua marca e faça o primeiro pedido.
          </p>
          <a
            href="#topo"
            className="mt-10 inline-flex h-16 items-center gap-3 whitespace-nowrap rounded-full bg-white px-9 text-[15px] font-semibold tracking-wide text-otto uppercase transition-colors hover:bg-lilac"
          >
            Criar minha conta grátis <ArrowRight className="size-4" />
          </a>
        </div>
      </section>
      <footer className="bg-white">
        <div className="mx-auto flex max-w-[1360px] items-center justify-between px-10 py-10">
          <OttoLogo className="h-7 w-auto text-otto" />
          <p className="text-[13px] text-muted">© 2026 HelloOtto. Você conta o que precisa. O Otto resolve.</p>
        </div>
      </footer>
    </>
  )
}
