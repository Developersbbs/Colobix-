const inputClass = "bg-white dark:bg-[#0b1930]/70 border border-slate-200 dark:border-cyan-500/10 rounded-lg px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10 outline-none transition w-full";

export default function Contact() {
  return (
    <section id="contact" className="bg-slate-50 dark:bg-[#050d1a] border-t border-slate-200 dark:border-cyan-500/10">
      <div className="max-w-6xl mx-auto px-[5%] py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left */}
          <div>
            <span className="text-cyan-500 dark:text-cyan-400 text-xs font-bold uppercase tracking-widest">Contact</span>
            <h2 className="text-4xl font-extrabold mt-3 mb-4 tracking-tight text-slate-900 dark:text-white" style={{ fontFamily: "var(--font-syne)" }}>
              Let's talk infrastructure
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-8">
              Whether you need a single VPS or a multi-region bare-metal deployment, our team will help you find the right solution.
            </p>
            {[
              { icon: "📧", label: "hello@colobix.com" },
              { icon: "📞", label: "+1 (888) 265-6249" },
              { icon: "📍", label: "San Francisco, CA & Global" },
            ].map((d) => (
              <div key={d.label} className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-cyan-50 dark:bg-cyan-400/10 border border-cyan-100 dark:border-cyan-400/20 flex items-center justify-center text-base flex-shrink-0">
                  {d.icon}
                </div>
                <span className="text-slate-500 dark:text-slate-400 text-sm">{d.label}</span>
              </div>
            ))}
          </div>

          {/* Right - Form */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-500 dark:text-slate-400 font-medium">First Name</label>
                <input type="text" placeholder="John" className={inputClass} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-500 dark:text-slate-400 font-medium">Last Name</label>
                <input type="text" placeholder="Doe" className={inputClass} />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-500 dark:text-slate-400 font-medium">Email</label>
              <input type="email" placeholder="john@company.com" className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-500 dark:text-slate-400 font-medium">Plan Interest</label>
              <select className={inputClass}>
                <option value="">Select a plan</option>
                <option>Starter</option>
                <option>Pro</option>
                <option>Enterprise</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-500 dark:text-slate-400 font-medium">Message</label>
              <textarea rows={4} placeholder="Tell us about your infrastructure needs..." className={inputClass + " resize-y"} />
            </div>
            <button className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-3.5 rounded-lg font-bold text-sm hover:shadow-[0_0_24px_rgba(0,200,255,0.35)] hover:-translate-y-0.5 transition-all">
              Send Message
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}