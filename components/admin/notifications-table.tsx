'use client'

import { useState, useTransition, useMemo } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { deleteNotification } from '@/app/admin/actions'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Pencil, Trash2, Loader2, Search, ChevronLeft, ChevronRight, Bell } from 'lucide-react'

type Notification = {
  id: string
  title: string
  content: string
  image: string
  created_at: string
}

const PER_PAGE = 15

export function NotificationsTable({ notifications }: { notifications: Notification[] }) {
  const [target, setTarget] = useState<Notification | null>(null)
  const [isPending, startTransition] = useTransition()
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    if (!query.trim()) return notifications
    return notifications.filter((n) =>
      n.title.toLowerCase().includes(query.toLowerCase()) ||
      n.content.toLowerCase().includes(query.toLowerCase())
    )
  }, [query, notifications])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * PER_PAGE
  const visible = filtered.slice(start, start + PER_PAGE)

  function handleDelete() {
    if (!target) return
    startTransition(async () => {
      const result = await deleteNotification(target.id)
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success('Njoftimi u fshi me sukses')
      }
      setTarget(null)
    })
  }

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card/50 px-6 py-20 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Bell className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">Nuk ka njoftime akoma</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          Filloni duke shtuar njoftimin tuaj të parë.
        </p>
        <Link href="/admin/notifications/new">
          <Button className="mt-2">Shto Njoftim</Button>
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1) }}
          placeholder="Kërko njoftimet..."
          className="h-10 w-full rounded-xl border border-border bg-card pl-9 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary sm:max-w-sm"
        />
      </div>

      <p className="mb-3 text-sm text-muted-foreground">
        Duke shfaqur <span className="font-semibold text-foreground">{start + 1}–{Math.min(start + PER_PAGE, filtered.length)}</span> nga <span className="font-semibold text-foreground">{filtered.length}</span> njoftime
      </p>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead>Titulli</TableHead>
              <TableHead>Përmbajtja</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Veprimet</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-12 text-center text-muted-foreground">
                  Asnjë njoftim nuk përputhet me kërkimin.
                </TableCell>
              </TableRow>
            ) : (
              visible.map((notification) => (
                <TableRow key={notification.id} className="border-border">
                  <TableCell className="font-medium">{notification.title}</TableCell>
                  <TableCell className="text-muted-foreground max-w-sm truncate">
                    {notification.content}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {new Date(notification.created_at).toISOString().split('T')[0]}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/notifications/${notification.id}/edit`}>
                        <Button variant="outline" size="sm" className="gap-1.5">
                          <Pencil className="h-3.5 w-3.5" />
                          Ndrysho
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => setTarget(notification)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Fshi
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground disabled:opacity-40"
          >
            <ChevronLeft className="size-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              className={`inline-flex size-9 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                n === currentPage
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-foreground hover:bg-secondary"
              }`}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="inline-flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      )}

      <Dialog open={target !== null} onOpenChange={(open) => !open && setTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Fshi njoftimin</DialogTitle>
            <DialogDescription>
              Jeni të sigurt që dëshironi të fshini{' '}
              <span className="font-medium text-foreground">{target?.title}</span>?
              Ky veprim nuk mund të zhbëhet.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTarget(null)} disabled={isPending}>
              Anulo
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isPending} className="gap-1.5">
              {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              Fshi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}