import { useState } from "react";
import SlideLayout from "./SlideLayout";
import GlossaryModal from "./GlossaryModal";
import { Zap, Shield, Globe, BookOpen, CheckCircle2 } from "lucide-react";

const pillars = [
  {
    icon: Zap,
    title: "We ship it",
    color: "bg-primary",
    outcomes: [
      "5,000 hostnames automated via PAPI templates",
      "5× traffic absorbed at edge, origin stays calm",
      "Images 50-70% lighter via IVM",
      "Phased waves = safe, fast, reversible",
    ],
  },
  {
    icon: Shield,
    title: "We lock it down",
    color: "bg-accent",
    outcomes: [
      "4-layer defense: DDoS → WAF → Bot → API",
      "Behavioral ML catches what signatures miss",
      "Adaptive WAF auto-tunes — 5× fewer false positives",
      "Origin hidden behind Site Shield from day 1",
    ],
  },
  {
    icon: Globe,
    title: "We make it stick",
    color: "bg-akamai-green",
    outcomes: [
      "30-day roadmap with weekly checkpoints",
      "RACI + escalation paths — everyone knows their job",
      "Config-as-Code for team autonomy",
      "Training + handoff for long-term ownership",
    ],
  },
];

const SummarySlide = () => {
  const [glossaryOpen, setGlossaryOpen] = useState(false);

  return (
    <SlideLayout id="summary" variant="navy" pageNumber={11}>
      <div className="flex flex-col items-center justify-center space-y-10 min-h-[70vh]">
        <div className="text-center space-y-2">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm">That's the plan</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">Let's Build This</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl">
          {pillars.map(p => (
            <div key={p.title} className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className={`${p.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                  <p.icon size={20} className="text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold text-primary-foreground">{p.title}</h3>
              </div>
              <ul className="space-y-2">
                {p.outcomes.map(o => (
                  <li key={o} className="flex items-start gap-2 text-sm text-primary-foreground/60">
                    <CheckCircle2 size={14} className="text-primary mt-0.5 shrink-0" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center space-y-3">
          <h3 className="font-display text-3xl font-bold text-primary-foreground">Thank You</h3>
          <p className="text-primary-foreground/40 text-lg">Questions? Let's talk.</p>
        </div>

        <button
          onClick={() => setGlossaryOpen(true)}
          className="flex items-center gap-2 bg-primary/20 text-primary px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/30 transition-colors no-print"
        >
          <BookOpen size={16} /> Akamai Product Glossary
        </button>
      </div>

      <GlossaryModal open={glossaryOpen} onOpenChange={setGlossaryOpen} />
    </SlideLayout>
  );
};

export default SummarySlide;
