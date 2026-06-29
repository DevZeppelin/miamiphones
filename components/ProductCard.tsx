import type { Product } from "@/lib/types";
import { whatsappProductLink } from "@/lib/whatsapp";

const VISA = { c3: 0.35, c6: 0.5, c12: 0.9 };
const LOCAL = { c6: 0.25 };

const arsFmt = new Intl.NumberFormat("es-AR", {
  style: "decimal",
  maximumFractionDigits: 0,
});
const usdFmt = new Intl.NumberFormat("en-US", {
  style: "decimal",
  maximumFractionDigits: 0,
});

function estadoColor(estado: string): string {
  const e = estado.toLowerCase();
  if (e.includes("oferta")) return "bg-amber-100 text-amber-800";
  if (e.includes("sellado")) return "bg-brand-100 text-brand-700";
  if (e.includes("usado")) return "bg-sky-100 text-sky-800";
  return "bg-zinc-100 text-zinc-700";
}

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.82 9.82 0 001.515 5.26l-.999 3.648 3.742-.957zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413z" />
  </svg>
);

export default function ProductCard({
  product,
  view,
}: {
  product: Product;
  view: "grid" | "list";
}) {
  const ars = product.precioArs;
  const visaCuota3 = ars != null ? Math.ceil((ars * (1 + VISA.c3)) / 3) : null;
  const visaCuota6 = ars != null ? Math.ceil((ars * (1 + VISA.c6)) / 6) : null;
  const visaCuota12 =
    ars != null ? Math.ceil((ars * (1 + VISA.c12)) / 12) : null;
  const localCuota6 =
    ars != null ? Math.ceil((ars * (1 + LOCAL.c6)) / 6) : null;

  if (view === "list") {
    return (
      <article className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 transition-shadow hover:shadow-md">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <h3 className="text-sm font-semibold text-zinc-900">
              {product.descripcion}
            </h3>
            {product.estado && (
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${estadoColor(product.estado)}`}
              >
                {product.estado}
              </span>
            )}
          </div>
          {product.color && (
            <div className="mt-0.5 flex flex-wrap gap-1">
              {product.color.split(",").map((c) => (
                <span
                  key={c.trim()}
                  className="capitalize rounded-md bg-zinc-100 px-1.5 py-0.5 text-xs text-zinc-600"
                >
                  {c.trim()}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="shrink-0 text-right">
          {product.precioArs != null && (
            <p className="text-sm font-bold text-zinc-900">
              ARS {arsFmt.format(product.precioArs)}
            </p>
          )}
          {product.precioUsd != null && (
            <p className="text-xs text-zinc-400">
              USD {usdFmt.format(Math.ceil(product.precioUsd))}
            </p>
          )}
        </div>

        <a
          href={whatsappProductLink(product)}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-700"
        >
          <WhatsAppIcon className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Pedir</span>
        </a>
      </article>
    );
  }

  return (
    <article className="flex flex-col rounded-xl border border-zinc-200 bg-white p-4 transition-shadow hover:shadow-md">
      <div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-zinc-900">{product.descripcion}</h3>
          {product.estado && (
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${estadoColor(product.estado)}`}
            >
              {product.estado}
            </span>
          )}
        </div>
        {product.color && (
          <div className="mt-1 flex flex-wrap gap-1">
            {product.color.split(",").map((c) => (
              <span
                key={c.trim()}
                className="capitalize rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600"
              >
                {c.trim()}
              </span>
            ))}
          </div>
        )}

        <div className="mt-3 flex flex-col gap-0.5">
          {product.precioArs != null && (
            <span className="text-xl font-bold text-zinc-900">
              ARS {arsFmt.format(product.precioArs)}
            </span>
          )}
          {product.precioUsd != null && (
            <span className="text-base font-medium text-zinc-400">
              USD {usdFmt.format(Math.ceil(product.precioUsd))}
            </span>
          )}
        </div>

        {ars != null && (
          <div className="mt-3 grid grid-cols-2 gap-x-3 rounded-lg bg-zinc-50 px-3 py-2 text-xs">
            <div>
              <p className="mb-1 font-medium text-zinc-500">
                Visa / Mastercard
              </p>
              <p className="text-zinc-400">3 x {arsFmt.format(visaCuota3!)}</p>
              <p className="text-zinc-400">6 x {arsFmt.format(visaCuota6!)}</p>
              <p className="text-zinc-400">12x {arsFmt.format(visaCuota12!)}</p>
            </div>
            <div className="border-l border-zinc-200 pl-3">
              <p className="mb-1 font-medium text-zinc-500">Tarj. locales</p>
              <p className="text-zinc-400">6 x {arsFmt.format(localCuota6!)}</p>
            </div>
          </div>
        )}
      </div>

      <a
        href={whatsappProductLink(product)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
      >
        <WhatsAppIcon className="h-4 w-4" />
        Pedir por WhatsApp
      </a>
    </article>
  );
}
