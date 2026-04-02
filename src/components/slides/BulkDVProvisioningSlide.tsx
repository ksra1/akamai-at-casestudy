import SlideLayout from "./SlideLayout";
import { Shield, Server, Globe, Lock, CheckCircle, ArrowRight, Terminal, Key, FileCheck } from "lucide-react";

const PhaseArrow = () => (
  <div className="flex items-center justify-center text-accent">
    <ArrowRight size={20} strokeWidth={3} />
  </div>
);

const PhaseBox = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-[hsl(var(--akamai-navy))] border border-white/10 rounded-lg px-3 py-2 text-center text-xs leading-snug ${className}`}>
    {children}
  </div>
);

const BulkDVProvisioningSlide = () => {
  return (
    <SlideLayout id="bulk-dv" variant="dark" pageNumber={13}>
      <div className="space-y-5">
        {/* Title */}
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-1">Appendix</p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Akamai Bulk DV Provisioning
          </h2>
          <p className="text-sm text-white/50 mt-1">
            Automated SSL/TLS certificate lifecycle for 5,000 hostnames
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Phase 1 */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-accent text-accent-foreground font-bold text-sm w-7 h-7 rounded-md flex items-center justify-center">1</span>
              <h3 className="font-bold text-base">Establish Back-End Trust</h3>
            </div>
            <p className="text-[11px] text-white/40 italic">One-time setup</p>
            {/* Linear 4-step flow */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <PhaseBox>
                <Terminal size={16} className="mx-auto mb-1 text-accent" />
                <div className="font-semibold">AT Retailers PKI</div>
                <div className="text-white/50 text-[10px]">generates 1 Root CA</div>
              </PhaseBox>
              <PhaseArrow />
              <PhaseBox>
                <Key size={16} className="mx-auto mb-1 text-cyan-400" />
                <div className="font-semibold">Signs Leaf Certs</div>
                <div className="text-white/50 text-[10px]">one per origin server</div>
              </PhaseBox>
              <PhaseArrow />
              <PhaseBox>
                <Server size={16} className="mx-auto mb-1 text-green-400" />
                <div className="font-semibold">Leaf → Origins</div>
                <div className="text-white/50 text-[10px]">installed on 500+<br/>servers (stay here)</div>
              </PhaseBox>
              <PhaseArrow />
              <PhaseBox>
                <Shield size={16} className="mx-auto mb-1 text-primary" />
                <div className="font-semibold">Root CA → CPS</div>
                <div className="text-white/50 text-[10px]">uploaded to Akamai<br/>Trust Set</div>
              </PhaseBox>
            </div>
            <div className="text-[10px] text-white/30 mt-1 italic text-center">
              Edge validates origin leaf certs against the uploaded Root CA
            </div>
          </div>

          {/* Phase 2 */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-accent text-accent-foreground font-bold text-sm w-7 h-7 rounded-md flex items-center justify-center">2</span>
              <h3 className="font-bold text-base">Bulk SAN Enrollment</h3>
            </div>
            <p className="text-[11px] text-white/40 italic">Automated via CPS API</p>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <PhaseBox>
                <Terminal size={16} className="mx-auto mb-1 text-accent" />
                <div className="font-semibold">CPS API</div>
                <div className="text-white/50 text-[10px]">creates SAN cert<br/>enrollment (100 hosts/cert)</div>
              </PhaseBox>
              <PhaseArrow />
              <PhaseBox>
                <Globe size={16} className="mx-auto mb-1 text-cyan-400" />
                <div className="font-semibold">Public CA</div>
                <div className="text-white/50 text-[10px]">Let's Encrypt generates<br/>validation tokens</div>
              </PhaseBox>
              <PhaseArrow />
              <PhaseBox>
                <Server size={16} className="mx-auto mb-1 text-primary" />
                <div className="font-semibold">NetStorage</div>
                <div className="text-white/50 text-[10px]">tokens uploaded to<br/>single central folder</div>
              </PhaseBox>
            </div>
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-2 mt-1">
              <p className="text-xs text-center font-semibold">
                5,000 hostnames ÷ 100 SANs = <span className="text-accent text-sm font-bold">50 certificates</span>
              </p>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-accent text-accent-foreground font-bold text-sm w-7 h-7 rounded-md flex items-center justify-center">3</span>
              <h3 className="font-bold text-base">Automated DV Validation</h3>
            </div>
            <p className="text-[11px] text-white/40 italic">HTTP-01 challenge — zero manual steps</p>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <PhaseBox>
                <Globe size={16} className="mx-auto mb-1 text-cyan-400" />
                <div className="font-semibold">Let's Encrypt</div>
                <div className="text-white/50 text-[10px]">hits token URL<br/>on edge</div>
              </PhaseBox>
              <PhaseArrow />
              <PhaseBox>
                <FileCheck size={16} className="mx-auto mb-1 text-green-400" />
                <div className="font-semibold">Edge serves token</div>
                <div className="text-white/50 text-[10px]">from NetStorage<br/>→ 200 OK</div>
              </PhaseBox>
              <PhaseArrow />
              <PhaseBox>
                <CheckCircle size={16} className="mx-auto mb-1 text-green-400" />
                <div className="font-semibold">DV SAN Cert issued</div>
                <div className="text-white/50 text-[10px]">deployed to edge<br/>network globally</div>
              </PhaseBox>
            </div>
          </div>

          {/* Phase 4 */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-accent text-accent-foreground font-bold text-sm w-7 h-7 rounded-md flex items-center justify-center">4</span>
              <h3 className="font-bold text-base">End-to-End Secure Request</h3>
            </div>
            <p className="text-[11px] text-white/40 italic">Full trust chain in action</p>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <PhaseBox>
                <Globe size={16} className="mx-auto mb-1 text-white/70" />
                <div className="font-semibold">User</div>
                <div className="text-white/50 text-[10px]">visits domain</div>
              </PhaseBox>
              <PhaseArrow />
              <PhaseBox className="ring-1 ring-green-500/40">
                <Lock size={16} className="mx-auto mb-1 text-green-400" />
                <div className="font-semibold">Browser</div>
                <div className="text-green-400/80 text-[10px]">✓ trusts DV SAN cert<br/>(issued by Let's Encrypt)</div>
              </PhaseBox>
              <PhaseArrow />
              <PhaseBox className="ring-1 ring-green-500/40">
                <Shield size={16} className="mx-auto mb-1 text-green-400" />
                <div className="font-semibold">Akamai Edge</div>
                <div className="text-green-400/80 text-[10px]">✓ validates origin leaf<br/>cert against Root CA</div>
              </PhaseBox>
              <PhaseArrow />
              <PhaseBox>
                <Server size={16} className="mx-auto mb-1 text-accent" />
                <div className="font-semibold">Content served</div>
                <div className="text-white/50 text-[10px]">secure end-to-end</div>
              </PhaseBox>
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};

export default BulkDVProvisioningSlide;
