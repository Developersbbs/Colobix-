export default function Hero() {
  const stats = [
    { num: "99.99%", label: "Uptime SLA" },
    { num: "12ms", label: "Avg Latency" },
    { num: "40+", label: "Data Centers" },
    { num: "10k+", label: "Active Clients" },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-[5%] pt-28 pb-20 overflow-hidden bg-white dark:bg-[#000000]">

      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(0,200,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      {/* Glow - dark only */}
      <div className="hidden dark:block absolute w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.22)_0%,transparent_70%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="hidden dark:block absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,200,255,0.13)_0%,transparent_70%)] top-[30%] left-[60%] pointer-events-none" />

      {/* Badge */}
      <div className="relative flex items-center gap-2 bg-cyan-50 dark:bg-cyan-400/10 border border-cyan-200 dark:border-cyan-400/25 text-cyan-600 dark:text-cyan-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-ping" />
        Enterprise-Grade Infrastructure
      </div>

      <h1 className="relative text-5xl md:text-7xl font-extrabold leading-tight max-w-4xl mb-6 tracking-tight text-slate-900 dark:text-white" style={{ fontFamily: "var(--font-syne)" }}>
        The Server Platform
        <br />
        Built for{" "}
        <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
          Scale
        </span>
      </h1>

      <p className="relative text-slate-500 dark:text-slate-400 text-lg max-w-xl mb-10 font-light">
        Colobix delivers blazing-fast, ultra-reliable server infrastructure for businesses that cannot afford downtime.
      </p>

      <div className="relative flex flex-wrap gap-4 justify-center">
        <a href="#pricing" className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-3.5 rounded-lg font-bold hover:shadow-[0_0_30px_rgba(0,200,255,0.35)] hover:-translate-y-0.5 transition-all">
          Start Project
        </a>
        <a href="#features" className="border border-slate-200 dark:border-cyan-500/10 text-slate-700 dark:text-white px-8 py-3.5 rounded-lg font-semibold hover:border-cyan-400 dark:hover:border-cyan-400/40 hover:bg-cyan-50 dark:hover:bg-cyan-400/5 transition-all">
          Explore Features →
        </a>
      </div>

      {/* Stats */}
      <div className="relative flex flex-wrap gap-10 mt-20 justify-center">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: "var(--font-syne)" }}>{s.num}</div>
            <div className="text-xs text-slate-400 uppercase tracking-widest mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}