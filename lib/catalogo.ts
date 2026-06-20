import type { Product } from "./types";

// Fila tal como la devuelve el Apps Script de Google Sheets.
type SheetRow = {
  id?: string | number;
  descripcion?: string;
  color?: string;
  precioARS?: string | number;
  precioUSD?: string | number;
  estado?: string;
};

function toNumber(value: string | number | undefined): number | null {
  if (value == null || value === "") return null;
  const n =
    typeof value === "number"
      ? value
      : Number(String(value).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : null;
}

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "1",
    descripcion: "Tléfoono de prueba",
    color: "Azul",
    precioArs: 999,
    precioUsd: 999,
    estado: "Usado",
  },
];

export async function getProducts(): Promise<Product[]> {
  const url = process.env.GOOGLE_SHEETS_CATALOG_URL;

  if (!url) return SAMPLE_PRODUCTS;

  try {
    const res = await fetch(url, { next: { revalidate: 60 } });

    if (!res.ok) {
      console.error(`[catalogo] respuesta ${res.status}`);
      return SAMPLE_PRODUCTS;
    }

    const rows = (await res.json()) as SheetRow[];

    const products = rows
      .filter((r) => r.descripcion?.trim())
      .map(
        (r, i): Product => ({
          id: r.id != null ? String(r.id) : String(i + 1),
          descripcion: r.descripcion ?? "",
          color: r.color ?? "",
          precioArs: toNumber(r.precioARS),
          precioUsd: toNumber(r.precioUSD),
          estado: r.estado ?? "",
        }),
      );

    return products.length > 0 ? products : SAMPLE_PRODUCTS;
  } catch (err) {
    console.error("[catalogo] error:", err);
    return SAMPLE_PRODUCTS;
  }
}
