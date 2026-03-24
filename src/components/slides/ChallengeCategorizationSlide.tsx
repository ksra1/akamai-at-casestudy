import SlideLayout from "./SlideLayout";
import { Cpu, Gavel } from "lucide-react";

const categorizedChallenges = [
  {
    type: "Technical",
    icon: Cpu,
    color: "bg-primary",
    description: "Infrastructure, Performance & Security Issues",
    items: [
      "5,000 hostnames in 30 days — bulk onboarding at scale",
      "5x peak traffic handling required",
      "Slow image loading across sites",
      "DDoS attacks targeting customer origins",
      "Credential stuffing surge",
      "Inventory scraping by competitive bots",
      "Carding attempts on checkout APIs",
      "Sophisticated evasion: IP rotation, spoofed clients",
      "Outdated WAF rule sets on legacy configs",
      "Legacy monolith → microservices migration",
    ],
  },
  {
    type: "Governance & Operational",
    icon: Gavel,
    color: "bg-akamai-green",
    description: "Process, People & Organizational Challenges",
    items: [
      "New teams untrained on Akamai products",
      "Customer wants to skip testing — push straight to production",
      "Multi-geography resource coordination",
      "Acquired companies need platform migration",
      "Cross-team change management at scale",
    ],
  },
];

const ChallengeCategorizationSlide = () => {
  return (
    <SlideLayout id="challenge-categorization" variant="alt" pageNumber={4}>
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm">Problem Classification</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">Technical vs Governance Challenges</h2>
          <p className="text-muted-foreground">Understanding root causes determines solution approach</p>
        </div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-8">
          {categorizedChallenges.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.type} className="bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <Icon size={24} className="text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-secondary">{category.type}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{category.description}</p>
                  </div>
                </div>

                {/* Items */}
                <ul className="space-y-3 mt-6 flex-grow">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className={`${category.color.replace('bg-', 'text-')} mt-1 shrink-0`}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Count */}
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-xs font-semibold text-muted-foreground">
                    <span className={`${category.color.replace('bg-', 'text-')} font-bold text-lg`}>{category.items.length}</span> challenges
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SlideLayout>
  );
};

export default ChallengeCategorizationSlide;
