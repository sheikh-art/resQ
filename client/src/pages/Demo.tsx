import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { MapPin, AlertOctagon, Navigation, Truck, TrafficCone, Users, CheckCircle2, Zap, Radio, ShieldCheck, UserCheck, RotateCcw, ExternalLink, Hospital } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Phase = "idle" | "countdown" | "triggered" | "complete";
type LocStatus = "idle" | "fetching" | "found" | "denied";

interface GeoLocation {
  lat: number;
  lng: number;
  accuracy: number;
  city?: string;
  area?: string;
  country?: string;
}

interface TraumaInfo {
  name: string;
  distance: string;
  eta: string;
}

const steps = [
  { id: "triggered",   Icon: AlertOctagon,  label: "SOS Triggered",        desc: "Emergency broadcast sent with GPS location",         ms: 0 },
  { id: "locating",    Icon: Navigation,     label: "Location Shared",       desc: "Precise coordinates sent to network in < 2 sec",     ms: 2000 },
  { id: "dispatching", Icon: Truck,          label: "Ambulance Dispatched",  desc: "AM-07 dispatched — 1.8 km away",                     ms: 4000 },
  { id: "routing",     Icon: TrafficCone,    label: "Traffic Cleared",       desc: "AI clears 4 signals on the route automatically",     ms: 6000 },
  { id: "bystander",   Icon: UserCheck,      label: "Bystander Notified",    desc: "Nearest trained volunteer guided with first-aid",    ms: 8000 },
  { id: "complete",    Icon: CheckCircle2,   label: "Help is On the Way",    desc: "ETA 3 min 40 sec — vs 18 min national average",      ms: 10000 },
];

const featureCards = [
  { Icon: Zap,       label: "Auto Detection",  desc: "Crash detected via sensors" },
  { Icon: Radio,     label: "Real-time GPS",   desc: "High-accuracy broadcast" },
  { Icon: TrafficCone, label: "AI Routing",    desc: "Traffic signals cleared" },
  { Icon: Users,     label: "Crowd Response",  desc: "Bystanders guided live" },
];

function getTraumaByCity(city?: string): TraumaInfo {
  const c = (city || "").toLowerCase();
  if (c.includes("delhi") || c.includes("gurugram") || c.includes("gurgaon") || c.includes("noida") || c.includes("faridabad"))
    return { name: "AIIMS Trauma Centre, New Delhi", distance: "3.2 km", eta: "4 min" };
  if (c.includes("mumbai") || c.includes("thane") || c.includes("pune"))
    return { name: "KEM Hospital Trauma Unit, Mumbai", distance: "2.8 km", eta: "3 min" };
  if (c.includes("bengaluru") || c.includes("bangalore"))
    return { name: "Manipal Hospital Trauma Centre, Bengaluru", distance: "4.1 km", eta: "5 min" };
  if (c.includes("hyderabad") || c.includes("secunderabad"))
    return { name: "Yashoda Trauma Centre, Hyderabad", distance: "3.5 km", eta: "4 min" };
  if (c.includes("chennai"))
    return { name: "Government Stanley Hospital, Chennai", distance: "2.9 km", eta: "4 min" };
  if (c.includes("kolkata"))
    return { name: "SSKM Hospital Trauma Unit, Kolkata", distance: "3.7 km", eta: "5 min" };
  return { name: "Nearest Trauma Centre (auto-routed)", distance: "< 5 km", eta: "< 6 min" };
}

