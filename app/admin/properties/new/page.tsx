import Link from 'next/link'
import { AdminShell } from '@/components/admin/admin-shell'
import { PropertyForm } from '@/components/admin/property-form'
import { ArrowLeft } from 'lucide-react'

export default function NewPropertyPage() {
  return (
    <AdminShell>
      <header className="border-b border-border px-8 py-6">
        <Link
          href="/admin/dashboard"
          className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to dashboard
        </Link>
        <h1 className="font-serif text-2xl font-semibold tracking-tight">
          Add Property
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Create a new listing for your portfolio.
        </p>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <PropertyForm />
      </div>
    </AdminShell>
  )
}
