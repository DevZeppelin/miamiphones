export default function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-5 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          MIAMI PHONES
        </h1>
      </div>
      <div className="bg-zinc-900 text-zinc-100">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-2 text-xs sm:text-sm">
          <span>Garantía oficial</span>
          <span className="text-zinc-500">•</span>
          <span>Hasta 12 cuotas</span>
          <span className="text-zinc-500">•</span>
          <span>Stock inmediato</span>
        </div>
      </div>
    </header>
  )
}
