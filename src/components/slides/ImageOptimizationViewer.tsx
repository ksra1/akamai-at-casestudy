import { useState } from "react";
import { Image as ImageIcon, Zap, BarChart3, Settings, CheckCircle2, AlertTriangle } from "lucide-react";

const ImageOptimizationViewer = () => {
  const [activeTab, setActiveTab] = useState<"strategy" | "metrics" | "config">("strategy");

  const optimizationSteps = [
    {
      number: 1,
      title: "Request Interception",
      description: "IVM intercepts all image requests at Akamai edge (before origin)",
      detail: "Browser requests /images/product.jpg → Akamai edge recognizes .jpg → passes to IVM",
      icon: <ImageIcon size={20} className="text-primary" />,
    },
    {
      number: 2,
      title: "Browser Detection",
      description: "IVM analyzes User-Agent to detect device type, browser capabilities, network speed",
      detail: "Desktop Chrome (WebP support) vs Mobile Safari (HEIC support) vs old IE (fallback JPEG)",
      icon: <Zap size={20} className="text-accent" />,
    },
    {
      number: 3,
      title: "Format Selection",
      description: "IVM converts to optimal format: WebP (modern), AVIF (best compression), or JPEG (fallback)",
      detail: "Modern browsers: WebP (40% smaller). Old browsers: original format. Result: 50-70% smaller images.",
      icon: <Zap size={20} className="text-akamai-electric" />,
    },
    {
      number: 4,
      title: "Responsive Sizing",
      description: "IVM detects device width and scales image appropriately",
      detail: "Mobile (320px) gets 320px width. Desktop (1920px) gets 1920px. Eliminates over-sized images on mobile.",
      icon: <ImageIcon size={20} className="text-akamai-violet" />,
    },
    {
      number: 5,
      title: "Quality Tuning",
      description: "IVM applies perceptual quality encoding (not fixed quality %)",
      detail: "Balances compression vs visual quality. Users don't see difference, but file is 60% smaller.",
      icon: <Settings size={20} className="text-akamai-electric" />,
    },
    {
      number: 6,
      title: "Cache & Deliver",
      description: "Optimized image cached at edge for 24+ hours (configurable TTL)",
      detail: "Second user gets same image from cache (instant, zero origin load). Cache key includes format+width.",
      icon: <CheckCircle2 size={20} className="text-akamai-green" />,
    },
  ];

  const metrics = [
    {
      metric: "Image Size Reduction",
      before: "2.5 MB (desktop product image)",
      after: "0.6 MB (WebP at 1920px)",
      result: "76% smaller",
      impact: "LCP improvement: 40-60%",
    },
    {
      metric: "LCP (Largest Contentful Paint)",
      before: "3.2 seconds",
      after: "1.1 seconds",
      result: "66% faster",
      impact: "Core Web Vital → Green",
    },
    {
      metric: "Mobile Image Delivery",
      before: "1.8 MB (desktop image on mobile)",
      after: "0.25 MB (mobile-optimized WebP)",
      result: "86% smaller",
      impact: "Mobile conversion +12%",
    },
    {
      metric: "Origin Bandwidth Saved",
      before: "500 GB/month (unoptimized)",
      after: "75 GB/month (IVM optimized)",
      result: "85% reduction",
      impact: "Cost savings: $4K → $1K/month",
    },
    {
      metric: "Cache Hit Improvement",
      before: "45% (multiple formats uncached)",
      after: "85% (single cache key per size)",
      result: "89% hit ratio",
      impact: "Origin load: 10% of traffic",
    },
  ];

  const configurations = [
    {
      setting: "Image Path Rules",
      value: "Apply IVM to: /images/*, /products/*, /media/jpg",
      detail: "Exclude: /api/*, /avatars/user-uploads (unpredictable formats)",
    },
    {
      setting: "Quality Profile",
      value: "Perceptual quality: 75 (Balanced compression + fidelity)",
      detail: "Range: 60 (aggressive) to 90 (premium). Test with real users to find sweet spot.",
    },
    {
      setting: "Format Priority",
      value: "1st: AVIF, 2nd: WebP, 3rd: JPEG (fallback)",
      detail: "AVIF best compression. WebP widely supported. JPEG safety net for old browsers.",
    },
    {
      setting: "Responsive Breakpoints",
      value: "320px, 640px, 768px, 1024px, 1440px, 1920px",
      detail: "Mobile-first: generate thumbnails for small screens first.",
    },
    {
      setting: "Cache TTL",
      value: "24 hours (86400 seconds)",
      detail: "For static product images. Reduce TTL if images change frequently.",
    },
    {
      setting: "Monitoring Dashboard",
      value: "Track: avg image size, format distribution, cache hit %, LCP contribution",
      detail: "mPulse shows per-image performance contribution to page load.",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Tab Switcher */}
      <div className="flex gap-2 border-b flex-wrap">
        <button
          onClick={() => setActiveTab("strategy")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "strategy"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Optimization Strategy
        </button>
        <button
          onClick={() => setActiveTab("metrics")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "metrics"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Performance Metrics
        </button>
        <button
          onClick={() => setActiveTab("config")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "config"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Configuration
        </button>
      </div>

      {/* TAB 1: Optimization Strategy */}
      {activeTab === "strategy" && (
        <div className="space-y-4">
          {/* Vertical Timeline */}
          <div className="space-y-3">
            {optimizationSteps.map((step, idx) => (
              <div key={step.number} className="flex gap-4">
                {/* Timeline connector */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center shrink-0">
                    {step.icon}
                  </div>
                  {idx < optimizationSteps.length - 1 && (
                    <div className="w-0.5 h-12 bg-primary/20 my-1" />
                  )}
                </div>

                {/* Step content */}
                <div className="flex-1 pt-1 pb-3">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-semibold text-sm text-foreground">{step.title}</h4>
                    <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-0.5 rounded whitespace-nowrap">
                      Step {step.number}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                  <div className="bg-muted/40 rounded p-2 text-sm text-foreground border border-border/50">
                    {step.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-accent/10 border border-accent/30 rounded p-3 text-sm space-y-2">
            <p className="font-semibold text-accent">Key Insight</p>
            <p className="text-muted-foreground">
              IVM runs at edge — zero origin requests for transformations. Origin sends original image once, IVM caches all variants (formats + sizes) at edge. Next request gets cached variant instantly.
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: Performance Metrics */}
      {activeTab === "metrics" && (
        <div className="space-y-3">
          {metrics.map((m, idx) => (
            <div key={idx} className="bg-muted/40 border border-border/50 rounded p-3 text-sm space-y-2">
              <h4 className="font-semibold text-sm text-foreground">{m.metric}</h4>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <p className="text-muted-foreground">Before</p>
                  <p className="font-mono font-semibold text-foreground text-[12px]">{m.before}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">After</p>
                  <p className="font-mono font-semibold text-foreground text-[12px]">{m.after}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-akamai-green font-bold">{m.result}</span>
                <span className="text-muted-foreground italic">{m.impact}</span>
              </div>
            </div>
          ))}

          <div className="bg-akamai-green/10 border border-akamai-green/30 rounded p-3 text-xs space-y-2">
            <p className="font-semibold text-akamai-green flex items-center gap-2">
              <CheckCircle2 size={14} />
              Real-World Results
            </p>
            <ul className="space-y-1 text-akamai-green/80">
              <li>• <strong>Google PageSpeed:</strong> 45 → 92 (A rating)</li>
              <li>• <strong>Core Web Vitals:</strong> All green (LCP, FID, CLS)</li>
              <li>• <strong>Mobile Conversion:</strong> +8-15% uplift during peak seasons</li>
              <li>• <strong>Cost:</strong> No additional charge (included in Image & Video Manager license)</li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 3: Configuration */}
      {activeTab === "config" && (
        <div className="space-y-3">
          {configurations.map((config, idx) => (
            <div key={idx} className="bg-muted/40 border border-border/50 rounded p-3 text-xs space-y-2">
              <h4 className="font-semibold text-foreground">{config.setting}</h4>
              <div className="bg-background rounded p-2 border border-border/50 mb-1">
                <p className="text-foreground font-mono text-[11px]">{config.value}</p>
              </div>
              <p className="text-muted-foreground italic">{config.detail}</p>
            </div>
          ))}

          <div className="bg-destructive/10 border border-destructive/30 rounded p-3 text-xs space-y-2">
            <p className="font-semibold text-destructive flex items-center gap-2">
              <AlertTriangle size={14} />
              Potential Issues & Mitigations
            </p>
            <ul className="space-y-1 text-destructive/80">
              <li>• <strong>EXIF data stripping:</strong> IVM removes EXIF → some users want metadata. Provide original link.</li>
              <li>• <strong>Very small images:</strong> Optimization overhead may outweigh savings. Skip images &lt;50KB.</li>
              <li>• <strong>User-uploaded images:</strong> Unpredictable formats → test with real data. Consider separate rules.</li>
              <li>• <strong>Quality tuning complexity:</strong> Start with default (75). A/B test with real users before adjusting.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageOptimizationViewer;
