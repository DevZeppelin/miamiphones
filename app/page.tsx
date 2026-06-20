import Header from '@/components/Header'
import Banner from '@/components/Banner'
import Catalog from '@/components/Catalog'
import { getProducts } from '@/lib/catalogo'

export default async function Home() {
  const products = await getProducts()

  return (
    <div className="flex flex-1 flex-col bg-zinc-50">
      <Header />
      <Banner />
      <Catalog products={products} />
    </div>
  )
}
