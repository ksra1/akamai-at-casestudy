import { useState } from "react";
import SlideLayout from "./SlideLayout";
import CalloutModal from "./CalloutModal";
import { Shield, Bot, UserX, ShoppingCart, CreditCard, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";

const securitySolutions = [
  {
    icon: Shield,
    issue: "DDoS attacks on origin",
    headline: "20+ Tbps of 'nope.'",
    solution: "Prolexic + Site Shield",
    products: ["Prolexic", "Site Shield"],
    steps: [
      "Prolexic scrubbing — 300+ centers detect volumetric, protocol, and app-layer attacks.",
      "Site Shield hides real origin IPs. Block non-Akamai traffic via firewall ACLs.",
      "Drop thresholds: >10K req/sec from one IP, >1M req/min from a /16 subnet → auto-blocked.",
      "mPulse tracks origin health, dropped traffic, and incident timelines.",
    ],
    result: "10+ Tbps absorbed at edge. Origin stays up. Attackers can't even find it.",
    bestPractice: "Enable Site Shield Day 1 — hiding origin IPs prevents most direct-to-origin attacks immediately.",
  },
  {
    icon: AlertTriangle,
    issue: "Legacy WAF rules outdated",
    headline: "Rules that update themselves.",
    solution: "App & API Protector (AAP) — Adaptive Security Engine",
    products: ["App & API Protector"],
    steps: [
      "Audit existing rules — find gaps in OWASP Top 10 coverage (injection, broken auth, data exposure).",
      "Enable AAP managed rules — auto-updating daily from global attack trends, CVEs, zero-days.",
      "Reputation-based blocking — Akamai tracks attacker IPs globally. Known bad actors auto-blocked.",
      "7-day tuning: deploy in Alert mode → review false positives → flip to Deny with confidence.",
    ],
    result: "Modern coverage. Zero manual updates. 5× fewer false positives than legacy WAF.",
    bestPractice: "Adaptive Security Engine auto-tuning — 7 days of learning before enforcement. No guesswork.",
  },
  {
    icon: UserX,
    issue: "Credential stuffing surge",
    headline: "Bots login 1,000×/sec. Humans don't.",
    solution: "Bot Manager Premier + Rate Limiting",
    products: ["Bot Manager Premier", "AAP"],
    steps: [
      "Bot Manager on login endpoints — 100+ behavioral signals: mouse, keystrokes, device fingerprints.",
      "Stuffing signatures: rapid failed logins, retry patterns identical to bot templates, geo mismatches.",
      "Adaptive challenges — legit users pass once (fingerprint stored). Bots get progressively harder challenges.",
      "Integration: lock after 5 fails, trigger 2FA for suspicious logins.",
    ],
    result: "99% of stuffing blocked before origin sees it. Zero friction for real users.",
    bestPractice: "Monitor mode first (48-72h) to classify bot categories before flipping to enforcement.",
  },
  {
    icon: ShoppingCart,
    issue: "Inventory scraping by bots",
    headline: "IP blocks don't work when they rotate 10K proxies.",
    solution: "Bot Manager Behavioral Fingerprinting",
    products: ["Bot Manager Premier"],
    steps: [
      "Bot Manager on catalog endpoints — forget IPs, focus on behavior.",
      "Scraper tells: perfect timing, missing headers, same User-Agent across 100+ IPs, sequential enumeration.",
      "Device fingerprinting: TLS analysis, JS execution tests, cookie handling. Same fingerprint on 50 IPs = scraper.",
      "Rate limit suspects to 10 req/min. Real users get 1,000. Force CAPTCHA on first request.",
    ],
    result: "Scrapers blocked by behavior, not IP. Inventory data stays proprietary.",
    bestPractice: "Crypto challenges > CAPTCHAs — invisible to humans, impossible for bots.",
  },
  {
    icon: CreditCard,
    issue: "Carding on checkout APIs",
    headline: "50 cards in 10 seconds? That's not shopping.",
    solution: "AAP Rate Limiting + Bot Manager",
    products: ["AAP", "Bot Manager Premier"],
    steps: [
      "Instrument checkout — AAP learns normal: 1 card validation per 30s, <5 attempts per session.",
      "Carding tells: rapid-fire validations, 50 cards same CVV, geographic jumps in seconds.",
      "Block + alert — kill transaction, flag account, notify payment processor.",
      "Step-up auth: re-enter CVV, OTP, blacklist card fingerprints.",
    ],
    result: "Carding success rate → 0.01%. Payment processor alerted before chargebacks.",
    bestPractice: "Positive security model: only allow expected API parameters through. Everything else is blocked.",
  },
  {
    icon: Bot,
    issue: "Sophisticated bot evasion",
    headline: "Spoof one signal? Easy. Spoof 100? Impossible.",
    solution: "Bot Manager ML + Behavioral Analysis",
    products: ["Bot Manager Premier"],
    steps: [
      "Behavioral baseline: real Chrome TLS cipher order, JA3 fingerprints, JS engine, cookie handling.",
      "ML compares incoming requests vs. baseline. Spoofed UA with rotating IPs still leaves traces.",
      "Header forensics: bot claims Chrome but uses Firefox HTTP/2 SETTINGS. Caught.",
      "Escalating enforcement: 1st → CAPTCHA, 2nd → 1h block, 3rd → 24h block.",
    ],
    result: "Attack ROI goes negative. Spoofing 100 features across 1,000 requests = not worth it.",
    bestPractice: "Behavioral > signature. Signature catches known bots. Behavioral catches the unknown ones.",
  },
];

const SecuritySolutionsSlide = () => {
  const [activeModal, setActiveModal] = useState<number | null>(null);

  return (
    <SlideLayout id="security-solutions" pageNumber={6}>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <p className="text-accent font-semibold tracking-widest uppercase text-sm">Section B — How We Lock It Down</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">Security Solutions</h2>
          <p className="text-muted-foreground text-sm">Click any threat for the full mitigation playbook</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {securitySolutions.map((s, i) => (
            <div
              key={s.issue}
              onClick={() => setActiveModal(i)}
              className="visual-card callout-badge bg-card rounded-xl border border-border p-5 shadow-sm group cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <s.icon size={24} className="text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-secondary leading-tight">{s.issue}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 italic">{s.headline}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {s.products.map(p => (
                      <span key={p} className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-semibold">{p}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-accent text-xs font-semibold group-hover:gap-2 transition-all shrink-0 mt-1">
                  <ArrowRight size={14} />
                </div>
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
