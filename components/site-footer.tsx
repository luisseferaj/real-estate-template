"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { type Lang } from "@/lib/i18n"

function getNavLinks(lang: Lang) {
  const prefix = lang === "en" ? "/en" : ""
  return [
    { label: lang === "en" ? "Home" : "Kryefaqja", href: lang === "en" ? "/en" : "/" },
    { label: lang === "en" ? "Properties" : "Pronat", href: `${prefix}/pronat` },
    { label: lang === "en" ? "News" : "Njoftime", href: `${prefix}/notifications` },
    { label: lang === "en" ? "About Us" : "Rreth Nesh", href: `${prefix}/rreth-nesh` },
  ]
}

export function SiteFooter({ lang = "al" }: { lang?: Lang }) {
  const navLinks = getNavLinks(lang)

  return (
    <footer className="relative overflow-hidden bg-sidebar text-sidebar-foreground">
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 pb-16 md:grid-cols-3">

          {/* Logo + description */}
          <div className="max-w-xs">
            <img
              src="/logo.jpeg"
              alt="ALPIINVEST Properties"
              className="h-14 w-auto"
            />
            <p className="mt-4 text-sm leading-relaxed text-sidebar-foreground/70">
              {lang === "en"
                ? "Professional services in the sale, purchase and rental of properties across Albania."
                : "Shërbime profesionale në shitjen, blerjen dhe dhënien me qira të pronave në mbarë Shqipërinë."}
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-sidebar-foreground mb-1">
              {lang === "en" ? "Navigation" : "Navigimi"}
            </p>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-sidebar-foreground/70 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-sidebar-foreground mb-1">
              {lang === "en" ? "Contact" : "Kontakti"}
            </p>
            <a href="tel:+355699477107" className="text-sm text-sidebar-foreground/70 hover:text-primary transition-colors">
              +355 69 947 7107
            </a>
            <a href="mailto:alpiinvest.intl@gmail.com" className="text-sm text-sidebar-foreground/70 hover:text-primary transition-colors">
              alpiinvest.intl@gmail.com
            </a>
            <a href="https://instagram.com/alpiinvest_properties" target="_blank" rel="noopener noreferrer" className="text-sm text-sidebar-foreground/70 hover:text-primary transition-colors">
              @alpiinvest_properties
            </a>
            <a href="https://wa.me/355699477107" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              WhatsApp
            </a>
          </div>
        </div>

        <div className="border-t border-sidebar-border py-6 text-center text-xs text-sidebar-foreground/60">
          {lang === "en" ? "All rights reserved" : "Të gjitha të drejtat e rezervuara"} © {new Date().getFullYear()} · ALPIINVEST Properties
        </div>
      </div>
    </footer>
  )
}