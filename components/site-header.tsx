"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "Kryefaqja", href: "/" },
  { label: "Pronat", href: "/pronat" },
  { label: "Njoftimet", href: "/notifications" },
  { label: "Rreth nesh", href: "/rreth-nesh" },
]

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header
      className={
        overlay
          ? "absolute inset-x-0 top-0 z-50"
          : "sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur"
      }
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/logo.jpeg"
            alt="Logo"
            className="h-14 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-border/70 bg-card/70 px-2 py-1.5 backdrop-blur md:flex">
          {navItems.map((item) => {
            const activeItem =
              item.href !== "#" && (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href))
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
        </div>
      )}
    </header>
  )
}
