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
  youtubeId: string
  agent: {
    name: string
    role: string
    phone: string
    whatsapp: string
    email: string
  }
}

const defaultAgent = {
  name: "Arta Hoxha",
  role: "Agjente e licensuar",
  phone: "+355 69 234 5678",
  whatsapp: "355692345678",
  email: "arta@artaestate.al",
}

const allImages = [
  "/images/property-1.png",
  "/images/property-2.png",
  "/images/property-3.png",
  "/images/property-4.png",
  "/images/property-5.png",
  "/images/property-6.png",
]

export const properties: Property[] = [
  {
    id: "1",
    title: "Vilë moderne me kopsht në Farkë",
    location: "Farkë, Tiranë",
    image: "/images/property-1.png",
    gallery: ["/images/property-1.png", "/images/property-3.png", "/images/property-5.png", "/images/property-6.png"],
    area: 240,
    beds: 4,
    baths: 3,
    price: 320000,
    status: "sale",
    description:
      "Kjo vilë moderne në zonën e kërkuar të Farkës ofron hapësira të gjera dhe ndriçim natyral gjatë gjithë ditës. Me një kopsht privat, garazh për dy makina dhe finiturа premium, prona është ideale për familjet që kërkojnë komoditet dhe privatësi vetëm pak minuta nga qendra e Tiranës.",
    youtubeId: "dQw4w9WgXcQ",
    agent: defaultAgent,
  },
  {
    id: "2",
    title: "Apartament luksoz përballë detit",
    location: "Riviera, Vlorë",
    image: "/images/property-2.png",
    gallery: ["/images/property-2.png", "/images/property-5.png", "/images/property-1.png", "/images/property-4.png"],
    area: 95,
    beds: 2,
    baths: 2,
    price: 189000,
    status: "sale",
    description:
      "Apartament elegant me pamje të pastër nga deti Adriatik, i vendosur në zemër të Rivierës Shqiptare. Ballkoni i gjerë, dritaret nga dyshemeja në tavan dhe akses i drejtpërdrejtë në plazh e bëjnë këtë pronë një investim ideal për qira sezonale ose banim gjatë gjithë vitit.",
    youtubeId: "dQw4w9WgXcQ",
    agent: defaultAgent,
  },
  {
    id: "3",
    title: "Shtëpi e gjerë familjare në Golem",
    location: "Golem, Durrës",
    image: "/images/property-3.png",
    gallery: ["/images/property-3.png", "/images/property-6.png", "/images/property-2.png", "/images/property-1.png"],
    area: 180,
    beds: 3,
    baths: 2,
    price: 1200,
    status: "rent",
    description:
      "Shtëpi e rehatshme familjare vetëm disa minuta nga plazhi i Golemit. Kopsht i gjelbër, oborr i mbyllur dhe ambiente të mobiluara plotësisht. E disponueshme me qira mujore, ideale për familje ose profesionistë që kërkojnë qetësi pranë detit.",
    youtubeId: "dQw4w9WgXcQ",
    agent: defaultAgent,
  },
  {
    id: "4",
    title: "Banesë historike guri e restauruar",
    location: "Qyteti i Vjetër, Gjirokastër",
    image: "/images/property-4.png",
    gallery: ["/images/property-4.png", "/images/property-1.png", "/images/property-6.png", "/images/property-3.png"],
    area: 160,
    beds: 3,
    baths: 2,
    price: 148000,
    status: "sale",
    description:
      "Një perlë arkitektonike në qytetin-muze të Gjirokastrës, e restauruar me kujdes duke ruajtur gurin origjinal dhe elementët tradicionalë osmanë. Ideale për ata që vlerësojnë historinë, me potencial të lartë për turizëm kulturor dhe akomodim butik.",
    youtubeId: "dQw4w9WgXcQ",
    agent: defaultAgent,
  },
  {
    id: "5",
    title: "Penthouse elegant me pamje qyteti",
    location: "Bllok, Tiranë",
    image: "/images/property-5.png",
    gallery: ["/images/property-5.png", "/images/property-2.png", "/images/property-3.png", "/images/property-1.png"],
    area: 130,
    beds: 3,
    baths: 2,
    price: 2500,
    status: "rent",
    description:
      "Penthouse i sofistikuar në zemër të Bllokut, me tarracë private dhe pamje panoramike mbi Tiranën. Dizajn bashkëkohor me detaje ari dhe të zeza, i mobiluar me shije. Ideal për ekzekutivë dhe diplomatë që kërkojnë prestigj në qendër.",
    youtubeId: "dQw4w9WgXcQ",
    agent: defaultAgent,
  },
  {
    id: "6",
    title: "Shtëpi komode buzë liqenit",
    location: "Pogradec, Liqeni i Ohrit",
    image: "/images/property-6.png",
    gallery: ["/images/property-6.png", "/images/property-4.png", "/images/property-3.png", "/images/property-2.png"],
    area: 145,
    beds: 3,
    baths: 2,
    price: 172000,
    status: "sale",
    description:
      "Shtëpi e ngrohtë buzë Liqenit të Ohrit, me tarracë prej druri dhe pamje të mrekullueshme drejt maleve. Ambient i qetë dhe ajër i pastër, perfekt për një shtëpi të dytë ose pushime familjare gjatë gjithë vitit.",
    youtubeId: "dQw4w9WgXcQ",
    agent: defaultAgent,
  },
]

export function getProperty(id: string): Property | undefined {
  return properties.find((p) => p.id === id)
}

export function getSimilarProperties(id: string, count = 3): Property[] {
  return properties.filter((p) => p.id !== id).slice(0, count)
}

// Deterministic formatter (avoids server/client locale mismatch during hydration)
export function euro(value: number): string {
  return "€" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export function formatPrice(property: Property): string {
  return property.status === "rent" ? `${euro(property.price)}/muaj` : euro(property.price)
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
