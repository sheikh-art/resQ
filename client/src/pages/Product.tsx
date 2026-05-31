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

      {/* Hero — dispatch center as subtle bg */}
      <section className="bg-[#0a0e1f] text-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <img src="/dispatch-center.jpeg" alt="" className="w-full h-full object-cover opacity-15" style={{objectPosition: '50% 30%'}} />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e1f]/95 to-[#1a0a0a]/95" />
        </div>
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

      {/* Command Center — full dispatch center photo as in UI */}
      <section className="bg-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6">
            <span className="text-red-500 font-semibold text-sm uppercase tracking-widest">Command Center</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">ResQ Command Center</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Give city administrators and hospital networks a live window into every emergency — real-time incident map, fleet dispatch, and full analytics in one dashboard.
            </p>
          </div>
          {/* Full dispatch center image — exactly as in the brand creative */}
          <div className="rounded-2xl overflow-hidden shadow-2xl w-full mb-8">
            <img
              src="/dispatch-center.jpeg"
              alt="ResQ Dispatch Center — One Tap. One Location. One Dispatch."
              className="w-full h-auto object-cover"
            />
          </div>
          {/* Feature points below the image */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: "👆", title: "One Tap", desc: "Citizens trigger SOS and the whole network activates instantly." },
              { icon: "📍", title: "One Location", desc: "Precise GPS shared in real-time with every responder." },
              { icon: "🚑", title: "One Dispatch", desc: "AI routes the nearest ambulance in under 30 seconds." },
            ].map((f) => (
              <div key={f.title} className="bg-red-50 rounded-xl p-5 text-center border border-red-100">
                <span className="text-3xl block mb-2">{f.icon}</span>
                <h3 className="font-bold text-gray-900 mb-1">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/contact">
              <Button className="bg-red-500 hover:bg-red-600 text-white rounded-full px-8" data-testid="button-command-demo">
                Click here to book a demo →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Flow — exact match to design screenshot */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-14">Three Products. One Seamless Flow.</h2>
          <div className="flex flex-col md:flex-row items-start justify-center gap-0">
            {flow.map((step, i) => (
              <div key={step.step} className="flex flex-col md:flex-row items-center flex-1">
                <div className="flex flex-col items-center gap-2 px-2 py-2 flex-1" data-testid={`step-flow-${i}`}>
                  {/* Red circle with icon */}
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-md shadow-red-200 mb-1">
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  {/* Step label */}
                  <span className="text-red-500 text-sm font-semibold">Step {step.step}</span>
                  {/* Title */}
                  <span className="font-bold text-gray-900 text-base">{step.label}</span>
                  {/* Description */}
                  <span className="text-gray-400 text-xs max-w-[110px] text-center leading-relaxed">{step.desc}</span>
                </div>
                {/* Arrow between steps */}
                {i < flow.length - 1 && (
                  <div className="hidden md:flex items-center self-start mt-7">
                    <ArrowRight className="w-6 h-6 text-gray-300" />
                  </div>
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
