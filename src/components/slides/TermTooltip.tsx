import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const terms: Record<string, string> = {
  "credential stuffing": "Attackers use username/password pairs leaked from breaches at other companies to try logging into the target site — automated bots test millions of combos hoping users reused passwords.",
  "carding": "Stolen credit card numbers are tested in small transactions against checkout APIs to verify which cards are still active before making large fraudulent purchases.",
  "ddos": "Distributed Denial-of-Service — thousands of compromised machines flood servers with traffic simultaneously, overwhelming capacity and taking the site offline.",
  "waf": "Web Application Firewall — inspects HTTP traffic and blocks requests matching known attack patterns (SQL injection, XSS, etc.) before they reach the application.",
  "adaptive acceleration": "An Akamai Ion feature that uses real user monitoring (RUM) data to automatically preconnect to third-party origins, server-push critical resources, and preload fonts/scripts — continuously adapting as traffic patterns change.",
  "inventory scraping": "Competitor bots systematically crawl product pages to extract pricing, stock levels, and catalog data for competitive intelligence.",
  "ip rotation": "Bots cycle through thousands of IP addresses (often from residential proxies) to avoid rate-limiting and IP-based blocking.",
  "spoofed clients": "Bots forge their User-Agent headers and browser fingerprints to impersonate legitimate browsers like Chrome or Safari.",
  "origin": "The actual backend servers (on-prem or cloud) where the application runs — as opposed to edge/CDN servers closer to end users.",
};

interface TermTooltipProps {
  term: string;
  children?: React.ReactNode;
}

const TermTooltip = ({ term, children }: TermTooltipProps) => {
  const [open, setOpen] = useState(false);
  const key = term.toLowerCase();
  const definition = terms[key];
  if (!definition) return <>{children || term}</>;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="underline decoration-dotted decoration-primary/40 underline-offset-2 hover:decoration-primary cursor-help transition-colors inline"
      >
        {children || term}
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm border-primary/20">
          <DialogHeader>
            <DialogTitle className="font-display text-base text-primary">{term}</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
              {definition}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TermTooltip;
