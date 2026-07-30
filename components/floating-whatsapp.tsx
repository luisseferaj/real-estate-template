// components/floating-whatsapp.tsx
import { MessageCircle } from "lucide-react"
import Link from "next/link"

export function FloatingWhatsapp({ number }: { number: string }) {
  return (
    <Link
      href={`https://wa.me/${+355699477107}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95 md:hidden"
    >
      <MessageCircle className="h-6 w-6" />
    </Link>
  )
}