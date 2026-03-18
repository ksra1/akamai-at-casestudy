import { useState } from "react";
import SlideLayout from "./SlideLayout";
import CalloutModal from "./CalloutModal";
import { Bot, UserX, ShoppingCart, CreditCard, ArrowRight, ShieldX, ShieldCheck, Brain, Fingerprint, Eye, Cpu } from "lucide-react";

const threats = [
  { icon: UserX, title: "Credential Stuffing", desc: "Automated login attempts using stolen credentials", impact: "Account takeover, fraud, customer trust loss" },
  { icon: ShoppingCart, title: "Inventory Scraping", desc: "Competitive bots scraping product data & pricing", impact: "Pricing intelligence leakage, inflated server costs" },
  { icon: CreditCard, title: "Carding Attacks", desc: "Testing stolen cards against checkout APIs", impact: "Chargeback costs, payment processor penalties" },
  { icon: Bot, title: "Sophisticated Evasion", desc: "IP rotation, spoofed clients, headless browsers", impact: "Bypasses simple rate limiting and IP blocking" },
];

const BotThreatSlide = () => {
  const [detailModal, setDetailModal] = useState(false);

  return (
    <SlideLayout id="bot-threat" variant="alt">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <p className="text-accent font-semibold tracking-widest uppercase text-sm">Threat Analysis</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">Bot & Threat Deep Dive</h2>
        </div>

        {/* Threat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {threats.map((t) => (
            <div key={t.title} className="bg-card rounded-xl p-5 border border-border shadow-sm text-center space-y-3">
              <div className="bg-destructive/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                <t.icon size={22} className="text-destructive" />
              </div>
              <h4 className="font-display font-semibold text-secondary text-sm">{t.title}</h4>
              <p className="text-xs text-muted-foreground">{t.desc}</p>
            </div>
          ))}
        </div>

        {/* Side by side comparison */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Without Akamai */}
          <div className="bg-destructive/5 border-2 border-destructive/20 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldX size={24} className="text-destructive" />
              <h3 className="font-display text-lg font-bold text-destructive">Without Akamai</h3>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                "Bots hit origin directly — server overload",
                "IP-based blocking easily evaded by rotation",
                "No visibility into bot sophistication levels",
                "Manual WAF rules always reactive, never proactive",
                "Checkout APIs exposed to carding at scale",
                "Legacy rate limiting blocks legitimate users too",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-destructive mt-0.5">✕</span> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* With Akamai */}
          <div className="bg-primary/5 border-2 border-primary/20 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck size={24} className="text-primary" />
              <h3 className="font-display text-lg font-bold text-primary">With Akamai</h3>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                "Bots stopped at edge — origin never sees attack traffic",
                "Behavioral detection + ML, not just IP blocking",
                "Bot classification: good / bad / unknown with actions per category",
                "Adaptive Security Engine auto-tunes WAF rules",
                "API rate limiting with crypto challenges for suspected bots",
                "Transparent to legitimate users — no CAPTCHAs needed",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Detection pipeline */}
        <div
          onClick={() => setDetailModal(true)}
          className="callout-badge bg-card rounded-xl p-6 border border-border shadow-sm cursor-pointer hover:shadow-lg transition-all"
        >
          <p className="text-xs text-primary font-semibold tracking-wider uppercase mb-4">Bot Manager Detection Pipeline — Click for details</p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {[
              { icon: Eye, label: "Request Analysis" },
              { icon: Fingerprint, label: "Device Fingerprint" },
              { icon: Brain, label: "Behavioral ML" },
              { icon: Cpu, label: "Classification" },
              { icon: ShieldCheck, label: "Action" },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-3">
                <div className="flex flex-col items-center gap-1">
                  <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                    <step.icon size={18} className="text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">{step.label}</span>
                </div>
                {i < 4 && <ArrowRight size={16} className="text-muted-foreground/30 flow-arrow" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <CalloutModal open={detailModal} onOpenChange={setDetailModal} title="Bot Manager Premier — Detection Pipeline">
        <div className="space-y-3">
          <p><strong>1. Request Analysis:</strong> Inspects headers, TLS fingerprint, HTTP anomalies, request rate, and URL patterns.</p>
          <p><strong>2. Device Fingerprinting:</strong> JavaScript challenge collects 100+ browser attributes — canvas hash, WebGL, fonts, plugins — creating a unique device signature.</p>
          <p><strong>3. Behavioral ML:</strong> Machine learning models analyze mouse movement, keystroke dynamics, scroll behavior, and page interaction timing to detect non-human patterns.</p>
          <p><strong>4. Classification:</strong> Each request scored and classified: Known Bot (good/bad), Sophisticated Bot, or Human. Categories mapped to action policies.</p>
          <p><strong>5. Action:</strong> Per-category responses — Allow (good bots like Googlebot), Crypto Challenge (suspected), Serve Alternate Content, Deny, or Slow Down (tarpit).</p>
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mt-2">
            <p className="text-sm font-semibold text-accent">Key differentiator: Behavioral analysis catches sophisticated bots that rotate IPs and spoof User-Agents — techniques that defeat rule-based solutions.</p>
          </div>
        </div>
      </CalloutModal>
    </SlideLayout>
  );
};

export default BotThreatSlide;
