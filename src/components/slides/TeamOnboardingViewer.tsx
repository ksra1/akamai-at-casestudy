import { Users, Shield, BookOpen, GraduationCap, Video, Headphones, Settings, UserCheck } from "lucide-react";

const TeamOnboardingViewer = () => {
  return (
    <div className="space-y-4">
      {/* Problem & Solution */}
      <div className="bg-primary/10 border border-primary/30 rounded p-3 text-sm">
        <p className="text-foreground">
          <strong>The Problem:</strong> New teams are unfamiliar with Akamai and need training, but we only have 30 days.
        </p>
        <p className="text-foreground mt-2">
          <strong>The Solution:</strong> Structured training + Akamai University self-paced learning + post-cutover support. Most day-to-day operations are automated, so teams need conceptual understanding — not deep CLI expertise.
        </p>
      </div>

      {/* Training Approach */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Training Approach</p>

        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center shrink-0">
              <Video size={20} className="text-primary" />
            </div>
            <div className="w-0.5 h-12 bg-primary/20 my-1" />
          </div>
          <div className="flex-1 pt-1 pb-3">
            <h4 className="font-semibold text-sm text-foreground mb-1">1. Instructor-Led Training Sessions (Recorded)</h4>
            <p className="text-sm text-muted-foreground mb-2">Conduct 2–3 focused training sessions covering Akamai fundamentals, property management, and security configuration. All sessions are recorded so teams can revisit anytime.</p>
            <div className="bg-muted/40 rounded p-2 text-sm text-foreground border border-border/50">
              Session 1: Akamai Platform Overview & Property Manager | Session 2: Security (WAF, Bot Manager, Site Shield) | Session 3: Monitoring (mPulse, DataStream, Alerts)
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center shrink-0">
              <GraduationCap size={20} className="text-primary" />
            </div>
            <div className="w-0.5 h-12 bg-primary/20 my-1" />
          </div>
          <div className="flex-1 pt-1 pb-3">
            <h4 className="font-semibold text-sm text-foreground mb-1">2. Akamai University — Self-Paced Training</h4>
            <p className="text-sm text-muted-foreground mb-2">All team members get access to Akamai University for structured, self-paced learning paths with certifications. Teams learn at their own pace alongside project work.</p>
            <div className="bg-muted/40 rounded p-2 text-sm text-foreground border border-border/50">
              Pre-built learning paths for: Delivery Optimization, Web Security, Bot Management, API Security | Certification tracks available for advanced users
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center shrink-0">
              <Headphones size={20} className="text-primary" />
            </div>
            <div className="w-0.5 h-12 bg-primary/20 my-1" />
          </div>
          <div className="flex-1 pt-1 pb-3">
            <h4 className="font-semibold text-sm text-foreground mb-1">3. Post-Cutover Learning & Support</h4>
            <p className="text-sm text-muted-foreground mb-2">Training doesn't stop at go-live. Ongoing support is available because most operations are automated — teams can learn incrementally.</p>
            <div className="bg-muted/40 rounded p-2 text-sm text-foreground border border-border/50">
              <p className="font-semibold text-xs text-primary mb-1">Why post-cutover training works:</p>
              Day-to-day operations are automated via Template-Based Config, Git-Driven Deployment, Automatic Rollback on Failure, and Self-Service Monitoring. Teams don't need deep expertise on day 1 — they grow into it.
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center shrink-0">
              <UserCheck size={20} className="text-primary" />
            </div>
          </div>
          <div className="flex-1 pt-1 pb-3">
            <h4 className="font-semibold text-sm text-foreground mb-1">4. Self-Service Onboarding & Role-Based Access</h4>
            <p className="text-sm text-muted-foreground mb-2">Teams onboard via SSO with role-based permissions inherited from Okta/AD. No CLI gatekeeping — immediate access to dashboards and safe configuration boundaries.</p>
            <div className="bg-muted/40 rounded p-2 text-sm text-foreground border border-border/50">
              Developer: modify cache config but not WAF rules | Security: set WAF patterns, can't deploy infra | Ops: monitor dashboards and alerts | Misconfigurations blocked at the permission level
            </div>
          </div>
        </div>
      </div>

      {/* Key Takeaway */}
      <div className="bg-akamai-green/10 border border-akamai-green/30 rounded p-3 text-sm space-y-2">
        <p className="font-semibold text-akamai-green flex items-center gap-2">
          <BookOpen size={14} />
          Key Takeaway
        </p>
        <p className="text-akamai-green/80">
          Teams don't need to become Akamai experts before go-live. Recorded sessions + Akamai University provide the foundation. Automation handles the complexity. Post-cutover support fills any gaps as teams gain real-world experience.
        </p>
      </div>
    </div>
  );
};

export default TeamOnboardingViewer;
