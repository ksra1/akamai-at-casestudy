import SlideLayout from "./SlideLayout";
import { Shield, CheckCircle2 } from "lucide-react";

const securityChallenges = [
  {
    issue: "DDoS attacks attempting to take down origin",
    solution: "Prolexic DDoS Protection + Site Shield origin masking",
    benefit: "Detection: Prolexic sensors recognize 10+ Tbps attack signatures (volumetric, protocol, app-layer). Mitigation: Always-on edge scrubbing + origin IP hiding prevents direct targeting.",
    details: "Step 1: Enable Prolexic scrubbing on properties—traffic routes through Akamai's 300+ scrubbing centers detecting volumetric attacks (UDP floods, SYN floods) and protocol attacks (fragmented packets, malformed HTTP).\nStep 2: Activate Site Shield—real origin IPs are masked behind Akamai's edge network. Attackers can only target Akamai's edge, not your origin directly. Block any non-Akamai traffic to your origin via firewall ACLs.\nStep 3: Configure DDoS protection rules—set drop thresholds for obvious attacks (e.g., >10,000 requests/sec from single IP, >1M requests/min from single /16 subnet).\nStep 4: mPulse monitors origin health and attack traffic—track dropped traffic, origin response time, and incident timeline.\nResult: Unlimited attack capacity absorbed at edge, origin stays online, attackers unable to find/target real infrastructure.",
    products: [
      { name: "Prolexic DDoS", link: "https://techdocs.akamai.com/prolexic/docs" },
      { name: "Site Shield", link: "https://techdocs.akamai.com/site-shield/docs" },
      { name: "mPulse", link: "https://techdocs.akamai.com/mpulse/docs" },
    ],
  },
  {
    issue: "Legacy WAF rule sets out of date—missing modern threats",
    solution: "App & API Protector with auto-updating managed rules + threat intelligence feeds",
    benefit: "Detection: Threat intel updates daily with new attack patterns. Mitigation: Automated rules deployment + reduced false positives via ML.",
    details: "Step 1: Audit current WAF rules—identify outdated signatures not catching OWASP Top 10 API attacks (injection, broken auth, excessive data exposure).\nStep 2: Enable App & API Protector managed rules—replace static WAF with Akamai's threat intelligence system that updates daily based on global attack trends (new malware, CVEs, zero-days).\nStep 3: Deploy reputation-based rules—Akamai tracks attacker IP behavior globally and blocks known attack sources automatically. ML engine learns normal API usage patterns to detect anomalies.\nStep 4: Continuously tune—set alerts for triggered rules, review false positives weekly, gradually promote detection-only rules to blocking mode.\nResult: Modern attack coverage, zero manual rule updates, 70% fewer false positives vs. legacy WAF rules, auto-protection against zero-day patterns.",
    products: [
      { name: "App & API Protector", link: "https://techdocs.akamai.com/wap/docs" },
    ],
  },
  {
    issue: "Surge in credential stuffing attempts on login endpoints",
    solution: "Bot Manager Premier + rate limiting + credential attack detection",
    benefit: "Detection: ML identifies unnatural login patterns (100+ failed attempts from single device in 5min). Mitigation: Automatic challenge/block + account lockout integration.",
    details: "Step 1: Deploy Bot Manager on login endpoints (/login, /signin, /api/auth)—analyze 100+ behavioral signals: mouse movement, keypress timing, device fingerprints, HTTP header patterns.\nStep 2: Detect credential staffing signatures—rapid-fire failed logins from single IP/device, retry timing patterns identical to bot templates, geographic mismatches (login from 10 countries in 1 minute).\nStep 3: Enforce adaptive challenges—legitimate users pass CAPTCHA once, device fingerprint stored; repeat attempts from same device skip challenge (90% faster UX). Bot requests immediately get 3x harder challenge.\nStep 4: Integrate with customer's account system—send /block API signal to origin to lock accounts after 5 failed attempts, trigger 2FA requirement for suspicious logins, log for fraud team.\nResult: 99% of credential stuffing blocked before origin sees it, zero legitimate user friction, staffing attack cost per account attempt increases 100x (bots move to easier targets).",
    products: [
      { name: "Bot Manager", link: "https://techdocs.akamai.com/bot-manager/docs" },
      { name: "App & API Protector", link: "https://techdocs.akamai.com/wap/docs" },
    ],
  },
  {
    issue: "Inventory scraping by competitive bots across geographies",
    solution: "Bot Manager behavioral fingerprinting + request pattern analysis",
    benefit: "Detection: ML fingerprints bots across IP rotations by device behavior, not IP. Mitigation: Block scrapers, enforce session validation, rate-limit suspicious patterns.",
    details: "Step 1: Enable Bot Manager on product catalog endpoints (/products, /api/inventory, /search)—IP blocks fail because scrapers rotate through proxies constantly. Focus on behavior instead.\nStep 2: Identify scraper behavioral patterns—perfect request timing (exactly 2.5sec between requests), missing HTTP headers (User-Agent), identical User-Agent strings across 100+ IPs, sequential product ID enumeration (/product/1000, /product/1001...).\nStep 3: Fingerprint bot devices—TLS certificate analysis, JavaScript execution tests, cookie handling patterns. Same device fingerprint appearing across 50 different IPs = suspicious scraper.\nStep 4: Enforcement—rate limit suspicious fingerprints to 10 requests/min (vs. 1000 for real users). Force CAPTCHA on scrapers' first request. Notify origin of scraper sessions—origin can block inventory data from those sessions.\nResult: Scrapers blocked by behavior not IP, competitive intel loss ends, inventory data stays proprietary.",
    products: [
      { name: "Bot Manager", link: "https://techdocs.akamai.com/bot-manager/docs" },
    ],
  },
  {
    issue: "Carding attempts targeting checkout APIs (card validation attacks)",
    solution: "App & API Protector (rate limiting + parameter anomaly detection) + Bot Manager",
    benefit: "Detection: Velocity analysis catches rapid card attempts. Mitigation: Automatic transaction blocking + fraud signals sent to payment processor.",
    details: "Step 1: Instrument checkout API endpoints (/api/validate-card, /api/checkout)—App & API Protector learns normal API usage: 1 card validation per 30 seconds per user, <5 card attempts per session, sequential card attempts >30 sec apart.\nStep 2: Detect carding patterns—single device rapid-fires 50 card validations in 2 minutes, uses 50 different card numbers with same CVV, geographic location changes between requests (EU → US → China in 10 seconds).\nStep 3: Block & notify—when carding detected, block transaction immediately, return API rate-limit error to client, flag account as compromised, send fraud signal to payment processor (Stripe/PayPal) to block card.\nStep 4: Real-time mitigatio—force Step-Up Authentication (re-enter CVV, OTP) for flagged transactions, require additional verification for repeated failures, blacklist card fingerprints across platform.\nResult: Carding attack success rate drops to 0.01%, payment processor alerted before money wasted, customer accounts protected from fraudulent charges.",
    products: [
      { name: "App & API Protector", link: "https://techdocs.akamai.com/wap/docs" },
      { name: "Bot Manager", link: "https://techdocs.akamai.com/bot-manager/docs" },
    ],
  },
  {
    issue: "Sophisticated bot evasion: IP rotation + spoofed User-Agents and TLS signatures",
    solution: "Bot Manager ML fingerprinting + behavioral analysis (transcends IP/headers)",
    benefit: "Detection: ML identifies spoofed clients by analyzing 100+ features beyond IP/User-Agent (TLS signatures, crypto parameters, timing patterns). Mitigation: Impossible to mimic real browser behavior at scale.",
    details: "Step 1: Build behavioral baseline—Track real Chrome browser behavior: specific TLS cipher order, JA3 fingerprints, JavaScript engine behavior, cookie handling quirks, HTTP header patterns that change naturally per request.\nStep 2: Deploy ML fingerprinting—Bot Manager compares incoming requests against baseline. Bot using spoofed User-Agent but rotating IPs still leaves traces: identical JA3 fingerprint, identical crypto parameter mismatch, identical JavaScript test result every time.\nStep 3: Detect spoofed headers—Bot spoofs Chrome but missing Chrome-specific header permutations, or uses HTTP/2 SETTINGS frame with Firefox values. ML catches the mismatch across 50 feature dimensions.\nStep 4: Escalating enforcement—1st offense: force CAPTCHA, bake fingerprint to human device set. 2nd offense (same device, different IP): block 1 hour. 3rd offense: block 24 hours. If bot keeps rotating devices, IP-based reputation kicks in.\nResult: Bots unable to scale—spoofing one browser fingerprint possible; spoofing 100 features simultaneously across 1000 requests = impossible. Attack ROI becomes negative.",
    products: [
      { name: "Bot Manager", link: "https://techdocs.akamai.com/bot-manager/docs" },
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
          <div key={idx} className={`border-l-4 rounded px-3 py-2.5 ${isResult ? 'border-l-green-500 bg-green-50' : 'border-l-red-500 bg-red-50'}`}>
            <div className="flex items-start gap-2">
              <div className={`flex-shrink-0 font-bold text-sm w-6 h-6 rounded-full flex items-center justify-center ${isResult ? 'bg-green-500 text-white' : 'bg-accent text-white'}`}>
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

const SecuritySolutionsSlide = () => {
  return (
    <SlideLayout id="security-solutions" pageNumber={6}>
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <p className="text-accent font-semibold tracking-widest uppercase text-sm">Solution Architecture</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">Security Solutions</h2>
          <p className="text-muted-foreground">{securityChallenges.length} security challenges solved</p>
        </div>

        {/* Security Solutions */}
        <div className="space-y-4">
          {securityChallenges.map((item, idx) => (
            <div key={idx} className="border-l-4 border-l-accent bg-card rounded-lg p-5 shadow-sm">
              <div className="flex items-start gap-3 mb-2">
                <CheckCircle2 size={20} className="text-accent mt-0.5 shrink-0" />
                <div className="flex-grow">
                  <p className="font-semibold text-secondary">{item.issue}</p>
                </div>
              </div>
              <div className="ml-7 space-y-2">
                <p className="text-sm font-semibold text-accent">{item.solution}</p>
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
                        className="inline-block text-xs font-semibold px-2 py-1 bg-accent/10 text-accent rounded hover:bg-accent/20 transition-colors"
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

export default SecuritySolutionsSlide;
