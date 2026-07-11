import { useState, useEffect } from "react";
import { ArrowRight, Terminal, Shield, Network, Zap, Cpu, Play, Pause, Tv, Image as ImageIcon } from "lucide-react";

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mediaTab, setMediaTab] = useState<"image" | "video">("image");
  const [feedLogs, setFeedLogs] = useState<string[]>([
    "SECURE HANDSHAKE SUCCESSFUL",
    "NODE LISTENING ON PORT 3000",
    "AEO ENGINE: COMPILING ENTRIES"
  ]);

  useEffect(() => {
    // Generate simulated security logs for immersion
    const interval = setInterval(() => {
      const msgs = [
        `SCANNING REPUTATION BLUEPRINTS [OK]`,
        `COMPILING SEO ENTRIES FOR GOOGLE 2026`,
        `CYBER SHIELD ACTIVE ON DUBAI EXPANSION`,
        `AEO QUERY ROUTE SECURED`,
        `MEDIA SENTIMENT ANALYSIS UPDATED`
      ];
      setFeedLogs((prev) => {
        const next = [...prev, msgs[Math.floor(Math.random() * msgs.length)]];
        if (next.length > 5) next.shift();
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse coordinate multipliers from the screen center (-0.5 to 0.5)
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const tiltStyle = {
    transform: `perspective(1000px) rotateX(${mousePos.y * 30}deg) rotateY(${mousePos.x * -30}deg)`,
    transition: "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)",
    transformStyle: "preserve-3d" as const
  };

  const ambientX = mousePos.x * -60;
  const ambientY = mousePos.y * -60;

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-ids-black grid-pattern">
      
      {/* Dynamic Dual-Skyline background image (Change 5) */}
      <div className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none mix-blend-luminosity">
        <img
          src="/assets/images/ca_dxb_skyline_1780950361788.png"
          alt="California and Dubai Dual Skylines Panoramic Background"
          className="w-full h-full object-cover object-center"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ids-black via-transparent to-ids-black" />
      </div>
      
      {/* 3D Radiant Core Ambient Lights (Parallax depth layers mapped to mousePos) */}
      <div
        style={{
          transform: `translate(${ambientX}px, ${ambientY}px)`,
          transition: "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)"
        }}
        className="absolute top-1/4 left-1/4 w-[35rem] h-[35rem] rounded-full bg-ids-purple/10 blur-[120px] pointer-events-none"
      />
      <div
        style={{
          transform: `translate(${ambientX * -1}px, ${ambientY * -1}px)`,
          transition: "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)"
        }}
        className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] rounded-full bg-ids-violet/10 blur-[130px] pointer-events-none"
      />

      {/* Futuristic Grid and Lines background overlay */}
      <div className="absolute inset-0 bg-transparent flex items-center justify-center pointer-events-none z-0">
        <div className="w-full h-full max-w-7xl mx-auto px-4 relative opacity-40">
          <div className="absolute top-[10%] left-[-5%] w-0.5 h-64 bg-gradient-to-b from-transparent via-ids-purple/50 to-transparent" />
          <div className="absolute bottom-[10%] right-[-5%] w-0.5 h-64 bg-gradient-to-b from-transparent via-ids-violet/50 to-transparent" />
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content Block */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-ids-purple/15 to-ids-violet/15 border border-ids-purple/30 text-ids-magenta font-mono text-[12px] font-semibold uppercase tracking-wider animate-[pulse_3s_infinite]">
              <Zap className="w-3.5 h-3.5" />
              <span>One Partner. Total Digital Dominance.</span>
            </div>

            {/* Headline title banner */}
            <h1 className="font-display font-black text-4xl sm:text-6xl md:text-[54px] xl:text-[62px] xl:leading-[1.1] text-white tracking-tight">
              One Team. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ids-magenta via-ids-purple to-ids-violet font-black">
                Total Digital Growth
              </span>, <br />
              Built, Secured and Taken Global.
            </h1>

            {/* Subheadline description information list */}
            <p id="hero-subheadline" className="font-sans text-[15px] sm:text-[16px] text-slate-300 leading-relaxed max-w-2xl">
              One team that builds your brand, grows your audience and secures everything across the US and UAE. No more juggling vendors. No more gaps. Just total digital growth, fully protected.
            </p>

            {/* Action buttons trigger anchors */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-4">
              <a
                href="https://calendly.com/impulsedigitalsolutions"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto relative group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-ids-purple to-ids-violet hover:from-ids-magenta hover:to-ids-purple font-bold text-white shadow-[0_5px_20px_rgba(123,47,190,0.35)] hover:shadow-[0_5px_30px_rgba(192,38,211,0.5)] transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap"
              >
                <span>Book a Free Strategy Call</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/60 font-semibold transition-all duration-300 hover:text-white"
              >
                <span>Explore Our Services</span>
              </a>
            </div>

            {/* Dual operation context indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-905/70 border border-slate-700/60 text-[11px] font-mono text-slate-400 mt-4 select-none">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Active operations: California, USA & Dubai, UAE</span>
            </div>
          </div>

          {/* Graphic section featuring mouse tilt parameters with interactive video/image player */}
          <div className="lg:col-span-5 relative flex items-center justify-center z-10">
            <div
              style={tiltStyle}
              className="relative w-full max-w-[420px] rounded-3xl bg-slate-950/85 backdrop-blur-xl border border-white/10 p-5 sm:p-6 flex flex-col shadow-[0_25px_60px_rgba(0,0,0,0.7)] group overflow-hidden"
            >
              {/* Glassmorphic card context filters */}
              <div className="absolute inset-0 bg-gradient-to-tr from-ids-purple/10 via-transparent to-ids-violet/10 pointer-events-none opacity-50" />

              {/* Media Channel Tab Buttons */}
              <div className="flex items-center justify-between mb-4 relative z-20">
                <div className="flex gap-2">
                  <button
                    onClick={() => setMediaTab("image")}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase font-bold tracking-wider transition-all cursor-pointer ${
                      mediaTab === "image"
                        ? "bg-ids-purple/30 text-white border border-ids-purple/50"
                        : "bg-white/[0.02] text-slate-400 hover:text-white border border-transparent"
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-ids-magenta" />
                    <span>Secure Hub</span>
                  </button>
                  <button
                    onClick={() => setMediaTab("video")}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase font-bold tracking-wider transition-all cursor-pointer ${
                      mediaTab === "video"
                        ? "bg-ids-purple/30 text-white border border-ids-purple/50"
                        : "bg-white/[0.02] text-slate-400 hover:text-white border border-transparent"
                    }`}
                  >
                    <Tv className="w-3.5 h-3.5 text-ids-magenta animate-pulse" />
                    <span>Live Feed</span>
                  </button>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#22c55e] bg-[#22c55e]/10 px-2 py-0.5 rounded border border-[#22c55e]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-ping" />
                  <span>ONLINE</span>
                </div>
              </div>

              {/* Outer Screen Display Frame with 16:9 Screen ratio */}
              <div className="relative w-full aspect-[16/10] bg-black/95 rounded-2xl border border-white/5 overflow-hidden group/screen mb-4 shadow-inner">
                {mediaTab === "image" ? (
                  <div className="relative w-full h-full">
                    {/* Generated photorealistic image of operations command screen */}
                    <img
                      src="/assets/images/ids_global_cyber_soc_1780951724880.png"
                      alt="IDS Security Command Dashboard"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover brightness-95 opacity-90 transition-transform duration-500 group-hover/screen:scale-105"
                    />
                    
                    {/* Green Laser scanning bar overlay */}
                    <div className="absolute inset-x-0 h-[2px] bg-emerald-400/70 shadow-[0_0_12px_#34d399] animate-[bounce_4s_infinite] pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 via-transparent to-transparent pointer-events-none" />

                    {/* Hud Coordinates */}
                    <div className="absolute bottom-2 left-3 bg-black/70 backdrop-blur-md border border-white/10 rounded px-2 py-0.5 font-mono text-[8px] text-white/80">
                      SYS: HB-HQ-01-SEC
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    {/* Live network monitoring loop video */}
                    <video
                      src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-security-data-and-graphs-41355-large.mp4"
                      poster="/assets/images/cyber_security_center_1780689979069.png"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover opacity-85"
                    />
                    
                    {/* Cyber line indicators */}
                    <div className="absolute inset-0 border border-ids-magenta/15 pointer-events-none" />
                    <div className="absolute top-2 left-3 bg-red-650/80 border border-red-500/30 text-white font-mono text-[8px] px-2 py-0.5 rounded flex items-center gap-1.5 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      <span>CAM: CORE_NODE_LOG</span>
                    </div>
                  </div>
                )}

                {/* Grid Scan Overlay line design */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.45)_100%)] pointer-events-none" />
              </div>

              {/* Dynamic Telemetry Logs Console box */}
              <div className="p-3 bg-slate-900/40 rounded-xl border border-white/5 font-mono text-[9px] text-slate-300 space-y-1 min-h-[75px] flex flex-col justify-end">
                <span className="text-slate-500 uppercase tracking-widest text-[8px] block mb-1 font-bold">SYSTEM TELEMETRY ENGINE:</span>
                {feedLogs.map((log, index) => (
                  <div key={index} className="flex items-center gap-1.5 text-emerald-400/90 leading-tight">
                    <span className="text-ids-magenta">{`>`}</span>
                    <span className="truncate">{log}</span>
                  </div>
                ))}
              </div>

              {/* Coordinates footer inside card */}
              <div className="flex flex-col space-y-2 mt-4">
                <div className="h-[1px] bg-slate-800/60 w-full" />
                <div className="flex justify-between items-center text-slate-300 text-[11px] font-mono">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-slate-500 uppercase tracking-wider">CALIFORNIA, US</span>
                    <span className="font-semibold text-slate-200">Headquarters</span>
                  </div>
                  <div className="h-6 w-[1px] bg-slate-800" />
                  <div className="flex flex-col text-right">
                    <span className="text-[8px] text-slate-500 uppercase tracking-wider">DUBAI, UAE</span>
                    <span className="font-semibold text-slate-200">IGS Operations</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Sleek styled Proof Strip at the bottom fold of the hero */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-400 select-none">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-ids-magenta animate-pulse" />
            <span>A decade behind brands like DHL &middot; The Beauty Secrets &middot; Starbucks &middot; Bloomingdale&rsquo;s</span>
          </div>
          <div className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
            California &amp; Dubai
          </div>
        </div>
      </div>
    </section>
  );
}
