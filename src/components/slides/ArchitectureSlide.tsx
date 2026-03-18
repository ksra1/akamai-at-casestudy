import { useState } from "react";
import SlideLayout from "./SlideLayout";
import CalloutModal from "./CalloutModal";
import { Server, Cloud, Shield, Globe, Users, ArrowRight, Zap, Image, BarChart3, Network } from "lucide-react";

interface HotspotData {
  title: string;
  description: string;
  bestPractice: string;
}

const hotspots: Record<string, HotspotData> = {
  ion: {
    title: "Akamai Ion",
    description: "Adaptive acceleration with intelligent caching, prefetching, and protocol optimization. Handles dynamic and static content delivery with SureRoute for optimal origin connectivity.",
    bestPractice: "Best Practice: Use Tiered Distribution with SureRoute to reduce origin load by 60-80%. Enable Prefetching for predictable navigation paths.",
  },
  ivm: {
    title: "Image & Video Manager",
    description: "Automatic image optimization, format conversion (WebP/AVIF), responsive sizing, and lazy loading — all at the edge without origin changes.",
    bestPractice: "Best Practice: Define image policies per content type. Use automatic format selection and quality-based compression to reduce image payload by 50-70%.",
  },
  gtm: {
    title: "Global Traffic Management",
    description: "DNS-based load balancing across origins and geographies. Supports failover, weighted routing, and performance-based routing.",
    bestPractice: "Best Practice: Configure GTM with performance-based routing and automatic failover. Set health checks at 30s intervals with 3-strike failure detection.",
  },
  waf: {
    title: "App & API Protector (AAP)",
    description: "Adaptive WAF with automated rule updates, API discovery, and behavioral-based detection. Replaces legacy KSD/WAP rule sets.",
    bestPractice: "Best Practice: Start in Alert mode for 7 days, analyze false positives, then switch to Deny. Use Adaptive Security Engine for automatic rule tuning.",
  },
  bot: {
    title: "Bot Manager Premier",
    description: "Behavioral bot detection using device fingerprinting, browser validation, and machine learning. Handles sophisticated evasion techniques.",
    bestPractice: "Best Practice: Deploy in Monitoring mode first, build baseline for 48-72 hours, then enable actions. Use Crypto Challenge for suspected bots to preserve UX.",
  },
  prolexic: {
    title: "Prolexic / Site Shield",
    description: "Always-on DDoS protection absorbing attacks before they reach the origin. Site Shield hides origin IPs from direct targeting.",
    bestPractice: "Best Practice: Enable Site Shield immediately to cloak origins. Combine with Prolexic for volumetric DDoS mitigation at 10+ Tbps capacity.",
  },
};

const ArchitectureSlide = () => {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const HotspotBtn = ({ id, label, icon: Icon, color }: { id: string; label: string; icon: any; color: string }) => (
    <button
      onClick={() => setActiveHotspot(id)}
      className={`callout-badge pulse-badge flex items-center gap-2 ${color} text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-all`}
    >
      <Icon size={16} /> {label}
    </button>
  );

  return (
    <SlideLayout id="architecture">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm">Solution Design</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">Architecture Overview</h2>
          <p className="text-muted-foreground">Click any product badge for best practices & details</p>
        </div>

        {/* Architecture Diagram */}
        <div className="relative bg-card rounded-2xl border border-border p-8 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-4 md:gap-2">
            {/* Origin Layer */}
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-secondary text-center text-lg mb-4">
                <Server size={20} className="inline mr-2 text-akamai-green" />
                Origin Infrastructure
              </h3>
              <div className="space-y-3">
                <div className="bg-muted rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-2 font-semibold text-sm text-secondary">
                    <Cloud size={16} className="text-primary" /> AWS (Microservices)
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">APIs, Checkout, Product Catalog</p>
                </div>
                <div className="bg-muted rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-2 font-semibold text-sm text-secondary">
                    <Server size={16} className="text-akamai-green" /> On-Premise (Legacy)
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Monolith, Legacy Sites</p>
                </div>
                <div className="bg-muted rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-2 font-semibold text-sm text-secondary">
                    <Network size={16} className="text-akamai-purple" /> Acquired Companies
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Migration targets</p>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex flex-col items-center gap-2">
              <ArrowRight size={32} className="text-primary flow-arrow" />
              <span className="text-xs text-muted-foreground font-medium">SureRoute</span>
            </div>

            {/* Akamai Edge */}
            <div className="bg-secondary/5 rounded-xl p-5 border-2 border-primary/30 space-y-4">
              <h3 className="font-display font-semibold text-center text-lg text-primary mb-2">
                <Globe size={20} className="inline mr-2" />
                Akamai Intelligent Edge
              </h3>

              {/* Delivery Layer */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-primary tracking-wider uppercase">Delivery</p>
                <div className="flex flex-wrap gap-2">
                  <HotspotBtn id="ion" label="Ion" icon={Zap} color="bg-primary" />
                  <HotspotBtn id="ivm" label="Image Manager" icon={Image} color="bg-primary" />
                  <HotspotBtn id="gtm" label="GTM" icon={Globe} color="bg-primary" />
                </div>
              </div>

              {/* Security Layer */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-accent tracking-wider uppercase">Security</p>
                <div className="flex flex-wrap gap-2">
                  <HotspotBtn id="waf" label="AAP (WAF)" icon={Shield} color="bg-accent" />
                  <HotspotBtn id="bot" label="Bot Manager" icon={Shield} color="bg-accent" />
                  <HotspotBtn id="prolexic" label="Prolexic + Site Shield" icon={Shield} color="bg-accent" />
                </div>
              </div>

              {/* Monitoring */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-akamai-green tracking-wider uppercase">Observability</p>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-2 bg-akamai-green text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold">
                    <BarChart3 size={16} /> mPulse (RUM)
                  </div>
                  <div className="flex items-center gap-2 bg-akamai-green text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold">
                    <BarChart3 size={16} /> DataStream
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex flex-col items-center gap-2">
              <ArrowRight size={32} className="text-primary flow-arrow" />
              <span className="text-xs text-muted-foreground font-medium">4,200+ PoPs</span>
            </div>

            {/* End Users */}
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-secondary text-center text-lg mb-4">
                <Users size={20} className="inline mr-2 text-accent" />
                End Users
              </h3>
              <div className="space-y-3">
                {["🌎 North America", "🌎 LATAM", "🌍 Europe", "🌏 Asia"].map((region) => (
                  <div key={region} className="bg-muted rounded-lg p-3 text-center border border-border">
                    <span className="text-sm font-medium text-secondary">{region}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          🟢 Color-coded: <span className="text-primary font-semibold">Blue = Delivery</span> · <span className="text-accent font-semibold">Orange = Security</span> · <span className="text-akamai-green font-semibold">Green = Observability</span>
        </p>
      </div>

      {/* Hotspot Modals */}
      {Object.entries(hotspots).map(([id, data]) => (
        <CalloutModal key={id} open={activeHotspot === id} onOpenChange={() => setActiveHotspot(null)} title={data.title}>
          <p>{data.description}</p>
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mt-2">
            <p className="text-sm font-semibold text-primary">{data.bestPractice}</p>
          </div>
        </CalloutModal>
      ))}
    </SlideLayout>
  );
};

export default ArchitectureSlide;
