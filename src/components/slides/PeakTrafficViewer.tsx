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
      title: "500 Error Detection",
      description: "Monitor detects origin 500 errors exceeding threshold → Triggers GitHub Action → Updates EdgeKV flag",
      detail: "When 5xx errors spike above 5% of traffic, Monitor calls GitHub Action. Action sets waiting_room_enabled = true in EdgeKV (~1 second).",
      icon: <TrendingUp size={20} className="text-accent" />,
      highlight: "Detection: ~1-2 seconds",
    },
    {
      number: 3,
      title: "Activate Waiting Room (Edge)",
      description: "EdgeWorker reads waiting_room_enabled flag from EdgeKV on each request → Routes to queue if true",
      detail: "Next request after flag update: EdgeWorker checks KV, finds waiting_room_enabled = true. User redirected to branded queue page. No request reaches origin.",
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
      description: "Monitor detects 5xx error rate returning to normal → GitHub Action resets EdgeKV flag",
      detail: "When 5xx errors drop below 2% of traffic for 2+ minutes, Monitor triggers GitHub Action. Action sets waiting_room_enabled = false. Queue drains naturally.",
      icon: <Zap size={20} className="text-akamai-green" />,
      highlight: "Recovery: ~2-3 minutes",
    },
    {
      number: 6,
      title: "Queue Disabled, Normal Mode Restored",
      description: "EdgeWorker reads waiting_room_enabled = false → Routes all traffic directly to origin",
      detail: "New requests: EdgeWorker checks KV, finds flag = false. Request forwarded to origin normally. Users arriving after recovery skip queue entirely.",
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
      label: "Activation threshold",
      value: "5% of traffic returns 5xx errors",
      detail: "Monitor triggers GitHub Action → EdgeKV updated (~1-2 sec)",
    },
    {
      label: "Recovery threshold",
      value: "<2% 5xx error rate for 2+ minutes",
      detail: "Monitor clears flag → EdgeWorker routes normally again",
    },
    {
      label: "Queue page experience",
      value: "Branded HTML + real-time position estimate",
      detail: "Static HTML delivered from edge (<100ms). Personalization tokens per user session.",
    },
    {
      label: "Release mechanism",
      value: "FIFO queue with per-request token validation",
      detail: "Queue token issued when released. EdgeWorker validates on next request.",
    },
  ];

  const sequenceSteps = [
    {
      phase: "Normal State (waiting_room_enabled = false)",
      steps: [
        "User sends request → Akamai Property",
        "Property invokes EdgeWorker via rule",
        "EdgeWorker reads EdgeKV: 'waiting_room_enabled'",
        "KV returns: false",
        "EdgeWorker allows request → Origin",
        "Origin responds normally → User",
      ],
    },
    {
      phase: "Error Detection & Activation (~1-2 seconds)",
      steps: [
        "Origin returns 5xx errors (5%+ of traffic)",
        "Monitor detects threshold exceeded",
        "Monitor → GitHub Action (webhook)",
        "GitHub Action updates EdgeKV",
        "KV now: waiting_room_enabled = true",
      ],
    },
    {
      phase: "Queue Mode Active (next request onwards)",
      steps: [
        "User sends request → Akamai Property",
        "Property invokes EdgeWorker via rule",
        "EdgeWorker reads EdgeKV: 'waiting_room_enabled'",
        "KV returns: true",
        "EdgeWorker → Redirect/Serve queue page at edge",
        "No request reaches origin. User sees waiting room UI.",
      ],
    },
    {
      phase: "Recovery Detection (~2-3 minutes)",
      steps: [
        "Origin 5xx errors drop below 2% for 2+ minutes",
        "Monitor detects recovery",
        "Monitor → GitHub Action (webhook)",
        "GitHub Action updates EdgeKV",
        "KV now: waiting_room_enabled = false",
      ],
    },
    {
      phase: "Normal Mode Restored",
      steps: [
        "User sends request → Akamai Property",
        "Property invokes EdgeWorker via rule",
        "EdgeWorker reads EdgeKV: 'waiting_room_enabled'",
        "KV returns: false",
        "EdgeWorker allows request → Origin",
        "Origin responds normally. Queue page gone. Normal flow restored.",
      ],
    },
  ];

  return (
    <div className="space-y-4">
      {/* Integrated Timeline + Sequence Flow */}
      <div className="space-y-3">
        {phases.map((phase, idx) => {
          // Find corresponding sequence block for this phase
          const sequenceBlock = sequenceSteps[idx];
          
          return (
            <div key={phase.number} className="flex gap-4">
              {/* Timeline connector */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center shrink-0">
                  {phase.icon}
                </div>
                {idx < phases.length - 1 && <div className="w-0.5 h-12 bg-primary/20 my-1" />}
              </div>

              {/* Combined phase + sequence */}
              <div className="flex-1 space-y-2">
                {/* Phase header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">{phase.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{phase.description}</p>
                  </div>
                  <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-0.5 rounded whitespace-nowrap">Step {phase.number}</span>
                </div>

                {/* Phase detail */}
                <div className="bg-muted/40 rounded p-2 text-xs text-foreground border border-border/50">
                  {phase.detail}
                </div>

                {/* Sequence steps for this phase */}
                {sequenceBlock && (
                  <div className="bg-primary/5 border border-primary/20 rounded p-2 space-y-1">
                    <p className="text-xs font-semibold text-primary">{sequenceBlock.phase}</p>
                    <div className="space-y-0.5">
                      {sequenceBlock.steps.map((step, stepIdx) => (
                        <div key={stepIdx} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <span className="font-mono text-primary/70 shrink-0 w-4">{stepIdx + 1}.</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Phase highlight */}
                <div className="text-xs font-semibold text-accent">{phase.highlight}</div>
              </div>
            </div>
          );
        })}
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
