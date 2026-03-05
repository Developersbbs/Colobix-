const testimonials = [
  {
    stars: 5,
    text: "We migrated our entire SaaS stack to Colobix six months ago. The latency improvement was immediate — our p95 response time dropped by over 60%.",
    name: "James Mercer", role: "CTO, Stackify", initials: "JM",
    color: "bg-cyan-100 dark:bg-cyan-400/15 text-cyan-600 dark:text-cyan-400",
  },
  {
    stars: 5,
    text: "Colobix's support team is unlike any provider we've used before. Issues get resolved in minutes, not hours. Their infra is rock solid.",
    name: "Priya Nair", role: "DevOps Lead, Lumitech", initials: "PN",
    color: "bg-blue-100 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400",
  },
  {
    stars: 5,
    text: "The DDoS protection alone is worth every penny. We took a 400Gbps hit last quarter and our users didn't notice a thing.",
    name: "Marcus Schulz", role: "Infrastructure Eng, PayVault", initials: "MS",
    color: "bg-indigo-100 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400",
  },
];

export default function Testimonials() {
  return (
    <section id="clients" className="bg-slate-50 dark:bg-[#050d1a] border-t border-slate-200 dark:border-cyan-500/10">
      <div className="max-w-6xl mx-auto px-[5%] py-28">
        <span className="text-cyan-500 dark:text-cyan-400 text-xs font-bold uppercase tracking-widest">Testimonials</span>
        <h2 className="text-4xl md:text-5xl font-extrabold mt-3 mb-4 tracking-tight text-slate-900 dark:text-white" style={{ fontFamily: "var(--font-syne)" }}>
          Trusted by engineering teams worldwide
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg font-light max-w-xl">
          Here's what our clients say about running on Colobix.
        </p>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white dark:bg-[#0b1930]/70 border border-slate-200 dark:border-cyan-500/10 rounded-2xl p-8 hover:border-cyan-300 dark:hover:border-cyan-400/30 transition-colors">
              <div className="text-cyan-400 tracking-widest mb-4">{"★".repeat(t.stars)}</div>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 font-light">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${t.color}`}>
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-sm text-slate-900 dark:text-white">{t.name}</div>
                  <div className="text-slate-400 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}