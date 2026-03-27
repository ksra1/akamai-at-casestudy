import { useState } from "react";
import SlideLayout from "./SlideLayout";
import CalloutModal from "./CalloutModal";
import { Clock, Zap, Image, AlertTriangle, Globe, Users, CheckCircle2, ArrowRight } from "lucide-react";

const deliverySolutions = [
  {
    icon: Clock, issue: "5,000 hostnames in 30 days", solution: "PAPI (Property API) + CPS Automation + Bulk DNS",
    products: ["PAPI (Property API)", "CPS (Cert Provisioning)", "mPulse"],
    steps: [
      "Define reusable config template — baseline caching, compression, origin health checks, WAF rules bundled as a golden template",
      "PAPI (Property API) bulk-creates 5,000 properties from template in parallel — zero manual configuration per hostname",
      "Automate SSL/TLS certificate provisioning via CPS (Certificate Provisioning System) API — bulk-enroll Domain Validation (DV) certs for all 5,000 hostnames. Use SAN certificates to group hostnames (up to 100 SANs per cert) reducing cert count to ~50 managed certificates",
      "Orchestrate phased DNS cutover — CNAME updates in batches (1,000/week) coordinated with customer's DNS team",
      "mPulse monitors real-user performance per cohort — page load times, Core Web Vitals, error rates validate each batch",
    ],
    result: "Zero manual Akamai work, automated cert lifecycle, phased risk mitigation per batch, rollback capability, 30-day completion",
    bestPractice: "Use golden templates with locked-down rules to prevent configuration drift across 5,000 properties. Use SAN grouping in CPS to minimize cert management overhead.",
  },
  {
    icon: Zap, issue: "Handle 5x peak traffic", solution: "Ion + SureRoute + GTM Failover",
    products: ["Ion", "GTM", "mPulse"],
    steps: [
      "Configure aggressive edge caching for static & semi-dynamic content (e.g. product catalog pages that update every few hours — cached at edge with short TTLs or cache keys for variation)",
      "Enable SureRoute intelligent origin selection — real-time monitoring of origin latency across multiple paths",
      "Set up GTM (Global Traffic Manager) failover groups with health checks — if primary origin is degraded, traffic auto-routes to secondary origin (when available)",
      "mPulse tracks cache hit ratio and user experience metrics (LCP, TTFB) to validate offload effectiveness during peaks",
    ],
    result: "Edge absorbs 5× spikes, origin handles baseline load only — reducing the risk of overload-related 5xx errors",
    bestPractice: "Enable Tiered Distribution to reduce origin requests by 60-80% through parent cache hierarchy",
  },
  {
    icon: Image, issue: "Slow image loading", solution: "Image & Video Manager (IVM)",
    products: ["Image & Video Manager", "mPulse"],
    steps: [
      "Enable IVM on all image paths in Property Manager to intercept image requests at edge",
      "Configure quality thresholds — IVM auto-detects browser and converts to optimal format (WebP/AVIF/JPEG fallback)",
      "Enable responsive sizing — IVM detects device width and scales images (mobile 480px, tablet 768px, desktop 1920px)",
      "mPulse measures LCP contribution and conversion metrics — target <200ms image delivery",
    ],
    result: "Images 50-70% smaller, zero origin CPU cost for transformations, faster page loads, improved conversion",
    bestPractice: "Use perceptual quality tuning instead of fixed quality — maintains visual quality with maximum compression",
  },
  {
    icon: AlertTriangle, issue: "No testing — straight to production", solution: "Phased Cohort Rollout with Instant Rollback",
    products: ["PAPI (Property API)", "mPulse", "GTM"],
    steps: [
      "Onboard hostnames in controlled waves (pilot → scale) — Wave 1 is 500 low-risk hostnames to validate golden template",
      "DNS cutover per wave: update CNAME from legacy provider to Akamai edge. Rollback = revert CNAME (instant, no Akamai config change needed)",
      "mPulse monitors real-user performance per wave — error rate, LCP, TTFB. If any metric degrades beyond threshold, wave is paused and CNAME reverted",
      "Each wave must pass a success checkpoint (error rate <0.5%, performance within 10% of baseline) before the next wave begins",
    ],
    result: "Production-first approach with built-in safety — no formal QA environment needed, rollback in minutes via DNS",
    bestPractice: "Keep legacy provider active during migration window — dual-path ensures instant fallback until all waves are validated",
  },
  {
    icon: Globe, issue: "Multi-geography resource management", solution: "GTM Geographic Routing + DataStream",
    products: ["GTM", "mPulse", "DataStream"],
    steps: [
      "Define primary/secondary origins per region — EU (Frankfurt + London), US (Virginia + Oregon), LATAM (São Paulo)",
      "Configure GTM (Global Traffic Manager) health checks every 60s — when primary origin exceeds latency threshold, traffic auto-routes to secondary",
      "mPulse tracks real latency per region — if EU origin latency >300ms, GTM auto-reduces traffic allocation",
      "DataStream (Akamai's real-time log streaming product) delivers per-region traffic trends and origin utilization to your SIEM — capacity planning becomes data-driven",
    ],
    result: "Centralized resource governance, no regional outages, traffic auto-adapts to conditions",
    bestPractice: "Use GTM performance-based routing (not just geographic) — routes users to fastest origin, not just nearest",
  },
  {
    icon: Users, issue: "New teams untrained on Akamai", solution: "Config-as-Code Templates + Self-Service",
    products: ["PAPI (Property API)", "Control Center"],
    steps: [
      "Build reusable Terraform/IaC templates for Akamai property configuration — baseline caching, compression, WAF rules bundled per use case",
      "Create property library with pre-built rule bundles — teams select template and deploy via Git push",
      "Define deployment pipeline — Git push triggers PAPI property activation with automatic rollback on validation failure",
      "Control Center provides self-service dashboards — teams view cache metrics, origin health without CLI knowledge",
    ],
    result: "Teams onboard hostnames with zero CLI knowledge, consistent configuration, deployment time reduced 80%",
    bestPractice: "Lock template rules as read-only — teams can extend but not modify baseline security and caching rules",
  },
];

