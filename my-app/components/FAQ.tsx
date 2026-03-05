"use client";
import { useState } from "react";

const faqs = [
  { q: "What makes Colobix different from other providers?", a: "Colobix combines enterprise-grade bare-metal hardware with a developer-friendly control panel, real-time monitoring, and sub-minute support response times — at competitive pricing." },
  { q: "Do you offer a free trial?", a: "Yes. All new accounts get a 7-day free trial on our Starter and Pro plans with no credit card required." },
  { q: "Can I upgrade or downgrade my plan?", a: "Absolutely. You can change your plan at any time from the dashboard. Upgrades are instant; downgrades apply at the next billing cycle." },
  { q: "Where are your data centers located?", a: "We have 40+ PoPs across North America, Europe, Asia-Pacific, South America, Middle East, and Africa." },
  { q: "What kind of support do you offer?", a: "All plans include 24/7 ticket support. Pro and Enterprise clients also get access to live chat and a dedicated Slack channel." },
  { q: "Is there a long-term contract?", a: "No. All plans are month-to-month. Enterprise contracts are available for clients who prefer annual billing with discounts." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-white dark:bg-[#0b1930] border-t border-slate-200 dark:border-cyan-500/10">
      <div className="max-w-6xl mx-auto px-[5%] py-28">
        <span className="text-cyan-500 dark:text-cyan-400 text-xs font-bold uppercase tracking-widest">FAQ</span>
        <h2 className="text-4xl md:text-5xl font-extrabold mt-3 mb-4 tracking-tight text-slate-900 dark:text-white" style={{ fontFamily: "var(--font-syne)" }}>
          Frequently asked questions
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg font-light max-w-xl mb-14">
          Still have questions? Reach out to our team anytime.
        </p>
        <div className="flex flex-col gap-3 max-w-3xl">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-slate-50 dark:bg-[#0b1930]/70 border border-slate-200 dark:border-cyan-500/10 rounded-xl overflow-hidden">
              <button
                className="w-full flex justify-between items-center px-7 py-5 text-left font-semibold text-sm text-slate-800 dark:text-white hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors gap-4"
                onClick={() => setOpen(open === i ? null : i)}
              >
                {faq.q}
                <span className={`text-cyan-500 dark:text-cyan-400 text-xl flex-shrink-0 transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-60" : "max-h-0"}`}>
                <p className="px-7 pb-5 text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}