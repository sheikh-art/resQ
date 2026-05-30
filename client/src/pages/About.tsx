import { Link } from "wouter";
import { Shield, ArrowRight, Heart, Lightbulb, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const timeline = [
  { year: "2021", title: "The Idea", desc: "After witnessing a road accident with no ambulance arriving for 45 minutes, our founders decided to build the solution India needed." },
  { year: "2022", title: "First Prototype", desc: "Built a basic SOS app in 3 months. Tested with 50 volunteers in Delhi — average response time dropped from 18 minutes to 6." },
  { year: "2023", title: "Pilot Launch", desc: "Expanded to 3 cities. Partnered with 12 ambulance services. First life officially saved — a 34-year-old father on NH-48." },
  { year: "2024", title: "Platform Scale", desc: "Launched the Command Center for municipal corporations. Now active in 8 cities with 80,000+ registered responders." },
];

const values = [
  { icon: Heart, title: "Lives First", desc: "Every product decision is made by asking: does this save lives faster? Nothing else comes before it." },
  { icon: Lightbulb, title: "Radical Simplicity", desc: "Emergency tools must work in a panic. We obsess over making ResQ intuitive enough for anyone, anywhere." },
  { icon: Users, title: "Built for Bharat", desc: "We design for real Indian conditions — patchy internet, diverse languages, chaotic traffic, and infrastructure gaps." },
  { icon: Target, title: "Measurable Impact", desc: "We track every response time, every life saved, every preventable death avoided. Impact is our only metric." },
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero — ambulance+phone image as background */}
      <section className="relative text-white py-24 md:py-32 overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <img src="/ambulance-phone.jpeg" alt="" className="w-full h-full object-cover opacity-30" style={{objectPosition: '50% 50%'}} />
          <div className="absolute inset-0 bg-[#0a0e1f]/90" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center w-full">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
            <Shield className="w-3.5 h-3.5 text-red-400" />
            Our Mission
          </span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 max-w-3xl mx-auto">
            We're on a Mission to Make<br />
            <span className="text-red-400">Indian Roads Safer.</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            1.5 lakh people die on Indian roads every year. Most of them don't have to. We built ResQ to change that — one second at a time.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-red-500 font-semibold text-sm uppercase tracking-widest">The Problem</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-5">From an Idea to a Life-Saving Movement</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                India loses over 1.5 lakh lives to road accidents every year. That's more than 400 deaths every single day. The leading cause isn't poor driving — it's poor emergency response.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                The average ambulance takes 18 minutes to arrive. The critical "golden hour" after a crash is the difference between life and death. We're here to close that gap.
              </p>
              <p className="text-gray-600 leading-relaxed">
                ResQ was born from a personal encounter with this failure — and a conviction that technology, applied thoughtfully, can fix it.
              </p>
            </div>
            {/* Right side — phone with Emergency Tap (right half of ambulance-phone image) */}
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/ambulance-phone.jpeg"
                alt="ResQ Emergency Tap App"
                className="w-full h-full object-cover"
                style={{ objectPosition: "100% 50%" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-red-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-red-500 font-semibold text-sm uppercase tracking-widest">Impact So Far</span>
          <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-12">1.5 Lakh Lives Lost Every Year. Most of Them Preventable.</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { num: "8", label: "Cities Active" },
              { num: "80k+", label: "Registered Responders" },
              { num: "3,200+", label: "Lives Impacted" },
              { num: "4.2 min", label: "Avg Response Time" },
            ].map((s) => (
              <div key={s.num} className="bg-white rounded-2xl p-6 shadow-sm" data-testid={`stat-impact-${s.label.replace(/\s+/g,'-').toLowerCase()}`}>
                <div className="text-4xl font-black text-red-500 mb-2">{s.num}</div>
                <div className="text-gray-500 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-red-500 font-semibold text-sm uppercase tracking-widest">Our Journey</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">From Idea to Movement</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-red-100" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div key={i} className="relative flex gap-6" data-testid={`timeline-item-${i}`}>
                  <div className="relative z-10 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {item.year}
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-red-500 font-semibold text-sm uppercase tracking-widest">Our Values</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">What Drives Us</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow flex gap-4" data-testid={`card-value-${v.title.replace(/\s+/g,'-').toLowerCase()}`}>
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <v.icon className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1.5">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* "Why We Built" — full ambulance+phone image as the UI shows */}
      <section className="bg-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <span className="text-red-500 font-semibold text-sm uppercase tracking-widest block mb-4">Why We Built</span>
          {/* Full image — exactly as in the brand creative */}
          <div className="rounded-2xl overflow-hidden shadow-2xl w-full">
            <img
              src="/ambulance-phone.jpeg"
              alt="This isn't just a product — It's a response to a real failure"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-red-500 py-16 text-white text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make Indian Roads Safer?</h2>
          <p className="text-red-100 max-w-md mx-auto mb-8">Join the movement. Partner, volunteer, or integrate ResQ into your service.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact">
              <Button className="bg-white text-red-500 hover:bg-red-50 rounded-full px-8 py-6 text-base font-semibold" data-testid="button-about-cta-join">
                Partner with Us
              </Button>
            </Link>
            <Link href="/product">
              <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded-full px-8 py-6 text-base bg-transparent" data-testid="button-about-cta-product">
                Request Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
