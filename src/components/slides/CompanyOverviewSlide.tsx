import SlideLayout from "./SlideLayout";
import { Globe, TrendingUp, Building2, ArrowRight, Database, Cloud } from "lucide-react";

const CompanyOverviewSlide = () => {
  return (
    <SlideLayout id="company-overview" pageNumber={2}>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-1">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm">The Customer</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">AT Retailers</h2>
          <p className="text-sm text-muted-foreground">Global e-commerce organization undergoing major digital transformation</p>
        </div>

        {/* Geography & Current State - Two columns */}
        <div className="grid grid-cols-2 gap-6">
          {/* Left: Global Presence */}
          <div className="space-y-4">
            <h3 className="font-semibold text-primary flex items-center gap-2">
              <Globe size={20} />
              Global Presence
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-xl">🇺🇸</div>
                <div>
                  <p className="font-semibold text-sm">North America</p>
                  <p className="text-xs text-muted-foreground">Primary market</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-xl">🌎</div>
                <div>
                  <p className="font-semibold text-sm">LATAM</p>
                  <p className="text-xs text-muted-foreground">Growing market</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-xl">🇪🇺</div>
                <div>
                  <p className="font-semibold text-sm">Europe</p>
                  <p className="text-xs text-muted-foreground">High traffic volume</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Current Infrastructure */}
          <div className="space-y-4">
            <h3 className="font-semibold text-primary flex items-center gap-2">
              <Building2 size={20} />
              Current State
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                <Database size={20} className="text-red-600" />
                <div>
                  <p className="font-semibold text-sm text-red-700">Legacy Monolith</p>
                  <p className="text-xs text-red-600">Single deployment unit</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <Cloud size={20} className="text-blue-600" />
                <div>
                  <p className="font-semibold text-sm text-blue-700">Multi-Cloud</p>
                  <p className="text-xs text-blue-600">On-prem + AWS</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                <TrendingUp size={20} className="text-orange-600" />
                <div>
                  <p className="font-semibold text-sm text-orange-700">High Traffic</p>
                  <p className="text-xs text-orange-600">Peak event scaling challenges</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transformation Journey */}
        <div className="bg-gradient-to-r from-primary/10 to-transparent rounded-lg p-6 space-y-4">
          <h3 className="font-semibold text-primary text-center">Transformation Path</h3>
          <div className="flex items-center justify-between">
            {/* Monolith */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-red-100 border-2 border-red-300 rounded-lg flex items-center justify-center mb-2">
                <Database size={32} className="text-red-600" />
              </div>
              <p className="text-xs font-semibold text-center">Legacy<br/>Monolith</p>
            </div>

            {/* Arrow */}
            <ArrowRight size={24} className="text-primary" />

            {/* Modern */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                <div className="flex flex-wrap gap-1 w-12 h-12 items-center justify-center">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  ))}
                </div>
              </div>
              <p className="text-xs font-semibold text-center">Microservices<br/>& APIs</p>
            </div>

            {/* Arrow */}
            <ArrowRight size={24} className="text-primary" />

            {/* Akamai */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-primary/20 border-2 border-primary rounded-lg flex items-center justify-center mb-2 font-bold text-2xl">
                A
              </div>
              <p className="text-xs font-semibold text-center">Akamai<br/>Platform</p>
            </div>
          </div>
        </div>

        {/* Recent Acquisitions */}
        <div className="bg-accent/10 rounded-lg p-4 border-l-4 border-l-accent">
          <h3 className="font-semibold text-accent mb-3 flex items-center gap-2">
            <TrendingUp size={20} />
            Recent Acquisitions & Migration
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Multiple acquired companies need to migrate from existing cloud providers to Akamai. <span className="font-semibold text-accent">5,000+ hostnames in 30 days</span> requires coordinated onboarding, infrastructure consolidation, and consistent security posture across all properties.
          </p>
        </div>
      </div>
    </SlideLayout>
  );
};

export default CompanyOverviewSlide;
