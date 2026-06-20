import type { Product } from "./types";

// Numero de WhatsApp (con codigo de pais, solo digitos). Ej: 5491122334455
const WHATSAPP_NUMBER = 5493562673907;

function formatArs(value: number | null): string {
  if (value == null) return "";
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatUsd(value: number | null): string {
  if (value == null) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

// Link de WhatsApp generico (banner "consulte ahora").
export function whatsappGeneralLink(
  text = "Hola! Quiero hacer una consulta sobre los iPhone disponibles.",
): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

// Link de WhatsApp con el producto elegido pre-cargado en el mensaje.
export function whatsappProductLink(product: Product): string {
  const precios = [
    product.precioArs != null ? formatArs(product.precioArs) : null,
    product.precioUsd != null
      ? `USD ${formatUsd(product.precioUsd).replace("$", "")}`.trim()
      : null,
  ]
    .filter(Boolean)
    .join(" / ");

  const partes = [
    `Hola! Me interesa este producto:`,
    `• ${product.descripcion}${product.color ? ` (${product.color})` : ""}`,
    precios ? `• Precio: ${precios}` : null,
    `¿Esta disponible?`,
  ].filter(Boolean);

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(partes.join("\n"))}`;
}
