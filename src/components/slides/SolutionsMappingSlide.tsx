import SlideLayout from "./SlideLayout";
import { ArrowRight, Check } from "lucide-react";
import { Truck, Shield, TrendingUp } from "lucide-react";

const mappingTable = [
  {
    category: "Delivery",
    icon: Truck,
    color: "primary",
    items: [
      { challenge: "5,000 hostnames in 30 days", solutions: ["Ion", "GTM", "Bulk API"] },
      { challenge: "5x traffic surge handling", solutions: ["Ion (SureRoute)", "GTM (Failover)"] },
      { challenge: "Slow image loading", solutions: ["Image & Video Manager"] },
      { challenge: "Production without testing", solutions: ["mPulse (RUM)", "A/B Testing"] },
    ],
  },
  {
    category: "Security",
    icon: Shield,
    color: "accent",
    items: [
      { challenge: "DDoS attacks", solutions: ["Prolexic", "Site Shield"] },
      { challenge: "Credential stuffing", solutions: ["Bot Manager", "API Protector"] },
      { challenge: "Sophisticated bots", solutions: ["Bot Manager Premier (ML)"] },
      { challenge: "Legacy WAF rule sets", solutions: ["App & API Protector (Adaptive)"] },
    ],
  },
  {
    category: "Scale & Governance",
    icon: TrendingUp,
    color: "akamai-green",
    items: [
      { challenge: "Multi-geography coordination", solutions: ["GTM (Central)", "DataStream"] },
      { challenge: "Legacy to microservices", solutions: ["Ion (Hybrid)", "Config Templates"] },
      { challenge: "Acquired companies migration", solutions: ["API Automation", "Rapid Provisioning"] },
      { challenge: "Cross-team change mgmt", solutions: ["Workflow Automation", "Audit Logs"] },
    ],
  },
];

const SolutionsMappingSlide = () => {
  return (
    <SlideLayout id="solutions-mapping" pageNumber={6}>
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm">Strategic Alignment</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">Challenge → Solution Mapping</h2>
          <p className="text-muted-foreground">One-to-one alignment of problems to Akamai products</p>
        </div>

        {/* Mapping Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {mappingTable.map((section) => {
            const Icon = section.icon;
            const colorMap: Record<string, string> = {
              primary: "bg-primary text-primary-foreground",
              accent: "bg-accent text-accent-foreground",
              "akamai-green": "bg-akamai-green text-primary-foreground",
            };

            return (
              <div key={section.category} className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                {/* Header */}
                <div className={`${colorMap[section.color]} p-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={20} />
                    <h3 className="font-display font-semibold text-lg">{section.category}</h3>
                  </div>
                </div>

                {/* Items */}
                <div className="p-4 space-y-3">
                  {section.items.map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <p className="text-sm font-semibold text-secondary">{item.challenge}</p>
                      <div className="flex items-start gap-2">
                        <ArrowRight size={14} className={`text-${section.color} mt-0.5 shrink-0`} />
                        <div className="flex flex-wrap gap-1">
                          {item.solutions.map((solution) => (
                            <span
                              key={solution}
                              className={`text-xs px-2 py-1 rounded-full ${
                                section.color === "primary"
                                  ? "bg-primary/20 text-primary"
                                  : section.color === "accent"
                                    ? "bg-accent/20 text-accent"
                                    : "bg-akamai-green/20 text-akamai-green"
                              }`}
                            >
                              {solution}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-card rounded-lg border border-border p-4 text-center">
            <p className="text-2xl font-bold text-primary">6</p>
            <p className="text-xs text-muted-foreground mt-1">Core Products</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-4 text-center">
            <p className="text-2xl font-bold text-accent">13</p>
            <p className="text-xs text-muted-foreground mt-1">Challenges Addressed</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-4 text-center">
            <p className="text-2xl font-bold text-akamai-green">1</p>
            <p className="text-xs text-muted-foreground mt-1">Unified Platform</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-4 text-center">
            <p className="text-2xl font-bold text-primary">30</p>
            <p className="text-xs text-muted-foreground mt-1">Days to Deploy</p>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};

export default SolutionsMappingSlide;
