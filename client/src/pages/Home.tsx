import { Link } from "wouter";
import { Shield, MapPin, Heart, Navigation, Bell, Clock, Wifi, ChevronDown, ChevronRight, ArrowRight, Play, X, Ambulance, Smartphone, Download, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ---------- animated counter hook ---------- */
function useCountUp(target: number, duration = 2000, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

/* ---------- SOS demo modal ---------- */
function SOSModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const steps = [
    { icon: "🆘", title: "SOS Triggered", desc: "One tap activates emergency broadcast with your GPS location." },
    { icon: "📍", title: "Location Shared", desc: "Precise coordinates sent to nearest ambulance & hospital within 2 seconds." },
    { icon: "🚑", title: "Ambulance Dispatched", desc: "AM-07 dispatched — 1.8 km away — ETA 3 min 40 sec." },
    { icon: "🚦", title: "Traffic Cleared", desc: "AI clears 4 signals on the route automatically." },
    { icon: "✅", title: "Help is On the Way", desc: "Bystander Rahul (200m away) also notified with first-aid guide." },
  ];
  useEffect(() => {
    if (step < steps.length - 1) {
      const t = setTimeout(() => setStep(s => s + 1), 1400);
      return () => clearTimeout(t);
    }
  }, [step]);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-sm border border-gray-700" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <img src="/resq-logo.png" alt="ResQ" className="w-6 h-6 object-contain" />
            <span className="text-white font-bold">Live Demo</span>
          </div>
          <button onClick={onClose} data-testid="button-close-modal"><X className="w-4 h-4 text-gray-400 hover:text-white" /></button>
        </div>
        <div className="rounded-xl overflow-hidden mb-4 h-36">
          <img src="/accident-scene.png" alt="emergency" className="w-full h-full object-cover" style={{objectPosition:'50% 30%'}} />
        </div>
        <div className="space-y-2">
          {steps.map((s, i) => (
            <div key={i} className={`flex items-center gap-3 p-2.5 rounded-lg transition-all duration-500 ${i <= step ? "opacity-100" : "opacity-20"} ${i === step ? "bg-gray-800" : ""}`}>
              <span className="text-lg">{s.icon}</span>
              <div className="flex-1">
                <p className="text-white text-xs font-semibold">{s.title}</p>
                <p className="text-gray-400 text-xs">{s.desc}</p>
              </div>
              {i < step && <span className="text-green-400 text-xs">✓</span>}
              {i === step && <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse flex-shrink-0" />}
            </div>
          ))}
        </div>
        {step === steps.length - 1 && (
          <div className="mt-4 p-3 bg-green-900/30 border border-green-700 rounded-xl text-center">
            <p className="text-green-400 text-sm font-bold">Total response time: 3 min 40 sec</p>
            <p className="text-green-300/60 text-xs mt-0.5">vs. 18 min national average</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- data ---------- */
const features = [
  { icon: Ambulance, title: "Ambulance Details", desc: "Real-time ambulance tracking with driver details, ETA and live route info." },
  { icon: Navigation, title: "AI Smart Routing", desc: "AI-powered routing clears traffic signals and finds the fastest path." },
  { icon: Bell, title: "See Top SOS", desc: "View and respond to nearest active SOS calls in your area instantly." },
  { icon: Heart, title: "Bystander Help", desc: "Guide bystanders with first-aid instructions until professional help arrives." },
  { icon: Clock, title: "History / Alert", desc: "Full incident history, alerts and real-time notifications for all responders." },
  { icon: Wifi, title: "Offline Mode", desc: "Core features work without internet — because emergencies don't wait." },
];

const faqs = [
  { q: "How does ResQ detect an emergency automatically?", a: "ResQ uses crash detection via phone sensors (accelerometer, gyroscope) combined with GPS location to automatically trigger SOS alerts when a collision is detected." },
  { q: "What if someone activates SOS by accident?", a: "There's a 10-second cancellation window after SOS is triggered. You can cancel with a single tap before alerts are dispatched to responders." },
  { q: "How does ResQ notify emergency services?", a: "ResQ instantly notifies the nearest registered ambulance, hospital, and trained bystanders simultaneously — reducing average response time by 40%." },
  { q: "Does it work without internet connectivity?", a: "Yes. ResQ stores critical emergency data locally and uses SMS fallback when internet is unavailable, ensuring functionality even in remote areas." },
  { q: "How does AI smart routing help ambulances?", a: "Our AI system communicates with traffic management infrastructure to turn signals green on the ambulance route and guide the fastest available path in real time." },
];

/* ---------- real team data matching Figma ---------- */
const teamRow1 = [
  { name: "Amit Kumar Prasad", role: "Project Director & Hardware Lead", photo: "/team-amit.jpeg" },
  { name: "Chandrashekhar Ahirwar", role: "Dashboard & Backend Lead", photo: "/team-chandrashekhar.jpeg" },
  { name: "Hataf Rakshi", role: "App Development Lead", photo: null },
];
const teamRow2 = [
  { name: "Kamal Das", role: "Pitch & Presentation Lead", photo: "/team-kamal.jpeg" },
  { name: "Mohak Verma", role: "Mechanical Domain Lead", photo: null },
];

/* ---------- live ticker ---------- */
const alerts = [
  "🚨 SOS #2341 — NH-48, Delhi — Ambulance dispatched (4 min ETA)",
  "✅ Incident #2338 — Pune Ring Road — Resolved in 3m 22s",
  "🚑 AM-12 responding — Bengaluru HSR Layout — Patient en route",
  "🚨 SOS #2342 — Mumbai Expressway — 2 bystanders alerted",
  "✅ Incident #2337 — Chennai OMR — Patient reached hospital safely",
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showSOS, setShowSOS] = useState(false);
  const [alertIdx, setAlertIdx] = useState(0);
  const statsRef = useInView();
  const c1 = useCountUp(200, 2000, statsRef.inView);
  const c2 = useCountUp(80, 2000, statsRef.inView);
  const c3 = useCountUp(3200, 2000, statsRef.inView);

  useEffect(() => {
    const t = setInterval(() => setAlertIdx(i => (i + 1) % alerts.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {showSOS && <SOSModal onClose={() => setShowSOS(false)} />}
      <Navbar />

      {/* Live Alert Ticker */}
      <div className="bg-red-600 text-white text-xs py-1.5 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-3">
          <span className="font-bold whitespace-nowrap flex items-center gap-1.5">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            LIVE
          </span>
          <span className="transition-all duration-500 truncate">{alerts[alertIdx]}</span>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          HERO — Two real images at the very top
          Background: night highway (hero-bg.png)
          Left: accident scene, Right: app mockup
      ════════════════════════════════════════════════ */}
      <section className="relative text-white overflow-hidden min-h-screen flex flex-col">
        {/* Night highway background */}
        <div className="absolute inset-0">
          <img src="/hero-bg.png" alt="" className="w-full h-full object-cover" style={{objectPosition:'50% 60%'}} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
        </div>

        <div className="relative flex-1 max-w-6xl mx-auto px-4 sm:px-6 w-full flex flex-col justify-between py-10">
          {/* Top: Two featured images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {/* Accident scene with ResQ notification */}
            <div className="rounded-2xl overflow-hidden shadow-2xl h-64 md:h-80 relative group" data-testid="img-accident-scene">
              <img
                src="/accident-scene.png"
                alt="ResQ — Help is on the way"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                style={{objectPosition: '50% 30%'}}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full border border-white/20">
                  🚨 AI detects crash → Alerts dispatched in &lt;2 seconds
                </span>
              </div>
            </div>
            {/* Phone app mockup */}
            <div className="rounded-2xl overflow-hidden shadow-2xl h-64 md:h-80 relative group" data-testid="img-app-mockup">
              <img
                src="/app-mockup.jpg"
                alt="ResQ App — AI-Powered Emergency Response"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                style={{objectPosition: '50% 20%'}}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full border border-white/20">
                  📱 ResQ App — Nearest services. One tap away.
                </span>
              </div>
            </div>
          </div>

          {/* Center: ResQ logo + tagline + CTA */}
          <div className="text-center">
            <img src="/resq-logo.png" alt="ResQ" className="w-16 h-16 object-contain mx-auto mb-4 drop-shadow-2xl" />
            <h1 className="text-5xl md:text-7xl font-black leading-none mb-2 tracking-tight">
              Res<span className="text-red-400">Q</span>
            </h1>
            <p className="text-red-400 font-semibold text-base mb-3 tracking-widest uppercase">Every second counts</p>
            <p className="text-gray-300 text-sm md:text-base max-w-lg mx-auto mb-8 leading-relaxed">
              Smart accident detection and instant emergency response system designed to save lives on the road.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 flex-wrap justify-center">
              <Link href="/about">
                <Button variant="outline" className="border-white/50 text-white hover:bg-white/15 rounded-full px-7 py-5 text-sm bg-transparent" data-testid="button-hero-home">
                  Go to About
                </Button>
              </Link>
              <Button
                onClick={() => setShowSOS(true)}
                className="bg-red-500 hover:bg-red-600 text-white rounded-full px-7 py-5 text-sm shadow-lg shadow-red-500/40"
                data-testid="button-hero-demo"
              >
                <Play className="w-3.5 h-3.5 mr-2" /> Watch Demo
              </Button>
              <Link href="/product">
                <Button variant="outline" className="border-white/50 text-white hover:bg-white/15 rounded-full px-7 py-5 text-sm bg-transparent" data-testid="button-hero-features">
                  Explore Features
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex flex-col items-center gap-1 text-gray-400 text-xs animate-bounce">
              <span>scroll</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Every Second Counts</h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-12">Road accidents are one of India's biggest crises — and most deaths are preventable with faster response.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { num: "2k+", label: "Road accident deaths per day in India" },
              { num: "98%", label: "Preventable with timely response", highlight: true },
              { num: "18 min", label: "Average ambulance wait time currently" },
            ].map((s) => (
              <div key={s.num} className={`flex flex-col items-center p-6 rounded-2xl ${s.highlight ? "bg-red-500 text-white" : "bg-red-50"}`}>
                <span className={`text-5xl font-bold mb-2 ${s.highlight ? "text-white" : "text-red-500"}`}>{s.num}</span>
                <span className={`text-sm font-medium ${s.highlight ? "text-red-100" : "text-gray-600"}`}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Steps */}
      <section className="bg-red-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-red-500 font-semibold text-sm uppercase tracking-widest">How it works</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">Three Steps. That's It.</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-12">ResQ's system activates instantly, coordinates automatically, and saves lives.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: "01", icon: Bell, title: "Detect", desc: "Auto-detect crashes via sensors or one-tap SOS. Alert goes out immediately to the ResQ network.", color: "bg-red-500" },
              { num: "02", icon: MapPin, title: "Locate", desc: "Precise GPS location is shared instantly with ambulances, hospitals and trained responders nearby.", color: "bg-orange-500" },
              { num: "03", icon: Heart, title: "Rescue", desc: "AI routes the fastest ambulance, clears traffic signals, and guides bystanders with first aid.", color: "bg-rose-600" },
            ].map((step) => (
              <div key={step.num} className="bg-white rounded-2xl p-8 text-left shadow-sm border border-red-100 relative overflow-hidden">
                <span className="absolute top-4 right-4 text-5xl font-black text-red-50">{step.num}</span>
                <div className={`w-12 h-12 ${step.color} rounded-xl flex items-center justify-center mb-5`}>
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-red-500 font-semibold text-sm uppercase tracking-widest">Features</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">Everything You Need in One Place</h2>
            <p className="text-gray-500 max-w-md mx-auto">Built for real Indian roads — with features that actually work in the field.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="group p-6 rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-md transition-all bg-white" data-testid={`card-feature-${f.title.replace(/\s+/g,'-').toLowerCase()}`}>
                <div className="w-11 h-11 bg-red-50 group-hover:bg-red-500 rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <f.icon className="w-5 h-5 text-red-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Showcase — accident scene + app mockup side by side (secondary use) */}
      <section className="bg-gray-900 py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-red-400 font-semibold text-sm uppercase tracking-widest">The App</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
                One Tap.<br />One Location.<br />One Dispatch.
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                The ResQ citizen app puts emergency response in your pocket. Nearest trauma centres, ambulances, police and rescue teams — visible in seconds. One big "Request Help Now" button that does everything.
              </p>
              <ul className="space-y-3 mb-8">
                {["Auto crash detection — no action needed", "Nearest emergency services with ETA", "Live tracking of your ambulance", "First-aid guide for bystanders near you"].map((pt) => (
                  <li key={pt} className="flex items-center gap-2.5 text-gray-300 text-sm">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3">
                <a href="#" className="flex items-center gap-2 bg-white text-gray-900 rounded-xl px-4 py-2.5 text-sm font-semibold hover:bg-gray-100 transition-colors" data-testid="button-app-store">
                  <Smartphone className="w-4 h-4" />
                  App Store
                </a>
                <a href="#" className="flex items-center gap-2 bg-red-500 text-white rounded-xl px-4 py-2.5 text-sm font-semibold hover:bg-red-600 transition-colors" data-testid="button-play-store">
                  <Download className="w-4 h-4" />
                  Google Play
                </a>
              </div>
            </div>
            {/* Real phone mockup photo */}
            <div className="relative flex justify-center">
              <div className="w-64 h-80 rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-700">
                <img
                  src="/app-mockup.jpg"
                  alt="ResQ App"
                  className="w-full h-full object-cover"
                  style={{objectPosition: '50% 10%'}}
                />
              </div>
              <div className="absolute -right-2 top-6 bg-red-500 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg shadow-red-500/40 animate-pulse">
                AI-Powered
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Numbers — animated */}
      <section ref={statsRef.ref} className="bg-red-500 py-16 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-10">Built for Impact, Built for India</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { num: c1, suffix: "m+", label: "Indians at risk on roads daily" },
              { num: c2, suffix: "k+", label: "Registered responders & volunteers" },
              { num: c3, suffix: "+", label: "Lives impacted in pilot phase" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center" data-testid={`stat-counter-${s.label.split(' ')[0].toLowerCase()}`}>
                <span className="text-4xl md:text-5xl font-black mb-2">{s.num}{s.suffix}</span>
                <span className="text-red-100 text-sm">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TEAM — Exact Figma layout
          Row 1: 3 members (Amit, Chandrashekhar, Hataf)
          Row 2: 2 members centered (Kamal, Mohak)
      ════════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-red-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">THE TEAM</p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-16">Built by Innovators, for India</h2>

          {/* Row 1 — 3 members */}
          <div className="flex flex-wrap justify-center gap-16 mb-14">
            {teamRow1.map((member) => (
              <div key={member.name} className="flex flex-col items-center gap-4 w-40" data-testid={`card-team-${member.name.split(' ')[0].toLowerCase()}`}>
                <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-gray-300 bg-gray-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: "50% 20%" }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50">
                      <User className="w-16 h-16 text-gray-300" strokeWidth={1} />
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900 text-base leading-tight">{member.name}</p>
                  <p className="text-[#e05050] text-sm italic mt-1 leading-snug">{member.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 — 2 members centered */}
          <div className="flex flex-wrap justify-center gap-16">
            {teamRow2.map((member) => (
              <div key={member.name} className="flex flex-col items-center gap-4 w-40" data-testid={`card-team-${member.name.split(' ')[0].toLowerCase()}`}>
                <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-gray-300 bg-gray-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: "50% 20%" }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50">
                      <User className="w-16 h-16 text-gray-300" strokeWidth={1} />
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900 text-base leading-tight">{member.name}</p>
                  <p className="text-[#e05050] text-sm italic mt-1 leading-snug">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-red-500 font-semibold text-sm uppercase tracking-widest">FAQ</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden" data-testid={`faq-item-${i}`}>
                <button
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  data-testid={`button-faq-${i}`}
                >
                  <span className="font-medium text-gray-900 text-sm">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-50">
                    <p className="pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-red-500 font-semibold text-sm uppercase tracking-widest">Get Involved</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">Let's Work Together</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-8">Join us in making Indian roads safer. Partner, volunteer, or integrate ResQ into your service.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact">
              <Button className="bg-red-500 hover:bg-red-600 text-white rounded-full px-8 py-6 text-base font-semibold" data-testid="button-cta-join">
                Join the Mission
              </Button>
            </Link>
            <Link href="/product">
              <Button variant="outline" className="border-red-200 text-red-500 hover:bg-red-50 rounded-full px-8 py-6 text-base" data-testid="button-cta-demo">
                See a Demo <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
