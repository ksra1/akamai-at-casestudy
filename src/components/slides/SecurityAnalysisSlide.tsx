import SlideLayout from "./SlideLayout";
import { AlertTriangle, Shield, ArrowRight, Server, Zap, Target, Layers, GitBranch, Users } from "lucide-react";

const scaleGovMapping = [
  {
    icon: Layers,
    challenge: "Legacy monolith → microservices",
    solution: "API-driven architecture enables AAP/Bot Manager per-service",
  },
  {
    icon: GitBranch,
    challenge: "Acquired companies need platform migration",
    solution: "Security posture standardization via golden config templates",
  },
  {
    icon: Users,
    challenge: "Cross-team change management at scale",
    solution: "RACI framework + training program + Config-as-Code workflows",
  },
];

const impacts = [
  { area: "Operational", icon: Server, items: ["Origin overload from DDoS/bots", "Manual WAF tuning burden", "No visibility into attack patterns"], color: "primary" },
  { area: "Revenue & Trust", icon: Target, items: ["Chargeback costs from carding", "Revenue loss during downtime", "Customer trust erosion from ATO"], color: "accent" },
  { area: "Security Posture", icon: AlertTriangle, items: ["Legacy rules = known vulnerabilities", "No API discovery = shadow APIs", "IP-only blocking = easily evaded"], color: "destructive" },
];

const SecurityAnalysisSlide = () => {
  return (
    <SlideLayout id="security-analysis" variant="alt" pageNumber={7}>
      <div className="space-y-5">
        <div className="text-center space-y-2">
          <p className="text-accent font-semibold tracking-widest uppercase text-sm">Section C — Security Analysis</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">Security & Governance Analysis</h2>
        </div>

        {/* Scale & Governance Challenges Addressed */}
        <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-akamai-green" />
            <h3 className="font-display font-bold text-secondary text-sm">Scale & Governance Challenges Addressed in This Section</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {scaleGovMapping.map(item => (
              <div key={item.challenge} className="flex items-start gap-3 bg-akamai-green/5 border border-akamai-green/15 rounded-xl p-4">
                <item.icon size={18} className="text-akamai-green shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-secondary">{item.challenge}</p>
                  <p className="text-[11px] text-muted-foreground mt-1">{item.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Business Impact - 3 columns */}
        <div className="grid md:grid-cols-3 gap-4">
          {impacts.map(imp => (
            <div key={imp.area} className="bg-card rounded-xl border border-border p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <imp.icon size={16} className={`text-${imp.color}`} />
                <h3 className="font-display font-bold text-secondary text-sm">{imp.area}</h3>
              </div>
              <ul className="space-y-2">
                {imp.items.map(item => (
                  <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <div className={`w-1.5 h-1.5 rounded-full bg-${imp.color} mt-1.5 shrink-0`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Interrelation Diagram */}
        <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={16} className="text-primary" />
            <h3 className="font-display font-bold text-secondary text-sm">How WAF, Bot & API Security Issues Interrelate</h3>
          </div>

          <div className="space-y-3">
            {[
              { steps: ["Bot Networks", "IP rotation + spoofing", "Inventory Scraping", "Catalog enumeration", "Competitive Intel Loss", "Pricing & stock exposed"], fix: "Bot Manager" },
              { steps: ["Same Bots", "Reuse infra for stuffing", "Credential Stuffing", "Leaked DB passwords", "Account Takeover → Carding", "Fraud + chargebacks"], fix: "Bot Mgr + AAP" },
              { steps: ["Outdated WAF", "Legacy rules = gaps", "API Abuse", "Shadow APIs discovered", "Data Breach Risk", "PII + compliance"], fix: "AAP + API Sec" },
              { steps: ["DDoS Attack", "Volumetric + app-layer", "Origin Overload", "Infra can't scale", "Revenue Loss", "Site down = $0 sales"], fix: "Prolexic" },
            ].map((chain, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex-1 bg-destructive/8 border border-destructive/15 rounded-lg p-2.5 text-center">
                  <p className="text-[11px] font-bold text-secondary">{chain.steps[0]}</p>
                  <p className="text-[9px] text-muted-foreground">{chain.steps[1]}</p>
                </div>
                <ArrowRight size={14} className="text-muted-foreground shrink-0" />
                <div className="flex-1 bg-accent/8 border border-accent/15 rounded-lg p-2.5 text-center">
                  <p className="text-[11px] font-bold text-secondary">{chain.steps[2]}</p>
                  <p className="text-[9px] text-muted-foreground">{chain.steps[3]}</p>
                </div>
                <ArrowRight size={14} className="text-muted-foreground shrink-0" />
                <div className="flex-1 bg-primary/8 border border-primary/15 rounded-lg p-2.5 text-center">
                  <p className="text-[11px] font-bold text-secondary">{chain.steps[4]}</p>
                  <p className="text-[9px] text-muted-foreground">{chain.steps[5]}</p>
                </div>
                <div className="shrink-0 w-20">
                  <div className="bg-accent/10 rounded-lg px-2 py-1 text-center">
                    <p className="text-[9px] font-bold text-accent">{chain.fix}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key insight */}
        <div className="bg-secondary text-secondary-foreground rounded-xl p-4 flex items-start gap-3">
          <Shield size={20} className="text-primary shrink-0 mt-0.5" />
          <div>
            <p className="font-display font-bold text-sm">These threats are interconnected — they require a unified platform</p>
            <p className="text-secondary-foreground/70 text-xs mt-1">
              Bots that scrape inventory also test stolen credentials. Credential stuffing leads to account takeover which enables carding. 
              Akamai's integrated platform addresses all vectors at the edge simultaneously.
            </p>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};

export default SecurityAnalysisSlide;
