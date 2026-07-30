'use client'
 
import { useEffect, useRef, useState } from 'react'
import { type Lang } from '@/lib/i18n'
 
type Stat = {
  id: string
  label_al: string
  label_en: string
  value: string
  sort_order: number
}
 
function parseNumber(value: string): { prefix: string; num: number; suffix: string } {
  const match = value.match(/^([^0-9]*)(\d+(?:[.,]\d+)?)([^0-9]*)$/)
  if (!match) return { prefix: '', num: 0, suffix: value }
  return {
    prefix: match[1] ?? '',
    num: parseFloat(match[2].replace(',', '.')),
    suffix: match[3] ?? '',
  }
}
 
function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0)
 
  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
 
  return count
}
 
function StatCard({ stat, lang, animate }: { stat: Stat; lang: Lang; animate: boolean }) {
  const label = lang === 'en' ? stat.label_en : stat.label_al
  const { prefix, num, suffix } = parseNumber(stat.value)
  const isNumeric = num > 0
  const count = useCountUp(num, 1800, animate && isNumeric)
 
  return (
    <div className="group relative flex flex-col items-center text-center px-6 py-10">
      {/* Gold top line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-12 bg-primary transition-all duration-500 group-hover:w-24" />
 
      <p className="font-serif text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
        {prefix}
        {isNumeric ? count : stat.value}
        {isNumeric && suffix}
      </p>
 
      <p className="mt-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
    </div>
  )
}
 
export function StatsSection({ stats, lang = 'al' }: { stats: Stat[]; lang?: Lang }) {
  const ref = useRef<HTMLElement>(null)
  const [animate, setAnimate] = useState(false)
 
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
 
  const sorted = [...stats].sort((a, b) => a.sort_order - b.sort_order)
 
  return (
    <section ref={ref} className="border-y border-border bg-secondary py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="grid divide-y divide-border sm:divide-y-0 sm:divide-x"
          style={{ gridTemplateColumns: `repeat(${sorted.length}, minmax(0, 1fr))` }}
        >
          {sorted.map((stat) => (
            <StatCard key={stat.id} stat={stat} lang={lang} animate={animate} />
          ))}
        </div>
      </div>
    </section>
  )
}