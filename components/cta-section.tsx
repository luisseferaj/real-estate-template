import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CtaSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/cta-city.png"
          alt="Pamje ajrore e një qyteti bregdetar shqiptar"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-background/75" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
        <h2 className="max-w-2xl text-balance font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Gjeni pronën tuaj të përsosur
        </h2>
        <p className="mt-4 max-w-lg text-pretty text-muted-foreground">
          Ekipi ynë ju shoqëron në çdo hap — nga kërkimi i pronës deri te
          finalizimi i blerjes ose qirasë.
        </p>
      </div>
    </section>
  )
}
