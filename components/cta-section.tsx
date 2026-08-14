import Link from "next/link"
import { type Lang } from "@/lib/i18n"
import { config } from "@/lib/config"

export function CtaSection({ lang = "al" }: { lang?: Lang }) {
  const prefix = lang === "en" ? "/en" : ""

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/cta-city.jpg"
          alt={config.companyName}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-background/75" />
      </div>
      
      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
        <h2 className="max-w-2xl text-balance font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {lang === "en" ? "Find your perfect property" : "Gjeni pronën tuaj të përsosur"}
        </h2>
        <p className="mt-4 max-w-lg text-pretty text-muted-foreground">
          {lang === "en"
            ? "Our team guides you every step of the way — from finding the property to finalizing the purchase or rental."
            : "Ekipi ynë ju shoqëron në çdo hap — nga kërkimi i pronës deri te finalizimi i blerjes ose qirasë."}
        </p>
        <Link
          href={`${prefix}/pronat`}
          className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
        >
          {lang === "en" ? "View Properties" : "Shiko Pronat"}
        </Link>
      </div>
    </section>
  )
}