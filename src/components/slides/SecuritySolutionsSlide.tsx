import { useState } from "react";
import SlideLayout from "./SlideLayout";
import CalloutModal from "./CalloutModal";
import { Shield, Bot, UserX, ShoppingCart, CreditCard, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";

const securitySolutions = [
  {
    icon: Shield,
    issue: "DDoS attacks on origin",
    solution: "Prolexic + Site Shield",
    products: ["Prolexic", "Site Shield"],
    steps: [
      "Enable Prolexic scrubbing — traffic routes through 300+ scrubbing centers detecting volumetric, protocol, and app-layer attacks",
      "Activate Site Shield — real origin IPs masked behind Akamai edge. Block non-Akamai traffic via firewall ACLs",
      "Configure drop thresholds for obvious attacks — >10,000 req/sec from single IP, >1M req/min from single /16 subnet",
      "mPulse monitors origin health and attack traffic — track dropped traffic, origin response time, incident timeline",
    ],
    result: "10+ Tbps attack capacity absorbed at edge, origin stays online, attackers can't find real infrastructure",
    bestPractice: "Enable Site Shield Day 1 to hide origin IPs — this single step prevents most direct-to-origin attacks",
  },
  {
    icon: AlertTriangle,
    issue: "Legacy WAF rules outdated",
    solution: "App & API Protector (AAP) — Adaptive Security Engine",
    products: ["App & API Protector"],
    steps: [
      "Audit current WAF rules — identify outdated signatures missing OWASP Top 10 coverage (injection, broken auth, data exposure)",
      "Enable AAP managed rules — auto-updating daily based on global attack trends, new malware, CVEs, zero-days",
      "Deploy reputation-based rules — Akamai tracks attacker IP behavior globally and blocks known sources automatically",
      "7-day tuning window — deploy in Alert mode, review false positives, then switch to Deny mode with confidence",
    ],
    result: "Modern attack coverage, zero manual rule updates, 5x fewer false positives vs legacy WAF",
    bestPractice: "Use Adaptive Security Engine auto-tuning — 7-day alert-only baseline before switching to deny mode",
  },
  {
    icon: UserX,
    issue: "Credential stuffing surge",
    solution: "Bot Manager Premier + Rate Limiting",
    products: ["Bot Manager Premier", "AAP"],
    steps: [
      "Deploy Bot Manager on login endpoints — analyze 100+ behavioral signals: mouse movement, keystroke timing, device fingerprints",
      "Detect stuffing signatures — rapid-fire failed logins, retry timing patterns identical to bot templates, geographic mismatches",
      "Enforce adaptive challenges — legitimate users pass once (device fingerprint stored), bot requests get progressively harder challenges",
      "Integrate with customer's account system — lock accounts after 5 failed attempts, trigger 2FA for suspicious logins",
    ],
    result: "99% of credential stuffing blocked before origin sees it, zero legitimate user friction",
    bestPractice: "Start Bot Manager in monitoring mode for 48-72 hours to classify bot categories before enforcement",
  },
  {
    icon: ShoppingCart,
    issue: "Inventory scraping by competitive bots",
    solution: "Bot Manager Behavioral Fingerprinting",
    products: ["Bot Manager Premier"],
    steps: [
      "Enable Bot Manager on catalog endpoints — IP blocks fail because scrapers rotate proxies. Focus on behavior instead",
      "Identify scraper patterns — perfect request timing, missing headers, identical User-Agent across 100+ IPs, sequential product enumeration",
      "Fingerprint devices — TLS analysis, JavaScript execution tests, cookie handling. Same fingerprint across 50 IPs = scraper",
      "Rate limit suspicious fingerprints to 10 req/min vs 1,000 for real users. Force CAPTCHA on first request",
    ],
    result: "Scrapers blocked by behavior not IP, competitive intel loss ends, inventory data stays proprietary",
    bestPractice: "Use crypto challenges instead of CAPTCHAs — invisible to legitimate users, impossible for bots to solve",
  },
  {
    icon: CreditCard,
    issue: "Carding on checkout APIs",
    solution: "AAP Rate Limiting + Bot Manager",
    products: ["AAP", "Bot Manager Premier"],
    steps: [
      "Instrument checkout endpoints — AAP learns normal API usage: 1 card validation per 30s per user, <5 card attempts per session",
      "Detect carding patterns — rapid-fire card validations, 50 different cards with same CVV, geographic jumps in seconds",
      "Block & notify — block transaction immediately, flag account, send fraud signal to payment processor (Stripe/PayPal)",
      "Force step-up authentication for flagged transactions — re-enter CVV, OTP verification, blacklist card fingerprints",
    ],
    result: "Carding success rate drops to 0.01%, payment processor alerted before chargebacks",
    bestPractice: "Apply positive security model with schema validation — only allow expected API parameter formats through",
  },
  {
    icon: Bot,
    issue: "Sophisticated bot evasion (IP rotation, spoofed clients)",
    solution: "Bot Manager ML Fingerprinting + Behavioral Analysis",
    products: ["Bot Manager Premier"],
    steps: [
      "Build behavioral baseline — track real Chrome behavior: TLS cipher order, JA3 fingerprints, JS engine behavior, cookie handling",
      "Deploy ML fingerprinting — compare incoming requests against baseline. Spoofed User-Agent with rotating IPs still leaves traces",
      "Detect spoofed headers — bot spoofs Chrome but missing Chrome-specific header permutations or uses Firefox HTTP/2 SETTINGS",
      "Escalating enforcement — 1st offense: CAPTCHA, 2nd (same device, different IP): block 1h, 3rd: block 24h",
    ],
    result: "Spoofing one feature possible; spoofing 100 features across 1000 requests = impossible. Attack ROI becomes negative",
    bestPractice: "Behavioral analysis catches bots that rotate IPs and spoof User-Agents — signature-based solutions miss these entirely",
  },
];

const SecuritySolutionsSlide = () => {
  const [activeModal, setActiveModal] = useState<number | null>(null);

  return (
    <SlideLayout id="security-solutions" pageNumber={6}>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <p className="text-accent font-semibold tracking-widest uppercase text-sm">Section B — Security Architecture</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">Security Solutions</h2>
          <p className="text-muted-foreground text-sm">Click each threat for step-by-step mitigation</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {securitySolutions.map((s, i) => (
            <div
              key={s.issue}
              onClick={() => setActiveModal(i)}
              className="visual-card callout-badge bg-card rounded-xl border border-border p-5 shadow-sm group"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <s.icon size={22} className="text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-secondary text-sm leading-tight">{s.issue}</h3>
                  <p className="text-xs text-accent font-semibold mt-1">{s.solution}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {s.products.map(p => (
                  <span key={p} className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-semibold">{p}</span>
                ))}
              </div>

              <p className="text-xs text-muted-foreground line-clamp-2">{s.result}</p>

              <div className="mt-3 flex items-center gap-1 text-accent text-xs font-semibold group-hover:gap-2 transition-all">
                View steps <ArrowRight size={12} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {securitySolutions.map((s, i) => (
        <CalloutModal key={s.issue} open={activeModal === i} onOpenChange={() => setActiveModal(null)} title={s.issue}>
          <div className="space-y-4">
            <div className="bg-accent/5 border border-accent/15 rounded-lg p-3">
              <p className="text-sm font-semibold text-accent">{s.solution}</p>
            </div>

            <div className="space-y-3">
              {s.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
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

            <div className="bg-primary/8 border border-primary/20 rounded-lg p-3">
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Best Practice</p>
              <p className="text-sm">{s.bestPractice}</p>
            </div>
          </div>
        </CalloutModal>
      ))}
    </SlideLayout>
  );
};

export default SecuritySolutionsSlide;
