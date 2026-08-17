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

type Agent = {
  id: string
  name: string
}

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
  agent_id: string
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
  agent_id?: string | null
}

async function uploadToCloudinary(file: File, isVideo: boolean) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'real-estate')
  formData.append('folder', 'real-estate')
  const resourceType = isVideo ? 'video' : 'image'
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
    {
      method: 'POST',
      body: formData,
    }
  )
  if (!res.ok) throw new Error('Upload failed')
  const data = await res.json()
  return data.secure_url
}

export function PropertyForm({ property, agents = [] }: { property?: Property; agents?: Agent[] }) {
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
    agent_id: property?.agent_id ?? '',
  })

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
  const file = e.target.files?.[0]
  if (!file) return
  if (!file.type.startsWith('image/')) {
    toast.error('Please select an image file')
    return
  }
  toast.info('Uploading photo...')
  try {
    const url = await uploadToCloudinary(file, false)
    update('image', url)
    toast.success('Photo uploaded!')
  } catch {
    toast.error('Upload failed')
  }
}

  async function handleGalleryChange(e: React.ChangeEvent<HTMLInputElement>) {
  const files = Array.from(e.target.files ?? [])
  if (files.length === 0) return
  setGalleryUploading(true)
  toast.info('Uploading photos...')

  const urls: string[] = []
  for (const file of files) {
    if (!file.type.startsWith('image/')) continue
    try {
      const url = await uploadToCloudinary(file, false)
      urls.push(url)
    } catch {}
  }

  update('gallery', [...form.gallery, ...urls])
  setGalleryUploading(false)
  toast.success(`${urls.length} photos uploaded!`)
}

  function removeGalleryImage(index: number) {
    update('gallery', form.gallery.filter((_, i) => i !== index))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title.trim()) {
      toast.error('Title is required')
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
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
            placeholder="Modern Apartment in the Center"
            required
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="price">Price (€)</Label>
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
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={form.location}
              onChange={(e) => update('location', e.target.value)}
              placeholder="...Street, City, Country"
              required
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="beds">Bedrooms</Label>
            <Input
              id="beds"
              type="number"
              min={0}
              value={form.beds}
              onChange={(e) => update('beds', e.target.value === '' ? '' : Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="baths">Bathrooms</Label>
            <Input
              id="baths"
              type="number"
              min={0}
              value={form.baths}
              onChange={(e) => update('baths', e.target.value === '' ? '' : Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="area">Area (m²)</Label>
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
          <Label htmlFor="status">Status</Label>
          <Select
            value={form.status}
            onValueChange={(value) => update('status', value as PropertyStatus)}
          >
            <SelectTrigger id="status" className="w-full sm:w-56">
              <SelectValue placeholder="Zgjidhni statusin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sale">For Sale</SelectItem>
              <SelectItem value="rent">For Rent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Agent */}
        {agents.length > 0 && (
          <div className="flex flex-col gap-2">
            <Label htmlFor="agent">Agent</Label>
            <Select
              value={form.agent_id || ''}
              onValueChange={(value) => update('agent_id', value ?? '')}
            >
              <SelectTrigger id="agent" className="w-full sm:w-56">
                <SelectValue placeholder="Zgjidhni agjentin" />
              </SelectTrigger>
              <SelectContent>
                {agents.map((a) => (
                  <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Description */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            placeholder="Describe the property..."
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
            Enter only the video ID (the part after ?v= in the URL)
          </p>
        </div>

        {/* Main Photo */}
        <div className="flex flex-col gap-2">
          <Label>Main Photo</Label>
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
              <span className="text-sm font-medium">Click to upload the main photo</span>
              <span className="text-xs">PNG or JPG</span>
            </button>
          )}
        </div>

        {/* Gallery */}
        <div className="flex flex-col gap-2">
          <Label>Photo Gallery</Label>
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
              {galleryUploading ? 'Uploading...' : 'Click to upload gallery photos (you can select multiple)'}
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
          {isEdit ? 'Update' : 'Save'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/dashboard')}
          disabled={isPending}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}