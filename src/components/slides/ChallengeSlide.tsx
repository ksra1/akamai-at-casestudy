import { useState } from "react";
import SlideLayout from "./SlideLayout";
import { Truck, Shield, TrendingUp, Globe, Clock, Users, AlertTriangle, Server } from "lucide-react";

const stats = [
  { value: "5,000", label: "Hostnames", sub: "to onboard in 30 days" },
  { value: "5x", label: "Traffic Surge", sub: "during peak events" },
  { value: "3+", label: "Regions", sub: "NA, LATAM, Europe, Asia" },
  { value: "30", label: "Days", sub: "aggressive timeline" },
];

const challenges = [
  {
    icon: Truck,
    title: "Delivery",
    color: "bg-primary",
    items: [
      { text: "5,000 hostnames in 30 days — bulk onboarding at scale", site: "New Sites", classification: "Technical" },
      { text: "New teams untrained on Akamai products", site: "New Sites", classification: "Governance" },
      { text: "5x peak traffic handling required", site: "Existing Sites", classification: "Technical" },
      { text: "Slow image loading across sites", site: "Existing Sites", classification: "Technical" },
      { text: "Customer wants to skip testing — push straight to production", site: "New Sites", classification: "Governance" },
    ],
  },
  {
    icon: Shield,
    title: "Security",
    color: "bg-accent",
    items: [
      { text: "DDoS attacks targeting customer origins", site: "Existing Sites", classification: "Technical" },
      { text: "Outdated WAF rule sets on legacy configs", site: "Existing Sites", classification: "Technical" },
      { text: "Credential stuffing surge", site: "Existing Sites", classification: "Technical" },
      { text: "Inventory scraping by competitive bots", site: "Existing Sites", classification: "Technical" },
      { text: "Carding attempts on checkout APIs", site: "Existing Sites", classification: "Technical" },
      { text: "Sophisticated evasion: IP rotation, spoofed clients", site: "Existing Sites", classification: "Technical" },
    ],
  },
  {
    icon: TrendingUp,
    title: "Scale & Governance",
    color: "bg-akamai-green",
    items: [
      { text: "Multi-geography resource coordination", site: "New Sites", classification: "Governance" },
      { text: "Legacy monolith → microservices migration", site: "Existing Sites", classification: "Technical" },
      { text: "Acquired companies need platform migration", site: "Existing Sites", classification: "Governance" },
      { text: "Cross-team change management at scale", site: "Existing Sites", classification: "Governance" },
    ],
  },
];

const ChallengeSlide = () => {
  return (
    <SlideLayout id="challenge" variant="alt" pageNumber={3}>
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm">Understanding the Problem</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">The Challenge at a Glance</h2>
        </div>

        {/* Stats ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-card rounded-xl p-6 text-center shadow-sm border border-border">
              <div className="font-display text-4xl font-bold text-primary">{s.value}</div>
              <div className="font-semibold text-secondary mt-1">{s.label}</div>
              <div className="text-muted-foreground text-sm">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Challenge cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {challenges.map((c, i) => (
            <div
              key={c.title}
              className="callout-badge bg-card rounded-xl p-6 shadow-sm border border-border"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`${c.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                  <c.icon size={20} className="text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-secondary">{c.title}</h3>
              </div>
              <ul className="space-y-3">
                {c.items.map((item) => (
                  <li key={item.text} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                    <AlertTriangle size={14} className="text-accent mt-0.5 shrink-0" />
                    <span className="flex-1">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Context bar */}
        <div className="flex flex-wrap justify-center gap-6 text-muted-foreground text-sm">
          {[
            { icon: Globe, text: "Global Operations" },
            { icon: Server, text: "AWS + On-Prem Hybrid" },
            { icon: Users, text: "Multi-team Coordination" },
            { icon: Clock, text: "Aggressive Timeline" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon size={16} className="text-primary" /> {text}
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
};

export default ChallengeSlide;
