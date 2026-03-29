import { useState } from "react";
import SlideLayout from "./SlideLayout";
import CalloutModal from "./CalloutModal";
import { ArrowRight, Cloud, Shield, Server, Users, Zap, Globe, Bot, Lock, Image, BarChart3, Layers, Code2 } from "lucide-react";

const deliveryProducts = [
  { icon: Zap, label: "Ion", desc: "Akamai's flagship CDN product for dynamic site acceleration. Combines intelligent caching, prefetching, SureRoute optimization, and adaptive acceleration to deliver fast, reliable web experiences globally." },
  { icon: Image, label: "Image & Video Manager", desc: "Automatically optimizes images at the edge — converts to WebP/AVIF, resizes for device, adjusts quality. Zero origin processing. Reduces image payload 50-70%." },
  { icon: Globe, label: "Global Traffic Management (GTM)", desc: "DNS-based load balancing across origins and regions. Health checks every 60s, automatic failover, geographic and performance-based routing. During migration, keeps legacy provider as fallback for instant rollback via DNS." },
  { icon: Code2, label: "EdgeWorkers", desc: "Serverless compute at the Akamai edge. Run JavaScript/TypeScript for custom logic without origin round-trips. Key use cases: microservices traffic routing during monolith-to-microservices migration, and custom bot challenge logic at the edge before requests reach origin." },
  { icon: BarChart3, label: "mPulse", desc: "Real User Monitoring (RUM) — measures actual end-user page load, Core Web Vitals (LCP, FID, CLS), and business metrics like conversion rate. Anomaly detection triggers alerts." },
];

const securityProducts = [
  { icon: Shield, label: "Prolexic", desc: "Akamai's dedicated DDoS protection product. Always-on with 20+ Tbps of scrubbing capacity across 36 global centers. Stops volumetric, protocol, and application-layer attacks before they reach your infrastructure. Different from WAF — Prolexic handles network-layer volumetric floods, while WAF (App & API Protector) handles application-layer attacks like SQL injection." },
  { icon: Shield, label: "WAF (AAP)", desc: "Akamai's next-gen WAF product — App & API Protector (replaces legacy Kona WAF). Features Adaptive Security Engine with auto-updating rules for OWASP Top 10, API protection, and rate limiting. ML-driven tuning reduces false positives 5x vs legacy WAF." },
  { icon: Bot, label: "Bot Manager Premier", desc: "Behavioral bot detection using 100+ signals: device fingerprinting, TLS analysis, mouse/keyboard patterns. Catches sophisticated bots that rotate IPs and spoof User-Agents." },
  { icon: Lock, label: "API Security", desc: "Discovers shadow APIs automatically. Schema validation ensures only expected parameters pass. Detects anomalous API usage patterns — protects against data exfiltration and abuse." },
];

