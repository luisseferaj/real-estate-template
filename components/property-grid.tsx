import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { getPropertiesFromDB } from "@/lib/properties"
import { PropertyCard } from "@/components/property-card"

export async function PropertyGrid() {
  const properties = await (await getPropertiesFromDB()).slice(0,6)

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Duke shfaqur{" "}
          <span className="font-semibold text-foreground">{properties.length}</span> nga gjithsej{" "}
          <span className="font-semibold text-foreground">{properties.length}</span> rezultate
        </p>
        <button
          type="button"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground"
        >
          Më të fundit
          <ChevronDown className="size-4 text-muted-foreground" />
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  )
}
