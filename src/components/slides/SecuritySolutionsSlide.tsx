import { useState } from "react";
import SlideLayout from "./SlideLayout";
import CalloutModal from "./CalloutModal";
import { Shield, Bot, UserX, UserCheck, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";
import DDoSProtectionViewer from "./DDoSProtectionViewer";
import LegacyWAFViewer from "./LegacyWAFViewer";
import CredentialStuffingViewer from "./CredentialStuffingViewer";
import BotThreatViewer from "./BotThreatViewer";
import AccountProtectorViewer from "./AccountProtectorViewer";

const securitySolutions = [
  {
    icon: Shield, issue: "DDoS attacks on origin", solution: "Prolexic + Site Shield", products: ["Prolexic", "Site Shield"],
    steps: [
      "Volumetric Attacks (UDP/SYN floods, 10+ Tbps): Prolexic scrubbing centers absorb at edge, drop malicious traffic before reaching origin",
      "Protocol Attacks (malformed packets, TCP RST floods): Prolexic validates 3-way handshake + connection state, blocks anomalies",
      "Application-Layer Attacks (HTTP floods, Slowloris): Rate limiting + behavioral analysis detects and blocks attack patterns",
      "Direct-to-Origin Attacks (attacker finds your IP): Site Shield masks real origin IPs, block non-Akamai traffic at your firewall",
    ],
    result: "10+ Tbps attack capacity absorbed at edge. Origin stays online and hidden behind Akamai IP mask.",
    bestPractice: "Site Shield prevents origin IP discovery — enables instant failover without DDoS exposure",
  },
  {
    icon: AlertTriangle, issue: "Legacy WAF rules outdated", solution: "App & API Protector (AAP) — Auto-updating rules", products: ["App & API Protector (AAP)"],
    steps: [
      "Audit current WAF rules — identify gaps in OWASP Top 10 coverage (injection, broken auth, data exposure)",
      "Deploy AAP managed rules — auto-updates daily based on new threats, CVEs, zero-days",
      "Enable reputation-based blocking — Akamai tracks attacker IPs globally",
      "7-day alert mode — log threats before blocking to avoid false positives",
    ],
    result: "Modern attack coverage with zero manual rule updates. 5x fewer false positives.",
    bestPractice: "Use Adaptive Security Engine auto-tuning — 7-day alert baseline before deny mode",
  },
  {
    icon: UserX, issue: "Credential stuffing surge", solution: "Bot Manager — Automated login defense", products: ["Bot Manager Premier"],
    steps: [
      "Bot Manager focuses on automated traffic — detects credential stuffing bots by request rate, timing, and fingerprint",
      "Blocks bot-driven login attacks at edge before reaching origin — no server strain",
      "Legitimate users see zero friction — real login behavior passes through automatically",
      "Identifies bot behavior in real time: scraping, credential stuffing, fake signups, and inventory abuse",
    ],
    result: "99% of credential stuffing blocked. Attackers' automation becomes useless.",
    bestPractice: "Start in monitoring mode (1-2 days) to establish baseline before blocking",
  },
  {
    icon: Bot, issue: "Scraping, carding & bot evasion", solution: "Bot Manager — Behavioral ML detection", products: ["Bot Manager Premier"],
    steps: [
      "Bot Manager focuses on automated traffic — scraping (sequential lookups), carding (100 cards/min), evasion (same device across IPs)",
      "Multi-signal defense — analyzes request rate, timing, device fingerprint, IP rotation, abnormal headers",
      "Escalating response — challenge → rate-limit → block based on confidence",
      "Zero friction for legitimate users — real behavior passes through automatically",
    ],
    result: "Blocks 99%+ of scraping, carding, and evasion attacks without impacting real customers.",
    bestPractice: "Start in monitoring mode to establish baseline patterns before enforcement",
  },
  {
    icon: UserCheck, issue: "Account takeover & fraud", solution: "Account Protector — Human-driven abuse defense", products: ["Account Protector"],
    steps: [
      "Focuses on human-driven abuse around sensitive events: login, password reset, account changes, checkout",
      "Builds risk picture from behavioral & contextual signals — device, network, location, time of activity",
      "Real-time risk scoring per request lets you step up authentication, challenge, or block suspicious activity",
      "Detects anomalies from first interaction using population-wide behavioral baseline across all Akamai customers",
    ],
    result: "Account takeover blocked in real time. Legitimate users experience zero added friction.",
    bestPractice: "Organization-specific tuning ensures thresholds match your risk tolerance and user patterns",
  },
];

const SecuritySolutionsSlide = () => {
  const [activeModal, setActiveModal] = useState<number | null>(null);

  return (
    <SlideLayout id="security-solutions" pageNumber={6}>
      <div className="space-y-5 stagger-children">
        <div>
          <p className="text-accent font-semibold tracking-[0.2em] uppercase text-xs mb-2">Security</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Security Solutions</h2>
          <p className="text-muted-foreground text-sm mt-1">Click each threat for step-by-step mitigation</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {securitySolutions.map((s, i) => (
            <div key={s.issue} onClick={() => setActiveModal(i)} className="clean-card callout-badge p-4 group cursor-pointer hover:border-accent/30 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <s.icon size={16} className="text-accent" />
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
                <ArrowRight size={14} className="text-muted-foreground/30 group-hover:text-accent transition-colors shrink-0 mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <CalloutModal open={activeModal === 0} onOpenChange={() => setActiveModal(null)} title={securitySolutions[0].issue}>
        <DDoSProtectionViewer />
      </CalloutModal>
      <CalloutModal open={activeModal === 1} onOpenChange={() => setActiveModal(null)} title={securitySolutions[1].issue}>
        <LegacyWAFViewer />
      </CalloutModal>
      <CalloutModal open={activeModal === 2} onOpenChange={() => setActiveModal(null)} title={securitySolutions[2].issue}>
        <CredentialStuffingViewer />
      </CalloutModal>
      <CalloutModal open={activeModal === 3} onOpenChange={() => setActiveModal(null)} title={securitySolutions[3].issue}>
        <BotThreatViewer />
      </CalloutModal>
      <CalloutModal open={activeModal === 4} onOpenChange={() => setActiveModal(null)} title={securitySolutions[4].issue}>
        <AccountProtectorViewer />
      </CalloutModal>
    </SlideLayout>
  );
};

export default SecuritySolutionsSlide;
