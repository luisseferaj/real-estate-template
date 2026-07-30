import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAgent } from '@/app/admin/actions'
import { AdminShell } from '@/components/admin/admin-shell'
import { AgentForm } from '@/components/admin/agent-form'
import { ArrowLeft } from 'lucide-react'

export default async function EditAgentPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const agent = await getAgent(id)

  if (!agent) notFound()

  return (
    <AdminShell>
      <header className="border-b border-border px-8 py-6">
        <Link
          href="/admin/agents"
          className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Kthehu te agjentët
        </Link>
        <h1 className="font-serif text-2xl font-semibold tracking-tight">
          Ndrysho Agjentin
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{agent.name}</p>
      </header>
      <div className="flex-1 overflow-auto p-8">
        <AgentForm agent={agent} />
      </div>
    </AdminShell>
  )
}