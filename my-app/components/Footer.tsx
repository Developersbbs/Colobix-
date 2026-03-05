const links = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap"],
  Company: ["About", "Blog", "Careers", "Press"],
  Support: ["Docs", "Status", "Contact", "Security"],
};

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#0b1930] border-t border-slate-200 dark:border-cyan-500/10 pt-16 pb-8 px-[5%]">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
        <div>
          <a href="#" className="text-2xl font-extrabold tracking-tight block mb-4 text-slate-900 dark:text-white" style={{ fontFamily: "var(--font-syne)" }}>
            Colo<span className="text-cyan-400">bix</span>
          </a>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-[220px]">
            Enterprise server infrastructure for teams that demand reliability and speed.
          </p>
        </div>
        {Object.entries(links).map(([title, items]) => (
          <div key={title}>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-5 text-slate-900 dark:text-white" style={{ fontFamily: "var(--font-syne)" }}>
              {title}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {items.map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-500 dark:text-slate-400 text-sm hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center pt-8 border-t border-slate-200 dark:border-cyan-500/10 gap-4">
        <p className="text-slate-400 text-xs">© {new Date().getFullYear()} Colobix. All rights reserved.</p>
        <div className="flex gap-3">
          {["𝕏", "in", "gh"].map((s) => (
            <a key={s} href="#" className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-cyan-500/10 flex items-center justify-center text-slate-400 text-xs hover:border-cyan-400/40 hover:text-cyan-500 dark:hover:text-cyan-400 transition-all">
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}