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

const CompanyOverviewSlide = () => (
  <SlideLayout id="company-overview" variant="alt" pageNumber={2}>
    <div className="space-y-6">
      <div>
        <p className="text-primary font-semibold tracking-[0.2em] uppercase text-[10px] mb-2">AT Retailers</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          Current State → Target State
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Current */}
        <div className="accent-card accent-card-orange p-5 space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle size={18} className="text-accent" />
            <h3 className="font-display text-lg font-bold text-foreground">Current State</h3>
          </div>
          {currentState.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-start gap-2.5">
              <Icon size={14} className="text-accent/60 mt-0.5 shrink-0" />
              <p className="text-sm text-foreground/50">{text}</p>
            </div>
          ))}
        </div>

        {/* Target */}
        <div className="accent-card p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Target size={18} className="text-primary" />
            <h3 className="font-display text-lg font-bold text-foreground">Target State</h3>
          </div>
          {targetState.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-start gap-2.5">
              <Icon size={14} className="text-primary/60 mt-0.5 shrink-0" />
              <p className="text-sm text-foreground/50">{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Program Objective */}
      <div className="noir-panel p-5 border-l-3 border-l-primary text-center space-y-1" style={{ borderLeftWidth: 3, borderLeftColor: 'hsl(175, 80%, 48%)' }}>
        <p className="text-[10px] font-semibold text-primary/50 tracking-[0.2em] uppercase">Program Objective</p>
        <p className="font-display text-base md:text-lg font-bold text-foreground">
          Onboard 5,000 hostnames in 30 days while improving resiliency, performance, and security.
        </p>
      </div>

      {/* Quick facts */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { value: "Enterprise", label: "Global E-Commerce" },
          { value: "NA · LATAM · EU", label: "Regions" },
          { value: "Multiple", label: "Acquisitions" },
          { value: "On-Prem + AWS", label: "Infrastructure" },
        ].map(({ value, label }) => (
          <div key={label} className="noir-panel p-3 text-center">
            <p className="font-display font-bold text-foreground text-sm">{value}</p>
            <p className="text-[10px] text-foreground/25 mt-0.5">{label}</p>
          </div>
        ))}
      </div>
    </div>
  </SlideLayout>
);

export default CompanyOverviewSlide;
