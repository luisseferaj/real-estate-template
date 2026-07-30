'use client'

import { useState, useTransition, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createAgent, updateAgent } from '@/app/admin/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ImagePlus, Loader2, X } from 'lucide-react'

type Agent = {
  id: string
  name: string
  role: string
  phone: string
  email: string
  photo: string
  instagram: string
}

type FormState = {
  name: string
  role: string
  phone: string
  email: string
  photo: string
  instagram: string
}

export function AgentForm({ agent }: { agent?: Agent }) {
  const router = useRouter()
  const isEdit = Boolean(agent)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isPending, startTransition] = useTransition()

  const [form, setForm] = useState<FormState>({
    name: agent?.name ?? '',
    role: agent?.role ?? '',
    phone: agent?.phone ?? '',
    email: agent?.email ?? '',
    photo: agent?.photo ?? '',
    instagram: agent?.instagram ?? '',
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
          body: JSON.stringify({ data: reader.result, type: 'image' }),
        })
        const json = await res.json()
        if (json.url) {
          update('photo', json.url)
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
    if (!form.name.trim()) {
      toast.error('Emri është i detyrueshëm')
      return
    }
    startTransition(async () => {
      const result = isEdit
        ? await updateAgent(agent!.id, form)
        : await createAgent(form)
      if (result?.error) {
        toast.error(result.error)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl">
      <div className="grid gap-6 rounded-xl border border-border bg-card p-6 sm:p-8">
        
        {/* Photo */}
        <div className="flex flex-col gap-2">
          <Label>Foto</Label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="sr-only"
          />
          {form.photo ? (
            <div className="relative h-48 w-48 overflow-hidden rounded-full border border-border">
              <img src={form.photo} alt="Preview" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => update('photo', '')}
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-background/80 backdrop-blur hover:bg-background"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex h-48 w-48 flex-col items-center justify-center gap-2 rounded-full border border-dashed border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
            >
              <ImagePlus className="h-8 w-8" />
              <span className="text-xs font-medium">Foto</span>
            </button>
          )}
        </div>

        {/* Name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Emri</Label>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Atjon Gjoni"
            required
          />
        </div>

        {/* Role */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="role">Roli</Label>
          <Input
            id="role"
            value={form.role}
            onChange={(e) => update('role', e.target.value)}
            placeholder="Founder & Real Estate Consultant"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone">Telefon</Label>
          <Input
            id="phone"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="+355 69 947 7107"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="alpiinvest.intl@gmail.com"
          />
        </div>

        {/* Instagram */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="instagram">Instagram</Label>
          <Input
            id="instagram"
            value={form.instagram}
            onChange={(e) => update('instagram', e.target.value)}
            placeholder="@alpiinvest_properties"
          />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Button type="submit" disabled={isPending} className="gap-1.5">
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {isEdit ? 'Përditëso' : 'Shto'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/agents')}
          disabled={isPending}
        >
          Anulo
        </Button>
      </div>
    </form>
  )
}