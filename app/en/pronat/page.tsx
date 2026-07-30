import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PropertiesBrowser } from "@/components/properties-browser"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Properties for Sale and Rent — ALPIINVEST Properties",
  description: "Browse exclusive properties across Albania. Filter by location, price and rooms.",
}

export default function EnglishPropertiesPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />

      <section className="border-b border-border bg-accent text-accent-foreground">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-primary">Properties / Catalogue</p>
          <h1 className="mt-3 max-w-2xl text-balance font-serif text-4xl font-semibold sm:text-5xl">
            Find your next property in Albania
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-accent-foreground/70">
            From modern villas in Tirana to seafront apartments on the Riviera — explore our curated collection.
          </p>
        </div>
      </section>
      <Suspense>
        <PropertiesBrowser lang="en" />
      </Suspense>
      <SiteFooter lang="en" />
    </main>
  )
}