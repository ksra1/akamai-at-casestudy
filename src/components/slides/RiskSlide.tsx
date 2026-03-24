import { useState } from "react";
import SlideLayout from "./SlideLayout";
import CalloutModal from "./CalloutModal";
import { AlertTriangle, ArrowUpRight, Users, ShieldAlert } from "lucide-react";

const risks = [
  { id: 1, risk: "Customer skips testing — production issues", likelihood: "High", impact: "Critical", x: 4, y: 4, mitigation: "Canary deployments via GTM (10% → 50% → 100%). Instant rollback capability. mPulse anomaly alerts. Present data showing 3x faster issue detection with staged rollout." },
  { id: 2, risk: "30-day timeline too aggressive for 5,000 hostnames", likelihood: "Medium", impact: "High", x: 3, y: 4, mitigation: "Template-based automation reduces per-hostname effort to minutes. Terraform pipelines for batch operations. Prioritize revenue-critical hostnames in Wave 1. Negotiate buffer for long-tail edge cases." },
  { id: 3, risk: "New teams cause misconfigurations", likelihood: "High", impact: "High", x: 4, y: 3, mitigation: "Locked-down golden templates with limited override permissions. Mandatory training in Week 1. Code review process for any template modifications. Property Manager role-based access." },
  { id: 4, risk: "WAF false positives block legitimate traffic", likelihood: "Medium", impact: "Critical", x: 3, y: 5, mitigation: "Alert-only mode for first 7 days. Adaptive Security Engine auto-tuning. Per-hostname exception policies. Rapid response runbook for false positive escalation." },
  { id: 5, risk: "Bot evasion bypasses initial detection", likelihood: "Medium", impact: "Medium", x: 3, y: 3, mitigation: "Bot Manager Premier behavioral ML adapts continuously. 48-72 hour monitoring baseline before enforcement. Crypto Challenge for gray-area traffic. Akamai Threat Intelligence feed for known bad actors." },
];

const raciData = [
  { activity: "Template Design", r: "Akamai TPM", a: "AT Retailers CTO", c: "Security Team", i: "Dev Teams" },
  { activity: "Bulk Onboarding", r: "Akamai Delivery", a: "Akamai TPM", c: "AT Retailers IT", i: "Stakeholders" },
  { activity: "WAF Configuration", r: "Akamai Security", a: "Akamai TPM", c: "AT Retailers SecOps", i: "Dev Teams" },
  { activity: "DNS Cutover", r: "AT Retailers IT", a: "Akamai TPM", c: "Akamai Delivery", i: "Business Owners" },
  { activity: "Training", r: "Akamai TPM", a: "AT Retailers Mgmt", c: "Akamai SE", i: "All Teams" },
  { activity: "Go-Live Sign-off", r: "Akamai TPM", a: "AT Retailers CTO", c: "All Teams", i: "Exec Sponsors" },
];

