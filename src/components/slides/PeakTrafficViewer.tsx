import { AlertTriangle, TrendingUp, Clock, Users, CheckCircle2, BarChart3, Zap } from "lucide-react";

const PeakTrafficViewer = () => {
  const phases = [
    {
      number: 1,
      title: "Normal Traffic",
      description: "Regular site load, cached content serving from edge",
      detail: "Origin handling 100 req/sec, cache hit ratio >70%, LCP <200ms",
      icon: <BarChart3 size={20} className="text-primary" />,
      highlight: "Status: Nominal",
    },
    {
      number: 2,
      title: "Traffic Surge Detection",
      description: "Akamai monitors origin health every 60s — detects latency spike or origin saturation",
      detail: "Origin latency jumps from 50ms → 300ms, or request queue growing. EdgeWorkers detects via SureRoute health checks.",
      icon: <TrendingUp size={20} className="text-accent" />,
      highlight: "Action: Enter queue mode",
    },
    {
      number: 3,
      title: "Activate Waiting Room (Edge)",
      description: "EdgeWorkers intercepts incoming traffic, routes users to personalized queue page",
      detail: "No requests reach origin. Users see: 'You're in line. Estimated wait: 5 min. Current traffic: 500 users ahead.'",
      icon: <Users size={20} className="text-akamai-electric" />,
      highlight: "Position: Edge (no origin load)",
    },
    {
      number: 4,
      title: "Gradual Release (Rate Limiting)",
      description: "EdgeWorkers releases users from queue to origin in controlled waves",
      detail: "Release rate: 50 req/sec (tuned to origin capacity). Users released FIFO. New arrivals continue queuing at edge.",
      icon: <Clock size={20} className="text-akamai-violet" />,
      highlight: "Rate: 50 req/sec",
    },
    {
      number: 5,
      title: "Origin Recovers",
      description: "Origin latency returns to baseline (<100ms), queue shrinks",
      detail: "SureRoute confirms health. EdgeWorkers gradually increases release rate (50 → 100 → 150 req/sec). No 503 errors.",
      icon: <Zap size={20} className="text-akamai-green" />,
      highlight: "Recovery: Automatic escalation",
    },
    {
      number: 6,
      title: "Queue Depleted, Normal Mode",
      description: "All users released, waiting room disabled. Traffic returns to normal flow.",
      detail: "Remaining users (new sessions) served directly. Queue page removed from experience. Origin back to <50ms latency.",
      icon: <CheckCircle2 size={20} className="text-akamai-green" />,
      highlight: "Status: Normal",
    },
  ];

  const benefits = [
    "Zero origin errors (503/502) during spike",
    "Users stay engaged (branded queue pages vs error)",
    "Instant auto-scaling (no ops intervention needed)",
    "Per-queue metrics (wait time, cohort conversion)",
  ];

  const configPoints = [
    {
      label: "Queue threshold",
      value: "300ms origin latency OR 50+ requests pending",
      detail: "Configure per domain based on baseline health",
    },
    {
      label: "Release rate",
      value: "50 req/sec (tuned to origin)",
      detail: "Adjust based on origin CPU capacity",
    },
    {
      label: "Queue page branding",
      value: "Custom HTML/CSS per tenant",
      detail: "Display countdown, current position, regional info",
    },
    {
      label: "Fallback origin",
      value: "GTM routes to secondary if primary overloaded",
      detail: "Waiting room + failover = double protection",
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
              {idx < phases.length - 1 && <div className="w-0.5 h-12 bg-primary/20 my-1" />}
            </div>

            {/* Phase content */}
            <div className="flex-1 pt-1 pb-3">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="font-semibold text-sm text-foreground">{phase.title}</h4>
                <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-0.5 rounded whitespace-nowrap">
                  Step {phase.number}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{phase.description}</p>
              <div className="bg-muted/40 rounded p-2 text-sm text-foreground border border-border/50 mb-2">
                {phase.detail}
              </div>
              <div className="text-xs font-semibold text-accent">{phase.highlight}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Key Benefits */}
      <div className="space-y-2 pt-3 border-t">
        <p className="text-xs font-semibold text-foreground">Key Benefits</p>
        <div className="grid grid-cols-1 gap-2 text-xs text-muted-foreground">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="bg-muted/30 rounded p-2 flex items-start gap-2">
              <CheckCircle2 size={14} className="text-akamai-green shrink-0 mt-0.5" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Configuration Details */}
      <div className="bg-accent/10 border border-accent/30 rounded p-3 text-sm space-y-3">
        <p className="font-semibold text-accent">Waiting Room Configuration</p>
        <div className="space-y-2">
          {configPoints.map((point, idx) => (
            <div key={idx} className="bg-background rounded p-2 border border-border/50">
              <p className="font-semibold text-foreground mb-1">{point.label}</p>
              <p className="text-muted-foreground mb-1">{point.value}</p>
              <p className="text-muted-foreground text-[11px] italic">{point.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Critical Notes */}
      <div className="bg-destructive/10 border border-destructive/30 rounded p-3 text-xs space-y-2">
        <p className="font-semibold text-destructive flex items-center gap-2">
          <AlertTriangle size={14} />
          Critical Implementation Notes
        </p>
        <ul className="space-y-1 text-destructive/80">
          <li>• <strong>Threshold tuning:</strong> Too aggressive = false positives (users queued unnecessarily). Too loose = late activation.</li>
          <li>• <strong>Origin capacity baseline:</strong> Must be measured during peak traffic to set accurate release rate.</li>
              <li>• <strong>Queue page latency:</strong> Must load &lt;100ms at edge (no origin calls). Use static HTML + personalization tokens.</li>
          <li>• <strong>Release rate escalation:</strong> Increment slowly (50 → 75 → 100 req/sec) to avoid re-spike.</li>
        </ul>
      </div>
    </div>
  );
};

export default PeakTrafficViewer;
