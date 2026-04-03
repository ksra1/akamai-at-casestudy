import { useState } from "react";
import SlideLayout from "./SlideLayout";
import CalloutModal from "./CalloutModal";
import { Globe, Users, AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";
import MultiGeographyGovernanceViewer from "./MultiGeographyGovernanceViewer";
import TeamCoordinationViewer from "./TeamCoordinationViewer";
import RiskEscalationViewer from "./RiskEscalationViewer";

const governanceSolutions = [
  {
    icon: Globe,
    issue: "Multi-geography resource coordination (Europe, US, Asia)",
    solution: "Regional Team Structure + Timezone Bridge",
    products: ["Resource Planning", "Team Structure", "Akamai 24x7 Support", "SOCC"],
    steps: [],
    result: "",
    bestPractice: "",
  },
  {
    icon: Users,
    issue: "Team coordination & change management at scale",
    solution: "Phased Rollout + Stakeholder Communication",
    products: ["Change Control", "Status Dashboards", "Stakeholder Updates"],
    steps: [],
    result: "",
    bestPractice: "",
  },
  {
    icon: AlertTriangle,
    issue: "Risk management & stakeholder escalation",
    solution: "Risk Triage + Escalation Framework",
    products: ["Risk Categories", "Decision Gates", "Escalation Paths"],
    steps: [],
    result: "",
    bestPractice: "",
  },
];

const GovernanceSlide = () => {
  const [activeModal, setActiveModal] = useState<number | null>(null);

  return (
    <SlideLayout id="governance" variant="alt" pageNumber={7}>
      <div className="space-y-5 stagger-children">
        <div>
          <p className="text-akamai-green font-semibold tracking-[0.2em] uppercase text-xs mb-2">Execution Excellence</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Scale & Governance</h2>
          <p className="text-muted-foreground text-sm mt-1">Click each challenge for organizational strategy</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {governanceSolutions.map((s, i) => (
            <div
              key={s.issue}
              onClick={() => setActiveModal(i)}
              className="clean-card callout-badge p-4 group cursor-pointer hover:border-akamai-green/30 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-akamai-green/10 flex items-center justify-center shrink-0">
                  <s.icon size={16} className="text-akamai-green" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-foreground text-sm leading-tight">{s.issue}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.solution}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {s.products.map((p) => (
                      <span key={p} className="text-[11px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-medium">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowRight size={14} className="text-muted-foreground/30 group-hover:text-akamai-green transition-colors shrink-0 mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {governanceSolutions.map((s, i) => (
        <CalloutModal key={s.issue} open={activeModal === i} onOpenChange={() => setActiveModal(null)} title={s.issue}>
          {i === 0 ? (
            <MultiGeographyGovernanceViewer />
          ) : i === 1 ? (
            <TeamCoordinationViewer />
          ) : i === 2 ? (
            <RiskEscalationViewer />
          ) : (
            <div className="space-y-4">
              <div className="bg-akamai-green/5 border border-akamai-green/15 rounded p-3">
                <p className="text-sm font-semibold text-akamai-green">{s.solution}</p>
              </div>
              <div className="space-y-3">
                {s.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded bg-akamai-green text-akamai-green/10 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
              <div className="bg-akamai-green/5 border border-akamai-green/20 rounded p-3 flex items-start gap-2">
                <CheckCircle2 size={16} className="text-akamai-green shrink-0 mt-0.5" />
                <p className="text-sm font-semibold text-akamai-green">{s.result}</p>
              </div>
            </div>
          )}
        </CalloutModal>
      ))}
    </SlideLayout>
  );
};

export default GovernanceSlide;
