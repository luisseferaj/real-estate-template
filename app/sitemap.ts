import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://alpiinvest.al' // change to real domain later

  // Get all properties
  const { data: properties } = await supabase
    .from('properties')
    .select('id, updated_at')

  // Get all notifications
  const { data: notifications } = await supabase
    .from('notifications')
    .select('id, created_at')

  const propertyUrls = (properties ?? []).flatMap((p) => [
    {
      url: `${baseUrl}/pronat/${p.id}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/pronat/${p.id}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ])

  const notificationUrls = (notifications ?? []).flatMap((n) => [
    {
      url: `${baseUrl}/notifications/${n.id}`,
      lastModified: new Date(n.created_at),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/en/notifications/${n.id}`,
      lastModified: new Date(n.created_at),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
  ])

  return [
    { url: baseUrl, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/en`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/pronat`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/en/pronat`, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/notifications`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/en/notifications`, changeFrequency: 'weekly', priority: 0.5 },
    { url: `${baseUrl}/rreth-nesh`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/en/rreth-nesh`, changeFrequency: 'monthly', priority: 0.4 },
    ...propertyUrls,
    ...notificationUrls,
  ]
}