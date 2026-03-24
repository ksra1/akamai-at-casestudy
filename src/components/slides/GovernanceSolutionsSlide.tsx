import SlideLayout from "./SlideLayout";
import { TrendingUp, CheckCircle2 } from "lucide-react";

const governanceChallenges = [
  {
    issue: "New acquisition teams untrained on Akamai—high onboarding risk",
    solution: "Config-as-Code templates + self-service Luna Control Center",
    benefit: "Teams ramp from zero knowledge to production deployment in <1 week; 80% fewer support tickets",
    details: "Step 1: Build reusable Terraform/IaC property templates—baseline caching, compression, origin health checks, monitoring rules bundled for e-commerce use case.\nStep 2: Create property library with pre-built rule bundles—teams select template matching their service (static CDN, API acceleration, WAF baseline) and deploy via Git push.\nStep 3: Provide Luna Control Center self-service views—teams monitor their properties' cache hit %, origin latency, error rates without learning CLI. Dashboards auto-updated daily.\nStep 4: Establish documentation & Slack escalation—teams follow playbooks for common scenarios (cache purge, origin change, ruleset update). Akamai support responds <2h for escalations.\nResult: Non-technical teams deploy independently, zero Akamai CLI training needed, onboarding time reduced 80%, support burden drops 50%.",
    products: [
      { name: "Property Manager API", link: "https://techdocs.akamai.com/property-mgr/reference/api" },
      { name: "Luna Control Center", link: "https://techdocs.akamai.com/luna/docs" },
    ],
  },
  {
    issue: "Cross-team change coordination—no formal approval process",
    solution: "Property Manager API change approval workflow + Event Hub + audit logging",
    benefit: "Formal change control; 100% audit trail of who changed what and when",
    details: "Step 1: Implement change approval workflow—PAPI API calls trigger approval requirement: dev team opens change request with justification, change approval team (compliance/security) reviews within 24h before activation.\nStep 2: Set up Event Hub notifications—activate Slack/email alerts whenever properties are modified, activated, or errors occur. All teams see changes in real-time.\nStep 3: Enable immutable audit logs—Event Hub logs all API calls with requestor identity, timestamp, before/after config diff, approval chain. Logs stored 2+ years for compliance review.\nStep 4: Implement rollback capability—each property activation is tracked with version control. If bad change deployed, previous version restored via API in <5min.\nResult: Formal change governance at scale, audit trails for SOX/compliance, 100% traceability, zero unauthorized changes possible.",
    products: [
      { name: "Property Manager API", link: "https://techdocs.akamai.com/property-mgr/reference/api" },
      { name: "Event Hub", link: "https://techdocs.akamai.com/event-hub/docs" },
    ],
  },
  {
    issue: "Risk escalation & incident communication across geographies",
    solution: "mPulse real-time alerts + centralized incident dashboard + DataStream forensics",
    benefit: "Incidents detected in <1min; root cause analysis in real-time; cross-region impact visibility",
    details: "Step 1: Configure mPulse alerting thresholds—error rate >1%, LCP >3sec, origin response time >500ms trigger auto-alerts to ops team Slack/PagerDuty with geographic breakdown.\nStep 2: Build centralized incident dashboard—mPulse RUM data feeds a shared dashboard showing impact per region: % affected users, error types, affected endpoint, timeline.\nStep 3: Enable DataStream forensics—on incident alert, DataStream captures detailed edge logs (failed requests, blocked traffic, slow origin requests) to data warehouse for investigation.\nStep 4: Escalation chain—alerts auto-escalate: 5min no ack → team lead pinged, 15min → director pinged, 30min → war room initiated. mPulse tracks MTTR (mean time to recovery) per incident.\nResult: Incidents visible to all stakeholders in real-time, root cause data available immediately, recovery coordinated across teams, post-incident analysis enabled.",
    products: [
      { name: "mPulse", link: "https://techdocs.akamai.com/mpulse/docs" },
      { name: "DataStream", link: "https://techdocs.akamai.com/datastream/docs" },
      { name: "Event Hub", link: "https://techdocs.akamai.com/event-hub/docs" },
    ],
  },
  {
    issue: "Managing resources across multiple geographies (Europe, US, Asia)",
    solution: "Managed resource allocation + geographic failover + GTM traffic steering",
    benefit: "Centralizes resource decisions; eliminates regional decision-making delays; auto-failover reduces manual ops",
    details: "Step 1: Map resource pool per geography—define primary/secondary origins per region (EU: Frankfurt + London, US: Virginia + Oregon, APAC: Tokyo + Singapore). Use Property Manager API to codify this in properties.\nStep 2: Configure automatic origin failover—GTM continuously monitors origin health per region. When primary fails, traffic auto-routes to secondary <5sec. No manual intervention needed.\nStep 3: Implement geographic traffic steering—mPulse tracks real latency per region. If EU origin latency exceeds 300ms, GTM auto-reduces traffic allocation to that datacenter and ramps alternative origin.\nStep 4: Monthly capacity planning—DataStream reports show per-region traffic trends, origin utilization %, peak capacity dates. Provisioning decisions made centrally, coordinated across all regions.\nResult: Centralized resource governance, no regional outages due to single origin failure, traffic automatically adapts to regional conditions, capacity planning data-driven.",
    products: [
      { name: "Global Traffic Management", link: "https://techdocs.akamai.com/gtm/docs" },
      { name: "mPulse", link: "https://techdocs.akamai.com/mpulse/docs" },
      { name: "DataStream", link: "https://techdocs.akamai.com/datastream/docs" },
    ],
  },
  {
    issue: "Compliance & audit requirements—SOX/regulatory mandates",
    solution: "Identity & Access Management + immutable audit logging + compliance reporting",
    benefit: "100% role-based access control (RBAC); compliance-ready audit trails; regulatory sign-off automated",
    details: "Step 1: Implement Identity Cloud RBAC—define roles: Viewer (read-only dashboards), Operator (activate properties), Approver (enforce change approvals), Admin (user/group management). Each team member assigned single role.\nStep 2: Enable immutable audit logs via Event Hub—every API call logged: who, what, when, why, before/after state. Logs sent to tamper-proof archive (AWS S3 with versioning disabled).\nStep 3: Create compliance reports—automated monthly reports: user access changes, all property changes, failed login attempts, incident timelines. Reports signed-off by compliance officer.\nStep 4: Set password/MFA policy—Akamai Identity Cloud enforces 12-char passwords, MFA required, session timeout 60min. Okta/Azure AD integrated for SSO.\nResult: FINRA/SOX compliance-ready, zero unauthorized changes possible (RBAC blocks them), audit trails admissible in legal proceedings, regulatory audits pass with zero findings.",
    products: [
      { name: "Identity Cloud", link: "https://techdocs.akamai.com/identity-cloud/docs" },
      { name: "Event Hub", link: "https://techdocs.akamai.com/event-hub/docs" },
    ],
  },
];

