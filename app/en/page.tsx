import { SiteHeader } from "@/components/site-header"
import { PropertyGrid } from "@/components/property-grid"
import { CtaSection } from "@/components/cta-section"
import { SiteFooter } from "@/components/site-footer"
import { NotificationsPreview } from "@/components/notifications-preview"
import Link from "next/link"
import { ServicesSection } from "@/components/services-section"
import { StatsSection } from "@/components/stats-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { AreasSection } from "@/components/areas-section"
import { getStats } from "@/app/admin/actions"

export default async function EnglishHomePage() {
  const stats = await getStats()
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <SiteHeader overlay />
      <div className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-secondary pt-28 pb-40 sm:pt-32">
          <div className="absolute inset-0">
            <img
              src="/images/hero-architecture.jpg"
              alt="Modern residential architecture in Albania"
              className="h-full w-full object-cover object-center opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h1 className="text-balance font-serif text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
                Find your{" "}
                <span className="text-primary">perfect property</span>
              </h1>
              <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground">
                Properties for sale and rent across Albania.
              </p>
            </div>
          </div>

          <div className="relative mx-auto mt-14 max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/en/pronat?lloji=sale"
                className="flex h-14 flex-1 items-center justify-center rounded-2xl bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Properties for Sale
              </Link>
              <Link
                href="/en/pronat?lloji=rent"
                className="flex h-14 flex-1 items-center justify-center rounded-2xl border-2 border-primary bg-transparent text-base font-semibold text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Properties for Rent
              </Link>
            </div>
          </div>
        </section>

        <ServicesSection lang="en"/>
        <StatsSection stats= {stats} lang="en"/>
        <HowItWorksSection lang="en"/>
        <PropertyGrid lang="en" />
        <AreasSection lang="en" />
        <NotificationsPreview lang= "en" />
        <CtaSection lang="en"/>
      </div>
      <SiteFooter lang="en"/>
    </main>
  )
}