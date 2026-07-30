import { type Lang } from "@/lib/i18n"
import { Search, Phone, KeyRound } from "lucide-react"

const steps = {
  al: [
    {
      icon: Search,
      number: "01",
      title: "Kërko pronën",
      description: "Shfleto listen tonë të pronave në shitje dhe me qira. Filtro sipas qytetit, çmimit dhe numrit të dhomave.",
    },
    {
      icon: Phone,
      number: "02",
      title: "Kontakto agjentin",
      description: "Lidhu direkt me agjentin tonë. Organizojmë vizitën e pronës dhe të gjitha detajet me ju.",
    },
    {
      icon: KeyRound,
      number: "03",
      title: "Merr çelësat",
      description: "Ju shoqërojmë në çdo hap të dokumentacionit dhe negocimit deri në mbylljen e suksesshme të marrëveshjes.",
    },
  ],
  en: [
    {
      icon: Search,
      number: "01",
      title: "Search a property",
      description: "Browse our list of properties for sale and rent. Filter by city, price and number of rooms.",
    },
    {
      icon: Phone,
      number: "02",
      title: "Contact an agent",
      description: "Connect directly with our agent. We arrange the property visit and all the details with you.",
    },
    {
      icon: KeyRound,
      number: "03",
      title: "Get the keys",
      description: "We guide you through every step of the documentation and negotiation until the deal is successfully closed.",
    },
  ],
}

export function HowItWorksSection({ lang = "al" }: { lang?: Lang }) {
  const items = steps[lang]

  return (
    <section className="bg-secondary py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-medium text-primary">
          {lang === "en" ? "Simple process" : "Proces i thjeshtë"}
        </p>
        <h2 className="mt-1 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {lang === "en" ? "How it works" : "Si funksionon"}
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        {items.map((step, i) => (
          <div key={step.number} className="relative flex flex-col items-center text-center">
            {/* Connector line between steps */}
            {i < items.length - 1 && (
              <div className="absolute left-[calc(50%+2.5rem)] top-8 hidden h-px w-[calc(100%-5rem)] border-t border-dashed border-border md:block" />
            )}

            {/* Icon circle */}
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
              <step.icon className="h-7 w-7 text-primary" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {i + 1}
              </span>
            </div>

            <h3 className="mt-5 font-serif text-lg font-semibold text-foreground">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}