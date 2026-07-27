'use client'

import type React from 'react'
import { useState, useTransition, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createProperty, updateProperty } from '@/app/admin/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ImagePlus, Loader2, X } from 'lucide-react'

type PropertyStatus = 'sale' | 'rent'

type FormState = {
  title: string
  price: number | string
  location: string
  beds: number | string
  baths: number | string
  area: number | string
  status: PropertyStatus
  description: string
  youtube_id: string
  image: string
  gallery: string[]
}

type Property = {
  id: string
  title: string
  price: number
  location: string
  beds: number
  baths: number
  area: number
  status: PropertyStatus
  description: string
  youtube_id: string
  image: string
  gallery: string[]
}

export function PropertyForm({ property }: { property?: Property }) {
  const router = useRouter()
  const isEdit = Boolean(property)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)
  const [isPending, startTransition] = useTransition()
  const [galleryUploading, setGalleryUploading] = useState(false)

  const [form, setForm] = useState<FormState>({
    title: property?.title ?? '',
    price: property?.price ?? '',
    location: property?.location ?? '',
    beds: property?.beds ?? '',
    baths: property?.baths ?? '',
    area: property?.area ?? '',
    status: property?.status ?? 'sale',
    description: property?.description ?? '',
    youtube_id: property?.youtube_id ?? '',
    image: property?.image ?? '',
    gallery: property?.gallery ?? [],
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

  async function handleGalleryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (files.length === 0) return
    setGalleryUploading(true)
    toast.info('Duke ngarkuar fotot...')

    const urls: string[] = []
    for (const file of files) {
      if (!file.type.startsWith('image/')) continue
      const reader = new FileReader()
      await new Promise<void>((resolve) => {
        reader.onload = async () => {
          try {
            const res = await fetch('/api/upload', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ data: reader.result }),
            })
            const json = await res.json()
            if (json.url) urls.push(json.url)
          } catch {}
          resolve()
        }
        reader.readAsDataURL(file)
      })
    }

    update('gallery', [...form.gallery, ...urls])
    setGalleryUploading(false)
    toast.success(`${urls.length} foto u ngarkuan me sukses!`)
  }

  function removeGalleryImage(index: number) {
    update('gallery', form.gallery.filter((_, i) => i !== index))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title.trim()) {
      toast.error('Titulli është i detyrueshëm')
      return
    }
    startTransition(async () => {
      const result = isEdit
        ? await updateProperty(property!.id, form)
        : await createProperty(form)
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
            placeholder="Apartament modern në qendër"
            required
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="price">Çmimi (€)</Label>
            <Input
              id="price"
              type="number"
              min={0}
              value={form.price}
              onChange={(e) => update('price', e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="250000"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Vendndodhja</Label>
            <Input
              id="location"
              value={form.location}
              onChange={(e) => update('location', e.target.value)}
              placeholder="Tiranë, Bllok"
              required
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="beds">Dhoma gjumi</Label>
            <Input
              id="beds"
              type="number"
              min={0}
              value={form.beds}
              onChange={(e) => update('beds', e.target.value === '' ? '' : Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="baths">Banjo</Label>
            <Input
              id="baths"
              type="number"
              min={0}
              value={form.baths}
              onChange={(e) => update('baths', e.target.value === '' ? '' : Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="area">Sipërfaqe (m²)</Label>
            <Input
              id="area"
              type="number"
              min={0}
              value={form.area}
              onChange={(e) => update('area', e.target.value === '' ? '' : Number(e.target.value))}
            />
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="status">Statusi</Label>
          <Select
            value={form.status}
            onValueChange={(value) => update('status', value as PropertyStatus)}
          >
            <SelectTrigger id="status" className="w-full sm:w-56">
              <SelectValue placeholder="Zgjidhni statusin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sale">Në Shitje</SelectItem>
              <SelectItem value="rent">Me Qira</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Përshkrimi</Label>
          <Textarea
            id="description"
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            placeholder="Përshkruani pronën..."
            rows={4}
          />
        </div>

        {/* YouTube ID */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="youtube_id">YouTube Video ID</Label>
          <Input
            id="youtube_id"
            value={form.youtube_id}
            onChange={(e) => update('youtube_id', e.target.value)}
            placeholder="dQw4w9WgXcQ"
          />
          <p className="text-xs text-muted-foreground">
            Vendosni vetëm ID-në e videos (pjesa pas ?v= në URL)
          </p>
        </div>

        {/* Main Photo */}
        <div className="flex flex-col gap-2">
          <Label>Foto Kryesore</Label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="sr-only"
          />
          {form.image ? (
            <div className="relative h-48 w-full max-w-sm overflow-hidden rounded-lg border border-border">
              <img src={form.image} alt="Preview" className="h-full w-full object-cover" />
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
              <span className="text-sm font-medium">Klikoni për të ngarkuar foton kryesore</span>
              <span className="text-xs">PNG ose JPG</span>
            </button>
          )}
        </div>

        {/* Gallery */}
        <div className="flex flex-col gap-2">
          <Label>Galeria e Fotove</Label>
          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleGalleryChange}
            className="sr-only"
          />
          <button
            type="button"
            onClick={() => galleryInputRef.current?.click()}
            disabled={galleryUploading}
            className="flex h-24 w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground disabled:opacity-50"
          >
            <ImagePlus className="h-6 w-6" />
            <span className="text-sm font-medium">
              {galleryUploading ? 'Duke ngarkuar...' : 'Klikoni për të ngarkuar foto galerie (mund të zgjidhni disa)'}
            </span>
          </button>

          {form.gallery.length > 0 && (
            <div className="grid grid-cols-4 gap-2 mt-2">
              {form.gallery.map((url, i) => (
                <div key={i} style={{ position: 'relative', aspectRatio: '1' }} className="rounded-lg border border-border overflow-hidden">
                  <img src={url} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      removeGalleryImage(i)
                    }}
                    style={{ position: 'absolute', top: '4px', right: '4px' }}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-background/80 backdrop-blur hover:bg-background z-10"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Button type="submit" disabled={isPending} className="gap-1.5">
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {isEdit ? 'Përditëso' : 'Ruaj'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/dashboard')}
          disabled={isPending}
        >
          Anulo
        </Button>
      </div>
    </form>
  )
}