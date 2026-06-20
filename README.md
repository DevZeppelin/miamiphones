# DATA

instagram: miamiphones_ar

Tu amigo, el que sabe de celulares 📱
📍|Oficina en Morteros
🇺🇸|Importadores directos
📱|Sellados y usados premium
🔃|Plan canje

# Miami Phones

Catálogo simple de iPhone (solo texto, sin fotos) pensado para conectarse con **Airtable**.
Hecho con Next.js 16 (App Router) + Tailwind.

## Cómo es la página

- Encabezado **MIAMI PHONES** + barra: _Garantía oficial • Hasta 12 cuotas • Stock inmediato_.
- Banner de WhatsApp ("iPhone usados — precios accesibles con garantía → Consulte ahora").
- Buscador + toggle de vista (cuadrícula / lista).
- Filtros por estado (Oferta / Sellado / Usado / etc.), generados automáticamente según los datos.
- Catálogo de tarjetas: descripción, color, precio en pesos y dólares, precio en 3 y 6 cuotas,
  y botón **Pedir por WhatsApp** que abre el chat con ese producto pre-cargado en el mensaje.

## Puesta en marcha

```bash
npm install
cp .env.local.example .env.local   # completá tus datos
npm run dev
```

Abrí http://localhost:3000

> Mientras no cargues las credenciales de Airtable, la web muestra **productos de ejemplo**
> para que veas el catálogo funcionando.

## Conectar Airtable

1. Creá una base con una tabla (por defecto llamada **`Productos`**) con estas columnas:

   | Columna       | Tipo      | Ejemplo                  | Obligatoria |
   | ------------- | --------- | ------------------------ | ----------- |
   | `Descripcion` | Texto     | iPhone 13 128GB          | Sí          |
   | `Color`       | Texto     | Azul                     | No          |
   | `PrecioARS`   | Número    | 540000                   | No          |
   | `PrecioUSD`   | Número    | 430                      | No          |
   | `Estado`      | Selección | Oferta / Sellado / Usado | No          |

   Las cuotas (3 y 6) se calculan solas a partir de `PrecioARS`, no hace falta cargarlas.
   El filtro de arriba usa los valores de `Estado` que existan en la tabla.

2. Generá un **Personal Access Token** en https://airtable.com/create/tokens con permiso
   `data.records:read` sobre tu base.

3. Completá `.env.local`:

   ```
   NEXT_PUBLIC_WHATSAPP_NUMBER=5491122334455
   AIRTABLE_TOKEN=patXXXXXXXXXXXXXX
   AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
   AIRTABLE_TABLE_NAME=Productos
   ```

4. Reiniciá `npm run dev`. Los productos de Airtable reemplazan a los de ejemplo.
   La web revalida los datos cada 60 segundos, así que los cambios aparecen al minuto.

## Estructura

```
app/
  layout.tsx        Layout raíz (metadata, fuentes)
  page.tsx          Trae los productos (server) y arma la página
  globals.css       Estilos base (Tailwind)
components/
  Header.tsx        Título + barra de beneficios
  Banner.tsx        Banner con CTA de WhatsApp
  Catalog.tsx       Buscador, filtros y toggle de vista (client)
  ProductCard.tsx   Tarjeta de producto
lib/
  airtable.ts       Lectura desde Airtable (+ datos de ejemplo)
  whatsapp.ts       Armado de los links de WhatsApp
  types.ts          Tipo Product
```