export default function Demo() {
  const [phase, setPhase]           = useState<Phase>("idle");
  const [countdown, setCountdown]   = useState(3);
  const [completed, setCompleted]   = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [elapsed, setElapsed]       = useState(0);
  const [loc, setLoc]               = useState<GeoLocation | null>(null);
  const [locStatus, setLocStatus]   = useState<LocStatus>("idle");
  const [trauma, setTrauma]         = useState<TraumaInfo>({ name: "Ashoka Hospital, Gurugram", distance: "3.5 km", eta: "5 min" });
  const elapsedRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function clearTimers() { if (elapsedRef.current) clearInterval(elapsedRef.current); }

  function reset() {
    clearTimers();
    setPhase("idle"); setCountdown(3); setCompleted([]); setActiveStep(null);
    setElapsed(0); setLoc(null); setLocStatus("idle");
    setTrauma({ name: "Ashoka Hospital, Gurugram", distance: "3.5 km", eta: "5 min" });
  }

  async function reverseGeocode(lat: number, lng: number) {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
        { headers: { "Accept-Language": "en" } }
      );
      const data = await res.json();
      const city = data.address?.city || data.address?.town || data.address?.village || data.address?.county || "";
      const area = data.address?.suburb || data.address?.neighbourhood || data.address?.road || "";
      const country = data.address?.country || "";
      setLoc(prev => prev ? { ...prev, city, area, country } : prev);
      setTrauma(getTraumaByCity(city));
    } catch {
      setTrauma(getTraumaByCity(""));
    }
  }

  function fetchLocation() {
    if (!navigator.geolocation) { setLocStatus("denied"); return; }
    setLocStatus("fetching");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const l: GeoLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: Math.round(pos.coords.accuracy) };
        setLoc(l);
        setLocStatus("found");
        reverseGeocode(l.lat, l.lng);
      },
      () => setLocStatus("denied"),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }

  function triggerSOS() {
    if (phase !== "idle") return;
    fetchLocation();
    setPhase("countdown");
    setCountdown(3);
  }

  // Countdown → triggered
  useEffect(() => {
    if (phase !== "countdown") return;
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(t);
    } else {
      setPhase("triggered");
    }
  }, [phase, countdown]);

  // Run simulation
  useEffect(() => {
    if (phase !== "triggered") return;
    setActiveStep("triggered");
    setCompleted([]);
    elapsedRef.current = setInterval(() => setElapsed(e => e + 100), 100);

    const timers: ReturnType<typeof setTimeout>[] = [];
    steps.forEach((step, i) => {
      const t = setTimeout(() => {
        setActiveStep(step.id);
        if (i > 0) setCompleted(prev => [...prev, steps[i - 1].id]);
      }, step.ms);
      timers.push(t);
    });
    const done = setTimeout(() => {
      setCompleted(steps.map(s => s.id));
      setActiveStep(null);
      setPhase("complete");
      clearInterval(elapsedRef.current!);
    }, 12000);
    timers.push(done);

    return () => { timers.forEach(clearTimeout); clearInterval(elapsedRef.current!); };
  }, [phase]);

  const isActive = phase === "triggered" || phase === "complete";
  const elapsedSec = (elapsed / 1000).toFixed(1);

  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <Navbar />

      {/* Sub-header */}
      <div className="bg-gray-900 border-b border-gray-800 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/resq-logo.png" alt="ResQ" className="w-7 h-7 object-contain" />
            <div>
              <p className="text-white font-semibold text-sm">ResQ Live Demo</p>
              <p className="text-gray-500 text-xs">Interactive SOS simulation — Hackathon Demo</p>
            </div>
          </div>
          {isActive && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
              <span className="text-red-400 text-xs font-semibold tracking-wide">LIVE — {elapsedSec}s</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 flex flex-col gap-5">

        {/* Top grid: SOS panel + Info panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* SOS Button Panel */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8 flex flex-col items-center justify-center gap-6 min-h-80">
            <div className="text-center">
              <p className="text-gray-500 text-xs tracking-widest uppercase mb-1">Citizen App — Emergency Trigger</p>
              <p className="text-white font-semibold text-base">One tap activates everything</p>
            </div>

            {/* SOS Button */}
            <div className="relative flex items-center justify-center">
              {isActive && (
                <>
                  <div className="absolute w-52 h-52 rounded-full bg-red-500/8 animate-ping" style={{ animationDuration: "2s" }} />
                  <div className="absolute w-44 h-44 rounded-full bg-red-500/12 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.4s" }} />
                </>
              )}
              {phase === "countdown" && (
                <div className="absolute w-44 h-44 rounded-full bg-amber-500/15 animate-ping" style={{ animationDuration: "1s" }} />
              )}

              <button
                onClick={phase === "idle" ? triggerSOS : undefined}
                disabled={phase !== "idle"}
                data-testid="button-sos-trigger"
                className={`relative w-36 h-36 rounded-full font-bold text-white flex flex-col items-center justify-center gap-1.5 transition-all duration-300 select-none
                  ${phase === "idle" ? "bg-red-600 hover:bg-red-500 hover:scale-105 cursor-pointer shadow-[0_0_40px_rgba(239,68,68,0.4)]" : ""}
                  ${phase === "countdown" ? "bg-amber-500 cursor-default shadow-[0_0_40px_rgba(245,158,11,0.4)] scale-110" : ""}
                  ${isActive ? "bg-red-700 cursor-default shadow-[0_0_50px_rgba(239,68,68,0.5)] scale-105" : ""}
                `}
              >
                {phase === "idle" && (
                  <>
                    <AlertOctagon className="w-8 h-8" strokeWidth={1.5} />
                    <span className="text-sm font-black tracking-[0.2em]">SOS</span>
                  </>
                )}
                {phase === "countdown" && (
                  <>
                    <span className="text-5xl font-black leading-none">{countdown}</span>
                    <span className="text-[10px] tracking-wider opacity-80">CANCEL?</span>
                  </>
                )}
                {isActive && (
                  <>
                    <Radio className="w-7 h-7 animate-pulse" strokeWidth={1.5} />
                    <span className="text-xs font-black tracking-[0.15em]">ACTIVE</span>
                  </>
                )}
              </button>
            </div>

            {phase === "countdown" && (
              <button
                onClick={reset}
                className="text-sm text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 rounded-full px-5 py-2 transition-colors"
                data-testid="button-cancel-sos"
              >
                Cancel — accidental tap
              </button>
            )}
            {phase === "complete" && (
              <button
                onClick={reset}
                data-testid="button-reset-demo"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 rounded-full px-5 py-2 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Run Demo Again
              </button>
            )}
            {phase === "idle" && (
              <p className="text-gray-600 text-xs text-center max-w-[200px] leading-relaxed">
                Tap SOS to start. 3-second countdown allows accidental-tap cancellation.
              </p>
            )}
            {phase === "triggered" && (
              <p className="text-red-400/80 text-xs font-medium tracking-wide text-center">
                Emergency response in progress
              </p>
            )}
          </div>

          {/* Right info panels */}
          <div className="flex flex-col gap-4">

            {/* Live Location */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
              <div className="flex items-center gap-2 mb-3">
                <p className="text-gray-500 text-[11px] font-semibold uppercase tracking-widest">Live Location</p>
                {locStatus === "fetching" && <span className="text-amber-400 text-[10px] animate-pulse">• Acquiring GPS</span>}
                {locStatus === "found"    && <span className="text-emerald-400 text-[10px]">• GPS Locked</span>}
                {locStatus === "denied"   && <span className="text-red-400 text-[10px]">• Permission denied</span>}
              </div>
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors
                  ${locStatus === "found" ? "bg-red-600" : locStatus === "fetching" ? "bg-amber-500" : "bg-gray-800"}`}>
                  <MapPin className="w-4 h-4 text-white" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  {locStatus === "idle" && (
                    <p className="text-gray-500 text-sm">Waiting for SOS trigger</p>
                  )}
                  {locStatus === "fetching" && (
                    <p className="text-amber-400 text-sm animate-pulse">Acquiring GPS signal…</p>
                  )}
                  {locStatus === "found" && loc && (
                    <>
                      {loc.city && <p className="text-white font-semibold text-sm">{loc.area ? `${loc.area}, ` : ""}{loc.city}</p>}
                      <p className="text-gray-400 font-mono text-xs mt-0.5">{loc.lat.toFixed(5)}° N, {loc.lng.toFixed(5)}° E</p>
                      <p className="text-gray-600 text-xs mt-0.5">Accuracy ±{loc.accuracy} m</p>
                      <a
                        href={`https://www.google.com/maps?q=${loc.lat},${loc.lng}`}
                        target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs mt-1.5 transition-colors"
                        data-testid="link-open-maps"
                      >
                        View on Google Maps <ExternalLink className="w-3 h-3" />
                      </a>
                    </>
                  )}
                  {locStatus === "denied" && (
                    <>
                      <p className="text-red-400 text-sm">Location permission denied</p>
                      <button onClick={() => { setLocStatus("idle"); fetchLocation(); }} className="text-blue-400 hover:text-blue-300 text-xs mt-1 transition-colors" data-testid="button-retry-location">
                        Retry →
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Nearest Ambulance */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
              <p className="text-gray-500 text-[11px] font-semibold uppercase tracking-widest mb-3">Nearest Ambulance</p>
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors
                  ${completed.includes("dispatching") ? "bg-orange-500" : "bg-gray-800"}`}>
                  <Truck className="w-4 h-4 text-white" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">AM-07 — Ashoka Ambulance</p>
                  <p className="text-gray-500 text-xs mt-0.5">Driver: Ramesh Kumar · +91-98765-43210</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold border
                      ${completed.includes("dispatching")
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-gray-800 text-gray-500 border-gray-700"}`}>
                      {completed.includes("dispatching") ? "En Route" : "Standby"}
                    </span>
                    <span className={`text-xs font-semibold ${completed.includes("dispatching") ? "text-white" : "text-gray-600"}`}>
                      {completed.includes("dispatching") ? "ETA 3 min 40 sec" : "1.8 km away"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Nearest Trauma Centre — updates with real location */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
              <p className="text-gray-500 text-[11px] font-semibold uppercase tracking-widest mb-3">Nearest Trauma Centre</p>
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors
                  ${completed.includes("dispatching") ? "bg-red-600" : "bg-gray-800"}`}>
                  <Hospital className="w-4 h-4 text-white" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <p className={`font-semibold text-sm transition-colors ${locStatus === "found" ? "text-white" : "text-gray-300"}`}>
                    {trauma.name}
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">{trauma.distance} · Trauma dept. alerted</p>
                  <p className={`text-xs mt-1.5 font-medium transition-colors
                    ${completed.includes("dispatching") ? "text-emerald-400" : "text-gray-600"}`}>
                    {completed.includes("dispatching")
                      ? `ER bed reserved · ETA ${trauma.eta}`
                      : locStatus === "found" ? "Located based on your GPS" : "Awaiting dispatch confirmation"}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Response Timeline */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
          <p className="text-gray-500 text-[11px] font-semibold uppercase tracking-widest mb-4">Response Timeline</p>
          <div className="space-y-2">
            {steps.map((step, i) => {
              const done   = completed.includes(step.id);
              const active = activeStep === step.id;
              return (
                <div
                  key={step.id}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-500
                    ${active ? "bg-gray-800 border border-gray-700" : done ? "opacity-100" : "opacity-20"}`}
                  data-testid={`demo-step-${step.id}`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors
                    ${done   ? "bg-emerald-600" : active ? "bg-red-600" : "bg-gray-800"}`}>
                    {done
                      ? <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={1.5} />
                      : <step.Icon className="w-4 h-4 text-white" strokeWidth={1.5} />}
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-semibold">{step.label}</p>
                    <p className="text-gray-500 text-xs">{step.desc}</p>
                  </div>
                  <div className="text-right w-10 flex-shrink-0">
                    {done   && <span className="text-emerald-400 text-xs">Done</span>}
                    {active && <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse inline-block" />}
                    {!done && !active && <span className="text-gray-700 text-xs">{(step.ms / 1000).toFixed(0)}s</span>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Final result */}
          {phase === "complete" && (
            <div className="mt-5 p-4 bg-emerald-900/20 border border-emerald-700/40 rounded-xl">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="text-emerald-400 font-semibold text-sm">Emergency response successfully initiated</p>
                  <p className="text-gray-500 text-xs mt-0.5">Total system response time: ~10 seconds</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-black text-2xl">3<span className="text-base font-semibold">m</span> 40<span className="text-base font-semibold">s</span></p>
                  <p className="text-gray-500 text-xs">vs 18 min national average</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { label: "Ambulance",       val: "Dispatched" },
                  { label: "Signals Cleared", val: "4 signals" },
                  { label: "Bystanders",      val: "1 notified" },
                ].map(s => (
                  <div key={s.label} className="bg-emerald-900/20 border border-emerald-800/30 rounded-lg p-2.5 text-center">
                    <p className="text-emerald-300 text-xs font-semibold">{s.val}</p>
                    <p className="text-gray-600 text-xs mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {featureCards.map(f => (
            <div key={f.label} className="bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-xl p-4 transition-colors">
              <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center mb-3">
                <f.Icon className="w-4 h-4 text-red-400" strokeWidth={1.5} />
              </div>
              <p className="text-white text-sm font-semibold">{f.label}</p>
              <p className="text-gray-600 text-xs mt-1">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 justify-center pb-4">
          <Link href="/product">
            <Button variant="outline" className="border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full text-sm" data-testid="button-demo-product">
              View Full Product
            </Button>
          </Link>
          <Link href="/contact">
            <Button className="bg-red-600 hover:bg-red-500 text-white rounded-full text-sm" data-testid="button-demo-contact">
              Request Live Demo
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
