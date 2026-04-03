import { useState } from "react";
import { Layers, Zap, Lock, GitBranch, CheckCircle2, Shield, Clock } from "lucide-react";

const HostnamesOnboardingViewer = () => {
  const [activeTab, setActiveTab] = useState("onboarding");
  const phases = [
    {
      number: 1,
      title: "Create Golden Config Templates (3–4 Templates)",
      description: "Build 3–4 configuration templates mapped to AT Retailers' business units — covering all 5,000 properties with tailored caching, compression, WAF, and Bot Manager baselines",
      detail: "E-commerce Storefront: aggressive product/image caching, WAF for checkout protection | Content/Marketing: long TTLs for static pages, IVM for images | API/Checkout: short TTLs, strict WAF rules, rate limiting | Internal Tools: basic caching, restricted access policies",
      icon: <Layers size={20} className="text-blue-500" />,
    },
    {
      number: 2,
      title: "DNS TTL Reduction (5 Minutes)",
      description: "Lower DNS TTL to 5 minutes across all 5,000 domains before any cutover begins",
      detail: "Critical for rollback safety — if any wave encounters issues, traffic can be redirected back to origin within 5 minutes by reverting the CNAME. Restore TTLs to standard values once stable.",
      icon: <Clock size={20} className="text-amber-500" />,
    },
    {
      number: 3,
      title: "Bulk Create Properties via PAPI",
      description: "PAPI (Property API) automatically creates 5,000 properties in parallel from templates",
      detail: "Zero manual work per hostname | Takes ~1-2 days",
      icon: <Zap size={20} className="text-indigo-500" />,
    },
    {
      number: 4,
      title: "Automated CSR & Certificate Provisioning",
      description: "CPS (Certificate Provisioning System) generates CSRs and manages cert lifecycle",
      detail: "Takes ~5-7 days with CA | Akamai: CSR generation + edge deployment | Origin: Domain validation + CA approval",
      icon: <Lock size={20} className="text-orange-500" />,
    },
    {
      number: 5,
      title: "Phased DNS Cutover",
      description: "Update CNAME in batches: Wave 1 (500 pilot) → Wave 2 (2,500) → Wave 3 (2,000)",
      detail: "Week 2: Wave 1 (500 low-risk hosts) | Week 3: Wave 2 (2,500 hosts) | Week 4: Wave 3 (2,000 hosts) | 5-min TTL enables instant rollback per wave",
      icon: <GitBranch size={20} className="text-purple-500" />,
    },
    {
      number: 6,
      title: "Validate & Monitor Each Wave",
      description: "mPulse monitors real-user performance (LCP, TTFB, error rate) per cohort",
      detail: "Validate: error rate <0.5%, performance within 10% | Rollback: revert CNAME if issues (takes effect in ≤5 min)",
      icon: <CheckCircle2 size={20} className="text-green-500" />,
    },
  ];

  const templateLibrary = [
    {
      name: "E-Commerce (Product Catalog)",
      use: "Aggressive caching for product images + category pages",
      rules: "HTML (category/product pages): 1h. Images (.jpg, .png, .webp): 30d. CSS/JS bundles (.css, .js): 30d. Cart endpoints: 0s. WAF: block suspicious bot patterns. EdgeWorkers: queue at peak.",
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
      rules: "Video segments (.mp4, .ts): 30d (immutable per URL). HLS playlist (.m3u8): 15 min (changes frequently). Thumbnails (.jpg): 30d. Subtitles (.vtt): 7d. Image & Video Manager: transcode on-demand. Origin: only HLS master + source.",
      timeToM: "Deploy: 3 mins (video source URL)",
    },
    {
      name: "Mobile App (REST API)",
      use: "High cache ratio for app endpoints",
      rules: "API responses (.json): 5 min (vary by user ID/session token). Static assets (.js, .css, .png, .svg): 30d. POST/DELETE endpoints: 0s. Config (.json): 1h. Bot Manager: rate limit suspicious clients.",
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
    { stage: "Code Commit", trigger: "Team pushes updated .tf to main branch", action: "GitHub Actions workflow starts automatically", time: "Immediate" },
    { stage: "Syntax Validation", trigger: "Terraform validate + custom lint rules", action: "Rejects if: invalid property names, suspicious WAF rules, dangerous TTL values", time: "30 seconds" },
    { stage: "Staging Deployment", trigger: "Auto-deploy to staging properties (read-only copy of prod config)", action: "PAPI creates staging version. No traffic changes yet.", time: "1-2 minutes" },
    { stage: "Integration Tests", trigger: "Synthetic tests: curl health checks, WAF test cases, cache behavior validation", action: "Verifies config works before prod. Tests run against staging properties.", time: "2-3 minutes" },
    { stage: "Manual Approval", trigger: "Team lead reviews tf.plan + test results", action: "Approves / rejects via GitHub PR. Can add comments for audit trail.", time: "5-30 minutes (human review)" },
    { stage: "Production Deployment", trigger: "Approved PR merged to main", action: "PAPI activates new config on prod properties. Canary: 10% traffic first (if configured).", time: "2-5 minutes" },
    { stage: "Validation & Rollback Ready", trigger: "mPulse monitors for 10 minutes post-deployment", action: "If error rate spikes: auto-rollback to previous version. Team gets alert.", time: "Continuous (10 min)" },
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
          Onboarding Process
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
        <button
          onClick={() => setActiveTab("certs")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "certs"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Cert Provisioning
        </button>
      </div>

      {/* TAB 1: Onboarding Process */}
      {activeTab === "onboarding" && (
        <div className="space-y-4">
          {/* Vertical Timeline */}
      <div className="space-y-3">
        {phases.map((phase, idx) => (
          <div key={phase.number} className="flex gap-4">
            {/* Timeline connector */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center shrink-0">
                {phase.icon}
              </div>
              {idx < phases.length - 1 && (
                <div className="w-0.5 h-12 bg-primary/20 my-1" />
              )}
            </div>

            {/* Phase content */}
            <div className="flex-1 pt-1 pb-3">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="font-semibold text-sm text-foreground">{phase.title}</h4>
                <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-0.5 rounded whitespace-nowrap">Step {phase.number}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{phase.description}</p>
              <div className="bg-muted/40 rounded p-2 text-sm text-foreground border border-border/50 mb-2">
                {phase.detail}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Timeline summary */}
      <div className="space-y-2 pt-3 border-t">
        <p className="text-xs font-semibold text-foreground">30-Day Timeline</p>
        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div className="bg-muted/30 rounded p-2">
            <p className="font-semibold text-foreground mb-1">Days 1-3</p>
            <p>Golden templates + DNS TTL reduction to 5 min</p>
          </div>
          <div className="bg-muted/30 rounded p-2">
            <p className="font-semibold text-foreground mb-1">Days 3-9</p>
            <p>PAPI bulk creates properties + CSR + CA validation</p>
          </div>
          <div className="bg-muted/30 rounded p-2">
            <p className="font-semibold text-foreground mb-1">Days 10-30</p>
            <p>3 waves of DNS cutover + validation</p>
          </div>
          <div className="bg-muted/30 rounded p-2">
            <p className="font-semibold text-foreground mb-1">Rollback</p>
            <p>Revert CNAME instantly per wave (≤5 min)</p>
          </div>
        </div>
      </div>

      {/* Key takeaways */}
      <div className="space-y-2 pt-3 border-t">
        <p className="text-xs font-semibold text-foreground">Key Benefits</p>
        <ul className="space-y-1 text-xs text-muted-foreground">
          <li>✓ <strong>Zero manual work:</strong> Template + PAPI automation handles all 5,000 hostnames</li>
          <li>✓ <strong>Single CSR process:</strong> ~50 SAN certificates cover all 5,000 domains</li>
          <li>✓ <strong>5-min TTL rollback:</strong> Traffic reverts to origin within minutes if issues arise</li>
          <li>✓ <strong>Phased DNS rollout:</strong> Test each wave before committing next</li>
          <li>✓ <strong>No downtime:</strong> Old CDN and Akamai coexist during migration</li>
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
                <p className="text-muted-foreground mb-1"><strong>Use Case:</strong> {template.use}</p>
                <p className="text-muted-foreground mb-1"><strong>Key Rules:</strong> {template.rules}</p>
                <div className="bg-background rounded p-2 border border-border/50">
                  <p className="text-foreground font-semibold text-[11px]">⚡ {template.timeToM}</p>
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
                <span className="inline-block px-2 py-1 bg-primary/20 text-primary rounded font-bold text-[11px]">{idx + 1}</span>
                <h4 className="font-semibold text-foreground">{stage.stage}</h4>
                <span className="text-muted-foreground text-[11px] ml-auto">{stage.time}</span>
              </div>
              <div className="space-y-1 text-muted-foreground text-sm">
                <p><strong>Trigger:</strong> {stage.trigger}</p>
                <p><strong>Action:</strong> {stage.action}</p>
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

      {/* TAB 4: Cert Provisioning */}
      {activeTab === "certs" && (
        <div className="space-y-5">

          {/* Phase 1 */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wider border-b pb-2">Phase 1 — Edge‑to‑Browser TLS (Public Certificates)</p>

            <div className="flex gap-3">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 text-primary font-bold text-xs shrink-0 mt-0.5">1</span>
              <div className="flex-1">
                <p className="text-xs font-semibold text-primary mb-1">Akamai (Configuration Setup)</p>
                <p className="text-xs text-muted-foreground">Configure all ~5,000 domains in Property Manager / PAPI. Each property must reference the correct hostname and certificates to be used.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 text-primary font-bold text-xs shrink-0 mt-0.5">2</span>
              <div className="flex-1">
                <p className="text-xs font-semibold text-primary mb-1">Akamai (CPS – Certificate Provisioning System)</p>
                <p className="text-xs text-muted-foreground">Generate CSRs for all domains — grouped into about 50 SAN certificates (100 domains each).</p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 text-primary font-bold text-xs shrink-0 mt-0.5">3</span>
              <div className="flex-1">
                <p className="text-xs font-semibold text-primary mb-1">Akamai / CA (Manual Step)</p>
                <p className="text-xs text-muted-foreground">Submit CSRs to the Certificate Authority (CA) for issuance.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent/20 text-accent font-bold text-xs shrink-0 mt-0.5">4</span>
              <div className="flex-1">
                <p className="text-xs font-semibold text-accent mb-1">AT Retailers (Action Required)</p>
                <p className="text-xs text-muted-foreground mb-1">Approve domain validation requests from the CA within 24 hours:</p>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Either by clicking the email approval link</li>
                  <li>• Or by adding DNS TXT records for validation</li>
                </ul>
                <p className="text-xs text-destructive font-semibold mt-2">⚠ If not approved in 24 hours, issuance of the entire certificate batch is delayed.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-muted text-foreground font-bold text-xs shrink-0 mt-0.5">5</span>
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground mb-1">CA → Akamai</p>
                <p className="text-xs text-muted-foreground">CA issues the signed certificates and returns them to Akamai CPS.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 text-primary font-bold text-xs shrink-0 mt-0.5">6</span>
              <div className="flex-1">
                <p className="text-xs font-semibold text-primary mb-1">Akamai (Deployment)</p>
                <p className="text-xs text-muted-foreground">Automatically deploy issued certificates to all global edge centers. Auto‑renewal occurs 30–90 days before expiry.</p>
              </div>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wider border-b pb-2">Phase 2 — Edge‑to‑Origin TLS (Private Certificates + Site Shield)</p>

            <div className="flex gap-3">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent/20 text-accent font-bold text-xs shrink-0 mt-0.5">1</span>
              <div className="flex-1">
                <p className="text-xs font-semibold text-accent mb-1">AT Retailers (Action Required)</p>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Provision a valid origin certificate (self‑signed, Let's Encrypt, or CA‑issued) that matches the origin hostname</li>
                  <li>• Configure firewall rules to allow only Akamai Site Shield IP ranges</li>
                  <li>• Test that Akamai can connect to the origin over TLS without certificate errors</li>
                  <li>• (Optional) Enable mutual TLS (mTLS) for additional authentication</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 text-primary font-bold text-xs shrink-0 mt-0.5">2</span>
              <div className="flex-1">
                <p className="text-xs font-semibold text-primary mb-1">Akamai (Configuration in PAPI)</p>
                <p className="text-xs text-muted-foreground mb-1">In Property Manager, enable origin validation and Site Shield:</p>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Define origin hostname(s) and specify certificate validation method (CN/SAN match)</li>
                  <li>• Ensure Site Shield is correctly mapped and origins accept connections only from those nodes</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 text-primary font-bold text-xs shrink-0 mt-0.5">3</span>
              <div className="flex-1">
                <p className="text-xs font-semibold text-primary mb-1">Akamai (Validation & Monitoring)</p>
                <p className="text-xs text-muted-foreground mb-1">Akamai continuously verifies:</p>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• The origin certificate's validity and expiry</li>
                  <li>• Origin health checks to detect TLS or connectivity issues</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-2">Complete end‑to‑end encryption: Browser →[TLS]→ Edge →[TLS]→ Origin</p>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default HostnamesOnboardingViewer;
