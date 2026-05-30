import { Link } from "wouter";
import { Shield, MapPin, Heart, Ambulance, Navigation, Bell, Clock, Wifi, ChevronDown, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features = [
  { icon: Ambulance, title: "Ambulance Details", desc: "Real-time ambulance tracking with driver details, ETA and route info." },
  { icon: Navigation, title: "AI Smart Routing", desc: "AI-powered routing clears traffic signals and finds the fastest path." },
  { icon: Bell, title: "See Top SOS", desc: "View and respond to nearest active SOS calls in your area instantly." },
  { icon: Heart, title: "Bystander Help", desc: "Guide bystanders with first-aid instructions until help arrives." },
  { icon: Clock, title: "History / Alert", desc: "Full incident history, alerts and notifications for responders." },
  { icon: Wifi, title: "Offline Mode", desc: "Core features work without internet — because emergencies don't wait." },
];

const faqs = [
  { q: "How does ResQ detect an emergency automatically?", a: "ResQ uses crash detection via phone sensors (accelerometer, gyroscope) combined with GPS location to automatically trigger SOS alerts when a collision is detected." },
  { q: "What if someone activates SOS by accident?", a: "There's a 10-second cancellation window after SOS is triggered. You can cancel with a single tap before alerts are dispatched to responders." },
  { q: "How does ResQ notify emergency services?", a: "ResQ instantly notifies the nearest registered ambulance, hospital, and trained bystanders simultaneously — reducing average response time by 40%." },
  { q: "Does it work without internet connectivity?", a: "Yes. ResQ stores critical emergency data locally and uses SMS fallback when internet is unavailable, ensuring functionality even in remote areas." },
  { q: "How does AI smart routing help ambulances?", a: "Our AI system communicates with traffic management infrastructure to turn signals green on the ambulance route and guide the fastest available path in real time." },
];

const team = [
  { name: "Arjun Sharma", role: "Co-Founder & CEO", initials: "AS", color: "bg-red-500" },
  { name: "Priya Nair", role: "Co-Founder & CTO", initials: "PN", color: "bg-blue-500" },
  { name: "Rohan Mehta", role: "Head of Product", initials: "RM", color: "bg-green-500" },
  { name: "Sneha Patel", role: "Head of Design", initials: "SP", color: "bg-purple-500" },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[#0a0e1f] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e1f] via-[#0d1433] to-[#1a0a0a] opacity-90" />
        <div className="absolute inset-0" style={{backgroundImage:"radial-gradient(ellipse at 70% 50%, rgba(229,62,62,0.15) 0%, transparent 60%)"}} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 md:py-32 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-red-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-red-500/30">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            India's #1 Emergency Response Platform
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 max-w-3xl">
            Every Second<br /><span className="text-red-400">Counts.</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
            ResQ connects accident victims, bystanders, ambulances and hospitals in one seamless, AI-powered emergency network.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/product">
              <Button className="bg-red-500 hover:bg-red-600 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-red-500/30" data-testid="button-hero-learn">
                See How It Works <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-base bg-transparent" data-testid="button-hero-contact">
                Get In Touch
              </Button>
            </Link>
          </div>
          <div className="mt-16 flex items-center flex-col gap-2 text-gray-400 text-sm animate-bounce">
            <span>scroll</span>
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Every Second Counts</h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-12">Road accidents are one of India's biggest crises — and most deaths are preventable with faster response.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center p-6 bg-red-50 rounded-2xl">
              <span className="text-5xl font-bold text-red-500 mb-2">2k+</span>
              <span className="text-gray-600 text-sm font-medium">Road accident deaths per day in India</span>
            </div>
            <div className="flex flex-col items-center p-6 bg-red-50 rounded-2xl border-2 border-red-200">
              <span className="text-5xl font-bold text-red-500 mb-2">98%</span>
              <span className="text-gray-600 text-sm font-medium">Preventable with timely response</span>
            </div>
            <div className="flex flex-col items-center p-6 bg-red-50 rounded-2xl">
              <span className="text-5xl font-bold text-red-500 mb-2">18 min</span>
              <span className="text-gray-600 text-sm font-medium">Average ambulance wait time currently</span>
            </div>
          </div>
        </div>
      </section>

      {/* Three Steps */}
      <section className="bg-red-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-red-500 font-semibold text-sm uppercase tracking-widest">How it works</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">Three Steps. That's It.</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-12">ResQ's system activates instantly, coordinates automatically, and saves lives — in three simple steps.</p>
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

      {/* Impact Numbers */}
      <section className="bg-red-500 py-16 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-10">Built for Impact, Built for India</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { num: "200m+", label: "Indians at risk on roads daily" },
              { num: "80k+", label: "Registered responders & volunteers" },
              { num: "3,200+", label: "Lives impacted in pilot phase" },
            ].map((s) => (
              <div key={s.num} className="flex flex-col items-center" data-testid={`stat-${s.num}`}>
                <span className="text-4xl md:text-5xl font-black mb-2">{s.num}</span>
                <span className="text-red-100 text-sm">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-red-500 font-semibold text-sm uppercase tracking-widest">Team</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">Built by Innovators, for India</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-12">Our team combines experience from healthcare, AI, and mobility to solve one of India's hardest problems.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow" data-testid={`card-team-${member.name.split(' ')[0].toLowerCase()}`}>
                <div className={`w-16 h-16 ${member.color} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                  {member.initials}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{member.name}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{member.role}</p>
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
