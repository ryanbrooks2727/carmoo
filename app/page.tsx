"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const Brand = () => <span style={{ fontWeight: 700, textTransform: "lowercase" }}>carmoo</span>;

const CONFETTI_COUNT = 46;
const CONFETTI_COLORS = ["#7a52e6", "#9b6ef3", "#6a3fd1", "#b794f6", "#8c5ce8", "#ffd166", "#ff8fa3", "#4ecdc4", "#f4a300"];
const CONFETTI_X_MIN = 128;
const CONFETTI_X_MAX = 172;
const CONFETTI_Y_TOP = 14;
const CONFETTI_Y_SPAWN_TOP = 60;
const CONFETTI_Y_BOTTOM = 106;

function makeConfettiParticle(spreadInitially: boolean) {
  return {
    baseX: CONFETTI_X_MIN + Math.random() * (CONFETTI_X_MAX - CONFETTI_X_MIN),
    y: spreadInitially ? CONFETTI_Y_SPAWN_TOP + Math.random() * (CONFETTI_Y_BOTTOM - CONFETTI_Y_SPAWN_TOP) : CONFETTI_Y_TOP + Math.random() * 15,
    fallSpeed: 5 + Math.random() * 4,
    swayAmp1: 3 + Math.random() * 5,
    swayFreq1: 0.35 + Math.random() * 0.35,
    swayPhase1: Math.random() * Math.PI * 2,
    swayAmp2: 1 + Math.random() * 2.5,
    swayFreq2: 0.8 + Math.random() * 0.7,
    swayPhase2: Math.random() * Math.PI * 2,
    rotation: Math.random() * 360,
    spin: (Math.random() - 0.5) * 140,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    shape: Math.floor(Math.random() * 3),
    scale: 0.75 + Math.random() * 0.6,
  };
}

