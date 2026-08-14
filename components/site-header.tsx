"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"
import { translations, type Lang } from "@/lib/i18n"

function getNavItems(lang: Lang) {
  const t = translations[lang].nav
  const prefix = lang === "en" ? "/en" : ""
  return [
    { label: t.home, href: lang === "en" ? "/en" : "/" },
    { label: t.properties, href: `${prefix}/pronat` },
    { label: t.notifications, href: `${prefix}/notifications` },
    { label: t.about, href: `${prefix}/rreth-nesh` },
  ]
}

function getLang(pathname: string): Lang {
  return pathname.startsWith("/al") ? "al" : "en"
}

function switchLang(pathname: string, lang: Lang): string {
  if (lang === "en") {
    return pathname.startsWith("/en") ? pathname : `/en${pathname}`
  } else {
    return pathname.startsWith("/en") ? pathname.replace("/en", "") || "/" : pathname
  }
}

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const lang = getLang(pathname)
  const navItems = getNavItems(lang)

  function handleLangSwitch(newLang: Lang) {
    router.push(switchLang(pathname, newLang))
  }

  return (
    <header
      className={
        overlay
          ? "absolute inset-x-0 top-0 z-50"
          : "sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur"
      }
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <Link href={lang === "en" ? "/en" : "/"} className="flex items-center gap-2">
          <img src="/logo.jpeg" alt="Logo" className="h-14 w-auto" />
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-border/70 bg-card/70 px-2 py-1.5 backdrop-blur md:flex">
          {navItems.map((item) => {
            const activeItem =
              item.href === "/" || item.href === "/en"
                ? pathname === item.href
                : pathname.startsWith(item.href)
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeItem ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Language switcher - Uncomment to enable it */}
        {/*
        <div className="hidden md:flex items-center gap-1 rounded-full border border-border/70 bg-card/70 px-2 py-1.5">
          <button
            onClick={() => handleLangSwitch("al")}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              lang === "al" ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:text-foreground"
            }`}
          >
            AL
          </button>
          <button
            onClick={() => handleLangSwitch("en")}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              lang === "en" ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:text-foreground"
            }`}
          >
            EN
          </button>
        </div>
        */}

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-full border border-border bg-card p-2 text-foreground md:hidden"
          aria-label="Hap menunë"
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="mx-4 rounded-2xl border border-border bg-card p-4 shadow-lg md:hidden">
          <nav className="flex flex-col">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          {/*Language switcher for mobile, uncomment to enable it */}
          {/*
          <div className="mt-3 flex gap-2 border-t border-border pt-3">
            <button
              onClick={() => { handleLangSwitch("al"); setOpen(false) }}
              className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
                lang === "al" ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:bg-secondary"
              }`}
            >
              Shqip
            </button>
            <button
              onClick={() => { handleLangSwitch("en"); setOpen(false) }}
              className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
                lang === "en" ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:bg-secondary"
              }`}
            >
              English
            </button>
          </div>
          */}
        </div>
      )}
    </header>
  )
}
