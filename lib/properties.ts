import { supabase } from './supabase'

export type PropertyStatus = "sale" | "rent"

export type Property = {
  id: string
  title: string
  location: string
  image: string
  gallery: string[]
  area: number
  beds: number
  baths: number
  price: number
  status: PropertyStatus
  description: string
  youtube_id: string
  agent_id?: string | null
}

// Deterministic formatter (avoids server/client locale mismatch during hydration)
export function euro(value: number): string {
  return "€" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export function formatPrice(property: Property): string {
  return property.status === "rent" ? `${euro(property.price)}/month` : euro(property.price)
}


export async function getPropertiesFromDB() {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('updated_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching properties:', error)
    return []
  }
  
  return data
}

export async function getPropertyFromDB(id: string) {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error fetching property:', error)
    return null
  }
  
  return data
}

export async function getSimilarFromDB(id: string, location?: string) {
  // First try same city
  if (location) {
    const city = location.split(',')[0].trim()
    const { data: sameCity } = await supabase
      .from('properties')
      .select('*')
      .neq('id', id)
      .ilike('location', `%${city}%`)
      .limit(3)

    if (sameCity && sameCity.length >= 3) return sameCity

    // Fill remaining with other properties
    const { data: others } = await supabase
      .from('properties')
      .select('*')
      .neq('id', id)
      .not('location', 'ilike', `%${city}%`)
      .limit(3 - (sameCity?.length ?? 0))

    return [...(sameCity ?? []), ...(others ?? [])]
  }

  // Fallback — just get any 3
  const { data } = await supabase
    .from('properties')
    .select('*')
    .neq('id', id)
    .limit(3)

  return data ?? []
}