const Confetti = () => {
  const groupRefs = useRef<(SVGGElement | null)[]>([]);
  const particlesRef = useRef<ReturnType<typeof makeConfettiParticle>[]>([]);
  const [particles, setParticles] = useState<ReturnType<typeof makeConfettiParticle>[] | null>(null);

  useEffect(() => {
    const generated = Array.from({ length: CONFETTI_COUNT }, () => makeConfettiParticle(false));
    particlesRef.current = generated;
    setParticles(generated);
  }, []);

  useEffect(() => {
    if (!particles) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const applyTransform = (i: number) => {
      const p = particlesRef.current[i];
      // Keep sway within the car's width so pieces never stray past its edges.
      const x = Math.max(CONFETTI_X_MIN, Math.min(CONFETTI_X_MAX, p.baseX + Math.sin(p.swayPhase1) * p.swayAmp1 + Math.sin(p.swayPhase2) * p.swayAmp2));
      const el = groupRefs.current[i];
      if (!el) return;
      el.setAttribute("transform", `translate(${x.toFixed(2)},${p.y.toFixed(2)}) rotate(${(p.rotation % 360).toFixed(1)}) scale(${p.scale.toFixed(2)})`);
    };

    particlesRef.current.forEach((_, i) => applyTransform(i));
    if (reduceMotion) return;

    let lastTime = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      particlesRef.current.forEach((p, i) => {
        p.y += p.fallSpeed * dt;
        p.swayPhase1 += p.swayFreq1 * dt;
        p.swayPhase2 += p.swayFreq2 * dt;
        p.rotation += p.spin * dt;
        applyTransform(i);
      });
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [particles]);

  if (!particles) return null;

  return (
    <g opacity="0.65">
      {particles.map((p, i) => (
        <g key={i} ref={el => { groupRefs.current[i] = el; }}>
          {p.shape === 0
            ? <rect x={-1.5} y={-0.7} width="3" height="1.4" fill={p.color} />
            : p.shape === 1
            ? <polygon points="0,-1.4 1.3,1 -1.3,1" fill={p.color} />
            : <circle cx={0} cy={0} r="0.9" fill={p.color} />}
        </g>
      ))}
    </g>
  );
};

const MARKET_ICON_TOP = {
  points: "254.597656,151.796875 233.359375,171.492188 192.425781,169.945312 193.972656,129.011719 215.210938,109.316406 213.664062,150.25",
  cx: 217.205,
  cy: 146.969,
};
const MARKET_ICON_BOTTOM = {
  points: "120.398438,204.867188 140.003906,183.546875 180.929688,181.835938 182.644531,222.761719 163.035156,244.082031 161.324219,203.15625",
  cx: 158.056,
  cy: 206.708,
};

const MarketIcon = ({ triggered }: { triggered: boolean }) => {
  const topRef = useRef<SVGGElement | null>(null);
  const bottomRef = useRef<SVGGElement | null>(null);
  const state = useRef({
    topAngle: 0,
    bottomAngle: 0,
    phase: "idle" as "idle" | "settling" | "done",
    settleStartTime: 0,
    settleStartTop: 0,
    settleStartBottom: 0,
    settleTargetTop: 0,
    settleTargetBottom: 0,
  });

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const IDLE_SPEED = 0.2;
    const SETTLE_DURATION = 1.2;
    const easeOut = (t: number) => {
      if (t < 0.95) return t / 0.975;
      const s = (t - 0.95) / 0.05;
      return (38 + (1 - (1 - s) * (1 - s))) / 39;
    };

    const apply = () => {
      const s = state.current;
      if (topRef.current) topRef.current.setAttribute("transform", `rotate(${s.topAngle.toFixed(2)} ${MARKET_ICON_TOP.cx} ${MARKET_ICON_TOP.cy})`);
      if (bottomRef.current) bottomRef.current.setAttribute("transform", `rotate(${s.bottomAngle.toFixed(2)} ${MARKET_ICON_BOTTOM.cx} ${MARKET_ICON_BOTTOM.cy})`);
    };
    apply();

    if (reduceMotion) return;

    let lastTime = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const s = state.current;

      if (triggered && s.phase === "idle") {
        s.phase = "settling";
        s.settleStartTime = now;
        s.settleStartTop = s.topAngle;
        s.settleStartBottom = s.bottomAngle;
        s.settleTargetTop = Math.ceil((s.topAngle + 0.0001) / 360) * 360 + 360 * 0;
        s.settleTargetBottom = Math.floor((s.bottomAngle - 0.0001) / 360) * 360;
      }

      if (s.phase === "idle") {
        s.topAngle += IDLE_SPEED * dt;
        s.bottomAngle -= IDLE_SPEED * dt;
      } else if (s.phase === "settling") {
        const elapsed = (now - s.settleStartTime) / 1000;
        const t = Math.min(elapsed / SETTLE_DURATION, 1);
        const e = easeOut(t);
        s.topAngle = s.settleStartTop + (s.settleTargetTop - s.settleStartTop) * e;
        s.bottomAngle = s.settleStartBottom + (s.settleTargetBottom - s.settleStartBottom) * e;
        if (t >= 1) {
          s.phase = "done";
          s.topAngle = s.settleTargetTop;
          s.bottomAngle = s.settleTargetBottom;
        }
      }

      apply();
      if (state.current.phase !== "done") {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [triggered]);

  return (
    <svg viewBox="0 0 375 375" style={{ position: "absolute", left: "-200px", top: "50%", transform: "translateY(-50%)", width: "692px", height: "692px" }}>
      <g transform="translate(-2.1 2.2)">
        <g ref={topRef}>
          <polygon points={MARKET_ICON_TOP.points} fill="#111111" />
        </g>
      </g>
      <g transform="translate(2.1 -2.2)">
        <g ref={bottomRef}>
          <polygon points={MARKET_ICON_BOTTOM.points} fill="#111111" />
        </g>
      </g>
    </svg>
  );
};

const CartoonCar = () => (
  <svg viewBox="0 0 220 210" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", overflow: "visible" }}>
    {/* Shadow */}
    <ellipse cx="110" cy="205" rx="90" ry="5" fill="rgba(0,0,0,0.2)" />

    {/* Car body - blue */}
    <rect x="18" y="105" width="184" height="85" rx="12" fill="#38bdf8" />

    {/* Green stripe */}
    <rect x="18" y="126" width="184" height="8" fill="#22c55e" />

    {/* Roof / cabin - yellow */}
    <path d="M 55 60 Q 62 40 110 34 Q 158 40 165 60 L 184 105 L 36 105 Z" fill="#facc15" />

    {/* Windshield */}
    <path d="M 65 64 Q 72 48 110 42 Q 148 48 155 64 L 172 100 L 48 100 Z" fill="rgba(160,222,255,0.75)" stroke="#0ea5e9" strokeWidth="1.5" />

    {/* Left headlight */}
    <ellipse cx="64" cy="148" rx="30" ry="22" fill="#facc15" />
    <ellipse cx="64" cy="148" rx="16" ry="12" fill="#fef9c3" />
    <ellipse cx="58" cy="143" rx="5" ry="4" fill="white" opacity="0.7" />

    {/* Right headlight */}
    <ellipse cx="156" cy="148" rx="30" ry="22" fill="#facc15" />
    <ellipse cx="156" cy="148" rx="16" ry="12" fill="#fef9c3" />
    <ellipse cx="150" cy="143" rx="5" ry="4" fill="white" opacity="0.7" />

    {/* Central grille */}
    <rect x="90" y="138" width="40" height="26" rx="6" fill="#0f172a" />
    <rect x="93" y="142" width="34" height="4" rx="2" fill="#1e293b" />
    <rect x="93" y="149" width="34" height="4" rx="2" fill="#1e293b" />
    <rect x="93" y="156" width="34" height="4" rx="2" fill="#1e293b" />

    {/* Front bumper */}
    <rect x="14" y="174" width="192" height="16" rx="8" fill="#e2e8f0" />
    <rect x="38" y="178" width="144" height="6" rx="3" fill="#111111" />

    {/* Left wheel */}
    <ellipse cx="58" cy="196" rx="36" ry="11" fill="#1f2937" />
    <ellipse cx="58" cy="196" rx="20" ry="6" fill="#374151" />
    <ellipse cx="58" cy="196" rx="8" ry="3" fill="#6b7280" />

    {/* Right wheel */}
    <ellipse cx="162" cy="196" rx="36" ry="11" fill="#1f2937" />
    <ellipse cx="162" cy="196" rx="20" ry="6" fill="#374151" />
    <ellipse cx="162" cy="196" rx="8" ry="3" fill="#6b7280" />
  </svg>
);

const MarketSpectrum = () => (
  <svg viewBox="0 0 1000 340" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
    {/* baseline */}
    <line x1="60" y1="150" x2="940" y2="150" stroke="#111111" strokeWidth="3" strokeLinecap="round" />
    <text x="60" y="120" fontSize="15" fontWeight="700" fill="rgba(0,0,0,0.45)" letterSpacing="0.05em">LOWER VALUE</text>
    <text x="940" y="120" textAnchor="end" fontSize="15" fontWeight="700" fill="rgba(0,0,0,0.45)" letterSpacing="0.05em">HIGHER VALUE</text>

    {/* Trade-in / part-ex */}
    <circle cx="160" cy="150" r="7" fill="#9ca3af" />
    <line x1="160" y1="150" x2="160" y2="182" stroke="#9ca3af" strokeWidth="2" />
    <text x="160" y="204" textAnchor="middle" fontSize="16" fontWeight="600" fill="#374151">Trade-in / WBAC</text>
    <text x="160" y="225" textAnchor="middle" fontSize="13" fill="#9ca3af">Lowest offer</text>

    {/* Online instant-offer platforms */}
    <circle cx="390" cy="150" r="7" fill="#9ca3af" />
    <line x1="390" y1="150" x2="390" y2="182" stroke="#9ca3af" strokeWidth="2" />
    <text x="390" y="204" textAnchor="middle" fontSize="16" fontWeight="600" fill="#374151">Motorway / Carwow</text>
    <text x="390" y="225" textAnchor="middle" fontSize="13" fill="#9ca3af">Online instant offers</text>

    {/* carmoo — private market value */}
    <line x1="650" y1="95" x2="650" y2="150" stroke="#111111" strokeWidth="2.5" />
    <text x="650" y="75" textAnchor="middle" fontSize="16" fontWeight="700" fill="#111111" letterSpacing="0.03em">carmoo</text>
    <circle cx="650" cy="150" r="11" fill="#111111" stroke="#111111" strokeWidth="3" />
    <text x="650" y="204" textAnchor="middle" fontSize="17" fontWeight="700" fill="#111111">Private Market Value</text>
    <text x="650" y="225" textAnchor="middle" fontSize="13" fill="rgba(0,0,0,0.6)">The fair price — for everyone</text>

    {/* Dealership retail */}
    <circle cx="880" cy="150" r="7" fill="#9ca3af" />
    <line x1="880" y1="150" x2="880" y2="182" stroke="#9ca3af" strokeWidth="2" />
    <text x="880" y="204" textAnchor="middle" fontSize="16" fontWeight="600" fill="#374151">Dealership Retail</text>
    <text x="880" y="225" textAnchor="middle" fontSize="13" fill="#9ca3af">Highest price</text>

  </svg>
);

const LightningStrike = () => (
  <div style={{ position: "relative", display: "inline-block" }}>
    <style>{`
      @keyframes textZap {
        0%   { opacity: 0.7; }
        50%  { opacity: 1; }
        100% { opacity: 0.7; }
      }
    `}</style>
    <span style={{ position: "relative", display: "inline-block", zIndex: 1 }}>
      explosively electric
    </span>
  </div>
);

const faqs = [
  {
    q: "What types of vehicles are listed on carmoo?",
    a: "Right now, carmoo is open to all vehicles — petrol, diesel, hybrid and electric. As we grow and introduce our warranty program, we'll transition to an EV-only marketplace. For now, our focus is building trust and momentum across the board.",
  },
  {
    q: "Do you offer a warranty?",
    a: "Not yet — but it's firmly on our roadmap. Right now, carmoo is focused on connecting buyers and sellers directly for free, with every listing quality-checked before it goes live. As we grow, we're planning to introduce a 2-year warranty and breakdown cover as standard, alongside our move to an EV-only marketplace.",
  },
  {
    q: "How does carmoo vet vehicles before listing?",
    a: "Every vehicle that applies to be listed gets a quick review from us — we look at the ownership history, overall condition and how it's presented. It's a lighter check than a full inspection, but it's enough to filter out low-quality vehicles before they ever reach a buyer. As we grow, we plan to make this vetting process more thorough.",
  },
  {
    q: "What vehicles are eligible to be listed?",
    a: "To keep the standard high, we currently ask that vehicles are registered in 2018 or later with fewer than 80,000 miles on the clock. It's a simple bar, but it helps make sure every buyer is looking at a car that's genuinely worth buying. As we grow and move toward an EV-only platform with warranty cover, these criteria will evolve alongside it.",
  },
  {
    q: "How much can I save compared to a dealer?",
    a: "On average, buyers save around £2,000 compared to buying the same car from a dealership. You're buying directly from a private owner — no dealer margin, no forecourt markup. Just a fair price for a properly vetted vehicle.",
  },
  {
    q: "How much more will I get for my car compared to a trade buyer?",
    a: "Sellers typically earn around £2,500 more through carmoo than they would through We Buy Any Car or a dealer part-exchange, and approximately £1,000 more than selling through Motorway. You're selling directly to a genuine buyer who wants your car — not a middleman looking to make a margin on it.",
  },
  {
    q: "How does the selling process work?",
    a: "Simple. Tell us about your car, we give it a quick review, and if it meets our standard we'll help you create a clean, clear listing. Genuine buyers come to you directly — no dealer middlemen skimming a margin. We guide you through every step from listing to handover.",
  },
  {
    q: "How does the buying process work?",
    a: "Browse quality-checked listings, find the one you want, and get in touch directly with the seller to arrange a viewing. Every listing has been reviewed by us first, so you're not browsing blind. We walk you through insurance, tax and V5 transfer so nothing gets missed.",
  },
  {
    q: "Do you offer finance?",
    a: "Not yet. Right now, buying on carmoo is a direct purchase between you and the seller — arrange your own finance if you need it. Low APR finance is on our roadmap alongside our warranty program as we grow.",
  },
  {
    q: "Is carmoo free to use?",
    a: "Advertising your vehicle on carmoo is completely free — and it always will be. No listing fees, no hidden charges, no catches. We believe sellers shouldn't have to pay to find a buyer, so we've made it free as a permanent commitment, not a promotion.",
  },
  {
    q: "Will carmoo become EV-only?",
    a: "Yes — eventually. We believe electric is the future of private car ownership, and EVs are uniquely well-suited to a platform like ours: far fewer moving parts, lower risk, easier to warranty. Right now we're open to all vehicles while we build trust and momentum, but as we introduce our warranty program we'll transition to an EV-only marketplace.",
  },
  {
    q: "When is carmoo launching?",
    a: "We're launching in the South West first, then rolling out nationally. Get in touch and we'll let you know as soon as we're live in your area.",
  },
  {
    q: "Why did you start carmoo?",
    a: "We noticed a neglected market: good, honest people selling great cars who deserved more than online auction-style sites offered them, and equally honest buyers wanting those same cars at a better price than any dealership. That's why we created carmoo — to bring those two groups together in a way that actually works.",
  },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroTab, setHeroTab] = useState<"buying" | "selling">("selling");
  const [valueTab, setValueTab] = useState<"selling" | "buying">("selling");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [valForm, setValForm] = useState({ name: "", email: "", phone: "", reg: "", mileage: "", year: "", condition: "", finance: "" });
  const [valSubmitted, setValSubmitted] = useState(false);
  const [valLoading, setValLoading] = useState(false);
  const [marketInView, setMarketInView] = useState(false);
  const marketSectionRef = useRef<HTMLElement | null>(null);
  const [lotteryTitleInView, setLotteryTitleInView] = useState(false);
  const lotteryTitleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const el = marketSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMarketInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = lotteryTitleRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLotteryTitleInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  const handleValSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValLoading(true);
    try {
      await fetch("https://formspree.io/f/xpwzgdjb", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: valForm.name,
          email: valForm.email,
          phone: valForm.phone,
          registration: valForm.reg,
          mileage: valForm.mileage,
          year: valForm.year,
          condition: valForm.condition,
          finance_outstanding: valForm.finance,
        }),
      });
      setValSubmitted(true);
    } catch {
      setValSubmitted(true);
    } finally {
      setValLoading(false);
    }
  };

  return (
    <main style={{ backgroundColor: "#ffffff", color: "#111111", fontFamily: "var(--font-comfortaa), sans-serif" }}>

      {/* NAVBAR */}
      <nav className={`fixed left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-3" : "py-4"}`} style={{ top: 0, backgroundColor: "#ffffff", zIndex: 20000 }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between" style={{ paddingLeft: "63px", paddingRight: "24px" }}>
          <div className="flex items-center gap-3">
            <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
              <div style={{
                width: "182px",
                height: "23.6px",
                backgroundImage: "url('/aug3logo.svg')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "363.3px 363.3px",
                backgroundPosition: "-92.6px -162.8px",
              }} aria-label="carmoo" />
            </a>
          </div>
          {scrolled ? (
            <p className="font-medium hidden md:block" style={{ color: "rgba(0,0,0,0.6)", textTransform: "lowercase", fontSize: "1.05rem" }}>..a mooch better way</p>
          ) : (
            <div className="flex items-center gap-6">
              <a href="#how-it-works" className="text-sm font-medium hidden md:block" style={{ color: "rgba(0,0,0,0.6)" }}>How it works</a>
              <a href="#valuation" className="text-sm font-medium hidden md:block" style={{ color: "rgba(0,0,0,0.6)" }}>Sell your car</a>
              <a href="#how-it-works" className="text-sm font-medium hidden md:block" style={{ color: "rgba(0,0,0,0.6)" }}>Buy a car</a>
              <a href="#quality" className="text-sm font-medium hidden md:block" style={{ color: "rgba(0,0,0,0.6)" }}>Our vetting</a>
              <a href="#faq" className="text-sm font-medium hidden md:block" style={{ color: "rgba(0,0,0,0.6)" }}>FAQ</a>
              <a href="#waitlist" className="text-sm font-medium hidden md:block" style={{ color: "rgba(0,0,0,0.6)" }}>Get in touch</a>
              <a href="#" className="text-sm font-medium hidden md:flex items-center" style={{ color: "rgba(0,0,0,0.6)", gap: "6px" }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                </svg>
                Sign in
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* HERO + MARKET SPECTRUM (merged) */}
      <section className="px-6" style={{ marginTop: "105px", position: "relative", overflow: "hidden" }}>

        <svg
          viewBox="0 0 200 100"
          preserveAspectRatio="none"
          style={{ position: "absolute", left: "calc(50% - 590px)", width: "1180px", top: 0, height: "100%", zIndex: 0, overflow: "visible", filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.05)) drop-shadow(0 6px 20px rgba(0,0,0,0.06))" }}
        >
            <defs>
              <linearGradient id="heroBgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f2f2f2" />
                <stop offset="16.66%" stopColor="#f2f2f2" />
                <stop offset="16.66%" stopColor="#f2f2f2" />
                <stop offset="33.33%" stopColor="#f2f2f2" />
                <stop offset="33.33%" stopColor="#f2f2f2" />
                <stop offset="53.15%" stopColor="#f2f2f2" />
                <stop offset="53.15%" stopColor="#f2f2f2" />
                <stop offset="66.66%" stopColor="#f2f2f2" />
                <stop offset="66.66%" stopColor="#f2f2f2" />
                <stop offset="83.33%" stopColor="#f2f2f2" />
                <stop offset="83.33%" stopColor="#f2f2f2" />
                <stop offset="100%" stopColor="#f2f2f2" />
              </linearGradient>
              <clipPath id="heroClip">
                <polygon points="0,4.94 180,4.94 200,50 180,95.06 0,95.06" />
              </clipPath>
              <clipPath id="stripeVClip">
                <rect x="-50" y="16" width="300" height="68" />
              </clipPath>
              <clipPath id="stripeVClipTopTrim">
                <rect x="-50" y="14.5" width="300" height="71" />
              </clipPath>
              <clipPath id="stripeVClipBottomTrim">
                <rect x="-50" y="17.5" width="300" height="65" />
              </clipPath>
            </defs>
            <polygon
              points="0,4.94 180,4.94 200,50 180,95.06 0,95.06"
              fill="#ffffff"
              stroke="rgba(0,0,0,0.08)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

        <div className="mx-auto" style={{ width: "fit-content", maxWidth: "100%", position: "relative" }}>

          {/* Tabbed Buying/Selling card + car image, balanced as a pair */}
          <div className="flex items-center justify-center" style={{ position: "relative", zIndex: 1, padding: "34px 93px", gap: "52px" }}>
            <div className="flex-shrink-0" style={{ width: "571px", maxWidth: "100%" }}>

              {/* Tabs */}
              <div className="flex">
                <button
                  onClick={() => setHeroTab("selling")}
                  className="flex-1 text-center font-semibold uppercase text-sm transition-colors cursor-pointer"
                  style={{
                    color: heroTab === "selling" ? "#111111" : "rgba(0,0,0,0.4)",
                    borderBottom: heroTab === "selling" ? "2px solid #111111" : "1px solid rgba(0,0,0,0.15)",
                    letterSpacing: "0.03em",
                    paddingTop: "21px",
                    paddingBottom: "21px",
                  }}
                >
                  Sell &gt;
                </button>
                <button
                  onClick={() => setHeroTab("buying")}
                  className="flex-1 text-center font-semibold uppercase text-sm transition-colors cursor-pointer"
                  style={{
                    color: heroTab === "buying" ? "#111111" : "rgba(0,0,0,0.4)",
                    borderBottom: heroTab === "buying" ? "2px solid #111111" : "1px solid rgba(0,0,0,0.15)",
                    letterSpacing: "0.03em",
                    paddingTop: "21px",
                    paddingBottom: "21px",
                  }}
                >
                  &lt; Buy
                </button>
              </div>

              {/* Tab content */}
              <div style={{ padding: "41px" }}>
                {heroTab === "buying" ? (
                  <>
                    <style>{`
                      @keyframes lessGrowIn {
                        0%   { transform: scale(0.3); }
                        65%  { transform: scale(1.35); }
                        100% { transform: scale(1); }
                      }
                    `}</style>
                    <h3 style={{ fontSize: "2.21rem", fontWeight: 500, color: "#111111", lineHeight: 1.2, letterSpacing: "-0.01em", marginBottom: "0.97rem" }}>
                      Buy a car for{" "}
                      <span style={{ display: "inline-block", fontSize: "1.4em", color: "#5700d1", animation: "lessGrowIn 1.6s ease-in-out both" }}>less</span>
                    </h3>
                    <p style={{ fontSize: "1.23rem", color: "rgba(0,0,0,0.6)", marginBottom: "1.94rem", lineHeight: 1.5 }}>Pay <strong style={{ fontWeight: 600, color: "#111111" }}>£2,800 less</strong> than dealership prices, on average*.</p>
                    <a href="#how-it-works"
                      className="inline-block text-center font-medium rounded-xl transition-opacity hover:opacity-80"
                      style={{ backgroundColor: "#111111", color: "#fff", fontSize: "1.13rem", padding: "18px 21px" }}>
                      Browse cars <span style={{ fontSize: "1.3em", verticalAlign: "middle" }}>&gt;</span>
                    </a>
                  </>
                ) : (
                  <>
                    <style>{`
                      @keyframes moreGrowIn {
                        0%   { transform: scale(0.3); }
                        65%  { transform: scale(1.35); }
                        100% { transform: scale(1); }
                      }
                    `}</style>
                    <h3 style={{ fontSize: "2.47rem", fontWeight: 500, color: "#111111", lineHeight: 1.15, letterSpacing: "-0.01em", marginBottom: "0.97rem" }}>
                      Sell my car for{" "}
                      <span style={{ display: "inline-block", fontSize: "1.4em", color: "#5700d1", animation: "moreGrowIn 1.6s ease-in-out both" }}>more</span>
                    </h3>
                    <p style={{ fontSize: "1.23rem", color: "rgba(0,0,0,0.6)", marginBottom: "1.94rem", lineHeight: 1.5 }}><strong style={{ fontWeight: 600, color: "#111111" }}>£1,500 more</strong> than Motorway, and <strong style={{ fontWeight: 600, color: "#111111" }}>£2,500 more</strong> than WBAC on average*.</p>
                    <div className="flex items-stretch" style={{ gap: "11px" }}>
                      <div className="flex items-center rounded-lg overflow-hidden flex-1" style={{ border: "2px solid #e8e3da" }}>
                        <div className="font-medium text-xs" style={{ backgroundColor: "#f6f3ed", color: "#111111", padding: "15px 18px" }}>GB</div>
                        <input
                          type="text"
                          placeholder="YOUR REG"
                          value={valForm.reg}
                          onChange={e => setValForm({ ...valForm, reg: e.target.value.toUpperCase() })}
                          maxLength={8}
                          className="flex-1 font-medium text-center tracking-widest outline-none uppercase"
                          style={{ backgroundColor: "#faf8f4", color: "#111111", letterSpacing: "0.12em", fontSize: "1.13rem", padding: "15px 11px" }}
                        />
                      </div>
                      <button
                        onClick={() => { const el = document.getElementById("valuation"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                        className="font-medium rounded-lg transition-opacity hover:opacity-80 whitespace-nowrap"
                        style={{ backgroundColor: "#111111", color: "#fff", fontSize: "1.13rem", padding: "18px 21px" }}
                      >
                        Value my car <span style={{ fontSize: "1.3em", verticalAlign: "middle" }}>&gt;</span>
                      </button>
                    </div>
                  </>
                )}
              </div>

            </div>

            {/* Car image + Trustpilot badge */}
            <div className="hidden md:flex flex-shrink-0 flex-col items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div style={{ width: "389px", height: "389px", overflow: "hidden", position: "relative" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/x158.png" alt="carmoo car" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(calc(-50% - 18.9px), -50%)", width: "450px", maxWidth: "none", height: "auto" }} />
              </div>
              <div className="flex items-center" style={{ marginTop: "0.5rem", gap: "11px" }}>
                <div className="flex" style={{ gap: "2px" }}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <svg key={i} viewBox="0 0 24 24" width="21" height="21" style={{ backgroundColor: "#00b67a" }}>
                      <polygon points="12,2 14.9,9 22,9.2 16.3,13.9 18.3,21 12,16.9 5.7,21 7.7,13.9 2,9.2 9.1,9" fill="#ffffff" />
                    </svg>
                  ))}
                </div>
                <span className="font-semibold" style={{ color: "#111111", fontSize: "1.13rem" }}>Trustpilot</span>
                <svg viewBox="0 0 375 375" aria-label="carmoo" style={{ width: "40px", height: "40px", transform: "translateX(11.34px) scale(4.25)", position: "relative", zIndex: 1 }}>
                  <polygon points={MARKET_ICON_TOP.points} fill="#5700d1" />
                  <polygon points={MARKET_ICON_BOTTOM.points} fill="#5700d1" />
                </svg>
              </div>
            </div>
          </div>

        </div>

        <svg
          viewBox="0 0 200 100"
          preserveAspectRatio="none"
          style={{ position: "absolute", left: "calc(50% - 590px)", width: "1180px", top: 0, height: "100%", zIndex: 2, pointerEvents: "none" }}
        >
          <defs>
            <linearGradient id="confettiFade" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" />
              <stop offset="52%" stopColor="white" />
              <stop offset="65%" stopColor="black" />
              <stop offset="100%" stopColor="black" />
            </linearGradient>
            <mask id="confettiFadeMask">
              <rect x="0" y="0" width="200" height="100" fill="url(#confettiFade)" />
            </mask>
          </defs>
          <g clipPath="url(#heroClip)" mask="url(#confettiFadeMask)">
            <Confetti />
          </g>
        </svg>
      </section>

      {/* VALUE PROPOSITION */}
      <section className="py-32 px-6" style={{ backgroundColor: "#ffffff", paddingTop: "80px", paddingBottom: "48px" }}>
        <div className="max-w-6xl mx-auto text-center">
          <h2 style={{ fontSize: "3rem", fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "0.75rem" }}>How it works</h2>

          {/* Tab selector */}
          <div className="flex items-center justify-center gap-14" style={{ marginBottom: "3rem" }}>
            <button
              onClick={() => setValueTab("selling")}
              className="font-semibold uppercase transition-colors cursor-pointer"
              style={{
                fontSize: "1.1rem",
                letterSpacing: "0.05em",
                color: valueTab === "selling" ? "#111111" : "rgba(0,0,0,0.35)",
                borderBottom: valueTab === "selling" ? "2px solid #111111" : "2px solid transparent",
                paddingBottom: "10px",
              }}
            >
              Selling
            </button>
            <button
              onClick={() => setValueTab("buying")}
              className="font-semibold uppercase transition-colors cursor-pointer"
              style={{
                fontSize: "1.1rem",
                letterSpacing: "0.05em",
                color: valueTab === "buying" ? "#111111" : "rgba(0,0,0,0.35)",
                borderBottom: valueTab === "buying" ? "2px solid #111111" : "2px solid transparent",
                paddingBottom: "10px",
              }}
            >
              Buying
            </button>
          </div>

          {/* Content */}
          <div className="max-w-6xl mx-auto">
            {valueTab === "selling" ? (
              <>
                <div className="grid grid-cols-3 gap-20 mb-8">
                  {[
                    ["1", "Higher valuation", "See your instant higher valuation. Use our app to profile your vehicle.", "/step-valuation.jpg"],
                    ["2", "Approved & listed", "We vet all our private sellers. Once approved your advert will appear under browse cars.", "/step-approved.jpg"],
                    ["3", "Finish Up", "We'll arrange a vetted private buyer to view your car ..funds cleared, off it goes.", "/step-handover.jpg"],
                  ].map(([num, title, desc, img]) => (
                    <div key={num}>
                      <div className="rounded-xl overflow-hidden mb-2" style={{ aspectRatio: "1/1" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div style={{ position: "relative", width: "58px", height: "32px", margin: "0 auto 4px" }}>
                <svg viewBox="0 0 100 54" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                  <polyline points="46,7 12,27 46,47" fill="none" stroke="#5700d1" strokeWidth={12} strokeLinejoin="miter" />
                  <polyline points="54,7 88,27 54,47" fill="none" stroke="#5700d1" strokeWidth={12} strokeLinejoin="miter" />
                </svg>
                <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#111111", fontSize: "0.9rem", fontWeight: 500 }}>{num}</span>
              </div>
                      <p className="mb-2" style={{ color: "#111111", fontWeight: 600, fontSize: "1.6rem" }}>{title}</p>
                      <p className="leading-relaxed" style={{ color: "rgba(0,0,0,0.62)", fontSize: "1.15rem" }}>
                        {desc.split("browse cars").flatMap((part, i, arr) =>
                          i < arr.length - 1
                            ? [part, <a key={i} href="#how-it-works" onClick={(e) => { e.preventDefault(); const el = document.getElementById("how-it-works"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} style={{ color: "#5700d1", textDecoration: "none", cursor: "pointer" }}>browse cars</a>]
                            : [part]
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-20 mb-8">
                  {[
                    ["1", "Browse vetted listings", "Browse through hundreds of vetted and honest private sellers. All our cars and their owners have been checked by us to make sure everything's good. Our checks focus on vehicle quality and ownership care, to make sure only the best qualify. What's more, you'll be saving thousands compared to buying from a dealership, and in our opinion ending up with a better cared for and traceable car.", "/step-valuation.jpg"],
                    ["2", "Arrange a viewing", "Click 'arrange a viewing'. We'll speak to you and verify your identity before swiftly connecting you with our seller. We will remain involved from start to finish and oversee the process to make sure everything is structured and taken care of. You won't be alone.", "/step-approved.jpg"],
                    ["3", "Buy directly", "Purchase directly at the seller's verified home. We will be on standby during your viewing to answer and resolve any issues real time. Once happy, pay immediately through our secure payment system and drive away in your new car. Remember all paperwork and any outstanding finance will be sorted by us.", "/step-handover.jpg"],
                  ].map(([num, title, desc, img]) => (
                    <div key={num}>
                      <div className="rounded-xl overflow-hidden mb-2" style={{ aspectRatio: "1/1" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div style={{ position: "relative", width: "58px", height: "32px", margin: "0 auto 4px" }}>
                <svg viewBox="0 0 100 54" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                  <polyline points="46,7 12,27 46,47" fill="none" stroke="#5700d1" strokeWidth={12} strokeLinejoin="miter" />
                  <polyline points="54,7 88,27 54,47" fill="none" stroke="#5700d1" strokeWidth={12} strokeLinejoin="miter" />
                </svg>
                <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#111111", fontSize: "0.9rem", fontWeight: 500 }}>{num}</span>
              </div>
                      <p className="mb-2" style={{ color: "#111111", fontWeight: 600, fontSize: "1.6rem" }}>{title}</p>
                      <p className="leading-relaxed" style={{ color: "rgba(0,0,0,0.62)", fontSize: "1.15rem" }}>{desc}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* WHY ELECTRIC */}
      <section className="px-6" style={{ position: "relative", paddingTop: "0px", paddingBottom: "0px", marginBottom: "80px" }}>
        <style>{`@keyframes moreGrowIn { 0% { transform: scale(0.3); } 65% { transform: scale(1.35); } 100% { transform: scale(1); } }`}</style>
        <h2 ref={lotteryTitleRef} className="text-center" style={{ fontSize: "3rem", fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "48px" }}>It&apos;s time for{" "}<span style={{ display: "inline-block", fontSize: "1.4em", color: "#5700d1", animation: lotteryTitleInView ? "moreGrowIn 1.6s ease-in-out both" : "none" }}>more</span></h2>
        <div style={{ position: "relative", height: "510px" }}>
        <div style={{ position: "absolute", left: "50%", top: 0, transform: "translateX(-50%)", width: "min(1152px, calc(100% - 48px))", height: "100%", backgroundColor: "#ffffff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "24px", overflow: "hidden", zIndex: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 6px 20px rgba(0,0,0,0.06)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/lot88.webp?v=1" alt="Celebrating with confetti" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.68)" }} />
        </div>
        <div className="max-w-5xl mx-auto" style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", alignItems: "center" }}>
          <div className="grid md:grid-cols-2 gap-16 items-center" style={{ width: "100%" }}>
            <div className="rounded-2xl p-6" style={{ backgroundColor: "#111111", maxWidth: "420px" }}>
              <h3 className="font-medium mb-2" style={{ color: "#ffffff", fontSize: "1.55rem" }}><span style={{ fontSize: "2.2rem" }}>Shhh..</span> It&apos;s not the lottery</h3>
              <p className="font-medium mb-6 leading-relaxed" style={{ color: "#ffffff", fontSize: "1.55rem" }}>but you could get thousands more</p>
              <div className="flex items-center" style={{ backgroundColor: "#ffffff", borderRadius: "9999px", padding: "4px 4px 4px 16px" }}>
                <input
                  type="text"
                  placeholder="ENTER REG"
                  value={valForm.reg}
                  onChange={e => setValForm({ ...valForm, reg: e.target.value.toUpperCase() })}
                  maxLength={8}
                  className="flex-1 font-bold tracking-widest outline-none uppercase"
                  style={{ backgroundColor: "transparent", color: "#111111", letterSpacing: "0.08em", fontSize: "0.9rem" }}
                />
                <button
                  onClick={() => { const el = document.getElementById("valuation"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                  aria-label="Get my quote now"
                  className="rounded-full flex items-center justify-center flex-shrink-0 transition-opacity hover:opacity-80 cursor-pointer"
                  style={{ backgroundColor: "#5700d1", width: "48px", height: "48px" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logoarrow.svg" alt="" style={{ width: 30, height: 30, filter: "invert(1)" }} />
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section ref={marketSectionRef} className="px-6" style={{ position: "relative", paddingTop: "76px", paddingBottom: "76px", marginBottom: "80px" }}>
        <style>{`
          @keyframes marketDiagramSlideIn {
            0% { clip-path: inset(0 100% 0 0); }
            100% { clip-path: inset(0 0% 0 0); }
          }
          .market-diagram-animate { animation: marketDiagramSlideIn 1.2s linear forwards; }
        `}</style>
        <div style={{ position: "absolute", left: "50%", top: 0, transform: "translateX(-50%)", width: "min(1152px, calc(100% - 48px))", height: "100%", backgroundColor: "#ffffff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "24px", overflow: "hidden", zIndex: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 6px 20px rgba(0,0,0,0.06)" }}>
          <MarketIcon triggered={marketInView} />
        </div>
        <div className="max-w-4xl mx-auto" style={{ position: "relative", zIndex: 1, transform: "translateX(clamp(0px, calc((100vw - 1000px) / 6), 80px))" }}>
          <p className="font-medium text-2xl mb-4" style={{ textTransform: "uppercase", color: "#5700d1" }}>Our Market Position</p>
          <div className={marketInView ? "market-diagram-animate" : ""}>
            <MarketSpectrum />
          </div>
        </div>
      </section>

      {/* BROWSE VEHICLES */}
      <section id="how-it-works" className="py-24 px-6" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-light mb-4">Browse vehicles</h2>
            <p className="text-xl" style={{ color: "rgba(0,0,0,0.5)" }}>A preview of what&apos;s coming — real listings launch soon.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-left">
            {[
              ["2022 BMW X1 sDrive18i", "£18,995", "24,500 miles", "Bristol"],
              ["2021 Tesla Model 3", "£22,750", "31,200 miles", "Bath"],
              ["2020 Volkswagen Golf", "£13,450", "42,100 miles", "Exeter"],
              ["2023 Ford Puma", "£16,995", "12,800 miles", "Cardiff"],
            ].map(([title, price, mileage, location]) => (
              <div key={title} className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.08)" }}>
                <div className="flex items-center justify-center relative" style={{ aspectRatio: "4/3", backgroundColor: "#f2f2f2" }}>
                  <span className="rounded-full font-medium" style={{ position: "absolute", top: "10px", left: "10px", backgroundColor: "#00bf63", color: "#ffffff", fontSize: "0.65rem", padding: "4px 10px", letterSpacing: "0.05em" }}>VETTED</span>
                  <svg viewBox="0 0 64 32" style={{ width: "70%", height: "auto" }} fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 22 L8 12 Q11 8 17 8 L40 8 Q46 8 49 12 L58 20" />
                    <path d="M2 22 L60 22" />
                    <circle cx="16" cy="24" r="4" fill="#f2f2f2" />
                    <circle cx="46" cy="24" r="4" fill="#f2f2f2" />
                  </svg>
                </div>
                <div className="p-4">
                  <p className="font-medium text-lg mb-1" style={{ color: "#111111" }}>{price}</p>
                  <p className="text-sm mb-1" style={{ color: "#111111" }}>{title}</p>
                  <p className="text-sm" style={{ color: "rgba(0,0,0,0.5)" }}>{mileage} · {location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUALITY */}
      <section id="quality" className="py-24 px-6" style={{ backgroundColor: "#f6f6f6" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
            <div style={{ borderRadius: "20px", overflow: "hidden", aspectRatio: "4/3" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ev-charging.jpg" alt="EV charging cable" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-widest mb-4" style={{ color: "#111111" }}>Quality checked</p>
              <h2 className="text-4xl md:text-5xl font-light mb-6">Checked before it&apos;s listed.</h2>
              <p className="text-lg mb-5 leading-relaxed" style={{ color: "rgba(0,0,0,0.6)" }}>
                Every vehicle submitted to <Brand />{" "}gets a quick review before it goes live — we look at the ownership history and overall condition so you&apos;re never browsing something that shouldn&apos;t be there. It&apos;s not a full inspection, but it&apos;s enough to keep the standard high.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: "rgba(0,0,0,0.6)" }}>
                A full 2-year warranty and breakdown cover — plus finance options — are on our roadmap as we grow, alongside our move to an EV-only marketplace. For now, buying and selling on <Brand />{" "}means dealing directly, without the dealer markup, on a platform that&apos;s actually checking what gets listed.
              </p>
            </div>
          </div>
          <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4">
            {([
              [<svg key="w" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:26,height:26}}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, "Every vehicle reviewed", "We check ownership history and condition before a listing goes live — so low-quality vehicles don't make the cut."],
              [<svg key="b" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:26,height:26}}><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>, "Direct from the owner", "No trade middlemen, no forecourt markup. You deal with the person who actually owns the car."],
              [<svg key="i" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:26,height:26}}><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1"/></svg>, "Always free to list", "Advertising your vehicle on carmoo costs nothing — and it always will."],
              [<svg key="p" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:26,height:26}}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>, "Warranty, finance & EV-only on the horizon", "As we grow, we're bringing a full warranty and finance program to every purchase, and moving to an EV-only marketplace. Early adopters get in before it arrives."],
            ] as [React.ReactNode, string, string][]).map(([icon, title, desc]) => (
              <div key={title} className="rounded-2xl p-8" style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,0,0,0.08)" }}>
                <div className="mb-3">{icon}</div>
                <p className="font-medium mb-1" style={{ color: "#111111" }}>{title}</p>
                <p className="text-sm" style={{ color: "rgba(0,0,0,0.5)" }}>{desc}</p>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* VALUATION */}
      <section id="valuation" className="py-24 px-6" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-medium uppercase tracking-widest mb-4" style={{ color: "#111111" }}>Thinking of selling?</p>
            <h2 className="text-4xl md:text-5xl font-light mb-4">Get your free valuation.</h2>
            <p className="text-xl" style={{ color: "rgba(0,0,0,0.5)" }}>Fill in the details below and we&apos;ll come back to you with what your car is worth on the <Brand /> platform.</p>
          </div>
          {valSubmitted ? (
            <div className="rounded-3xl p-10 text-center" style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,0,0,0.08)" }}>
              <p className="text-3xl font-medium mb-3" style={{ color: "#111111" }}>Thanks — we&apos;ll be in touch.</p>
              <p className="text-lg" style={{ color: "rgba(0,0,0,0.6)" }}>We&apos;ve received your details and will get back to you with a valuation shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleValSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input required placeholder="Your name" value={valForm.name} onChange={e => setValForm({ ...valForm, name: e.target.value })}
                  className="px-6 py-4 rounded-2xl text-lg outline-none w-full"
                  style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,0,0,0.12)", color: "#111111" }} />
                <input required type="email" placeholder="Email address" value={valForm.email} onChange={e => setValForm({ ...valForm, email: e.target.value })}
                  className="px-6 py-4 rounded-2xl text-lg outline-none w-full"
                  style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,0,0,0.12)", color: "#111111" }} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <input required placeholder="Phone number" value={valForm.phone} onChange={e => setValForm({ ...valForm, phone: e.target.value })}
                  className="px-6 py-4 rounded-2xl text-lg outline-none w-full"
                  style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,0,0,0.12)", color: "#111111" }} />
                <input required placeholder="Registration number" value={valForm.reg} onChange={e => setValForm({ ...valForm, reg: e.target.value.toUpperCase() })}
                  className="px-6 py-4 rounded-2xl text-lg outline-none w-full"
                  style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,0,0,0.12)", color: "#111111" }} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <input required placeholder="Current mileage" value={valForm.mileage} onChange={e => setValForm({ ...valForm, mileage: e.target.value })}
                  className="px-6 py-4 rounded-2xl text-lg outline-none w-full"
                  style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,0,0,0.12)", color: "#111111" }} />
                <input required placeholder="Year of manufacture" value={valForm.year} onChange={e => setValForm({ ...valForm, year: e.target.value })}
                  className="px-6 py-4 rounded-2xl text-lg outline-none w-full"
                  style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,0,0,0.12)", color: "#111111" }} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <select required value={valForm.condition} onChange={e => setValForm({ ...valForm, condition: e.target.value })}
                  className="px-6 py-4 rounded-2xl text-lg outline-none w-full"
                  style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,0,0,0.12)", color: valForm.condition ? "#111111" : "rgba(0,0,0,0.4)" }}>
                  <option value="" disabled>Vehicle condition</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                </select>
                <select required value={valForm.finance} onChange={e => setValForm({ ...valForm, finance: e.target.value })}
                  className="px-6 py-4 rounded-2xl text-lg outline-none w-full"
                  style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,0,0,0.12)", color: valForm.finance ? "#111111" : "rgba(0,0,0,0.4)" }}>
                  <option value="" disabled>Finance outstanding?</option>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <button type="submit" disabled={valLoading}
                className="w-full font-medium text-lg px-10 py-4 rounded-full transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#111111", color: "#fff", opacity: valLoading ? 0.7 : 1 }}>
                {valLoading ? "Sending..." : "Get my free valuation"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6" style={{ backgroundColor: "#f6f6f6" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-4">Common questions</h2>
            <p className="text-xl" style={{ color: "rgba(0,0,0,0.5)" }}>Everything you need to know.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,0,0,0.08)" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-8 py-6 text-left"
                >
                  <span className="font-medium text-lg pr-4" style={{ color: "#111111" }}>{faq.q}</span>
                  <span className="text-2xl font-light flex-shrink-0 transition-transform duration-200" style={{ transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)", color: "#111111" }}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-8 pb-6">
                    <p className="text-lg leading-relaxed" style={{ color: "rgba(0,0,0,0.6)" }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" className="py-24 px-6" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-4">Be first.</h2>
          <p className="text-xl mb-10" style={{ color: "rgba(0,0,0,0.6)" }}>We&apos;re launching in the South West and growing nationally. Drop us your email and we&apos;ll be in touch as soon as we&apos;re live in your area. Advertising is free — and always will be.</p>
          {submitted ? (
            <div className="rounded-3xl p-10" style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,0,0,0.08)" }}>
              <p className="text-3xl font-medium mb-3" style={{ color: "#111111" }}>We&apos;ll be in touch.</p>
              <p className="text-lg" style={{ color: "rgba(0,0,0,0.6)" }}>As soon as <Brand /> is live in your area, you&apos;ll hear from us.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-full text-lg outline-none"
                style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,0,0,0.12)", color: "#111111" }}
              />
              <button
                type="submit"
                className="font-medium text-lg px-8 py-4 rounded-full transition-opacity hover:opacity-90 whitespace-nowrap"
                style={{ backgroundColor: "#111111", color: "#fff" }}
              >
                Get in touch
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6" style={{ borderTop: "1px solid rgba(0,0,0,0.08)", backgroundColor: "#ffffff" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <Image src="/aug3logo.svg" alt="carmoo" width={120} height={32} />
          </div>
          <div className="flex gap-8 text-sm" style={{ color: "rgba(0,0,0,0.4)" }}>
            <a href="#how-it-works" className="hover:text-black transition-colors">How it works</a>
            <a href="#faq" className="hover:text-black transition-colors">FAQ</a>
            <a href="#waitlist" className="hover:text-black transition-colors">Sellers</a>
            <a href="#waitlist" className="hover:text-black transition-colors">Buyers</a>
            <a href="mailto:hello@carmoo.co.uk" className="hover:text-black transition-colors">Contact</a>
          </div>
          <p className="text-sm" style={{ color: "rgba(0,0,0,0.3)" }}>© 2026 <Brand />. All rights reserved.</p>
        </div>
      </footer>

    </main>
  );
}
