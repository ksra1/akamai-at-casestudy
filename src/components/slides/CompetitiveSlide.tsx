import SlideLayout from "./SlideLayout";
import { Globe, Shield, Brain, Code2, Wrench, BarChart3, Zap } from "lucide-react";

const advantages = [
  {
    icon: Globe,
    title: "Largest Edge Network",
    stat: "4,200+ PoPs",
    detail: "More points of presence = lower latency + better cache hit ratios globally. Critical for AT Retailers' multi-region operations.",
  },
  {
    icon: Shield,
    title: "Integrated Platform",
    stat: "Delivery + Security",
    detail: "WAF, Bot, DDoS, and CDN on one platform. No separate vendors, no traffic tromboning, one pane of glass.",
  },
  {
    icon: Brain,
    title: "Bot Manager — Behavioral AI",
    stat: "ML-Powered",
    detail: "Behavioral analysis + ML catches sophisticated evasion that rule-based/signature-only solutions miss entirely.",
  },
  {
    icon: Code2,
    title: "EdgeWorkers",
    stat: "Edge Compute",
    detail: "Custom JS/TS at the edge for A/B testing, personalization, header manipulation — no origin round-trips.",
  },
  {
    icon: Wrench,
    title: "Terraform & API-First",
    stat: "Full Automation",
    detail: "Terraform provider + Property Manager API = infrastructure-as-code for 5,000 hostnames. No manual portal clicking.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Visibility",
    stat: "mPulse + DataStream",
    detail: "RUM for Core Web Vitals + real-time log delivery to SIEM. Actionable insights, not just data.",
  },
];

const CompetitiveSlide = () => (
  <SlideLayout id="competitive" variant="navy" pageNumber={10}>
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <p className="text-primary font-semibold tracking-[0.2em] uppercase text-sm">Competitive Advantages</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Why Akamai</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {advantages.map(a => (
          <div key={a.title} className="glass-card rounded-xl p-6 space-y-3 hover:border-primary/20 transition-all">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 border border-primary/20 w-11 h-11 rounded-xl flex items-center justify-center">
                <a.icon size={22} className="text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground text-base">{a.title}</h3>
                <p className="text-primary text-xs font-bold">{a.stat}</p>
              </div>
            </div>
            <p className="text-foreground/35 text-sm leading-relaxed">{a.detail}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-5 py-2.5 rounded-full text-sm font-semibold">
          <Zap size={16} /> Akamai processes 30%+ of global web traffic daily — unmatched threat intelligence
        </div>
      </div>
    </div>
  </SlideLayout>
);

export default CompetitiveSlide;
