import Link from 'next/link'
import { getAgents, deleteAgent } from '@/app/admin/actions'
import { AdminShell } from '@/components/admin/admin-shell'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Trash2, UserCircle } from 'lucide-react'
import { AgentsTable } from '@/components/admin/agents-table'

export const dynamic = 'force-dynamic'

export default async function AgentsPage() {
  const agents = await getAgents()

  return (
    <AdminShell>
      <header className="flex items-center justify-between border-b border-border px-8 py-6">
        <div>
          <h1 className="font-serif text-2xl font-semibold tracking-tight">
            Agjentët
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Menaxhoni ekipin tuaj.
          </p>
        </div>
        <Link href="/admin/agents/new">
          <Button className="gap-1.5">
            <Plus className="h-4 w-4" />
            Shto Agjent
          </Button>
        </Link>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <AgentsTable agents={agents} />
      </div>
    </AdminShell>
  )
}