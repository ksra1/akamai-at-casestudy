import { useState } from "react";
import SlideLayout from "./SlideLayout";
import GlossaryModal from "./GlossaryModal";
import { Zap, Shield, Globe, BookOpen, CheckCircle2 } from "lucide-react";

const pillars = [
  {
    icon: Zap,
    title: "Delivery",
    color: "bg-primary",
    glowClass: "glow-primary",
    outcomes: [
      "5,000 hostnames onboarded in 30 days via PAPI templates",
      "5x traffic capacity via Ion + GTM failover",
      "50-70% image optimization via IVM",
      "Phased cohort rollout = safe production path",
    ],
  },
  {
    icon: Shield,
    title: "Security",
    color: "bg-accent",
    glowClass: "glow-accent",
    outcomes: [
      "4-layer defense: DDoS → WAF → Bot → API",
      "Behavioral ML stops sophisticated bot evasion",
      "Adaptive WAF auto-tunes, 5x fewer false positives",
      "Origin fully shielded via Site Shield",
    ],
  },
  {
    icon: Globe,
    title: "Governance",
    color: "bg-akamai-green",
    glowClass: "glow-green",
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
    <SlideLayout id="summary" variant="navy" pageNumber={11}>
      <div className="flex flex-col items-center justify-center space-y-10 min-h-[70vh]">
        <div className="text-center space-y-2">
          <p className="text-primary font-semibold tracking-[0.2em] uppercase text-sm">Bringing It All Together</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Summary</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl">
          {pillars.map(p => (
            <div key={p.title} className="glass-card rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className={`${p.color} w-10 h-10 rounded-lg flex items-center justify-center ${p.glowClass}`}>
                  <p.icon size={20} className="text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">{p.title}</h3>
              </div>
              <ul className="space-y-2">
                {p.outcomes.map(o => (
                  <li key={o} className="flex items-start gap-2 text-sm text-foreground/40">
                    <CheckCircle2 size={14} className="text-primary mt-0.5 shrink-0" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center space-y-3">
          <h3 className="font-display text-3xl font-bold text-foreground">Thank You</h3>
          <p className="text-foreground/25 text-lg">Questions & Discussion</p>
        </div>

        <button
          onClick={() => setGlossaryOpen(true)}
          className="flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/20 transition-colors no-print"
        >
          <BookOpen size={16} /> Akamai Product Glossary
        </button>
      </div>

      <GlossaryModal open={glossaryOpen} onOpenChange={setGlossaryOpen} />
    </SlideLayout>
  );
};

export default SummarySlide;
