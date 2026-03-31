import { useState } from "react";
import { Zap, ApiIcon, Shield, Lock, CheckCircle2, AlertTriangle } from "lucide-react";

const BotAPIAttacksViewer = () => {
  const [activeTab, setActiveTab] = useState<"interception" | "validation" | "challenge">("interception");

  const interceptionPhases = [
    {
      phase: 1,
      stage: "Request Arrival at Edge",
      where: "EdgeWorkers (Akamai edge location closest to attacker)",
      action: "Intercept every request to /api/checkout/* BEFORE it reaches origin",
      detail: "Request never makes it to origin. Decision made at edge: pass through or challenge.",
      icon: <Zap size={16} className="text-accent" />,
      latency: "&lt;1ms added",
    },
    {
      phase: 2,
      stage: "Bot Manager Risk Score Evaluation",
      where: "EdgeWorkers calls Bot Manager (Akamai's ML engine)",
      action: "Analyze: TLS fingerprint, request pattern, device consistency, geographic anomalies",
      detail: "Bot Manager returns risk score (0-100). 0-30: low risk (pass). 30-70: medium (challenge). 70-100: high (block).",
      icon: <Shield size={16} className="text-akamai-electric" />,
      latency: "5-10ms decision",
    },
    {
      phase: 3,
      stage: "Custom Validation Logic",
      where: "EdgeWorkers custom JavaScript",
      action: 'Validate: expected headers present (X-API-Version, X-Client-ID), signature valid, timestamp within 60s window',
      detail: 'If missing headers or invalid signature: request is forged or replayed. Block at edge.',
      icon: <Lock size={16} className="text-akamai-red" />,
      latency: "2-3ms validation",
    },
    {
      phase: 4,
      stage: "Challenge Injection (if needed)",
      where: "EdgeWorkers injects JavaScript challenge",
      action: "Inject proof-of-work challenge: compute SHA256(input), return result",
      detail: "Real API client: has JS engine (Puppeteer/Selenium), can solve in 500-2000ms. Attacker's simple HTTP loop: can't solve.",
      icon: <Zap size={16} className="text-accent" />,
      latency: "Challenge time: 0-3s",
    },
    {
      phase: 5,
      stage: "Fast-Path for Legitimate Traffic",
      where: "EdgeWorkers routes clean requests",
      action: "Valid request passed all checks? Route directly to origin with priority queuing.",
      detail: "Legitimate API traffic: no delays. Malicious traffic: queued or dropped.",
      icon: <CheckCircle2 size={16} className="text-akamai-green" />,
      latency: "Origin processes normally",
    },
  ];

  const validationRules = [
    {
      rule: "API Schema Validation",
      check: "Request body matches expected API schema",
      example: "Checkout expects: {customer_id, cart_id, payment_token}. If extra fields or missing fields: reject.",
      blocks: "Fuzz attacks, injection attempts",
      detail: "AAP validates request against OpenAPI spec. Malformed requests rejected at edge.",
    },
    {
      rule: "Request Signature Verification",
      check: "Each API call must be signed with HMAC-SHA256",
      example: 'Header: X-Signature: HMAC(secret, request_body). EdgeWorkers verifies signature matches computed HMAC.',
      blocks: "Replay attacks, man-in-the-middle, script kiddie attempts",
      detail: 'If signature invalid or missing: attacker doesn\'t have API secret. Reject immediately.',
    },
    {
      rule: "Timestamp Window Validation",
      check: "Request timestamp must be within 60 seconds of server time",
      example: "Request timestamp: 2024-03-30T15:32:45Z. Server time: 15:32:50Z. Diff: 5s. Accept. Diff: 65s. Reject (replay).",
      blocks: "Replay attacks, timing attacks",
      detail: "Prevents attacker from replaying old authenticated requests.",
    },
    {
      rule: "Request Rate Limiting (per API key)",
      check: "Max 100 requests per minute per API key",
      example: "API key ABC123: 95 requests in past 60s. Next request: accept. 101st request: reject (rate limit exceeded).",
      blocks: "Brute force, enumeration attacks",
      detail: "Legitimate API clients: 50-80 req/min. Bots: 1000+ req/min. Rate limit enforced at edge before origin sees load.",
    },
    {
      rule: "Geographic Anomaly Detection",
      check: "Requests from same API key should come from consistent geography",
      example: "API key XYZ789: always used from Palo Alto office (37.4°N, 122.1°W). Suddenly: request from Russia (53°N, 37°E).",
      blocks: "Stolen API keys, compromised credentials",
      detail: 'If geographic jump > 1000km AND time difference < 2 hours: flag for MFA or block.',
    },
  ];

  const challengeSequence = [
    {
      challenge: "JavaScript Proof-of-Work",
      stage: "First anomaly detected",
      for: "Medium-risk requests (behavioral signal or rate limit warning)",
      mechanism: "EdgeWorkers injects: compute SHA256 of random 10KB buffer. Time required: 1-3s for real API client with proper JS engine.",
      botResponse: "Attacker's simple loop (curl/wget in loop): can't execute JS. Abandons request.",
      friction: "Imperceptible (happens in background)",
    },
    {
      challenge: "Request Signing Requirement",
      stage: "Second anomaly or repeated attempts",
      for: "High-risk requests (replay attempt detected, signature validation failed)",
      mechanism: 'EdgeWorkers enforces: each request must include HMAC-SHA256 signature header. Signature must match request body + secret key.',
      botResponse: "Attacker doesn't have secret key. Can't forge valid signature. Blocked.",
      friction: "Requires API implementation update (legitimate clients already do this)",
    },
    {
      challenge: "MFA/Device Verification",
      stage: "Third anomaly or geographic jump",
      for: "Suspicious patterns (new device, geographic jump, repeated failures)",
      mechanism: "EdgeWorkers redirects to verification: SMS OTP + device fingerprint approval. Must complete within 5 minutes.",
      botResponse: "Attacker can't receive SMS OTP (not cardholder). Attack abandoned.",
      friction: "Once per new device/location (legitimate customer experience: 30 seconds)",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Tab Switcher */}
      <div className="flex gap-2 border-b flex-wrap">
        <button
          onClick={() => setActiveTab("interception")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "interception"
              ? "border-b-2 border-akamai-red text-akamai-red"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Interception Flow
        </button>
        <button
          onClick={() => setActiveTab("validation")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "validation"
              ? "border-b-2 border-akamai-red text-akamai-red"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Validation Rules
        </button>
        <button
          onClick={() => setActiveTab("challenge")}
          className={`px-3 py-2 text-sm font-medium transition ${
            activeTab === "challenge"
              ? "border-b-2 border-akamai-red text-akamai-red"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Challenge Sequence
        </button>
      </div>

      {/* TAB 1: Interception Flow */}
      {activeTab === "interception" && (
        <div className="space-y-3">
          {interceptionPhases.map((phase) => (
            <div key={phase.phase} className="flex gap-3">
              {/* Timeline marker */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-akamai-red/10 border-2 border-akamai-red flex items-center justify-center shrink-0 font-bold text-xs text-akamai-red">
                  {phase.phase}
                </div>
                {phase.phase < 5 && <div className="w-0.5 h-24 bg-akamai-red/20 my-1" />}
              </div>

              {/* Content */}
              <div className="flex-1 pb-3">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-semibold text-sm text-foreground">{phase.stage}</h4>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-accent/20 text-accent whitespace-nowrap">
                    {phase.latency}
                  </span>
                </div>

                <div className="space-y-1 text-xs mb-2">
                  <p className="text-muted-foreground">
                    <strong>Where:</strong> {phase.where}
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Action:</strong> {phase.action}
                  </p>
                </div>

                <div className="bg-muted/40 rounded p-2 border border-border/50">
                  <p className="text-muted-foreground italic">{phase.detail}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-akamai-green/10 border border-akamai-green/30 rounded p-3 text-xs space-y-2">
            <p className="font-semibold text-akamai-green">Result: Zero Origin CPU Impact</p>
            <p className="text-akamai-green/80">
              All decisions made at edge. Malicious API requests never reach origin. Origin sees only clean traffic. No DoS, no resource exhaustion.
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: Validation Rules */}
      {activeTab === "validation" && (
        <div className="space-y-3">
          {validationRules.map((rule, idx) => (
            <div key={idx} className="bg-muted/40 border border-border/50 rounded p-3 text-xs space-y-2">
              <h4 className="font-semibold text-foreground">{rule.rule}</h4>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-muted-foreground mb-1">Check</p>
                  <p className="text-foreground font-semibold text-[11px]">{rule.check}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Blocks</p>
                  <p className="text-destructive font-semibold text-[11px]">{rule.blocks}</p>
                </div>
              </div>

              <div className="bg-background rounded p-2 border border-border/50 space-y-1">
                <p className="text-muted-foreground mb-1">
                  <strong>Example:</strong>
                </p>
                <p className="text-foreground text-[11px] font-mono mb-2">{rule.example}</p>
                <div className="border-t border-border/50 pt-2">
                  <p className="text-muted-foreground italic text-[11px]">{rule.detail}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-destructive/10 border border-destructive/30 rounded p-3 text-xs space-y-2">
            <p className="font-semibold text-destructive">Layered Security Approach</p>
            <p className="text-destructive/80">
              Bot doesn't need to pass all 5 checks. Passing 1 check = 20% success rate. But API attack must pass sequence: schema → signature → timestamp → rate limit → geographic. Cumulative: {`<`}1% success rate.
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: Challenge Sequence */}
      {activeTab === "challenge" && (
        <div className="space-y-3">
          {challengeSequence.map((challenge, idx) => (
            <div key={idx} className="bg-muted/40 border border-border/50 rounded p-3 text-xs space-y-2">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-semibold text-foreground">{challenge.challenge}</h4>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-accent/20 text-accent">
                  Stage {idx + 1}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-muted-foreground mb-1">Triggered By</p>
                  <p className="text-foreground font-semibold text-[11px]">{challenge.stage}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">For</p>
                  <p className="text-foreground text-[11px]">{challenge.for}</p>
                </div>
              </div>

              <div className="bg-background rounded p-2 border border-border/50 space-y-2 mb-2">
                <p className="text-muted-foreground">
                  <strong>Mechanism:</strong> {challenge.mechanism}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-destructive/5 rounded p-2 border border-destructive/20">
                  <p className="text-destructive/70 text-[10px] mb-1">
                    <strong>Bot Response:</strong>
                  </p>
                  <p className="text-destructive/80 font-semibold text-[11px]">{challenge.botResponse}</p>
                </div>
                <div className="bg-akamai-green/5 rounded p-2 border border-akamai-green/20">
                  <p className="text-akamai-green/70 text-[10px] mb-1">
                    <strong>User Friction:</strong>
                  </p>
                  <p className="text-akamai-green/80 font-semibold text-[11px]">{challenge.friction}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-akamai-green/10 border border-akamai-green/30 rounded p-3 text-xs space-y-2">
            <p className="font-semibold text-akamai-green flex items-center gap-2">
              <CheckCircle2 size={14} />
              Bot API Attack Prevention: Complete
            </p>
            <ul className="space-y-1 text-akamai-green/80">
              <li>• Legitimate API clients: pass all checks transparently (no friction)</li>
              <li>• Bot attacks: blocked at 1st check (schema or signature validation failure)</li>
              <li>• Origin resources: fully protected (no bot CPU/bandwidth consumed)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default BotAPIAttacksViewer;
