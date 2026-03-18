import { useState } from "react";
import SlideLayout from "./SlideLayout";
import CalloutModal from "./CalloutModal";
import { Zap, Image, Globe, Code2, BarChart3, ArrowRight, CheckCircle2, Layers } from "lucide-react";

const solutions = [
  {
    icon: Zap,
    title: "Ion",
    subtitle: "Dynamic Acceleration + Caching",
    description: "Adaptive acceleration with intelligent caching strategies, HTTP/2 push, prefetching, and SureRoute for reliable origin connectivity.",
    highlights: ["Tiered Distribution reduces origin load 60-80%", "SureRoute ensures fastest path to origin", "Prefetching for predictable user journeys", "Adaptive acceleration per content type"],
  },
  {
    icon: Image,
    title: "Image & Video Manager",
    subtitle: "Automatic Media Optimization",
    description: "Edge-based image transformation: auto-format (WebP/AVIF), responsive sizing, quality optimization, and perceptual quality tuning.",
    highlights: ["50-70% image payload reduction", "Automatic format negotiation", "No origin-side changes required", "Policy-based per content type"],
  },
  {
    icon: Globe,
    title: "Global Traffic Management",
    subtitle: "Multi-Geo Intelligent Routing",
    description: "DNS-based load balancing with performance routing, geographic targeting, and automatic failover across origins and regions.",
    highlights: ["Performance-based routing decisions", "Automatic failover (30s health checks)", "Geographic load distribution", "Weighted routing for canary deploys"],
  },
  {
    icon: Code2,
    title: "Property Manager Bulk API",
    subtitle: "5,000 Hostnames at Scale",
    description: "Template-based configuration with API automation for mass onboarding. Terraform-compatible for infrastructure as code.",
    highlights: ["Golden template approach", "Bulk API for batch operations", "Terraform provider for IaC", "Phased DNS cutover strategy"],
  },
  {
    icon: BarChart3,
    title: "mPulse",
    subtitle: "Real User Monitoring",
    description: "Real User Monitoring for measuring actual end-user performance. Core Web Vitals tracking, geographic breakdowns, and alerting.",
    highlights: ["Core Web Vitals dashboard", "Geographic performance heatmaps", "Business KPI correlation", "Anomaly detection & alerts"],
  },
];

const DeliverySlide = () => {
  const [modalIdx, setModalIdx] = useState<number | null>(null);
  const [bulkModal, setBulkModal] = useState(false);

  return (
    <SlideLayout id="delivery" variant="alt">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm">Performance & Scale</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">Delivery Strategy</h2>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {solutions.map((s, i) => (
            <div
              key={s.title}
              onClick={() => setModalIdx(i)}
              className="callout-badge bg-card rounded-xl p-5 shadow-sm border border-border hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer group"
            >
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                <s.icon size={24} className="text-primary" />
              </div>
              <h3 className="font-display font-semibold text-secondary text-base">{s.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{s.subtitle}</p>
              <p className="text-primary text-xs mt-3 font-semibold group-hover:underline">Details →</p>
            </div>
          ))}
        </div>

        {/* Bulk Onboarding CTA */}
        <div
          onClick={() => setBulkModal(true)}
          className="callout-badge bg-secondary text-secondary-foreground rounded-xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition-all"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary w-14 h-14 rounded-xl flex items-center justify-center">
                <Layers size={28} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">How to Onboard 5,000 Hostnames in 30 Days</h3>
                <p className="text-secondary-foreground/70 text-sm">Template-driven bulk automation with phased DNS cutover</p>
              </div>
            </div>
            <ArrowRight size={24} className="text-primary" />
          </div>
        </div>
      </div>

      {/* Solution Modals */}
      {solutions.map((s, i) => (
        <CalloutModal key={s.title} open={modalIdx === i} onOpenChange={() => setModalIdx(null)} title={s.title}>
          <p className="text-muted-foreground italic mb-2">{s.subtitle}</p>
          <p>{s.description}</p>
          <div className="space-y-2 mt-4">
            {s.highlights.map((h) => (
              <div key={h} className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                <span className="text-sm">{h}</span>
              </div>
            ))}
          </div>
        </CalloutModal>
      ))}

      {/* Bulk Onboarding Modal */}
      <CalloutModal open={bulkModal} onOpenChange={setBulkModal} title="Onboarding 5,000 Hostnames in 30 Days">
        <div className="space-y-4">
          <p>A phased, template-driven approach using Akamai's Property Manager API and Terraform provider:</p>
          {[
            { phase: "Days 1-3", title: "Golden Template Creation", desc: "Build 3-5 configuration templates (e-commerce, content, API) covering 90%+ of hostname patterns. Include Ion, AAP, and Bot Manager baseline." },
            { phase: "Days 4-7", title: "Wave 1 — Pilot (500 hostnames)", desc: "Bulk API onboarding of first 500 hostnames using templates. Validate caching, SSL, and WAF behavior. Establish monitoring baseline with mPulse." },
            { phase: "Days 8-14", title: "Wave 2 — Scale (2,000 hostnames)", desc: "Automated bulk onboarding via Terraform pipelines. Parallel DNS cutover with GTM-based canary routing (10% → 50% → 100%)." },
            { phase: "Days 15-21", title: "Wave 3 — Remaining (2,500 hostnames)", desc: "Final batch onboarding. Address edge cases and custom configurations. Run performance validation against mPulse baselines." },
            { phase: "Days 22-30", title: "Hardening & Optimization", desc: "Cache hit ratio optimization, WAF rule tuning (alert → deny), Bot Manager policy refinement, documentation and training handoff." },
          ].map((p) => (
            <div key={p.phase} className="border-l-4 border-primary pl-4">
              <p className="font-semibold text-primary text-sm">{p.phase}: {p.title}</p>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </CalloutModal>
    </SlideLayout>
  );
};

export default DeliverySlide;
