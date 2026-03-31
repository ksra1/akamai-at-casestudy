import { useState } from "react";
import { Zap, CheckCircle2, AlertTriangle, BarChart3, TrendingDown, RefreshCw } from "lucide-react";

const PhasedRolloutViewer = () => {
  const [activeTab, setActiveTab] = useState<"strategy" | "metrics" | "rollback">("strategy");

  const phases = [
    {
      number: 1,
      title: "Wave 1: Pilot (1,250 hostnames)",
      description: "First cohort to validate golden template in production",
      detail: "Select the 1,250 lowest-risk hostnames. These validate the full config stack before rollout to remaining 3,750.",
      icon: <Zap size={20} className="text-blue-500" />,
      timeline: "Week 2",
    },
    {
      number: 2,
      title: "Wave 2: Scale (2,500 hostnames)",
      description: "Larger cohort with medium to higher traffic volume",
      detail: "Real-world traffic patterns emerge. Validate caching strategy, origin health, WAF effectiveness, and geographic distribution.",
      icon: <TrendingDown size={20} className="text-indigo-500" />,
      timeline: "Week 3",
    },
    {
      number: 3,
      title: "Wave 3: Final (1,250 remaining hostnames)",
      description: "Remaining domains — automated deployment with battle-tested config",
      detail: "Platform is proven. Final hostnames deploy with high confidence and minimal manual oversight.",
      icon: <CheckCircle2 size={20} className="text-green-500" />,
      timeline: "Week 4",
    },
  ];

  const metrics = [
    {
      metric: "Error Rate",
      threshold: "< 0.5%",
      baseline: "Compare to legacy CDN",
      action: "If >0.5%, revert CNAME immediately + post-mortem",
    },
    {
      metric: "Page Load Time (LCP)",
      threshold: "Within 10% of baseline",
      baseline: "Measure at DNS cutover moment",
      action: "If degraded >10%, investigate cache hit ratio + origin latency",
    },
    {
      metric: "Cache Hit Ratio",
      threshold: "> 65% (varies by domain)",
      baseline: "Configure per domain type",
      action: "Low CHR = golden template needs tuning, OR domain is dynamic",
    },
    {
      metric: "Origin Health",
      threshold: "No failed health checks",
      baseline: "Akamai edge checks every 60s",
      action: "Failed checks = potential bot traffic spike or origin issue",
    },
    {
      metric: "5xx Errors",
      threshold: "< 0.1%",
      baseline: "Origin server errors",
      action: "If spike detected, check origin CPU/memory + queue traffic to Akamai",
    },
    {
      metric: "Bot Challenge Count",
      threshold: "< 5% of traffic",
      baseline: "Expected for healthy sites",
      action: "Spike = potential bot attack, escalate to security team",
    },
  ];

  const rollbackScenarios = [
    {
      scenario: "High error rate spike (>1%)",
      diagnosis: "Check origin health, mPulse error type breakdown, WAF block rate",
      rollback:
        "Revert CNAME immediately (instant). Akamai + AT Retailers coordinate to diagnose root cause. Update golden template if needed.",
      timeline: "Decision: <5 mins. Execution: <1 min (DNS timeout)",
    },
    {
      scenario: "LCP degradation (>15% slowdown)",
      diagnosis:
        "Check cache hit ratio (should be >65%), origin latency (check with SureRoute), CDN latency (mPulse breakdown)",
      rollback:
        "If cache hit ratio is low, revert and adjust template. If origin latency spiking, may be customer's infrastructure issue, not Akamai.",
      timeline: "Decision: 5-10 mins. Execution: <1 min",
    },
    {
      scenario: "WAF false positive blocking legitimate users",
      diagnosis:
        "Review Bot Manager/WAF block reasons in Akamai logs. Identify legitimate traffic being flagged.",
      rollback:
        "Security consultant adjusts WAF rules (no CNAME revert needed—rule update applies instantly to edge). Can do mid-wave.",
      timeline: "Decision: <5 mins. Execution: <30 seconds (rule deployment)",
    },
    {
      scenario: "Out-of-memory errors on origin (5xx spike)",
      diagnosis: "Review origin logs—App may not handle Akamai's query pattern (different concurrency than legacy CDN)",
      rollback:
        "Revert CNAME to legacy CDN. Akamai investigates traffic pattern difference, adjusts rate limiting or origin pool strategy.",
      timeline: "Decision: <5 mins. Execution: <1 min",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Tab Switcher */}
      <div className="flex gap-2 border-b flex-wrap">
        <button
          onClick={() => setActiveTab("strategy")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "strategy"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Phased Strategy
        </button>
        <button
          onClick={() => setActiveTab("metrics")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "metrics"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Success Metrics
        </button>
        <button
          onClick={() => setActiveTab("rollback")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "rollback"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Rollback Scenarios
        </button>
      </div>

      {/* TAB 1: Phased Strategy */}
      {activeTab === "strategy" && (
        <div className="space-y-4">
          {/* Vertical Timeline */}
          <div className="space-y-3">
            {phases.map((phase, idx) => (
              <div key={phase.number} className="flex gap-4">
                {/* Timeline connector */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center shrink-0">
                    {phase.icon}
                  </div>
                  {idx < phases.length - 1 && <div className="w-0.5 h-12 bg-primary/20 my-1" />}
                </div>

                {/* Phase content */}
                <div className="flex-1 pt-1 pb-3">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-semibold text-sm text-foreground">{phase.title}</h4>
                    <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-0.5 rounded whitespace-nowrap">
                      {phase.timeline}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{phase.description}</p>
                  <div className="bg-muted/40 rounded p-2 text-sm text-foreground border border-border/50">
                    {phase.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Key Principles */}
          <div className="bg-accent/5 border border-accent/20 rounded p-3 text-sm space-y-2">
            <p className="font-semibold text-accent">Key Testing Principles</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>
                • <strong>Production-first validation:</strong> No separate staging environment needed. Waves = progressive production testing.
              </li>
              <li>
                • <strong>Real-user traffic:</strong> mPulse measures actual user experience, not synthetic tests. You find real issues.
              </li>
              <li>
                • <strong>Instant rollback via DNS:</strong> If any metric fails, revert CNAME in &lt;1 minute. No Akamai config change needed.
              </li>
              <li>
                • <strong>Golden template ≠ one-size-fits-all:</strong> If Wave 1 metrics show low cache hit, adjust template before Wave 2.
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 2: Success Metrics */}
      {activeTab === "metrics" && (
        <div className="space-y-3">
          {metrics.map((m, idx) => (
            <div key={idx} className="bg-muted/40 border border-border/50 rounded p-3 text-xs space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-semibold text-foreground">{m.metric}</h4>
                <span className="inline-block px-2 py-0.5 bg-primary/20 text-primary rounded font-mono text-[11px] font-bold">
                  {m.threshold}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="font-semibold text-foreground mb-1">Baseline</p>
                  <p className="text-muted-foreground">{m.baseline}</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Action if Failed</p>
                  <p className="text-muted-foreground">{m.action}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-destructive/10 border border-destructive/30 rounded p-3 text-xs space-y-2">
            <p className="font-semibold text-destructive flex items-center gap-2">
              <AlertTriangle size={14} />
              Wave Gate Process
            </p>
            <ol className="space-y-1 text-destructive/80">
              <li>
                <strong>1. mPulse green light:</strong> Tech Arch confirms all metrics pass for 24+ hours post-cutover
              </li>
              <li>
                <strong>2. My approval:</strong> I brief AT Retailers leadership on wave health, get sign-off to proceed
              </li>
              <li>
                <strong>3. CNAME cutover:</strong> TPM-DNS + AT Retailers' DNS team coordinate next wave CNAME change
              </li>
              <li>
                <strong>4. If any metric RED:</strong> Revert CNAME, pause wave, post-mortem + template adjustment before retry
              </li>
            </ol>
          </div>
        </div>
      )}

      {/* TAB 3: Rollback Scenarios */}
      {activeTab === "rollback" && (
        <div className="space-y-3">
          {rollbackScenarios.map((scenario, idx) => (
            <div key={idx} className="bg-muted/40 border border-border/50 rounded p-3 text-xs space-y-2">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <RefreshCw size={14} className="text-red-500" />
                {scenario.scenario}
              </h4>

              <div className="grid gap-2 border-t pt-2">
                <div>
                  <p className="font-semibold text-foreground mb-1">Diagnosis</p>
                  <p className="text-muted-foreground">{scenario.diagnosis}</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Rollback Action</p>
                  <p className="text-muted-foreground">{scenario.rollback}</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Timeline</p>
                  <p className="text-red-600 font-semibold">{scenario.timeline}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-akamai-green/10 border border-akamai-green/30 rounded p-3 text-xs space-y-2">
            <p className="font-semibold text-akamai-green flex items-center gap-2">
              <CheckCircle2 size={14} />
              Rollback Confidence
            </p>
            <ul className="space-y-1 text-akamai-green/80">
              <li>
                • <strong>DNS revert is my safety net:</strong> Worst-case, issue detected mid-wave, CNAME reverted within 60 seconds
              </li>
              <li>
                • <strong>No downtime on rollback:</strong> Legacy CDN serves traffic again instantly. No origin impact.
              </li>
              <li>
                • <strong>Root cause capture:</strong> Post-rollback analysis identifies if issue is template (fix for all), domain-specific (exception), or
                origin-side (customer responsibility)
              </li>
              <li>
                • <strong>Retry is painless:</strong> Re-cut CNAME after fix with confidence that similar issue won't recur
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhasedRolloutViewer;
