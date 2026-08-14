import Link from "next/link"
import { type Lang } from "@/lib/i18n"


const areas = [
  {
    city_al: "Downtown",
    city_en: "Downtown",
    description_al: "The heart of the city with diverse property options.",
    description_en: "The heart of the city with diverse property options.",
    image: "/cities/area1.jpg",
    query: "Downtown",
  },
  {
    city_al: "Beachfront",
    city_en: "Beachfront",
    description_al: "Coastal properties with stunning sea views.",
    description_en: "Coastal properties with stunning sea views.",
    image: "/cities/area2.jpg",
    query: "Beachfront",
  },
  {
    city_al: "Suburbs",
    city_en: "Suburbs",
    description_al: "Peaceful residential areas with great investment potential.",
    description_en: "Peaceful residential areas with great investment potential.",
    image: "/cities/area3.jpg",
    query: "Suburbs",
  },
  {
    city_al: "City Center",
    city_en: "City Center",
    description_al: "Premium properties in the most sought-after location.",
    description_en: "Premium properties in the most sought-after location.",
    image: "/cities/area4.jpg",
    query: "City Center",
  },
]

export function AreasSection({ lang = "al" }: { lang?: Lang }) {
  const prefix = lang === "en" ? "/en" : ""

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-sm font-medium text-primary">
          {lang === "en" ? "Explore by location" : "Eksploro sipas zonës"}
        </p>
        <h2 className="mt-1 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {lang === "en" ? "Popular areas" : "Zonat më të kërkuara"}
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {areas.map((area) => {
          const city = lang === "en" ? area.city_en : area.city_al
          const description = lang === "en" ? area.description_en : area.description_al

          return (
            <Link
              key={area.city_en}
              href={`${prefix}/pronat?adresa=${encodeURIComponent(area.query)}`}
              className={`group relative overflow-hidden rounded-2xl border border-border `}
              style={{ aspectRatio: "3/4" }}  
            >

              <img
                src={area.image}
                alt={city}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-serif text-xl font-bold text-white">{city}</h3>
                <p className="mt-1 text-xs leading-relaxed text-white/75">{description}</p>
                <span className="mt-3 inline-block text-xs font-medium text-primary">
                  {lang === "en" ? "View properties →" : "Shiko pronat →"}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}