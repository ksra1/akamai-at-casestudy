import SlideLayout from "./SlideLayout";
import { Server, Cloud, Globe, ShoppingCart, AlertTriangle, Check, ArrowRight, Target } from "lucide-react";

const currentState = [
  { icon: Server, text: "Monolith on on-prem + AWS — one deploy, one prayer" },
  { icon: Globe, text: "Acquired companies still on their own CDNs" },
  { icon: AlertTriangle, text: "Security posture? Depends which property you ask" },
  { icon: ShoppingCart, text: "Bots are shopping harder than real customers" },
  { icon: AlertTriangle, text: "Teams have never touched Akamai before" },
];

const targetState = [
  { icon: Cloud, text: "Every request flows through Akamai Edge" },
  { icon: Check, text: "One template, one cert process — for all 5,000" },
  { icon: Check, text: "5× traffic? Edge absorbs it, origin yawns" },
  { icon: Check, text: "WAF + Bot Manager + API Security — layered defense" },
  { icon: Check, text: "Teams self-serve via IaC — no CLI bootcamp needed" },
];

const CompanyOverviewSlide = () => {
  return (
    <SlideLayout id="company-overview" pageNumber={2}>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm">Where we are vs. where we're going</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">
            The Before & After
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-destructive/5 border-2 border-destructive/20 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-destructive/15 flex items-center justify-center">
                <AlertTriangle size={22} className="text-destructive" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-secondary">Today</h3>
                <p className="text-xs text-muted-foreground">a.k.a. "the fire we're putting out"</p>
              </div>
            </div>
            <div className="space-y-3">
              {currentState.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={14} className="text-destructive" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary/5 border-2 border-primary/20 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                <Target size={22} className="text-primary" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-secondary">Day 30</h3>
                <p className="text-xs text-muted-foreground">what "done" looks like</p>
              </div>
            </div>
            <div className="space-y-3">
              {targetState.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={14} className="text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <ArrowRight size={32} className="text-primary flow-arrow" />
        </div>

        <div className="bg-secondary rounded-2xl p-6 text-center space-y-2">
          <p className="text-xs font-semibold text-secondary-foreground/60 tracking-widest uppercase">The Mission</p>
          <p className="font-display text-lg md:text-xl font-bold text-secondary-foreground">
            Migrate 5,000 hostnames to Akamai in 30 days — faster, safer, and more resilient than what came before.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[
            { value: "Enterprise", label: "Global E-Commerce" },
            { value: "NA · LATAM · EU", label: "3 Regions" },
            { value: "Multiple", label: "Recent Acquisitions" },
            { value: "On-Prem + AWS", label: "Current Infra" },
          ].map(({ value, label }) => (
            <div key={label} className="bg-card rounded-xl border border-border p-4 text-center">
              <p className="font-display font-bold text-secondary text-sm">{value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
};

export default CompanyOverviewSlide;
