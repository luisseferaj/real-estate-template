import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Bell } from 'lucide-react'


export async function NotificationsPreview() {
  const { data: notifications } = await supabase
    .from('notifications')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3)

  if (!notifications || notifications.length === 0) return null

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm font-medium text-primary">Lajme</p>
          <h2 className="mt-1 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Njoftimet e fundit
          </h2>
        </div>
        <Link
          href="/notifications"
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all"
        >
          <Bell className="size-4" />
          Shiko të gjitha
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {notifications.map((n) => (
        <Link key={n.id} href={`/notifications/${n.id}`} className="block hover:opacity-90 transition-opacity">
          <article
            key={n.id}
            className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col"
          >
            {n.image && (
              <img
                src={n.image}
                alt={n.title}
                style={{ height: '180px', width: '100%', objectFit: 'contain', background: '#f5f5f5' }}
              />
            )}
            <div className="p-5 flex flex-col flex-1">
              <p className="text-xs font-medium text-primary mb-2">
                {new Date(n.created_at).toLocaleDateString('sq-AL', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <h3 className="font-serif text-lg font-semibold text-foreground line-clamp-2">
                {n.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {n.content.split('\n')[0]}
              </p>
            </div>
          </article>
          </Link>
        ))}
      </div>
    </section>
  )
}