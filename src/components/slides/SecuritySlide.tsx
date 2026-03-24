import { useState } from "react";
import SlideLayout from "./SlideLayout";
import CalloutModal from "./CalloutModal";
import { Shield, ShieldAlert, Bot, Lock, Layers, CheckCircle2 } from "lucide-react";

const layers = [
  {
    layer: 1,
    icon: ShieldAlert,
    title: "DDoS Protection",
    product: "Prolexic + Site Shield",
    color: "border-destructive bg-destructive/5",
    iconColor: "text-destructive",
    description: "Always-on volumetric DDoS mitigation with 10+ Tbps scrubbing capacity. Site Shield cloaks origin IPs to prevent direct-to-origin attacks.",
    bestPractice: "Enable Site Shield immediately on Day 1 to hide origin IPs. Configure Prolexic with BGP-based routing for automatic attack diversion.",
    advantage: "Akamai's 10+ Tbps capacity is the largest in the industry — no attack has ever overwhelmed Prolexic.",
  },
  {
    layer: 2,
    icon: Shield,
    title: "Web Application Firewall",
    product: "App & API Protector (AAP)",
    color: "border-accent bg-accent/5",
    iconColor: "text-accent",
    description: "Next-gen adaptive WAF replacing legacy KSD/WAP. Includes Adaptive Security Engine with automated rule updates, API discovery, and OWASP Top 10 coverage.",
    bestPractice: "Deploy in Alert mode for 7 days to baseline traffic. Use Adaptive Security Engine auto-tuning before switching to Deny mode. Enable API Discovery for shadow API detection.",
    advantage: "AAP's Adaptive Security Engine reduces false positives by 5x compared to legacy WAF products. Automatic rule updates mean no manual signature management.",
  },
  {
    layer: 3,
    icon: Bot,
    title: "Bot Management",
    product: "Bot Manager Premier",
    color: "border-primary bg-primary/5",
    iconColor: "text-primary",
    description: "Behavioral bot detection with browser fingerprinting, crypto challenges, and ML-based classification. Handles credential stuffing, scraping, and carding attacks.",
    bestPractice: "Start in Monitoring mode (48-72 hours). Classify bots into categories: Good (search engines), Bad (scrapers), Unknown. Use Crypto Challenge for suspected bots — invisible to legitimate users.",
    advantage: "Bot Manager Premier uses behavioral analysis + ML, not just signatures. Detects sophisticated evasion like IP rotation and spoofed User-Agents that rule-based solutions miss.",
  },
  {
    layer: 4,
    icon: Lock,
    title: "API Security",
    product: "API Gateway + AAP API Protection",
    color: "border-akamai-purple bg-akamai-purple/5",
    iconColor: "text-akamai-purple",
    description: "API discovery, schema validation, rate limiting, and abuse detection for checkout, catalog, and authentication APIs. Protects against OWASP API Top 10.",
    bestPractice: "Enable API Discovery to find undocumented/shadow APIs. Apply rate limiting on checkout and auth endpoints. Use positive security model with schema validation.",
    advantage: "Integrated API protection within the same edge platform — no separate API gateway deployment needed. Real-time API threat intelligence from Akamai's global traffic visibility.",
  },
];

const SecuritySlide = () => {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  return (
    <SlideLayout id="security" pageNumber={10}>
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <p className="text-accent font-semibold tracking-widest uppercase text-sm">Defense in Depth</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">Security Architecture</h2>
          <p className="text-muted-foreground">4 layers of defense — click each layer for details</p>
        </div>

        {/* Layered diagram */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {layers.map((l) => (
            <div
              key={l.layer}
              onClick={() => setActiveLayer(l.layer)}
              className={`callout-badge rounded-xl p-5 border-2 ${l.color} cursor-pointer hover:shadow-lg transition-all flex items-center gap-5`}
            >
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-display text-3xl font-bold text-muted-foreground/30">L{l.layer}</span>
                <l.icon size={32} className={l.iconColor} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-lg font-semibold text-secondary">{l.title}</h3>
                <p className="text-sm text-muted-foreground">{l.product}</p>
              </div>
              <Layers size={20} className="text-muted-foreground/30 shrink-0" />
            </div>
          ))}
        </div>

        {/* Visual note */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold">
            <Shield size={16} /> All layers operate at the Akamai Edge — before traffic reaches your origin
          </div>
        </div>
      </div>

      {/* Layer Modals */}
      {layers.map((l) => (
        <CalloutModal key={l.layer} open={activeLayer === l.layer} onOpenChange={() => setActiveLayer(null)} title={`Layer ${l.layer}: ${l.title} — ${l.product}`}>
          <p>{l.description}</p>
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mt-3">
            <p className="text-sm font-semibold text-primary mb-1">🏆 Best Practice</p>
            <p className="text-sm">{l.bestPractice}</p>
          </div>
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mt-3">
            <p className="text-sm font-semibold text-accent mb-1">⚡ Competitive Advantage</p>
            <p className="text-sm">{l.advantage}</p>
          </div>
        </CalloutModal>
      ))}
    </SlideLayout>
  );
};

export default SecuritySlide;
