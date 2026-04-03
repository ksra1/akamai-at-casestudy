import { useState } from "react";
import { UserCheck, Shield, AlertTriangle, CheckCircle2, Fingerprint, Activity } from "lucide-react";

const AccountProtectorViewer = () => {
  const [activeTab, setActiveTab] = useState<"flow" | "signals" | "results">("flow");

  const lifecycleEvents = [
    { event: "Login", risk: "Credential stuffing, account takeover", action: "Step-up MFA, challenge, or block based on risk score" },
    { event: "Password Reset", risk: "Account recovery abuse", action: "Verify device/location match before allowing reset" },
    { event: "Account Changes", risk: "Profile hijacking (email, phone swap)", action: "Flag anomalous changes from unrecognized devices" },
    { event: "Checkout", risk: "Payment fraud, promo abuse", action: "Risk-score transaction, challenge high-risk purchases" },
  ];

  const riskSignals = [
    { category: "Device Profiling", signals: ["Device fingerprint & hardware attributes", "Browser configuration & plugins", "Screen resolution, timezone, language"] },
    { category: "Network Context", signals: ["IP reputation across all Akamai customers", "VPN/proxy/Tor detection", "ASN and ISP anomaly analysis"] },
    { category: "Behavioral Analysis", signals: ["Typing cadence & mouse movement patterns", "Navigation flow vs. population baseline", "Session velocity & timing anomalies"] },
    { category: "Contextual Signals", signals: ["Geographic impossibility (travel speed)", "Time-of-day patterns vs. user history", "Device switching frequency"] },
  ];

  const results = [
    { metric: "Account Takeover Prevention", before: "Reactive (detected post-breach)", after: "Real-time risk scoring blocks at edge" },
    { metric: "Legitimate User Friction", before: "Blanket MFA on every login", after: "Step-up auth only for anomalous sessions" },
    { metric: "Bot Detection (First Visit)", before: "Missed on first interaction", after: "Population-wide behavioral baseline catches bots immediately" },
    { metric: "Fraud Investigation", before: "Manual log analysis", after: "SIEM integration with real-time risk telemetry" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-2 border-b flex-wrap">
        <button
          onClick={() => setActiveTab("flow")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "flow" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Account Lifecycle
        </button>
        <button
          onClick={() => setActiveTab("signals")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "signals" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Risk Signals
        </button>
        <button
          onClick={() => setActiveTab("results")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "results" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Results
        </button>
      </div>

      {activeTab === "flow" && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Account Protector evaluates risk at every sensitive account event — not just login. It builds a behavioral profile per user and compares against the entire user population to spot anomalies in real time.
          </p>

          <div className="space-y-3">
            {lifecycleEvents.map((e) => (
              <div key={e.event} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                    <UserCheck size={14} className="text-primary" />
                  </div>
                  <h4 className="font-semibold text-sm text-foreground">{e.event}</h4>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs font-medium text-accent mb-1">Risk</p>
                    <p className="text-muted-foreground">{e.risk}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-primary mb-1">Response</p>
                    <p className="text-muted-foreground">{e.action}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-primary/5 border border-primary/15 rounded-lg p-3 flex items-start gap-2">
            <Shield size={16} className="text-primary mt-0.5 shrink-0" />
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Real-time risk scoring</span> — every request gets a risk score based on 100+ signals. Tuning is unique to your organization so thresholds match your risk tolerance.
            </p>
          </div>
        </div>
      )}

      {activeTab === "signals" && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Account Protector builds detailed user profiles from multiple signal categories. Anomalies from first interaction are detected by comparing against the behavior profile of the entire user population.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {riskSignals.map((category) => (
              <div key={category.category} className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  {category.category === "Device Profiling" && <Fingerprint size={14} className="text-primary" />}
                  {category.category === "Network Context" && <Shield size={14} className="text-primary" />}
                  {category.category === "Behavioral Analysis" && <Activity size={14} className="text-primary" />}
                  {category.category === "Contextual Signals" && <AlertTriangle size={14} className="text-primary" />}
                  <h4 className="font-semibold text-sm text-foreground">{category.category}</h4>
                </div>
                <ul className="space-y-1.5">
                  {category.signals.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 size={12} className="text-primary mt-0.5 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-accent/5 border border-accent/15 rounded-lg p-3 flex items-start gap-2">
            <UserCheck size={16} className="text-accent mt-0.5 shrink-0" />
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Source reputation</span> — evaluates each source against past malicious activity observed across all Akamai customers, catching known bad actors even on their first visit to your site.
            </p>
          </div>
        </div>
      )}

      {activeTab === "results" && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Account Protector vs. no dedicated account security:
          </p>

          <div className="space-y-3">
            {results.map((r) => (
              <div key={r.metric} className="border rounded-lg p-3">
                <p className="font-semibold text-sm text-foreground mb-2">{r.metric}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-destructive/5 rounded p-2">
                    <p className="text-xs font-medium text-destructive mb-0.5">Before</p>
                    <p className="text-xs text-muted-foreground">{r.before}</p>
                  </div>
                  <div className="bg-primary/5 rounded p-2">
                    <p className="text-xs font-medium text-primary mb-0.5">After</p>
                    <p className="text-xs text-muted-foreground">{r.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-primary/5 border border-primary/15 rounded-lg p-3 flex items-start gap-2">
            <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">SIEM & fraud tools integration</span> — risk events stream in real time to your investigation workflows for rapid incident response.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountProtectorViewer;
