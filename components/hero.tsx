"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MapPin, Home, Search, SlidersHorizontal, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

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
          src="/images/hero-architecture.png"
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
        <div className="rounded-2xl border border-border bg-card p-4 shadow-xl shadow-foreground/5 sm:p-5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <label className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-3">
              <MapPin className="size-4 shrink-0 text-primary" />
              <input
                type="text"
                placeholder="Vendndodhja"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="flex items-center rounded-xl border border-border bg-background px-3 py-3 text-sm text-muted-foreground outline-none"
            >
              <option value="">Lloji i pronës</option>
              <option value="sale">Në Shitje</option>
              <option value="rent">Me Qira</option>
            </select>
          </div>

          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <Button
              onClick={handleSearch}
              className="h-11 flex-1 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 sm:flex-none sm:px-8"
            >
              <Search className="size-4" />
              Kërko Pronë
            </Button>
            <Button
              variant="outline"
              className="h-11 flex-1 rounded-xl border-border bg-card text-foreground hover:bg-secondary sm:flex-none sm:px-6"
              onClick={() => router.push('/pronat')}
            >
              <SlidersHorizontal className="size-4" />
              Kërkim i avancuar
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}