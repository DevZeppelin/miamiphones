// Modelo de producto que la web consume. Cada producto viene de una fila de Airtable.
export type Product = {
  id: string
  descripcion: string
  color: string
  precioUsd: number | null
  precioArs: number | null
  // Estado libre que tambien funciona como filtro: "Oferta", "Sellado", "Usado", etc.
  estado: string
}
