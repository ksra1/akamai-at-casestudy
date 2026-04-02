import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const LegacyWAFViewer = () => {
  const [activeTab, setActiveTab] = useState<"enable" | "analyze" | "changes" | "monitor">("enable");

  const enableData = [
    {
      label: "Deployment Mode",
      value: "Alert-Only Monitoring",
      detail: "AAP deployed in monitoring mode. All suspicious requests logged, zero traffic blocked. 100% visibility, zero user impact.",
    },
    {
      label: "Rule Set Activated",
      value: "50+ OWASP Top 10 Rules",
      detail: "SQL Injection, XSS, CSRF, Broken Auth, Deserialization, XXE, Access Control, Data Exposure, Component Vulns, Logging",
    },
    {
      label: "Detection Coverage",
      value: "OWASP + Zero-Day + Reputation",
      detail: "Signature-based (known attacks), behavioral anomaly detection (unknown attacks), IP/ASN reputation feeds (known attacker sources)",
    },
    {
      label: "Data Collection Targets",
      value: "All HTTP Traffic",
      detail: "Headers, request body, response patterns, source IP, user-agent, geo-location, TLS fingerprint. 7-day baseline collection.",
    },
  ];

  const observationData = [
    {
      pattern: "SQL Injection Probes",
      frequency: "2,847 attempts/day",
      sources: "Primarily from 12 known datacenter IPs (ASN hosting botnets)",
      risk: "CRITICAL",
      detail: "UNION-based, time-based, blind SQLi variants. All targeted /admin/login and /api/search endpoints.",
    },
    {
      pattern: "XSS Attack Vectors",
      frequency: "1,156 attempts/day",
      sources: "Distributed: 450+ unique IPs, mostly residential proxies",
      risk: "CRITICAL",
      detail: "DOM-based XSS, event handler injection, innerHTML tampering. Targeting user profile & comment endpoints.",
    },
    {
      pattern: "Session Hijacking / Token Theft",
      frequency: "3,421 attempts/day",
      sources: "Stolen session cookies being replayed; detected via geo-velocity (NYC user to Tokyo 15 seconds later)",
      risk: "CRITICAL",
      detail: "Not protocol-level attacks; rather abuse of stolen credentials. Cross-geography jumps, unusual device fingerprints.",
    },
    {
      pattern: "False Positive Alerts",
      frequency: "47 alerts/day from legitimate tools",
      sources: "Internal: Automated health checks, third-party monitoring (New Relic, DataDog), security scanners",
      risk: "LOW",
      detail: "Need bypass rules for /health endpoint (returns JSON with 'error' keyword that triggers XSS rule). Security scanner IPs already in whitelist.",
    },
  ];

  const changesData = [
    {
      rule: "SQL Injection Detection",
      action: "Tuned Sensitivity",
      change: "Reduced false positives by raising confidence threshold to 85% (from 60%)",
      impact: "Block obvious injection attempts, allow unusual-but-legitimate queries (e.g., SQL reporting tools)",
      bypassList: "/admin/sql-tools/* (internal reporting), /api/advanced-search (complex WHERE clauses)",
    },
    {
      rule: "XSS Attack Handler",
      action: "Context-Aware Filtering",
      change: "Enabled HTML-aware parsing; allows HTML entities in comments but blocks raw script tags",
      impact: "Users can post HTML-safe content; malicious <script> tags blocked",
      bypassList: "/api/rich-text-editor/* (trusted WYSIWYG endpoints with content-type: application/json restriction)",
    },
    {
      rule: "Session Hijacking Detection",
      action: "Geo-Velocity Enforcement",
      change: "Flag & challenge if session crosses >1000 miles in <5 minutes; require 2FA re-auth",
      impact: "Block stolen sessions replayed from different countries; legitimate users traveling via same network (office VPN) unaffected",
      bypassList: "Corporate VPNs (whitelisted by IP range), Akamai IP ranges (internal tools)",
    },
    {
      rule: "Reputation Integration",
      action: "IP Reputation Scoring",
      change: "Auto-block IPs with 3+ reputation sources marking as malicious (botnet/zombie/proxy)",
      impact: "No need for manual IP blocklist; global threat feeds do the work",
      bypassList: "None - reputation is automatic. Customer can request whitelist via support if legitimate IP falsely marked.",
    },
  ];

  const monitoringData = [
    {
      metric: "False Positive Rate",
      baseline: "2.3% of legitimate traffic flagged",
      target: "<0.1%",
      achieved: "0.08% after tuning",
      status: "✓ PASSED",
      detail: "47 daily FP alerts → 3 alerts/day after bypass rules applied. Legitimate traffic unaffected.",
    },
    {
      metric: "Detection Effectiveness",
      baseline: "Unknown (legacy WAF had no visibility)",
      target: ">99% attack detection",
      achieved: "99.7% (all SQL injection, 99%+ XSS, 100% session hijacking captured)",
      status: "✓ PASSED",
      detail: "2,847 SQLi attempts → 2,837 detected. 1,156 XSS → 1,145 detected. Zero session hijacking bypassed.",
    },
    {
      metric: "Rule Update Latency",
      baseline: "N/A (manual rule updates, typically 2-3 weeks behind CVEs)",
      target: "<24h from CVE publication",
      achieved: "Real-time threat feed integration",
      status: "✓ PASSED",
      detail: "New vulnerabilities detected globally by Akamai, pushed to AAP within 4 hours. Zero manual maintenance.",
    },
    {
      metric: "Production Readiness",
      baseline: "Legacy WAF blocking 0% of attacks",
      target: "Ready for full enforcement Week 2",
      achieved: "Full enforcement enabled Day 8 (after 7-day baseline)",
      status: "✓ READY",
      detail: "All KPIs met. Switch from 'Monitor & Log' to 'Monitor & Block' for all OWASP rules on Day 8.",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Tab Switcher */}
      <div className="flex gap-2 border-b flex-wrap">
        <button
          onClick={() => setActiveTab("enable")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "enable"
              ? "border-b-2 border-akamai-red text-akamai-red"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Step 1: Enable & Audit
        </button>
        <button
          onClick={() => setActiveTab("analyze")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "analyze"
              ? "border-b-2 border-akamai-red text-akamai-red"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Step 2: Analyze
        </button>
        <button
          onClick={() => setActiveTab("changes")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "changes"
              ? "border-b-2 border-akamai-red text-akamai-red"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Step 3: Changes
        </button>
        <button
          onClick={() => setActiveTab("monitor")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "monitor"
              ? "border-b-2 border-akamai-red text-akamai-red"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Step 4: Monitor
        </button>
      </div>

      {/* TAB 1: Enable & Audit */}
      {activeTab === "enable" && (
        <div className="space-y-3">
          <div className="bg-accent/10 border border-accent/30 rounded p-3 space-y-2 mb-4">
            <p className="font-semibold text-accent text-sm">Day 1: Deploy in Monitoring Mode</p>
            <p className="text-accent/80 text-sm">
              AAP deployed in alert-only mode. All suspicious requests logged, none blocked. 7-day baseline collection to understand attack patterns before enforcement.
            </p>
          </div>

          {enableData.map((item, idx) => (
            <div key={idx} className="bg-muted/40 border border-border/50 rounded p-3 text-sm space-y-2">
              <h4 className="font-semibold text-foreground">{item.label}</h4>
              <p className="font-mono text-akamai-red font-bold">{item.value}</p>
              <p className="text-muted-foreground text-xs">{item.detail}</p>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: Analyze Observations */}
      {activeTab === "analyze" && (
        <div className="space-y-3">
          <div className="bg-akamai-electric/10 border border-akamai-electric/30 rounded p-3 space-y-2 mb-4">
            <p className="font-semibold text-akamai-electric text-sm">Day 7: Baseline Analysis Complete</p>
            <p className="text-akamai-electric/80 text-sm">
              After 7 days of monitoring, analyzed attack patterns. Found 4 major threat categories. Decision: configure rules to block with minimal false positives.
            </p>
          </div>

          {observationData.map((obs, idx) => (
            <div key={idx} className="bg-muted/40 border border-border/50 rounded p-3 text-sm space-y-2">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-semibold text-foreground">{obs.pattern}</h4>
                <span className={`text-xs font-bold px-2 py-0.5 rounded whitespace-nowrap ${
                  obs.risk === "CRITICAL" ? "bg-destructive/20 text-destructive" : "bg-accent/20 text-accent"
                }`}>
                  {obs.risk}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-muted-foreground mb-0.5">Frequency</p>
                  <p className="font-bold text-foreground">{obs.frequency}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-0.5">Sources</p>
                  <p className="text-foreground">{obs.sources}</p>
                </div>
              </div>
              <p className="text-muted-foreground text-xs italic">{obs.detail}</p>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: Changes & Configuration */}
      {activeTab === "changes" && (
        <div className="space-y-3">
          <div className="bg-akamai-green/10 border border-akamai-green/30 rounded p-3 space-y-2 mb-4">
            <p className="font-semibold text-akamai-green text-sm">Day 7-8: Tune Rules & Deploy Bypass List</p>
            <p className="text-akamai-green/80 text-sm">
              Configured AAP rules based on observations. Raised confidence thresholds to reduce false positives. Created bypass list for legitimate tools.
            </p>
          </div>

          {changesData.map((change, idx) => (
            <div key={idx} className="bg-muted/40 border border-border/50 rounded p-3 text-sm space-y-2">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-semibold text-foreground">{change.rule}</h4>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-akamai-green/20 text-akamai-green whitespace-nowrap">
                  {change.action}
                </span>
              </div>
              <div className="space-y-1 text-xs">
                <div>
                  <p className="text-muted-foreground font-semibold">Change:</p>
                  <p className="text-foreground">{change.change}</p>
                </div>
                <div>
                  <p className="text-muted-foreground font-semibold">Impact:</p>
                  <p className="text-foreground">{change.impact}</p>
                </div>
                <div>
                  <p className="text-muted-foreground font-semibold">Bypass Rules:</p>
                  <p className="font-mono text-foreground/80">{change.bypassList}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: Monitor & Verify */}
      {activeTab === "monitor" && (
        <div className="space-y-3">
          <div className="bg-akamai-red/10 border border-akamai-red/30 rounded p-3 space-y-2 mb-4">
            <p className="font-semibold text-akamai-red text-sm">Days 8+: Full Enforcement Ready</p>
            <p className="text-akamai-red/80 text-sm">
              After tuning validation, AAP switched from monitoring to enforcement. All KPIs met. Ready for production on Day 8 before Wave 1 cutover.
            </p>
          </div>

          {monitoringData.map((metric, idx) => (
            <div key={idx} className="bg-muted/40 border border-border/50 rounded p-3 text-sm space-y-2">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-semibold text-foreground">{metric.metric}</h4>
                <span className={`text-xs font-bold px-2 py-0.5 rounded whitespace-nowrap ${
                  metric.status.includes("PASSED") || metric.status.includes("READY") 
                    ? "bg-akamai-green/20 text-akamai-green" 
                    : "bg-accent/20 text-accent"
                }`}>
                  {metric.status}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="text-muted-foreground mb-0.5">Baseline</p>
                  <p className="font-mono text-foreground">{metric.baseline}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-0.5">Target</p>
                  <p className="font-mono text-foreground">{metric.target}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-0.5">Achieved</p>
                  <p className="font-mono font-bold text-akamai-green">{metric.achieved}</p>
                </div>
              </div>
              <p className="text-muted-foreground text-xs italic">{metric.detail}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LegacyWAFViewer;
