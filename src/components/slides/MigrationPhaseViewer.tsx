import { Server, Cloud, BarChart3, Zap, CheckCircle2, GitBranch } from "lucide-react";

const MigrationPhaseViewer = () => {
  const phases = [
    {
      number: 1,
      title: "On-board UI & Microservices to Akamai",
      description: "Route both legacy UIs and legacy microservices through EdgeWorkers as central control plane",
      routing: "All Traffic → EdgeWorkers",
      icon: <Zap size={20} className="text-blue-500" />,
    },
    {
      number: 2,
      title: "Route Legacy UIs",
      description: "Existing UIs continue serving from on-prem monolith, calling legacy monolith APIs",
      routing: "Legacy UIs → GTM → On-Prem Monolith (UI + APIs)",
      icon: <Server size={20} className="text-orange-500" />,
    },
    {
      number: 3,
      title: "Route New UIs + New Microservices",
      description: "New containerized UIs route to AWS, calling new microservices also in AWS",
      routing: "New UIs → AWS | New APIs → AWS Microservices",
      icon: <Cloud size={20} className="text-purple-500" />,
    },
    {
      number: 4,
      title: "Canary: Mixed UI + API Versions",
      description: "Start with 95% legacy (UI + calls to legacy APIs), 5% new UIs calling new APIs. Test both layers together",
      routing: "95% Legacy UI→Legacy API | 5% New UI→New API",
      icon: <GitBranch size={20} className="text-indigo-500" />,
    },
    {
      number: 5,
      title: "Gradual Migration (UI & Services)",
      description: "Progressively increase: 5% → 25% → 50% → 100%. Both UI and microservice calls migrate in tandem via feature flags",
      routing: "Feature Flags Control Both UI Routing & Service Calls",
      icon: <CheckCircle2 size={20} className="text-green-500" />,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Vertical Timeline */}
      <div className="space-y-3">
        {phases.map((phase, idx) => (
          <div key={phase.number} className="flex gap-4">
            {/* Timeline connector */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center shrink-0">
                {phase.icon}
              </div>
              {idx < phases.length - 1 && (
                <div className="w-0.5 h-12 bg-primary/20 my-1" />
              )}
            </div>

            {/* Phase content */}
            <div className="flex-1 pt-1 pb-3">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="font-semibold text-sm text-foreground">{phase.title}</h4>
                <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-0.5 rounded whitespace-nowrap">Phase {phase.number}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{phase.description}</p>
              <div className="bg-muted/40 rounded p-2 text-xs font-mono text-foreground border border-border/50">
                {phase.routing}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Key takeaways */}
      <div className="space-y-2 pt-3 border-t">
        <p className="text-xs font-semibold text-foreground">Key Benefits</p>
        <ul className="space-y-1 text-xs text-muted-foreground">
          <li>✓ <strong>Dual migration in parallel:</strong> UIs and microservices migrate together</li>
          <li>✓ <strong>EdgeWorkers controls both layers:</strong> Routing decisions for UI servers and API calls</li>
          <li>✓ <strong>Feature flags orchestrate:</strong> No infrastructure changes, toggle tenant versions</li>
          <li>✓ <strong>Instant rollback:</strong> Send both UI and API calls back to legacy if issues emerge</li>
          <li>✓ <strong>Zero downtime:</strong> All versions coexist seamlessly during migration</li>
        </ul>
      </div>

      {/* Optional API transformation note */}
      <div className="bg-accent/5 border border-accent/20 rounded p-3 text-xs">
        <p className="font-semibold text-accent mb-1">Optional: API Contract Translation</p>
        <p className="text-muted-foreground">EdgeWorkers can translate UI requests between legacy and new microservice API contracts (adds 2-4 weeks). Alternatively: update UI code to call new microservice endpoints directly (faster migration).</p>
      </div>
    </div>
  );
};

export default MigrationPhaseViewer;
