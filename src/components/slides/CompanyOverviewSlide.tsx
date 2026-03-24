import SlideLayout from "./SlideLayout";
import { Globe, Database, Cloud, ArrowRight, Building2, ShoppingCart, Users, Server } from "lucide-react";

const CompanyOverviewSlide = () => {
  return (
    <SlideLayout id="company-overview" pageNumber={2}>
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm">The Customer</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">AT Retailers</h2>
        </div>

        {/* Visual infographic row */}
        <div className="grid grid-cols-4 gap-6">
          {[
            { icon: ShoppingCart, label: "Global E-Commerce", value: "Enterprise" },
            { icon: Globe, label: "Regions", value: "NA · LATAM · EU" },
            { icon: Users, label: "Recent Activity", value: "Multiple Acquisitions" },
            { icon: Server, label: "Infrastructure", value: "On-Prem + AWS" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Icon size={28} className="text-primary" />
              </div>
              <p className="font-display font-bold text-secondary text-sm">{value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Transformation journey — visual diagram */}
        <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
          <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase mb-6 text-center">Digital Transformation Journey</p>
          <div className="flex items-center justify-center gap-4">
            {/* Current State */}
            <div className="flex-1 max-w-[200px]">
              <div className="bg-destructive/8 border-2 border-destructive/20 rounded-xl p-5 text-center">
                <Database size={32} className="text-destructive mx-auto mb-2" />
                <p className="font-display font-bold text-secondary text-sm">Legacy Monolith</p>
                <p className="text-xs text-muted-foreground mt-1">Single deployment unit</p>
              </div>
            </div>

            <ArrowRight size={28} className="text-primary shrink-0 flow-arrow" />

            {/* Transition */}
            <div className="flex-1 max-w-[200px]">
              <div className="bg-accent/8 border-2 border-accent/20 rounded-xl p-5 text-center">
                <div className="flex gap-1.5 justify-center mb-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-4 h-4 bg-accent/60 rounded" />
                  ))}
                </div>
                <p className="font-display font-bold text-secondary text-sm">Microservices</p>
                <p className="text-xs text-muted-foreground mt-1">API-driven architecture</p>
              </div>
            </div>

            <ArrowRight size={28} className="text-primary shrink-0 flow-arrow" />

            {/* Target */}
            <div className="flex-1 max-w-[200px]">
              <div className="bg-primary/8 border-2 border-primary/30 rounded-xl p-5 text-center">
                <Cloud size={32} className="text-primary mx-auto mb-2" />
                <p className="font-display font-bold text-secondary text-sm">Akamai Platform</p>
                <p className="text-xs text-muted-foreground mt-1">Delivery + Security + Scale</p>
              </div>
            </div>
          </div>
        </div>

        {/* Two key contexts */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <Building2 size={24} className="text-accent" />
              </div>
              <div>
                <h3 className="font-display font-bold text-secondary">Multiple Acquisitions</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Acquired companies need migration from existing cloud providers to Akamai — 
                  <span className="font-semibold text-accent"> 5,000 hostnames in 30 days</span>
                </p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
                <ShoppingCart size={24} className="text-destructive" />
              </div>
              <div>
                <h3 className="font-display font-bold text-secondary">Active Security Threats</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Existing sites under attack — credential stuffing, scraping, carding, DDoS attempts targeting origins
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};

export default CompanyOverviewSlide;
