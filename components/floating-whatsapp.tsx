import { MessageCircle } from "lucide-react"
import Link from "next/link"
import { config } from "@/lib/config"

export function FloatingWhatsapp() {
  if (!config.whatsapp) return null

  return (
    <Link
      href={config.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
    >
      <MessageCircle className="h-6 w-6" />
    </Link>
  )
}