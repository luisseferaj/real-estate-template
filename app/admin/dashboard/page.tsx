import Link from 'next/link'
import { getProperties } from '@/app/admin/actions'
import { AdminShell } from '@/components/admin/admin-shell'
import { PropertiesTable } from '@/components/admin/properties-table'
import { Button } from '@/components/ui/button'
import { Plus, Building2, Tag, Key } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const properties = await getProperties()

  const forSale = properties.filter((p) => p.status === 'sale').length
  const forRent = properties.filter((p) => p.status === 'rent').length

  const stats = [
    { label: 'Total Properties', value: properties.length, icon: Building2 },
    { label: 'For Sale', value: forSale, icon: Tag },
    { label: 'For Rent', value: forRent, icon: Key },
  ]

  return (
    <AdminShell>
      <header className="flex items-center justify-between border-b border-border px-8 py-6">
        <div>
          <h1 className="font-serif text-2xl font-semibold tracking-tight">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage all your property listings in one place.
          </p>
        </div>
        <Link href="/admin/properties/new">
          <Button className="gap-1.5">
            <Plus className="h-4 w-4" />
            Add Property
          </Button>
        </Link>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            )
          })}
        </div>

        <section id="listings">
          <h2 className="mb-4 text-lg font-medium">All Properties</h2>
          <PropertiesTable properties={properties} />
        </section>
      </div>
    </AdminShell>
  )
}
