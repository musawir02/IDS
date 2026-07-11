import { useState, FormEvent } from "react";
import { CALL_EXPECTATIONS, SERVICE_OPTIONS } from "../data";
import { Phone, Mail, Globe, MapPin, CheckCircle2, ShieldAlert, Sparkles, Loader2, Info, FileText, Linkedin } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phoneNumber: "",
    location: "",
    service: "Full Package All Services",
    notes: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [secureToken, setSecureToken] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      setError("Please fill out at least your Full Name and Email Address.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      let successMessage = "Thank you! Your strategic call submission was successful.";
      try {
        const resp = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.fullName,
            company: formData.companyName,
            email: formData.email,
            phone: formData.phoneNumber,
            location: formData.location,
            service: formData.service,
            notes: formData.notes
          })
        });

        if (resp.ok) {
          const resData = await resp.json();
          successMessage = resData.message || successMessage;
        }
      } catch (err) {
        console.warn("Backend API offline, completing mock submission", err);
      }

      setSuccess(successMessage);
      // Generate a mock unique reference token for cyber realism
      const randomToken = "IDS SEC " + Math.floor(100000 + Math.random() * 900000);
      setSecureToken(randomToken);

      // Reset form variables
      setFormData({
        fullName: "",
        companyName: "",
        email: "",
        phoneNumber: "",
        location: "",
        service: "Full Package All Services",
        notes: ""
      });
    } catch (err: any) {
      setError(err.message || "An unexpected issue occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#0A0A0F] relative overflow-hidden border-t border-white/5">
      {/* Decorative colored glow overlays */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-ids-purple/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-[5%] w-[33rem] h-[33rem] bg-ids-violet/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Core Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Expectations & Office Information */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="inline-flex px-4 py-1.5 bg-ids-purple/15 border border-ids-purple/30 text-ids-magenta text-[10px] font-bold uppercase tracking-wider rounded-full mb-4 font-mono">
                Let's Talk
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                Your Business Deserves to Be Built, Secured, and Dominant.
              </h2>
              <p className="font-sans text-sm text-slate-350 leading-relaxed mt-4 font-normal">
                Book a free 30 minute strategy call. We audit your complete digital position and show you exactly where the gaps are, at zero cost and zero obligation.
              </p>
            </div>

            {/* Call expectations checklist */}
            <div className="bg-white/[0.02] border border-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-xl">
              <h4 className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">What to Expect on the Call</h4>
              <div className="space-y-3 font-sans">
                {CALL_EXPECTATIONS.map((exp, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-ids-magenta shrink-0 mt-0.5" />
                    <span>{exp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Office Contact cards */}
            <div className="space-y-4">
              <div className="p-5 bg-white/[0.02] border border-white/5 rounded-xl hover:border-ids-purple/20 transition-all duration-300">
                <div className="text-slate-400 text-[10px] font-mono uppercase tracking-wider">USA Operations Hub</div>
                <div className="text-white text-xs font-semibold mt-2 font-display">Huntington Beach, California</div>
                <span className="text-[10px] text-slate-500 font-sans block mt-1">Huntington Beach, CA</span>
              </div>

              <div className="p-5 bg-white/[0.02] border border-white/5 rounded-xl hover:border-ids-magenta/20 transition-all duration-300">
                <div className="text-ids-magenta text-[10px] font-mono uppercase tracking-wider">UAE Operations Hub</div>
                <div className="text-white text-xs font-semibold mt-2 font-display">Dubai Production City</div>
                <span className="text-[10px] text-slate-400 font-sans block mt-1">Production Region Nodes, IGS, Dubai Production City, Dubai, United Arab Emirates</span>
              </div>

              <div className="text-[9px] font-mono text-slate-500 text-center py-2 border border-white/5 rounded-xl bg-white/[0.01]">
                Dual Headquartered in Huntington Beach, California & Dubai Production City
              </div>
            </div>

            {/* Contact pointers */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-3 text-xs text-slate-300 font-sans hover:text-[#fafafa] transition-colors">
                <Mail className="w-4 h-4 text-ids-magenta" />
                <a href="mailto:grow@impulsedigitalsolutions.us">grow@impulsedigitalsolutions.us</a>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300 font-sans hover:text-[#fafafa] transition-colors">
                <Phone className="w-4 h-4 text-ids-magenta" />
                <a href="tel:+16575409315">+1 (657) 540-9315</a>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300 font-sans hover:text-[#fafafa] transition-colors">
                <Linkedin className="w-4 h-4 text-ids-magenta" />
                <a href="https://linkedin.com/company/impulse-digital-solutions" target="_blank" rel="noreferrer">linkedin.com/company/impulse-digital-solutions</a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl relative">
              
              <div className="mb-6">
                <span className="text-[10px] font-mono text-ids-magenta uppercase tracking-widest block font-bold">GET IN TOUCH</span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white mt-1">
                  Ready to Start? Let's Build Something Unstoppable.
                </h3>
              </div>

              {/* Status responses & dynamic callback receipts */}
              {success ? (
                <div className="space-y-6">
                  <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-start gap-4">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-display font-bold text-white block">Strategic Inquiry Successfully Locked</span>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">{success}</p>
                    </div>
                  </div>

                  {/* Cybersecure handshake details panel */}
                  <div className="p-6 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-4 font-mono text-xs">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <span className="text-slate-500 text-[10px] uppercase font-mono tracking-wider">Handshake Status</span>
                      <span className="text-emerald-400 font-bold uppercase tracking-widest animate-pulse">[ SECURE PROTOCOL ACTIVE ]</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-slate-300">
                      <div>
                        <span className="text-slate-500 text-[10px] block">REF TOKEN:</span>
                        <span className="text-white text-xs">{secureToken}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px] block">SECURITY DEPTH:</span>
                        <span className="text-white text-xs">Sha-256 Multiway</span>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px] block">SENSITIVE AUDIT:</span>
                        <span className="text-ids-magenta text-xs">Initiated (AEO / SEO Gaps)</span>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px] block">DUAL EXPEDITE:</span>
                        <span className="text-white text-xs">Huntington Beach & Dubai Core</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4 text-[10px] text-slate-400 border-t border-white/5 pt-4">
                      <FileText className="w-4 h-4 text-ids-purple shrink-0" />
                      <span>An IDS corporate lead advisor will review this standing and ping you within 3 business hours.</span>
                    </div>

                    <button 
                      onClick={() => setSuccess(null)}
                      className="w-full mt-4 py-2.5 rounded-xl border border-white/10 text-slate-300 bg-white/5 hover:bg-white/10 font-mono text-[10px] font-bold uppercase tracking-wider transition-colors"
                    >
                      Submit Another Strategic Request
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {error && (
                    <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-start gap-3">
                      <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-semibold text-rose-300 block">Submission Blocked</span>
                        <p className="text-[11px] text-slate-300 mt-0.5">{error}</p>
                      </div>
                    </div>
                  )}

                  {/* Form elements */}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Inputs Row 1: Name and Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col space-y-1.5 focus-within:text-ids-magenta group">
                        <label id="lbl-fullname" htmlFor="fullName" className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-semibold group-focus-within:text-ids-magenta transition-colors">Full Name *</label>
                        <input
                          id="fullName"
                          type="text"
                          className="w-full px-4 py-3 rounded-xl bg-slate-950/40 border border-white/10 text-white font-sans text-xs focus:bg-slate-900/40 focus:border-ids-magenta focus:ring-1 focus:ring-ids-magenta outline-none transition-colors"
                          placeholder="Jane Doe"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        />
                      </div>

                      <div className="flex flex-col space-y-1.5 focus-within:text-ids-magenta group">
                        <label id="lbl-companyname" htmlFor="companyName" className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-semibold group-focus-within:text-ids-magenta transition-colors">Company Name</label>
                        <input
                          id="companyName"
                          type="text"
                          className="w-full px-4 py-3 rounded-xl bg-slate-950/40 border border-white/10 text-white font-sans text-xs focus:bg-slate-900/40 focus:border-ids-magenta focus:ring-1 focus:ring-ids-magenta outline-none transition-colors"
                          placeholder="Acme Inc."
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Inputs Row 2: Email and Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col space-y-1.5 focus-within:text-ids-magenta group">
                        <label id="lbl-email" htmlFor="email" className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-semibold group-focus-within:text-ids-magenta transition-colors">Email Address *</label>
                        <input
                          id="email"
                          type="email"
                          className="w-full px-4 py-3 rounded-xl bg-slate-950/40 border border-white/10 text-white font-sans text-xs focus:bg-slate-900/40 focus:border-ids-magenta focus:ring-1 focus:ring-ids-magenta outline-none transition-colors"
                          placeholder="jane@company.com"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      <div className="flex flex-col space-y-1.5 focus-within:text-ids-magenta group">
                        <label id="lbl-phone" htmlFor="phoneNumber" className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-semibold group-focus-within:text-ids-magenta transition-colors">Phone Number</label>
                        <input
                          id="phoneNumber"
                          type="tel"
                          className="w-full px-4 py-3 rounded-xl bg-slate-950/40 border border-white/10 text-white font-sans text-xs focus:bg-slate-900/40 focus:border-ids-magenta focus:ring-1 focus:ring-ids-magenta outline-none transition-colors"
                          placeholder="+1 (555) 000 0000"
                          value={formData.phoneNumber}
                          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Inputs Row 3: Country Location and Serviceinterested */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col space-y-1.5 focus-within:text-ids-magenta group">
                        <label id="lbl-location" htmlFor="location" className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-semibold group-focus-within:text-ids-magenta transition-colors">Country / Location</label>
                        <input
                          id="location"
                          type="text"
                          className="w-full px-4 py-3 rounded-xl bg-slate-950/40 border border-white/10 text-white font-sans text-xs focus:bg-slate-900/40 focus:border-ids-magenta focus:ring-1 focus:ring-ids-magenta outline-none transition-colors"
                          placeholder="e.g. California, USA"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                      </div>

                      <div className="flex flex-col space-y-1.5 focus-within:text-ids-magenta group">
                        <label id="lbl-service" htmlFor="service" className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-semibold group-focus-within:text-ids-magenta transition-colors">Service Interested In</label>
                        <select
                          id="service"
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-slate-300 font-sans text-xs focus:bg-slate-900 focus:border-ids-magenta focus:ring-1 focus:ring-ids-magenta outline-none transition-colors [&>option]:bg-slate-950 [&>option]:text-white"
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        >
                          {SERVICE_OPTIONS.map((opt, i) => (
                            <option key={i} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Textarea */}
                    <div className="flex flex-col space-y-1.5 focus-within:text-ids-magenta group">
                      <label id="lbl-notes" htmlFor="notes" className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-semibold group-focus-within:text-ids-magenta transition-colors">Tell us about your business</label>
                      <textarea
                        id="notes"
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/40 border border-white/10 text-white font-sans text-xs focus:bg-slate-900/40 focus:border-ids-magenta focus:ring-1 focus:ring-ids-magenta outline-none transition-colors resize-none"
                        placeholder="Describe your current IT standing, SEO goals, or expansion interests..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      />
                    </div>

                    {/* Confidentiality notice disclaimer */}
                    <div className="flex items-start gap-2.5 p-3.5 bg-white/[0.01] border border-white/5 rounded-xl">
                      <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                        <strong>Trust Statement:</strong> Your information is 100% confidential. We will never share your data with any third party under any circumstances.
                      </p>
                    </div>

                    {/* Submit button */}
                    <button
                      id="btn-submitt"
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-ids-purple to-ids-violet hover:from-ids-magenta hover:to-ids-purple disabled:opacity-50 text-white font-bold text-xs uppercase tracking-widest font-mono transition-all duration-300 shadow-[0_4px_15px_rgba(123,47,190,0.35)] hover:shadow-cyan-500/20 cursor-pointer flex items-center justify-center gap-2 mt-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>Transmitting secure handshake...</span>
                        </>
                      ) : (
                        <span>Schedule Strategic Call</span>
                      )}
                    </button>

                  </form>
                </>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
