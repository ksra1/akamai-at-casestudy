import { useState } from "react";
import SlideLayout from "./SlideLayout";
import CalloutModal from "./CalloutModal";
import { Clock, Zap, Image, AlertTriangle, Globe, Users, CheckCircle2, ArrowRight } from "lucide-react";

const deliverySolutions = [
  {
    icon: Clock,
    issue: "5,000 hostnames in 30 days",
    solution: "Property Manager API + Bulk DNS Cutover",
    products: ["Property Manager API", "mPulse"],
    steps: [
      "Define reusable config template — baseline caching, compression, origin health checks, WAF rules bundled as a golden template",
      "PAPI bulk-creates 5,000 properties from template in parallel — zero manual configuration per hostname",
      "Orchestrate phased DNS cutover — CNAME updates in batches (1,000/week) coordinated with customer's DNS team",
      "mPulse monitors real-user performance per cohort — page load times, Core Web Vitals, error rates validate each batch",
    ],
    result: "Zero manual Akamai work, phased risk mitigation per batch, rollback capability, 30-day completion",
    bestPractice: "Use golden templates with locked-down rules to prevent configuration drift across 5,000 properties",
  },
  {
    icon: Zap,
    issue: "Handle 5x peak traffic",
    solution: "Ion + SureRoute + GTM Failover",
    products: ["Ion", "GTM", "mPulse"],
    steps: [
      "Configure aggressive edge caching for static & semi-dynamic content — absorb peak load at CDN before origin",
      "Enable SureRoute intelligent origin selection — real-time monitoring of origin latency across multiple origins",
      "Set up GTM failover groups with health checks — if primary origin latency exceeds threshold, traffic auto-routes to secondary",
      "mPulse tracks cache hit ratio and user experience metrics (LCP, TTFB) to validate offload effectiveness during peaks",
    ],
    result: "Origins handle baseline traffic only, edge absorbs 5x spikes, zero downtime during peaks",
    bestPractice: "Enable Tiered Distribution to reduce origin load by 60-80% through parent cache hierarchy",
  },
  {
    icon: Image,
    issue: "Slow image loading",
    solution: "Image & Video Manager (IVM)",
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
    icon: AlertTriangle,
    issue: "No testing — straight to production",
    solution: "Canary Deployment via GTM Traffic Steering",
    products: ["GTM", "Property Manager API", "mPulse"],
    steps: [
      "Set up two property versions — current (stable) and new (canary). GTM routes traffic by split percentage",
      "Push to production but GTM routes only 10% traffic to new property for 2 hours — 90% stays on stable",
      "mPulse monitors error rate and performance on canary — if errors exceed 0.5% or performance degrades >20%, GTM auto-reverts",
      "After clean 2-hour window, ramp to 50% for 4 hours, then 100%. Any threshold breach triggers immediate rollback",
    ],
    result: "Production deployment without formal QA, automatic safety guardrails, complete rollback in <5 minutes",
    bestPractice: "Set mPulse anomaly alerts to auto-trigger GTM failback — no human intervention needed for rollback",
  },
  {
    icon: Globe,
    issue: "Multi-geography resource management",
    solution: "GTM Geographic Routing + DataStream",
    products: ["GTM", "mPulse", "DataStream"],
    steps: [
      "Define primary/secondary origins per region — EU (Frankfurt + London), US (Virginia + Oregon), APAC (Tokyo + Singapore)",
      "Configure GTM health checks every 60s — when primary origin exceeds latency threshold, traffic auto-routes to secondary",
      "mPulse tracks real latency per region — if EU origin latency >300ms, GTM auto-reduces traffic allocation",
      "DataStream provides per-region traffic trends and origin utilization — capacity planning becomes data-driven",
    ],
    result: "Centralized resource governance, no regional outages, traffic auto-adapts to conditions",
    bestPractice: "Use GTM performance-based routing (not just geographic) — routes users to fastest origin, not just nearest",
  },
  {
    icon: Users,
    issue: "New teams untrained on Akamai",
    solution: "Config-as-Code Templates + Self-Service",
    products: ["Property Manager API", "Control Center"],
    steps: [
      "Build reusable Terraform/IaC templates — baseline caching, compression, WAF rules bundled per use case",
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
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm">Section A — Delivery Strategy</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">Delivery Solutions</h2>
          <p className="text-muted-foreground text-sm">Click each challenge for step-by-step solution</p>
        </div>

        {/* Visual cards grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {deliverySolutions.map((s, i) => (
            <div
              key={s.issue}
              onClick={() => setActiveModal(i)}
              className="visual-card callout-badge bg-card rounded-xl border border-border p-5 shadow-sm group"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <s.icon size={22} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-secondary text-sm leading-tight">{s.issue}</h3>
                  <p className="text-xs text-primary font-semibold mt-1">{s.solution}</p>
                </div>
              </div>

              {/* Product pills */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {s.products.map(p => (
                  <span key={p} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">{p}</span>
                ))}
              </div>

              <p className="text-xs text-muted-foreground line-clamp-2">{s.result}</p>

              <div className="mt-3 flex items-center gap-1 text-primary text-xs font-semibold group-hover:gap-2 transition-all">
                View steps <ArrowRight size={12} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail modals */}
      {deliverySolutions.map((s, i) => (
        <CalloutModal key={s.issue} open={activeModal === i} onOpenChange={() => setActiveModal(null)} title={s.issue}>
          <div className="space-y-4">
            <div className="bg-primary/5 border border-primary/15 rounded-lg p-3">
              <p className="text-sm font-semibold text-primary">{s.solution}</p>
            </div>

            <div className="space-y-3">
              {s.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step}</p>
                </div>
              ))}
            </div>

            <div className="bg-akamai-green/8 border border-akamai-green/20 rounded-lg p-3 flex items-start gap-2">
              <CheckCircle2 size={16} className="text-akamai-green shrink-0 mt-0.5" />
              <p className="text-sm font-semibold text-akamai-green">{s.result}</p>
            </div>

            <div className="bg-accent/8 border border-accent/20 rounded-lg p-3">
              <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-1">Best Practice</p>
              <p className="text-sm">{s.bestPractice}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {s.products.map(p => (
                <span key={p} className="text-xs font-semibold px-2.5 py-1 bg-primary/10 text-primary rounded-full">{p}</span>
              ))}
            </div>
          </div>
        </CalloutModal>
      ))}
    </SlideLayout>
  );
};

export default SolutionDesignSlide;
