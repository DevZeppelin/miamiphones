import Image from "next/image";

export default function Header() {
  return (
    <header className="border-b border-zinc-200 bg-black">
      <div className="mx-auto max-w-5xl px-4 py-4 text-center">
        <Image
          src="/logo.png"
          alt="Miami Phones"
          width={600}
          height={300}
          priority
          className="mx-auto h-24 w-auto"
        />
      </div>
      <div className="bg-site-dark text-zinc-100">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-2 text-xs sm:text-sm">
          <span>Garantía oficial</span>
          <span className="text-zinc-500">•</span>
          <span>Hasta 12 cuotas</span>
          <span className="text-zinc-500">•</span>
          <span>Stock inmediato</span>
        </div>
      </div>
    </header>
  );
}
