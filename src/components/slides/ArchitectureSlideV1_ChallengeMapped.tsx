import SlideLayout from "./SlideLayout";
import { Truck, Shield, TrendingUp, CheckCircle2 } from "lucide-react";

const mappings = [
  {
    icon: Truck,
    challenge: "Delivery",
    color: "bg-primary",
    problems: [
      "5,000 hostnames in 30 days — bulk onboarding at scale",
      "New teams untrained on Akamai products",
      "5x peak traffic handling required",
      "Slow image loading across sites",
      "Customer wants to skip testing — push straight to production",
    ],
    solutions: [
      { product: "Ion", benefit: "60-80% origin offload, SureRoute for intelligent routing" },
      { product: "Image & Video Manager", benefit: "50-70% payload reduction via format conversion & compression" },
      { product: "Global Traffic Manager", benefit: "DNS-based load balancing across 5,000 hostnames with failover" },
      { product: "mPulse (RUM)", benefit: "Real-time validation before production — no skipping QA" },
    ],
  },
  {
    icon: Shield,
    challenge: "Security",
    color: "bg-accent",
    problems: [
      "DDoS attacks targeting customer origins",
      "Outdated WAF rule sets on legacy configs",
      "Credential stuffing surge",
      "Inventory scraping by competitive bots",
      "Carding attempts on checkout APIs",
      "Sophisticated evasion: IP rotation, spoofed clients",
    ],
    solutions: [
      { product: "Prolexic + Site Shield", benefit: "Always-on DDoS protection up to 10+ Tbps, hides origin IPs" },
      { product: "App & API Protector (WAF)", benefit: "Adaptive rules replace legacy KSD/WAP, auto-updates" },
      { product: "Bot Manager Premier", benefit: "ML-based detection catches IP rotation & spoofed clients" },
      { product: "DataStream", benefit: "Real-time attack visibility across all geographies" },
    ],
  },
  {
    icon: TrendingUp,
    challenge: "Scale & Governance",
    color: "bg-akamai-green",
    problems: [
      "Multi-geography resource coordination",
      "Legacy monolith → microservices migration",
      "Acquired companies need platform migration",
      "Cross-team change management at scale",
    ],
    solutions: [
      { product: "Global Traffic Manager", benefit: "Centralized routing policy across all geographies" },
      { product: "DataStream + mPulse", benefit: "Unified observability dashboard for all origins" },
      { product: "Config Templates", benefit: "Rapid provisioning for acquired properties (hours vs weeks)" },
      { product: "API Automation", benefit: "Codified deployments reduce human error at scale" },
    ],
  },
];

const ArchitectureSlideV1 = () => {
  return (
    <SlideLayout id="architecture" pageNumber={5}>
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm">Solution Design</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">Challenge → Solution Mapping</h2>
          <p className="text-muted-foreground">How each Akamai product addresses specific challenges</p>
        </div>

        {/* Challenge-Solution Cards */}
        <div className="space-y-6">
          {mappings.map((section) => (
            <div key={section.challenge} className="bg-card rounded-xl border border-border p-6 shadow-sm">
              {/* Challenge Section Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`${section.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <section.icon size={24} className="text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-secondary">{section.challenge}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{section.problems.length} key challenges</p>
                </div>
              </div>

              {/* Two-column layout: Problems | Solutions */}
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                {/* Problems Column */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">The Challenge</p>
                  <ul className="space-y-2">
                    {section.problems.map((problem) => (
                      <li key={problem} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>{problem}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solutions Column */}
                <div>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">Akamai Solution</p>
                  <ul className="space-y-3">
                    {section.solutions.map((solution) => (
                      <div key={solution.product} className="bg-muted rounded-lg p-3 border border-border/50">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 size={16} className={`${section.color.replace('bg-', 'text-')} mt-0.5 shrink-0`} />
                          <div>
                            <p className="text-sm font-semibold text-secondary">{solution.product}</p>
                            <p className="text-xs text-muted-foreground mt-1">{solution.benefit}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Key Outcomes */}
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
          <h3 className="font-display text-lg font-semibold text-primary mb-4">Expected Outcomes</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">60-80%</p>
              <p className="text-sm text-muted-foreground mt-1">Origin Load Reduction</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">50-70%</p>
              <p className="text-sm text-muted-foreground mt-1">Payload Reduction</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">10+ Tbps</p>
              <p className="text-sm text-muted-foreground mt-1">DDoS Protection Capacity</p>
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};

export default ArchitectureSlideV1;
