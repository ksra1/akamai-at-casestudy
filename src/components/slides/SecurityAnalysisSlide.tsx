import SlideLayout from "./SlideLayout";
import { AlertTriangle, DollarSign, Shield, Link2, ArrowRight } from "lucide-react";

const risks = [
  { cause: "No WAF updates", effect: "OWASP Top 10 exposure", icon: AlertTriangle },
  { cause: "Credential stuffing", effect: "Account takeover & fraud", icon: AlertTriangle },
  { cause: "Unprotected APIs", effect: "Data breach risk", icon: AlertTriangle },
  { cause: "Bot scraping", effect: "Competitive intel loss", icon: AlertTriangle },
];

const impacts = [
  { area: "Operational", items: ["Origin overload from DDoS/bots", "Manual WAF tuning burden", "No visibility into attack patterns"], color: "primary" },
  { area: "Financial", items: ["Chargeback costs from carding", "Revenue loss during downtime", "Fraud from account takeover"], color: "accent" },
  { area: "Security Posture", items: ["Legacy rules = known vulnerabilities", "No API discovery = shadow APIs", "IP-only blocking = easily evaded"], color: "destructive" },
];

const SecurityAnalysisSlide = () => {
  return (
    <SlideLayout id="security-analysis" variant="alt" pageNumber={7}>
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <p className="text-accent font-semibold tracking-widest uppercase text-sm">Section C — Security Analysis</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">Security Problem Analysis</h2>
        </div>

        {/* Business Impact - 3 columns */}
        <div className="grid md:grid-cols-3 gap-5">
          {impacts.map(imp => (
            <div key={imp.area} className="bg-card rounded-xl border border-border p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign size={18} className={`text-${imp.color}`} />
                <h3 className="font-display font-bold text-secondary">{imp.area} Impact</h3>
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

        {/* Interrelation Diagram */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Link2 size={18} className="text-primary" />
            <h3 className="font-display font-bold text-secondary">How WAF, Bot & API Security Issues Interrelate</h3>
          </div>

          <div className="relative">
            {/* Visual flow */}
            <div className="grid grid-cols-5 gap-3 items-center">
              {/* Attackers */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-destructive tracking-wider uppercase text-center">Threats</p>
                {["Bot Networks", "Script Kiddies", "Organized Crime"].map(t => (
                  <div key={t} className="bg-destructive/8 border border-destructive/15 rounded-lg p-2 text-center">
                    <p className="text-xs font-semibold text-secondary">{t}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <ArrowRight size={20} className="text-muted-foreground flow-arrow" />
              </div>

              {/* Attack Vectors - center column */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-accent tracking-wider uppercase text-center">Vectors</p>
                {[
                  "Credential Stuffing → Account Takeover",
                  "API Abuse → Data Exfiltration",
                  "WAF Bypass → SQL Injection",
                  "Scraping → Pricing Intel",
                ].map(v => (
                  <div key={v} className="bg-accent/8 border border-accent/15 rounded-lg p-2 text-center">
                    <p className="text-xs text-secondary font-medium">{v}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <ArrowRight size={20} className="text-muted-foreground flow-arrow" />
              </div>

              {/* Business Impact */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-primary tracking-wider uppercase text-center">Impact</p>
                {["Revenue Loss", "Customer Trust", "Compliance Risk", "Operational Cost"].map(i => (
                  <div key={i} className="bg-primary/8 border border-primary/15 rounded-lg p-2 text-center">
                    <p className="text-xs font-semibold text-secondary">{i}</p>
                  </div>
                ))}
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
              Bots that scrape inventory also test credentials. Credential stuffing leads to account takeover which enables carding. 
              Outdated WAF rules let API abuse through. Solving one without the others leaves gaps. 
              Akamai's integrated platform addresses all vectors at the edge simultaneously.
            </p>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};

export default SecurityAnalysisSlide;
