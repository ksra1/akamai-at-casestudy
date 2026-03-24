import SlideLayout from "./SlideLayout";
import { ArrowRight, TrendingUp } from "lucide-react";

const flows = [
  {
    challenge: "5,000 hostnames in 30 days",
    solution: "Ion + GTM + Bulk API",
    outcome: "60-80% origin offload, automated routing",
    difficulty: "High Volume",
  },
  {
    challenge: "5x peak traffic handling",
    solution: "Ion (SureRoute) + GTM",
    outcome: "Intelligent failover, performance-based routing",
    difficulty: "Scale",
  },
  {
    challenge: "Slow image loading",
    solution: "Image & Video Manager",
    outcome: "50-70% payload reduction, WebP/AVIF conversion",
    difficulty: "Performance",
  },
  {
    challenge: "DDoS attacks at origin",
    solution: "Prolexic + Site Shield",
    outcome: "10+ Tbps capacity, transparent mitigation",
    difficulty: "Security",
  },
  {
    challenge: "Credential stuffing & bot traffic",
    solution: "Bot Manager Premier + AAP",
    outcome: "ML-based detection, catches sophisticated evasion",
    difficulty: "Threat",
  },
  {
    challenge: "Outdated WAF rules",
    solution: "App & API Protector (Adaptive)",
    outcome: "Auto-updating rules, 7-day tuning window",
    difficulty: "Compliance",
  },
  {
    challenge: "Multi-region coordination",
    solution: "DataStream + mPulse",
    outcome: "Unified observability, real-time insights",
    difficulty: "Governance",
  },
  {
    challenge: "Legacy monolith migration",
    solution: "Config Templates + API Automation",
    outcome: "Rapid provisioning, codified deployments",
    difficulty: "Modernization",
  },
  {
    challenge: "Acquired companies onboarding",
    solution: "Bulk API + Config as Code",
    outcome: "Hours to configure vs weeks",
    difficulty: "Integration",
  },
];

const difficultyColor: Record<string, string> = {
  "High Volume": "border-l-4 border-l-primary",
  Scale: "border-l-4 border-l-primary",
  Performance: "border-l-4 border-l-akamai-purple",
  Security: "border-l-4 border-l-accent",
  Threat: "border-l-4 border-l-accent",
  Compliance: "border-l-4 border-l-accent",
  Governance: "border-l-4 border-l-akamai-green",
  Modernization: "border-l-4 border-l-akamai-green",
  Integration: "border-l-4 border-l-akamai-green",
};

const ArchitectureSlideV3 = () => {
  return (
    <SlideLayout id="architecture" pageNumber={7}>
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm">Solution Design</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">Challenge → Solution → Outcome Flow</h2>
          <p className="text-muted-foreground">Complete problem-to-resolution mapping</p>
        </div>

        {/* Flow Grid */}
        <div className="space-y-4">
          {flows.map((flow, idx) => (
            <div key={idx} className={`bg-card rounded-lg border border-border p-5 shadow-sm ${difficultyColor[flow.difficulty]}`}>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                {/* Challenge */}
                <div className="md:col-span-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Challenge</p>
                  <p className="text-sm font-semibold text-secondary mt-1">{flow.challenge}</p>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex justify-center">
                  <ArrowRight size={20} className="text-muted-foreground" />
                </div>

                {/* Solution */}
                <div className="md:col-span-1">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider">Solution</p>
                  <p className="text-sm font-semibold text-primary mt-1">{flow.solution}</p>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex justify-center">
                  <ArrowRight size={20} className="text-muted-foreground" />
                </div>

                {/* Outcome */}
                <div className="md:col-span-1">
                  <p className="text-xs font-semibold text-accent uppercase tracking-wider">Outcome</p>
                  <p className="text-sm font-semibold text-accent mt-1">{flow.outcome}</p>
                  <p className="text-xs text-muted-foreground mt-2 italic">{flow.difficulty}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="bg-secondary/5 rounded-xl border-2 border-secondary/20 p-6">
          <h3 className="font-display text-lg font-semibold text-secondary mb-4">Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-2xl font-bold text-primary">9</p>
              <p className="text-xs text-muted-foreground mt-1">Key Challenges</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">12</p>
              <p className="text-xs text-muted-foreground mt-1">Akamai Products</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">3</p>
              <p className="text-xs text-muted-foreground mt-1">Categories</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-akamai-green">1</p>
              <p className="text-xs text-muted-foreground mt-1">Unified Platform</p>
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};

export default ArchitectureSlideV3;
