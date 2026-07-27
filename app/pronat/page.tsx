import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PropertiesBrowser } from "@/components/properties-browser"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Pronat në shitje dhe me qira — Arta Estate",
  description: "Shfletoni prona ekskluzive në të gjithë Shqipërinë. Filtroni sipas vendndodhjes, çmimit dhe dhomave.",
}

export default function PropertiesPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />

      <section className="border-b border-border bg-accent text-accent-foreground">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-primary">Pronat / Katalogu</p>
          <h1 className="mt-3 max-w-2xl text-balance font-serif text-4xl font-semibold sm:text-5xl">
            Gjeni pronën tuaj të ardhshme në Shqipëri
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-accent-foreground/70">
            Nga vila moderne në Tiranë te apartamente përballë detit në Rivierë — eksploroni koleksionin tonë të kuruar.
          </p>
        </div>
      </section>

      <PropertiesBrowser />

      <SiteFooter />
    </main>
  )
}
