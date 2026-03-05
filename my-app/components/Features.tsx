const features = [
  { icon: "🖥️", title: "SSD Disk Drives", desc: "You will never make mistake using our own top-notch dedicated servers." },
  { icon: "🌐", title: "40 GB/s Network", desc: "We can guarantee an excellent experience with high speed bandwidth for your success." },
  { icon: "🛡️", title: "DDoS Protection", desc: "With full root access you will be able to take full control of your server very easy." },
  { icon: "📡", title: "Dedicated IP", desc: "One of many premium features is a dedicated IP for each hosting plan." },
  { icon: "⏱️", title: "99.9% Uptime Guarantee", desc: "With multiple datacenter locations, cooling, generators, and constant monitoring, we are able to offer 99.9% Uptime Guarantee." },
  { icon: "💬", title: "24/7 Support", desc: "We are available to help and find answers to questions as soon as they come up 24/7 and in real-time." },
];

export default function Features() {
  return (
    <section id="features" className="bg-slate-50 dark:bg-[#050d1a] border-t border-slate-200 dark:border-cyan-500/10">
      <div className="max-w-6xl mx-auto px-[5%] py-28">
        <span className="text-cyan-500 dark:text-cyan-400 text-xs font-bold uppercase tracking-widest">Why Colobix</span>
        <h2 className="text-4xl md:text-5xl font-extrabold mt-3 mb-4 tracking-tight text-slate-900 dark:text-white" style={{ fontFamily: "var(--font-syne)" }}>
          Everything your infrastructure needs
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg font-light max-w-xl">
          From dedicated bare-metal to fully managed cloud — we have the right solution for any workload.
        </p>

        <div className="mt-14  grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 dark:border-cyan-500/10 rounded-2xl overflow-hidden divide-x divide-y divide-slate-200 dark:divide-cyan-500/10">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative bg-white dark:bg-[#0b1930]/70 p-10 transition-all duration-300
                hover:bg-cyan-50 dark:hover:bg-cyan-400/5
                hover:shadow-[inset_0_0_0_1px_rgba(6,182,212,0.4)]
                dark:hover:shadow-[inset_0_0_0_1px_rgba(6,182,212,0.25)]"
            >
              {/* Top shimmer line — visible in both themes on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon box */}
              <div className="w-12 h-12 rounded-xl
                bg-slate-100 dark:bg-cyan-400/10
                border border-slate-200 dark:border-cyan-400/20
                group-hover:bg-cyan-100 dark:group-hover:bg-cyan-400/20
                group-hover:border-cyan-300 dark:group-hover:border-cyan-400/40
                flex items-center justify-center text-2xl mb-6
                transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                {f.icon}
              </div>

              {/* Title */}
              <h3
                className="text-lg font-bold mb-2 text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {f.title}
              </h3>

              {/* Description */}
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                {f.desc}
              </p>

              {/* Bottom-right accent dot */}
              <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}