import { useState } from "react";
import { Shield, AlertTriangle, CheckCircle2 } from "lucide-react";

const BotEvasionViewer = () => {
  const [activeTab, setActiveTab] = useState<"baseline" | "fingerprinting" | "escalation">("baseline");

  const behavioralBaselines = [
    {
      signal: "Browser Identity",
      normal: "Real Chrome browser on Windows: specific chain of technical markers (ciphers, protocols, extensions)",
      attack: "Bot spoofs Chrome User-Agent but uses Firefox's underlying protocol markers = exposed",
      detection: "Each browser has a real 'fingerprint' underneath. Spoofing the label doesn't change the fingerprint.",
    },
    {
      signal: "Timing Between Requests",
      normal: "Real user: 500ms to 5 seconds between clicks (reads, thinks, decides)",
      attack: "Bot: exactly 1.2 seconds between every request, ±5ms variance (too perfect)",
      detection: "Machine-like precision timing = bot, even with IP rotation",
    },
    {
      signal: "Missing Browser Patterns",
      normal: "Real browser: sends CSS requests, image requests, JavaScript execution patterns",
      attack: "API-style bot: skips directly to data API, no CSS/image requests",
      detection: "Request pattern doesn't match how browsers behave = bot",
    },
    {
      signal: "Behavioral Consistency Across IPs",
      normal: "Real user: same device, maybe 2-3 IPs (home, office, mobile)",
      attack: "Bot network: same behavior signature seen from 50 different IPs in 1 hour",
      detection: "Same device fingerprint across many IPs = confirmed scraper network",
    },
  ];

  const multiSignalApproach = [
    {
      technique: "Request Fingerprint",
      what: "Capture: browser identity (protocol markers), timing patterns, header order, request sequence",
      spoofing: "Bot can spoof User-Agent string, but can't easily spoof all 4 together",
      effort: "1-2 weeks + specialized knowledge",
    },
    {
      technique: "Device Consistency",
      what: "Store request fingerprint, track it across different IPs over time",
      spoofing: "Bot must create completely new fingerprint (new hardware/device)",
      effort: "2-4 weeks + new credentials/accounts",
    },
    {
      technique: "EdgeWorkers Custom Rules",
      what: "Custom validation logic: check for required headers, validate request signatures, verify expected parameters",
      spoofing: "Bot must know your custom logic (requires reverse-engineering)",
      effort: "3-6 weeks + API analysis",
    },
    {
      technique: "Rate Limiting by Fingerprint",
      what: "Limit suspicious fingerprints to 5 requests/min vs legitimate 1000+",
      spoofing: "Even if bypassed, attack becomes 200x slower with multiple fingerprints",
      effort: "Uneconomical (costs exceed rewards)",
    },
  ];

  const escalationModel = [
    {
      level: "Level 1 - Suspicious Request",
      trigger: "Single behavioral anomaly detected (user-agent mismatch, timing off, missing headers)",
      response: "Allow request but tag it. Watch for pattern.",
      result: "Real users: single oddity is normal. Bots: accumulate patterns.",
    },
    {
      level: "Level 2 - Confirmed Bot Pattern",
      trigger: "Multiple signals match (timing + missing headers + wrong device fingerprint)",
      response: "Require proof-of-work challenge (compute hash). Bots slow down to 1 req/sec.",
      result: "Real users solve in 100ms. Bots struggle.",
    },
    {
      level: "Level 3 - Network Attack",
      trigger: "Same device fingerprint seen from 10+ IPs in 1 hour",
      response: "Fingerprint auto-blacklisted for 24 hours. All traffic from fingerprint blocked.",
      result: "Entire bot network disabled. Attacker must restart with new hardware.",
    },
    {
      level: "Level 4 - Persistent Attacker",
      trigger: "Same attacking fingerprint returns after 24h blacklist expires",
      response: "Permanent blacklist + IP block for 30 days + account termination",
      result: "Attacker investment wasted. ROI becomes negative.",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Tab Switcher */}
      <div className="flex gap-2 border-b flex-wrap">
        <button
          onClick={() => setActiveTab("baseline")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "baseline"
              ? "border-b-2 border-akamai-green text-akamai-green"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Behavioral Signals
        </button>
        <button
          onClick={() => setActiveTab("fingerprinting")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "fingerprinting"
              ? "border-b-2 border-akamai-green text-akamai-green"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Multi-Signal Defense
        </button>
        <button
          onClick={() => setActiveTab("escalation")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "escalation"
              ? "border-b-2 border-akamai-green text-akamai-green"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Escalation Levels
        </button>
      </div>

      {/* TAB 1: Behavioral Signals */}
      {activeTab === "baseline" && (
        <div className="space-y-3">
          {behavioralBaselines.map((baseline, idx) => (
            <div key={idx} className="bg-muted/40 border border-border/50 rounded p-3 text-xs space-y-2">
              <h4 className="font-semibold text-foreground">{baseline.signal}</h4>

              <div className="grid gap-2">
                <div className="bg-background rounded p-2 border border-akamai-green/30">
                  <p className="text-muted-foreground mb-1"><strong>✓ Normal:</strong></p>
                  <p className="text-foreground text-[11px]">{baseline.normal}</p>
                </div>

                <div className="bg-background rounded p-2 border border-destructive/30">
                  <p className="text-muted-foreground mb-1"><strong>✗ Bot Tries to Spoof:</strong></p>
                  <p className="text-foreground text-[11px]">{baseline.attack}</p>
                </div>

                <div className="bg-accent/10 rounded p-2 border border-accent/30">
                  <p className="text-accent font-semibold text-[11px]">✓ Detection: {baseline.detection}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-destructive/10 border border-destructive/30 rounded p-3 text-xs space-y-2">
            <p className="font-semibold text-destructive">Why IP Rotation Alone Doesn't Work</p>
            <p className="text-destructive/80">
              Rotating IPs is like wearing different masks. But the fingerprints underneath (browser identity, timing, patterns) stay the same. We look beneath the mask.
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: Multi-Signal Defense */}
      {activeTab === "fingerprinting" && (
        <div className="space-y-3">
          {multiSignalApproach.map((approach, idx) => (
            <div key={idx} className="bg-muted/40 border border-border/50 rounded p-3 text-xs space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-semibold text-foreground">{approach.technique}</h4>
                <span className="text-xs px-2 py-0.5 rounded bg-accent/20 text-accent font-bold">Signal {idx + 1}</span>
              </div>

              <div className="bg-background rounded p-2 border border-border/50 mb-2">
                <p className="text-muted-foreground mb-1"><strong>What we monitor:</strong></p>
                <p className="text-foreground text-[11px]">{approach.what}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-muted-foreground mb-1"><strong>Bot can spoof?</strong></p>
                  <p className="text-foreground font-semibold text-[11px]">{approach.spoofing}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1"><strong>Time needed:</strong></p>
                  <p className="text-foreground font-semibold text-[11px]">{approach.effort}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-akamai-green/10 border border-akamai-green/30 rounded p-3 text-xs space-y-2">
            <p className="font-semibold text-akamai-green">Combined Defense Strategy</p>
            <p className="text-akamai-green/80">
              Single signal spoofable in hours. Four signals together? Requires 4-6 weeks + complete attack rebuild. After 3 attempts, bot network goes to blacklist. Attack ROI becomes impossible.
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: Escalation */}
      {activeTab === "escalation" && (
        <div className="space-y-3">
          {escalationModel.map((model, idx) => (
            <div key={idx} className="flex gap-3">
              {/* Step number */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-akamai-green/10 border-2 border-akamai-green flex items-center justify-center shrink-0 font-bold text-xs text-akamai-green">
                  {idx + 1}
                </div>
                {idx < escalationModel.length - 1 && <div className="w-0.5 h-20 bg-akamai-green/20 my-1" />}
              </div>

              {/* Content */}
              <div className="flex-1 pb-3">
                <h4 className="font-semibold text-foreground text-sm mb-2">{model.level}</h4>

                <div className="space-y-2 text-xs">
                  <div className="bg-muted/40 rounded p-2 border border-border/50">
                    <p className="text-muted-foreground mb-1"><strong>Trigger:</strong></p>
                    <p className="text-foreground">{model.trigger}</p>
                  </div>

                  <div className="bg-background rounded p-2 border border-border/50">
                    <p className="text-muted-foreground mb-1"><strong>Response:</strong></p>
                    <p className="text-foreground">{model.response}</p>
                  </div>

                  <div className="bg-akamai-green/10 rounded p-2 border border-akamai-green/30">
                    <p className="text-akamai-green font-semibold text-[11px]">Result: {model.result}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-akamai-green/10 border border-akamai-green/30 rounded p-3 text-xs space-y-2">
            <p className="font-semibold text-akamai-green flex items-center gap-2">
              <CheckCircle2 size={14} />
              Bot Evasion Prevention Summary
            </p>
            <ul className="space-y-1 text-akamai-green/80">
              <li>• Legitimate users: Transparent (all signals match), zero friction</li>
              <li>• Smart bots: Detected immediately despite IP rotation</li>
              <li>• Persistent attackers: Blacklisted after 3 failed attempts</li>
              <li>• Success rate: Drops from 50% to less than 1% (not worth the effort)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default BotEvasionViewer;
