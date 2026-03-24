import SlideLayout from "./SlideLayout";
import { Truck, Shield, Clock, Users, Zap, Image, AlertTriangle, Bot, CreditCard, ShoppingCart, UserX, Globe, Layers, GitBranch, ArrowRight } from "lucide-react";

const deliveryChallenges = [
  { icon: Clock, text: "5,000 hostnames in 30 days" },
  { icon: Users, text: "Teams who've never seen Akamai" },
  { icon: Zap, text: "5× traffic spikes — origins sweating" },
  { icon: Image, text: "Images loading like it's 2005" },
  { icon: AlertTriangle, text: '"Just push it to prod" mentality' },
  { icon: Globe, text: "3 regions, 3 time zones, 1 deadline" },
];

const securityChallenges = [
  { icon: Shield, text: "DDoS hammering the origin" },
  { icon: AlertTriangle, text: "WAF rules from the Obama era" },
  { icon: UserX, text: "Credential stuffing on steroids" },
  { icon: ShoppingCart, text: "Bots scraping inventory 24/7" },
  { icon: CreditCard, text: "Carding attacks on checkout" },
  { icon: Bot, text: "Bots that rotate IPs & spoof everything" },
];

const scaleGovChallenges = [
  { icon: Layers, text: "Monolith → microservices mid-flight" },
  { icon: GitBranch, text: "Acquired companies need to come along" },
  { icon: Users, text: "Change management across a dozen teams" },
];

const traceability = [
  { label: "Delivery (6)", section: "Section A", slides: "Slides 5 & 8", color: "bg-primary" },
  { label: "Security (6)", section: "Section B", slides: "Slides 4 & 6", color: "bg-accent" },
  { label: "Scale & Gov (3)", section: "Sections A + C", slides: "Slides 7, 8 & 9", color: "bg-akamai-green" },
];

const ChallengeSlide = () => {
  return (
    <SlideLayout id="challenge" variant="alt" pageNumber={3}>
      <div className="space-y-5">
        <div className="text-center space-y-2">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm">Here's what keeps the team up at night</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">15 Problems. One Plan.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Truck size={18} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-secondary">Delivery</h3>
                <p className="text-xs text-muted-foreground">6 things that need to ship</p>
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

          <div className="space-y-3">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                <Shield size={18} className="text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-secondary">Security</h3>
                <p className="text-xs text-muted-foreground">6 things trying to break in</p>
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

          <div className="space-y-3">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-lg bg-akamai-green flex items-center justify-center">
                <Globe size={18} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-secondary">Scale & Governance</h3>
                <p className="text-xs text-muted-foreground">3 things that need structure</p>
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

        {/* Traceability strip */}
        <div className="flex gap-3">
          {traceability.map(t => (
            <div key={t.label} className="flex-1 flex items-center gap-2 bg-card rounded-xl border border-border px-4 py-3">
              <div className={`w-3 h-3 rounded-full ${t.color} shrink-0`} />
              <div className="flex-1">
                <p className="text-xs font-bold text-secondary">{t.label}</p>
                <p className="text-[10px] text-muted-foreground">{t.section} · {t.slides}</p>
              </div>
              <ArrowRight size={12} className="text-muted-foreground shrink-0" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[
            { value: "5,000", label: "Hostnames" },
            { value: "30", label: "Days" },
            { value: "5×", label: "Peak Traffic" },
            { value: "3+", label: "Regions" },
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
