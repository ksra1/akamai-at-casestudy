import { useState } from "react";
import SlideLayout from "./SlideLayout";
import CalloutModal from "./CalloutModal";
import { AlertTriangle, ArrowRight, ArrowUpRight, Users } from "lucide-react";

const risks = [
  { id: 1, risk: "Customer skips testing — production issues", likelihood: 4, impact: 4, mitigation: "Phased hostname cohorts via DNS CNAME cutover. mPulse anomaly alerts trigger instant rollback. Each wave validated before next begins." },
  { id: 2, risk: "30-day timeline too aggressive", likelihood: 3, impact: 4, mitigation: "Template-based automation reduces per-hostname effort to minutes. Terraform pipelines for batch operations. Prioritize revenue-critical hostnames in Wave 1." },
  { id: 3, risk: "New teams cause misconfigurations", likelihood: 4, impact: 3, mitigation: "Locked-down golden templates with limited overrides. Week 1 mandatory training. Code review for template modifications. Role-based access in Property Manager." },
  { id: 4, risk: "WAF false positives block traffic", likelihood: 3, impact: 5, mitigation: "Alert-only mode first 7 days. Adaptive Security Engine auto-tuning. Per-hostname exception policies. Rapid response runbook for false positive escalation." },
  { id: 5, risk: "Bot evasion bypasses detection", likelihood: 3, impact: 3, mitigation: "Bot Manager Premier behavioral ML adapts continuously. 48-72h monitoring baseline before enforcement. Crypto challenges for gray-area traffic." },
];

const raciData = [
  { activity: "Template Design", r: "Akamai Delivery Team", a: "Akamai TPM (Me)", c: "AT Retailers Technical Lead", i: "AT Dev Teams" },
  { activity: "Bulk Onboarding", r: "Akamai Delivery Team", a: "Akamai TPM (Me)", c: "AT IT Operations", i: "AT Business Stakeholders" },
  { activity: "Cert Provisioning", r: "Akamai Delivery Team", a: "Akamai TPM (Me)", c: "AT IT Security", i: "AT Dev Teams" },
  { activity: "WAF Configuration", r: "Akamai Security Team", a: "Akamai TPM (Me)", c: "AT SecOps Team", i: "AT Dev Teams" },
  { activity: "Bot Manager Setup", r: "Akamai Security Team", a: "Akamai TPM (Me)", c: "AT E-commerce Team", i: "AT Business Stakeholders" },
  { activity: "DNS Cutover", r: "AT IT Operations", a: "Akamai TPM (Me)", c: "Akamai Delivery Team", i: "AT Business Owners" },
  { activity: "Training & Enablement", r: "Akamai TPM (Me)", a: "AT Retailers Technical Lead", c: "Akamai PS Team", i: "All AT Teams" },
  { activity: "Go-Live Approval", r: "Akamai TPM (Me)", a: "AT Retailers Technical Lead", c: "All Teams", i: "Executive Sponsors" },
];

