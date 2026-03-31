import { useState } from "react";
import { Globe, Server, TrendingDown, RefreshCw, CheckCircle2, AlertTriangle, BarChart3 } from "lucide-react";

const MultiGeographyViewer = () => {
  const [activeTab, setActiveTab] = useState<"regions" | "failover" | "capacity">("regions");

  const regions = [
    {
      name: "Europe",
      primary: "Frankfurt, Germany",
      secondary: "London, UK",
      latencyThreshold: "300ms",
      healthCheck: "Every 60s",
      detail: "Primary: Frankfurt origin (main EU datacenter). Secondary: London as failover. Monitor: TLS handshake time + request latency.",
      icon: <Globe size={20} className="text-primary" />,
    },
    {
      name: "North America",
      primary: "Virginia, USA",
      secondary: "Oregon, USA",
      latencyThreshold: "250ms",
      healthCheck: "Every 60s",
      detail: "Primary: Virginia (East Coast, low latency to major US metros). Secondary: Oregon (West Coast backup). Monitor: origin response time + CPU utilization.",
      icon: <Server size={20} className="text-akamai-electric" />,
    },
    {
      name: "LATAM",
      primary: "São Paulo, Brazil",
      secondary: "Miami, USA",
      latencyThreshold: "350ms",
      healthCheck: "Every 60s",
      detail: "Primary: São Paulo (regional hub, local compliance). Secondary: Miami (fast fallback). Monitor: regional traffic demand patterns.",
      icon: <Globe size={20} className="text-akamai-violet" />,
    },
  ];

  const failoverScenarios = [
    {
      scenario: "Primary origin latency spike (300ms → 500ms)",
      detection: "GTM detects at 2nd health check (120 seconds)",
      action: "Traffic allocation shifts: 100% to primary → 80% primary + 20% secondary → full secondary if latency stays high",
      timeline: "Detection: 60-120s. Shift to secondary: 10-15s (DNS TTL). Full failover: <2 min.",
      result: "Users experience slight latency increase, no errors. No manual intervention.",
    },
    {
      scenario: "Primary origin completely down (connection timeout)",
      detection: "GTM connection test fails immediately",
      action: "All traffic routes to secondary instantly. Akamai alerts ops team.",
      timeline: "Detection: 5-10s. Switchover: <10s. Alert: instant.",
      result: "Zero downtime. Legitimate scenarios: datacenter power loss, network partition.",
    },
    {
      scenario: "Secondary also degraded (both 500ms+ latency)",
      detection: "GTM detects both origins > threshold",
      action: "Akamai escalates to fallback region (e.g., Miami instead of Oregon). mPulse shows user impact.",
      timeline: "Detection: 60-120s. Cross-region failover: 30-60s.",
      result: "Users routed to next best origin, some latency increase, but no errors.",
    },
    {
      scenario: "Cascading failure: EU primary down, secondary at capacity",
      detection: "GTM sees EU primary down + secondary queue building",
      action: "GTM can burst secondary up to 150% capacity (short-term). If queue exceeds threshold, activate waiting room (EdgeWorkers) to queue users.",
      timeline: "Detection: 60s. Activation of queue: <10s.",
      result: "Secondary temporarily overloaded, users queued at edge. Origin stays protected.",
    },
  ];

  const capacityMetrics = [
    {
      metric: "Traffic Distribution (Normal)",
      value: "EU: 40%, NA: 50%, LATAM: 10%",
      detail: "Based on sessions + historical patterns.",
    },
    {
      metric: "Peak Capacity (per region)",
      value: "EU: 50K req/sec, NA: 75K req/sec, LATAM: 15K req/sec",
      detail: "Max origin capacity before degradation. Determined by origin benchmarking.",
    },
    {
      metric: "Utilization Target",
      value: "Keep <70% of capacity during peak",
      detail: "Headroom for spikes + failover scenarios.",
    },
    {
      metric: "Latency Baseline",
      value: "EU: 100ms, NA: 80ms, LATAM: 150ms",
      detail: "Normal origin response time (without user geography latency).",
    },
    {
      metric: "Alert Thresholds",
      value: "EU: 300ms, NA: 250ms, LATAM: 350ms",
      detail: "When exceeded, GTM starts considering failover.",
    },
  ];

  const dataStreamMetrics = [
    {
      metric: "Real-time Traffic Trends",
      description: "DataStream shows traffic per region per hour",
      detail: "Identify peak times: EU peaks 9-11 AM CET, NA peaks 12-2 PM EST, LATAM peaks 3-5 PM BRT",
      decision: "Pre-scale origin capacity 30 min before peak",
    },
    {
      metric: "Origin Utilization %",
      description: "CPU, memory, network I/O per region",
      detail: "Frankfurt CPU trending 65% → 75%? Likely to breach threshold in 2h",
      decision: "Add capacity or trigger early failover to London",
    },
    {
      metric: "Geographic Error Rate",
      description: "5xx errors by region",
      detail: "LATAM showing 2% error rate (normal 0.1%)? Investigate secondary vs fallback.",
      decision: "Increase fallback capacity to Miami",
    },
    {
      metric: "Failover History",
      description: "How often does each secondary activate?",
      detail: "London activated 3x last month. Pattern? Or one-off issue?",
      decision: "Schedule capacity review for EU primary",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Tab Switcher */}
      <div className="flex gap-2 border-b flex-wrap">
        <button
          onClick={() => setActiveTab("regions")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "regions"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Regional Strategy
        </button>
        <button
          onClick={() => setActiveTab("failover")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "failover"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Failover Scenarios
        </button>
        <button
          onClick={() => setActiveTab("capacity")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "capacity"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Capacity Planning
        </button>
      </div>

      {/* TAB 1: Regional Strategy */}
      {activeTab === "regions" && (
        <div className="space-y-3">
          {regions.map((region, idx) => (
            <div key={idx} className="bg-muted/40 border border-border/50 rounded p-3 text-xs space-y-2">
              <div className="flex items-center gap-2 mb-2">
                {region.icon}
                <h4 className="font-semibold text-foreground">{region.name}</h4>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-muted-foreground mb-1">🟦 Primary</p>
                  <p className="font-semibold text-foreground text-[12px]">{region.primary}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">🟧 Secondary</p>
                  <p className="font-semibold text-foreground text-[12px]">{region.secondary}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-muted-foreground text-[11px]">Latency Threshold</p>
                  <p className="font-mono font-bold text-accent text-[12px]">{region.latencyThreshold}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-[11px]">Health Check</p>
                  <p className="font-mono font-bold text-primary text-[12px]">{region.healthCheck}</p>
                </div>
              </div>

              <div className="bg-background rounded p-2 border border-border/50">
                <p className="text-muted-foreground">{region.detail}</p>
              </div>
            </div>
          ))}

          <div className="bg-accent/10 border border-accent/30 rounded p-3 text-xs space-y-2">
            <p className="font-semibold text-accent">Configuration Details</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>• <strong>Health Check Method:</strong> HTTP GET to /health endpoint, measure response latency + verify 200 OK</li>
              <li>• <strong>Failover Decision:</strong> If primary exceeds threshold for 2 consecutive checks (120s), shift 20% traffic to secondary</li>
              <li>• <strong>Traffic Ramping:</strong> Gradual shift (not instant) to avoid overwhelming secondary with spike</li>
              <li>• <strong>Recovery:</strong> Once primary recovers &lt;threshold for 3 checks, gradually shift traffic back (full recovery 5-10 min)</li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 2: Failover Scenarios */}
      {activeTab === "failover" && (
        <div className="space-y-3">
          {failoverScenarios.map((scenario, idx) => (
            <div key={idx} className="bg-muted/40 border border-border/50 rounded p-3 text-xs space-y-2">
              <h4 className="font-semibold text-foreground">{scenario.scenario}</h4>

              <div className="bg-background rounded p-2 border border-border/50 space-y-1">
                <p className="text-muted-foreground">
                  <strong>Detection:</strong> {scenario.detection}
                </p>
                <p className="text-muted-foreground">
                  <strong>Action:</strong> {scenario.action}
                </p>
                <p className="text-muted-foreground">
                  <strong>Timeline:</strong> {scenario.timeline}
                </p>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-akamai-green shrink-0 mt-0.5" />
                <p className="text-akamai-green font-semibold">{scenario.result}</p>
              </div>
            </div>
          ))}

          <div className="bg-destructive/10 border border-destructive/30 rounded p-3 text-xs space-y-2">
            <p className="font-semibold text-destructive flex items-center gap-2">
              <AlertTriangle size={14} />
              Cascading Failure Prevention
            </p>
            <ul className="space-y-1 text-destructive/80">
              <li>• <strong>Never send &gt;80% capacity to single origin:</strong> Reserve headroom for spikes</li>
              <li>• <strong>Monitor secondary + tertiary:</strong> Don't assume secondary is healthy; verify before failover</li>
              <li>• <strong>Test failover quarterly:</strong> Actually fail over to secondary to verify it's ready</li>
              <li>• <strong>Geographic diversity:</strong> Secondaries in different availability zones to survive regional outages</li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 3: Capacity Planning & DataStream */}
      {activeTab === "capacity" && (
        <div className="space-y-3">
          {/* Capacity Metrics */}
          <div className="bg-accent/10 border border-accent/30 rounded p-3 text-xs space-y-2 mb-2">
            <p className="font-semibold text-accent">Baseline Capacity Metrics</p>
            {capacityMetrics.map((m, idx) => (
              <div key={idx} className="bg-background rounded p-2 border border-border/50">
                <p className="font-semibold text-foreground mb-1">{m.metric}</p>
                <p className="text-foreground font-mono text-[11px] mb-1">{m.value}</p>
                <p className="text-muted-foreground text-[11px] italic">{m.detail}</p>
              </div>
            ))}
          </div>

          {/* DataStream Insights */}
          <div className="space-y-2">
            <p className="font-semibold text-foreground text-xs">DataStream Real-Time Insights</p>
            {dataStreamMetrics.map((metric, idx) => (
              <div key={idx} className="bg-muted/40 border border-border/50 rounded p-2 text-xs space-y-1">
                <h5 className="font-semibold text-foreground">{metric.metric}</h5>
                <p className="text-muted-foreground">{metric.description}</p>
                <div className="bg-background rounded p-1.5 border border-border/50">
                  <p className="text-muted-foreground text-[11px] mb-1">{metric.detail}</p>
                  <p className="font-semibold text-accent text-[11px]">→ {metric.decision}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-akamai-green/10 border border-akamai-green/30 rounded p-3 text-xs space-y-2">
            <p className="font-semibold text-akamai-green flex items-center gap-2">
              <CheckCircle2 size={14} />
              Capacity Planning Workflow
            </p>
            <ol className="space-y-1 text-akamai-green/80">
              <li><strong>1. Monthly review:</strong> Analyze DataStream reports for traffic trends per region</li>
              <li><strong>2. Identify peaks:</strong> When does each region hit &gt;70% capacity?</li>
              <li><strong>3. Schedule capacity adds:</strong> Provision VM/cloud instances 2 weeks before expected peak</li>
              <li><strong>4. Test failover:</strong> Ensure secondaries can handle surge if primary goes down during peak</li>
              <li><strong>5. Update thresholds:</strong> As capacity grows, adjust latency thresholds to maintain 70% target</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiGeographyViewer;
