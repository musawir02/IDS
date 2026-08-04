import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Shield,
  Code,
  Cpu,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  CheckCircle,
  Globe,
} from "lucide-react";
import { images } from "../assets";

interface TechVideo {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  icon: any;
  description: string;
  kpis: { value: string; label: string }[];
  poster?: string;
}

export default function TechLabShowcase() {
  const videos: TechVideo[] = [
    {
      id: "video-1",
      title: "Tactical Threat Detection Node",
      subtitle: "REAL TIME CYBER SECURITY OPERATIONS",
      url: "https://assets.mixkit.co/videos/preview/mixkit-data-center-server-room-with-blinking-lights-41356-large.mp4",
      icon: Shield,
      description:
        "Every deployment of IDS cybersecurity services monitors for intrusion attempts, exploits, and common attack patterns on servers located in both Silicon Valley and Dubai. Secure, resilient, active protection.",
      kpis: [
        { value: "24/7", label: "Incident Watch" },
        { value: "< 3ms", label: "Threat Isolation" },
        { value: "99.99%", label: "System Uptime" },
      ],
      poster: images.cyberSecurityCenter,
    },
    {
      id: "video-2",
      title: "Security Hardened Development",
      subtitle: "FULL STACK HIGH VELOCITY CODE RELEASES",
      url: "https://assets.mixkit.co/videos/preview/mixkit-web-development-codes-on-a-computer-screen-40292-large.mp4",
      icon: Code,
      description:
        "We compile, scan, and deploy modern, high performance frameworks with built in anti tampering guards and OWASP Top 10 defenses. The resulting interface converts and remains fully safe against external disruptions.",
      kpis: [
        { value: "Modern", label: "Frameworks" },
        { value: "0", label: "Critical Weaknesses" },
        { value: "+300%", label: "Conversion Lift" },
      ],
      poster: images.corporateTeam,
    },
    {
      id: "video-3",
      title: "Interactive AEO Search Routing",
      subtitle: "ANSWER ENGINE INTAKE GRAPH VISUAL",
      url: "https://assets.mixkit.co/videos/preview/mixkit-tunnel-of-blue-and-purple-neon-lights-41734-large.mp4",
      icon: Cpu,
      description:
        "When ChatGPT, Gemini, or Perplexity parse Silicon Valley or Dubai regional hubs, our Answer Engine Optimization structures your structured data optimized for AI engines, putting your brand at the absolute top of AI suggestions.",
      kpis: [
        { value: "No. 1", label: "AI Answer Choice" },
        { value: "0.2s", label: "Query Matching" },
        { value: "AEO/SEO", label: "Unified Growth" },
      ],
      poster: images.aeoSearch,
    },
    {
      id: "video-4",
      title: "CREATOR BRAND & MONETIZATION ENGINE",
      subtitle: "Creator Growth Node",
      url: "https://assets.mixkit.co/videos/preview/mixkit-holding-a-smartphone-next-to-a-laptop-42171-large.mp4",
      icon: Sparkles,
      description:
        "We turn audiences into businesses building the brand identity, content growth system, and monetization infrastructure (media kit, rate card, outreach) that scale a creator from a profile into a global name, with direct access to premium Gulf brand networks through our Dubai team.",
      kpis: [
        { value: "Brand System", label: "Live" },
        { value: "Growth Engine", label: "Active" },
        { value: "Gulf Network", label: "Connected" },
      ],
      poster: images.creatorMoodPng,
    },
    {
      id: "video-5",
      title: "Gulf Regional Entry Gateway",
      subtitle: "UAE & GCC MARKET EXPANSION NODE",
      url: "https://assets.mixkit.co/videos/preview/mixkit-low-angle-of-futuristic-dubai-skyscrapers-at-night-42207-large.mp4",
      icon: Globe,
      description:
        "Execution of bilingual branding, localized MENA digital campaigns, regional market analytics tracking, and direct access integrations across major Gulf consumer centers.",
      kpis: [
        { value: "Turnkey", label: "Roadmap Setup" },
        { value: "100%", label: "Foreign Ownership" },
        { value: "Riyadh/Dxb", label: "Local Support Hub" },
      ],
      poster: images.dubaiMarina,
    },
  ];

  const [activeVid, setActiveVid] = useState<TechVideo>(videos[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Restart video if source changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      if (isPlaying) {
        videoRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [activeVid]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const requestFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <section
      id="tech-lab"
      className="py-24 sm:py-32 bg-[#06060A] relative overflow-hidden border-t border-b border-white/5"
    >
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[30rem] bg-ids-purple/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex px-4 py-1.5 bg-ids-purple/10 border border-ids-purple/30 text-ids-magenta text-[10px] font-bold uppercase tracking-wider rounded-full mb-4 font-mono">
            Interactive Operations Lab
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-4">
            Watch Our Security, Dev, and AI Nodes in Action.
          </h2>
          <p className="font-sans text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            Take a digital tour inside the code streams and monitoring hubs that
            power IDS California and UAE operations. Select any active feed
            below to load its real time stream.
          </p>
        </div>

        {/* Multimedia Hub Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Interactive Tab selection cards */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <span className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-widest pl-2">
              Select Active Stream Node
            </span>

            <div className="space-y-3 flex-1 mt-2">
              {videos.map((vid) => {
                const VidIcon = vid.icon;
                const isActive = activeVid.id === vid.id;

                return (
                  <button
                    key={vid.id}
                    onClick={() => {
                      setActiveVid(vid);
                      setIsPlaying(true);
                    }}
                    className={`w-full p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                      isActive
                        ? "bg-slate-950/90 border-ids-purple/50 shadow-[0_10px_25px_rgba(123,47,190,0.15)]"
                        : "bg-white/[0.01] border-white/5 hover:border-white/15 hover:bg-white/[0.03]"
                    }`}
                  >
                    {/* Small active background color strip */}
                    {isActive && (
                      <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-gradient-to-b from-ids-magenta to-ids-purple" />
                    )}

                    <div className="flex gap-4 items-start">
                      <div
                        className={`p-2.5 rounded-xl border shrink-0 transition-colors duration-300 ${
                          isActive
                            ? "bg-ids-purple/15 border-ids-purple text-ids-magenta"
                            : "bg-white/5 border-white/5 text-slate-400 group-hover:text-white"
                        }`}
                      >
                        <VidIcon className="w-5 h-5" />
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">
                          {vid.subtitle}
                        </span>
                        <h4 className="font-display font-medium text-sm text-white group-hover:text-ids-magenta transition-colors">
                          {vid.title}
                        </h4>
                        <p className="font-sans text-[11.5px] text-slate-400 leading-snug line-clamp-2">
                          {vid.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* General Trust Anchor */}
            <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl flex items-center gap-3 mt-4">
              <Sparkles className="w-5 h-5 text-ids-magenta shrink-0" />
              <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                All feeds run on standard secure, encrypted server
                infrastructure. Our dual US and UAE hubs ensure synchronized
                high-performance delivery across regions.
              </p>
            </div>
          </div>

          {/* Right Column: Dynamic Media Viewer Screen */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 bg-slate-950/80 border border-white/10 rounded-3xl relative overflow-hidden shadow-2xl">
            {/* Display Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3.5 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-mono text-xs text-white uppercase tracking-wider font-semibold">
                  FEED NODE: {activeVid.id.toUpperCase()}
                </span>
              </div>

              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                FPS: 60.00 // SOURCE: DIGITAL SOLUTIONS LAB
              </span>
            </div>

            {/* Heavy-duty Screen Container */}
            <div className="relative aspect-[16/10] bg-black rounded-2xl border border-white/5 overflow-hidden shadow-2xl group/player mb-6">
              {/* Actual Video Tag element */}
              <video
                ref={videoRef}
                src={activeVid.url}
                poster={activeVid.poster}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover transition-all duration-300"
              />

              {/* Grid overlay styling */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.5)_100%)] pointer-events-none" />

              {/* Intercept play/pause tap overlay */}
              <div
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/player:opacity-100 transition-opacity duration-300 cursor-pointer"
              >
                <div className="p-4 rounded-full bg-slate-950/80 border border-white/20 text-white shadow-xl scale-95 group-hover/player:scale-100 transition-transform">
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-ids-magenta" />
                  ) : (
                    <Play className="w-8 h-8 text-[#22c55e]" />
                  )}
                </div>
              </div>

              {/* Floating Bottom Media Bar */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-slate-950/80 backdrop-blur-md px-4 py-2 border border-white/10 rounded-xl z-20">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                    aria-label={isPlaying ? "Pause Feed" : "Start Feed"}
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={toggleMute}
                    className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                    aria-label={isMuted ? "Unmute Feed" : "Mute Feed"}
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <span className="text-[9px] font-mono text-slate-400">
                  REAL TIME LOOPING RECREATION FEED
                </span>

                <button
                  onClick={requestFullscreen}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Fullscreen Feed"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Display Meta details pane */}
            <div className="space-y-4">
              <div>
                <h3 className="font-display font-bold text-xl text-white">
                  {activeVid.title}
                </h3>
                <p className="font-sans text-xs sm:text-[13px] text-slate-400 leading-relaxed mt-2">
                  {activeVid.description}
                </p>
              </div>

              {/* Dynamic KPI indicators box */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
                {activeVid.kpis.map((kpi, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white/[0.02] border border-white/5 rounded-xl"
                  >
                    <span className="text-sm font-display font-extrabold text-ids-magenta block leading-none">
                      {kpi.value}
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono block mt-1 uppercase tracking-wider">
                      {kpi.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
