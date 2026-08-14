'use client'

import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { updateStat } from '@/app/admin/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'

type Stat = {
  id: string
  label_al: string
  label_en: string
  value: string
  sort_order: number
}

export function StatsEditor({ stats }: { stats: Stat[] }) {
  const [forms, setForms] = useState(stats)
  const [isPending, startTransition] = useTransition()

  function updateForm(id: string, key: keyof Stat, value: string) {
    setForms((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [key]: value } : s))
    )
  }

  function handleSave(stat: Stat) {
    startTransition(async () => {
      const result = await updateStat(stat.id, stat)
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success('Statistics updated!')
      }
    })
  }

  return (
    <div className="max-w-3xl flex flex-col gap-6">
      {forms.map((stat) => (
        <div key={stat.id} className="rounded-xl border border-border bg-card p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-2">
              <Label>Value</Label>
              <Input
                value={stat.value}
                onChange={(e) => updateForm(stat.id, 'value', e.target.value)}
                placeholder="100+"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Label (Albanian)</Label>
              <Input
                value={stat.label_al}
                onChange={(e) => updateForm(stat.id, 'label_al', e.target.value)}
                placeholder="Prona të Listuara"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Label (English)</Label>
              <Input
                value={stat.label_en}
                onChange={(e) => updateForm(stat.id, 'label_en', e.target.value)}
                placeholder="Properties Listed"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              onClick={() => handleSave(stat)}
              disabled={isPending}
              size="sm"
              className="gap-1.5"
            >
              {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              Save
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}