const ArchitectureSlide = () => {
  const [activeProduct, setActiveProduct] = useState<{ label: string; desc: string } | null>(null);

  return (
    <SlideLayout id="architecture" pageNumber={4}>
      <div className="space-y-5 stagger-children">
        <div>
          <p className="text-primary font-semibold tracking-[0.2em] uppercase text-xs mb-2">Section B — Solution Architecture</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">High-Level Architecture</h2>
          <p className="text-sm text-muted-foreground mt-1">Click any product for details</p>
        </div>

        <div className="clean-card p-4 md:p-6">
          {/* Mobile: stacked layout */}
          <div className="block md:hidden space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground tracking-[0.15em] uppercase mb-2">End Users</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: Users, label: "NA", sub: "Primary" },
                  { icon: Users, label: "LATAM", sub: "Growing" },
                  { icon: Users, label: "EU", sub: "Expanding" },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="stripe-card stripe-card-green p-2 text-center">
                    <Icon size={14} className="text-akamai-green mx-auto mb-1" />
                    <p className="text-xs font-semibold text-foreground">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center"><ArrowRight size={16} className="text-primary rotate-90 flow-arrow" /></div>
            <div className="border-2 border-primary/20 rounded-md p-4 relative bg-primary/[0.02]">
              <div className="bg-primary text-primary-foreground px-3 py-0.5 rounded text-xs font-bold tracking-wider text-center mb-3">AKAMAI EDGE PLATFORM</div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-2">Performance</p>
                  <div className="grid grid-cols-2 gap-2">
                    {deliveryProducts.map(({ icon: Icon, label, desc }) => (
                      <button key={label} onClick={() => setActiveProduct({ label, desc })} className="clean-card p-2 text-center hover:border-primary/40 transition-colors cursor-pointer">
                        <Icon size={14} className="text-primary mx-auto mb-1" />
                        <p className="text-[11px] font-semibold text-foreground/70">{label}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-accent tracking-wider uppercase mb-2">Security</p>
                  <div className="grid grid-cols-2 gap-2">
                    {securityProducts.map(({ icon: Icon, label, desc }) => (
                      <button key={label} onClick={() => setActiveProduct({ label, desc })} className="clean-card p-2 text-center hover:border-accent/40 transition-colors cursor-pointer">
                        <Icon size={14} className="text-accent mx-auto mb-1" />
                        <p className="text-[11px] font-semibold text-foreground/70">{label}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center"><ArrowRight size={16} className="text-primary rotate-90 flow-arrow" /></div>
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground tracking-[0.15em] uppercase mb-2">Origins</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: Server, label: "On-Prem", sub: "Legacy" },
                  { icon: Cloud, label: "AWS", sub: "Micro" },
                  { icon: Layers, label: "Acquired", sub: "Migration" },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="stripe-card stripe-card-orange p-2 text-center">
                    <Icon size={14} className="text-accent mx-auto mb-1" />
                    <p className="text-xs font-semibold text-foreground">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop: horizontal flow */}
          <div className="hidden md:grid grid-cols-[1fr_auto_2fr_auto_1fr] gap-4 items-center">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground tracking-[0.15em] uppercase text-center mb-2">End Users</p>
              {[
                { icon: Users, label: "North America", sub: "Primary" },
                { icon: Users, label: "LATAM", sub: "Growing" },
                { icon: Users, label: "Europe", sub: "Expanding" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="stripe-card stripe-card-green p-2.5 flex items-center gap-2">
                  <Icon size={16} className="text-akamai-green shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center">
              <ArrowRight size={20} className="text-primary flow-arrow" />
            </div>
            <div className="border-2 border-primary/20 rounded-md p-5 relative bg-primary/[0.02]">
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-0.5 rounded text-xs font-bold tracking-wider">AKAMAI EDGE PLATFORM</div>
              <div className="space-y-4 mt-2">
                <div>
                  <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-2">Delivery & Performance</p>
                  <div className="grid grid-cols-5 gap-2">
                    {deliveryProducts.map(({ icon: Icon, label, desc }) => (
                      <button key={label} onClick={() => setActiveProduct({ label, desc })} className="clean-card p-2.5 text-center hover:border-primary/40 transition-colors cursor-pointer">
                        <Icon size={16} className="text-primary mx-auto mb-1" />
                        <p className="text-xs font-semibold text-foreground/70">{label}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-accent tracking-wider uppercase mb-2">Security</p>
                  <div className="grid grid-cols-4 gap-2">
                    {securityProducts.map(({ icon: Icon, label, desc }) => (
                      <button key={label} onClick={() => setActiveProduct({ label, desc })} className="clean-card p-2.5 text-center hover:border-accent/40 transition-colors cursor-pointer">
                        <Icon size={16} className="text-accent mx-auto mb-1" />
                        <p className="text-xs font-semibold text-foreground/70">{label}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <ArrowRight size={20} className="text-primary flow-arrow" />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground tracking-[0.15em] uppercase text-center mb-2">Origins</p>
              {[
                { icon: Server, label: "On-Prem DC", sub: "Legacy" },
                { icon: Cloud, label: "AWS", sub: "Microservices" },
                { icon: Layers, label: "Acquired Cos.", sub: "Migration" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="stripe-card stripe-card-orange p-2.5 flex items-center gap-2">
                  <Icon size={16} className="text-accent shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { color: "border-t-primary text-primary", label: "Edge offload reduces origin load — lowers risk of overload-related 5xx" },
            { color: "border-t-accent text-accent", label: "Security enforced at edge — attacks stopped before reaching origin" },
            { color: "border-t-akamai-green text-akamai-green", label: "Single platform for delivery, security, and observability" },
          ].map(item => (
            <div key={item.label} className={`clean-card border-t-2 ${item.color} p-3 text-sm font-semibold`}>
              {item.label}
            </div>
          ))}
        </div>
      </div>

      <CalloutModal open={!!activeProduct} onOpenChange={() => setActiveProduct(null)} title={activeProduct?.label || ""}>
        <p className="text-sm leading-relaxed">{activeProduct?.desc}</p>
      </CalloutModal>
    </SlideLayout>
  );
};

export default ArchitectureSlide;
