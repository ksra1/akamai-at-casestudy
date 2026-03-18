import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const glossary = [
  { term: "Ion", def: "Akamai's flagship CDN product for dynamic and static content acceleration. Includes SureRoute, prefetching, and adaptive optimization." },
  { term: "Image & Video Manager (IVM)", def: "Edge-based image/video transformation service. Automatic format conversion, responsive sizing, and quality optimization." },
  { term: "Global Traffic Management (GTM)", def: "DNS-based intelligent traffic routing with failover, performance-based routing, and geographic load balancing." },
  { term: "App & API Protector (AAP)", def: "Next-generation adaptive WAF with built-in API protection, DDoS defense, and Adaptive Security Engine for automated rule tuning." },
  { term: "Bot Manager Premier", def: "Advanced bot detection using behavioral analysis, device fingerprinting, and ML classification. Handles sophisticated evasion techniques." },
  { term: "Prolexic", def: "Always-on DDoS protection service with 10+ Tbps scrubbing capacity. BGP-based routing for automatic attack diversion." },
  { term: "Site Shield", def: "Origin cloaking service that hides origin server IPs, preventing direct-to-origin DDoS and application attacks." },
  { term: "EdgeWorkers", def: "Serverless compute at the Akamai edge. Run JavaScript/TypeScript for A/B testing, personalization, and custom logic without origin round-trips." },
  { term: "mPulse", def: "Real User Monitoring (RUM) for Core Web Vitals, performance analytics, and business KPI correlation." },
  { term: "DataStream", def: "Real-time log delivery service for streaming CDN and security logs to SIEM, Splunk, or cloud storage." },
  { term: "Property Manager", def: "Configuration management system for Akamai CDN properties. Supports API, CLI, and Terraform for automation." },
  { term: "SureRoute", def: "Optimization feature within Ion that tests multiple routes to origin and selects the fastest, most reliable path." },
  { term: "Tiered Distribution", def: "Caching hierarchy feature that reduces origin load by serving content from parent cache servers before reaching origin." },
  { term: "Adaptive Security Engine", def: "AAP's ML-powered engine that auto-tunes WAF rules based on traffic patterns, reducing false positives by up to 5x." },
  { term: "Terraform Provider", def: "Official Akamai Terraform provider for infrastructure-as-code management of CDN, DNS, and security configurations." },
  { term: "OWASP Top 10", def: "Industry-standard list of the 10 most critical web application security risks. AAP provides out-of-the-box protection for all categories." },
];

interface GlossaryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GlossaryModal = ({ open, onOpenChange }: GlossaryModalProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto border-primary/20">
      <DialogHeader>
        <DialogTitle className="font-display text-xl text-secondary">Akamai Product Glossary</DialogTitle>
      </DialogHeader>
      <DialogDescription asChild>
        <div className="space-y-3">
          {glossary.map((g) => (
            <div key={g.term} className="border-b border-border/50 pb-3 last:border-0">
              <p className="font-semibold text-primary text-sm">{g.term}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{g.def}</p>
            </div>
          ))}
        </div>
      </DialogDescription>
    </DialogContent>
  </Dialog>
);

export default GlossaryModal;
