import SlideLayout from "./SlideLayout";
import { CheckCircle2, AlertCircle } from "lucide-react";

const weeks = [
  { week: "Week 1", title: "Discovery", days: "Days 1-7", items: [
    { lane: "Delivery", tasks: ["Audit hostname inventory", "Create golden templates", "Establish mPulse baseline"] },
    { lane: "Security", tasks: ["Security posture assessment", "Identify WAF rule gaps", "Enable Site Shield"] },
    { lane: "Governance", tasks: ["Stakeholder RACI setup", "Training: Akamai 101 for new teams", "Risk register"] },
  ]},
  { week: "Week 2", title: "Foundation", days: "Days 8-14", items: [
    { lane: "Delivery", tasks: ["Wave 1: Pilot 500 hostnames", "Validate caching + SSL + Ion", "GTM multi-origin config"] },
    { lane: "Security", tasks: ["AAP deployed in Alert mode", "Bot Manager in Monitoring", "API Discovery on checkout"] },
    { lane: "Governance", tasks: ["Daily standup cadence", "Wave 1 success checkpoint", "Hands-on PM training"] },
  ]},
  { week: "Week 3", title: "Scale", days: "Days 15-21", items: [
    { lane: "Delivery", tasks: ["Wave 2-3: 3,000 hostnames", "Image Manager activation", "Phased DNS cutover per wave"] },
    { lane: "Security", tasks: ["AAP: Alert → Deny (tuned)", "Bot Manager enforcement", "API rate limiting active"] },
    { lane: "Governance", tasks: ["Risk review update", "Stakeholder progress report", "Incident playbook walkthrough"] },
  ]},
  { week: "Week 4", title: "Hardening", days: "Days 22-30", items: [
    { lane: "Delivery", tasks: ["Wave 4: Final 1,500 hostnames", "Cache optimization (>85% hit)", "Performance benchmarking"] },
    { lane: "Security", tasks: ["Full security stack tuned", "Pen test validation", "DataStream SIEM integration"] },
    { lane: "Governance", tasks: ["Ops handoff documentation", "L1/L2 runbook delivery", "Lessons learned review"] },
  ]},
];

const laneColors: Record<string, string> = {
  Delivery: "text-primary",
  Security: "text-accent",
  Governance: "text-akamai-green",
};

const RoadmapSlide = () => (
  <SlideLayout id="roadmap" pageNumber={8}>
    <div className="space-y-5">
      <div>
        <p className="text-primary font-semibold tracking-[0.2em] uppercase text-xs mb-2">Section A — Execution Plan</p>
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

      <div className="grid md:grid-cols-4 gap-3">
        {weeks.map(w => (
          <div key={w.week} className="clean-card p-4 space-y-3">
            <div>
              <h3 className="font-display font-bold text-foreground text-base">{w.week}</h3>
              <p className="text-xs text-muted-foreground">{w.days} · {w.title}</p>
            </div>
            {w.items.map(lane => (
              <div key={lane.lane}>
                <p className={`text-xs font-bold ${laneColors[lane.lane]} mb-1`}>{lane.lane}</p>
                <ul className="space-y-0.5">
                  {lane.tasks.map(task => (
                    <li key={task} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                      <CheckCircle2 size={11} className="text-primary/50 mt-0.5 shrink-0" />
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
          <p className="font-semibold text-accent">Addressing "No Testing" Preference</p>
          <p className="text-muted-foreground mt-1">
            Instead of skipping testing entirely, we use <strong className="text-foreground">phased hostname cohorts</strong> — onboarding in controlled waves (500 → 1,500 → 3,000).
            Each wave is validated via mPulse before the next begins. If any wave shows errors or performance degradation,
            the DNS cutover is instantly rolled back to the previous provider.
          </p>
        </div>
      </div>
    </div>
  </SlideLayout>
);

export default RoadmapSlide;
