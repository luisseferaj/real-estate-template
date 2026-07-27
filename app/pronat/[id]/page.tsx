import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MapPin, Maximize, BedDouble, Bath, Phone, Mail, MessageCircle, ChevronRight, Check } from "lucide-react"
import { getPropertyFromDB, getSimilarFromDB, formatPrice } from "@/lib/properties"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PropertyGallery } from "@/components/property-gallery"
import { PropertyCard } from "@/components/property-card"
import { Button } from "@/components/ui/button"


export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const property = await getPropertyFromDB(id)
  if (!property) return { title: "Prona nuk u gjet — Alpiinvest Properties" }
  return {
    title: `${property.title} — Alpiinvest Properties`,
    description: property.description.slice(0, 155),
  }
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const property = await getPropertyFromDB(id)
  if (!property) notFound()

  const isRent = property.status === "rent"
  const similar = await getSimilarFromDB(property.id)
  const agent = {
    name: "Atjon Gjoni",
    role: "Agjent i Licensuar",
    phone: "+355 69 947 7107",
    email: "alpiinvest.intl@gmail.com",
  }
  const whatsappHref = agent.phone ? `https://wa.me/${agent.phone.replace(/\s/g, "").replace("+", "")}?text=${encodeURIComponent(
  `Përshëndetje, jam i interesuar për pronën: ${property.title}`,
  )}` : "#"

  const specs = [
    { icon: BedDouble, label: "Dhoma gjumi", value: property.beds },
    { icon: Bath, label: "Banjo", value: property.baths },
    { icon: Maximize, label: "Sipërfaqe", value: `${property.area} m²` },
  ]

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground">
            Ballina
          </Link>
          <ChevronRight className="size-3.5" />
          <Link href="/pronat" className="hover:text-foreground">
            Pronat
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="line-clamp-1 text-foreground">{property.title}</span>
        </nav>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left / main column */}
          <div className="lg:col-span-2">
            <PropertyGallery images={property.gallery ?? [property.image].filter(Boolean)} title={property.title} />

            {/* Title + status + price */}
            <div className="mt-8 flex flex-col gap-4 border-b border-border pb-8 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    isRent ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
                  }`}
                >
                  {isRent ? "Me qira" : "Në shitje"}
                </span>
                <h1 className="mt-3 text-balance font-serif text-3xl font-semibold text-foreground sm:text-4xl">
                  {property.title}
                </h1>
                <p className="mt-2 flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="size-4 text-primary" />
                  {property.location}
                </p>
              </div>
              <div className="shrink-0 sm:text-right">
                <p className="text-3xl font-bold text-foreground">{formatPrice(property)}</p>
              </div>
            </div>

            {/* Key details */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {specs.map((s) => (
                <div key={s.label} className="rounded-2xl border border-border bg-card p-4 text-center">
                  <s.icon className="mx-auto size-6 text-primary" />
                  <p className="mt-2 text-lg font-semibold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <section className="mt-10">
              <h2 className="font-serif text-2xl font-semibold text-foreground">Përshkrimi</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{property.description}</p>
            </section>

            {property.youtube_id && (
            <section className="mt-10">
              <h2 className="font-serif text-2xl font-semibold text-foreground">Video prezantuese</h2>
              <div className="mt-4 aspect-video w-full overflow-hidden rounded-2xl border border-border bg-secondary">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${property.youtube_id}`}
                  title={`Video e pronës: ${property.title}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </section>
              )}
          </div>

          {/* Right / contact column */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-4">
                  <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-accent font-serif text-xl font-semibold text-primary">
                    {agent.name ? agent.name.split(" ").map((n: string) => n[0]).join("") : "A"}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{agent.name}</p>
                    <p className="text-sm text-muted-foreground">{agent.role}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href={agent.phone ? `tel:${agent.phone.replace(/\s/g, "")}` : "#"}
                    className="flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
                  >
                    <Phone className="size-4 text-primary" />
                    {agent.phone}
                  </a>

                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    <MessageCircle className="size-4" />
                    WhatsApp
                  </a>

                  <a
                    href={`mailto:${agent.email}?subject=${encodeURIComponent(property.title)}`}
                    className="flex items-center justify-center gap-2 rounded-full border border-border px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <Mail className="size-4" />
                    Dërgo email
                  </a>
                </div>

                
              </div>
            </div>
          </aside>
        </div>

        {/* Similar properties */}
        <section className="mt-16">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">Prona të ngjashme</h2>
            <Link
              href="/pronat"
              className="inline-flex items-center justify-center rounded-full border border-border px-4 py-2 text-sm font-medium hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Shiko të gjitha
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  )
}
