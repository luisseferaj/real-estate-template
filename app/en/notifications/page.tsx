import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { supabase } from '@/lib/supabase'
import { Bell } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'News — ALPIINVEST Properties',
  description: 'Latest news and announcements from ALPIINVEST Properties.',
}

export const dynamic = 'force-dynamic'

export default async function EnglishNotificationsPage() {
  const { data: notifications } = await supabase
    .from('notifications')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />

      <section className="border-b border-border bg-accent text-accent-foreground">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-primary">News</p>
          <h1 className="mt-3 max-w-2xl text-balance font-serif text-4xl font-semibold sm:text-5xl">
            Latest News
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-accent-foreground/70">
            Stay informed with our latest news and offers.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        {!notifications || notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card py-20 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Bell className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No news yet</h3>
            <p className="text-sm text-muted-foreground">Check back later.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {notifications.map((n) => (
              <Link key={n.id} href={`/en/notifications/${n.id}`} className="block hover:opacity-90 transition-opacity">
                <article className="rounded-2xl border border-border bg-card overflow-hidden">
                  {n.image && (
                    <img
                      src={n.image}
                      alt={n.title}
                      style={{ height: '200px', width: '100%', objectFit: 'contain', background: '#f5f5f5' }}
                    />
                  )}
                  <div className="p-6 sm:p-8">
                    <p className="text-xs font-medium text-primary mb-2">
                      {new Date(n.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <h2 className="font-serif text-2xl font-semibold text-foreground">
                      {n.title}
                    </h2>
                    <p className="mt-3 text-sm text-muted-foreground overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {n.content.split('\n')[0]}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>

      <SiteFooter lang="en"/>
    </main>
  )
}