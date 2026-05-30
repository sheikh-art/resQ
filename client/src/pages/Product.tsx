import { Link } from "wouter";
import { Shield, Smartphone, Monitor, Users, Zap, MapPin, Heart, Bell, Wifi, Lock, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const products = [
  {
    icon: Smartphone,
    title: "ResQ Citizen App",
    tag: "For Everyone",
    color: "bg-blue-500",
    tagColor: "bg-blue-50 text-blue-600",
    desc: "One-tap SOS, crash auto-detection, bystander first-aid guide, and real-time ambulance tracking — all in one app for every Indian on the road.",
    points: ["Auto crash detection via sensors", "One-tap SOS with GPS sharing", "Live ambulance ETA tracking", "First-aid guide for bystanders"],
  },
  {
    icon: Zap,
    title: "ResQ Responder",
    tag: "For Ambulances & EMTs",
    color: "bg-orange-500",
    tagColor: "bg-orange-50 text-orange-600",
    desc: "AI-routed dispatch, traffic signal override, and a live incident dashboard built for speed. Designed with EMTs for real field conditions.",
    points: ["AI-powered fastest route", "Live traffic signal clearance", "Patient info before arrival", "Incident documentation tools"],
  },
  {
    icon: Monitor,
    title: "ResQ Command Center",
    tag: "For Hospitals & Cities",
    color: "bg-red-500",
    tagColor: "bg-red-50 text-red-600",
    desc: "A full-city emergency operations dashboard — manage fleets, track incidents in real time, and coordinate response across your entire network.",
    points: ["City-wide incident map", "Fleet management & dispatch", "Analytics & response metrics", "API integration with existing systems"],
  },
];

const flow = [
  { step: "1", label: "Crash Detected", desc: "Sensors or manual SOS trigger", icon: Bell },
  { step: "2", label: "Location Shared", desc: "Precise GPS sent to network", icon: MapPin },
  { step: "3", label: "Dispatch Triggered", desc: "Nearest ambulance alerted", icon: Zap },
  { step: "4", label: "Route Cleared", desc: "AI clears traffic signals", icon: Shield },
  { step: "5", label: "Rescue Complete", desc: "Patient reaches hospital", icon: Heart },
];

const techFeatures = [
  { icon: Wifi, title: "Works Offline", desc: "Core SOS features work without internet using SMS fallback — essential for rural India." },
  { icon: Lock, title: "End-to-End Encrypted", desc: "All emergency data is encrypted in transit and at rest. Privacy is non-negotiable." },
  { icon: Zap, title: "Sub-30s Response", desc: "From SOS trigger to ambulance dispatch in under 30 seconds — faster than any manual system." },
  { icon: Users, title: "Crowdsourced Help", desc: "Trained bystanders nearby receive alerts and can begin first aid within minutes." },
  { icon: MapPin, title: "Hyper-Local Routing", desc: "Routing trained on Indian roads — knows lanes, shortcuts and hospital entry points." },
  { icon: Monitor, title: "City-Scale Dashboard", desc: "Municipal corporations and hospitals get real-time oversight of all incidents." },
];

export default function Product() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0a0e1f] text-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e1f] to-[#1a0a0a]" />
        <div className="absolute inset-0" style={{backgroundImage:"radial-gradient(ellipse at 30% 50%, rgba(229,62,62,0.12) 0%, transparent 60%)"}} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            Platform Overview
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 max-w-3xl mx-auto">
            One platform.<br />
            <span className="text-red-400">Three powerful layers.</span><br />
            Zero delay in emergency response.
          </h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto mb-10">
            ResQ unifies citizens, responders and command centers into a single real-time network — purpose-built for Indian emergencies.
          </p>
          <Link href="/contact">
            <Button className="bg-red-500 hover:bg-red-600 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-red-500/30">
              Get Early Access <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Three Products */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-red-500 font-semibold text-sm uppercase tracking-widest">Products</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">Three Products. One Mission.</h2>
            <p className="text-gray-500 max-w-md mx-auto">Every layer of ResQ is designed to work independently — and exponentially better together.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p.title} className="rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow" data-testid={`card-product-${p.title.replace(/\s+/g,'-').toLowerCase()}`}>
                <div className={`w-12 h-12 ${p.color} rounded-xl flex items-center justify-center mb-4`}>
                  <p.icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.tagColor}`}>{p.tag}</span>
                <h3 className="text-xl font-bold text-gray-900 mt-3 mb-2">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{p.desc}</p>
                <ul className="space-y-2">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Command Center Highlight */}
      <section className="bg-red-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-red-500 font-semibold text-sm uppercase tracking-widest">Flagship Feature</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-5">ResQ Command Center</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Give city administrators and hospital networks a live window into every emergency unfolding in their jurisdiction. Track ambulances, manage dispatch, and analyse response performance — all in one dashboard.
              </p>
              <ul className="space-y-3 mb-8">
                {["Real-time city-wide incident map", "Drag-and-drop fleet dispatch", "Response time analytics & SLA reporting", "Direct integration with hospital ER systems"].map((pt) => (
                  <li key={pt} className="flex items-center gap-3 text-gray-700 text-sm">
                    <span className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
              <Link href="/contact">
                <Button className="bg-red-500 hover:bg-red-600 text-white rounded-full px-7" data-testid="button-command-demo">
                  Request a Demo
                </Button>
              </Link>
            </div>
            <div className="bg-gray-900 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="text-gray-400 text-xs ml-2">ResQ Command Center — Live</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-gray-800 rounded-lg px-3 py-2">
                  <span className="text-green-400 text-xs font-mono">● ACTIVE INCIDENT #2341</span>
                  <span className="text-gray-400 text-xs">NH-48, Delhi</span>
                </div>
                <div className="flex items-center justify-between bg-gray-800 rounded-lg px-3 py-2">
                  <span className="text-yellow-400 text-xs font-mono">◐ DISPATCH #AM-07</span>
                  <span className="text-gray-400 text-xs">ETA: 4 min</span>
                </div>
                <div className="flex items-center justify-between bg-gray-800 rounded-lg px-3 py-2">
                  <span className="text-blue-400 text-xs font-mono">→ SIGNAL CLEARED</span>
                  <span className="text-gray-400 text-xs">3 junctions</span>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 mt-3">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div><div className="text-white font-bold text-lg">12</div><div className="text-gray-500 text-xs">Active</div></div>
                    <div><div className="text-green-400 font-bold text-lg">8</div><div className="text-gray-500 text-xs">Resolved</div></div>
                    <div><div className="text-yellow-400 font-bold text-lg">4.2m</div><div className="text-gray-500 text-xs">Avg ETA</div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flow */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-red-500 font-semibold text-sm uppercase tracking-widest">How It Flows</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-12">Three Products. One Seamless Flow.</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-0">
            {flow.map((step, i) => (
              <div key={step.step} className="flex flex-col md:flex-row items-center">
                <div className="flex flex-col items-center gap-2 px-4 py-2" data-testid={`step-flow-${i}`}>
                  <div className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-200">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-bold text-red-500">Step {step.step}</span>
                  <span className="font-semibold text-gray-900 text-sm">{step.label}</span>
                  <span className="text-gray-400 text-xs max-w-[90px] text-center">{step.desc}</span>
                </div>
                {i < flow.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-red-300 rotate-90 md:rotate-0 my-2 md:my-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-red-500 font-semibold text-sm uppercase tracking-widest">Technology</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">Technology That Works Where It's Needed Most</h2>
            <p className="text-gray-500 max-w-md mx-auto">Built for the realities of Indian infrastructure — not Silicon Valley assumptions.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {techFeatures.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow" data-testid={`card-tech-${f.title.replace(/\s+/g,'-').toLowerCase()}`}>
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-red-500 py-16 text-white text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to See ResQ in Action?</h2>
          <p className="text-red-100 max-w-md mx-auto mb-8">Request a live demo or join our pilot program today.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact">
              <Button className="bg-white text-red-500 hover:bg-red-50 rounded-full px-8 py-6 text-base font-semibold" data-testid="button-product-cta-demo">
                Request a Demo
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded-full px-8 py-6 text-base bg-transparent" data-testid="button-product-cta-about">
                Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
