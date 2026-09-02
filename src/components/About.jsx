const points = [
  {
    title: 'Client-first approach',
    desc: 'We work closely with every client to understand their goals before writing a single line of code.',
  },
  {
    title: 'Experienced team',
    desc: 'Our engineers, designers and consultants bring years of hands-on industry experience.',
  },
  {
    title: 'Modern technology',
    desc: 'We build with reliable, modern stacks so your product stays fast, secure and maintainable.',
  },
  {
    title: 'On-time delivery',
    desc: 'Clear timelines and transparent communication keep every project on track.',
  },
]

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        <div>
          <p className="text-brand-400 font-semibold mb-3 uppercase text-sm tracking-wide">
            About Admish
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
            Your trusted technology partner
          </h2>
          <p className="text-zinc-400 mb-6 leading-relaxed">
            Admish is an IT and software development company focused on
            turning ideas into reliable digital products. From startups to
            established businesses, we help clients design, build and scale
            software that solves real problems.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            We combine strong engineering practices with thoughtful design to
            deliver solutions that are not only functional, but genuinely
            easy to use.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {points.map((point) => (
            <div
              key={point.title}
              className="p-6 rounded-xl border border-zinc-800 hover:border-brand-400/50 hover:shadow-lg hover:shadow-brand-400/5 transition-all bg-zinc-900"
            >
              <h3 className="font-semibold text-white mb-2">{point.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{point.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
