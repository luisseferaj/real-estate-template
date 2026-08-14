import Link from 'next/link'
import { getNotifications, deleteNotification } from '@/app/admin/actions'
import { AdminShell } from '@/components/admin/admin-shell'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { NotificationsTable } from '@/components/admin/notifications-table'

export const dynamic = 'force-dynamic'

export default async function NotificationsPage() {
  const notifications = await getNotifications()

  return (
    <AdminShell>
      <header className="flex items-center justify-between border-b border-border px-8 py-6">
        <div>
          <h1 className="font-serif text-2xl font-semibold tracking-tight">
            Notifications
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your company's notifications.
          </p>
        </div>
        <Link href="/admin/notifications/new">
          <Button className="gap-1.5">
            <Plus className="h-4 w-4" />
            Add Notification
          </Button>
        </Link>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <NotificationsTable notifications={notifications} />
      </div>
    </AdminShell>
  )
}