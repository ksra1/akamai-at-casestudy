import { useState } from "react";
import { Users, MessageSquare, CheckCircle2, AlertTriangle, TrendingUp, Clock } from "lucide-react";

const TeamCoordinationViewer = () => {
  const [activeTab, setActiveTab] = useState<"phases" | "comms" | "gates">("phases");

  const phaseTimeline = [
    {
      phase: "Week 1: Kickoff, Planning & Setup",
      milestone: "Teams aligned, infrastructure ready, training complete",
      activities: [
        "Kickoff: Present 30-day plan, escalation matrix, timezone coverage to all teams",
        "Quick-start training: Akamai product essentials (PAPI, GTM, Bot Manager) — 2 focused sessions + recorded async viewing",
        "Role assignments: Who owns what (TPM-DNS, TPM-Security, DevOps, QA, Support)?",
        "Risk review & mitigation prep: database capacity checks, bot attack scenarios, certificate validation",
        "Pre-stage DNS, properties, Bot Manager configurations",
      ],
      communication: "Daily standup + twice-weekly full-team sync",
      owner: "Delivery TPM + Training Org",
    },
    {
      phase: "Week 2: Domain Validation & Wave 1 Cutover Launch",
      milestone: "First 1,250 hostnames live (Wave 1)",
      activities: [
        "Domain validation: complete CNAME updates for Wave 1 batch (1,250 hostnames)",
        "Pre-cutover: final health checks, DNS provider ready, mPulse baseline established",
        "Wave 1 cutover window (2-hour): orchestrated DNS batch, monitor for errors in real-time",
        "Post-cutover monitoring (24h): check error rates, origin health, bot threat levels",
        "Wave validation: error rate &lt;0.5%, performance within 10% baseline, zero escalations",
      ],
      communication: "Daily standup (15 min) + real-time Slack war room during cutover",
      owner: "Delivery TPM + DevOps + DNS Team",
    },
    {
      phase: "Week 3: Wave 2 Rollout (2,500 hostnames)",
      milestone: "3,750 cumulative hostnames live",
      activities: [
        "Apply Wave 1 lessons learned immediately (faster DNS cutover, optimized cache warming)",
        "Execute Wave 2 cutover (2,500 hostnames)",
        "Real-time incident management with customer & Akamai ops",
        "mPulse dashboards track performance trends across waves",
        "Begin pre-staging infrastructure for Wave 3",
      ],
      communication: "Tri-weekly customer update calls + daily ops standup",
      owner: "Delivery TPM + Operations + DevOps",
    },
    {
      phase: "Week 4: Wave 3 Completion & Stabilization",
      milestone: "All 5,000 hostnames live, incident response tested, ready for production support",
      activities: [
        "Execute Wave 3 cutover (1,250 final hostnames)",
        "Incident simulation: traffic spike, DDoS attack, bot surge — validate escalation response",
        "Load test at 1.5x expected peak: verify mPulse alerting + auto-scaling works",
        "Security validation: WAF rules, Bot Manager policies, isolation between customers verified",
        "Document runbooks for latency spike, bot attack, capacity incidents",
      ],
      communication: "Weekly executive steering + customer sign-off call",
      owner: "Delivery TPM + QA + Security + Operations",
    },
  ];

  const communicationChannels = [
    {
      audience: "Executive Steering Committee",
      frequency: "Weekly (30 min)",
      content: "Status: # hostnames live, incidents this week, blockers, decisions needed",
      format: "Formal slide deck (Risk/Red/Yellow/Green status)",
      owner: "Delivery TPM",
    },
    {
      audience: "Customer Technical Leads + TPM",
      frequency: "3x per week (60 min on cutover weeks, 30 min regular)",
      content: "Detailed: what's happening, next steps, customer actions needed (DNS approvals, testing)",
      format: "Async doc + live call for Q&A",
      owner: "Delivery TPM + Account Team",
    },
    {
      audience: "Akamai Full Operations Team",
      frequency: "Daily standup (15 min) during cutover, 2x weekly otherwise",
      content: "Tactical: incidents, blockers, today's actions, escalations",
      format: "Standup + Slack war room for real-time issue resolution",
      owner: "Ops Manager",
    },
    {
      audience: "Akamai Engineering (GTM, Bot, WAF teams)",
      frequency: "Weekly sync + on-demand for escalations",
      content: "Technical: performance issues, rule tuning, product limits being hit",
      format: "Slack + video calls for deep-dive troubleshooting",
      owner: "Technical TPM",
    },
  ];

  const successGates = [
    {
      gate: "Wave Validation Gate",
      timing: "After each wave (every 1-2 weeks)",
      criteria: [
        "Error rate &lt;0.5% (actual vs baseline)",
        "LCP within 10% of baseline",
        "No bot/security incidents",
        "Origin latency stable (no anomalies)",
      ],
      decision: "Pass = proceed to next wave. Fail = pause, investigate, fix, retry",
      owner: "Delivery TPM + QA",
    },
    {
      gate: "Sustainability Gate",
      timing: "After Wave 3 (end of Week 4)",
      criteria: [
        "4,500+ hostnames live and stable",
        "Customer and Akamai teams confident in operations",
        "Runbooks tested, escalation paths exercised",
        "No critical incidents in past 5 days",
      ],
      decision: "Pass = begin final wave. Fail = extend stabilization period",
      owner: "Ops Manager + Steering Committee",
    },
    {
      gate: "Security Sign-Off Gate",
      timing: "Before final wave cutover",
      criteria: [
        "WAF rules reviewed and validated against OWASP Top 10",
        "Bot Manager policies tested with attack simulations",
        "Data isolation verified between customer environments",
        "Compliance: DLP, audit logging, data residency validated",
      ],
      decision: "Pass = security clearance. Fail = security team blocks wave",
      owner: "Security Officer + Compliance",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Tab Switcher */}
      <div className="flex gap-2 border-b flex-wrap">
        <button
          onClick={() => setActiveTab("phases")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "phases"
              ? "border-b-2 border-akamai-green text-akamai-green"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Phase Timeline
        </button>
        <button
          onClick={() => setActiveTab("comms")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "comms"
              ? "border-b-2 border-akamai-green text-akamai-green"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Communication Plan
        </button>
        <button
          onClick={() => setActiveTab("gates")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "gates"
              ? "border-b-2 border-akamai-green text-akamai-green"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Success Gates
        </button>
      </div>

      {/* TAB 1: Phase Timeline */}
      {activeTab === "phases" && (
        <div className="space-y-3">
          {phaseTimeline.map((phase, idx) => (
            <div key={idx} className="flex gap-3">
              {/* Timeline dot */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-akamai-green/10 border-2 border-akamai-green flex items-center justify-center shrink-0 font-bold text-xs text-akamai-green">
                  {idx + 1}
                </div>
                {idx < phaseTimeline.length - 1 && <div className="w-0.5 h-24 bg-akamai-green/20 my-1" />}
              </div>

              {/* Content */}
              <div className="flex-1 pb-3">
                <h4 className="font-semibold text-sm text-foreground mb-1">{phase.phase}</h4>
                <div className="bg-muted/40 rounded p-2 border border-border/50 mb-2">
                  <p className="font-semibold text-akamai-green text-sm mb-2">{phase.milestone}</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {phase.activities.map((activity, i) => (
                      <li key={i} className="• {activity}">{activity}</li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">
                      <strong>Communication</strong>
                    </p>
                    <p className="text-foreground">{phase.communication}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">
                      <strong>Owner</strong>
                    </p>
                    <p className="text-foreground font-semibold">{phase.owner}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-akamai-green/10 border border-akamai-green/30 rounded p-3 text-sm space-y-2">
            <p className="font-semibold text-akamai-green">Phased Approach Benefit</p>
            <p className="text-akamai-green/80">
              Each wave tests the process. Lessons from Wave 1 speed up Waves 2-4. By end of Week 4, teams operate like veterans.
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: Communication Plan */}
      {activeTab === "comms" && (
        <div className="space-y-3">
          {communicationChannels.map((channel, idx) => (
            <div key={idx} className="bg-muted/40 border border-border/50 rounded p-3 text-sm space-y-2">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-semibold text-foreground">{channel.audience}</h4>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-accent/20 text-accent">{channel.frequency}</span>
              </div>

              <div className="space-y-1">
                <p className="text-muted-foreground">
                  <strong>Content:</strong> {channel.content}
                </p>
                <p className="text-muted-foreground">
                  <strong>Format:</strong> {channel.format}
                </p>
              </div>

              <div className="bg-background rounded p-2 border border-border/50">
                <p className="text-foreground font-semibold text-[11px]">Owner: {channel.owner}</p>
              </div>
            </div>
          ))}

          <div className="bg-primary/10 border border-primary/30 rounded p-3 text-sm space-y-2">
            <p className="font-semibold text-primary">Communication Principle: No Surprises</p>
            <p className="text-primary/80">
              Every stakeholder knows what's coming and why. Executives see business impact. Operators see technical details. Customers see what they need to do. No status surprises at steering committee.
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: Success Gates */}
      {activeTab === "gates" && (
        <div className="space-y-3">
          {successGates.map((gate, idx) => (
            <div key={idx} className="bg-muted/40 border border-border/50 rounded p-3 text-sm space-y-2">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-semibold text-foreground">{gate.gate}</h4>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary/20 text-primary">{gate.timing}</span>
              </div>

              <div>
                <p className="text-muted-foreground mb-1">
                  <strong>Criteria:</strong>
                </p>
                <ul className="space-y-1 text-muted-foreground">
                  {gate.criteria.map((criterion, i) => (
                    <li key={i}>✓ {criterion}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-background rounded p-2 border border-border/50 space-y-1">
                <p className="text-muted-foreground mb-1">
                  <strong>Decision:</strong>
                </p>
                <p className="text-foreground">{gate.decision}</p>
              </div>

              <p className="text-foreground font-semibold text-[11px]">Owner: {gate.owner}</p>
            </div>
          ))}

          <div className="bg-akamai-green/10 border border-akamai-green/30 rounded p-3 text-sm space-y-2">
            <p className="font-semibold text-akamai-green flex items-center gap-2">
              <CheckCircle2 size={14} />
              Gate Principle: Explicit Pass/Fail
            </p>
            <p className="text-akamai-green/80">
              No ambiguous "proceed with caution." Gates are pass/fail. Gate owner has authority to block next phase if criteria not met. Removes finger-pointing later.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamCoordinationViewer;
