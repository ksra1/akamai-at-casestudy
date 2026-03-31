import SlideLayout from "./SlideLayout";
import { Users, Clock, TrendingUp } from "lucide-react";

const ResourcePlanSlide = () => {
  const migrationPlan = [
    {
      week: "Week 1",
      domains: 0,
      total: 0,
      phase: "Kickoff & Preparation",
      activities: ["Golden templates", "Team training", "Infrastructure setup"],
      akamai: "TPM (Me), TPM-DNS, Tech Arch, Security",
    },
    {
      week: "Week 2",
      domains: 1250,
      total: 1250,
      phase: "Wave 1 Launch",
      activities: ["Domain validation", "Property creation", "Wave 1 cutover (1,250 hostnames)"],
      akamai: "TPM-DNS (EU lead), Tech Arch, Me (approval)",
    },
    {
      week: "Week 3",
      domains: 2500,
      total: 3750,
      phase: "Waves 2-3 Parallel",
      activities: ["Parallel 3-4 day cutover cycles", "2,500 hostnames", "Apply Wave 1 learnings"],
      akamai: "TPM-DNS (daily ops), Security (threat monitoring)",
    },
    {
      week: "Week 4",
      domains: 1250,
      total: 5000,
      phase: "Wave 3 & Hardening",
      activities: ["Final 1,250 hostnames", "Incident simulation", "Ops handoff"],
      akamai: "All teams (stabilization focus)",
    },
  ];

  const teamRoles = [
    {
      role: "Me (Delivery TPM)",
      timezone: "ET (9 AM - 6 PM)",
      duties: "Program accountability, wave approvals, executive steering, escalations",
      constraint: "🔐 Approval Gate",
      critical: "Wave launch decisions (I hold approval gate)",
    },
    {
      role: "TPM-DNS",
      timezone: "EU morning + US + ET",
      duties: "Property creation, CNAME cutover coordination, domain validation, daily ops",
      constraint: "⏱️ Bottleneck",
      critical: "Coordinates CNAME cutover with AT Retailers DNS ops (24h approval gate on their side)",
    },
    {
      role: "Tech Architect",
      timezone: "US/EU rotation",
      duties: "mPulse monitoring, performance validation, EdgeWorkers, caching",
      constraint: "✅ Go/No-Go Signal",
      critical: "Provides go/no-go signal before each wave (error rate <0.5%)",
    },
    {
      role: "Security Consultant",
      timezone: "US/EU overlap",
      duties: "WAF rules, Bot Manager tuning, threat response, incident analysis",
      constraint: "🛡️ Enforcement Switch",
      critical: "Alert-only mode Week 1-2, then enforce Week 3+",
    },
    {
      role: "India DevOps",
      timezone: "India evening through US evening",
      duties: "Regional infrastructure support, on-call incident response, failover coordination",
      constraint: "🌍 24/7 Coverage",
      critical: "24h on-call rotation for Asia/APAC region cutover windows",
    },
  ];

  return (
    <SlideLayout id="resource-plan" variant="alt" pageNumber={9}>
      <div className="space-y-5 stagger-children">
        <div>
          <p className="text-primary font-semibold tracking-[0.2em] uppercase text-xs mb-2">Execution</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Resource Plan & Migration Timeline</h2>
          <p className="text-muted-foreground text-sm mt-1">5-Person Akamai Core Team across Delivery, Security, & Multi-Geography</p>
        </div>

        {/* MIGRATION PLAN TABLE */}
        <div className="clean-card p-4 overflow-x-auto">
          <h3 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
            <TrendingUp size={14} className="text-primary" />
            4-Week Hostname Migration Plan (5,000 Total)
          </h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-2 font-semibold text-muted-foreground">Week</th>
                <th className="text-center p-2 font-semibold text-primary">Hostnames This Week</th>
                <th className="text-center p-2 font-semibold text-accent">Cumulative Total</th>
                <th className="text-left p-2 font-semibold text-muted-foreground">Phase</th>
                <th className="text-left p-2 font-semibold text-muted-foreground">Key Activities</th>
              </tr>
            </thead>
            <tbody>
              {migrationPlan.map((item, idx) => (
                <tr key={idx} className={`border-b border-border/50 ${item.domains === 0 ? 'bg-muted/20' : ''}`}>
                  <td className="p-2 font-semibold text-foreground text-xs">{item.week}</td>
                  <td className="p-2 text-center font-bold text-primary">
                    {item.domains === 0 ? '—' : item.domains.toLocaleString()}
                  </td>
                  <td className="p-2 text-center font-bold text-accent">{item.total.toLocaleString()}</td>
                  <td className="p-2 text-foreground text-xs">{item.phase}</td>
                  <td className="p-2 text-muted-foreground text-xs">
                    {item.activities.join(' • ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TEAM ROLES */}
        <div className="grid md:grid-cols-2 gap-3">
          {teamRoles.map((role, idx) => (
            <div key={idx} className="stripe-card p-3 space-y-2 border border-border/50">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-sm text-foreground">{role.role}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Clock size={12} /> {role.timezone}
                  </p>
                </div>
              </div>
              <div className="space-y-1 text-xs">
                <p className="text-muted-foreground"><strong>Duties:</strong> {role.duties}</p>
                <p className="text-accent bg-accent/5 px-2 py-1 rounded border border-accent/20">
                  <strong>{role.constraint}:</strong> {role.critical}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* KEY HANDOFF POINTS */}
        <div className="bg-primary/5 border border-primary/20 rounded p-3 space-y-2">
          <p className="font-semibold text-sm text-foreground flex items-center gap-2">
            <Users size={14} className="text-primary" />
            Decision Gates & Handoffs
          </p>
          <div className="grid md:grid-cols-3 gap-3 text-xs">
            <div className="space-y-1">
              <p className="font-semibold text-foreground">Pre-Wave</p>
              <p className="text-muted-foreground">Tech Arch validates mPulse metrics (error &lt;0.5%, LCP &lt;200ms) → I approve → TPM-DNS executes CNAME</p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-foreground">During Wave</p>
              <p className="text-muted-foreground">All teams real-time monitoring. Security/Tech Arch can recommend rollback within 15-min SLA</p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-foreground">Post-Wave</p>
              <p className="text-muted-foreground">Tech Arch + Security post-analysis (within 24h) feeds into next wave planning</p>
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};

export default ResourcePlanSlide;
