import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { MapPin, Phone, Clock, Shield, Heart, CheckCircle, AlertTriangle, Navigation, Wifi, User, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Phase = "idle" | "countdown" | "triggered" | "locating" | "dispatching" | "routing" | "arriving" | "complete";

const steps = [
  { id: "triggered", icon: "🆘", label: "SOS Triggered", desc: "Emergency broadcast sent with GPS location", color: "bg-red-500", time: 0 },
  { id: "locating", icon: "📍", label: "Location Shared", desc: "Precise coords sent to network in <2 sec", color: "bg-orange-500", time: 2000 },
  { id: "dispatching", icon: "🚑", label: "Ambulance Dispatched", desc: "AM-07 dispatched — 1.8 km away", color: "bg-amber-500", time: 4000 },
  { id: "routing", icon: "🚦", label: "Traffic Cleared", desc: "AI clears 4 signals on the route", color: "bg-blue-500", time: 6000 },
  { id: "arriving", icon: "👥", label: "Bystander Notified", desc: "Rahul (200m away) guided with first-aid", color: "bg-purple-500", time: 8000 },
  { id: "complete", icon: "✅", label: "Help is On the Way", desc: "ETA 3 min 40 sec — vs 18 min average", color: "bg-green-500", time: 10000 },
];

export default function Demo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [countdown, setCountdown] = useState(3);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const elapsedRef = useRef<NodeJS.Timeout | null>(null);

  function clearAllTimers() {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (elapsedRef.current) clearInterval(elapsedRef.current);
  }

  function reset() {
    clearAllTimers();
    setPhase("idle");
    setCountdown(3);
    setCompletedSteps([]);
    setActiveStep(null);
    setElapsed(0);
  }

  function triggerSOS() {
    if (phase !== "idle") return;
    setPhase("countdown");
    setCountdown(3);
  }

  useEffect(() => {
    if (phase === "countdown") {
      if (countdown > 0) {
        timerRef.current = setTimeout(() => setCountdown(c => c - 1), 1000);
      } else {
        setPhase("triggered");
      }
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [phase, countdown]);

  useEffect(() => {
    if (phase !== "triggered") return;

    setActiveStep("triggered");
    setCompletedSteps([]);

    elapsedRef.current = setInterval(() => setElapsed(e => e + 100), 100);

    const timers: NodeJS.Timeout[] = [];
    steps.forEach((step, i) => {
      const t = setTimeout(() => {
        setActiveStep(step.id);
        setCompletedSteps(prev => [...prev, ...(i > 0 ? [steps[i - 1].id] : [])]);
      }, step.time);
      timers.push(t);
    });

    const done = setTimeout(() => {
      setCompletedSteps(steps.map(s => s.id));
      setActiveStep(null);
      setPhase("complete");
      clearInterval(elapsedRef.current!);
    }, 12000);
    timers.push(done);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(elapsedRef.current!);
    };
  }, [phase]);

  const isActive = phase === "triggered" || phase === "complete";
  const elapsedSec = (elapsed / 1000).toFixed(1);

  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <Navbar />

      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/resq-logo.png" alt="ResQ" className="w-7 h-7 object-contain" />
            <div>
              <p className="text-white font-bold text-sm">ResQ Live Demo</p>
              <p className="text-gray-400 text-xs">Interactive SOS Simulation — for Hackathon Judges</p>
            </div>
          </div>
          {isActive && (
            <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/40 rounded-full px-3 py-1">
              <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
              <span className="text-red-400 text-xs font-bold">LIVE — {elapsedSec}s</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 flex flex-col gap-6">

        {/* Main SOS Interface */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Left — SOS Button Panel */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 flex flex-col items-center justify-center gap-6 min-h-80">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1">Citizen App — Emergency Trigger</p>
              <p className="text-white font-bold text-lg">One tap activates everything</p>
            </div>

            {/* SOS Button */}
            <div className="relative flex items-center justify-center">
              {/* Pulse rings when active */}
              {isActive && (
                <>
                  <div className="absolute w-48 h-48 bg-red-500/10 rounded-full animate-ping" />
                  <div className="absolute w-40 h-40 bg-red-500/20 rounded-full animate-ping" style={{ animationDelay: "0.3s" }} />
                </>
              )}
              {phase === "countdown" && (
                <>
                  <div className="absolute w-48 h-48 bg-yellow-500/10 rounded-full animate-ping" />
                </>
              )}

              <button
                onClick={phase === "idle" ? triggerSOS : undefined}
                disabled={phase === "countdown" || isActive}
                data-testid="button-sos-trigger"
                className={`relative w-36 h-36 rounded-full font-black text-white text-2xl shadow-2xl transition-all duration-300 flex flex-col items-center justify-center gap-1 select-none
                  ${phase === "idle" ? "bg-red-500 hover:bg-red-400 hover:scale-105 cursor-pointer shadow-red-500/50 active:scale-95" : ""}
                  ${phase === "countdown" ? "bg-yellow-500 cursor-not-allowed shadow-yellow-500/50 scale-110" : ""}
                  ${isActive ? "bg-red-600 cursor-not-allowed shadow-red-500/60 scale-105" : ""}
                `}
              >
                {phase === "idle" && (
                  <>
                    <span className="text-4xl">🆘</span>
                    <span className="text-sm font-bold tracking-widest">SOS</span>
                  </>
                )}
                {phase === "countdown" && (
                  <>
                    <span className="text-5xl font-black">{countdown}</span>
                    <span className="text-xs">cancelling...</span>
                  </>
                )}
                {isActive && (
                  <>
                    <span className="text-3xl">📡</span>
                    <span className="text-xs font-bold tracking-widest">ACTIVE</span>
                  </>
                )}
              </button>
            </div>

            {/* Cancel / Reset button */}
            {phase === "countdown" && (
              <button
                onClick={reset}
                className="bg-gray-700 hover:bg-gray-600 text-white rounded-full px-6 py-2.5 text-sm font-semibold transition-colors"
                data-testid="button-cancel-sos"
              >
                ✕ Cancel (accidental tap)
              </button>
            )}
            {phase === "complete" && (
              <button
                onClick={reset}
                className="bg-gray-700 hover:bg-gray-600 text-white rounded-full px-6 py-2.5 text-sm font-semibold transition-colors"
                data-testid="button-reset-demo"
              >
                ↺ Run Demo Again
              </button>
            )}
            {phase === "idle" && (
              <p className="text-gray-500 text-xs text-center max-w-[200px]">
                Tap the SOS button to start the simulation. A 3-second countdown allows accidental-tap cancellation.
              </p>
            )}
            {isActive && phase !== "complete" && (
              <p className="text-red-400 text-xs font-medium animate-pulse text-center">
                Emergency response in progress...
              </p>
            )}
          </div>

          {/* Right — Location / Info Panel */}
          <div className="flex flex-col gap-4">
            {/* Simulated GPS info */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
              <p className="text-gray-400 text-xs mb-3 font-semibold uppercase tracking-wider">Live Location</p>
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isActive ? "bg-red-500" : "bg-gray-700"}`}>
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">NH-48, Gurugram</p>
                  <p className={`text-xs mt-0.5 ${isActive ? "text-green-400" : "text-gray-500"}`}>
                    {isActive ? "28.4595° N, 77.0266° E — Broadcasting" : "Waiting for SOS trigger"}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">Accuracy: ±3 meters</p>
                </div>
              </div>
            </div>

            {/* Ambulance info */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
              <p className="text-gray-400 text-xs mb-3 font-semibold uppercase tracking-wider">Nearest Ambulance</p>
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${completedSteps.includes("dispatching") ? "bg-orange-500" : "bg-gray-700"}`}>
                  <span className="text-lg">🚑</span>
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">AM-07 — Ashoka Ambulance</p>
                  <p className="text-gray-400 text-xs mt-0.5">Driver: Ramesh Kumar · +91-98765-43210</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${completedSteps.includes("dispatching") ? "bg-orange-500/20 text-orange-400" : "bg-gray-700 text-gray-500"}`}>
                      {completedSteps.includes("dispatching") ? "🟢 En Route" : "⭕ Standby"}
                    </span>
                    <span className={`text-xs font-bold ${completedSteps.includes("dispatching") ? "text-white" : "text-gray-600"}`}>
                      {completedSteps.includes("dispatching") ? "ETA 3 min 40 sec" : "1.8 km away"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Nearest hospital */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
              <p className="text-gray-400 text-xs mb-3 font-semibold uppercase tracking-wider">Nearest Trauma Centre</p>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">🏥</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Ashoka Hospital, Gurugram</p>
                  <p className="text-gray-400 text-xs mt-0.5">3.5 km · Trauma dept. alerted</p>
                  <p className={`text-xs mt-1 font-medium ${completedSteps.includes("dispatching") ? "text-green-400" : "text-gray-600"}`}>
                    {completedSteps.includes("dispatching") ? "✓ ER bed reserved — blood type recorded" : "Awaiting dispatch confirmation"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step-by-step simulation log */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-4">Response Timeline</p>
          <div className="space-y-3">
            {steps.map((step, i) => {
              const done = completedSteps.includes(step.id);
              const active = activeStep === step.id;
              return (
                <div
                  key={step.id}
                  className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-500 ${active ? "bg-gray-800 border border-gray-600" : done ? "opacity-100" : "opacity-25"}`}
                  data-testid={`demo-step-${step.id}`}
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-base ${active ? step.color : done ? "bg-green-600" : "bg-gray-700"}`}>
                    {done ? "✓" : step.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-semibold">{step.label}</p>
                    <p className="text-gray-400 text-xs">{step.desc}</p>
                  </div>
                  <div className="text-right">
                    {done && <span className="text-green-400 text-xs font-bold">✓ Done</span>}
                    {active && <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse inline-block" />}
                    {!done && !active && <span className="text-gray-600 text-xs">{(step.time / 1000).toFixed(0)}s</span>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Final result */}
          {phase === "complete" && (
            <div className="mt-5 p-4 bg-green-900/30 border border-green-700 rounded-xl">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="text-green-400 font-bold text-base">✅ Emergency response initiated successfully</p>
                  <p className="text-green-300/70 text-sm mt-0.5">Total system response time: <strong>~10 seconds</strong></p>
                </div>
                <div className="text-right">
                  <p className="text-white font-black text-2xl">3:40 <span className="text-green-400 text-base">ETA</span></p>
                  <p className="text-gray-400 text-xs">vs 18 min national average</p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3 text-center">
                {[
                  { label: "Ambulance", val: "Dispatched" },
                  { label: "Signals Cleared", val: "4 signals" },
                  { label: "Bystanders", val: "1 notified" },
                ].map(s => (
                  <div key={s.label} className="bg-green-900/30 rounded-lg p-2">
                    <p className="text-green-300 text-xs font-bold">{s.val}</p>
                    <p className="text-green-300/60 text-xs">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Features demonstrated */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: "⚡", label: "Auto Detection", desc: "Crash detected via sensors" },
            { icon: "📡", label: "Real-time GPS", desc: "±3m accuracy broadcast" },
            { icon: "🚦", label: "AI Routing", desc: "Traffic signals cleared" },
            { icon: "👥", label: "Crowd Response", desc: "Bystanders guided" },
          ].map(f => (
            <div key={f.label} className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center hover:border-red-500/40 transition-colors">
              <span className="text-2xl block mb-2">{f.icon}</span>
              <p className="text-white text-sm font-semibold">{f.label}</p>
              <p className="text-gray-500 text-xs mt-1">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Nav to other pages */}
        <div className="flex flex-wrap gap-3 justify-center pb-4">
          <Link href="/product">
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white rounded-full" data-testid="button-demo-product">
              View Full Product →
            </Button>
          </Link>
          <Link href="/contact">
            <Button className="bg-red-500 hover:bg-red-600 text-white rounded-full" data-testid="button-demo-contact">
              Request Real Demo
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
