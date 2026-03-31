import { useState } from "react";
import { Bot, Shield, AlertTriangle, CheckCircle2 } from "lucide-react";

const CredentialStuffingViewer = () => {
  const [activeTab, setActiveTab] = useState<"detection" | "flow" | "results">("detection");

  const detectionSignals = [
    {
      name: "Rapid-Fire Failed Attempts",
      normal: "Human tries wrong password 2-3 times, then gives up",
      botAttack: "Bot tries 50-1000 password combinations per second",
      detect: "If >10 failed attempts in <1 minute: block immediately",
    },
    {
      name: "Request Timing Perfection",
      normal: "Human waits 5-20 seconds between login attempts (reads screen, thinks)",
      botAttack: "Bot waits exactly 2.5 seconds between every attempt (automated timing)",
      detect: "If request timing is too precise and repetitive: likely bot",
    },
    {
      name: "Impossible Geography",
      normal: "User logs in from home (US), works during day, tries again from office (same US timezone)",
      botAttack: "Account accessed from 5 different countries in 2 minutes",
      detect: "If geography jumps > 500 miles in < 2 minutes: flag as suspicious",
    },
    {
      name: "Missing Human Behavior",
      normal: "Real browser has browser headers, cookies, reasonable delays",
      botAttack: "Requests missing common headers, identical User-Agent across 100 IPs",
      detect: "If headers don't match real browser patterns: likely bot",
    },
  ];

  const flowSteps = [
    {
      step: 1,
      title: "Bot Manager Analyzes Request",
      what: "Checks login attempt against all 4 detection signals above",
      result: "Low risk (passes checks) → Allow\nMedium risk (slight anomaly) → Challenge\nHigh risk (multiple signals) → Block",
    },
    {
      step: 2,
      title: "Challenge Phase (if needed)",
      what: "For medium-risk: User sees transparent challenge (proof-of-work). Real user solves in 1-2s. Bot takes 30+ seconds or fails.",
      result: "Passed → Log in\nFailed → Lock account 30 min + Alert user",
    },
    {
      step: 3,
      title: "Account Protection",
      what: "After 5 failed attempts, account auto-locks. User gets email alert.",
      result: "Attacker stops (can't make more attempts)\nLegitimate user can unlock via email link",
    },
    {
      step: 4,
      title: "2FA for Suspicious Activity",
      what: "If location is unusual or device is new: require 2FA (SMS/email code)",
      result: "Legitimate user approves in email\nAttacker blocked (doesn't have 2FA code)",
    },
  ];

  const results = [
    {
      metric: "Stuffing Attack Success Rate",
      before: "10-20% (thousands of accounts compromised)",
      after: "< 0.1% (almost no successful attacks)",
    },
    {
      metric: "Legitimate User Friction",
      before: "N/A",
      after: "Zero (real users pass all checks silently)",
    },
    {
      metric: "Account Lockouts Due to Legitimate Mistakes",
      before: "N/A",
      after: "Low (only after 5+ failed attempts = clear human error)",
    },
    {
      metric: "Time to Block Attack",
      before: "Hours (manual detection)",
      after: "Seconds (automatic Bot Manager detection)",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Tab Switcher */}
      <div className="flex gap-2 border-b flex-wrap">
        <button
          onClick={() => setActiveTab("detection")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "detection"
              ? "border-b-2 border-accent text-accent"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Detection Signals
        </button>
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

      {/* TAB 1: Detection Signals */}
      {activeTab === "detection" && (
        <div className="space-y-3">
          {detectionSignals.map((signal, idx) => (
            <div key={idx} className="bg-muted/40 border border-border/50 rounded p-3 space-y-2">
              <h4 className="font-semibold text-sm text-foreground">{signal.name}</h4>
              
              <div className="grid gap-2">
                <div className="bg-background rounded p-2 border border-akamai-green/30">
                  <p className="text-muted-foreground mb-1 text-sm"><strong>✓ Normal:</strong></p>
                  <p className="text-foreground text-sm">{signal.normal}</p>
                </div>
                
                <div className="bg-background rounded p-2 border border-destructive/30">
                  <p className="text-muted-foreground mb-1 text-sm"><strong>✗ Bot Attack:</strong></p>
                  <p className="text-foreground text-sm">{signal.botAttack}</p>
                </div>

                <div className="bg-accent/10 rounded p-2 border border-accent/30">
                  <p className="text-accent font-semibold text-sm">→ Detection: {signal.detect}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: Flow */}
      {activeTab === "flow" && (
        <div className="space-y-3">
          {flowSteps.map((step) => (
            <div key={step.step} className="flex gap-3">
              {/* Step number */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center shrink-0 font-bold text-xs text-accent">
                  {step.step}
                </div>
                {step.step < flowSteps.length && <div className="w-0.5 h-24 bg-accent/20 my-1" />}
              </div>

              {/* Content */}
              <div className="flex-1 pb-3">
                <h4 className="font-semibold text-sm text-foreground mb-1">{step.title}</h4>
                
                <div className="bg-muted/40 rounded p-2 border border-border/50 mb-2">
                  <p className="text-muted-foreground text-sm mb-1"><strong>What happens:</strong></p>
                  <p className="text-foreground text-sm">{step.what}</p>
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

      {/* TAB 3: Results */}
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
              Summary: Credential Stuffing Blocked at Scale
            </p>
            <p className="text-accent/80 text-sm">
              Bot Manager stops 99% of stuffing attacks before they reach your login servers. Attackers give up because their automation becomes useless.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CredentialStuffingViewer;
