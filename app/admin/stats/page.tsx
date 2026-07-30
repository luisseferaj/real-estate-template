import { getStats, updateStat } from '@/app/admin/actions'
import { AdminShell } from '@/components/admin/admin-shell'
import { StatsEditor } from '@/components/admin/stats-editor'

export const dynamic = 'force-dynamic'

export default async function StatsPage() {
  
  const stats = await getStats()
  

  return (
    <AdminShell>
      <header className="border-b border-border px-8 py-6">
        <h1 className="font-serif text-2xl font-semibold tracking-tight">
          Statistikat
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Ndryshoni numrat që shfaqen në faqen kryesore.
        </p>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <StatsEditor stats={stats} />
      </div>
    </AdminShell>
  )
}