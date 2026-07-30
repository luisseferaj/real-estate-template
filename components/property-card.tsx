import Link from "next/link"
import { MapPin, Maximize, BedDouble, Bath } from "lucide-react"
import { type Property, formatPrice } from "@/lib/properties"
import { Button } from "@/components/ui/button"
import { type Lang } from "@/lib/i18n"

export function PropertyCard({ property, lang = "al" }: { property: Property; lang?: Lang }) {
  const isRent = property.status === "rent"
  const prefix = lang === "en" ? "/en" : ""

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-xl hover:shadow-foreground/5">
      <Link href={`${prefix}/pronat/${property.id}`} className="relative block aspect-[4/3] overflow-hidden">
        <img
          src={property.image || "/placeholder.svg"}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold text-accent-foreground backdrop-blur">
          {isRent
            ? lang === "en" ? "For Rent" : "Me qira"
            : lang === "en" ? "For Sale" : "Në shitje"}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-1 font-serif text-lg font-semibold text-foreground">
          <Link href={`${prefix}/pronat/${property.id}`} className="transition-colors hover:text-primary">
            {property.title}
          </Link>
        </h3>

        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-3.5 text-primary" />
          {property.location}
        </p>

        <div className="mt-4 flex items-center gap-4 border-y border-border py-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Maximize className="size-4 text-foreground/60" />
            {property.area} m²
          </span>
          <span className="flex items-center gap-1.5">
            <BedDouble className="size-4 text-foreground/60" />
            {property.beds} {lang === "en" ? "Beds" : "Dhoma"}
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="size-4 text-foreground/60" />
            {property.baths} {lang === "en" ? "Baths" : "Banjo"}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-bold text-foreground">{formatPrice(property)}</p>
          <Link href={`${prefix}/pronat/${property.id}`}>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-border text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              {lang === "en" ? "View property" : "Shiko pronën"}
            </Button>
          </Link>
        </div>
      </div>
    </article>
  )
}
