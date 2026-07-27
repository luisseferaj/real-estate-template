import Link from 'next/link'
import { AdminShell } from '@/components/admin/admin-shell'
import { NotificationForm } from '@/components/admin/notifications-form'
import { ArrowLeft } from 'lucide-react'

export default function NewNotificationPage() {
  return (
    <AdminShell>
      <header className="border-b border-border px-8 py-6">
        <Link
          href="/admin/notifications"
          className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Kthehu te njoftimet
        </Link>
        <h1 className="font-serif text-2xl font-semibold tracking-tight">
          Shto Njoftim
        </h1>
      </header>
      <div className="flex-1 overflow-auto p-8">
        <NotificationForm />
      </div>
    </AdminShell>
  )
}