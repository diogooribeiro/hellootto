import { SiteNav } from '@/components/landing/site-nav'
import { Hero } from '@/components/landing/hero'
import { DemoSection } from '@/components/landing/demo/demo-section'
import { ProductSection } from '@/components/landing/product/product-section'
import { Plans } from '@/components/landing/plans'
import { Closing } from '@/components/landing/closing'

export default function Page() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <DemoSection />
        <ProductSection />
        <Plans />
      </main>
      <Closing />
    </>
  )
}
