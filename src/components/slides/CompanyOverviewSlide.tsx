import SlideLayout from "./SlideLayout";
import { Server, Cloud, Globe, Bug, GraduationCap, AlertTriangle, Target, Network, Zap, ShieldCheck, Map, KeyRound } from "lucide-react";

const currentState = [
  { icon: Server, text: "Legacy monolith on on-prem + AWS" },
  { icon: Network, text: "Acquired platforms on different providers" },
  { icon: ShieldCheck, text: "Legacy WAF rules outdated on some configurations" },
  { icon: Bug, text: "Active threats: credential stuffing, scraping, DDoS" },
  { icon: GraduationCap, text: "New teams not yet trained on Akamai" },
];

const targetState = [
  { icon: Cloud, text: "All traffic fronted by Akamai Edge Platform" },
  { icon: KeyRound, text: "Standardized hostname onboarding & cert automation" },
  { icon: Zap, text: "Delivery optimized for 5× peaks & image performance" },
  { icon: ShieldCheck, text: "Modern security: WAF, Bot Manager, API Security" },
  { icon: Map, text: "Repeatable operating model across all geographies" },
];

const CompanyOverviewSlide = () => (
  <SlideLayout id="company-overview" pageNumber={2}>
    <div className="space-y-6 stagger-children">
      <div>
        <p className="text-primary font-semibold tracking-[0.2em] uppercase text-xs mb-2">AT Retailers</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Current State → Target State</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="stripe-card stripe-card-orange p-5 space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle size={18} className="text-accent" />
            <h3 className="font-display text-lg font-bold text-foreground">Current State</h3>
          </div>
          {currentState.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-start gap-2.5">
              <Icon size={15} className="text-accent/70 mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>

        <div className="stripe-card p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Target size={18} className="text-primary" />
            <h3 className="font-display text-lg font-bold text-foreground">Target State</h3>
          </div>
          {targetState.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-start gap-2.5">
              <Icon size={15} className="text-primary/70 mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="clean-card p-5 text-center space-y-1 border-t-2 border-t-primary">
        <p className="text-xs font-semibold text-primary tracking-[0.2em] uppercase">Program Objective</p>
        <p className="font-display text-lg md:text-xl font-bold text-foreground">
          Onboard 5,000 hostnames in 30 days while improving resiliency, performance, and security.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { value: "Enterprise", label: "Global E-Commerce" },
          { value: "NA · LATAM · EU", label: "Regions" },
          { value: "Multiple", label: "Acquisitions" },
          { value: "On-Prem + AWS", label: "Infrastructure" },
        ].map(({ value, label }) => (
          <div key={label} className="clean-card p-3 text-center">
            <p className="font-display font-bold text-foreground text-base">{value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
          </div>
        ))}
      </div>
    </div>
  </SlideLayout>
);

export default CompanyOverviewSlide;
