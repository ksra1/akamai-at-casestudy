import SlideLayout from "./SlideLayout";
import { Truck, Shield, Clock, Users, Zap, Image, AlertTriangle, Bot, CreditCard, ShoppingCart, UserX, Radio, Globe, Layers, GitBranch } from "lucide-react";

const deliveryChallenges = [
  { icon: Clock, text: "5,000 hostnames in 30 days" },
  { icon: Users, text: "New teams untrained on Akamai" },
  { icon: Zap, text: "Handle 5x peak traffic" },
  { icon: Image, text: "Slow image loading" },
  { icon: AlertTriangle, text: "No testing — straight to production" },
];

const securityChallenges = [
  { icon: Shield, text: "DDoS attacks on origin" },
  { icon: AlertTriangle, text: "Legacy WAF rules outdated" },
  { icon: UserX, text: "Credential stuffing surge" },
  { icon: ShoppingCart, text: "Inventory scraping by bots" },
  { icon: CreditCard, text: "Carding on checkout APIs" },
  { icon: Bot, text: "Sophisticated bot evasion" },
];

const scaleGovChallenges = [
  { icon: Globe, text: "Multi-geography resource coordination" },
  { icon: Layers, text: "Legacy monolith → microservices migration" },
  { icon: GitBranch, text: "Acquired companies need platform migration" },
  { icon: Users, text: "Cross-team change management at scale" },
];

const ChallengeSlide = () => {
  return (
    <SlideLayout id="challenge" variant="alt" pageNumber={3}>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm">Understanding the Problem</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">15 Key Challenges</h2>
          <p className="text-muted-foreground text-sm">Across delivery, security, and scale & governance</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Delivery */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Truck size={18} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-secondary">Delivery</h3>
                <p className="text-xs text-muted-foreground">5 challenges</p>
              </div>
            </div>
            <div className="space-y-2">
              {deliveryChallenges.map(({ icon: Icon, text }) => (
                <div key={text} className="visual-card bg-card rounded-xl border border-border p-3 flex items-center gap-3 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-primary" />
                  </div>
                  <p className="text-sm font-medium text-secondary leading-snug">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                <Shield size={18} className="text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-secondary">Security</h3>
                <p className="text-xs text-muted-foreground">6 challenges</p>
              </div>
            </div>
            <div className="space-y-2">
              {securityChallenges.map(({ icon: Icon, text }) => (
                <div key={text} className="visual-card bg-card rounded-xl border border-border p-3 flex items-center gap-3 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-accent" />
                  </div>
                  <p className="text-sm font-medium text-secondary leading-snug">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Scale & Governance */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-lg bg-akamai-green flex items-center justify-center">
                <Globe size={18} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-secondary">Scale & Governance</h3>
                <p className="text-xs text-muted-foreground">4 challenges</p>
              </div>
            </div>
            <div className="space-y-2">
              {scaleGovChallenges.map(({ icon: Icon, text }) => (
                <div key={text} className="visual-card bg-card rounded-xl border border-border p-3 flex items-center gap-3 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-akamai-green/10 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-akamai-green" />
                  </div>
                  <p className="text-sm font-medium text-secondary leading-snug">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key stats ribbon */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { value: "5,000", label: "Hostnames to Onboard" },
            { value: "30", label: "Days Timeline" },
            { value: "5×", label: "Peak Traffic Surge" },
            { value: "3+", label: "Regions (NA, LATAM, EU)" },
          ].map(s => (
            <div key={s.label} className="bg-secondary text-secondary-foreground rounded-xl p-4 text-center">
              <div className="font-display text-3xl font-bold">{s.value}</div>
              <div className="text-secondary-foreground/60 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
};

export default ChallengeSlide;
