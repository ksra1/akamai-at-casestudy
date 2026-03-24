import SlideLayout from "./SlideLayout";
import { CheckCircle2, AlertCircle } from "lucide-react";

const weeks = [
  {
    week: "Week 1",
    title: "Discovery",
    vibe: "Measure twice",
    days: "Days 1-7",
    color: "border-t-primary",
    items: [
      { lane: "Delivery", tasks: ["Audit hostname inventory", "Build golden templates", "Establish mPulse baseline"] },
      { lane: "Security", tasks: ["Security posture assessment", "Identify WAF rule gaps", "Enable Site Shield"] },
      { lane: "Governance", tasks: ["RACI setup", "Akamai 101 for new teams", "Risk register created"] },
    ],
  },
  {
    week: "Week 2",
    title: "Foundation",
    vibe: "Prove it works",
    days: "Days 8-14",
    color: "border-t-akamai-green",
    items: [
      { lane: "Delivery", tasks: ["Wave 1: Pilot 500 hostnames", "Validate caching + SSL + Ion", "GTM multi-origin config"] },
      { lane: "Security", tasks: ["AAP deployed in Alert mode", "Bot Manager monitoring", "API Discovery on checkout"] },
      { lane: "Governance", tasks: ["Daily standup cadence", "Wave 1 success checkpoint", "Hands-on PM training"] },
    ],
  },
  {
    week: "Week 3",
    title: "Scale",
    vibe: "Open the floodgates",
    days: "Days 15-21",
    color: "border-t-accent",
    items: [
      { lane: "Delivery", tasks: ["Waves 2-3: 3,000 hostnames", "Image Manager activation", "Phased DNS cutover per wave"] },
      { lane: "Security", tasks: ["AAP: Alert → Deny (tuned)", "Bot Manager enforcement", "API rate limiting active"] },
      { lane: "Governance", tasks: ["Risk review update", "Stakeholder progress report", "Incident playbook walkthrough"] },
    ],
  },
  {
    week: "Week 4",
    title: "Hardening",
    vibe: "Button it up",
    days: "Days 22-30",
    color: "border-t-akamai-lavender",
    items: [
      { lane: "Delivery", tasks: ["Wave 4: Final 1,500 hostnames", "Cache optimization (>85% hit)", "Performance benchmarking"] },
      { lane: "Security", tasks: ["Full security stack tuned", "Pen test validation", "DataStream → SIEM integration"] },
      { lane: "Governance", tasks: ["Ops handoff documentation", "L1/L2 runbook delivery", "Lessons learned review"] },
    ],
  },
];

const laneColors: Record<string, string> = {
  Delivery: "text-primary",
  Security: "text-accent",
  Governance: "text-akamai-green",
};

const RoadmapSlide = () => (
  <SlideLayout id="roadmap" pageNumber={8}>
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-primary font-semibold tracking-widest uppercase text-sm">Section A — The Execution Plan</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">30 Days. 4 Weeks. No Surprises.</h2>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6">
        {Object.entries(laneColors).map(([lane, cls]) => (
          <span key={lane} className={`${cls} text-xs font-bold flex items-center gap-1.5`}>
            <div className={`w-2.5 h-2.5 rounded-full ${cls.replace('text-', 'bg-')}`} />
            {lane}
          </span>
        ))}
      </div>

      {/* Timeline */}
      <div className="grid md:grid-cols-4 gap-4">
        {weeks.map(w => (
          <div key={w.week} className={`border-t-4 ${w.color} bg-card rounded-xl p-5 shadow-sm space-y-4`}>
            <div>
              <h3 className="font-display font-bold text-secondary text-lg">{w.week}</h3>
              <p className="text-xs text-muted-foreground">{w.days} · {w.title}</p>
              <p className="text-[10px] text-primary italic mt-0.5">"{w.vibe}"</p>
            </div>

            {w.items.map(lane => (
              <div key={lane.lane}>
                <p className={`text-xs font-bold ${laneColors[lane.lane]} mb-1.5`}>{lane.lane}</p>
                <ul className="space-y-1">
                  {lane.tasks.map(task => (
                    <li key={task} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                      <CheckCircle2 size={11} className="text-primary mt-0.5 shrink-0" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* No Testing callout */}
      <div className="flex items-start gap-3 bg-accent/8 border border-accent/20 rounded-xl p-4 max-w-3xl mx-auto">
        <AlertCircle size={20} className="text-accent shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-semibold text-accent">"But we don't test" — here's how we handle that</p>
          <p className="text-muted-foreground mt-1">
            We onboard in <strong>controlled waves</strong> — 500, then 1,500, then 3,000. Each wave is validated by mPulse 
            before the next begins. If anything looks off, the DNS cutover reverts instantly to the previous provider. 
            You get speed without gambling on stability.
          </p>
        </div>
      </div>
    </div>
  </SlideLayout>
);

export default RoadmapSlide;
