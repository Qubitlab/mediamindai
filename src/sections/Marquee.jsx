const items = [
  'ESPN', 'CBS', 'ABC', 'NBC', 'TaylorMade', 'Samsung', 'Coca-Cola',
  'ChatGPT', 'Claude', 'Gemini', 'Grok', 'Perplexity', 'DeepSeek',
]

export default function Marquee() {
  const doubled = [...items, ...items]

  return (
    <section className="border-b border-white/10 bg-brand-black relative overflow-hidden py-10">
      <div className="absolute left-0 inset-y-0 w-32 bg-gradient-to-r from-brand-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-32 bg-gradient-to-l from-brand-black to-transparent z-10 pointer-events-none" />

      <div className="flex w-full overflow-hidden">
        <div className="flex animate-marquee gap-16 items-center whitespace-nowrap px-8">
          {doubled.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-display text-lg font-bold tracking-tight text-txt-muted/70 hover:text-txt-muted transition-opacity cursor-default select-none"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
