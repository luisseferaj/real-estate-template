import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { MapPin, Phone, Mail, Building2, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Rreth Nesh — ALPIINVEST Properties',
  description: 'ALPIINVEST Properties është një kompani imobiliare e përkushtuar për të ofruar shërbime profesionale në Shqipëri.',
}

const services = [
  'Shitje dhe blerje apartamentesh, vilash, tokash dhe njësive tregtare',
  'Dhënie me qira e pronave',
  'Konsulencë për investime imobiliare',
  'Marketing profesional i pronave',
  'Asistencë gjatë gjithë procesit të negocimit dhe dokumentacionit',
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />

      <section className="border-b border-border bg-accent text-accent-foreground">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-primary">Rreth Nesh</p>
          <h1 className="mt-3 max-w-2xl text-balance font-serif text-4xl font-semibold sm:text-5xl">
            ALPIINVEST Properties
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-accent-foreground/70 leading-relaxed">
            Një kompani imobiliare e përkushtuar për të ofruar shërbime profesionale në shitjen, blerjen, dhënien me qira dhe konsulencën për investime në pasuri të paluajtshme në mbarë Shqipërinë.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">

          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 mb-6">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              Misioni ynë
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Misioni ynë është të ndërtojmë besim përmes transparencës, profesionalizmit dhe përkushtimit maksimal ndaj çdo klienti. Ne besojmë se çdo pronë është më shumë se një investim — është një hap drejt së ardhmes.
            </p>

            <h2 className="font-serif text-2xl font-semibold text-foreground mt-10 mb-4">
              Shërbimet tona
            </h2>
            <ul className="flex flex-col gap-3">
              {services.map((service) => (
                <li key={service} className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
                Kontakti
              </h2>

              <div className="flex flex-col gap-5">
                <div>
                    <p className="font-semibold text-foreground">A. Gjoni</p>
                    <p className="text-sm text-muted-foreground">Founder {"&"} Real Estate Consultant</p>
                </div>

                <a href="tel:+355699477107" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
                    <Phone className="h-4 w-4 text-primary" />
                    </div>
                    +355 69 947 7107
                </a>

                <a href="mailto:alpiinvest.intl@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
                    <Mail className="h-4 w-4 text-primary" />
                    </div>
                    alpiinvest.intl@gmail.com
                </a>

                <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
                    <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    Tiranë, Shqipëri
                </div>

                <a href="https://instagram.com/alpiinvest_properties" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary font-bold text-sm">
                    IG
                    </div>
                    @alpiinvest_properties
                </a>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                <a href="https://wa.me/355699477107" target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                    Na kontaktoni në WhatsApp
                </a>
                </div>
            </div>

            <p className="mt-8 text-center text-sm text-muted-foreground italic">
              ALPIINVEST Properties — Duke krijuar vlerë përmes besimit dhe investimeve të zgjuara në pasuri të paluajtshme.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}