import { useState } from "react";
import SlideLayout from "./SlideLayout";
import CalloutModal from "./CalloutModal";
import { AlertTriangle, ArrowUpRight, Users } from "lucide-react";

const risks = [
  { id: 1, risk: "Customer pushes straight to prod", likelihood: 4, impact: 4, mitigation: "Phased wave rollout — 500 → 1,500 → 3,000 hostnames. mPulse monitors each wave. DNS-based rollback in minutes. No formal QA needed, but safety is built in." },
  { id: 2, risk: "30-day timeline is too tight", likelihood: 3, impact: 4, mitigation: "Template automation makes per-hostname work take minutes, not hours. Revenue-critical hostnames go first in Wave 1. If timeline slips, the most important properties are already live." },
  { id: 3, risk: "New teams misconfigure properties", likelihood: 4, impact: 3, mitigation: "Golden templates with locked base rules. Teams extend but can't break the foundation. Week 1 training. Role-based access limits who can do what." },
  { id: 4, risk: "WAF false positives block real traffic", likelihood: 3, impact: 5, mitigation: "Alert-only mode for 7 days. Adaptive Security Engine learns the traffic pattern. Per-hostname exception policies. Rapid response runbook for escalation." },
  { id: 5, risk: "Bots evolve around detection", likelihood: 3, impact: 3, mitigation: "Bot Manager Premier uses behavioral ML that adapts continuously. 48-72h monitoring baseline before enforcement. Crypto challenges for gray-area traffic." },
];

const raciData = [
  { activity: "Template Design", r: "Akamai Delivery", a: "TPM (Me)", c: "AT Tech Lead", i: "AT Dev Teams" },
  { activity: "Bulk Onboarding", r: "Akamai Delivery", a: "TPM (Me)", c: "AT IT Ops", i: "AT Stakeholders" },
  { activity: "Cert Provisioning", r: "Akamai Delivery", a: "TPM (Me)", c: "AT IT Security", i: "AT Dev Teams" },
  { activity: "WAF Config", r: "Akamai Security", a: "TPM (Me)", c: "AT SecOps", i: "AT Dev Teams" },
  { activity: "Bot Manager", r: "Akamai Security", a: "TPM (Me)", c: "AT E-commerce", i: "AT Stakeholders" },
  { activity: "DNS Cutover", r: "AT IT Ops", a: "TPM (Me)", c: "Akamai Delivery", i: "AT Biz Owners" },
  { activity: "Training", r: "TPM (Me)", a: "AT Tech Lead", c: "Akamai PS", i: "All AT Teams" },
  { activity: "Go-Live Approval", r: "TPM (Me)", a: "AT Tech Lead", c: "All Teams", i: "Exec Sponsors" },
];

const RiskSlide = () => {
  const [riskModal, setRiskModal] = useState<number | null>(null);

  return (
    <SlideLayout id="risk" variant="alt" pageNumber={9}>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <p className="text-accent font-semibold tracking-widest uppercase text-sm">Section A — Being Honest About Risk</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">What Could Go Wrong</h2>
          <p className="text-sm text-muted-foreground">And exactly how we'll handle it.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Risk Matrix */}
          <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <h3 className="font-display font-semibold text-secondary mb-4 flex items-center gap-2">
              <AlertTriangle size={18} className="text-accent" /> Risk Heat Map
            </h3>
            <div className="relative aspect-square max-w-[280px] mx-auto">
              <div className="absolute inset-0 grid grid-cols-5 grid-rows-5">
                {Array.from({ length: 25 }).map((_, i) => {
                  const row = Math.floor(i / 5);
                  const col = i % 5;
                  const severity = (4 - row) + col;
                  const bg = severity >= 6 ? "bg-destructive/15" : severity >= 4 ? "bg-accent/10" : severity >= 2 ? "bg-yellow-500/8" : "bg-akamai-green/8";
                  return <div key={i} className={`${bg} border border-border/30`} />;
                })}
              </div>
              {risks.map(r => (
                <button
                  key={r.id}
                  onClick={() => setRiskModal(r.id)}
                  className="absolute w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs font-bold shadow-lg hover:scale-110 transition-transform"
                  style={{
                    left: `${(r.likelihood - 0.5) * 20}%`,
                    bottom: `${(r.impact - 0.5) * 20}%`,
                    transform: "translate(-50%, 50%)",
                  }}
                >
                  {r.id}
                </button>
              ))}
              <div className="absolute -bottom-5 left-0 right-0 text-center text-[10px] text-muted-foreground">Likelihood →</div>
              <div className="absolute -left-5 top-0 bottom-0 flex items-center">
                <span className="text-[10px] text-muted-foreground -rotate-90 whitespace-nowrap">Impact →</span>
              </div>
            </div>
          </div>

          {/* Risk list */}
          <div className="space-y-2">
            {risks.map(r => (
              <div
                key={r.id}
                onClick={() => setRiskModal(r.id)}
                className="visual-card bg-card rounded-lg p-3 border border-border shadow-sm cursor-pointer flex items-center gap-3"
              >
                <div className="bg-secondary w-7 h-7 rounded-full flex items-center justify-center text-secondary-foreground text-xs font-bold shrink-0">{r.id}</div>
                <p className="text-sm font-medium text-secondary flex-1">{r.risk}</p>
                <ArrowUpRight size={14} className="text-muted-foreground/30 shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* RACI */}
        <div className="bg-card rounded-xl p-5 border border-border shadow-sm overflow-x-auto">
          <h3 className="font-display font-semibold text-secondary mb-3 flex items-center gap-2">
            <Users size={16} className="text-primary" /> Who Does What — RACI
          </h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-2 text-xs font-semibold text-secondary">Activity</th>
                <th className="p-2 text-center"><span className="bg-primary text-primary-foreground px-2 py-0.5 rounded text-[10px] font-bold">R</span></th>
                <th className="p-2 text-center"><span className="bg-accent text-accent-foreground px-2 py-0.5 rounded text-[10px] font-bold">A</span></th>
                <th className="p-2 text-center"><span className="bg-akamai-green text-primary-foreground px-2 py-0.5 rounded text-[10px] font-bold">C</span></th>
                <th className="p-2 text-center"><span className="bg-muted text-muted-foreground px-2 py-0.5 rounded text-[10px] font-bold">I</span></th>
              </tr>
            </thead>
            <tbody>
              {raciData.map(row => (
                <tr key={row.activity} className="border-b border-border/50">
                  <td className="p-2 font-medium text-secondary text-xs">{row.activity}</td>
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
          <div className="flex items-center gap-2 text-xs">
            {["Team Lead", "TPM (Me)", "Account Director", "VP Escalation"].map((level, i) => (
              <div key={level} className="flex items-center gap-2">
                <div className="bg-secondary text-secondary-foreground px-3 py-1.5 rounded-lg font-semibold">{level}</div>
                {i < 3 && <ArrowUpRight size={14} className="text-accent" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {risks.map(r => (
        <CalloutModal key={r.id} open={riskModal === r.id} onOpenChange={() => setRiskModal(null)} title={`Risk #${r.id}: ${r.risk}`}>
          <div className="space-y-3">
            <div className="bg-primary/8 border border-primary/20 rounded-lg p-4">
              <p className="text-sm font-semibold text-primary mb-1">How we handle it</p>
              <p className="text-sm">{r.mitigation}</p>
            </div>
          </div>
        </CalloutModal>
      ))}
    </SlideLayout>
  );
};

export default RiskSlide;
