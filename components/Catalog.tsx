"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import ProductCard, { type CardType } from "./ProductCard";

type View = "grid" | "list";
const TODOS = "Todos";

export default function Catalog({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [view, setView] = useState<View>("grid");
  const [estado, setEstado] = useState<string>(TODOS);
  const [cardType, setCardType] = useState<CardType>("local");

  const estados = useMemo(() => {
    const set = new Set<string>();
    for (const p of products) {
      if (p.estado.trim()) set.add(p.estado.trim());
    }
    return [TODOS, ...Array.from(set).sort()];
  }, [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchEstado =
        estado === TODOS ||
        p.estado.trim().toLowerCase() === estado.toLowerCase();
      const matchQuery =
        q === "" ||
        p.descripcion.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q) ||
        p.estado.toLowerCase().includes(q);
      return matchEstado && matchQuery;
    });
  }, [products, query, estado]);

  return (
    <section className="mx-auto mt-6 w-full max-w-5xl px-4 pb-16">
      {/* Selector de tarjeta */}
      <div className="mb-4 flex items-center gap-3">
        <span className="text-xs text-zinc-500 shrink-0">Cuotas con:</span>
        <div className="flex rounded-lg border border-zinc-200 bg-zinc-50 p-0.5 text-xs font-medium">
          <button
            onClick={() => setCardType("local")}
            className={`rounded-md px-3 py-1.5 transition-all ${
              cardType === "local"
                ? "bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-200"
                : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            Tarjetas locales
          </button>
          <button
            onClick={() => setCardType("visa")}
            className={`flex items-center gap-0 rounded-md px-3 py-1.5 transition-all ${
              cardType === "visa"
                ? "bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-200"
                : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            <VisaIcon className="h-3 w-5" />
            <MastercardIcon className="h-3.5 w-5" />
            <span>Visa / Master</span>
          </button>
        </div>
      </div>

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
            className="w-full rounded-lg border border-zinc-300 bg-white py-2 pl-9 pr-3 text-sm text-zinc-900 outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600"
          />
        </div>

        <div className="flex shrink-0 rounded-lg border border-zinc-300 bg-white p-0.5">
          <ViewButton
            active={view === "grid"}
            onClick={() => setView("grid")}
            label="Vista en cuadrícula"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </ViewButton>
          <ViewButton
            active={view === "list"}
            onClick={() => setView("list")}
            label="Vista en lista"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
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
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400"
            }`}
          >
            {e}
          </button>
        ))}
      </div>

      {/* Catálogo */}
      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-sm text-zinc-500">
          No se encontraron productos.
        </p>
      ) : (
        <div
          className={
            view === "grid"
              ? "mt-5 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
              : "mt-5 flex w-full flex-col gap-2"
          }
        >
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              view={view}
              cardType={cardType}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function ViewButton({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={`rounded-md p-1.5 transition-colors ${
        active ? "bg-brand-600 text-white" : "text-zinc-500 hover:text-zinc-800"
      }`}
    >
      {children}
    </button>
  );
}

function VisaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 16" className={className} aria-hidden="true">
      <text
        x="0"
        y="13"
        fontFamily="Arial"
        fontWeight="bold"
        fontSize="15"
        fill="#1A1F71"
      >
        VISA
      </text>
    </svg>
  );
}

function MastercardIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 38 24" className={className} aria-hidden="true">
      <circle cx="14" cy="12" r="10" fill="#EB001B" />
      <circle cx="24" cy="12" r="10" fill="#F79E1B" />
      <path d="M19 5.3a10 10 0 0 1 0 13.4A10 10 0 0 1 19 5.3z" fill="#FF5F00" />
    </svg>
  );
}