const SolutionDesignSlide = () => {
  const [activeModal, setActiveModal] = useState<number | null>(null);

  return (
    <SlideLayout id="delivery-solutions" variant="alt" pageNumber={5}>
      <div className="space-y-5">
        <div>
          <p className="text-primary font-semibold tracking-[0.2em] uppercase text-xs mb-2">Section A — Delivery Strategy</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Delivery Solutions</h2>
          <p className="text-muted-foreground text-sm mt-1">Click each challenge for step-by-step solution</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {deliverySolutions.map((s, i) => (
            <div key={s.issue} onClick={() => setActiveModal(i)} className="stripe-card callout-badge p-4 group cursor-pointer">
              <div className="flex items-start gap-3">
                <s.icon size={20} className="text-primary shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-foreground text-sm leading-tight">{s.issue}</h3>
                  <p className="text-xs text-primary font-semibold mt-0.5">{s.solution}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {s.products.map(p => (
                      <span key={p} className="text-[11px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-semibold">{p}</span>
                    ))}
                  </div>
                </div>
                <ArrowRight size={14} className="text-muted-foreground/30 group-hover:text-primary transition-colors shrink-0 mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {deliverySolutions.map((s, i) => (
        <CalloutModal key={s.issue} open={activeModal === i} onOpenChange={() => setActiveModal(null)} title={s.issue}>
          <div className="space-y-4">
            <div className="bg-primary/5 border border-primary/15 rounded p-3">
              <p className="text-sm font-semibold text-primary">{s.solution}</p>
            </div>
            <div className="space-y-3">
              {s.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{idx + 1}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
            <div className="bg-akamai-green/5 border border-akamai-green/20 rounded p-3 flex items-start gap-2">
              <CheckCircle2 size={16} className="text-akamai-green shrink-0 mt-0.5" />
              <p className="text-sm font-semibold text-akamai-green">{s.result}</p>
            </div>
            <div className="bg-accent/5 border border-accent/15 rounded p-3">
              <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-1">Best Practice</p>
              <p className="text-sm">{s.bestPractice}</p>
            </div>
          </div>
        </CalloutModal>
      ))}
    </SlideLayout>
  );
};

export default SolutionDesignSlide;
