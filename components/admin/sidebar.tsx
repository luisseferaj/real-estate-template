'use client'

import {BarChart2, Users} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { signOut } from '@/app/admin/actions'
import {
  Building2,
  LayoutDashboard,
  ListChecks,
  PlusCircle,
  LogOut,
  Bell,
  PlusSquare,
} from 'lucide-react'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/dashboard#listings', label: 'Properties', icon: ListChecks },
  { href: '/admin/properties/new', label: 'Add Property', icon: PlusCircle },
  { href: '/admin/notifications', label: 'Notifications', icon: Bell },
  { href: '/admin/notifications/new', label: 'Add Notification', icon: PlusSquare },
  { href: '/admin/agents', label: 'Agents', icon: Users}, 
  { href: '/admin/stats', label:'Statistics', icon: BarChart2}
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex items-center gap-3 border-b border-sidebar-border px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
          <Building2 className="h-5 w-5 text-primary" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-serif text-lg font-semibold text-sidebar-foreground">
            Estate Admin
          </span>
          <span className="text-xs text-muted-foreground">Administration panel</span>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-4">
        {navItems.map((item) => {
          const isActive =
            item.href === '/admin/properties/new' ||
            item.href === '/admin/notifications/new'
              ? pathname === item.href
              : pathname.startsWith(item.href.split('#')[0]) &&
                item.href !== '/admin/dashboard#listings'
                ? item.href === '/admin/dashboard'
                  ? pathname === '/admin/dashboard'
                  : true
                : false
          const Icon = item.icon
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground',
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <form action={signOut}>
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-sidebar-foreground"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </form>
      </div>
    </aside>
  )
}
