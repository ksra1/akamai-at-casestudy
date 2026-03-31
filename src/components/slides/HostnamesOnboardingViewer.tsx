import { useState } from "react";
import { Layers, Zap, Lock, GitBranch, CheckCircle2, BarChart3, Shield, Eye } from "lucide-react";

const HostnamesOnboardingViewer = () => {
  const [activeTab, setActiveTab] = useState("browser-edge");
  const phases = [
    {
      number: 1,
      title: "Create Golden Config Template",
      description: "Define one reusable configuration with caching rules, compression, origin health checks, and WAF rules",
      detail: "Template bundled once, used for all 5,000 hostnames",
      icon: <Layers size={20} className="text-blue-500" />,
    },
    {
      number: 2,
      title: "Bulk Create Properties via PAPI",
      description: "PAPI (Property API) automatically creates 5,000 properties in parallel from template",
      detail: "Zero manual work per hostname | Takes ~1-2 days",
      icon: <Zap size={20} className="text-indigo-500" />,
    },
    {
      number: 3,
      title: "Automated CSR & Certificate Provisioning",
      description: "CPS (Certificate Provisioning System) generates CSRs and manages cert lifecycle",
      detail: "Takes ~5-7 days with CA | Akamai: CSR generation + edge deployment | Origin: Domain validation + CA approval",
      icon: <Lock size={20} className="text-orange-500" />,
    },
    {
      number: 4,
      title: "Phased DNS Cutover",
      description: "Update CNAME in batches: Wave 1 (1,250) → Wave 2 (2,500) → Wave 3 (1,250)",
      detail: "Week 2: Wave 1 (1,250 hosts) | Week 3: Wave 2 (2,500 hosts) | Week 4: Wave 3 (1,250 hosts) | Coordinated with DNS team",
      icon: <GitBranch size={20} className="text-purple-500" />,
    },
    {
      number: 5,
      title: "Validate & Monitor Each Wave",
      description: "mPulse monitors real-user performance (LCP, TTFB, error rate) per cohort",
      detail: "Validate: error rate <0.5%, performance within 10% | Rollback: revert CNAME if issues",
      icon: <CheckCircle2 size={20} className="text-green-500" />,
    },
  ];

  const originPhases = [
    {
      number: 1,
      title: "Configure Origin Certificates",
      description: "AT Retailers: Set up origin server certificates (self-signed, Let's Encrypt, or CA-issued)",
      detail: "Can be self-signed for internal use | CPS can provision if using Akamai as cert provider",
      icon: <Lock size={20} className="text-orange-500" />,
    },
    {
      number: 2,
      title: "Import to Akamai Property",
      description: "Upload origin certificate or configure hostname verification in Property Manager",
      detail: "Akamai edge validates origin cert on every connection | No manual cert management needed",
      icon: <Zap size={20} className="text-indigo-500" />,
    },
    {
      number: 3,
      title: "Enable Site Shield",
      description: "Restrict origin to accept traffic ONLY from Akamai edge IPs",
      detail: "WAF rule: Block all non-Akamai IPs | Origin sees only 36 trusted edge center IPs, not user IPs",
      icon: <Shield size={20} className="text-red-500" />,
    },
    {
      number: 4,
      title: "Test Origin Health Checks",
      description: "Akamai monitors origin via HTTPS using the configured certificate",
      detail: "Validates certificate chain + hostname | Confirms origin is reachable and trusted",
      icon: <Eye size={20} className="text-blue-500" />,
    },
    {
      number: 5,
      title: "Deploy & Monitor",
      description: "Real traffic routes through Akamai → Origin under Site Shield protection",
      detail: "All traffic encrypted end-to-end: Browser --[TLS]--> Edge --[TLS]--> Origin",
      icon: <CheckCircle2 size={20} className="text-green-500" />,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Tab Switcher */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab("browser-edge")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "browser-edge"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Browser → Edge Trust
        </button>
        <button
          onClick={() => setActiveTab("edge-origin")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "edge-origin"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Edge → Origin Trust
        </button>
      </div>

      {/* TAB 1: Browser → Edge Trust */}
      {activeTab === "browser-edge" && (
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
            <p className="font-semibold text-foreground mb-1">Days 1-2</p>
            <p>PAPI bulk creates 5,000 properties</p>
          </div>
          <div className="bg-muted/30 rounded p-2">
            <p className="font-semibold text-foreground mb-1">Days 3-9</p>
            <p>CSR process + CA validation</p>
          </div>
          <div className="bg-muted/30 rounded p-2">
            <p className="font-semibold text-foreground mb-1">Days 10-30</p>
            <p>4 waves of DNS cutover + validation</p>
          </div>
          <div className="bg-muted/30 rounded p-2">
            <p className="font-semibold text-foreground mb-1">Rollback</p>
            <p>Revert CNAME instantly per wave</p>
          </div>
        </div>
      </div>

      {/* Key takeaways */}
      <div className="space-y-2 pt-3 border-t">
        <p className="text-xs font-semibold text-foreground">Key Benefits</p>
        <ul className="space-y-1 text-xs text-muted-foreground">
          <li>✓ <strong>Zero manual work:</strong> Template + PAPI automation handles all 5,000 hostnames</li>
          <li>✓ <strong>Single CSR process:</strong> ~50 SAN certificates cover all 5,000 domains</li>
          <li>✓ <strong>Phased DNS rollout:</strong> Test each wave before committing next</li>
          <li>✓ <strong>Instant rollback:</strong> Revert CNAME for any wave, no Akamai config change needed</li>
          <li>✓ <strong>No downtime:</strong> Old CDN and Akamai coexist during migration</li>
        </ul>
      </div>

      {/* CSR & Certificate Provisioning Deep Dive */}
      <div className="bg-accent/5 border border-accent/20 rounded p-3 text-xs space-y-3">
        <p className="font-semibold text-accent mb-2">CSR & Certificate Provisioning Breakdown</p>
        
        <div className="space-y-2">
          <div className="bg-background rounded p-2 border border-border/50">
            <p className="font-semibold text-primary mb-1">� Akamai's Work (Automatic - No action needed)</p>
            <ul className="space-y-1 text-muted-foreground text-xs">
              <li>• Configure domains in Property Manager / PAPI</li>
              <li>• CPS generates CSRs for all 5,000 domains</li>
              <li>• Submit CSRs to Certificate Authority (CA)</li>
              <li>• Receive issued certificates from CA</li>
              <li>• Deploy certificates to Akamai edge servers (all 36 global centers)</li>
              <li>• Auto-renew 30-90 days before expiry</li>
            </ul>
          </div>

          <div className="bg-background rounded p-2 border border-border/50">
            <p className="font-semibold text-accent mb-1">🟧 AT Retailers' Responsibilities (Required for cert issuance)</p>
            <ul className="space-y-1 text-muted-foreground text-xs">
              <li>• <strong>Domain validation approval:</strong> When CA sends requests, approve within 24 hours</li>
              <li>• <strong>Validation method:</strong> Email approval OR add DNS TXT record (CA's choice)</li>
              <li>• <strong>AT Retailers DNS team:</strong> Execute phased CNAME cutover (Week 2: Wave 1 - 1,250 hosts | Week 3: Wave 2 - 2,500 hosts | Week 4: Wave 3 - 1,250 hosts)</li>
              <li>• <strong>Optional:</strong> Request cert copy for origin infrastructure if needed</li>
              <li>• <strong>​Critical bottleneck:</strong> If AT Retailers doesn't approve validations in 24h, CA delays cert issuance</li>
            </ul>
          </div>
        </div>

        <div className="bg-background rounded p-2 border border-border/50">
          <p className="font-semibold text-foreground mb-1">📋 Process Timeline</p>
          <ul className="space-y-1 text-muted-foreground text-xs">
            <li><strong>Day 1-2:</strong> PAPI bulk creates 5,000 properties + CPS submits CSRs to CA</li>
            <li><strong>Day 2-3:</strong> CA sends validation emails/DNS challenges to AT Retailers</li>
            <li><strong>Day 3-4:</strong> AT Retailers approves domain validations (critical: less than 24h turnaround)</li>
            <li><strong>Day 5-7:</strong> CA issues certs | Akamai deploys ~50 SAN certs to all 36 edge centers</li>
          </ul>
        </div>

        <div className="bg-background rounded p-2 border border-border/50">
          <p className="font-semibold text-foreground mb-1">🎯 Key Points</p>
          <ul className="space-y-1 text-muted-foreground text-xs">
            <li>• <strong>SAN certificates:</strong> 100 domains per cert = ~50 certs total (not 5,000)</li>
            <li>• <strong>Bottleneck:</strong> AT Retailers' domain validation approval (days 2-4) — if delayed, entire timeline slips</li>
            <li>• <strong>Akamai handles:</strong> CSR generation, CA submission, cert deployment to all 36 global edge centers, auto-renewal</li>
            <li>• <strong>AT Retailers handles:</strong> Approve CA validations + execute DNS CNAME cutover per wave</li>
          </ul>
        </div>
      </div>
        </div>
      )}

      {/* TAB 2: Edge → Origin Trust */}
      {activeTab === "edge-origin" && (
        <div className="space-y-4">
          {/* Vertical Timeline */}
          <div className="space-y-3">
            {originPhases.map((phase, idx) => (
              <div key={phase.number} className="flex gap-4">
                {/* Timeline connector */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center shrink-0">
                    {phase.icon}
                  </div>
                  {idx < originPhases.length - 1 && (
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

          {/* Site Shield Details */}
          <div className="space-y-2 pt-3 border-t">
            <p className="text-xs font-semibold text-foreground">Site Shield: Origin Protection Layer</p>
            <div className="grid grid-cols-1 gap-2 text-xs text-muted-foreground">
              <div className="bg-muted/30 rounded p-2">
                <p className="font-semibold text-foreground mb-1">What it does</p>
                <p>Restricts origin firewall to accept traffic ONLY from 36 trusted Akamai edge IPs. Users never send requests directly to origin.</p>
              </div>
              <div className="bg-muted/30 rounded p-2">
                <p className="font-semibold text-foreground mb-1">How it works</p>
                <p>AT Retailers' firewall IP allowlist includes only Akamai edge IPs. Blocks all other traffic (users, bots, attackers).</p>
              </div>
              <div className="bg-muted/30 rounded p-2">
                <p className="font-semibold text-foreground mb-1">Result</p>
                <p>Origin is "invisible" — only Akamai can reach it. Instant DDoS mitigation, bot blocking at edge before origin.</p>
              </div>
            </div>
          </div>

          {/* Origin Trust Breakdown */}
        <div className="space-y-3">
          <div className="bg-background rounded p-3 border border-border/50">
            <p className="font-semibold text-accent mb-2">Edge → Origin Trust Setup</p>
            
            <div className="space-y-2">
              <div className="bg-muted/40 rounded p-2 border border-akamai-green/30">
                <p className="font-semibold text-foreground mb-1">🟦 Akamai's Work (Automatic)</p>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• Configure origin certificate validation in Property Manager per hostname</li>
                  <li>• Verify origin server hostname against certificate CN/SAN fields</li>
                  <li>• Enable Site Shield: restrict origin firewall to accept traffic ONLY from 36 Akamai edge center IPs</li>
                  <li>• Deploy Site Shield IP allowlist to Akamai network globally (instantaneous)</li>
                  <li>• Continuous health checks: verify origin certificate is valid and not expired</li>
                </ul>
              </div>

              <div className="bg-muted/40 rounded p-2 border border-destructive/30">
                <p className="font-semibold text-foreground mb-1">🟧 AT Retailers' Responsibilities (Required)</p>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• Provision origin server certificate: self-signed, Let's Encrypt, or CA-issued (must match hostname)</li>
                  <li>• Configure origin firewall: whitelist ONLY Akamai Site Shield IP ranges (provided by Akamai)</li>
                  <li>• Test: Verify Akamai edge can reach origin via TLS without certificate errors</li>
                  <li>• Optional: Deploy mutual TLS (mTLS) certs if additional authentication required</li>
                </ul>
              </div>
            </div>

            <div className="bg-accent/10 rounded p-2 border border-border/50 mt-2">
              <p className="font-semibold text-foreground mb-1">Result: Origin Invisible to Attackers</p>
              <p className="text-muted-foreground text-sm">Users never access origin directly. Only Akamai edge can reach origin. DDoS & bot attacks blocked at edge, never reach origin servers.</p>
            </div>
          </div>


          {/* End-to-End Trust Visualization */}
        <div className="bg-accent/5 border border-accent/20 rounded p-3 text-sm space-y-2">
            <p className="font-semibold text-accent">End-to-End Encryption Flow</p>
            
            <div className="bg-background rounded p-2 border border-border/50">
              <p className="font-semibold text-foreground mb-1">🔒 Browser → Akamai Edge (Public TLS)</p>
              <ul className="space-y-1 text-muted-foreground text-xs">
                <li>• User's browser validates Akamai edge certificate (public SAN cert from trusted CA)</li>
                <li>• Encrypted HTTPS connection per hostname</li>
                <li>• Covers all 5,000 domains via ~50 multi-domain SAN certs</li>
              </ul>
            </div>

              <div className="bg-background rounded p-2 border border-border/50">
                <p className="font-semibold text-foreground mb-1">🔒 Akamai Edge → AT Retailers' Origin (Private TLS)</p>
                <ul className="space-y-1 text-muted-foreground text-xs">
                  <li>• Akamai validates origin certificate (and hostname matches)</li>
                  <li>• Encrypted end-to-end: no decryption in transit</li>
                  <li>• Site Shield blocks all non-Akamai IPs at origin firewall</li>
                </ul>
              </div>

            <div className="bg-background rounded p-2 border border-border/50">
              <p className="font-semibold text-foreground mb-1">🎯 Key Points</p>
              <ul className="space-y-1 text-muted-foreground text-xs">
                <li>• <strong>Automatic:</strong> Akamai checks origin cert on every connection (no manual validation)</li>
                <li>• <strong>Site Shield is critical:</strong> Origins are protected from direct access, DDoS, and bot attacks</li>
                <li>• <strong>AT Retailers controls:</strong> Origin certificate generation and installation on Web servers</li>
                <li>• <strong>Akamai handles:</strong> Certificate validation, health checks, and cert renewal coordination</li>
                <li>• <strong>Optional later:</strong> Add mutual TLS for additional origin authentication if needed</li>
              </ul>
            </div>
        </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default HostnamesOnboardingViewer;
