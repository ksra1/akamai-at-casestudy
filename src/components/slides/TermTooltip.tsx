import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const terms: Record<string, string> = {
  "credential stuffing": "Attackers use username/password pairs leaked from breaches at other companies to try logging into the target site — automated bots test millions of combos hoping users reused passwords.",
  "carding": "Stolen credit card numbers are tested in small transactions against checkout APIs to verify which cards are still active before making large fraudulent purchases.",
  "DDoS": "Distributed Denial-of-Service — thousands of compromised machines flood servers with traffic simultaneously, overwhelming capacity and taking the site offline.",
  "WAF": "Web Application Firewall — inspects HTTP traffic and blocks requests matching known attack patterns (SQL injection, XSS, etc.) before they reach the application.",
  "inventory scraping": "Competitor bots systematically crawl product pages to extract pricing, stock levels, and catalog data for competitive intelligence.",
  "IP rotation": "Bots cycle through thousands of IP addresses (often from residential proxies) to avoid rate-limiting and IP-based blocking.",
  "spoofed clients": "Bots forge their User-Agent headers and browser fingerprints to impersonate legitimate browsers like Chrome or Safari.",
  "origin": "Your actual backend servers (on-prem or cloud) where the application runs — as opposed to edge/CDN servers closer to end users.",
};

interface TermTooltipProps {
  term: string;
  children?: React.ReactNode;
}

const TermTooltip = ({ term, children }: TermTooltipProps) => {
  const key = term.toLowerCase();
  const definition = terms[key];
  if (!definition) return <>{children || term}</>;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="underline decoration-dotted decoration-primary/40 underline-offset-2 hover:decoration-primary cursor-help transition-colors"
        >
          {children || term}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72 text-sm" side="top">
        <p className="font-semibold text-primary text-xs uppercase tracking-wider mb-1">{term}</p>
        <p className="text-muted-foreground text-xs leading-relaxed">{definition}</p>
      </PopoverContent>
    </Popover>
  );
};

export default TermTooltip;
