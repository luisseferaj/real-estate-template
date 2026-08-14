"use client"

import Link from "next/link"
import { config } from "@/lib/config"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-secondary pt-28 pb-40 sm:pt-32">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-architecture.jpg"
          alt={config.companyName}
          className="h-full w-full object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-balance font-serif text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
            Find your{" "}
            <span className="text-primary">perfect property</span>
          </h1>
          <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground">
            {config.siteDescription}
          </p>
        </div>
      </div>

      <div className="relative mx-auto mt-14 max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/pronat?lloji=sale"
            className="flex h-14 flex-1 items-center justify-center rounded-2xl bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Properties for Sale
          </Link>
          <Link
            href="/pronat?lloji=rent"
            className="flex h-14 flex-1 items-center justify-center rounded-2xl border-2 border-primary bg-transparent text-base font-semibold text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Properties for Rent
          </Link>
        </div>
      </div>
    </section>
  )
}