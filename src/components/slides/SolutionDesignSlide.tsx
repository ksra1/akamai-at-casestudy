import SlideLayout from "./SlideLayout";
import { Truck, CheckCircle2, ArrowRight } from "lucide-react";

const deliveryChallenges = [
  {
    issue: "5,000 hostnames in 30 days",
    solution: "Property Manager API (PAPI) + Bulk DNS Cutover Orchestration",
    benefit: "Automated property creation + coordinated multi-phase DNS migration",
    details: "Step 1: Define reusable config template for consistency baseline.\nStep 2: PAPI bulk-creates 5,000 properties from template in parallel.\nStep 3: Week 1: Planning & testing with customer's DNS team. Weeks 2-4: Orchestrate bulk DNS cutover—phase CNAME updates in batches (1,000/week) at their provider.\nStep 4: mPulse monitors real-user performance in real-time—RUM data, page load times, Core Web Vitals, error rates per cohort to validate successful cutover during each batch.\nResult: Zero manual Akamai work, phased risk mitigation per batch, rollback capability, 30-day completion.",
    products: [
      { name: "Property Manager API", link: "https://techdocs.akamai.com/property-mgr/reference/api" },
      { name: "mPulse", link: "https://techdocs.akamai.com/mpulse/docs" },
    ],
  },
  {
    issue: "Handle 5x traffic during peak shopping events",
    solution: "Ion with intelligent edge caching + SureRoute origin optimization",
    benefit: "Origin protection via edge traffic absorption—prevent origin overload and automatic failover on degradation",
    details: "Step 1: Configure aggressive edge caching rules for static & semi-dynamic content to absorb peak load at CDN before origin.\nStep 2: Enable SureRoute intelligent origin selection—real-time monitoring of origin latency, CPU, and response time across multiple origins.\nStep 3: Set up GTM failover groups with health checks—if primary origin latency exceeds threshold, traffic auto-routes to secondary.\nStep 4: mPulse tracks origin response time, cache hit ratio, and user experience metrics (LCP, TTFB) to validate offload effectiveness during peak periods.\nResult: Origins handle baseline traffic only, edge absorbs 5x spikes, zero downtime during peaks, automatic recovery on origin health restoration.",
    products: [
      { name: "Ion", link: "https://techdocs.akamai.com/ion/docs/welcome" },
      { name: "Global Traffic Management", link: "https://techdocs.akamai.com/gtm/docs" },
      { name: "mPulse", link: "https://techdocs.akamai.com/mpulse/docs" },
    ],
  },
  {
    issue: "Slow image loading impacting conversion rates",
    solution: "Image & Video Manager (IAM) with on-demand format optimization",
    benefit: "50-70% payload reduction + automatic format selection per device type and browser capability",
    details: "Step 1: Enable IAM on all image paths in Property Manager to intercept image requests at edge.\nStep 2: Configure JPEG quality thresholds (85% quality default)—IAM auto-detects browser version and converts to optimal format (WebP for Chrome/Firefox, AVIF for Safari, JPEG fallback).\nStep 3: Enable responsive sizing—IAM detects device width and scales images appropriately (mobile 480px max, tablet 768px, desktop 1920px) to reduce unnecessary payload.\nStep 4: mPulse measures image load time (LCP contribution) and conversion metrics to validate impact—target <200ms image delivery.\nResult: Images 50-70% smaller, zero origin CPU cost for transformations, faster page loads, improved conversion rates, no manual image optimization needed.",
    products: [
      { name: "Image & Video Manager", link: "https://techdocs.akamai.com/ivm/docs" },
      { name: "mPulse", link: "https://techdocs.akamai.com/mpulse/docs" },
    ],
  },
  {
    issue: "Production-first deployment—customer bypassing testing phase",
    solution: "Canary deployment via GTM traffic steering + Progressive rollout validation",
    benefit: "Safe path to production without formal testing—staged rollout from 10% → 50% → 100% with automated rollback on error threshold",
    details: "Step 1: Set up two property versions in Property Manager—current (stable) and new (canary). GTM datacenter returns different property based on traffic split percentage.\nStep 2: Push to production but GTM routes only 10% of traffic to new property for 2 hours while 90% stays on stable version.\nStep 3: mPulse monitors error rate (JS errors, 5xx responses) and performance (LCP, CLS) on canary—if error rate exceeds 0.5% or performance degrades >20%, GTM auto-reverts to 100% stable traffic.\nStep 4: After 2 hours of <0.5% errors, GTM ramps to 50% for 4 hours, then 100% if metrics stay clean. If any threshold breached, immediate rollback to previous version.\nResult: Production deployment without formal QA process, automatic safety guardrails prevent bad code reaching users, complete rollback capability in <5 minutes.",
    products: [
      { name: "Global Traffic Management", link: "https://techdocs.akamai.com/gtm/docs" },
      { name: "Property Manager API", link: "https://techdocs.akamai.com/property-mgr/reference/api" },
      { name: "mPulse", link: "https://techdocs.akamai.com/mpulse/docs" },
    ],
  },
  {
    issue: "Multi-geography resource management (Europe, US, Asia failures/latency)",
    solution: "Global Traffic Management with Connective Intelligence + geographic failover routing",
    benefit: "Transparent origin failover per region + real-time latency-based steering—eliminate geographic single-points-of-failure",
    details: "Step 1: Define GTM datacenter failover groups by geography—EU group (primary: Frankfurt, secondary: London), US group (primary: Virginia, secondary: Oregon), APAC group (primary: Tokyo, secondary: Singapore).\nStep 2: Configure Connective Intelligence—GTM continuously probes each origin with synthetic checks every 60s (HTTP GET to /health endpoint) and tracks real latency via mPulse.\nStep 3: When primary origin in any region exceeds latency threshold (>300ms) or fails health check, GTM automatically shifts all traffic in that region to secondary origin—users experience transparent failover.\nStep 4: As primary origin recovers, GTM gradually ramps traffic back per region—mPulse tracks geographic failover events and validates failback performance.\nResult: Zero downtime from regional origin failures, automatic cross-region traffic steering, reduced latency per region, managed resources aligned with geographic demand.",
    products: [
      { name: "Global Traffic Management", link: "https://techdocs.akamai.com/gtm/docs" },
      { name: "mPulse", link: "https://techdocs.akamai.com/mpulse/docs" },
    ],
  },
  {
    issue: "New acquisition teams untrained on Akamai products",
    solution: "Managed config-as-code templates + self-service onboarding framework",
    benefit: "Reduce ramp-up time from weeks to days—standardized property templates, zero-touch deployment, minimal platform knowledge required",
    details: "Step 1: Build reusable PAPI property template in Terraform/Infrastructure-as-Code—includes baseline caching, compression, origin health checks, WAF rules, and monitoring rules.\nStep 2: Create property library with pre-built rule bundles (e-commerce baseline, API protection, static content CDN, etc.)—teams select template matching their use case.\nStep 3: Define deployment pipeline—teams push changes to Git, automation runs tests against staging, merges trigger PAPI property activation with automatic rollback if validation fails.\nStep 4: Luna Control Center provides self-service dashboards—teams view their properties' performance, cache metrics, and origin health without direct platform support.\nResult: Teams onboard new hostnames with zero Akamai CLI knowledge, consistent configuration across 5,000 properties, deployment time reduced 80%, support tickets drop 50%.",
    products: [
      { name: "Property Manager API", link: "https://techdocs.akamai.com/property-mgr/reference/api" },
      { name: "Luna Control Center", link: "https://techdocs.akamai.com/luna/docs" },
    ],
  },
];

