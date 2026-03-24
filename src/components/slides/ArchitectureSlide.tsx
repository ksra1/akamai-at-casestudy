import { useState } from "react";
import SlideLayout from "./SlideLayout";
import CalloutModal from "./CalloutModal";
import { ArrowRight, Cloud, Shield, Server, Users, Zap, Globe, Bot, Lock, Image, BarChart3, Layers } from "lucide-react";

const deliveryProducts = [
  { icon: Zap, label: "Ion", desc: "Flagship CDN — intelligent caching, prefetching, SureRoute optimization. Makes sites fast without touching origin code." },
  { icon: Image, label: "Image & Video Manager", desc: "Auto-converts images to WebP/AVIF, resizes per device, compresses 50-70%. Origin does zero image processing." },
  { icon: Globe, label: "Global Traffic Mgmt", desc: "DNS-based load balancing with health checks every 60s. During migration, keeps legacy provider as instant DNS fallback." },
  { icon: BarChart3, label: "mPulse", desc: "Real User Monitoring — actual page loads, Core Web Vitals, conversion correlation. The 'did it actually get faster?' answer." },
];

const securityProducts = [
  { icon: Shield, label: "Prolexic", desc: "Always-on DDoS scrubbing — 20+ Tbps capacity across 36 global centers. Volumetric attacks die before reaching your network." },
  { icon: Shield, label: "App & API Protector", desc: "Next-gen WAF with auto-updating rules. Adaptive Security Engine = ML-driven tuning, 5× fewer false positives than legacy WAF." },
  { icon: Bot, label: "Bot Manager Premier", desc: "100+ behavioral signals: device fingerprinting, TLS analysis, mouse patterns. Catches bots that rotate IPs and spoof User-Agents." },
  { icon: Lock, label: "API Security", desc: "Discovers shadow APIs automatically. Schema validation + anomaly detection. Protects what you didn't even know was exposed." },
];

const ArchitectureSlide = () => {
  const [activeProduct, setActiveProduct] = useState<{ label: string; desc: string } | null>(null);

  return (
    <SlideLayout id="architecture" pageNumber={4}>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm">Section B — The Big Picture</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">Everything Goes Through the Edge</h2>
          <p className="text-sm text-muted-foreground">Click any product to learn what it actually does</p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
          <div className="flex items-stretch gap-6">
            <div className="flex-1 space-y-3">
              <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase text-center mb-3">Your Users</p>
              {[
                { icon: Users, label: "North America", sub: "Primary" },
                { icon: Users, label: "LATAM", sub: "Growing" },
                { icon: Users, label: "Europe", sub: "Expanding" },
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

            <div className="flex-[2] bg-primary/5 border-2 border-primary/20 rounded-2xl p-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold tracking-wider">
                AKAMAI EDGE — THE SHIELD
              </div>
              <div className="space-y-4 mt-3">
                <div>
                  <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-2">Make it fast</p>
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
                  <p className="text-xs font-semibold text-accent tracking-wider uppercase mb-2">Keep it safe</p>
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

            <div className="flex-1 space-y-3">
              <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase text-center mb-3">Your Origins</p>
              {[
                { icon: Server, label: "On-Prem DC", sub: "Legacy monolith" },
                { icon: Cloud, label: "AWS", sub: "Microservices" },
                { icon: Layers, label: "Acquired Cos.", sub: "Being migrated" },
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
            { color: "bg-primary/10 text-primary", label: "Edge offload → origin breathes → fewer overload-related 5xx" },
            { color: "bg-accent/10 text-accent", label: "Attacks die at the edge — origin never sees them" },
            { color: "bg-akamai-green/10 text-akamai-green", label: "One platform for delivery + security + observability" },
          ].map(item => (
            <div key={item.label} className={`${item.color} rounded-xl p-4 text-center text-sm font-semibold`}>
              {item.label}
            </div>
          ))}
        </div>
      </div>

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
