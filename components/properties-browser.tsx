"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal, X } from "lucide-react"
import { getPropertiesFromDB } from "@/lib/properties"
import { PropertyCard } from "@/components/property-card"
import { type Lang } from "@/lib/i18n"

type StatusFilter = "all" | "sale" | "rent"

const PER_PAGE = 6

const selectClass =
  "h-11 w-full rounded-xl border border-border bg-card px-3 text-sm text-foreground outline-none transition-colors focus:border-primary"

const inputClass =
  "h-11 w-full rounded-xl border border-border bg-card px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"

export function PropertiesBrowser({ lang = "al" }: { lang?: Lang }) {
  const searchParams = useSearchParams()
  const [allProperties, setAllProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [query, setQuery] = useState(searchParams.get("adresa") || searchParams.get("vendndodhja") || "")
  const [status, setStatus] = useState<StatusFilter>((searchParams.get("lloji") as StatusFilter) || "all")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [beds, setBeds] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    getPropertiesFromDB().then((data) => {
      setAllProperties(data)
      setLoading(false)
    })
  }, [])

  // Reset price when switching between sale/rent
  useEffect(() => {
    setMinPrice("")
    setMaxPrice("")
    setPage(1)
  }, [status])

  const isRent = status === "rent"

  const pricePlaceholder = isRent
    ? { min: lang === "en" ? "Min €/mo" : "Min €/muaj", max: lang === "en" ? "Max €/mo" : "Max €/muaj" }
    : { min: "Min €", max: "Max €" }

  const filtered = useMemo(() => {
    const min = minPrice !== "" ? Number(minPrice.replace(/[^0-9]/g, "")) : 0
    const max = maxPrice !== "" ? Number(maxPrice.replace(/[^0-9]/g, "")) : Number.POSITIVE_INFINITY

    return allProperties.filter((p) => {
      const matchesQuery =
        query.trim() === "" ||
        p.location.toLowerCase().includes(query.toLowerCase()) ||
        p.title.toLowerCase().includes(query.toLowerCase())
      const matchesStatus = status === "all" || p.status === status
      const matchesPrice = p.price >= min && p.price <= max
      const matchesBeds = beds === 0 || (beds === 4 ? p.beds >= 4: p.beds === beds)
      return matchesQuery && matchesStatus && matchesPrice && matchesBeds
    })
  }, [query, status, minPrice, maxPrice, beds, allProperties])

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

  const hasPriceFilter = minPrice !== "" || maxPrice !== ""

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Filter bar */}
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">

          {/* Search */}
          <div className="relative lg:col-span-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => resetPage(setQuery)(e.target.value)}
              placeholder={lang === "en" ? "Search by address or city" : "Kërko sipas adresës ose qytetit"}
              className="h-11 w-full rounded-xl border border-border bg-card pl-9 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
            />
          </div>

          {/* Status */}
          <div className="lg:col-span-2">
            <select
              value={status}
              onChange={(e) => resetPage(setStatus)(e.target.value as StatusFilter)}
              className={selectClass}
            >
              <option value="all">{lang === "en" ? "Sale & rent" : "Shitje & qira"}</option>
              <option value="sale">{lang === "en" ? "For sale" : "Në shitje"}</option>
              <option value="rent">{lang === "en" ? "For rent" : "Me qira"}</option>
            </select>
          </div>

          {/* Price min/max */}
          <div className="lg:col-span-4">
            <div className="relative flex items-center gap-2">
              <input
                type="number"
                value={minPrice}
                min={0}
                onChange={(e) => resetPage(setMinPrice)(e.target.value)}
                placeholder={pricePlaceholder.min}
                className={inputClass}
              />
              <span className="shrink-0 text-xs text-muted-foreground">—</span>
              <input
                type="number"
                value={maxPrice}
                min={0}
                onChange={(e) => resetPage(setMaxPrice)(e.target.value)}
                placeholder={pricePlaceholder.max}
                className={inputClass}
              />
              {hasPriceFilter && (
                <button
                  type="button"
                  onClick={() => { setMinPrice(""); setMaxPrice(""); setPage(1) }}
                  className="shrink-0 rounded-full p-1 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear price"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
          </div>

          {/* Beds */}
          <div className="lg:col-span-2">
            <select
              value={beds}
              onChange={(e) => resetPage(setBeds)(Number(e.target.value))}
              className={selectClass}
            >
              <option value={0}>{lang === "en" ? "All rooms" : "Të gjitha dhomat"}</option>
              <option value={1}>{lang === "en" ? "1 Beds" : "1+ Dhoma"}</option>
              <option value={2}>{lang === "en" ? "2 Beds" : "2+ Dhoma"}</option>
              <option value={3}>{lang === "en" ? "3 Beds" : "3+ Dhoma"}</option>
              <option value={4}>{lang === "en" ? "4+ Beds" : "4+ Dhoma"}</option>
            </select>
          </div>

        </div>

        {/* Active price label */}
        {hasPriceFilter && (
          <p className="mt-3 text-xs text-muted-foreground">
            {lang === "en" ? "Price filter:" : "Filtër çmimi:"}{" "}
            <span className="font-medium text-foreground">
              {minPrice ? `€${Number(minPrice).toLocaleString()}` : "€0"} —{" "}
              {maxPrice ? `€${Number(maxPrice).toLocaleString()}` : (lang === "en" ? "no limit" : "pa limit")}
              {isRent ? (lang === "en" ? "/mo" : "/muaj") : ""}
            </span>
          </p>
        )}
      </div>

      {/* Results count */}
      <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
        <SlidersHorizontal className="size-4 text-primary" />
        <span>
          <span className="font-semibold text-foreground">{loading ? "..." : filtered.length}</span>{" "}
          {lang === "en" ? "properties found" : "prona u gjetën"}
        </span>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-80 rounded-2xl border border-border bg-card animate-pulse" />
          ))}
        </div>
      ) : visible.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((property) => (
            <PropertyCard key={property.id} property={property} lang={lang} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-border bg-card py-20 text-center">
          <p className="font-serif text-xl text-foreground">
            {lang === "en" ? "No properties match your search" : "Asnjë pronë nuk përputhet me kërkimin tuaj"}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {lang === "en" ? "Try changing the filters or search term." : "Provoni të ndryshoni filtrat ose kërkimin."}
          </p>
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