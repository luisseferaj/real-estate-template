'use client'

import { useState, useTransition, useMemo } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { deleteProperty } from '@/app/admin/actions'
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
import { Pencil, Trash2, ImageIcon, MapPin, Loader2, Search, ChevronLeft, ChevronRight } from 'lucide-react'

type Property = {
  id: string
  title: string
  location: string
  price: number
  status: 'sale' | 'rent'
  image: string
}

const PER_PAGE = 15

export function PropertiesTable({ properties }: { properties: Property[] }) {
  const [target, setTarget] = useState<Property | null>(null)
  const [isPending, startTransition] = useTransition()
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    if (!query.trim()) return properties
    return properties.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.location.toLowerCase().includes(query.toLowerCase())
    )
  }, [query, properties])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * PER_PAGE
  const visible = filtered.slice(start, start + PER_PAGE)

  function handleSearch(value: string) {
    setQuery(value)
    setPage(1)
  }

  function handleDelete() {
    if (!target) return
    startTransition(async () => {
      const result = await deleteProperty(target.id)
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success('Property was deleted succesfully')
      }
      setTarget(null)
    })
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card/50 px-6 py-20 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <ImageIcon className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No properties</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          Start adding your first property.
        </p>
        <Link href="/admin/properties/new">
          <Button className="mt-2">Add Property</Button>
        </Link>
      </div>
    )
  }

  return (
    <>
      {/* Search */}
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by title or location"
          className="h-10 w-full rounded-xl border border-border bg-card pl-9 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary sm:max-w-sm"
        />
      </div>

      {/* Results count */}
      <p className="mb-3 text-sm text-muted-foreground">
        Showing <span className="font-semibold text-foreground">{start + 1}–{Math.min(start + PER_PAGE, filtered.length)}</span> nga <span className="font-semibold text-foreground">{filtered.length}</span> prona
      </p>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead>Photo</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                  No properties found.
                </TableCell>
              </TableRow>
            ) : (
              visible.map((property) => (
                <TableRow key={property.id} className="border-border">
                  <TableCell>
                    <div className="relative h-12 w-16 overflow-hidden rounded-md border border-border bg-muted">
                      {property.image ? (
                        <img
                          src={property.image}
                          alt={property.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <ImageIcon className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{property.title}</TableCell>
                  <TableCell className="text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      {property.location}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium text-primary">
                    {property.status === 'rent' ? `€${property.price}/month` : `€${property.price}`}
                  </TableCell>
                  <TableCell>
                    <span className={
                      property.status === 'sale'
                        ? 'inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary'
                        : 'inline-flex items-center rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground'
                    }>
                      {property.status === 'sale' ? 'Sale' : 'Rent'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/properties/${property.id}/edit`}>
                        <Button variant="outline" size="sm" className="gap-1.5">
                          <Pencil className="h-3.5 w-3.5" />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => setTarget(property)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
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

      {/* Delete Dialog */}
      <Dialog open={target !== null} onOpenChange={(open) => !open && setTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Property</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{' '}
              <span className="font-medium text-foreground">{target?.title}</span>?
              This action can not be undone.
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