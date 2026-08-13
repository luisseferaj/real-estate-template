import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { MapPin, Phone, Mail, Building2, CheckCircle } from 'lucide-react'
import { AgentsSection } from '@/components/agents-section'
import { config } from '@/lib/config'
import { ServicesSection } from '@/components/services-section'

export const metadata: Metadata = {
  title: `About Us — ${config.companyName}`,
  description: config.aboutDescription,
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />

      <section className="border-b border-border bg-accent text-accent-foreground">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-primary">About Us</p>
          <h1 className="mt-3 max-w-2xl text-balance font-serif text-4xl font-semibold sm:text-5xl">
            {config.companyName}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-accent-foreground/70 leading-relaxed">
            {config.aboutDescription}
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
              Our Mission
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {config.missionStatement}
            </p>
          </div>

          <div>
            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
                Contact
              </h2>

              <div className="flex flex-col gap-5">
                <div>
                  <p className="font-semibold text-foreground">{config.founderName}</p>
                  <p className="text-sm text-muted-foreground">{config.founderRole}</p>
                </div>

                {config.phone && (
                  <a href={`tel:${config.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
                      <Phone className="h-4 w-4 text-primary" />
                    </div>
                    {config.phone}
                  </a>
                )}

                {config.email && (
                  <a href={`mailto:${config.email}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    {config.email}
                  </a>
                )}

                {config.address && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    {config.address}
                  </div>
                )}

                {config.instagram && (
                  <a href={config.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary font-bold text-sm">
                      IG
                    </div>
                    {config.instagram}
                  </a>
                )}
              </div>

              {config.whatsapp && (
                <div className="mt-8 pt-6 border-t border-border">
                  <a href={config.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                    Contact us on WhatsApp
                  </a>
                </div>
              )}
            </div>

            {config.slogan && (
              <p className="mt-8 text-center text-sm text-muted-foreground italic">
                {config.companyName} — {config.slogan}
              </p>
            )}
          </div>
        </div>
      </section>

      <AgentsSection />
      <SiteFooter />
    </main>
  )
}