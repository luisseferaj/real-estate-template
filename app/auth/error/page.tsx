import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export default function AuthErrorPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="flex max-w-sm flex-col items-center text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-destructive/30 bg-destructive/10">
          <AlertTriangle className="h-6 w-6 text-destructive" aria-hidden="true" />
        </div>
        <h1 className="font-serif text-2xl font-semibold">Authentication error</h1>
        <p className="mt-2 text-sm text-muted-foreground text-pretty">
          Something went wrong while confirming your session. Please try signing
          in again.
        </p>
        <Link href="/admin">
          <Button className="mt-6">Kthehu te hyrja</Button>
        </Link>
      </div>
    </main>
  )
}
