import { OttoEyes } from '@/components/otto/eyes'

const links = [
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#produto', label: 'Produto' },
  { href: '#planos', label: 'Planos' },
]

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-transparent bg-white/85 backdrop-blur-md">
      <nav
        aria-label="Principal"
        className="mx-auto flex h-[72px] max-w-[1360px] items-center justify-between px-10"
      >
        <a href="#topo" aria-label="HelloOtto, voltar ao início" className="-m-2 p-2">
          <OttoEyes className="w-[46px] text-otto" />
        </a>
        <div className="flex items-center gap-10">
          <ul className="flex items-center gap-8 text-[14px] font-medium text-ink/80">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-otto">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#planos"
            className="shrink-0 rounded-full bg-ink px-5 py-2.5 whitespace-nowrap text-[14px] font-semibold text-white transition-colors hover:bg-otto"
          >
            Criar conta grátis
          </a>
        </div>
      </nav>
    </header>
  )
}
