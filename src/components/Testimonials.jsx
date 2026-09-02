const testimonials = [
  {
    quote:
      "Admish rebuilt our checkout flow in under a month and cart abandonment dropped almost overnight. Communication was clear at every step — no surprises, no missed deadlines.",
    name: 'Priya Nair',
    role: 'Founder, NovaRetail',
    initials: 'PN',
  },
  {
    quote:
      "We've worked with a few agencies before, but Admish actually understood our business, not just our tech stack. The dashboard they shipped is still the tool our whole team lives in.",
    name: 'Arjun Mehta',
    role: 'COO, CargoTrack',
    initials: 'AM',
  },
  {
    quote:
      "Fast, reliable, and genuinely invested in getting it right. Admish caught issues before they became problems and kept us updated without us having to ask.",
    name: 'Sara Fernandes',
    role: 'Product Lead, MediSphere',
    initials: 'SF',
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 px-6 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-brand-400 font-semibold mb-3 uppercase text-sm tracking-wide">
            Client Feedback
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Don't just take our word for it
          </h2>
          <p className="text-zinc-400">
            Here's what clients say about working with Admish.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7 flex flex-col hover:border-brand-400/40 transition-colors"
            >
              <span className="text-brand-400 text-2xl mb-1">★★★★★</span>
              <p className="text-zinc-300 leading-relaxed mb-6 flex-1">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
                <span className="w-10 h-10 rounded-full bg-brand-400/10 text-brand-400 font-bold flex items-center justify-center shrink-0">
                  {t.initials}
                </span>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-zinc-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
