import Link from "next/link"
import { type Lang } from "@/lib/i18n"

const gradients = [
  "from-blue-900 to-blue-700",
  "from-emerald-900 to-emerald-700",
  "from-amber-900 to-amber-700",
  "from-purple-900 to-purple-700",
]

const areas = [
  {
    city_al: "Zona 1",
    city_en: "Area 1",
    description_al: "Përshkrimi i zonës së parë.",
    description_en: "Description of the first area.",
    query: "Area 1",
  },
  {
    city_al: "Zona 2",
    city_en: "Area 2",
    description_al: "Përshkrimi i zonës së dytë.",
    description_en: "Description of the second area.",
    query: "Area 2",
  },
  {
    city_al: "Zona 3",
    city_en: "Area 3",
    description_al: "Përshkrimi i zonës së tretë.",
    description_en: "Description of the third area.",
    query: "Area 3",
  },
  {
    city_al: "Zona 4",
    city_en: "Area 4",
    description_al: "Përshkrimi i zonës së katërt.",
    description_en: "Description of the fourth area.",
    query: "Area 4",
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
        {areas.map((area, index) => {
          const city = lang === "en" ? area.city_en : area.city_al
          const description = lang === "en" ? area.description_en : area.description_al

          return (
            <Link
              key={area.city_en}
              href={`${prefix}/pronat?adresa=${encodeURIComponent(area.query)}`}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${gradients[index]}`}
              style={{ aspectRatio: "3/4" }}
            >
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