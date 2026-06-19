import type { Product } from './types'

// ---------------------------------------------------------------------------
// Integracion con Airtable.
//
// Configura estas variables en `.env.local` (ver `.env.local.example`):
//   AIRTABLE_TOKEN        -> Personal Access Token de Airtable
//   AIRTABLE_BASE_ID      -> ID de la base (empieza con "app...")
//   AIRTABLE_TABLE_NAME   -> Nombre de la tabla (por defecto "Productos")
//
// Mientras no esten configuradas, la web muestra productos de ejemplo para
// que puedas ver el catalogo funcionando. Apenas cargues las variables y
// tengas filas en Airtable, esos productos reemplazan a los de ejemplo.
// ---------------------------------------------------------------------------

// Columnas esperadas en la tabla de Airtable. Se aceptan algunos alias por
// comodidad para que no tengas que escribir el nombre exacto.
type AirtableFields = Record<string, unknown>

function pick(fields: AirtableFields, ...names: string[]): unknown {
  for (const name of names) {
    if (fields[name] != null && fields[name] !== '') return fields[name]
  }
  return undefined
}

function toNumber(value: unknown): number | null {
  if (value == null || value === '') return null
  const n = typeof value === 'number' ? value : Number(String(value).replace(/[^0-9.,-]/g, '').replace(',', '.'))
  return Number.isFinite(n) ? n : null
}

function toText(value: unknown): string {
  if (value == null) return ''
  if (Array.isArray(value)) return value.join(', ')
  return String(value)
}

function mapRecord(record: { id: string; fields: AirtableFields }): Product {
  const f = record.fields
  return {
    id: record.id,
    descripcion: toText(pick(f, 'Descripcion', 'Descripción', 'Nombre', 'Producto')),
    color: toText(pick(f, 'Color')),
    precioUsd: toNumber(pick(f, 'PrecioUSD', 'Precio USD', 'USD')),
    precioArs: toNumber(pick(f, 'PrecioARS', 'Precio ARS', 'Precio', 'ARS')),
    estado: toText(pick(f, 'Estado', 'Condicion', 'Condición', 'Categoria')),
  }
}

const SAMPLE_PRODUCTS: Product[] = [
  { id: 's1', descripcion: 'iPhone 11 64GB', color: 'Negro', precioUsd: 230, precioArs: 290000, estado: 'Usado' },
  { id: 's2', descripcion: 'iPhone 12 128GB', color: 'Blanco', precioUsd: 330, precioArs: 415000, estado: 'Usado' },
  { id: 's3', descripcion: 'iPhone 13 128GB', color: 'Azul', precioUsd: 430, precioArs: 540000, estado: 'Oferta' },
  { id: 's4', descripcion: 'iPhone 14 128GB', color: 'Medianoche', precioUsd: 560, precioArs: 700000, estado: 'Sellado' },
  { id: 's5', descripcion: 'iPhone 15 128GB', color: 'Rosa', precioUsd: 720, precioArs: 900000, estado: 'Sellado' },
  { id: 's6', descripcion: 'iPhone SE 2022 64GB', color: 'Rojo', precioUsd: 210, precioArs: 265000, estado: 'Oferta' },
]

export async function getProducts(): Promise<Product[]> {
  const token = process.env.AIRTABLE_TOKEN
  const baseId = process.env.AIRTABLE_BASE_ID
  const table = process.env.AIRTABLE_TABLE_NAME || 'Productos'

  // Sin credenciales -> productos de ejemplo (modo prueba).
  if (!token || !baseId) return SAMPLE_PRODUCTS

  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}?pageSize=100`

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      // Se cachea y revalida cada 60s: cambios en Airtable aparecen al minuto.
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      console.error(`[airtable] respuesta ${res.status}: ${await res.text()}`)
      return SAMPLE_PRODUCTS
    }

    const data = (await res.json()) as { records?: { id: string; fields: AirtableFields }[] }
    const records = data.records ?? []
    if (records.length === 0) return []

    // Solo filas con descripcion cargada.
    return records.map(mapRecord).filter((p) => p.descripcion.trim() !== '')
  } catch (err) {
    console.error('[airtable] error al consultar:', err)
    return SAMPLE_PRODUCTS
  }
}
