import { useState } from "react";
import { AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";

const BotThreatViewer = () => {
  const [activeTab, setActiveTab] = useState<"threats" | "defense" | "results">("threats");

  const threats = [
    {
      name: "Credential Stuffing",
      pattern: "50-1000 login attempts/second with different passwords",
      detection: "Normal user: 1-2 attempts/min, Bot: 50+ attempts/sec",
      impact: "Account takeover, data breach",
    },
    {
      name: "Inventory Scraping",
      pattern: "Sequential product lookups, perfect timing, same headers across IPs",
      detection: "Same device fingerprint from 50+ different IPs",
      impact: "Competitive intelligence stolen, catalog content theft",
    },
    {
      name: "Carding",
      pattern: "100 different card numbers attempted in 2 minutes",
      detection: "Normal: 1 card/session spaced 5+ min apart. Bot: bulk attempts",
      impact: "Fraudulent chargebacks, payment processor flags",
    },
    {
      name: "Evasion Techniques",
      pattern: "IP rotation, spoofed browsers, abnormal request timing",
      detection: "Device behavior inconsistent across IPs (same fingerprint rotating)",
      impact: "All attacks above bypass detection if not caught early",
    },
  ];

  const defenseSteps = [
    {
      num: 1,
      title: "Behavioral Analysis",
      description: "Bot Manager learns what normal looks like — login patterns, request timing, device consistency",
    },
    {
      num: 2,
      title: "Multi-Signal Detection",
      description: "Compare against baseline: request rate, timing patterns, device fingerprint, IP rotation, header anomalies",
    },
    {
      num: 3,
      title: "Escalating Response",
      description: "Challenge (prove you're human) → Rate-limit (slow suspicious traffic) → Block (stop confirmed attacks)",
    },
    {
      num: 4,
      title: "Zero Friction for Real Users",
      description: "Legitimate behavior passes through instantly. Only automated attack patterns trigger response.",
    },
  ];

  const results = [
    { metric: "Credential Stuffing Success", before: "50-70%", after: "0.1%" },
    { metric: "Scraping Attempts Stopped", before: "0%", after: "99%+" },
    { metric: "Carding Attack Success", before: "5-10%", after: "0.01%" },
    { metric: "False Positives (Real Users Blocked)", before: "0%", after: "<0.1%" },
  ];

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10">
        {(["threats", "defense", "results"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-semibold transition-colors ${
              activeTab === tab
                ? "text-accent border-b-2 border-accent"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "threats" && "4 Bot Threats"}
            {tab === "defense" && "Defense Strategy"}
            {tab === "results" && "Results"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "threats" && (
          <div className="space-y-3">
            {threats.map((threat, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-3 space-y-2">
                <div className="flex items-start gap-2">
                  <AlertCircle size={16} className="text-accent mt-0.5 shrink-0" />
                  <h4 className="font-bold text-sm text-foreground">{threat.name}</h4>
                </div>
                <div className="grid md:grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Attack Pattern</p>
                    <p className="text-foreground/80">{threat.pattern}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Detection Signal</p>
                    <p className="text-foreground/80">{threat.detection}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Business Impact</p>
                    <p className="text-accent/80 font-semibold">{threat.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "defense" && (
          <div className="space-y-3">
            {defenseSteps.map((step) => (
              <div key={step.num} className="bg-white/5 border border-white/10 rounded-lg p-3 flex gap-3">
                <div className="bg-accent text-accent-foreground w-7 h-7 rounded-md flex items-center justify-center font-bold text-sm shrink-0">
                  {step.num}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-foreground">{step.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "results" && (
          <div className="space-y-2">
            {results.map((r, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-center justify-between">
                <span className="font-semibold text-sm text-foreground">{r.metric}</span>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Before</p>
                    <p className="text-sm font-bold text-red-400">{r.before}</p>
                  </div>
                  <TrendingUp size={16} className="text-accent" />
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">After</p>
                    <p className="text-sm font-bold text-green-400">{r.after}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 mt-3 flex items-start gap-2">
              <CheckCircle2 size={16} className="text-accent mt-0.5 shrink-0" />
              <p className="text-sm text-foreground/80">
                <strong>Best Practice:</strong> Start Bot Manager in monitoring mode (1-2 days) to establish baseline behavior before switching to blocking mode. This prevents false positives on legitimate users.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BotThreatViewer;