// Parse steps from details string
const parseSteps = (details: string) => {
  const stepRegex = /Step \d+:|Result:/g;
  const parts = details.split(stepRegex).filter(p => p.trim());
  return parts.map(part => part.trim());
};

// Beautiful step renderer component
const StepsRenderer = ({ details }: { details: string }) => {
  const steps = parseSteps(details);
  
  return (
    <div className="space-y-2 mt-3">
      {steps.map((step, idx) => {
        const isResult = idx === steps.length - 1;
        return (
          <div key={idx} className={`border-l-4 rounded px-3 py-2.5 ${isResult ? 'border-l-green-500 bg-green-50' : 'border-l-akamai-green bg-green-50'}`}>
            <div className="flex items-start gap-2">
              <div className={`flex-shrink-0 font-bold text-sm w-6 h-6 rounded-full flex items-center justify-center ${isResult ? 'bg-green-500 text-white' : 'bg-akamai-green text-white'}`}>
                {isResult ? '✓' : idx + 1}
              </div>
              <p className="text-xs text-gray-700 leading-relaxed flex-1 pt-0.5">{step}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const GovernanceSolutionsSlide = () => {
  return (
    <SlideLayout id="governance-solutions" pageNumber={7}>
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <p className="text-akamai-green font-semibold tracking-widest uppercase text-sm">Solution Architecture</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary">Governance & Scale Solutions</h2>
          <p className="text-muted-foreground">{governanceChallenges.length} governance challenges solved</p>
        </div>

        {/* Governance Solutions */}
        <div className="space-y-4">
          {governanceChallenges.map((item, idx) => (
            <div key={idx} className="border-l-4 border-l-akamai-green bg-card rounded-lg p-5 shadow-sm">
              <div className="flex items-start gap-3 mb-2">
                <CheckCircle2 size={20} className="text-akamai-green mt-0.5 shrink-0" />
                <div className="flex-grow">
                  <p className="font-semibold text-secondary">{item.issue}</p>
                </div>
              </div>
              <div className="ml-7 space-y-2">
                <p className="text-sm font-semibold text-akamai-green">{item.solution}</p>
                <p className="text-xs text-muted-foreground italic">{item.benefit}</p>
                {item.details && <StepsRenderer details={item.details} />}
                {item.products && item.products.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {item.products.map((product, pidx) => (
                      <a
                        key={pidx}
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-xs font-semibold px-2 py-1 bg-akamai-green/10 text-akamai-green rounded hover:bg-akamai-green/20 transition-colors"
                      >
                        📚 {product.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
};

export default GovernanceSolutionsSlide;
