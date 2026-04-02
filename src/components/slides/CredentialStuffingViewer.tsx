import { useState } from "react";
import { Bot, Shield, AlertTriangle, CheckCircle2 } from "lucide-react";

const CredentialStuffingViewer = () => {
  const [activeTab, setActiveTab] = useState<"flow" | "results">("flow");

  const detectionSignals = [
    "Rapid-fire attempts (50-1000 passwords/sec vs human 2-3 tries)",
    "Perfect timing (bot waits exactly 2.5s every time vs human 5-20s randomness)",
    "Geographic impossibility (5 countries in 2 minutes vs realistic travel)",
    "Missing browser markers (mismatched headers, identical User-Agent across 100 IPs)",
  ];

  const flowSteps = [
    {
      step: 1,
      title: "Bot Manager Analyzes Login Request",
      what: "Checks against 4 core bot detection signals:",
      signals: detectionSignals,
      result: "Computes risk score based on signal matches",
    },
    {
      step: 2,
      title: "Edge Enforcement Decision",
      what: "Based on risk score, Bot Manager decides:",
      result: "Low risk → Allow request to origin\nMedium risk → Challenge at edge (CAPTCHA/proof-of-work)\nHigh risk → Block request entirely",
    },
  ];

  const results = [
    {
      metric: "Stuffing Attack Block Rate",
      before: "0% (all requests reach origin)",
      after: ">99% (blocked/challenged at edge)",
    },
    {
      metric: "Attack Detection Latency",
      before: "Minutes to hours (manual review)",
      after: "Milliseconds (automatic at edge)",
    },
    {
      metric: "Real User Experience",
      before: "N/A",
      after: "Zero friction (legitimate users pass silently or solve CAPTCHA once)",
    },
    {
      metric: "Origin Server Load from Attacks",
      before: "50K+ failed login attempts/min",
      after: "Near zero (attacks blocked before reaching origin)",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Tab Switcher */}
      <div className="flex gap-2 border-b flex-wrap">
        <button
          onClick={() => setActiveTab("flow")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "flow"
              ? "border-b-2 border-accent text-accent"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          How It Works
        </button>
        <button
          onClick={() => setActiveTab("results")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "results"
              ? "border-b-2 border-accent text-accent"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Results
        </button>
      </div>

      {/* TAB 1: How It Works */}
      {activeTab === "flow" && (
        <div className="space-y-3">
          {flowSteps.map((step) => (
            <div key={step.step} className="flex gap-3">
              {/* Step number */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center shrink-0 font-bold text-xs text-accent">
                  {step.step}
                </div>
                {step.step < flowSteps.length && <div className="w-0.5 h-auto bg-accent/20 my-1" style={{minHeight: step.step === 1 ? "180px" : "0px"}} />}
              </div>

              {/* Content */}
              <div className="flex-1 pb-3">
                <h4 className="font-semibold text-sm text-foreground mb-1">{step.title}</h4>
                
                <div className="bg-muted/40 rounded p-2 border border-border/50 mb-2">
                  <p className="text-muted-foreground text-sm mb-1"><strong>What happens:</strong></p>
                  <p className="text-foreground text-sm">{step.what}</p>

                  {/* Render signals if this is step 1 */}
                  {step.signals && (
                    <ul className="mt-2 space-y-1 ml-2">
                      {step.signals.map((signal, idx) => (
                        <li key={idx} className="text-foreground text-sm">
                          <span className="text-accent">•</span> {signal}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="bg-background rounded p-2 border border-border/50">
                  <p className="text-muted-foreground text-sm mb-1"><strong>Result:</strong></p>
                  <p className="text-foreground text-sm whitespace-pre-line">{step.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: Results */}
      {activeTab === "results" && (
        <div className="space-y-3">
          {results.map((result, idx) => (
            <div key={idx} className="grid grid-cols-3 gap-2 bg-muted/40 border border-border/50 rounded p-3">
              <div>
                <p className="text-muted-foreground font-semibold mb-1 text-sm">{result.metric}</p>
              </div>
              <div className="border-l border-border/50 pl-2">
                <p className="text-muted-foreground text-xs mb-1">Before</p>
                <p className="text-destructive font-semibold text-sm">{result.before}</p>
              </div>
              <div className="border-l border-border/50 pl-2">
                <p className="text-muted-foreground text-xs mb-1">After</p>
                <p className="text-akamai-green font-semibold text-sm">{result.after}</p>
              </div>
            </div>
          ))}

          <div className="bg-accent/10 border border-accent/30 rounded p-3 space-y-2">
            <p className="font-semibold text-accent flex items-center gap-2 text-sm">
              <CheckCircle2 size={14} />
              How Bot Manager Stops Credential Stuffing
            </p>
            <p className="text-accent/80 text-sm">
              Bot Manager detects attack patterns at the edge and blocks/challenges 99%+ of stuffing attempts before they reach origin servers. Attackers can't succeed because their automated patterns are instantly recognizable—human-like access gets through silently.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CredentialStuffingViewer;
