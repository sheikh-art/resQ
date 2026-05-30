import { useState } from "react";
import { Mail, Phone, MapPin, Slack, Send, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const contactMethods = [
  { icon: Mail, title: "Email", detail: "hello@resq.in", sub: "We reply within 24 hours", color: "text-blue-500", bg: "bg-blue-50" },
  { icon: Phone, title: "Phone", detail: "+91 98765 43210", sub: "Mon–Fri, 9am–6pm IST", color: "text-green-500", bg: "bg-green-50" },
  { icon: MapPin, title: "Office", detail: "Bengaluru, Karnataka", sub: "Koramangala, 560034", color: "text-orange-500", bg: "bg-orange-50" },
  { icon: Slack, title: "Slack", detail: "resq-community.slack.com", sub: "Join our open community", color: "text-purple-500", bg: "bg-purple-50" },
];

export default function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
    toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-gray-50 py-16 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-red-500 font-semibold text-sm uppercase tracking-widest">Contact</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            Get in Touch with <span className="text-red-500">ResQ</span>
          </h1>
          <p className="text-gray-500 max-w-md mx-auto text-lg">
            Whether you're a hospital, city authority, investor or just want to help — we'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactMethods.map((c) => (
              <div key={c.title} className="rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow" data-testid={`card-contact-${c.title.toLowerCase()}`}>
                <div className={`w-12 h-12 ${c.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <c.icon className={`w-5 h-5 ${c.color}`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{c.title}</h3>
                <p className="text-gray-700 text-sm font-medium mb-1">{c.detail}</p>
                <p className="text-gray-400 text-xs">{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-red-500 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-3">Send a Message</h2>
              <p className="text-red-100">Tell us how we can work together — we'll get back to you within 24 hours.</p>
            </div>

            {sent ? (
              <div className="bg-white rounded-2xl p-10 text-center" data-testid="status-form-sent">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-500 mb-6">Thanks for reaching out, {form.name}. We'll reply to {form.email} within 24 hours.</p>
                <Button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  variant="outline"
                  className="border-red-200 text-red-500 hover:bg-red-50 rounded-full"
                  data-testid="button-send-another"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 space-y-4" data-testid="form-contact">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Name <span className="text-red-500">*</span></label>
                    <Input
                      name="name"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                      className="rounded-xl border-gray-200"
                      data-testid="input-name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email <span className="text-red-500">*</span></label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      className="rounded-xl border-gray-200"
                      data-testid="input-email"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Subject</label>
                  <Input
                    name="subject"
                    placeholder="What's this about?"
                    value={form.subject}
                    onChange={handleChange}
                    className="rounded-xl border-gray-200"
                    data-testid="input-subject"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Message <span className="text-red-500">*</span></label>
                  <Textarea
                    name="message"
                    placeholder="Tell us more about how you'd like to collaborate, partner, or get involved..."
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    className="rounded-xl border-gray-200 resize-none"
                    data-testid="input-message"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl py-5 font-semibold"
                  data-testid="button-submit-contact"
                >
                  {loading ? (
                    <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending…</span>
                  ) : (
                    <span className="flex items-center gap-2"><Send className="w-4 h-4" /> Send Message</span>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* See ResQ in Action CTA */}
      <section className="bg-white py-16 text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">See ResQ in Action</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-8">Watch a live demo of the platform, or explore our product overview to understand how ResQ works.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/product">
              <Button className="bg-red-500 hover:bg-red-600 text-white rounded-full px-8 py-6 text-base font-semibold" data-testid="button-contact-demo">
                View Product <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50 rounded-full px-8 py-6 text-base" data-testid="button-contact-about">
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
