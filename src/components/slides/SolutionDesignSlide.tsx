import { useState } from "react";
import SlideLayout from "./SlideLayout";
import CalloutModal from "./CalloutModal";
import MigrationPhaseViewer from "./MigrationPhaseViewer";
import HostnamesOnboardingViewer from "./HostnamesOnboardingViewer";
import PhasedRolloutViewer from "./PhasedRolloutViewer";
import PeakTrafficViewer from "./PeakTrafficViewer";
import ImageOptimizationViewer from "./ImageOptimizationViewer";
import TeamOnboardingViewer from "./TeamOnboardingViewer";
import { Clock, Zap, Image, AlertTriangle, Globe, Users, CheckCircle2, ArrowRight, Layers } from "lucide-react";

const deliverySolutions = [
  {
    icon: Clock, issue: "5,000 hostnames in 30 days", solution: "PAPI (Property API) + CPS Automation + Bulk DNS",
    products: ["PAPI (Property API)", "CPS (Cert Provisioning)", "mPulse"],
    steps: [
      "Define reusable config template — baseline caching, compression, origin health checks, WAF rules bundled as a golden template",
      "PAPI (Property API) bulk-creates 5,000 properties from template in parallel — zero manual configuration per hostname",
      "Automate cert provisioning via CPS — Akamai: CPS generates CSRs for all 5,000 domains, submits to CA, receives certs, deploys ~50 SAN certs to edge servers. AT Retailers: approve domain validation when CA sends requests (email/DNS TXT challenge). Target <24 hours approval turnaround.",
      "Orchestrate phased DNS cutover — Week 2: Wave 1 (1,250 CNAMEs) | Week 3: Wave 2 (2,500 CNAMEs) | Week 4: Wave 3 (1,250 CNAMEs). Akamai: monitor edge health and provide instant rollback if issues arise (revert CNAME).",
      "Validate per wave via mPulse — measure real-user performance (LCP, TTFB, error rate) per hostname cohort. Success checkpoint: error rate <0.5%, performance within 10% baseline. If any metric fails, revert CNAME (instant rollback).",
    ],
    result: "5,000 hostnames live in 30 days, zero manual Akamai configuration work, automated cert lifecycle, phased risk mitigation per wave, instant rollback capability per DNS cutover",
    bestPractice: "Use golden templates with locked-down rules to prevent configuration drift across 5,000 properties. Use SAN grouping in CPS to minimize cert management (50 certs vs 5,000). **CRITICAL:** Your domain validation team must approve CA requests within 24 hours—this is the longest bottleneck. Delayed approvals will delay the entire 30-day timeline.",
  },
  {
    icon: Zap, issue: "Handle 5x peak traffic", solution: "Ion + SureRoute + GTM Failover + EdgeWorkers Waiting Room",
    products: ["Ion", "GTM", "EdgeWorkers", "Visitor Waiting Room", "mPulse"],
    steps: [
      "Configure aggressive edge caching for static & semi-dynamic content (e.g. product catalog pages that update every few hours — cached at edge with short TTLs or cache keys for variation)",
      "Enable SureRoute intelligent origin selection — real-time monitoring of origin latency across multiple paths",
      "Set up GTM (Global Traffic Manager) failover groups with health checks — if primary origin is degraded, traffic auto-routes to secondary origin (when available)",
      "Deploy EdgeWorkers to serve personalized waiting room pages at edge — when traffic exceeds origin capacity, users enter branded queue with estimated wait times, regional info, and personalized messaging. EdgeWorkers calculates queue position based on request timestamp without touching origin",
      "mPulse tracks cache hit ratio and user experience metrics (LCP, TTFB) to validate offload effectiveness during peaks. Monitor waiting room engagement metrics to optimize queue messaging",
    ],
    result: "Edge absorbs 5× spikes, personalized waiting room prevents errors while keeping users engaged, zero origin CPU impact from queue management, 99.99% uptime during extreme bursts",
    bestPractice: "Use EdgeWorkers for waiting room logic to serve queue pages with zero origin requests — origin capacity is conserved entirely for actual checkout traffic. Pre-configure queue thresholds based on origin capacity benchmarks.",
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
  {
    icon: Layers, issue: "Monolith-to-microservices migration", solution: "EdgeWorkers Orchestrates Dual Migration (UI + Services)",
    products: ["EdgeWorkers", "GTM", "PAPI"],
    steps: [
      "On-board both UI and microservices to Akamai — route all traffic through EdgeWorkers. EdgeWorkers becomes the central orchestrator for both UI server routing and microservice call routing.",
      "Route legacy UIs and legacy APIs — existing websites continue serving from on-prem monolith (both UI layer and API layer). New UIs and microservices ready in AWS.",
      "Define canary for mixed versions — 95% traffic gets legacy UI calling legacy APIs, 5% gets new UI calling new microservices. Both layers migrate in tandem.",
      "Progressive tenant migration — feature flags control tenant versions. Each tenant transitions: legacy UI→legacy API → new UI→new microservices. All decisions made at edge.",
      "Instant rollback for either layer — if UI has issues, revert UI routing without touching microservices. If microservices have issues, revert API routing independently. Or rollback both simultaneously.",
    ],
    result: "Zero downtime dual migration, UI and microservice versions orchestrated independently, instant per-layer rollback capability, legacy and new UI+API combinations coexist during transition",
    bestPractice: "Store UI and microservice routing rules in EdgeWorkers KV storage — decoupled control for each layer. Optional: Use EdgeWorkers for API contract translation (adds 2-4 weeks). Alternative: require UI code updates to call new microservice endpoints (faster).",
  },
];

const SolutionDesignSlide = () => {
  const [activeModal, setActiveModal] = useState<number | null>(null);

  return (
    <SlideLayout id="delivery-solutions" variant="alt" pageNumber={5}>
      <div className="space-y-5 stagger-children">
        <div>
          <p className="text-primary font-semibold tracking-[0.2em] uppercase text-xs mb-2">Delivery</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Delivery Solutions</h2>
          <p className="text-muted-foreground text-sm mt-1">Click each challenge for step-by-step solution</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {deliverySolutions.map((s, i) => (
            <div key={s.issue} onClick={() => setActiveModal(i)} className="clean-card callout-badge p-4 group cursor-pointer hover:border-primary/30 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <s.icon size={16} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-foreground text-sm leading-tight">{s.issue}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.solution}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {s.products.map(p => (
                      <span key={p} className="text-[11px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-medium">{p}</span>
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
          {i === 0 ? (
            // Hostnames onboarding gets timeline viewer
            <HostnamesOnboardingViewer />
          ) : i === 1 ? (
            // Handle 5x peak traffic gets peak traffic viewer
            <PeakTrafficViewer />
          ) : i === 2 ? (
            // Slow image loading gets image optimization viewer
            <ImageOptimizationViewer />
          ) : i === 3 ? (
            // Phased rollout testing strategy gets interactive viewer
            <PhasedRolloutViewer />
          ) : i === 4 ? (
            // New teams untrained gets team onboarding viewer
            <TeamOnboardingViewer />
          ) : i === 5 ? (
            // Migration solution gets interactive phase viewer
            <MigrationPhaseViewer />
          ) : (
            // Other solutions get standard step-by-step layout
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
          )}
        </CalloutModal>
      ))}
    </SlideLayout>
  );
};

export default SolutionDesignSlide;
