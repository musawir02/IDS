import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if (!visible) return null;

  return (
    <button
      id="btn-scroll-to-top"
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 z-50 p-3 rounded-full bg-slate-900/60 border border-white/10 text-slate-300 hover:text-white backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-cyan-500/20 active:scale-90 cursor-pointer"
      title="Back to Top"
    >
      <ArrowUp className="w-5 h-5 animate-bounce" />
    </button>
  );
}
