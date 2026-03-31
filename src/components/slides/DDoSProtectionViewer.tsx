import { AlertTriangle, Eye, Shield, CheckCircle2, Clock, TrendingDown } from "lucide-react";

const DDoSProtectionViewer = () => {
  const attackDefenses = [
    {
      attackType: "Volumetric Attacks (someone floods websites with massive traffic)",
      defense: "Prolexic stops it at global centers",
      detail: "When attackers send huge amounts of traffic to overwhelm a website, Prolexic absorbs it at 24 locations around the world before it reaches the origin server.",
      icon: <Eye size={20} className="text-primary" />,
      coverage: "Defense: Stops traffic floods globally",
    },
    {
      attackType: "Protocol Attacks (bad packets sent to confuse the server)",
      defense: "Prolexic validates packets and drops the bad ones",
      detail: "Attackers send malformed or trick packets to crash the origin server. Prolexic checks each packet's validity and blocks anything suspicious.",
      icon: <AlertTriangle size={20} className="text-accent" />,
      coverage: "Defense: Validates every packet",
    },
    {
      attackType: "App-Layer Attacks (HTTP floods, like DDoS at the application level)",
      defense: "Rate limiting stops attackers from making too many requests",
      detail: "Attackers pretend to be real users but make thousands of requests per second. Rate limiting says: you can only make 100 requests per second from any single IP.",
      icon: <Shield size={20} className="text-akamai-red" />,
      coverage: "Defense: Limits requests per user",
    },
    {
      attackType: "Direct-to-Origin Attacks (attacker finds the website's real IP)",
      defense: "Site Shield hides the real IP behind Akamai",
      detail: "Instead of letting people connect to the origin server directly, all traffic goes through Akamai's network. The actual IP stays hidden and attackers can't target it directly.",
      icon: <Shield size={20} className="text-akamai-green" />,
      coverage: "Defense: Real IP stays hidden",
    },
  ];

  const capabilities = [
    {
      category: "Stops Massive Traffic Floods",
      value: "Up to 10+ Terabits/second",
      detail: "No matter how much traffic attackers send, Prolexic absorbs it globally before it reaches the origin server.",
    },
    {
      category: "Validates Packets",
      value: "Instantly blocks bad packets",
      detail: "Attacks that try to confuse the origin server with malformed packets are caught and blocked before reaching it.",
    },
    {
      category: "Stops User-Like Attacks",
      value: "Request rate limiting per user",
      detail: "Even if attackers act like real users making requests, rate limiting stops them from overwhelming the website.",
    },
    {
      category: "Hides the Real IP",
      value: "Site Shield masks the origin",
      detail: "The actual server IP stays hidden. All traffic comes through Akamai, so attackers can never target the origin server directly.",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Attack Defense Grid */}
      <div className="space-y-3">
        {attackDefenses.map((defense, idx) => (
          <div key={idx} className="flex gap-4">
            {/* Icon column */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-akamai-red/10 border-2 border-akamai-red flex items-center justify-center shrink-0">
                {defense.icon}
              </div>
              {idx < attackDefenses.length - 1 && <div className="w-0.5 h-12 bg-akamai-red/20 my-1" />}
            </div>

            {/* Defense content */}
            <div className="flex-1 pt-1 pb-3">
              <h4 className="font-semibold text-sm text-foreground mb-1">{defense.attackType}</h4>
              <p className="text-sm font-medium text-akamai-red mb-2">{defense.defense}</p>
              <div className="bg-muted/40 rounded p-2 text-sm text-foreground border border-border/50 mb-2">
                {defense.detail}
              </div>
              <div className="text-sm font-semibold text-akamai-red">{defense.coverage}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Capabilities Grid */}
      <div className="bg-akamai-red/10 border border-akamai-red/30 rounded p-3 text-sm space-y-3">
        <p className="font-semibold text-akamai-red">DDoS Protection Capabilities</p>
        <div className="space-y-2">
          {capabilities.map((cap, idx) => (
            <div key={idx} className="bg-background rounded p-2 border border-border/50">
              <p className="font-semibold text-foreground mb-1">{cap.category}</p>
              <p className="text-foreground font-mono text-[12px] mb-1">{cap.value}</p>
              <p className="text-muted-foreground text-[11px]">{cap.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-destructive/10 border border-destructive/30 rounded p-3 text-sm space-y-2">
        <p className="font-semibold text-destructive">Critical Implementation</p>
        <ul className="space-y-1 text-destructive/80">
          <li>• <strong>Enable Site Shield immediately:</strong> This prevents origin from being found by attackers during DDoS.</li>
          <li>• <strong>Configure drop thresholds:</strong> Define what traffic volume triggers Prolexic engagement (start conservative: 100% scrubbing).</li>
          <li>• <strong>Test failover:</strong> Verify that secondary origin is protected under Prolexic + Site Shield as well.</li>
        </ul>
      </div>
    </div>
  );
};

export default DDoSProtectionViewer;
