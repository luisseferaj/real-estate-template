import Link from "next/link"
import { type Lang } from "@/lib/i18n"

const areas = [
  {
    city_al: "Kamëz",
    city_en: "Kamëz",
    description_al: "Qyteti në rritje pranë Tiranës me mundësi të shkëlqyera investimi.",
    description_en: "A growing town near Tirana with excellent investment opportunities.",
    image: "/cities/kamez.jpg",
    query: "Kamez",
  },
  {
    city_al: "Tiranë",
    city_en: "Tirana",
    description_al: "Kryeqyteti i Shqipërisë me treg të larmishëm pronash.",
    description_en: "Albania's capital with a diverse and dynamic property market.",
    image: "/cities/tirana.jpg",
    query: "Tirane",
  },
  {
    city_al: "Durrës",
    city_en: "Durrës",
    description_al: "Qyteti bregdetar me mundësi të shkëlqyera investimi.",
    description_en: "Coastal city with excellent investment opportunities.",
    image: "/cities/durres.webp",
    query: "Durres",
  },
  {
    city_al: "Vlorë",
    city_en: "Vlorë",
    description_al: "Mes detit dhe maleve, me potencial të lartë turistik.",
    description_en: "Between sea and mountains, with high tourism potential.",
    image: "/cities/vlore.jpg",
    query: "Vlore",
  },
]

export function AreasSection({ lang = "al" }: { lang?: Lang }) {
  const prefix = lang === "en" ? "/en" : ""
  const pronatPath = lang === "en" ? "pronat" : "pronat"

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
              href={`${prefix}/${pronatPath}?adresa=${encodeURIComponent(area.query)}`}
              className="group relative overflow-hidden rounded-2xl border border-border"
              style={{ aspectRatio: "3/4" }}
            >
              {/* Photo */}
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