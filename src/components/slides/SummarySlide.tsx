import { useState } from "react";
import SlideLayout from "./SlideLayout";
import GlossaryModal from "./GlossaryModal";
import { Zap, Shield, Globe, BookOpen, CheckCircle2 } from "lucide-react";

const pillars = [
  {
    icon: Zap, title: "Delivery", borderColor: "hsl(210, 100%, 40%)",
    outcomes: [
      "5,000 hostnames onboarded in 30 days via PAPI (Property API) templates",
      "5x traffic capacity via Ion + GTM failover",
      "50-70% image optimization via IVM",
      "Phased cohort rollout = safe production path",
    ],
  },
  {
    icon: Shield, title: "Security", borderColor: "hsl(24, 95%, 50%)",
    outcomes: [
      "4-layer defense: DDoS (Prolexic) → WAF (AAP) → Bot → API",
      "Behavioral ML stops sophisticated bot evasion",
      "Adaptive WAF auto-tunes, 5x fewer false positives",
      "Origin fully shielded via Site Shield",
    ],
  },
  {
    icon: Globe, title: "Governance", borderColor: "hsl(155, 70%, 35%)",
    outcomes: [
      "30-day phased roadmap with clear milestones",
      "RACI & escalation paths defined",
      "Config-as-code for team autonomy",
      "Training + handoff for long-term success",
    ],
  },
];

const SummarySlide = () => {
  const [glossaryOpen, setGlossaryOpen] = useState(false);

  return (
    <SlideLayout id="summary" variant="dark" pageNumber={11}>
      <div className="flex flex-col items-center justify-center space-y-8 min-h-[70vh]">
        <div className="text-center">
          <p className="text-white/40 font-semibold tracking-[0.2em] uppercase text-xs mb-2">Bringing It All Together</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Summary</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 w-full max-w-5xl">
          {pillars.map(p => (
            <div key={p.title} className="bg-white/5 border border-white/10 rounded p-5 space-y-3" style={{ borderLeftWidth: 3, borderLeftColor: p.borderColor }}>
              <div className="flex items-center gap-2">
                <p.icon size={18} className="text-white/60" />
                <h3 className="font-display text-lg font-bold text-white">{p.title}</h3>
              </div>
              <ul className="space-y-2">
                {p.outcomes.map(o => (
                  <li key={o} className="flex items-start gap-2 text-sm text-white/40">
                    <CheckCircle2 size={12} className="text-white/30 mt-0.5 shrink-0" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center space-y-2 mt-4">
          <h3 className="font-display text-2xl font-bold text-white">Thank You</h3>
          <div className="w-10 h-0.5 bg-white/20 mx-auto" />
          <p className="text-white/30 text-base">Questions & Discussion</p>
        </div>

        <button
          onClick={() => setGlossaryOpen(true)}
          className="flex items-center gap-2 bg-white/5 border border-white/10 text-white/60 px-4 py-2 rounded text-sm font-semibold hover:bg-white/10 transition-colors no-print"
        >
          <BookOpen size={14} /> Akamai Product Glossary
        </button>
      </div>

      <GlossaryModal open={glossaryOpen} onOpenChange={setGlossaryOpen} />
    </SlideLayout>
  );
};

export default SummarySlide;
