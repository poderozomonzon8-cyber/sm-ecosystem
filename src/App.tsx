import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { Globe, Sparkles } from 'lucide-react';

function App() {
  const [status, setStatus] = useState('Initializing...');

  useEffect(() => {
    // GSAP animations
    gsap.fromTo('.hero', 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
    );

    gsap.fromTo('.card', 
      { scale: 0.8, opacity: 0, rotation: -10 },
      { scale: 1, opacity: 1, rotation: 0, duration: 1, stagger: 0.2 }
    );

    setStatus('Anima + GSAP Animations + Supabase Ready!');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 text-white p-8 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="hero text-6xl md:text-7xl font-black mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
          <Sparkles className="mx-auto w-28 h-28 mb-6 opacity-90 animate-pulse" />
          Anima Reborn
        </div>
        <p className="text-2xl mb-16 text-center opacity-90 max-w-3xl mx-auto leading-relaxed">
          Clean slate with GSAP animations, Anima SDK, Tailwind, Radix UI, and Supabase hooked up.
          Add your .env vars to test DB connection.
        </p>
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="card group relative p-12 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 h-72 flex items-center justify-center hover:border-white/40 hover:shadow-2xl transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10 transform -skew-x-3" />
            <Globe className="w-28 h-28 text-blue-400 z-10 group-hover:scale-125 transition-all duration-700" />
          </div>
          <div className="card group relative p-12 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 h-72 flex flex-col items-center justify-center hover:border-white/40 hover:shadow-2xl transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-orange-500/10 transform rotate-1" />
            <Sparkles className="w-20 h-20 text-yellow-400 mb-6 z-10 group-hover:rotate-360 transition-all duration-1000" />
            <span className="text-lg font-mono tracking-wider opacity-90">GSAP + Tailwind Magic</span>
          </div>
        </div>
        <div className="status p-8 bg-black/40 rounded-3xl backdrop-blur-xl text-center border border-white/20 shadow-2xl">
          <h3 className="text-2xl font-black mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Status: {status}
          </h3>
        </div>
        <p className="mt-16 text-center text-sm opacity-60 tracking-widest uppercase font-mono">
          Ready for next features 🚀
        </p>
      </div>
    </div>
  );
}

export default App;
