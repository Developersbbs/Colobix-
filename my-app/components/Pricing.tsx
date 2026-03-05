const plans = [
  {
    name: "Starter", price: "$29", period: "per month",
    desc: "Perfect for small projects and early-stage startups.",
    features: ["2 vCPU Cores", "4 GB RAM", "100 GB NVMe SSD", "2 TB Bandwidth", "1 Gbps Port", "Basic DDoS Protection"],
    disabled: ["Managed Backups", "Priority Support"],
    featured: false, cta: "Get Started",
  },
  {
    name: "Pro", price: "$99", period: "per month",
    desc: "Ideal for growing businesses with production workloads.",
    features: ["8 vCPU Cores", "16 GB RAM", "500 GB NVMe SSD", "10 TB Bandwidth", "10 Gbps Port", "Advanced DDoS Protection", "Managed Daily Backups"],
    disabled: ["Dedicated Account Manager"],
    featured: true, cta: "Get Started",
  },
  {
    name: "Enterprise", price: "Custom", period: "contact us",
    desc: "Custom hardware, SLAs, and dedicated support for large organizations.",
    features: ["Bare-Metal or Custom Config", "Unlimited RAM Options", "Petabyte-scale Storage", "Unlimited Bandwidth", "100 Gbps Port", "Full DDoS Suite", "Custom Backup Policies", "Dedicated Account Manager"],
    disabled: [],
    featured: false, cta: "Contact Sales",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-white dark:bg-[#0b1930] border-t border-slate-200 dark:border-cyan-500/10">
      <div className="max-w-6xl mx-auto px-[5%] py-28">
        <span className="text-cyan-500 dark:text-cyan-400 text-xs font-bold uppercase tracking-widest">Pricing</span>
        <h2 className="text-4xl md:text-5xl font-extrabold mt-3 mb-4 tracking-tight text-slate-900 dark:text-white" style={{ fontFamily: "var(--font-syne)" }}>
          Simple, transparent pricing
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg font-light max-w-xl">
          No hidden fees, no surprise bills. Scale up or down at any time.
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-10 border transition-all hover:-translate-y-1.5 hover:shadow-2xl
                ${plan.featured
                  ? "border-cyan-400/50 bg-gradient-to-b from-cyan-50 dark:from-blue-500/10 to-white dark:to-cyan-400/5"
                  : "border-slate-200 dark:border-cyan-500/10 bg-slate-50 dark:bg-[#0b1930]/70"
                }`}
            >
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest whitespace-nowrap">
                  Most Popular
                </div>
              )}
              <div className="text-cyan-500 dark:text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">{plan.name}</div>
              <div className="text-5xl font-extrabold mb-1 text-slate-900 dark:text-white" style={{ fontFamily: "var(--font-syne)" }}>{plan.price}</div>
              <div className="text-slate-400 text-sm mb-4">{plan.period}</div>
              <p className="text-slate-500 dark:text-slate-400 text-sm border-b border-slate-200 dark:border-cyan-500/10 pb-6 mb-6">{plan.desc}</p>
              <ul className="flex flex-col gap-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <span className="text-cyan-500 font-bold">✓</span> {f}
                  </li>
                ))}
                {plan.disabled.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-slate-400">
                    <span>–</span> {f}
                  </li>
                ))}
              </ul>
              
            <a href="#contact"
                className={`block w-full text-center py-3 rounded-lg font-bold text-sm transition-all
                  ${plan.featured
                    ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:shadow-[0_0_24px_rgba(0,200,255,0.35)] hover:-translate-y-0.5"
                    : "border border-slate-200 dark:border-cyan-500/10 text-slate-700 dark:text-white hover:border-cyan-400 dark:hover:border-cyan-400/40 hover:bg-cyan-50 dark:hover:bg-cyan-400/5"
                  }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}