"use client"

import { useState } from "react"

export function PropertyGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0)

  return (
    <div>
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-secondary">
        <img
          src={images[active] || "/placeholder.svg"}
          alt={`${title} — foto ${active + 1}`}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mt-3 grid grid-cols-4 gap-3">
        {images.map((img, i) => (
          <button
            key={img + i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Shfaq foton ${i + 1}`}
            aria-current={i === active}
            className={`relative aspect-[4/3] overflow-hidden rounded-xl border-2 transition-colors ${
              i === active ? "border-primary" : "border-transparent hover:border-border"
            }`}
          >
            <img src={img || "/placeholder.svg"} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
