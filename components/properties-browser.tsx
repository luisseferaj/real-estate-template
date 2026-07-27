"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react"
import { getPropertiesFromDB } from "@/lib/properties"
import { PropertyCard } from "@/components/property-card"

type StatusFilter = "all" | "sale" | "rent"

const priceRanges = [
  { label: "Të gjitha çmimet", min: 0, max: Number.POSITIVE_INFINITY },
  { label: "Deri në €150,000", min: 0, max: 150000 },
  { label: "€150,000 – €300,000", min: 150000, max: 300000 },
  { label: "€300,000+", min: 300000, max: Number.POSITIVE_INFINITY },
  { label: "Me qira (deri €3,000/muaj)", min: 0, max: 3000 },
]

const PER_PAGE = 6

const selectClass =
  "h-11 w-full rounded-xl border border-border bg-card px-3 text-sm text-foreground outline-none transition-colors focus:border-primary"

export function PropertiesBrowser() {
  const searchParams = useSearchParams()
  const [allProperties, setAllProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [query, setQuery] = useState(searchParams.get("adresa") || searchParams.get("vendndodhja") || "")
  const [status, setStatus] = useState<StatusFilter>((searchParams.get("lloji") as StatusFilter) || "all")
  const [priceIdx, setPriceIdx] = useState(0)
  const [beds, setBeds] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    getPropertiesFromDB().then((data) => {
      setAllProperties(data)
      setLoading(false)
    })
  }, [])

  const filtered = useMemo(() => {
    const range = priceRanges[priceIdx]
    return allProperties.filter((p) => {
      const matchesQuery =
        query.trim() === "" ||
        p.location.toLowerCase().includes(query.toLowerCase()) ||
        p.title.toLowerCase().includes(query.toLowerCase())
      const matchesStatus = status === "all" || p.status === status
      const matchesPrice = p.price >= range.min && p.price <= range.max
      const matchesBeds = beds === 0 || p.beds >= beds
      return matchesQuery && matchesStatus && matchesPrice && matchesBeds
    })
  }, [query, status, priceIdx, beds, allProperties])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * PER_PAGE
  const visible = filtered.slice(start, start + PER_PAGE)

  function resetPage<T>(setter: (v: T) => void) {
    return (v: T) => {
      setter(v)
      setPage(1)
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Filter bar */}
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
          <div className="relative lg:col-span-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => resetPage(setQuery)(e.target.value)}
              placeholder="Kërko sipas adresës ose qytetit"
              className="h-11 w-full rounded-xl border border-border bg-card pl-9 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
            />
          </div>

          <div className="lg:col-span-3">
            <select
              value={status}
              onChange={(e) => resetPage(setStatus)(e.target.value as StatusFilter)}
              className={selectClass}
            >
              <option value="all">Në shitje &amp; me qira</option>
              <option value="sale">Në shitje</option>
              <option value="rent">Me qira</option>
            </select>
          </div>

          <div className="lg:col-span-3">
            <select
              value={priceIdx}
              onChange={(e) => resetPage(setPriceIdx)(Number(e.target.value))}
              className={selectClass}
            >
              {priceRanges.map((r, i) => (
                <option key={r.label} value={i}>{r.label}</option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2">
            <select
              value={beds}
              onChange={(e) => resetPage(setBeds)(Number(e.target.value))}
              className={selectClass}
            >
              <option value={0}>Të gjitha dhomat</option>
              <option value={1}>1+ Dhoma</option>
              <option value={2}>2+ Dhoma</option>
              <option value={3}>3+ Dhoma</option>
              <option value={4}>4+ Dhoma</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
        <SlidersHorizontal className="size-4 text-primary" />
        <span>
          <span className="font-semibold text-foreground">{loading ? "..." : filtered.length}</span> prona u gjetën
        </span>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1,2,3].map((n) => (
            <div key={n} className="h-80 rounded-2xl border border-border bg-card animate-pulse" />
          ))}
        </div>
      ) : visible.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-border bg-card py-20 text-center">
          <p className="font-serif text-xl text-foreground">Asnjë pronë nuk përputhet me kërkimin tuaj</p>
          <p className="mt-2 text-sm text-muted-foreground">Provoni të ndryshoni filtrat ose kërkimin.</p>
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
          >
            <ChevronLeft className="size-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              className={`inline-flex size-9 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                n === currentPage
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-foreground hover:bg-secondary"
              }`}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="inline-flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      )}
    </section>
  )
}
