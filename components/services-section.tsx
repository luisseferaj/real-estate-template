import Link from "next/link"
import { type Lang } from "@/lib/i18n"
import { config } from "@/lib/config"
import { Home, Key, TrendingUp, Megaphone, FileText } from "lucide-react"

const services = {
  al: [
    { icon: Home, title: "Shitje & Blerje", description: "Apartamente, vila, toka dhe njësi tregtare." },
    { icon: Key, title: "Dhënie me Qira", description: "Gjeni pronën e duhur për qira ose jepni pronën tuaj me qira." },
    { icon: TrendingUp, title: "Konsulencë Investimesh", description: "Këshilla profesionale për investime të zgjuara në pasuri të paluajtshme." },
    { icon: Megaphone, title: "Marketing Profesional", description: "Prezantojmë pronën tuaj me fotografí dhe materiale profesionale." },
    { icon: FileText, title: "Asistencë Dokumentacioni", description: "Ju shoqërojmë në çdo hap të procesit të negocimit dhe dokumentacionit." },
  ],
  en: [
    { icon: Home, title: "Sale & Purchase", description: "Apartments, villas, land and commercial units." },
    { icon: Key, title: "Rental", description: "Find the right property to rent or list your property for rent." },
    { icon: TrendingUp, title: "Investment Consulting", description: "Professional advice for smart real estate investments." },
    { icon: Megaphone, title: "Professional Marketing", description: "We present your property with professional photos and materials." },
    { icon: FileText, title: "Documentation Assistance", description: "We guide you through every step of the negotiation and documentation process." },
  ],
}

export function ServicesSection({ lang = "al" }: { lang?: Lang }) {
  const items = services[lang]
  const prefix = lang === "en" ? "/en" : ""

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">

        {/* Left — services */}
        <div>
          <p className="text-sm font-medium text-primary">
            {lang === "en" ? "What we offer" : "Çfarë ofrojmë"}
          </p>
          <h2 className="mt-1 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {lang === "en" ? "Our Services" : "Shërbimet tona"}
          </h2>

          <div className="mt-8 flex flex-col gap-4">
            {items.map((service) => (
              <div key={service.title} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
                  <service.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{service.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href={`${prefix}/rreth-nesh`}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {lang === "en" ? "Learn more about us" : "Mëso më shumë rreth nesh"}
          </Link>
        </div>

        {/* Right — company photo */}
        <div className="relative overflow-hidden rounded-2xl border border-border">
          <img
            src="/description.jpg"
            alt={config.companyName}
            className="w-full object-contain"
            style={{ maxHeight: '500px' }}
          />
        </div>

      </div>
    </section>
  )
}