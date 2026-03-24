import SlideLayout from "./SlideLayout";
import { Globe, Shield, Brain, Code2, Wrench, Network, Zap, BarChart3 } from "lucide-react";

const advantages = [
  {
    icon: Network,
    title: "World's Largest Edge Network",
    stat: "4,200+ PoPs",
    detail: "More points of presence than any competitor means lower latency and better cache hit ratios globally. Critical for AT Retailers' multi-region operations.",
  },
  {
    icon: Shield,
    title: "Integrated Security + Delivery",
    stat: "Single Platform",
    detail: "WAF, Bot, DDoS, and CDN on one platform. No separate vendors, no traffic tromboning, no integration complexity. One pane of glass for operations.",
  },
  {
    icon: Brain,
    title: "Bot Manager — Behavioral AI",
    stat: "ML-Powered",
    detail: "While competitors rely on signature-based detection, Bot Manager Premier uses behavioral analysis and ML. Catches sophisticated evasion techniques that rule-based solutions miss entirely.",
  },
  {
    icon: Code2,
    title: "EdgeWorkers — Edge Compute",
    stat: "Serverless at Edge",
    detail: "Run custom JavaScript/TypeScript at the edge for A/B testing, personalization, header manipulation, and business logic — without origin round-trips.",
  },
  {
    icon: Wrench,
    title: "Terraform & API-First",
    stat: "Full Automation",
    detail: "Terraform provider, Property Manager API, and CLI tools enable infrastructure-as-code for 5,000 hostnames. No manual portal clicking at scale.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Visibility",
    stat: "mPulse + DataStream",
    detail: "Real User Monitoring (mPulse) for Core Web Vitals plus DataStream for real-time log delivery to SIEM. Actionable insights, not just data.",
  },
];

const CompetitiveSlide = () => (
  <SlideLayout id="competitive" variant="navy" pageNumber={14}>
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <p className="text-primary font-semibold tracking-widest uppercase text-sm">Why Akamai</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">Competitive Advantages</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {advantages.map((a) => (
          <div
            key={a.title}
            className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-xl p-6 space-y-3 hover:bg-primary-foreground/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="bg-primary w-11 h-11 rounded-xl flex items-center justify-center">
                <a.icon size={22} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-primary-foreground text-base">{a.title}</h3>
                <p className="text-primary text-xs font-bold">{a.stat}</p>
              </div>
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">{a.detail}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-5 py-2.5 rounded-full text-sm font-semibold">
          <Zap size={16} /> Akamai processes 30%+ of global web traffic daily — unmatched threat intelligence
        </div>
      </div>
    </div>
  </SlideLayout>
);

export default CompetitiveSlide;
