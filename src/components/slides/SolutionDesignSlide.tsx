import { useState } from "react";
import SlideLayout from "./SlideLayout";
import CalloutModal from "./CalloutModal";
import { Clock, Zap, Image, AlertTriangle, Globe, Users, CheckCircle2, ArrowRight } from "lucide-react";

const deliverySolutions = [
  {
    icon: Clock,
    issue: "5,000 hostnames in 30 days",
    headline: "Automate everything. Click nothing.",
    solution: "Property Manager API + CPS Automation + Bulk DNS",
    products: ["Property Manager API", "CPS API", "mPulse"],
    steps: [
      "Golden template — caching, compression, origin health, WAF rules baked in. One template to rule them all.",
      "PAPI bulk-creates 5,000 properties in parallel. Zero manual config per hostname.",
      "CPS API auto-provisions SSL certs — SAN grouping (100 per cert) cuts cert management to ~50 certs total.",
      "Phased DNS cutover — 1,000 hostnames/week, coordinated with customer's DNS team.",
      "mPulse validates each batch — page load, Core Web Vitals, error rates. Green light → next wave.",
    ],
    result: "Fully automated pipeline. No portal clicking. 30-day completion with rollback at every step.",
    bestPractice: "Lock golden template rules to prevent config drift. SAN grouping in CPS minimizes cert overhead.",
  },
  {
    icon: Zap,
    issue: "Handle 5× peak traffic",
    headline: "Let the edge do the heavy lifting.",
    solution: "Ion + SureRoute + GTM Failover",
    products: ["Ion", "GTM", "mPulse"],
    steps: [
      "Aggressive edge caching for static & semi-dynamic content — absorb spikes before origin knows it happened.",
      "SureRoute picks the fastest path to origin in real time. Bad route? Automatically rerouted.",
      "GTM failover: if primary origin goes slow, traffic auto-shifts to secondary. No human needed.",
      "mPulse tracks cache hit ratio + user experience during peaks. You see problems before users complain.",
    ],
    result: "Edge absorbs 5× spikes. Origin handles baseline only — reducing risk of overload-related 5xx.",
    bestPractice: "Enable Tiered Distribution — reduces origin requests 60-80% via parent cache hierarchy.",
  },
  {
    icon: Image,
    issue: "Slow image loading",
    headline: "Stop serving desktop images to phones.",
    solution: "Image & Video Manager (IVM)",
    products: ["Image & Video Manager", "mPulse"],
    steps: [
      "Enable IVM on all image paths — intercept at edge, transform on the fly.",
      "Auto-detect browser → WebP/AVIF/JPEG fallback. Best format, zero developer effort.",
      "Device-aware sizing — mobile 480px, tablet 768px, desktop 1920px. Automatically.",
      "mPulse measures LCP impact. Target: <200ms image delivery.",
    ],
    result: "Images 50-70% smaller. Zero origin CPU. Faster pages. Better conversions.",
    bestPractice: "Perceptual quality tuning > fixed quality. Looks the same, compresses way more.",
  },
  {
    icon: AlertTriangle,
    issue: "No testing — straight to prod",
    headline: "We don't skip testing. We make it invisible.",
    solution: "Phased Cohort Rollout + Instant Rollback",
    products: ["Property Manager API", "mPulse", "GTM"],
    steps: [
      "Onboard in waves — Wave 1 is 500 low-risk hostnames. Prove the template works before scaling.",
      "DNS cutover per wave: CNAME to Akamai edge. Rollback = revert CNAME. Instant. No config change needed.",
      "mPulse watches each wave — errors, LCP, TTFB. Threshold breach? Wave pauses, CNAME reverts.",
      "Success checkpoint per wave (error rate <0.5%, perf within 10%) before next wave begins.",
    ],
    result: "Production-first with built-in safety nets. No QA environment needed. Rollback in minutes via DNS.",
    bestPractice: "Keep legacy provider active during migration — dual-path ensures instant fallback until validated.",
  },
  {
    icon: Globe,
    issue: "Multi-geography coordination",
    headline: "Three regions. One control plane.",
    solution: "GTM Geographic Routing + DataStream",
    products: ["GTM", "mPulse", "DataStream"],
    steps: [
      "Primary + secondary origins per region — EU (Frankfurt + London), US (Virginia + Oregon), LATAM (São Paulo).",
      "GTM health checks every 60s — origin too slow? Traffic auto-reroutes. No tickets filed.",
      "mPulse per-region latency tracking — if EU >300ms, GTM reduces allocation automatically.",
      "DataStream: per-region traffic trends, origin utilization. Capacity planning becomes data-driven.",
    ],
    result: "Centralized governance. No regional outages. Traffic adapts to conditions automatically.",
    bestPractice: "Performance-based routing > geographic routing. Route to fastest origin, not just nearest.",
  },
  {
    icon: Users,
    issue: "Teams new to Akamai",
    headline: "Make it so easy they can't mess it up.",
    solution: "Config-as-Code + Self-Service Dashboards",
    products: ["Property Manager API", "Control Center"],
    steps: [
      "Terraform templates per use case — teams pick a template and deploy via Git push.",
      "Pre-built rule bundles — static CDN, API acceleration, WAF baseline. Choose your flavor.",
      "Git push → PAPI activation → auto-rollback on validation failure. CI/CD for CDN configs.",
      "Control Center dashboards — cache metrics, origin health. No CLI knowledge required.",
    ],
    result: "Teams go from zero Akamai knowledge to deploying in production. Safely.",
    bestPractice: "Lock template base rules as read-only. Teams extend, but can't break the foundation.",
  },
];

const SolutionDesignSlide = () => {
  const [activeModal, setActiveModal] = useState<number | null>(null);

  return (
    <SlideLayout id="delivery-solutions" variant="alt" pageNumber={5}>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm">Section A — How We Ship It</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">Delivery Solutions</h2>
          <p className="text-muted-foreground text-sm">Click any card for the full playbook</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {deliverySolutions.map((s, i) => (
            <div
              key={s.issue}
              onClick={() => setActiveModal(i)}
              className="visual-card callout-badge bg-card rounded-xl border border-border p-5 shadow-sm group cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <s.icon size={24} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-secondary leading-tight">{s.issue}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 italic">{s.headline}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {s.products.map(p => (
                      <span key={p} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">{p}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-primary text-xs font-semibold group-hover:gap-2 transition-all shrink-0 mt-1">
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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
