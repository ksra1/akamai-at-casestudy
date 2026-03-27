import SlideLayout from "./SlideLayout";
import { Server, Cloud, Globe, ShoppingCart, AlertTriangle, Check, ArrowRight, Target } from "lucide-react";

const currentState = [
  { icon: Server, text: "Legacy monolith on on-prem + AWS" },
  { icon: Globe, text: "Acquired platforms on different providers" },
  { icon: AlertTriangle, text: "Inconsistent security posture across properties" },
  { icon: ShoppingCart, text: "Active threats: credential stuffing, scraping, DDoS" },
  { icon: AlertTriangle, text: "New teams not yet trained on Akamai" },
];

const targetState = [
  { icon: Cloud, text: "All traffic fronted by Akamai Edge Platform" },
  { icon: Check, text: "Standardized hostname onboarding & cert automation" },
  { icon: Check, text: "Delivery optimized for 5× peaks & image performance" },
  { icon: Check, text: "Modern security: WAF, Bot Manager, API Security" },
  { icon: Check, text: "Repeatable operating model across all geographies" },
];

const CompanyOverviewSlide = () => {
  return (
    <SlideLayout id="company-overview" variant="alt" pageNumber={2}>
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <p className="text-primary font-semibold tracking-[0.2em] uppercase text-sm">AT Retailers</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Current State → Target State
          </h2>
        </div>

        {/* Current vs Target columns */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Current State */}
          <div className="glass-card rounded-2xl p-6 space-y-4 border-destructive/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-destructive/15 flex items-center justify-center">
                <AlertTriangle size={22} className="text-destructive" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">Current State</h3>
            </div>
            <div className="space-y-3">
              {currentState.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={14} className="text-destructive" />
                  </div>
                  <p className="text-sm text-foreground/60 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Target State */}
          <div className="glass-card rounded-2xl p-6 space-y-4 border-primary/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                <Target size={22} className="text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">Target State</h3>
            </div>
            <div className="space-y-3">
              {targetState.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={14} className="text-primary" />
                  </div>
                  <p className="text-sm text-foreground/60 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Arrow between */}
        <div className="flex justify-center">
          <ArrowRight size={32} className="text-primary flow-arrow" />
        </div>

        {/* Program Objective banner */}
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 text-center space-y-2 glow-primary">
          <p className="text-xs font-semibold text-primary/60 tracking-[0.2em] uppercase">Program Objective</p>
          <p className="font-display text-lg md:text-xl font-bold text-foreground">
            Onboard 5,000 hostnames in 30 days while improving resiliency, performance, and security during the migration.
          </p>
        </div>

        {/* Quick facts */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { value: "Enterprise", label: "Global E-Commerce" },
            { value: "NA · LATAM · EU", label: "Regions" },
            { value: "Multiple", label: "Acquisitions" },
            { value: "On-Prem + AWS", label: "Infrastructure" },
          ].map(({ value, label }) => (
            <div key={label} className="glass-card rounded-xl p-4 text-center">
              <p className="font-display font-bold text-foreground text-sm">{value}</p>
              <p className="text-xs text-foreground/30 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
};

export default CompanyOverviewSlide;
