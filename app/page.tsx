import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { PropertyGrid } from "@/components/property-grid"
import { NotificationsPreview } from "@/components/notifications-preview"
import { CtaSection } from "@/components/cta-section"
import { SiteFooter } from "@/components/site-footer"
import { ServicesSection } from "@/components/services-section"
import { StatsSection } from "@/components/stats-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { AreasSection } from "@/components/areas-section"
import { getStats } from "@/app/admin/actions"


export default async function Page() {
  const stats = await getStats()
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <SiteHeader overlay />
      <div className="flex-1">
        <Hero />
        <ServicesSection />
        <StatsSection stats={stats} />
        <HowItWorksSection />
        <PropertyGrid />
        <AreasSection/>
        <NotificationsPreview />
        <CtaSection />
      </div>
      <SiteFooter />
    </main>
  )
}
