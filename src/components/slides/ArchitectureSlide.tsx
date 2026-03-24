import SlideLayout from "./SlideLayout";
import { ArrowRight, Cloud, Shield, Server, Users, Zap, Globe, Bot, Lock, Image, BarChart3 } from "lucide-react";

const ArchitectureSlide = () => {
  return (
    <SlideLayout id="architecture" pageNumber={4}>
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm">Solution Design</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">High-Level Architecture</h2>
          <p className="text-sm text-muted-foreground">How Akamai sits between users and AT Retailers' origins</p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
          <div className="flex items-stretch gap-4">
            <div className="flex-1 space-y-3">
              <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase text-center mb-3">Origins</p>
              {[
                { icon: Server, label: "On-Prem DC", sub: "Legacy monolith" },
                { icon: Cloud, label: "AWS", sub: "Microservices" },
                { icon: Server, label: "Acquisitions", sub: "5,000 hostnames" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="bg-destructive/5 border border-destructive/15 rounded-lg p-3 flex items-center gap-3">
                  <Icon size={20} className="text-destructive shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-secondary">{label}</p>
                    <p className="text-xs text-muted-foreground">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center justify-center gap-1 px-2">
              <ArrowRight size={24} className="text-primary flow-arrow" />
            </div>

            <div className="flex-[2] bg-primary/5 border-2 border-primary/20 rounded-2xl p-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold tracking-wider">
                AKAMAI EDGE PLATFORM
              </div>
              <div className="space-y-4 mt-3">
                <div>
                  <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-2">Delivery</p>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { icon: Zap, label: "Ion" },
                      { icon: Image, label: "IVM" },
                      { icon: Globe, label: "GTM" },
                      { icon: BarChart3, label: "mPulse" },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label} className="bg-card rounded-lg p-2.5 text-center border border-primary/10">
                        <Icon size={18} className="text-primary mx-auto mb-1" />
                        <p className="text-xs font-semibold text-secondary">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-accent tracking-wider uppercase mb-2">Security</p>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { icon: Shield, label: "Prolexic" },
                      { icon: Shield, label: "AAP" },
                      { icon: Bot, label: "Bot Mgr" },
                      { icon: Lock, label: "API Sec" },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label} className="bg-card rounded-lg p-2.5 text-center border border-accent/10">
                        <Icon size={18} className="text-accent mx-auto mb-1" />
                        <p className="text-xs font-semibold text-secondary">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-1 px-2">
              <ArrowRight size={24} className="text-primary flow-arrow" />
            </div>

            <div className="flex-1 space-y-3">
              <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase text-center mb-3">End Users</p>
              {[
                { icon: Users, label: "North America", sub: "Primary market" },
                { icon: Users, label: "LATAM", sub: "Growing market" },
                { icon: Users, label: "Europe", sub: "High traffic" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="bg-akamai-green/5 border border-akamai-green/15 rounded-lg p-3 flex items-center gap-3">
                  <Icon size={20} className="text-akamai-green shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-secondary">{label}</p>
                    <p className="text-xs text-muted-foreground">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { color: "bg-primary/10 text-primary", label: "All traffic flows through Akamai Edge before reaching origin" },
            { color: "bg-accent/10 text-accent", label: "Security enforced at edge — origin never sees attack traffic" },
            { color: "bg-akamai-green/10 text-akamai-green", label: "Same platform for delivery, security, and observability" },
          ].map(item => (
            <div key={item.label} className={`${item.color} rounded-xl p-4 text-center text-sm font-semibold`}>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
};

export default ArchitectureSlide;