// Parse steps from details string
const parseSteps = (details: string) => {
  const stepRegex = /Step \d+:|Result:/g;
  const parts = details.split(stepRegex).filter(p => p.trim());
  return parts.map(part => part.trim());
};

// Beautiful step renderer component
const StepsRenderer = ({ details }: { details: string }) => {
  const steps = parseSteps(details);
  
  return (
    <div className="space-y-2 mt-3">
      {steps.map((step, idx) => {
        const isResult = idx === steps.length - 1;
        return (
          <div key={idx} className={`border-l-4 rounded px-3 py-2.5 ${isResult ? 'border-l-green-500 bg-green-50' : 'border-l-blue-500 bg-blue-50'}`}>
            <div className="flex items-start gap-2">
              <div className={`flex-shrink-0 font-bold text-sm w-6 h-6 rounded-full flex items-center justify-center ${isResult ? 'bg-green-500 text-white' : 'bg-primary text-white'}`}>
                {isResult ? '✓' : idx + 1}
              </div>
              <p className="text-xs text-gray-700 leading-relaxed flex-1 pt-0.5">{step}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const SolutionDesignSlide = () => {
  return (
    <SlideLayout id="solution-design" pageNumber={5}>
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm">Solution Architecture</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">Delivery Solutions</h2>
          <p className="text-muted-foreground">{deliveryChallenges.length} delivery challenges solved</p>
        </div>

        {/* Delivery Solutions */}
        <div className="space-y-4">
          {deliveryChallenges.map((item, idx) => (
            <div key={idx} className="border-l-4 border-l-primary bg-card rounded-lg p-5 shadow-sm">
              <div className="flex items-start gap-3 mb-2">
                <CheckCircle2 size={20} className="text-primary mt-0.5 shrink-0" />
                <div className="flex-grow">
                  <p className="font-semibold text-secondary">{item.issue}</p>
                </div>
              </div>
              <div className="ml-7 space-y-2">
                <p className="text-sm font-semibold text-primary">{item.solution}</p>
                <p className="text-xs text-muted-foreground italic">{item.benefit}</p>
                {item.details && <StepsRenderer details={item.details} />}
                {item.products && item.products.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {item.products.map((product, pidx) => (
                      <a
                        key={pidx}
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors"
                      >
                        📚 {product.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
};

export default SolutionDesignSlide;
