'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { deleteAgent } from '@/app/admin/actions'
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
import { Pencil, Trash2, Loader2, UserCircle } from 'lucide-react'

type Agent = {
  id: string
  name: string
  role: string
  phone: string
  email: string
  photo: string
  instagram: string
}

export function AgentsTable({ agents }: { agents: Agent[] }) {
  const [target, setTarget] = useState<Agent | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    if (!target) return
    startTransition(async () => {
      const result = await deleteAgent(target.id)
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success('Agent was deleted succesfully')
      }
      setTarget(null)
    })
  }

  if (agents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card/50 px-6 py-20 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <UserCircle className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No agents</h3>
        <Link href="/admin/agents/new">
          <Button className="mt-2">Add Agent</Button>
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead>Photo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Telephone</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agents.map((agent) => (
              <TableRow key={agent.id} className="border-border">
                <TableCell>
                  <div className="h-10 w-10 overflow-hidden rounded-full border border-border bg-muted">
                    {agent.photo ? (
                      <img src={agent.photo} alt={agent.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <UserCircle className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{agent.name}</TableCell>
                <TableCell className="text-muted-foreground">{agent.role}</TableCell>
                <TableCell className="text-muted-foreground">{agent.phone}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/agents/${agent.id}/edit`}>
                      <Button variant="outline" size="sm" className="gap-1.5">
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => setTarget(agent)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={target !== null} onOpenChange={(open) => !open && setTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete agent</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{' '}
              <span className="font-medium text-foreground">{target?.name}</span>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTarget(null)} disabled={isPending}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isPending} className="gap-1.5">
              {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}