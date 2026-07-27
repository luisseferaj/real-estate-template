import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getNotification } from '@/app/admin/actions'
import { AdminShell } from '@/components/admin/admin-shell'
import { NotificationForm } from '@/components/admin/notifications-form'
import { ArrowLeft } from 'lucide-react'

export default async function EditNotificationPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const notification = await getNotification(id)

  if (!notification) notFound()

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
          Ndrysho Njoftimin
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {notification.title}
        </p>
      </header>
      <div className="flex-1 overflow-auto p-8">
        <NotificationForm notification={notification} />
      </div>
    </AdminShell>
  )
}