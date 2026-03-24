import SlideLayout from "./SlideLayout";
import { Globe, Shield, Brain, Code2, Wrench, BarChart3, Zap } from "lucide-react";

const advantages = [
  {
    icon: Globe,
    title: "Biggest Edge Network. Period.",
    stat: "4,200+ PoPs",
    detail: "More edge = lower latency + higher cache hit ratios. When your users are in 3 regions, this matters.",
  },
  {
    icon: Shield,
    title: "One Vendor, Not Five",
    stat: "Delivery + Security",
    detail: "WAF, Bot, DDoS, and CDN on one platform. No traffic tromboning between vendors. One bill, one dashboard.",
  },
  {
    icon: Brain,
    title: "Bots Can't Fool ML",
    stat: "Behavioral AI",
    detail: "Rule-based bot detection catches known patterns. Behavioral ML catches the ones that are actively trying to evade you.",
  },
  {
    icon: Code2,
    title: "Code at the Edge",
    stat: "EdgeWorkers",
    detail: "Custom JS/TS at the edge for A/B testing, personalization, header manipulation. No origin round-trips needed.",
  },
  {
    icon: Wrench,
    title: "Infrastructure as Code",
    stat: "Terraform + API-First",
    detail: "Terraform provider + PAPI = 5,000 hostnames without clicking a single button in a portal.",
  },
  {
    icon: BarChart3,
    title: "See Everything. Guess Nothing.",
    stat: "mPulse + DataStream",
    detail: "Real user monitoring for Core Web Vitals + real-time log delivery to your SIEM. Actionable insights, not just charts.",
  },
];

const CompetitiveSlide = () => (
  <SlideLayout id="competitive" variant="navy" pageNumber={10}>
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <p className="text-primary font-semibold tracking-widest uppercase text-sm">The Honest Answer</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">Why Akamai</h2>
        <p className="text-primary-foreground/30 text-sm">Other CDNs deliver. We deliver, protect, and adapt — on the same platform.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {advantages.map(a => (
          <div key={a.title} className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-xl p-6 space-y-3 hover:bg-primary-foreground/8 transition-colors">
            <div className="flex items-center gap-3">
              <div className="bg-primary w-11 h-11 rounded-xl flex items-center justify-center">
                <a.icon size={22} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-primary-foreground text-base">{a.title}</h3>
                <p className="text-primary text-xs font-bold">{a.stat}</p>
              </div>
            </div>
            <p className="text-primary-foreground/50 text-sm leading-relaxed">{a.detail}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-5 py-2.5 rounded-full text-sm font-semibold">
          <Zap size={16} /> 30%+ of global web traffic flows through Akamai daily — unmatched threat intelligence
        </div>
      </div>
    </div>
  </SlideLayout>
);

export default CompetitiveSlide;
