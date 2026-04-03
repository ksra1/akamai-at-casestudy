import { useState } from "react";
import { Globe, Users, Clock, CheckCircle2, AlertTriangle, Headphones, ShieldCheck } from "lucide-react";

const MultiGeographyGovernanceViewer = () => {
  const [activeTab, setActiveTab] = useState<"structure" | "timezone" | "escalation">("structure");

  const regionTeams = [
    {
      region: "Me (Delivery TPM)",
      lead: "Program Lead",
      members: "ET (9 AM - 6 PM)",
      coverage: "Program accountability, wave approvals, executive steering, escalations",
      responsibilities: "🔐 Wave launch decisions (I hold approval gate)",
    },
    {
      region: "TPM-DNS",
      lead: "Property & Domain Lead",
      members: "EU morning + US + ET",
      coverage: "Property creation, CNAME cutover coordination, domain validation, daily ops",
      responsibilities: "⏱️ Coordinates CNAME cutover with AT Retailers DNS ops (24h approval gate on their side)",
    },
    {
      region: "Tech Architect",
      lead: "Performance & Monitoring Lead",
      members: "US/EU rotation",
      coverage: "mPulse monitoring, performance validation, EdgeWorkers, caching",
      responsibilities: "✅ Provides go/no-go signal before each wave (error rate <0.5%)",
    },
    {
      region: "Security Consultant",
      lead: "Security Lead",
      members: "US/EU overlap",
      coverage: "WAF rules, Bot Manager tuning, threat response, incident analysis",
      responsibilities: "🛡️ Alert-only mode Week 1-2, then enforce Week 3+",
    },
    {
      region: "India DevOps",
      lead: "Regional Support",
      members: "India evening through US evening",
      coverage: "Regional infrastructure support, on-call incident response, failover coordination",
      responsibilities: "🌍 24h on-call rotation for Asia/APAC region cutover windows",
    },
  ];

  const timezoneWindows = [
    {
      window: "8 AM - 12 PM ET (1 PM - 5 PM CET)",
      who: "Delivery Lead + EU Support Engineer",
      what: "Morning ET: primary operating window. EU team transitioning out.",
      risk: "Delivery Lead available for all day decisions",
    },
    {
      window: "12 PM - 3 PM ET (5 PM - 8 PM CET)",
      who: "Delivery Lead handoff to EU",
      what: "Overlap window: EU stepping up for evening, Delivery Lead handles NA business",
      risk: "Real-time coordination available — both teams online",
    },
    {
      window: "3 PM - 6 PM ET (8 PM - 11 PM CET)",
      who: "Delivery Lead (ET focus)",
      what: "NA afternoon: manage LATAM traffic surge, final wave checks before EU evening",
      risk: "Delivery Lead owns NA business hours completely",
    },
    {
      window: "6 PM - 8 AM ET (EU carries overnight)",
      who: "On-call rotation (after-hours)",
      what: "EU evening + night: monitor systems, queue issues for morning ET standup",
      risk: "Critical incidents only — 30-60 min response time via on-call rotation",
    },
  ];

  const escalationMatrix = [
    {
      scenario: "Wave 2 deployment shows 1% error rate during NA peak",
      detection: "mPulse shows error spike at 12 PM ET",
      action: "Delivery Lead (Me): evaluate threshold vs. rollback, consult metric baseline. Decide: pause wave or continue.",
      escalation: "If unresolved in 15 min: page Akamai migration engineering team",
      resolution: "Typical: adjust EdgeWorkers routing, tweak canary split, resume wave",
      owner: "Delivery Lead (Me) - Primary decision maker",
    },
    {
      scenario: "Credential stuffing attack: 500% spike during login surge",
      detection: "Bot Manager risk scores spike in 5 minutes",
      action: "Security TPM: increase rate limits, enable CAPTCHA, notify Delivery Lead",
      escalation: "If >10K req/sec: escalate to Akamai Bot Manager team for additional rules",
      resolution: "Typical: block attacker IPs at edge, implement challenge tiers",
      owner: "Security TPM (primary), Delivery Lead (backup)",
    },
    {
      scenario: "Wave 1 EU customer reports latency spike (300ms+) at 10 AM CET",
      detection: "EU Support Engineer flags via mPulse alert",
      action: "EU Support → Delivery Lead (Me) async message. I investigate GTM status + origin health.",
      escalation: "If unresolved in 10 min: decision point — adjust GTM thresholds or escalate to Akamai GTM team",
      resolution: "Typical: adjust failover thresholds, trigger London failover from Frankfurt",
      owner: "Delivery Lead (Me) - Day-driven response",
    },
    {
      scenario: "Off-hours: DDoS attack at 2 AM (ET) hitting US origin",
      detection: "Prolexic auto-alert pages on-call TPM",
      action: "On-call TPM: activate incident command, page Delivery Lead (Myself) and Akamai Prolexic team",
      escalation: "Prolexic handles mitigation; Delivery Lead coordinates customer communication at morning standup",
      resolution: "Prolexic scrubs attack; monitoring resumes normal",
      owner: "On-call TPM (incident response) + Akamai incident team",
    },
  ];

  return (
    <div className="space-y-4">
      {/* TEAM SUMMARY HEADER */}
      <div className="bg-akamai-green/10 border border-akamai-green/30 rounded p-3 text-sm space-y-2">
        <p className="font-semibold text-akamai-green">5-Person Akamai Core Team</p>
        <p className="text-akamai-green/80">
          <strong>Me (Delivery TPM):</strong> Program Lead | <strong>TPM-DNS:</strong> Property/Domain Lead | <strong>Tech Architect:</strong> Performance/mPulse | <strong>Security Consultant:</strong> WAF/Bot/Threat | <strong>India DevOps:</strong> Regional Support
        </p>
      </div>

      {/* Akamai Support Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-sm space-y-2">
          <div className="flex items-center gap-2">
            <Headphones size={16} className="text-primary" />
            <p className="font-semibold text-primary">Akamai Technical Support</p>
          </div>
          <p className="text-muted-foreground">
            24x7x365 coverage via <strong>follow-the-sun model</strong> — support engineers across global time zones provide continuous break/fix assistance, configuration help, and troubleshooting without gaps.
          </p>
          <div className="flex flex-wrap gap-1 mt-1">
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">Break/Fix</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">Configuration Assistance</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">Follow-the-Sun</span>
          </div>
        </div>

        <div className="bg-accent/5 border border-accent/20 rounded-lg p-3 text-sm space-y-2">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-accent" />
            <p className="font-semibold text-accent">Security Operations Control Center (SOCC)</p>
          </div>
          <p className="text-muted-foreground">
            <strong>Optional managed service</strong> — Akamai's SOCC provides proactive security monitoring, threat analysis, and incident response. Augments the internal security team with dedicated Akamai security analysts.
          </p>
          <div className="flex flex-wrap gap-1 mt-1">
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/10 text-accent font-medium">Proactive Monitoring</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/10 text-accent font-medium">Threat Analysis</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/10 text-accent font-medium">Optional Add-On</span>
          </div>
        </div>
      </div>
      
      {/* Tab Switcher */}
      <div className="flex gap-2 border-b flex-wrap">
        <button
          onClick={() => setActiveTab("structure")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "structure"
              ? "border-b-2 border-akamai-green text-akamai-green"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Regional Teams
        </button>
        <button
          onClick={() => setActiveTab("timezone")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "timezone"
              ? "border-b-2 border-akamai-green text-akamai-green"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Timezone Coverage
        </button>
        <button
          onClick={() => setActiveTab("escalation")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "escalation"
              ? "border-b-2 border-akamai-green text-akamai-green"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Escalation Matrix
        </button>
      </div>

      {/* TAB 1: Regional Teams */}
      {activeTab === "structure" && (
        <div className="space-y-3">
          {regionTeams.map((team, idx) => (
            <div key={idx} className="bg-muted/40 border border-border/50 rounded p-3 text-sm space-y-2">
              <div className="flex items-start gap-2 mb-2">
                <Globe size={16} className="text-akamai-green shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{team.region}</h4>
                  <p className="text-muted-foreground text-xs">{team.lead}</p>
                </div>
              </div>

              <div className="grid gap-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-muted-foreground mb-1">
                      <strong>Timezone</strong>
                    </p>
                    <p className="font-mono text-foreground text-[11px]">{team.members}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">
                      <strong>Duties</strong>
                    </p>
                    <p className="text-foreground text-[11px]">{team.coverage}</p>
                  </div>
                </div>
                <div className="bg-background rounded p-2 border border-border/50">
                  <p className="text-foreground text-[11px]">{team.responsibilities}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-akamai-green/10 border border-akamai-green/30 rounded p-3 text-sm space-y-2">
            <p className="font-semibold text-akamai-green">Resource Governance Principle</p>
            <p className="text-akamai-green/80">
              Each role has dedicated ownership + Akamai 24x7 Technical Support as a safety net. Timezone overlap windows = minimum escalation delays. India DevOps ensures round-the-clock on-call coverage.
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: Timezone Coverage */}
      {activeTab === "timezone" && (
        <div className="space-y-3">
          {timezoneWindows.map((window, idx) => (
            <div key={idx} className="bg-muted/40 border border-border/50 rounded p-3 text-sm space-y-2">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-semibold text-foreground">{window.window}</h4>
                <span className={`text-xs font-bold px-2 py-0.5 rounded whitespace-nowrap ${
                  window.risk.includes("on-call") ? "bg-accent/20 text-accent" : 
                  "bg-akamai-green/20 text-akamai-green"
                }`}>
                  {window.risk}
                </span>
              </div>

              <div className="space-y-1">
                <p className="text-muted-foreground">
                  <strong>Coverage:</strong> {window.who}
                </p>
                <p className="text-muted-foreground">
                  <strong>Activity:</strong> {window.what || window.detail}
                </p>
              </div>
            </div>
          ))}

          <div className="bg-primary/10 border border-primary/30 rounded p-3 text-sm space-y-2">
            <p className="font-semibold text-primary">Timezone Optimization Strategy</p>
            <p className="text-primary/80">
              12-3 PM ET overlap is the shared decision window. All critical decisions made async during this window. Off-hours escalations pre-approved at designated Ops Manager level (no 3+ approval chains after hours).
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: Escalation Matrix */}
      {activeTab === "escalation" && (
        <div className="space-y-3">
          {escalationMatrix.map((item, idx) => (
            <div key={idx} className="bg-muted/40 border border-border/50 rounded p-3 text-sm space-y-2">
              <h4 className="font-semibold text-foreground">{item.scenario}</h4>

              <div className="space-y-1 text-muted-foreground">
                <p>
                  <strong>Detection:</strong> {item.detection}
                </p>
                <p>
                  <strong>Action:</strong> {item.action}
                </p>
                <p>
                  <strong>Escalation:</strong> {item.escalation}
                </p>
              </div>

              <div className="bg-background rounded p-2 border border-border/50 space-y-1">
                <p className="text-muted-foreground mb-1">
                  <strong>Typical Resolution:</strong>
                </p>
                <p className="text-foreground">{item.resolution}</p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Users size={12} className="text-akamai-green" />
                <p className="text-foreground font-semibold text-[11px]">Owner: {item.owner}</p>
              </div>
            </div>
          ))}

          <div className="bg-akamai-green/10 border border-akamai-green/30 rounded p-3 text-sm space-y-2">
            <p className="font-semibold text-akamai-green flex items-center gap-2">
              <CheckCircle2 size={14} />
              Escalation Principle: Clear Ownership
            </p>
            <ul className="space-y-1 text-akamai-green/80">
              <li>• Each scenario has a primary owner (regional team) and backup (Ops Manager)</li>
              <li>• Escalation path is pre-defined — no discussion during crisis, just execution</li>
              <li>• Ops Manager authority is absolute during off-hours (reduces decision delays)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiGeographyGovernanceViewer;
