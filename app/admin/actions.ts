'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getProperties() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('updated_at', { ascending: false })
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getProperty(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .maybeSingle()
  if (error) throw new Error(error.message)
  return data
}

export async function createProperty(data: Record<string, any>) {
  const supabase = await createClient()
  const { error } = await supabase.from('properties').insert({
    title: data.title,
    price: Number(data.price),
    location: data.location,
    beds: Number(data.beds),
    baths: Number(data.baths),
    area: Number(data.area),
    status: data.status,
    description: data.description,
    youtube_id: data.youtube_id,
    image: data.image,
  })
  if (error) return { error: error.message }
  revalidatePath('/admin/dashboard')
  redirect('/admin/dashboard')
}

export async function updateProperty(id: string, data: Record<string, any>) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('properties')
    .update({
      title: data.title,
      price: Number(data.price),
      location: data.location,
      beds: Number(data.beds),
      baths: Number(data.baths),
      area: Number(data.area),
      status: data.status,
      description: data.description,
      youtube_id: data.youtube_id,
      image: data.image,
    })
    .eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/dashboard')
  redirect('/admin/dashboard')
}

export async function deleteProperty(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/dashboard')
  return { success: true }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/admin')
}

// NOTIFICATIONS
export async function getNotifications() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getNotification(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('id', id)
    .maybeSingle()
  if (error) throw new Error(error.message)
  return data
}

export async function createNotification(data: Record<string, any>) {
  const supabase = await createClient()
  const { error } = await supabase.from('notifications').insert({
    title: data.title,
    content: data.content,
    image: data.image,
  })
  if (error) return { error: error.message }
  revalidatePath('/admin/notifications')
  revalidatePath('/notifications')
  redirect('/admin/notifications')
}

export async function updateNotification(id: string, data: Record<string, any>) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('notifications')
    .update({
      title: data.title,
      content: data.content,
      image: data.image,
    })
    .eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/notifications')
  revalidatePath('/notifications')
  redirect('/admin/notifications')
}

export async function deleteNotification(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('notifications')
    .delete()
    .eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/notifications')
  return { success: true }
}