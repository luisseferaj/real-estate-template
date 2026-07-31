import { ChevronDown } from "lucide-react"
import { getPropertiesFromDB } from "@/lib/properties"
import { PropertyCard } from "@/components/property-card"
import { type Lang } from "@/lib/i18n"

export async function PropertyGrid({ lang = "al" }: { lang?: Lang }) {
  const properties = (await getPropertiesFromDB()).slice(0, 6)

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {lang === "en" ? "Showing" : "Duke shfaqur"}{" "}
          <span className="font-semibold text-foreground">{properties.length}</span>{" "}
          {lang === "en" ? "properties" : "prona"}
        </p>
        <p className="text-sm font-medium text-foreground">
          {lang === "en" ? "Latest" : "Më të fundit"}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} lang={lang} />
        ))}
      </div>
    </section>
  )
}