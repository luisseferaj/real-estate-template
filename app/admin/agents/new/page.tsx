import Link from 'next/link'
import { AdminShell } from '@/components/admin/admin-shell'
import { AgentForm } from '@/components/admin/agent-form'
import { ArrowLeft } from 'lucide-react'

export default function NewAgentPage() {
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
          Shto Agjent
        </h1>
      </header>
      <div className="flex-1 overflow-auto p-8">
        <AgentForm />
      </div>
    </AdminShell>
  )
}