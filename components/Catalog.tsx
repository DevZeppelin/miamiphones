'use client'

import { useMemo, useState } from 'react'
import type { Product } from '@/lib/types'
import ProductCard from './ProductCard'

type View = 'grid' | 'list'
const TODOS = 'Todos'

export default function Catalog({ products }: { products: Product[] }) {
  const [query, setQuery] = useState('')
  const [view, setView] = useState<View>('grid')
  const [estado, setEstado] = useState<string>(TODOS)

  // Filtros disponibles: derivados de los estados que realmente existen en los datos.
  const estados = useMemo(() => {
    const set = new Set<string>()
    for (const p of products) {
      if (p.estado.trim()) set.add(p.estado.trim())
    }
    return [TODOS, ...Array.from(set).sort()]
  }, [products])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter((p) => {
      const matchEstado = estado === TODOS || p.estado.trim().toLowerCase() === estado.toLowerCase()
      const matchQuery =
        q === '' ||
        p.descripcion.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q) ||
        p.estado.toLowerCase().includes(q)
      return matchEstado && matchQuery
    })
  }, [products, query, estado])

  return (
    <section className="mx-auto mt-6 max-w-5xl px-4 pb-16">
      {/* Buscador + toggle de vista */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar modelo, color..."
            className="w-full rounded-lg border border-zinc-300 bg-white py-2 pl-9 pr-3 text-sm text-zinc-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div className="flex shrink-0 rounded-lg border border-zinc-300 bg-white p-0.5">
          <ViewButton active={view === 'grid'} onClick={() => setView('grid')} label="Vista en cuadrícula">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </ViewButton>
          <ViewButton active={view === 'list'} onClick={() => setView('list')} label="Vista en lista">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
              <rect x="3" y="4" width="18" height="3" rx="1" />
              <rect x="3" y="10.5" width="18" height="3" rx="1" />
              <rect x="3" y="17" width="18" height="3" rx="1" />
            </svg>
          </ViewButton>
        </div>
      </div>

      {/* Filtros por estado */}
      <div className="mt-3 flex flex-wrap gap-2">
        {estados.map((e) => (
          <button
            key={e}
            onClick={() => setEstado(e)}
            className={`rounded-full border px-3 py-1 text-sm transition-colors ${
              estado === e
                ? 'border-emerald-600 bg-emerald-600 text-white'
                : 'border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400'
            }`}
          >
            {e}
          </button>
        ))}
      </div>

      {/* Catalogo */}
      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-sm text-zinc-500">No se encontraron productos.</p>
      ) : (
        <div
          className={
            view === 'grid'
              ? 'mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'
              : 'mt-5 flex flex-col gap-3'
          }
        >
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} view={view} />
          ))}
        </div>
      )}
    </section>
  )
}

function ViewButton({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean
  onClick: () => void
  label: string
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={`rounded-md p-1.5 transition-colors ${
        active ? 'bg-emerald-600 text-white' : 'text-zinc-500 hover:text-zinc-800'
      }`}
    >
      {children}
    </button>
  )
}