const RiskSlide = () => {
  const [riskModal, setRiskModal] = useState<number | null>(null);

  return (
    <SlideLayout id="risk" variant="alt" pageNumber={9}>
      <div className="space-y-5">
        <div>
          <p className="text-accent font-semibold tracking-[0.2em] uppercase text-xs mb-2">Section A — Governance</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Risk & Change Management</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="clean-card p-5">
            <h3 className="font-display font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
              <AlertTriangle size={14} className="text-accent" /> Risk Matrix
            </h3>
            <div className="relative aspect-square max-w-[240px] mx-auto">
              <div className="absolute inset-0 grid grid-cols-5 grid-rows-5">
                {Array.from({ length: 25 }).map((_, i) => {
                  const row = Math.floor(i / 5);
                  const col = i % 5;
                  const severity = (4 - row) + col;
                  const bg = severity >= 6 ? "bg-destructive/8" : severity >= 4 ? "bg-accent/8" : severity >= 2 ? "bg-yellow-500/5" : "bg-akamai-green/5";
                  return <div key={i} className={`${bg} border border-border/50`} />;
                })}
              </div>
              {risks.map(r => (
                <button
                  key={r.id}
                  onClick={() => setRiskModal(r.id)}
                  className="absolute w-7 h-7 rounded bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shadow-md hover:scale-110 transition-transform"
                  style={{
                    left: `${(r.likelihood - 0.5) * 20}%`,
                    bottom: `${(r.impact - 0.5) * 20}%`,
                    transform: "translate(-50%, 50%)",
                  }}
                >
                  {r.id}
                </button>
              ))}
              <div className="absolute -bottom-5 left-0 right-0 text-center text-xs text-muted-foreground">Likelihood →</div>
              <div className="absolute -left-5 top-0 bottom-0 flex items-center">
                <span className="text-xs text-muted-foreground -rotate-90 whitespace-nowrap">Impact →</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {risks.map(r => (
              <div key={r.id} onClick={() => setRiskModal(r.id)} className="stripe-card callout-badge p-3 flex items-center gap-3">
                <div className="bg-primary w-6 h-6 rounded flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0">{r.id}</div>
                <p className="text-sm text-foreground/70 flex-1">{r.risk}</p>
                <ArrowUpRight size={12} className="text-muted-foreground/30 shrink-0" />
              </div>
            ))}
          </div>
        </div>

        <div className="clean-card p-4 overflow-x-auto">
          <h3 className="font-display font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
            <Users size={14} className="text-primary" /> RACI Matrix
          </h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-2 text-xs font-semibold text-muted-foreground">Activity</th>
                <th className="p-2 text-center"><span className="bg-primary text-primary-foreground px-1.5 py-0.5 rounded text-[11px] font-bold">R</span></th>
                <th className="p-2 text-center"><span className="bg-accent text-accent-foreground px-1.5 py-0.5 rounded text-[11px] font-bold">A</span></th>
                <th className="p-2 text-center"><span className="bg-akamai-green text-primary-foreground px-1.5 py-0.5 rounded text-[11px] font-bold">C</span></th>
                <th className="p-2 text-center"><span className="bg-muted text-muted-foreground px-1.5 py-0.5 rounded text-[11px] font-bold">I</span></th>
              </tr>
            </thead>
            <tbody>
              {raciData.map(row => (
                <tr key={row.activity} className="border-b border-border/50">
                  <td className="p-2 font-medium text-foreground/70 text-xs">{row.activity}</td>
                  <td className="p-2 text-center text-xs text-muted-foreground">{row.r}</td>
                  <td className="p-2 text-center text-xs text-muted-foreground">{row.a}</td>
                  <td className="p-2 text-center text-xs text-muted-foreground">{row.c}</td>
                  <td className="p-2 text-center text-xs text-muted-foreground">{row.i}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="clean-card p-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-center mb-2">Akamai Escalation Path</p>
          <div className="flex justify-center items-center gap-3">
            {[
              { level: "Akamai TPM (Me)", desc: "First response & coordination" },
              { level: "Account Director", desc: "Commercial decisions" },
              { level: "VP", desc: "Executive override" },
            ].map((item, i) => (
              <div key={item.level} className="flex items-center gap-3">
                <div className="text-center">
                  <div className="clean-card text-foreground/70 px-3 py-1.5 font-semibold text-sm">{item.level}</div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
                {i < 2 && <ArrowRight size={14} className="text-accent" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {risks.map(r => (
        <CalloutModal key={r.id} open={riskModal === r.id} onOpenChange={() => setRiskModal(null)} title={`Risk #${r.id}: ${r.risk}`}>
          <div className="bg-primary/5 border border-primary/15 rounded p-4">
            <p className="text-sm font-semibold text-primary mb-1">Mitigation Strategy</p>
            <p className="text-sm">{r.mitigation}</p>
          </div>
        </CalloutModal>
      ))}
    </SlideLayout>
  );
};

export default RiskSlide;
