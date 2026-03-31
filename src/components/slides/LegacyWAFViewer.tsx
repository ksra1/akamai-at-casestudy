import { useState } from "react";
import { Shield, AlertTriangle, CheckCircle2, Clock, TrendingUp } from "lucide-react";

const LegacyWAFViewer = () => {
  const [activeTab, setActiveTab] = useState<"audit" | "rules" | "tuning">("audit");

  const auditFindings = [
    {
      rule: "SQL Injection Detection",
      status: "OUTDATED",
      coverage: "40% of OWASP Top 10 patterns",
      issue: "Missing parameterized query detection, no time-based SQLi detection",
      fixedBy: "AAP",
      detail: "Legacy WAF: signature-based only. AAP: behavioral + signature + context-aware (sees intent, not just syntax)",
    },
    {
      rule: "Cross-Site Scripting (XSS)",
      status: "OUTDATED",
      coverage: "60% coverage",
      issue: "DOM-based XSS not detected, missing event handler variants (onload, onerror, etc.)",
      fixedBy: "AAP",
      detail: "Legacy: blacklist approach. AAP: whitelist approach (allow only safe patterns), covers 200+ XSS variants",
    },
    {
      rule: "Session Hijacking",
      status: "NOT COVERED",
      coverage: "0%",
      issue: "No detection for stolen session cookies, token replay attacks, or session fixation",
      fixedBy: "AAP + Bot Manager",
      detail: "AAP detects abnormal session patterns (geographic jump, device change). Bot Manager identifies session abuse patterns.",
    },
    {
      rule: "Broken Authentication",
      status: "NOT COVERED",
      coverage: "0%",
      issue: "No weak password enforcement, no brute force detection at WAF layer",
      fixedBy: "Bot Manager + EdgeWorkers",
      detail: "Bot Manager detects credential stuffing (50+ failed attempts/sec). EdgeWorkers enforces account lockout + CAPTCHA.",
    },
    {
      rule: "Data Exposure",
      status: "PARTIAL",
      coverage: "30%",
      issue: "No detection for unencrypted sensitive data in responses, no DLP (Data Loss Prevention)",
      fixedBy: "AAP",
      detail: "AAP scans response bodies for PII patterns (SSN, CC numbers, API keys) before reaching users.",
    },
  ];

  const aapRules = [
    {
      category: "OWASP Top 10 Detection",
      count: "50+ managed rules",
      updates: "Auto-updated daily",
      detail: "SQL Injection, XSS, CSRF, Insecure Deserialization, XML External Entities, Broken Access Control, Sensitive Data Exposure, XXE, Using Components with Known Vulnerabilities, Insufficient Logging & Monitoring",
      icon: <Shield size={16} className="text-akamai-red" />,
    },
    {
      category: "Zero-Day Detection",
      count: "20+ ML models",
      updates: "Real-time",
      detail: "Anomaly detection for new attacks that don't match known signatures. Akamai analyzes attacks globally and pushes rules within hours of detection.",
      icon: <AlertTriangle size={16} className="text-accent" />,
    },
    {
      category: "Reputation-Based Rules",
      count: "1000+ threat feeds",
      updates: "Hourly",
      detail: "IP reputation (known attacker IPs), ASN reputation (ISP hosting botnets), domain reputation. Auto-block known sources.",
      icon: <TrendingUp size={16} className="text-akamai-electric" />,
    },
    {
      category: "API-Specific Rules",
      count: "30+ rules",
      updates: "Weekly",
      detail: "GraphQL injection, XML bomb, XXE injection, API schema violations, missing authentication, rate limit bypass patterns",
      icon: <CheckCircle2 size={16} className="text-akamai-green" />,
    },
  ];

  const tuningPhases = [
    {
      day: "Day 1-2",
      mode: "Alert Only",
      action: "Deploy AAP in monitoring mode. All suspicious requests logged, none blocked.",
      metric: "Track flagged requests by rule. Identify false positive patterns.",
      result: "0 user impact, 100% visibility into incoming threats",
    },
    {
      day: "Day 3-5",
      mode: "Alert + Selective Enforcement",
      action: "Enable blocking for high-confidence rules only (SQL injection, shell commands, XXE). Keep monitoring on lower-confidence rules.",
      metric: "Monitor 5xx errors. If surge detected, disable that rule.",
      result: "Block obvious attacks, gather data on edge cases",
    },
    {
      day: "Day 6-7",
      mode: "Full Enforcement",
      action: "Enable all rules. Create bypass list for known false positives (e.g., legitimate API calls flagged as injection).",
      metric: "Monitor false positive rate. Target: <0.1% of legitimate traffic blocked.",
      result: "Full WAF coverage, ready for production",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Tab Switcher */}
      <div className="flex gap-2 border-b flex-wrap">
        <button
          onClick={() => setActiveTab("audit")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "audit"
              ? "border-b-2 border-akamai-red text-akamai-red"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Coverage Audit
        </button>
        <button
          onClick={() => setActiveTab("rules")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "rules"
              ? "border-b-2 border-akamai-red text-akamai-red"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          AAP Managed Rules
        </button>
        <button
          onClick={() => setActiveTab("tuning")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "tuning"
              ? "border-b-2 border-akamai-red text-akamai-red"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          7-Day Tuning
        </button>
      </div>

      {/* TAB 1: Coverage Audit */}
      {activeTab === "audit" && (
        <div className="space-y-3">
          {auditFindings.map((finding, idx) => (
            <div key={idx} className="bg-muted/40 border border-border/50 rounded p-3 text-sm space-y-2">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-semibold text-foreground">{finding.rule}</h4>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded whitespace-nowrap ${
                    finding.status === "OUTDATED"
                      ? "bg-accent/20 text-accent"
                      : finding.status === "NOT COVERED"
                        ? "bg-destructive/20 text-destructive"
                        : "bg-akamai-green/20 text-akamai-green"
                  }`}
                >
                  {finding.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-muted-foreground mb-1">Current Coverage</p>
                  <p className="font-mono font-bold text-foreground">{finding.coverage}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Fixed By</p>
                  <p className="font-semibold text-akamai-red">{finding.fixedBy}</p>
                </div>
              </div>

              <div className="bg-background rounded p-2 border border-border/50">
                <p className="text-muted-foreground mb-2">{finding.issue}</p>
                <div className="border-t border-border/50 pt-2">
                  <p className="text-muted-foreground italic">{finding.detail}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-destructive/10 border border-destructive/30 rounded p-3 text-sm space-y-2">
            <p className="font-semibold text-destructive">Audit Summary</p>
            <ul className="space-y-1 text-destructive/80">
              <li>• <strong>Gap:</strong> 3 out of 10 OWASP Top 10 categories have {`<`}50% coverage</li>
              <li>• <strong>Risk:</strong> Session hijacking and broken auth not covered at all</li>
              <li>• <strong>Action:</strong> AAP fills all gaps. Expected coverage: 90%+ OWASP Top 10</li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 2: AAP Managed Rules */}
      {activeTab === "rules" && (
        <div className="space-y-3">
          {aapRules.map((rule, idx) => (
            <div key={idx} className="bg-muted/40 border border-border/50 rounded p-3 text-sm space-y-2">
              <div className="flex items-start gap-2 mb-2">
                {rule.icon}
                <h4 className="font-semibold text-foreground flex-1">{rule.category}</h4>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-muted-foreground mb-1">Managed Rules</p>
                  <p className="font-mono font-bold text-foreground">{rule.count}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Update Frequency</p>
                  <p className="font-semibold text-accent">{rule.updates}</p>
                </div>
              </div>

              <div className="bg-background rounded p-2 border border-border/50">
                <p className="text-muted-foreground">{rule.detail}</p>
              </div>
            </div>
          ))}

          <div className="bg-akamai-green/10 border border-akamai-green/30 rounded p-3 text-sm space-y-2">
            <p className="font-semibold text-akamai-green flex items-center gap-2">
              <CheckCircle2 size={14} />
              Auto-Update Benefit
            </p>
            <p className="text-akamai-green/80">
              AAP rules update automatically every day. New CVEs discovered in the wild? Akamai patches within 24 hours. Zero manual rule maintenance.
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: 7-Day Tuning Window */}
      {activeTab === "tuning" && (
        <div className="space-y-3">
          {tuningPhases.map((phase, idx) => (
            <div key={idx} className="bg-muted/40 border border-border/50 rounded p-3 text-sm space-y-2">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Clock size={14} className="text-akamai-red" />
                  {phase.day}
                </h4>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-accent/20 text-accent">
                  {phase.mode}
                </span>
              </div>

              <div className="space-y-2">
                <div>
                  <p className="text-muted-foreground mb-1">
                    <strong>Action:</strong>
                  </p>
                  <p className="text-foreground">{phase.action}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">
                    <strong>Monitor:</strong>
                  </p>
                  <p className="text-foreground">{phase.metric}</p>
                </div>
              </div>

              <div className="bg-background rounded p-2 border border-border/50">
                <p className="flex items-center gap-2 text-akamai-green font-semibold">
                  <CheckCircle2 size={12} />
                  {phase.result}
                </p>
              </div>
            </div>
          ))}

          <div className="bg-primary/10 border border-primary/30 rounded p-3 text-sm space-y-2">
            <p className="font-semibold text-primary">Tuning Best Practice</p>
            <p className="text-primary/80">
              Never deploy AAP in full-block mode Day 1. 7-day tuning window prevents user-facing false positives. Bypass list for known edge cases (legitimate API calls that trigger rules).
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LegacyWAFViewer;
