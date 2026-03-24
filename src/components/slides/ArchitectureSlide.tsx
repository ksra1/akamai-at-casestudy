import { useState } from "react";
import SlideLayout from "./SlideLayout";
import CalloutModal from "./CalloutModal";
import { ArrowRight, Cloud, Shield, Server, Users, Zap, Globe, Bot, Lock, Image, BarChart3, Layers } from "lucide-react";

const deliveryProducts = [
  { icon: Zap, label: "Ion", desc: "Akamai's flagship CDN product for dynamic site acceleration. Combines intelligent caching, prefetching, SureRoute optimization, and adaptive acceleration to deliver fast, reliable web experiences globally." },
  { icon: Image, label: "Image & Video Manager", desc: "Automatically optimizes images at the edge — converts to WebP/AVIF, resizes for device, adjusts quality. Zero origin processing. Reduces image payload 50-70%." },
  { icon: Globe, label: "Global Traffic Management", desc: "DNS-based load balancing across origins and regions. Health checks every 60s, automatic failover, geographic and performance-based routing. During migration, keeps legacy provider as fallback for instant rollback via DNS." },
  { icon: BarChart3, label: "mPulse", desc: "Real User Monitoring (RUM) — measures actual end-user page load, Core Web Vitals (LCP, FID, CLS), and business metrics like conversion rate. Anomaly detection triggers alerts." },
];

const securityProducts = [
  { icon: Shield, label: "Prolexic", desc: "Always-on DDoS protection with 20+ Tbps of dedicated scrubbing capacity across 36 global centers. Stops volumetric, protocol, and application-layer attacks before they reach your infrastructure." },
  { icon: Shield, label: "App & API Protector", desc: "Next-gen WAF with Adaptive Security Engine. Auto-updating rules for OWASP Top 10, API protection, and rate limiting. ML-driven tuning reduces false positives 5x vs legacy WAF." },
  { icon: Bot, label: "Bot Manager Premier", desc: "Behavioral bot detection using 100+ signals: device fingerprinting, TLS analysis, mouse/keyboard patterns. Catches sophisticated bots that rotate IPs and spoof User-Agents." },
  { icon: Lock, label: "API Security", desc: "Discovers shadow APIs automatically. Schema validation ensures only expected parameters pass. Detects anomalous API usage patterns — protects against data exfiltration and abuse." },
];

const ArchitectureSlide = () => {
  const [activeProduct, setActiveProduct] = useState<{ label: string; desc: string } | null>(null);

  return (
    <SlideLayout id="architecture" pageNumber={4}>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm">Section B — Solution Architecture</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">High-Level Architecture</h2>
          <p className="text-sm text-muted-foreground">Click any product for details</p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
          <div className="flex items-stretch gap-6">
            {/* End Users - LEFT */}
            <div className="flex-1 space-y-3">
              <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase text-center mb-3">End Users</p>
              {[
                { icon: Users, label: "North America", sub: "Primary market" },
                { icon: Users, label: "LATAM", sub: "Growing market" },
                { icon: Users, label: "Europe", sub: "Expanding reach" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="bg-akamai-green/5 border border-akamai-green/15 rounded-lg p-3 flex items-center gap-3">
                  <Icon size={20} className="text-akamai-green shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-secondary">{label}</p>
                    <p className="text-xs text-muted-foreground">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center justify-center gap-1 px-2">
              <ArrowRight size={24} className="text-primary flow-arrow" />
            </div>

            {/* Akamai Edge - CENTER */}
            <div className="flex-[2] bg-primary/5 border-2 border-primary/20 rounded-2xl p-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold tracking-wider">
                AKAMAI EDGE PLATFORM
              </div>
              <div className="space-y-4 mt-3">
                <div>
                  <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-2">Delivery & Performance</p>
                  <div className="grid grid-cols-4 gap-2">
                    {deliveryProducts.map(({ icon: Icon, label, desc }) => (
                      <button
                        key={label}
                        onClick={() => setActiveProduct({ label, desc })}
                        className="bg-card rounded-lg p-2.5 text-center border border-primary/10 hover:border-primary/40 hover:shadow-md transition-all cursor-pointer"
                      >
                        <Icon size={18} className="text-primary mx-auto mb-1" />
                        <p className="text-xs font-semibold text-secondary">{label}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-accent tracking-wider uppercase mb-2">Security</p>
                  <div className="grid grid-cols-4 gap-2">
                    {securityProducts.map(({ icon: Icon, label, desc }) => (
                      <button
                        key={label}
                        onClick={() => setActiveProduct({ label, desc })}
                        className="bg-card rounded-lg p-2.5 text-center border border-accent/10 hover:border-accent/40 hover:shadow-md transition-all cursor-pointer"
                      >
                        <Icon size={18} className="text-accent mx-auto mb-1" />
                        <p className="text-xs font-semibold text-secondary">{label}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-1 px-2">
              <ArrowRight size={24} className="text-primary flow-arrow" />
            </div>

            {/* Origins - RIGHT */}
            <div className="flex-1 space-y-3">
              <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase text-center mb-3">Origins</p>
              {[
                { icon: Server, label: "On-Prem DC", sub: "Legacy monolith" },
                { icon: Cloud, label: "AWS", sub: "Microservices" },
                { icon: Layers, label: "Acquired Cos.", sub: "Platform migration" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="bg-destructive/5 border border-destructive/15 rounded-lg p-3 flex items-center gap-3">
                  <Icon size={20} className="text-destructive shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-secondary">{label}</p>
                    <p className="text-xs text-muted-foreground">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { color: "bg-primary/10 text-primary", label: "Edge offload reduces origin load — lowers risk of overload-related 5xx" },
            { color: "bg-accent/10 text-accent", label: "Security enforced at edge — attacks stopped before reaching origin" },
            { color: "bg-akamai-green/10 text-akamai-green", label: "Single platform for delivery, security, and observability" },
          ].map(item => (
            <div key={item.label} className={`${item.color} rounded-xl p-4 text-center text-sm font-semibold`}>
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* Product detail modal */}
      <CalloutModal
        open={!!activeProduct}
        onOpenChange={() => setActiveProduct(null)}
        title={activeProduct?.label || ""}
      >
        <div className="space-y-3">
          <p className="text-sm leading-relaxed">{activeProduct?.desc}</p>
        </div>
      </CalloutModal>
    </SlideLayout>
  );
};

export default ArchitectureSlide;
