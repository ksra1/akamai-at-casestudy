import SlideLayout from "./SlideLayout";
import { AlertTriangle, Shield, ArrowRight, Server, Zap, Target, Layers, GitBranch, Users } from "lucide-react";

const scaleGovMapping = [
  { icon: Layers, challenge: "Legacy monolith → microservices", solution: "API-driven architecture enables AAP (App & API Protector) / Bot Manager per-service" },
  { icon: GitBranch, challenge: "Acquired companies need platform migration", solution: "Security posture standardization via golden config templates" },
  { icon: Users, challenge: "Cross-team change management at scale", solution: "RACI framework + training program + Config-as-Code workflows" },
];

const impacts = [
  { area: "Operational", icon: Server, items: ["Origin overload from DDoS/bots", "Manual WAF tuning burden", "No visibility into attack patterns"], color: "primary" },
  { area: "Revenue & Trust", icon: Target, items: ["Chargeback costs from carding", "Revenue loss during downtime", "Customer trust erosion from ATO"], color: "accent" },
  { area: "Security Posture", icon: AlertTriangle, items: ["Legacy rules = known vulnerabilities", "No API discovery = shadow APIs", "IP-only blocking = easily evaded"], color: "destructive" },
];

const SecurityAnalysisSlide = () => (
  <SlideLayout id="security-analysis" variant="alt" pageNumber={7}>
    <div className="space-y-5">
      <div>
        <p className="text-accent font-semibold tracking-[0.2em] uppercase text-xs mb-2">Section C — Security Analysis</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Security & Governance Analysis</h2>
      </div>

      <div className="clean-card p-5 border-l-3" style={{ borderLeftWidth: 3, borderLeftColor: 'hsl(155, 70%, 35%)' }}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-akamai-green" />
          <h3 className="font-display font-bold text-foreground text-sm">Scale & Governance Challenges Addressed</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {scaleGovMapping.map(item => (
            <div key={item.challenge} className="stripe-card stripe-card-green p-3">
              <item.icon size={14} className="text-akamai-green mb-1" />
              <p className="text-xs font-bold text-foreground">{item.challenge}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.solution}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {impacts.map(imp => (
          <div key={imp.area} className="clean-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <imp.icon size={14} className={`text-${imp.color}`} />
              <h3 className="font-display font-bold text-foreground text-sm">{imp.area}</h3>
            </div>
            <ul className="space-y-2">
              {imp.items.map(item => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <div className={`w-1.5 h-1.5 rounded-full bg-${imp.color} mt-1.5 shrink-0`} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="clean-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={14} className="text-primary" />
          <h3 className="font-display font-bold text-foreground text-sm">How WAF, Bot & API Security Issues Interrelate</h3>
        </div>
        <div className="space-y-2">
          {[
            { steps: ["Bot Networks", "IP rotation + spoofing", "Inventory Scraping", "Catalog enumeration", "Competitive Intel Loss", "Pricing & stock exposed"], fix: "Bot Manager" },
            { steps: ["Same Bots", "Reuse infra for stuffing", "Credential Stuffing", "Leaked DB passwords", "Account Takeover → Carding", "Fraud + chargebacks"], fix: "Bot Mgr + AAP" },
            { steps: ["Outdated WAF", "Legacy rules = gaps", "API Abuse", "Shadow APIs discovered", "Data Breach Risk", "PII + compliance"], fix: "AAP + API Sec" },
            { steps: ["DDoS Attack", "Volumetric + app-layer", "Origin Overload", "Infra can't scale", "Revenue Loss", "Site down = $0 sales"], fix: "Prolexic" },
          ].map((chain, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex-1 clean-card p-2 text-center border-l-2 border-l-destructive">
                <p className="text-xs font-bold text-foreground/80">{chain.steps[0]}</p>
                <p className="text-[11px] text-muted-foreground">{chain.steps[1]}</p>
              </div>
              <ArrowRight size={12} className="text-muted-foreground/30 shrink-0" />
              <div className="flex-1 clean-card p-2 text-center border-l-2 border-l-accent">
                <p className="text-xs font-bold text-foreground/80">{chain.steps[2]}</p>
                <p className="text-[11px] text-muted-foreground">{chain.steps[3]}</p>
              </div>
              <ArrowRight size={12} className="text-muted-foreground/30 shrink-0" />
              <div className="flex-1 clean-card p-2 text-center border-l-2 border-l-primary">
                <p className="text-xs font-bold text-foreground/80">{chain.steps[4]}</p>
                <p className="text-[11px] text-muted-foreground">{chain.steps[5]}</p>
              </div>
              <div className="shrink-0 w-20">
                <div className="bg-accent/10 rounded px-2 py-1 text-center">
                  <p className="text-[11px] font-bold text-accent">{chain.fix}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="clean-card p-4 flex items-start gap-3 border-t-2 border-t-primary">
        <Shield size={18} className="text-primary shrink-0 mt-0.5" />
        <div>
          <p className="font-display font-bold text-sm text-foreground">These threats are interconnected — they require a unified platform</p>
          <p className="text-muted-foreground text-sm mt-1">
            Bots that scrape inventory also test stolen credentials. Credential stuffing leads to account takeover which enables carding.
            Akamai's integrated platform addresses all vectors at the edge simultaneously.
          </p>
        </div>
      </div>
    </div>
  </SlideLayout>
);

export default SecurityAnalysisSlide;