const RiskSlide = () => {
  const [riskModal, setRiskModal] = useState<number | null>(null);

  return (
    <SlideLayout id="risk" variant="alt" pageNumber={13}>
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <p className="text-accent font-semibold tracking-widest uppercase text-sm">Governance</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">Risk & Change Management</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Risk Matrix Visual */}
          <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <h3 className="font-display font-semibold text-secondary mb-4 flex items-center gap-2">
              <AlertTriangle size={18} className="text-accent" /> Risk Matrix
            </h3>
            <div className="relative aspect-square max-w-[300px] mx-auto">
              {/* Grid */}
              <div className="absolute inset-0 grid grid-cols-5 grid-rows-5">
                {Array.from({ length: 25 }).map((_, i) => {
                  const row = Math.floor(i / 5);
                  const col = i % 5;
                  const severity = row + col;
                  const bg = severity >= 6 ? "bg-destructive/20" : severity >= 4 ? "bg-accent/15" : severity >= 2 ? "bg-yellow-500/10" : "bg-akamai-green/10";
                  return <div key={i} className={`${bg} border border-border/50`} />;
                })}
              </div>
              {/* Plot risks */}
              {risks.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRiskModal(r.id)}
                  className="absolute w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs font-bold shadow-lg hover:scale-110 transition-transform callout-badge"
                  style={{
                    left: `${(r.x - 0.5) * 20}%`,
                    bottom: `${(r.y - 0.5) * 20}%`,
                    transform: "translate(-50%, 50%)",
                  }}
                >
                  {r.id}
                </button>
              ))}
              {/* Labels */}
              <div className="absolute -bottom-6 left-0 right-0 text-center text-xs text-muted-foreground">Likelihood →</div>
              <div className="absolute -left-6 top-0 bottom-0 flex items-center">
                <span className="text-xs text-muted-foreground -rotate-90 whitespace-nowrap">Impact →</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-8">Click risk numbers for mitigation details</p>
          </div>

          {/* Risk cards */}
          <div className="space-y-3">
            {risks.map((r) => (
              <div
                key={r.id}
                onClick={() => setRiskModal(r.id)}
                className="callout-badge bg-card rounded-lg p-4 border border-border shadow-sm cursor-pointer hover:shadow-md hover:border-accent/30 transition-all flex items-center gap-3"
              >
                <div className="bg-secondary w-8 h-8 rounded-full flex items-center justify-center text-secondary-foreground text-sm font-bold shrink-0">{r.id}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-secondary truncate">{r.risk}</p>
                  <div className="flex gap-3 text-xs text-muted-foreground mt-0.5">
                    <span>Likelihood: <strong className="text-accent">{r.likelihood}</strong></span>
                    <span>Impact: <strong className="text-destructive">{r.impact}</strong></span>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-muted-foreground/30 shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* RACI Chart */}
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm overflow-x-auto">
          <h3 className="font-display font-semibold text-secondary mb-4 flex items-center gap-2">
            <Users size={18} className="text-primary" /> RACI Matrix
          </h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-2 font-semibold text-secondary">Activity</th>
                <th className="p-2 text-center"><span className="bg-primary text-primary-foreground px-2 py-0.5 rounded text-xs font-bold">R</span></th>
                <th className="p-2 text-center"><span className="bg-accent text-accent-foreground px-2 py-0.5 rounded text-xs font-bold">A</span></th>
                <th className="p-2 text-center"><span className="bg-akamai-green text-primary-foreground px-2 py-0.5 rounded text-xs font-bold">C</span></th>
                <th className="p-2 text-center"><span className="bg-muted text-muted-foreground px-2 py-0.5 rounded text-xs font-bold">I</span></th>
              </tr>
            </thead>
            <tbody>
              {raciData.map((row) => (
                <tr key={row.activity} className="border-b border-border/50">
                  <td className="p-2 font-medium text-secondary">{row.activity}</td>
                  <td className="p-2 text-center text-xs text-muted-foreground">{row.r}</td>
                  <td className="p-2 text-center text-xs text-muted-foreground">{row.a}</td>
                  <td className="p-2 text-center text-xs text-muted-foreground">{row.c}</td>
                  <td className="p-2 text-center text-xs text-muted-foreground">{row.i}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Escalation */}
        <div className="flex justify-center">
          <div className="flex items-center gap-3 text-sm">
            {["Team Lead", "Akamai TPM", "Account Director", "VP Escalation"].map((level, i) => (
              <div key={level} className="flex items-center gap-3">
                <div className="bg-secondary text-secondary-foreground px-3 py-1.5 rounded-lg text-xs font-semibold">{level}</div>
                {i < 3 && <ArrowUpRight size={16} className="text-accent" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Risk Modals */}
      {risks.map((r) => (
        <CalloutModal key={r.id} open={riskModal === r.id} onOpenChange={() => setRiskModal(null)} title={`Risk #${r.id}: ${r.risk}`}>
          <div className="space-y-3">
            <div className="flex gap-4">
              <span className="text-sm">Likelihood: <strong className="text-accent">{r.likelihood}</strong></span>
              <span className="text-sm">Impact: <strong className="text-destructive">{r.impact}</strong></span>
            </div>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <p className="text-sm font-semibold text-primary mb-1">Mitigation Strategy</p>
              <p className="text-sm">{r.mitigation}</p>
            </div>
          </div>
        </CalloutModal>
      ))}
    </SlideLayout>
  );
};

export default RiskSlide;
