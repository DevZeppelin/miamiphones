export type Producto = {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: string;
};

export async function obtenerProductos(): Promise<Producto[]> {
  const url = process.env.GOOGLE_SHEETS_CATALOG_URL;

  if (!url) {
    throw new Error("No está configurada GOOGLE_SHEETS_CATALOG_URL");
  }

  const respuesta = await fetch(url, {
    next: {
      // La web revisa cambios cada 60 segundos.
      revalidate: 60,
    },
  });

  if (!respuesta.ok) {
    throw new Error(`No se pudo obtener el catálogo: ${respuesta.status}`);
  }

  const productos = (await respuesta.json()) as Producto[];

  return productos.filter((producto) => producto.id && producto.nombre);
}
