import { useState } from "react";
import { AlertTriangle, TrendingUp, CheckCircle2, Clock, Shield } from "lucide-react";

const RiskEscalationViewer = () => {
  const [activeTab, setActiveTab] = useState<"categories" | "triage" | "escalation">("categories");

  const riskCategories = [
    {
      category: "Delivery Risks",
      color: "primary",
      risks: [
        {
          risk: "DNS cutover delays",
          impact: "Waves slip by 1+ week",
          likelihood: "HIGH",
          detection: "Customer DNS team didn't approve CNAME change by deadline",
          mitigation: "Pre-meet with customer DNS team Week 1, get written approval template, buffer 2-day grace period",
        },
        {
          risk: "Certificate provisioning bottleneck",
          impact: "5,000 hostnames pending SAN cluster assembly",
          likelihood: "MEDIUM",
          detection: "CPS shows CA approval <24h, but cert assembly >48h",
          mitigation: "Pre-stage certificate templates, coordinate with CA for expedited issuance",
        },
        {
          risk: "Origin capacity exceeded",
          impact: "Wave cutover causes 5xx errors",
          likelihood: "MEDIUM",
          detection: "mPulse shows error spike >1% immediately after CNAME cutover",
          mitigation: "Capacity test all 5,000 origins before Wave 1. Pre-warn customer if origin hits >70%",
        },
        {
          risk: "Monolith migration incompatibility",
          impact: "New microservices not ready when EdgeWorkers routing activated",
          likelihood: "HIGH",
          detection: "Canary shows persistent 2%+ error rate for 1 hour",
          mitigation: "Canary validation gates: must pass 8h without errors before scaling to 25%",
        },
      ],
    },
    {
      category: "Security Risks",
      color: "accent",
      risks: [
        {
          risk: "Bot attack surge during cutover",
          impact: "Attacker sees Akamai edge IP, targets new surface",
          likelihood: "HIGH",
          detection: "Bot Manager risk scores spike 5x during Wave 1 cutover",
          mitigation: "Pre-activate Bot Manager in monitoring mode Week 0. Have escalation paths ready for rate limit increases",
        },
        {
          risk: "DDoS against edge IPs",
          impact: "Prolexic activates but customer not prepared for attack response",
          likelihood: "MEDIUM",
          detection: "Prolexic triggers, but customer has no incident response plan",
          mitigation: "Run DDoS simulation in Week 1 with Prolexic team. Validate customer escalation contacts",
        },
        {
          risk: "Data isolation misconfiguration",
          impact: "Multi-tenant requests routed to wrong customer origin",
          likelihood: "LOW",
          detection: "Security audit reveals GTM or EdgeWorkers routing rule ambiguity",
          mitigation: "Pre-cutover security review of all routing rules. Test with canary traffic to 5 pilot customers",
        },
        {
          risk: "WAF false positives block legitimate traffic",
          impact: "Customer users can't access checkout (immediate revenue loss)",
          likelihood: "MEDIUM",
          detection: "mPulse shows sharp error rate increase on checkout endpoints",
          mitigation: "WAF tuning window: 7-day alert-only mode. Bypass list prepared before enforcement",
        },
      ],
    },
    {
      category: "Organizational Risks",
      color: "akamai-green",
      risks: [
        {
          risk: "Timezone gaps cause escalation delays",
          impact: " Critical incident at 2 AM happens with no on-call response for 1+ hour",
          likelihood: "MEDIUM",
          detection: "Incident happens during night hours when on-call engineer doesn't respond",
          mitigation: "24x7 on-call rotation defined, with clear escalation to Ops Manager. Oncall paged via phone, not Slack",
        },
        {
          risk: "Stakeholder misalignment on priorities",
          impact: "Customer wants speed, Akamai ops wants caution. Conflict during Wave delays",
          likelihood: "HIGH",
          detection: "Standoffs: 'Customer wants 2-day waves, Akamai recommends 7-day stabilization'",
          mitigation: "Alignment meeting (Kickoff Week 0): set expectations upfront. Document decision criteria in writing",
        },
        {
          risk: "Team burnout from intense 30-day sprint",
          impact: "Post-launch support weak. Preventable incidents escalate",
          likelihood: "MEDIUM",
          detection: "Team morale survey after Week 2–3 shows stress levels >7/10",
          mitigation: "Rotating on-call duties, no mandatory after-hours during non-crisis weeks, team celebration after Wave 1 success, structured rest/knowledge transfer in Week 4",
        },
      ],
    },
  ];

  const triageProcess = [
    {
      step: 1,
      entry: "New risk identified (from standup, customer feedback, or simulation)",
      action: "Log in risk register: category, probability, impact, root cause",
      owner: "Delivery TPM",
      timing: "Immediately (same day)",
    },
    {
      step: 2,
      entry: "Risk rated: P (Probability: Low/Med/High) × I (Impact: Low/Med/High) = Score",
      action: "P1 (High×High): escalate to steering committee next meeting. P2 (Med×Med or High×Low): mitigate immediately. P3 (Low×Low): log but don't block",
      owner: "TPM + Ops Manager",
      timing: "Within 24 hours",
    },
    {
      step: 3,
      entry: "P1 risk requires mitigation plan or acceptance by steering committee",
      action: "Mitigation: reduce probability (training, testing) or impact (fallback plan). Acceptance: acknowledge risk, proceed anyway",
      owner: "Risk owner + Steering Committee",
      timing: "Within 48 hours for P1",
    },
    {
      step: 4,
      entry: "Mitigated risk monitored for resolution",
      action: "If mitigation eliminates/reduces risk: mark resolved. If risk crystallizes (happens): activate response plan",
      owner: "Delivery TPM",
      timing: "Ongoing (re-assess weekly)",
    },
  ];

  const escalationPathways = [
    {
      sensor: "Wave Validation Fails (error rate >1%)",
      detect: "mPulse dashboard shows error spike immediately after DNS cutover",
      response: "TPM pauses cutover, reverts DNS CNAME (instant rollback)",
      escalation: "Ops Manager notified. Is this fixable in 2 hours or needs 48-hour investigation?",
      decision: "< 2h fix = proceed with wave next day. > 48h = escalate to steering, may delay entire timeline",
    },
    {
      sensor: "Security Incident (bot attack 5x baseline)",
      detect: "Bot Manager alerts, rate spike visible in DataStream",
      response: "Security TPM increases rate limit thresholds, enables escalated CAPTCHA",
      escalation: "If still surging after 30 min: page Akamai Security Engineering + Escalation Manager",
      decision: "Engineering advises IP blacklist list scope. Escalation Manager coordinates customer + legal if needed",
    },
    {
      sensor: "Capacity Warning (origin at 80%)",
      detect: "mPulse tracks origin CPU/memory, GTM health checks see latency spike",
      response: "Ops Manager contacts customer: 'Add capacity or we auto-failover to secondary'",
      escalation: "If customer refuses + continues customer cutover next wave: escalate to steering. Decision: proceed anyway or halt?",
      decision: "Risk acceptance documented. Steering owns customer relationship if incident happens",
    },
    {
      sensor: "Off-hours Critical Incident (2 AM, unplanned)",
      detect: "On-call engineer paged by Prolexic/Bot Manager/mPulse alert",
      response: "On-call activates war room, pages Ops Manager for command",
      escalation: "Ops Manager judges: Akamai engineering support needed? Customer need to wake up?",
      decision: "War room continues until issue resolved or escalated to steering + customer in morning",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Tab Switcher */}
      <div className="flex gap-2 border-b flex-wrap">
        <button
          onClick={() => setActiveTab("categories")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "categories"
              ? "border-b-2 border-akamai-green text-akamai-green"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Risk Categories
        </button>
        <button
          onClick={() => setActiveTab("triage")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "triage"
              ? "border-b-2 border-akamai-green text-akamai-green"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Triage Process
        </button>
        <button
          onClick={() => setActiveTab("escalation")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "escalation"
              ? "border-b-2 border-akamai-green text-akamai-green"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Escalation Pathways
        </button>
      </div>

      {/* TAB 1: Risk Categories */}
      {activeTab === "categories" && (
        <div className="space-y-3">
          {riskCategories.map((category, catIdx) => (
            <div key={catIdx} className="space-y-2">
              <div className={`flex items-center gap-2 px-3 py-2 rounded font-semibold text-xs bg-${category.color}/10 text-${category.color}`}>
                <AlertTriangle size={14} />
                {category.category}
              </div>

              {category.risks.map((risk, riskIdx) => (
                <div key={riskIdx} className="bg-muted/40 border border-border/50 rounded p-3 ml-2 text-sm space-y-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h5 className="font-semibold text-foreground">{risk.risk}</h5>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded whitespace-nowrap ${
                      risk.likelihood === "HIGH" ? "bg-destructive/20 text-destructive" :
                      risk.likelihood === "MEDIUM" ? "bg-accent/20 text-accent" :
                      "bg-akamai-green/20 text-akamai-green"
                    }`}>
                      {risk.likelihood}
                    </span>
                  </div>

                  <div className="space-y-1 text-muted-foreground">
                    <p>
                      <strong>Impact:</strong> {risk.impact}
                    </p>
                    <p>
                      <strong>Detection:</strong> {risk.detection}
                    </p>
                  </div>

                  <div className="bg-background rounded p-2 border border-border/50 mt-2">
                    <p className="text-foreground font-semibold text-[11px] mb-1">Mitigation:</p>
                    <p className="text-muted-foreground text-[11px]">{risk.mitigation}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: Triage Process */}
      {activeTab === "triage" && (
        <div className="space-y-3">
          {triageProcess.map((triage) => (
            <div key={triage.step} className="flex gap-3">
              {/* Step number */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center shrink-0 font-bold text-xs text-accent">
                  {triage.step}
                </div>
                {triage.step < 4 && <div className="w-0.5 h-20 bg-accent/20 my-1" />}
              </div>

              {/* Content */}
              <div className="flex-1 pb-3">
                <div className="bg-muted/40 rounded p-2 border border-border/50 text-sm space-y-1 mb-2">
                  <p className="text-muted-foreground">
                    <strong>Entry:</strong> {triage.entry}
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Action:</strong> {triage.action}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">
                      <strong>Owner</strong>
                    </p>
                    <p className="text-foreground font-semibold">{triage.owner}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">
                      <strong>Timeline</strong>
                    </p>
                    <p className="text-foreground font-mono text-[11px]">{triage.timing}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-primary/10 border border-primary/30 rounded p-3 text-sm space-y-2">
            <p className="font-semibold text-primary">Triage Principle: Fast, Decisive</p>
            <p className="text-primary/80">
              P1 risks get steering approval within 48 hours. No ambiguous "we'll discuss it." Escalation is pre-approved. Owner has authority to mitigate without consensus.
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: Escalation Pathways */}
      {activeTab === "escalation" && (
        <div className="space-y-3">
          {escalationPathways.map((pathway, idx) => (
            <div key={idx} className="bg-muted/40 border border-border/50 rounded p-3 text-sm space-y-2">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <AlertTriangle size={14} className="text-destructive" />
                {pathway.sensor}
              </h4>

              <div className="space-y-1 text-muted-foreground">
                <p>
                  <strong>Detection:</strong> {pathway.detect}
                </p>
                <p>
                  <strong>Response:</strong> {pathway.response}
                </p>
              </div>

              <div className="bg-background rounded p-2 border border-border/50 space-y-1">
                <p className="text-muted-foreground mb-1">
                  <strong>Escalation:</strong>
                </p>
                <p className="text-foreground">{pathway.escalation}</p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <CheckCircle2 size={12} className="text-akamai-green" />
                <p className="text-foreground font-semibold text-[11px]">Decision: {pathway.decision}</p>
              </div>
            </div>
          ))}

          <div className="bg-akamai-green/10 border border-akamai-green/30 rounded p-3 text-sm space-y-2">
            <p className="font-semibold text-akamai-green">Escalation Principle: Autonomy + Visibility</p>
            <ul className="space-y-1 text-akamai-green/80">
              <li>• Operators have authority to make decisions in their domain without waiting for approval</li>
              <li>• But all escalations are visible to steering committee in real-time (war room dashboards)</li>
              <li>• Steering makes exception decisions only (e.g., "accept timeline slip" or "roll back entire program")</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskEscalationViewer;
