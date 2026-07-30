import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function EnglishNotificationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { data: n } = await supabase
    .from('notifications')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (!n) notFound()

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          href="/en/notifications"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to news
        </Link>

        <article className="rounded-2xl border border-border bg-card overflow-hidden">
          {n.image && (
            <img
              src={n.image}
              alt={n.title}
              style={{ height: '200px', width: '100%', objectFit: 'contain', background: '#f5f5f5' }}
            />
          )}
          <div className="p-8">
            <p className="text-xs font-medium text-primary mb-3">
              {new Date(n.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <h1 className="font-serif text-3xl font-semibold text-foreground">
              {n.title}
            </h1>
            <div className="mt-6 text-muted-foreground leading-relaxed space-y-2">
              {n.content.split('\n').map((line: string, i: number) => (
                <p key={i}>{line || '\u00A0'}</p>
              ))}
            </div>
          </div>
        </article>
      </section>

      <SiteFooter lang="en" />
    </main>
  )
}