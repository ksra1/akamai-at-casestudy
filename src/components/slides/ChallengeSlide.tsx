import SlideLayout from "./SlideLayout";
import { Truck, Shield, Clock, Users, Zap, Image, AlertTriangle, Bot, CreditCard, ShoppingCart, UserX, Globe, Layers, GitBranch, ArrowRight } from "lucide-react";

const deliveryChallenges = [
  { icon: Clock, text: "5,000 hostnames in 30 days" },
  { icon: Users, text: "New teams untrained on Akamai" },
  { icon: Zap, text: "Handle 5x peak traffic" },
  { icon: Image, text: "Slow image loading" },
  { icon: AlertTriangle, text: "No testing — straight to production" },
  { icon: Globe, text: "Multi-geography resource coordination" },
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
  { icon: Layers, text: "Legacy monolith → microservices migration" },
  { icon: GitBranch, text: "Acquired companies need platform migration" },
  { icon: Users, text: "Cross-team change management at scale" },
];

const traceability = [
  { label: "Delivery (6)", section: "Section A", slides: "Slides 5, 8", color: "bg-primary" },
  { label: "Security (6)", section: "Section B", slides: "Slides 4, 6", color: "bg-accent" },
  { label: "Scale & Gov (3)", section: "Sections A + C", slides: "Slides 7, 8, 9", color: "bg-akamai-green" },
];

const ChallengeSlide = () => {
  return (
    <SlideLayout id="challenge" pageNumber={3}>
      <div className="space-y-5">
        <div className="text-center space-y-2">
          <p className="text-primary font-semibold tracking-[0.2em] uppercase text-sm">Understanding the Problem</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">15 Key Challenges</h2>
          <p className="text-foreground/30 text-sm">Across delivery, security, and scale & governance</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Delivery */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center glow-primary">
                <Truck size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">Delivery</h3>
                <p className="text-xs text-foreground/30">6 challenges</p>
              </div>
            </div>
            <div className="space-y-2">
              {deliveryChallenges.map(({ icon: Icon, text }) => (
                <div key={text} className="glass-card visual-card rounded-xl p-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground/80 leading-snug">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-lg bg-accent/15 border border-accent/20 flex items-center justify-center glow-accent">
                <Shield size={18} className="text-accent" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">Security</h3>
                <p className="text-xs text-foreground/30">6 challenges</p>
              </div>
            </div>
            <div className="space-y-2">
              {securityChallenges.map(({ icon: Icon, text }) => (
                <div key={text} className="glass-card visual-card rounded-xl p-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-accent" />
                  </div>
                  <p className="text-sm font-medium text-foreground/80 leading-snug">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Scale & Governance */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-lg bg-akamai-green/15 border border-akamai-green/20 flex items-center justify-center glow-green">
                <Globe size={18} className="text-akamai-green" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">Scale & Governance</h3>
                <p className="text-xs text-foreground/30">3 challenges</p>
              </div>
            </div>
            <div className="space-y-2">
              {scaleGovChallenges.map(({ icon: Icon, text }) => (
                <div key={text} className="glass-card visual-card rounded-xl p-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-akamai-green/10 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-akamai-green" />
                  </div>
                  <p className="text-sm font-medium text-foreground/80 leading-snug">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Traceability strip */}
        <div className="flex gap-3">
          {traceability.map(t => (
            <div key={t.label} className="flex-1 flex items-center gap-2 glass-card rounded-xl px-4 py-3">
              <div className={`w-3 h-3 rounded-full ${t.color} shrink-0`} />
              <div className="flex-1">
                <p className="text-xs font-bold text-foreground/80">{t.label}</p>
                <p className="text-[10px] text-foreground/30">{t.section} · {t.slides}</p>
              </div>
              <ArrowRight size={12} className="text-foreground/20 shrink-0" />
            </div>
          ))}
        </div>

        {/* Key stats ribbon */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { value: "5,000", label: "Hostnames to Onboard" },
            { value: "30", label: "Days Timeline" },
            { value: "5×", label: "Peak Traffic Surge" },
            { value: "3+", label: "Regions (NA, LATAM, EU)" },
          ].map(s => (
            <div key={s.label} className="bg-primary/8 border border-primary/15 rounded-xl p-4 text-center">
              <div className="font-display text-3xl font-bold text-primary">{s.value}</div>
              <div className="text-foreground/30 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
};

export default ChallengeSlide;
