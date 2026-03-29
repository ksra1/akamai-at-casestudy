import SlideLayout from "./SlideLayout";
import { AlertTriangle, Shield, ArrowRight, Zap } from "lucide-react";

const attackChains = [
  {
    threat: "Bot Networks",
    detail: "IP rotation + spoofing",
    attack: "Inventory Scraping",
    attackDetail: "Catalog enumeration",
    impact: "Competitive Intel Loss",
    impactDetail: "Pricing & stock exposed",
    fix: "Bot Manager",
  },
  {
    threat: "Same Bots",
    detail: "Reuse infra for stuffing",
    attack: "Credential Stuffing",
    attackDetail: "Leaked DB passwords",
    impact: "Account Takeover → Carding",
    impactDetail: "Fraud + chargebacks",
    fix: "Bot Mgr + AAP",
  },
  {
    threat: "Outdated WAF",
    detail: "Legacy rules = gaps",
    attack: "API Abuse",
    attackDetail: "Shadow APIs discovered",
    impact: "Data Breach Risk",
    impactDetail: "PII + compliance",
    fix: "AAP + API Sec",
  },
  {
    threat: "DDoS Attack",
    detail: "Volumetric + app-layer",
    attack: "Origin Overload",
    attackDetail: "Infra can't scale",
    impact: "Revenue Loss",
    impactDetail: "Site down = $0 sales",
    fix: "Prolexic",
  },
];

const SecurityAnalysisSlide = () => (
  <SlideLayout id="security-analysis" variant="alt" pageNumber={7}>
    <div className="space-y-6 stagger-children">
      <div>
        <p className="text-accent font-semibold tracking-[0.2em] uppercase text-xs mb-2">Section C — Security Analysis</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">How Threats Interconnect</h2>
        <p className="text-sm text-muted-foreground mt-1">Each row shows how one threat escalates — and which Akamai product stops it</p>
      </div>

      {/* Attack Chain Visualization */}
      <div className="clean-card p-4 md:p-6">
        <div className="flex items-center gap-2 mb-5">
          <Zap size={16} className="text-primary" />
          <h3 className="font-display font-bold text-foreground text-base">Attack Chain → Product Mapping</h3>
        </div>

        {/* Desktop headers */}
        <div className="hidden md:grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_120px] items-center gap-2 mb-3 px-1">
          <p className="text-xs font-semibold text-destructive uppercase tracking-wider">Threat Source</p>
          <div />
          <p className="text-xs font-semibold text-accent uppercase tracking-wider">Attack Vector</p>
          <div />
          <p className="text-xs font-semibold text-primary uppercase tracking-wider">Business Impact</p>
          <div />
          <p className="text-xs font-semibold text-akamai-green uppercase tracking-wider text-center">Solution</p>
        </div>

        <div className="space-y-3">
          {attackChains.map((chain, i) => (
            <div key={i}>
              {/* Mobile: stacked card */}
              <div className="block md:hidden clean-card p-3 space-y-2 border-l-2 border-l-destructive">
                <div>
                  <p className="text-xs font-semibold text-destructive uppercase">Threat</p>
                  <p className="text-sm font-bold text-foreground">{chain.threat} — <span className="text-muted-foreground font-normal">{chain.detail}</span></p>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground/40"><ArrowRight size={12} /></div>
                <div>
                  <p className="text-xs font-semibold text-accent uppercase">Attack</p>
                  <p className="text-sm font-bold text-foreground">{chain.attack} — <span className="text-muted-foreground font-normal">{chain.attackDetail}</span></p>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground/40"><ArrowRight size={12} /></div>
                <div>
                  <p className="text-xs font-semibold text-primary uppercase">Impact</p>
                  <p className="text-sm font-bold text-foreground">{chain.impact}</p>
                </div>
                <div className="bg-akamai-green/10 border border-akamai-green/20 rounded p-2 text-center mt-1">
                  <p className="text-sm font-bold text-akamai-green">{chain.fix}</p>
                </div>
              </div>
              {/* Desktop: horizontal */}
              <div className="hidden md:grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_120px] items-center gap-2">
                <div className="clean-card p-3 border-l-2 border-l-destructive">
                  <p className="text-sm font-bold text-foreground">{chain.threat}</p>
                  <p className="text-xs text-muted-foreground">{chain.detail}</p>
                </div>
                <ArrowRight size={14} className="text-muted-foreground/40 shrink-0" />
                <div className="clean-card p-3 border-l-2 border-l-accent">
                  <p className="text-sm font-bold text-foreground">{chain.attack}</p>
                  <p className="text-xs text-muted-foreground">{chain.attackDetail}</p>
                </div>
                <ArrowRight size={14} className="text-muted-foreground/40 shrink-0" />
                <div className="clean-card p-3 border-l-2 border-l-primary">
                  <p className="text-sm font-bold text-foreground">{chain.impact}</p>
                  <p className="text-xs text-muted-foreground">{chain.impactDetail}</p>
                </div>
                <ArrowRight size={14} className="text-akamai-green shrink-0" />
                <div className="bg-akamai-green/10 border border-akamai-green/20 rounded-lg p-3 text-center">
                  <p className="text-sm font-bold text-akamai-green">{chain.fix}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Takeaway */}
      <div className="clean-card p-5 flex items-start gap-3 border-t-2 border-t-primary">
        <Shield size={18} className="text-primary shrink-0 mt-0.5" />
        <div>
          <p className="font-display font-bold text-foreground">These threats are interconnected — they require a unified platform</p>
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
