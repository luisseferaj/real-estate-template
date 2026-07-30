"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { MapPin, Home, Search, SlidersHorizontal, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Liu_Jian_Mao_Cao } from "next/font/google"

export function Hero() {
  const router = useRouter()
  const [address, setAddress] = useState("")
  const [location, setLocation] = useState("")
  const [type, setType] = useState("")

  function handleSearch() {
    const params = new URLSearchParams()
    if (address) params.set("adresa", address)
    if (location) params.set("vendndodhja", location)
    if (type) params.set("lloji", type)
    router.push(`/pronat?${params.toString()}`)
  }

  return (
    <section className="relative overflow-hidden bg-secondary pt-28 pb-40 sm:pt-32">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-architecture.jpg"
          alt="Arkitekturë moderne rezidenciale në Shqipëri"
          className="h-full w-full object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="text-foreground">Kryefaqja</span>
            <span className="text-primary">/</span>
            <span>Pronat</span>
          </div>

          <h1 className="text-balance font-serif text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
            Gjeni pronën tuaj{" "}
            <span className="text-primary">të përsosur</span>
          </h1>

          <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground">
            Zbuloni prona në shitje dhe me qira në të gjithë Shqipërinë.
          </p>
        </div>
      </div>

      {/* Floating search bar */}
      <div className="relative mx-auto mt-14 max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/pronat?lloji=sale"
            className="flex h-14 flex-1 items-center justify-center rounded-2xl bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Prona në Shitje
          </Link>
          <Link
            href="/pronat?lloji=rent"
            className="flex h-14 flex-1 items-center justify-center rounded-2xl border-2 border-primary bg-transparent text-base font-semibold text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Prona me Qira
          </Link>
        </div>
      </div>
    </section>
  )
}