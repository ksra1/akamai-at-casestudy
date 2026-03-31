import { useState } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

const CardingViewer = () => {
  const [activeTab, setActiveTab] = useState<"detection" | "flow" | "results">("detection");

  const detectionPatterns = [
    {
      signal: "Rapid Card Attempts",
      normal: "Real customer: 1 card payment per session, spaced 5+ minutes apart",
      attack: "Carding bot: 100 different card numbers being tested in 2 minutes",
      detect: "If >5 card attempts per session OR >10 failed transactions per hour: block",
    },
    {
      signal: "Same CVV Across Different Cards",
      normal: "Real customer: Card and CVV match (legitimate payment method)",
      attack: "Bot testing: Same CVV value with 50 different card numbers (stolen data harvesting)",
      detect: "Flag account immediately if CVV pattern detected",
    },
    {
      signal: "Geographic Jumps",
      normal: "Real customer: Consistent location (home, office, known travel)",
      attack: "Bot: Checkout from 5 countries in 10 minutes (using VPN/proxy per test)",
      detect: "Multiple transactions from impossible-to-reach locations = carding",
    },
    {
      signal: "Failed Card Recoveries",
      normal: "Real customer: 1-2 failed attempts, then stops OR contacts support",
      attack: "Bot: Automatically tries next card without hesitation",
      detect: "If failed transaction immediately followed by new card attempt: bot",
    },
  ];

  const protectionFlow = [
    {
      step: 1,
      phase: "Request Analysis",
      what: "Customer clicks 'Pay with Card' button",
      checks: "AAP analyzes: Is this user's normal checkout pattern? Are they in their usual location?",
      result: "Low risk → proceed\nMedium risk → require verification\nHigh risk → block",
    },
    {
      step: 2,
      phase: "Baseline Comparison",
      what: "AAP compares this transaction against normal behavior",
      checks: "Normal: 1 card per transaction, 5 min apart. This transaction: 4 cards in 3 minutes = anomaly",
      result: "Flagged as potential carding attack",
    },
    {
      step: 3,
      phase: "Challenge or Block",
      what: "If flagged: require extra authentication",
      checks: "Option A: Require CVC re-entry\nOption B: SMS verification code\nOption C: Block entirely",
      result: "Legitimate customer verifies in 30 sec. Bot has no way to verify.",
    },
    {
      step: 4,
      phase: "Decline & Notify",
      what: "Card is declined at transaction time (before payment processor charge)",
      checks: "Customer receives notification, account is flagged for review",
      result: "No fraudulent charge reaches payment processor. Chargeback avoided.",
    },
  ];

  const results = [
    {
      metric: "Carding Success Rate",
      before: "5-10% of bot card tests succeed (thousands of dollars per attack)",
      after: "0.01% (attacks become economically worthless)",
    },
    {
      metric: "Legitimate Customer Blocking",
      before: "N/A",
      after: "< 0.1% (only very unusual edge cases blocked)",
    },
    {
      metric: "Fraudulent Chargebacks",
      before: "Hundreds per day (after-the-fact disputes)",
      after: "Near zero (blocked before payment processor sees it)",
    },
    {
      metric: "Detection & Response Time",
      before: "Hours (manual investigation)",
      after: "Milliseconds (automatic at transaction time)",
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
          Detection Patterns
        </button>
        <button
          onClick={() => setActiveTab("flow")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "flow"
              ? "border-b-2 border-accent text-accent"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Protection Flow
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

      {/* TAB 1: Detection Patterns */}
      {activeTab === "detection" && (
        <div className="space-y-3">
          {detectionPatterns.map((pattern, idx) => (
            <div key={idx} className="bg-muted/40 border border-border/50 rounded p-3 text-xs space-y-2">
              <h4 className="font-semibold text-foreground">{pattern.signal}</h4>

              <div className="grid gap-2">
                <div className="bg-background rounded p-2 border border-akamai-green/30">
                  <p className="text-muted-foreground mb-1"><strong>✓ Normal:</strong></p>
                  <p className="text-foreground text-[11px]">{pattern.normal}</p>
                </div>

                <div className="bg-background rounded p-2 border border-destructive/30">
                  <p className="text-muted-foreground mb-1"><strong>✗ Carding Attack:</strong></p>
                  <p className="text-foreground text-[11px]">{pattern.attack}</p>
                </div>

                <div className="bg-accent/10 rounded p-2 border border-accent/30">
                  <p className="text-accent font-semibold text-[11px]">→ Detection: {pattern.detect}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: Protection Flow */}
      {activeTab === "flow" && (
        <div className="space-y-3">
          {protectionFlow.map((step) => (
            <div key={step.step} className="flex gap-3">
              {/* Step number */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center shrink-0 font-bold text-xs text-accent">
                  {step.step}
                </div>
                {step.step < protectionFlow.length && <div className="w-0.5 h-24 bg-accent/20 my-1" />}
              </div>

              {/* Content */}
              <div className="flex-1 pb-3">
                <h4 className="font-semibold text-foreground">{step.phase}</h4>

                <div className="space-y-2 mt-2 text-xs">
                  <div className="bg-muted/40 rounded p-2 border border-border/50">
                    <p className="text-muted-foreground mb-1"><strong>What Happens:</strong></p>
                    <p className="text-foreground">{step.what}</p>
                  </div>

                  <div className="bg-background rounded p-2 border border-border/50">
                    <p className="text-muted-foreground mb-1"><strong>Checks:</strong></p>
                    <p className="text-foreground whitespace-pre-line">{step.checks}</p>
                  </div>

                  <div className="bg-accent/10 rounded p-2 border border-accent/30">
                    <p className="text-accent font-semibold text-[11px]">{step.result}</p>
                  </div>
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
            <div key={idx} className="grid grid-cols-3 gap-2 bg-muted/40 border border-border/50 rounded p-3 text-xs">
              <div>
                <p className="text-muted-foreground font-semibold">{result.metric}</p>
              </div>
              <div className="border-l border-border/50 pl-2">
                <p className="text-muted-foreground text-[10px] mb-1">Before</p>
                <p className="text-destructive font-semibold text-[11px]">{result.before}</p>
              </div>
              <div className="border-l border-border/50 pl-2">
                <p className="text-muted-foreground text-[10px] mb-1">After</p>
                <p className="text-akamai-green font-semibold text-[11px]">{result.after}</p>
              </div>
            </div>
          ))}

          <div className="bg-accent/10 border border-accent/30 rounded p-3 text-xs space-y-2">
            <p className="font-semibold text-accent flex items-center gap-2">
              <CheckCircle2 size={14} />
              Summary: Carding Attacks Neutralized
            </p>
            <p className="text-accent/80">
              AAP detects payment patterns in milliseconds. Cardingattacks stopped before any charge is attempted. Legitimate customers experience zero friction.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardingViewer;
