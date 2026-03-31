import { useState } from "react";
import { AlertTriangle, TrendingDown, CheckCircle2 } from "lucide-react";

const InventoryScrapingViewer = () => {
  const [activeTab, setActiveTab] = useState<"patterns" | "detection" | "strategy">("patterns");

  const scrapingPatterns = [
    {
      name: "Perfect Timing",
      normal: "Real user: Random delays between clicking products (30 seconds reading, 10 seconds deciding)",
      attack: "Bot scraper: Every request exactly 500 milliseconds apart, zero variation",
      detect: "If timing is too perfect and repetitive every single time: bot",
    },
    {
      name: "Sequential Product IDs",
      normal: "Real user: Jumps around (/product/100 → /product/5000 → /product/50)",
      attack: "Bot scraper: /product/1 → /product/2 → /product/3 (incremental harvesting)",
      detect: "If accessing products in order 1, 2, 3, 4, 5... continuously: obvious scraper",
    },
    {
      name: "Same Headers Across Different IPs",
      normal: "Real user: Each person has unique browser + device combinations",
      attack: "Bot uses proxy network: Same User-Agent + missing headers across 50 different IPs",
      detect: "Identical request signature from 100 different IPs = scraper network",
    },
    {
      name: "No Real Browser Behavior",
      normal: "Real browser: Loads CSS, images, JavaScript. Has cookies. Connections have typical browser patterns.",
      attack: "Bot scraper: Ignores images, goes straight to product data API. No browser cookies.",
      detect: "If request looks like API client (missing normal browser stuff): likely bot",
    },
  ];

  const detectionMethods = [
    {
      method: "Request Fingerprint",
      how: "Capture unique signature of how request is made (not just IP)",
      result: "Same fingerprint seen from 20+ different IPs = scraper network",
      evasion_effort: "Medium (requires changing request signature)",
    },
    {
      method: "JavaScript Challenge",
      how: "Ask request to execute JavaScript code. Real browsers can. Scrapers struggle.",
      result: "Request that can't run JavaScript = likely bot",
      evasion_effort: "Hard (requires bot framework like Puppeteer)",
    },
    {
      method: "Cookie Validation",
      how: "Set and track cookies. Real browsers follow cookie rules. Bots don't.",
      result: "Invalid cookie handling = bot",
      evasion_effort: "Medium (bot needs full browser emulation)",
    },
    {
      method: "Pattern Analysis",
      how: "Analyze complete behavior: navigation patterns, access patterns, timing patterns",
      result: "Human-like pattern = allow. Robot-like pattern = block",
      evasion_effort: "Very Hard (requires completely new behavior)",
    },
  ];

  const strategy = [
    {
      step: 1,
      name: "Detect Fingerprint Mismatch",
      spots: "Request arrives from Switzerland IP but TLS fingerprint says USA device. Same fingerprint seen before from 50 other IPs.",
      action: "Rate limit requests to 5 per minute (vs normal 1,000+)",
    },
    {
      step: 2,
      name: "Challenge Suspicious Pattern",
      spots: "Products being accessed sequentially (1, 2, 3, 4...) with perfect 500ms timing",
      action: "Inject JavaScript challenge. If fails → block for 24 hours.",
    },
    {
      step: 3,
      name: "Block Scraper Network",
      spots: "Multiple IPs with same fingerprint detected in 1 hour",
      action: "Blacklist fingerprint + IP range for 7 days",
    },
    {
      step: 4,
      name: "Notify & Monitor",
      spots: "Account that triggered blocks",
      action: "Disable account, alert customer success team",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Tab Switcher */}
      <div className="flex gap-2 border-b flex-wrap">
        <button
          onClick={() => setActiveTab("patterns")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "patterns"
              ? "border-b-2 border-accent text-accent"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Scraper Patterns
        </button>
        <button
          onClick={() => setActiveTab("detection")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "detection"
              ? "border-b-2 border-accent text-accent"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Detection Methods
        </button>
        <button
          onClick={() => setActiveTab("strategy")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "strategy"
              ? "border-b-2 border-accent text-accent"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Enforcement Steps
        </button>
      </div>

      {/* TAB 1: Patterns */}
      {activeTab === "patterns" && (
        <div className="space-y-3">
          {scrapingPatterns.map((p, idx) => (
            <div key={idx} className="bg-muted/40 border border-border/50 rounded p-3 text-xs space-y-2">
              <h4 className="font-semibold text-foreground">{p.name}</h4>

              <div className="grid gap-2">
                <div className="bg-background rounded p-2 border border-akamai-green/30">
                  <p className="text-muted-foreground mb-1"><strong>✓ Normal:</strong></p>
                  <p className="text-foreground text-[11px]">{p.normal}</p>
                </div>

                <div className="bg-background rounded p-2 border border-destructive/30">
                  <p className="text-muted-foreground mb-1"><strong>✗ Scraper Attack:</strong></p>
                  <p className="text-foreground text-[11px]">{p.attack}</p>
                </div>

                <div className="bg-accent/10 rounded p-2 border border-accent/30">
                  <p className="text-accent font-semibold text-[11px]">→ Detection: {p.detect}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: Detection Methods */}
      {activeTab === "detection" && (
        <div className="space-y-3">
          {detectionMethods.map((method, idx) => (
            <div key={idx} className="bg-muted/40 border border-border/50 rounded p-3 text-xs space-y-2">
              <h4 className="font-semibold text-foreground">{method.method}</h4>

              <div className="space-y-2">
                <div className="bg-background rounded p-2 border border-border/50">
                  <p className="text-muted-foreground mb-1"><strong>How it works:</strong></p>
                  <p className="text-foreground text-[11px]">{method.how}</p>
                </div>

                <div className="bg-accent/10 rounded p-2 border border-accent/30">
                  <p className="text-accent font-semibold text-[11px]">Result: {method.result}</p>
                </div>

                <div className="bg-muted rounded p-2 border border-border/50">
                  <p className="text-muted-foreground text-[11px]">Scraper effort to bypass: <strong>{method.evasion_effort}</strong></p>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-akamai-green/10 border border-akamai-green/30 rounded p-3 text-xs space-y-2">
            <p className="font-semibold text-akamai-green">Why Multiple Methods?</p>
            <p className="text-akamai-green/80">
              One detection method easy to bypass. Multiple methods combined = scraper must rebuild entire attack from scratch.
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: Enforcement Steps */}
      {activeTab === "strategy" && (
        <div className="space-y-3">
          {strategy.map((step) => (
            <div key={step.step} className="flex gap-3">
              {/* Step number */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center shrink-0 font-bold text-xs text-accent">
                  {step.step}
                </div>
                {step.step < strategy.length && <div className="w-0.5 h-24 bg-accent/20 my-1" />}
              </div>

              {/* Content */}
              <div className="flex-1 pb-3">
                <h4 className="font-semibold text-foreground mb-1">{step.name}</h4>

                <div className="bg-muted/40 rounded p-2 border border-border/50 mb-2">
                  <p className="text-muted-foreground text-[11px] mb-1"><strong>We spot:</strong></p>
                  <p className="text-foreground text-[11px]">{step.spots}</p>
                </div>

                <div className="bg-accent/10 rounded p-2 border border-accent/30">
                  <p className="text-accent font-semibold text-[11px]">Action: {step.action}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-akamai-green/10 border border-akamai-green/30 rounded p-3 text-xs space-y-2">
            <p className="font-semibold text-akamai-green flex items-center gap-2">
              <CheckCircle2 size={14} />
              Inventory Scraping Prevention Result
            </p>
            <ul className="space-y-1 text-akamai-green/80">
              <li>• Legitimate customers: Browse normally, zero friction</li>
              <li>• Scrapers: Must work around 4 different detection methods simultaneously</li>
              <li>• Success rate: Drops from 80% success to 5% (barely worth the effort)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryScrapingViewer;
