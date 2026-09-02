const services = [
  {
    title: 'Web Development',
    desc: 'Custom, responsive websites and web applications built for performance and growth.',
    icon: (
      <path d="M4 6h16v12H4z M4 10h16 M8 6v4" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: 'Mobile App Development',
    desc: 'Native and cross-platform mobile apps for iOS and Android that users love.',
    icon: (
      <path d="M8 3h8a1 1 0 011 1v16a1 1 0 01-1 1H8a1 1 0 01-1-1V4a1 1 0 011-1z M11 18h2" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: 'Cloud Solutions',
    desc: 'Cloud architecture, migration and DevOps to keep your infrastructure scalable and secure.',
    icon: (
      <path d="M7 17a4 4 0 01-1-7.87A5 5 0 0116 8a4.5 4.5 0 011 8.9" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: 'UI/UX Design',
    desc: 'User-centered design that turns complex workflows into simple, delightful experiences.',
    icon: (
      <path d="M12 3l2.5 5.5L20 9l-4 4 1 5.5L12 16l-5 2.5 1-5.5-4-4 5.5-.5z" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: 'Custom Software',
    desc: 'Tailored software solutions designed around your specific business processes.',
    icon: (
      <path d="M9 6l-6 6 6 6 M15 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: 'IT Consulting',
    desc: 'Strategic guidance to help you choose the right technology and roadmap for your goals.',
    icon: (
      <path d="M12 2v4 M12 18v4 M4.9 4.9l2.8 2.8 M16.3 16.3l2.8 2.8 M2 12h4 M18 12h4 M4.9 19.1l2.8-2.8 M16.3 7.7l2.8-2.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
]

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-brand-400 font-semibold mb-3 uppercase text-sm tracking-wide">
            What We Do
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Services built around your goals
          </h2>
          <p className="text-zinc-400">
            End-to-end IT services that cover every stage of your product's
            journey — from strategy and design to development and support.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 hover:border-brand-400/40 hover:shadow-lg hover:shadow-brand-400/5 hover:-translate-y-1 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-400/10 text-brand-400 flex items-center justify-center mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {service.icon}
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
