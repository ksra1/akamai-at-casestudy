import SlideLayout from "./SlideLayout";
import { CheckCircle2, AlertCircle } from "lucide-react";

const weeks = [
  {
    week: "Week 1",
    title: "Discovery & Assessment",
    days: "Days 1-7",
    color: "border-primary",
    dotColor: "bg-primary",
    lanes: {
      Delivery: ["Audit existing configurations & hostname inventory", "Create golden templates (e-commerce, content, API)", "Establish mPulse baseline monitoring"],
      Security: ["Security posture assessment", "Identify legacy WAF rule gaps", "Enable Site Shield on critical origins"],
      Training: ["Akamai 101 workshops for new teams", "Property Manager training sessions"],
      Governance: ["Stakeholder mapping & RACI setup", "Communication plan & escalation paths", "Risk register initialization"],
    },
  },
  {
    week: "Week 2",
    title: "Foundation",
    days: "Days 8-14",
    color: "border-akamai-green",
    dotColor: "bg-akamai-green",
    lanes: {
      Delivery: ["Wave 1: Pilot 500 hostnames via Bulk API", "Validate caching, SSL, Ion performance", "GTM configuration for multi-origin routing"],
      Security: ["Deploy AAP in Alert mode on Wave 1", "Bot Manager Premier in Monitoring mode", "API Discovery scan on checkout endpoints"],
      Training: ["Hands-on lab: Property Manager + Control Center", "Security product walkthrough"],
      Governance: ["Daily standup cadence established", "Wave 1 success criteria checkpoint"],
    },
  },
  {
    week: "Week 3",
    title: "Scale",
    days: "Days 15-21",
    color: "border-accent",
    dotColor: "bg-accent",
    lanes: {
      Delivery: ["Wave 2-3: 3,000 hostnames via Terraform", "Image Manager policies activated", "DNS cutover with canary routing (10→50→100%)"],
      Security: ["AAP: Alert → Deny transition (tuned rules)", "Bot Manager: Enable actions on classified bots", "Rate limiting on checkout & auth APIs"],
      Training: ["Incident response playbook walkthrough", "Monitoring dashboard training"],
      Governance: ["Risk review & mitigation updates", "Stakeholder progress report"],
    },
  },
  {
    week: "Week 4",
    title: "Hardening & Go-Live",
    days: "Days 22-30",
    color: "border-akamai-purple",
    dotColor: "bg-akamai-purple",
    lanes: {
      Delivery: ["Wave 4: Final 1,500 hostnames", "Cache hit ratio optimization (target >85%)", "Performance benchmarking vs mPulse baseline"],
      Security: ["Full security stack active & tuned", "Penetration testing validation", "DataStream SIEM integration"],
      Training: ["Operations handoff documentation", "Runbook delivery for L1/L2 support"],
      Governance: ["Final project review & lessons learned", "Ongoing governance model handoff", "SLA/KPI monitoring framework"],
    },
  },
];

const laneColors: Record<string, string> = {
  Delivery: "bg-primary/10 text-primary",
  Security: "bg-accent/10 text-accent",
  Training: "bg-akamai-green/10 text-akamai-green",
  Governance: "bg-akamai-purple/10 text-akamai-purple",
};

const RoadmapSlide = () => (
  <SlideLayout id="roadmap" pageNumber={12}>
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-primary font-semibold tracking-widest uppercase text-sm">Execution Plan</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">30-Day Project Roadmap</h2>
      </div>

      {/* Swim lane legend */}
      <div className="flex justify-center gap-4 flex-wrap">
        {Object.entries(laneColors).map(([lane, cls]) => (
          <span key={lane} className={`${cls} px-3 py-1 rounded-full text-xs font-semibold`}>{lane}</span>
        ))}
      </div>

      {/* Timeline */}
      <div className="grid md:grid-cols-4 gap-4">
        {weeks.map((w) => (
          <div key={w.week} className={`border-t-4 ${w.color} bg-card rounded-xl p-5 shadow-sm space-y-4`}>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${w.dotColor}`} />
              <div>
                <h3 className="font-display font-bold text-secondary text-base">{w.week}</h3>
                <p className="text-xs text-muted-foreground">{w.days} · {w.title}</p>
              </div>
            </div>

            {Object.entries(w.lanes).map(([lane, items]) => (
              <div key={lane}>
                <p className={`text-xs font-semibold ${laneColors[lane]} inline-block px-2 py-0.5 rounded mb-1.5`}>{lane}</p>
                <ul className="space-y-1">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                      <CheckCircle2 size={12} className="text-primary mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Key callout */}
      <div className="flex items-start gap-3 bg-accent/10 border border-accent/20 rounded-xl p-4 max-w-3xl mx-auto">
        <AlertCircle size={20} className="text-accent shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-semibold text-accent">Addressing "No Testing" Preference</p>
          <p className="text-muted-foreground">Instead of skipping testing entirely, we use <strong>canary deployments via GTM</strong> — routing 10% of traffic to new configs first. This gives us production-like validation while minimizing risk. Combined with instant rollback capability, the customer gets speed without gambling on stability.</p>
        </div>
      </div>
    </div>
  </SlideLayout>
);

export default RoadmapSlide;
