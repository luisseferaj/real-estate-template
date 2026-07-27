import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { PropertyGrid } from "@/components/property-grid"
import { NotificationsPreview } from "@/components/notifications-preview"
import { CtaSection } from "@/components/cta-section"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <SiteHeader overlay />
      <div className="flex-1">
        <Hero />
        <PropertyGrid />
        <NotificationsPreview />
        <CtaSection />
      </div>
      <SiteFooter />
    </main>
  )
}
