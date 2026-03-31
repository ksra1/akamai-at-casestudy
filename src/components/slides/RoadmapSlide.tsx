import SlideLayout from "./SlideLayout";
import { CheckCircle2, AlertCircle } from "lucide-react";

const weeks = [
  { week: "Week 1", title: "Kickoff & Planning", days: "Days 1-7", items: [
    { lane: "Delivery", tasks: ["Audit 5,000 hostname inventory", "Create golden templates (PAPI)", "Establish mPulse baseline + SLA thresholds"] },
    { lane: "Security", tasks: ["Security posture assessment", "WAF rule gap analysis vs OWASP Top 10", "Bot Manager attack simulation baseline"] },
    { lane: "Migration", tasks: ["Map UI & microservice inventory", "Define EdgeWorkers request routing logic", "Plan canary strategy (5% new, 95% legacy)"] },
    { lane: "Governance", tasks: ["Team RACI assignment + training kickoff", "Akamai 101 hands-on product session", "Establish daily standup + steering committee cadence"] },
  ]},
  { week: "Week 2", title: "Foundation & Wave 1 Cutover", days: "Days 8-14", items: [
    { lane: "Delivery", tasks: ["Domain validation (CPS CSR approval)", "Wave 1: 1,250 hostnames CNAME cutover", "Validate caching + SSL + Ion performance"] },
    { lane: "Security", tasks: ["WAF rules deployed in Alert-only mode (7 days)", "Bot Manager in Monitoring (48h baseline)", "API Discovery scan on checkout endpoints"] },
    { lane: "Migration", tasks: ["On-board Wave 1 services to Akamai", "Route legacy UI → legacy API endpoints", "Deploy EdgeWorkers request translator"] },
    { lane: "Governance", tasks: ["Wave 1 success checkpoint (error rate <0.5%)", "Post-cutover lessons learned review", "Customer confidence call with executives"] },
  ]},
  { week: "Week 3", title: "Scale & Parallel Waves", days: "Days 15-21", items: [
    { lane: "Delivery", tasks: ["Waves 2-3: 2,500 more hostnames (3-4 day cycles)", "Image Manager activation for static assets", "Parallel DNS cutover per wave (1-2 hour windows)"] },
    { lane: "Security", tasks: ["WAF: Alert → Deny (auto-tuned, <0.1% false positives)", "Bot Manager enforcement active on credential stuffing", "Rate limiting configured on API endpoints"] },
    { lane: "Migration", tasks: ["Deploy canary: 5% traffic to new services", "Feature flags control UI + API routing", "Real-time dual-version monitoring dashboard"] },
    { lane: "Governance", tasks: ["Weekly risk review + mitigation status", "Customer stakeholder progress briefing", "Incident response runbook walkthrough"] },
  ]},
  { week: "Week 4", title: "Completion & Hardening", days: "Days 22-30", items: [
    { lane: "Delivery", tasks: ["Wave 3: Final 1,250 hostnames (all 5,000 live)", "Cache optimization validation (>85% hit rate)", "Performance benchmarking vs baseline (LCP/TTFB)"] },
    { lane: "Security", tasks: ["Full security stack tuning complete", "Red team incident simulation (DDoS/bot/WAF)", "DataStream logs shipped to customer SIEM"] },
    { lane: "Migration", tasks: ["Gradual traffic split: 5%→25%→50%→100% new services", "Feature flag deactivation for legacy paths", "Instant rollback procedure tested & documented"] },
    { lane: "Governance", tasks: ["Operational handoff to L1/L2 support teams", "Runbooks signed off by AT Retailers", "Lessons learned & retrospective session"] },
  ]},
];

const laneColors: Record<string, string> = {
  Delivery: "text-primary",
  Security: "text-accent",
  Migration: "text-purple-500",
  Governance: "text-akamai-green",
};

const RoadmapSlide = () => (
  <SlideLayout id="roadmap" pageNumber={8}>
    <div className="space-y-5 stagger-children">
      <div>
        <p className="text-akamai-green font-semibold tracking-[0.2em] uppercase text-xs mb-2">Governance</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">30-Day Roadmap</h2>
      </div>

      <div className="flex gap-5">
        {Object.entries(laneColors).map(([lane, cls]) => (
          <span key={lane} className={`${cls} text-xs font-bold flex items-center gap-1.5`}>
            <div className={`w-2 h-2 rounded-full ${cls.replace('text-', 'bg-')}`} />
            {lane}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {weeks.map(w => (
          <div key={w.week} className="clean-card p-5 space-y-4">
            <div>
              <h3 className="font-display font-bold text-foreground text-lg">{w.week}</h3>
              <p className="text-sm text-muted-foreground">{w.days} · {w.title}</p>
            </div>
            {w.items.map(lane => (
              <div key={lane.lane}>
                <p className={`text-xs font-bold ${laneColors[lane.lane]} mb-1.5`}>{lane.lane}</p>
                <ul className="space-y-1">
                  {lane.tasks.map(task => (
                    <li key={task} className="flex items-start gap-2 text-sm text-muted-foreground leading-snug">
                      <CheckCircle2 size={12} className="text-primary/50 mt-0.5 shrink-0" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="clean-card flex items-start gap-3 p-4 max-w-3xl mx-auto border-l-3" style={{ borderLeftWidth: 3, borderLeftColor: 'hsl(24, 95%, 50%)' }}>
        <AlertCircle size={18} className="text-accent shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-semibold text-accent">Three Parallel Workstreams</p>
          <p className="text-muted-foreground mt-1">
            <strong className="text-foreground">Delivery:</strong> Hostname onboarding via phased waves (validated via mPulse). 
            <strong className="text-foreground ml-2">Security:</strong> AAF → Deny tuning, Bot Manager enforcement, API protection. 
            <strong className="text-foreground ml-2">Migration:</strong> UI + microservices on-board to Akamai (Week 2), canary validation (Week 3), gradual migration via feature flags (Week 4). Each workstream has instant rollback capability.
          </p>
        </div>
      </div>
    </div>
  </SlideLayout>
);

export default RoadmapSlide;
