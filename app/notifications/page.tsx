import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { supabase } from '@/lib/supabase'
import { Bell } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Njoftime — Estate',
  description: 'Njoftimet e fundit nga kompania jonë.',
}

export const dynamic = 'force-dynamic'

export default async function NotificationsPage() {
  const { data: notifications } = await supabase
    .from('notifications')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />

      <section className="border-b border-border bg-accent text-accent-foreground">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-primary">Njoftime</p>
          <h1 className="mt-3 max-w-2xl text-balance font-serif text-4xl font-semibold sm:text-5xl">
            Njoftimet e fundit
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-accent-foreground/70">
            Qëndroni të informuar me lajmet dhe ofertat e fundit.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        {!notifications || notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card py-20 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Bell className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">Nuk ka njoftime akoma</h3>
            <p className="text-sm text-muted-foreground">Kontrolloni më vonë.</p>
          </div>
        ) : (
          <div className="flex flex-row gap-6">
            {notifications.map((n) => (
            <Link key={n.id} href={`/notifications/${n.id}`} className="block w-full hover:opacity-90 transition-opacity">
              <article
                key={n.id}
                className="rounded-2xl border border-border bg-card overflow-hidden"
                >
                {n.image && (
                    <img
                    src={n.image}
                    alt={n.title}
                        style={{ height: '350px', width: '100%', objectFit: 'contain' }}
                    />
                )}
                <div className="p-6 sm:p-8">
                    <p className="text-xs font-medium text-primary mb-2">
                    {new Date(n.created_at).toLocaleDateString('sq-AL', {
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

      <SiteFooter />
    </main>
  )
}