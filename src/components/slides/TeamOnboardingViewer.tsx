import { useState } from "react";
import { Users, GitBranch, Zap, CheckCircle2, BookOpen, Shield } from "lucide-react";

const TeamOnboardingViewer = () => {
  const [activeTab, setActiveTab] = useState<"onboarding" | "templates" | "pipeline">("onboarding");

  const onboardingPhases = [
    {
      number: 1,
      title: "Self-Service Onboarding",
      description: "New teams learn by exploring, not reading manuals",
      detail: "Login with SSO → immediately see real-time cache metrics, origin health, WAF blocks. Teams learn what's happening by observing their own properties. No CLI gatekeeping, no waiting for ops to grant access.",
      icon: <Users size={20} className="text-primary" />,
    },
    {
      number: 2,
      title: "Role-Based Access",
      description: "Teams learn within safe boundaries—can't accidentally break production",
      detail: "Roles inherited from Okta/AD. Developer can modify cache config but not WAF rules. Security team sets WAF patterns, can't deploy infra. Ops monitors. Learning is safe; misconfigurations are blocked at the permission level.",
      icon: <Shield size={20} className="text-akamai-red" />,
    },
    {
      number: 3,
      title: "Template-Based Config",
      description: "Teams learn best practices by pattern, not PAPI JSON syntax",
      detail: "Pre-built Terraform templates for common use cases (e-commerce, SaaS, media). Teams select template → customize variables (origin URL, cache TTL). They learn *how* Akamai works by modifying familiar code patterns, not decoding complex JSON.",
      icon: <GitBranch size={20} className="text-akamai-violet" />,
    },
    {
      number: 4,
      title: "Git-Driven Deployment",
      description: "Teams use familiar Git workflows instead of learning new tools",
      detail: "Git push → GitHub Actions validates syntax + runs tests → auto-deploys to staging → manual approval for prod. Teams already know Git. They deploy Akamai configs the same way they deploy app code. No new training needed.",
      icon: <Zap size={20} className="text-akamai-electric" />,
    },
    {
      number: 5,
      title: "Automatic Rollback on Failure",
      description: "Teams learn without fear of breaking production overnight",
      detail: "mPulse detects error rate spike → rollback triggered automatically → team notified. New team members can experiment and deploy freely; Akamai protects production automatically. No 3 AM war rooms teaching lessons the hard way.",
      icon: <GitBranch size={20} className="text-akamai-violet" />,
    },
    {
      number: 6,
      title: "Self-Service Monitoring",
      description: "Teams own visibility from day 1—learn by observing outcomes",
      detail: "Real-time dashboards: cache hit %, error rates, LCP, traffic trends. No waiting for ops tickets. Teams see the impact of their changes immediately. Alert setup: configure thresholds, get Slack/PagerDuty notifications. Continuous learning through real-time feedback.",
      icon: <CheckCircle2 size={20} className="text-akamai-green" />,
    },
  ];

  const templateLibrary = [
    {
      name: "E-Commerce (Product Catalog)",
      use: "Aggressive caching for product images + category pages",
      rules:
        "HTML (category/product pages): 1h. Images (.jpg, .png, .webp): 30d. CSS/JS bundles (.css, .js): 30d. Cart endpoints: 0s. WAF: block suspicious bot patterns. EdgeWorkers: queue at peak.",
      timeToM: "Deploy: 2 mins (select template + set origin URL)",
    },
    {
      name: "SaaS (API + Web)",
      use: "API caching + Static SPA delivery",
      rules: "API responses (.json): 5 min (by query param). SPA Bundle JS (.js, .css): 30d (versioned filenames). SVG icons: 30d. API key validation at edge via EdgeWorkers. HTML: 5 min.",
      timeToM: "Deploy: 5 mins (API endpoint + SPA path setup)",
    },
    {
      name: "Media Streaming (Video)",
      use: "Byte-range requests + adaptive bitrate",
      rules:
        "Video segments (.mp4, .ts): 30d (immutable per URL). HLS playlist (.m3u8): 15 min (changes frequently). Thumbnails (.jpg): 30d. Subtitles (.vtt): 7d. Image & Video Manager: transcode on-demand. Origin: only HLS master + source.",
      timeToM: "Deploy: 3 mins (video source URL)",
    },
    {
      name: "Mobile App (REST API)",
      use: "High cache ratio for app endpoints",
      rules:
        "API responses (.json): 5 min (vary by user ID/session token). Static assets (.js, .css, .png, .svg): 30d. POST/DELETE endpoints: 0s. Config (.json): 1h. Bot Manager: rate limit suspicious clients.",
      timeToM: "Deploy: 4 mins (API base URL + rate limits)",
    },
    {
      name: "Multi-Geography (Global App)",
      use: "GTM + origin in each region",
      rules: "Static assets (.js, .css, .png, .svg): 30d globally. HTML: 5 min per region. API responses: 5 min (region-aware). Health checks per origin. Fast-failover if region down. DataStream: log traffic per region.",
      timeToM: "Deploy: 8 mins (configure 3 origins + failover thresholds)",
    },
  ];

  const pipelineStages = [
    {
      stage: "Code Commit",
      trigger: "Team pushes updated.tf to main branch",
      action: "GitHub Actions workflow starts automatically",
      time: "Immediate",
    },
    {
      stage: "Syntax Validation",
      trigger: "Terraform validate + custom lint rules",
      action: "Rejects if: invalid property names, suspicious WAF rules, dangerous TTL values",
      time: "30 seconds",
    },
    {
      stage: "Staging Deployment",
      trigger: "Auto-deploy to staging properties (read-only copy of prod config)",
      action: "PAPI creates staging version. No traffic changes yet.",
      time: "1-2 minutes",
    },
    {
      stage: "Integration Tests",
      trigger: "Synthetic tests: curl health checks, WAF test cases, cache behavior validation",
      action: "Verifies config works before prod. Tests run against staging properties.",
      time: "2-3 minutes",
    },
    {
      stage: "Manual Approval",
      trigger: "Team lead reviews tf.plan + test results",
      action: "Approves / rejects via GitHub PR. Can add comments for audit trail.",
      time: "5-30 minutes (human review)",
    },
    {
      stage: "Production Deployment",
      trigger: "Approved PR merged to main",
      action: "PAPI activates new config on prod properties. Canary: 10% traffic first (if configured).",
      time: "2-5 minutes",
    },
    {
      stage: "Validation & Rollback Ready",
      trigger: "mPulse monitors for 10 minutes post-deployment",
      action: "If error rate spikes: auto-rollback to previous version. Team gets alert.",
      time: "Continuous (10 min)",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Tab Switcher */}
      <div className="flex gap-2 border-b flex-wrap">
        <button
          onClick={() => setActiveTab("onboarding")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "onboarding"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Team Onboarding
        </button>
        <button
          onClick={() => setActiveTab("templates")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "templates"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Template Library
        </button>
        <button
          onClick={() => setActiveTab("pipeline")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "pipeline"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Deployment Pipeline
        </button>
      </div>

      {/* TAB 1: Team Onboarding */}
      {activeTab === "onboarding" && (
        <div className="space-y-4">
          <div className="bg-primary/10 border border-primary/30 rounded p-3 text-sm">
            <p className="text-foreground">
              <strong>The Problem:</strong> New teams are unfamiliar with Akamai and need training, but we only have 30 days.
            </p>
            <p className="text-foreground mt-2">
              <strong>The Solution:</strong> We remove the learning barriers. Instead of classroom training, teams learn by doing—using the tools they already know (Git, dashboards, templates), with guardrails that prevent mistakes. Day 1 productivity, no Akamai expertise required.
            </p>
          </div>

          {/* Vertical Timeline */}
          <div className="space-y-3">
            {onboardingPhases.map((phase, idx) => (
              <div key={phase.number} className="flex gap-4">
                {/* Timeline connector */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center shrink-0">
                    {phase.icon}
                  </div>
                  {idx < onboardingPhases.length - 1 && (
                    <div className="w-0.5 h-12 bg-primary/20 my-1" />
                  )}
                </div>

                {/* Phase content */}
                <div className="flex-1 pt-1 pb-3">
                  <h4 className="font-semibold text-sm text-foreground mb-1">{phase.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{phase.description}</p>
                  <div className="bg-muted/40 rounded p-2 text-sm text-foreground border border-border/50">
                    {phase.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-akamai-green/10 border border-akamai-green/30 rounded p-3 text-sm space-y-2">
            <p className="font-semibold text-akamai-green flex items-center gap-2">
              <BookOpen size={14} />
              Learning Resources
            </p>
            <ul className="space-y-1 text-akamai-green/80">
              <li>• <strong>Docs:</strong> Interactive tutorials (10 min each per use case)</li>
              <li>• <strong>Slack bot:</strong> @akamai-helper answers common config questions</li>
              <li>• <strong>Community:</strong> Internal wiki with team best practices + troubleshooting</li>
              <li>• <strong>Cert program:</strong> Optional training → certification for advanced users</li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 2: Template Library */}
      {activeTab === "templates" && (
        <div className="space-y-3">
          {templateLibrary.map((template, idx) => (
            <div key={idx} className="bg-muted/40 border border-border/50 rounded p-3 text-sm space-y-2">
              <h4 className="font-semibold text-sm text-foreground">{template.name}</h4>
              <div className="space-y-1">
                <div>
                  <p className="text-muted-foreground mb-1">
                    <strong>Use Case:</strong> {template.use}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">
                    <strong>Key Rules:</strong> {template.rules}
                  </p>
                </div>
                <div className="bg-background rounded p-2 border border-border/50">
                  <p className="text-foreground font-semibold text-[11px]">
                    ⚡ {template.timeToM}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-accent/10 border border-accent/30 rounded p-3 text-sm space-y-2">
            <p className="font-semibold text-accent">Customization</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Templates are pre-configured but fully customizable (override any rule)</li>
              <li>• Team can create custom templates from existing ones (version control)</li>
              <li>• Locked rules: security baseline (e.g. minimum WAF coverage) cannot be disabled</li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 3: Deployment Pipeline */}
      {activeTab === "pipeline" && (
        <div className="space-y-3">
          {pipelineStages.map((stage, idx) => (
            <div key={idx} className="bg-muted/40 border border-border/50 rounded p-3 text-sm space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block px-2 py-1 bg-primary/20 text-primary rounded font-bold text-[11px]">
                  {idx + 1}
                </span>
                <h4 className="font-semibold text-foreground">{stage.stage}</h4>
                <span className="text-muted-foreground text-[11px] ml-auto">{stage.time}</span>
              </div>
              <div className="space-y-1 text-muted-foreground text-sm">
                <p>
                  <strong>Trigger:</strong> {stage.trigger}
                </p>
                <p>
                  <strong>Action:</strong> {stage.action}
                </p>
              </div>
            </div>
          ))}

          <div className="bg-destructive/10 border border-destructive/30 rounded p-3 text-sm space-y-2">
            <p className="font-semibold text-destructive flex items-center gap-2">
              <Shield size={14} />
              Safety Measures
            </p>
            <ul className="space-y-1 text-destructive/80">
              <li>• <strong>Dry-run preview:</strong> Team sees exactly what will change before approval</li>
              <li>• <strong>Canary deployment:</strong> 10% traffic to new config first, auto-rollback if errors spike</li>
              <li>• <strong>Audit trail:</strong> Every deployment logged with who approved, when, config diff</li>
              <li>• <strong>Instant rollback:</strong> One-click revert to previous version if issues discovered post-deploy</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamOnboardingViewer;
