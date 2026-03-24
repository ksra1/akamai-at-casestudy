import SlideLayout from "./SlideLayout";
import { AlertTriangle, Shield, ArrowRight, Server, Zap, Target } from "lucide-react";

const impacts = [
  { area: "Operational", icon: Server, items: ["Origin overload from DDoS/bots", "Manual WAF tuning burden", "No visibility into attack patterns"], color: "primary" },
  { area: "Revenue & Trust", icon: Target, items: ["Chargeback costs from carding", "Revenue loss during downtime", "Customer trust erosion from ATO"], color: "accent" },
  { area: "Security Posture", icon: AlertTriangle, items: ["Legacy rules = known vulnerabilities", "No API discovery = shadow APIs", "IP-only blocking = easily evaded"], color: "destructive" },
];

const SecurityAnalysisSlide = () => {
  return (
    <SlideLayout id="security-analysis" variant="alt" pageNumber={7}>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <p className="text-accent font-semibold tracking-widest uppercase text-sm">Section C — Security Analysis</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">Security Problem Analysis</h2>
        </div>

        {/* Business Impact - 3 columns with proper icons */}
        <div className="grid md:grid-cols-3 gap-5">
          {impacts.map(imp => (
            <div key={imp.area} className="bg-card rounded-xl border border-border p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <imp.icon size={18} className={`text-${imp.color}`} />
                <h3 className="font-display font-bold text-secondary">{imp.area}</h3>
              </div>
              <ul className="space-y-2.5">
                {imp.items.map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className={`w-1.5 h-1.5 rounded-full bg-${imp.color} mt-2 shrink-0`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Interrelation Diagram - Clearer story */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Zap size={18} className="text-primary" />
            <h3 className="font-display font-bold text-secondary">How WAF, Bot & API Security Issues Interrelate</h3>
          </div>

          <div className="space-y-4">
            {/* Chain 1: Bot → Scraping → Competitive Loss */}
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-destructive/8 border border-destructive/15 rounded-lg p-3 text-center">
                <p className="text-xs font-bold text-secondary">Bot Networks</p>
                <p className="text-[10px] text-muted-foreground">IP rotation + spoofing</p>
              </div>
              <ArrowRight size={16} className="text-muted-foreground shrink-0" />
              <div className="flex-1 bg-accent/8 border border-accent/15 rounded-lg p-3 text-center">
                <p className="text-xs font-bold text-secondary">Inventory Scraping</p>
                <p className="text-[10px] text-muted-foreground">Catalog enumeration</p>
              </div>
              <ArrowRight size={16} className="text-muted-foreground shrink-0" />
              <div className="flex-1 bg-primary/8 border border-primary/15 rounded-lg p-3 text-center">
                <p className="text-xs font-bold text-secondary">Competitive Intel Loss</p>
                <p className="text-[10px] text-muted-foreground">Pricing & stock exposed</p>
              </div>
              <div className="shrink-0 w-24">
                <div className="bg-accent/10 rounded-lg px-2 py-1 text-center">
                  <p className="text-[10px] font-bold text-accent">Bot Manager</p>
                </div>
              </div>
            </div>

            {/* Chain 2: Bot → Credential Stuffing → Account Takeover → Carding */}
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-destructive/8 border border-destructive/15 rounded-lg p-3 text-center">
                <p className="text-xs font-bold text-secondary">Same Bots</p>
                <p className="text-[10px] text-muted-foreground">Reuse infra for stuffing</p>
              </div>
              <ArrowRight size={16} className="text-muted-foreground shrink-0" />
              <div className="flex-1 bg-accent/8 border border-accent/15 rounded-lg p-3 text-center">
                <p className="text-xs font-bold text-secondary">Credential Stuffing</p>
                <p className="text-[10px] text-muted-foreground">Leaked DB passwords</p>
              </div>
              <ArrowRight size={16} className="text-muted-foreground shrink-0" />
              <div className="flex-1 bg-primary/8 border border-primary/15 rounded-lg p-3 text-center">
                <p className="text-xs font-bold text-secondary">Account Takeover → Carding</p>
                <p className="text-[10px] text-muted-foreground">Fraud + chargebacks</p>
              </div>
              <div className="shrink-0 w-24">
                <div className="bg-accent/10 rounded-lg px-2 py-1 text-center">
                  <p className="text-[10px] font-bold text-accent">Bot Mgr + AAP</p>
                </div>
              </div>
            </div>

            {/* Chain 3: Outdated WAF → API Abuse → Data Breach */}
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-destructive/8 border border-destructive/15 rounded-lg p-3 text-center">
                <p className="text-xs font-bold text-secondary">Outdated WAF</p>
                <p className="text-[10px] text-muted-foreground">Legacy rules = gaps</p>
              </div>
              <ArrowRight size={16} className="text-muted-foreground shrink-0" />
              <div className="flex-1 bg-accent/8 border border-accent/15 rounded-lg p-3 text-center">
                <p className="text-xs font-bold text-secondary">API Abuse</p>
                <p className="text-[10px] text-muted-foreground">Shadow APIs discovered</p>
              </div>
              <ArrowRight size={16} className="text-muted-foreground shrink-0" />
              <div className="flex-1 bg-primary/8 border border-primary/15 rounded-lg p-3 text-center">
                <p className="text-xs font-bold text-secondary">Data Breach Risk</p>
                <p className="text-[10px] text-muted-foreground">PII + compliance</p>
              </div>
              <div className="shrink-0 w-24">
                <div className="bg-accent/10 rounded-lg px-2 py-1 text-center">
                  <p className="text-[10px] font-bold text-accent">AAP + API Sec</p>
                </div>
              </div>
            </div>

            {/* Chain 4: DDoS → Overload → Downtime */}
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-destructive/8 border border-destructive/15 rounded-lg p-3 text-center">
                <p className="text-xs font-bold text-secondary">DDoS Attack</p>
                <p className="text-[10px] text-muted-foreground">Volumetric + app-layer</p>
              </div>
              <ArrowRight size={16} className="text-muted-foreground shrink-0" />
              <div className="flex-1 bg-accent/8 border border-accent/15 rounded-lg p-3 text-center">
                <p className="text-xs font-bold text-secondary">Origin Overload</p>
                <p className="text-[10px] text-muted-foreground">Infra can't scale</p>
              </div>
              <ArrowRight size={16} className="text-muted-foreground shrink-0" />
              <div className="flex-1 bg-primary/8 border border-primary/15 rounded-lg p-3 text-center">
                <p className="text-xs font-bold text-secondary">Revenue Loss</p>
                <p className="text-[10px] text-muted-foreground">Site down = $0 sales</p>
              </div>
              <div className="shrink-0 w-24">
                <div className="bg-accent/10 rounded-lg px-2 py-1 text-center">
                  <p className="text-[10px] font-bold text-accent">Prolexic</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key insight */}
        <div className="bg-secondary text-secondary-foreground rounded-xl p-5 flex items-start gap-4">
          <Shield size={24} className="text-primary shrink-0 mt-0.5" />
          <div>
            <p className="font-display font-bold text-lg">These threats are interconnected — they require a unified platform</p>
            <p className="text-secondary-foreground/70 text-sm mt-1">
              Bots that scrape inventory also test stolen credentials. Credential stuffing leads to account takeover which enables carding. 
              Outdated WAF rules let API abuse through. Akamai's integrated platform addresses all vectors at the edge simultaneously.
            </p>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};

export default SecurityAnalysisSlide;
