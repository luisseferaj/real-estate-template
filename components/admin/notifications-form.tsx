'use client'

import { useState, useTransition, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createNotification, updateNotification } from '@/app/admin/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ImagePlus, Loader2, X } from 'lucide-react'

type Notification = {
  id: string
  title: string
  content: string
  image: string
}

type FormState = {
  title: string
  content: string
  image: string
}

export function NotificationForm({ notification }: { notification?: Notification }) {
  const router = useRouter()
  const isEdit = Boolean(notification)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isPending, startTransition] = useTransition()

  const [form, setForm] = useState<FormState>({
    title: notification?.title ?? '',
    content: notification?.content ?? '',
    image: notification?.image ?? '',
  })

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
  const file = e.target.files?.[0]
  if (!file) return
  if (!file.type.startsWith('image/')) {
    toast.error('Ju lutem zgjidhni një foto')
    return
  }
  toast.info('Duke ngarkuar foton...')
  const reader = new FileReader()
  reader.onload = async () => {
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: reader.result }),
      })
      const json = await res.json()
      if (json.url) {
        update('image', json.url)
        toast.success('Foto u ngarkua me sukses!')
      } else {
        toast.error('Ngarkimi dështoi')
      }
    } catch {
      toast.error('Ngarkimi dështoi')
    }
  }
  reader.readAsDataURL(file)
}

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title.trim()) {
      toast.error('Titulli është i detyrueshëm')
      return
    }
    if (!form.content.trim()) {
      toast.error('Përmbajtja është e detyrueshme')
      return
    }
    startTransition(async () => {
      const result = isEdit
        ? await updateNotification(notification!.id, form)
        : await createNotification(form)
      if (result?.error) {
        toast.error(result.error)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl">
      <div className="grid gap-6 rounded-xl border border-border bg-card p-6 sm:p-8">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Titulli</Label>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
            placeholder="Kompleks i ri banesash në Tiranë"
            required
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="content">Përmbajtja</Label>
          <Textarea
            id="content"
            value={form.content}
            onChange={(e) => update('content', e.target.value)}
            placeholder="Shkruani njoftimin këtu..."
            rows={6}
          />
        </div>

        {/* Photo */}
        <div className="flex flex-col gap-2">
          <Label>Foto (opsionale)</Label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="sr-only"
          />
          {form.image ? (
            <div className="relative h-48 w-full max-w-sm overflow-hidden rounded-lg border border-border">
              <img
                src={form.image}
                alt="Preview"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => update('image', '')}
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-background/80 backdrop-blur hover:bg-background"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex h-48 w-full max-w-sm flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
            >
              <ImagePlus className="h-8 w-8" />
              <span className="text-sm font-medium">Klikoni për të ngarkuar foto</span>
              <span className="text-xs">PNG ose JPG</span>
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Button type="submit" disabled={isPending} className="gap-1.5">
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {isEdit ? 'Përditëso' : 'Publiko'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/notifications')}
          disabled={isPending}
        >
          Anulo
        </Button>
      </div>
    </form>
  )
}