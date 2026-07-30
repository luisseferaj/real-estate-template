import { supabase } from '@/lib/supabase'
import { Phone, Mail } from 'lucide-react'
import { type Lang } from '@/lib/i18n'

export async function AgentsSection({ lang = 'al' }: { lang?: Lang }) {
  const { data: agents } = await supabase
    .from('agents')
    .select('*')
    .order('created_at', { ascending: true })

  if (!agents || agents.length === 0) return null

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-border">
      <h2 className="font-serif text-3xl font-semibold text-foreground mb-10">
        {lang === 'en' ? 'Our Team' : 'Ekipi ynë'}
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        {agents.map((agent) => (
          <div key={agent.id} className="rounded-2xl border border-border bg-card p-6 flex flex-col items-center text-center w-full sm:w-72">
            <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-primary/30 bg-muted mb-4">
              {agent.photo ? (
                <img src={agent.photo} alt={agent.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary/10 font-serif text-2xl font-bold text-primary">
                  {agent.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
              )}
            </div>
            <h3 className="font-serif text-lg font-semibold text-foreground">{agent.name}</h3>
            {agent.role && <p className="text-sm text-primary mt-1">{agent.role}</p>}

            <div className="mt-4 flex flex-col gap-2 w-full">
              {agent.phone && (
                <a href={`tel:${agent.phone.replace(/\s/g, '')}`} className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="h-4 w-4" />
                  {agent.phone}
                </a>
              )}
              {agent.email && (
                <a href={`mailto:${agent.email}`} className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="h-4 w-4" />
                  {agent.email}
                </a>
              )}
              {agent.instagram && (
                <a href={`https://instagram.com/${agent.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {agent.instagram}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}