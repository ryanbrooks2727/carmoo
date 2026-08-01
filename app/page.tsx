"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const Brand = () => <span style={{ fontFamily: "var(--font-brand), sans-serif", fontWeight: 700, textTransform: "lowercase" }}>carmoo</span>;

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
    <line x1="60" y1="150" x2="940" y2="150" stroke="rgba(0,0,0,0.15)" strokeWidth="3" strokeLinecap="round" />
    <text x="60" y="120" fontSize="13" fontWeight="600" fill="rgba(0,0,0,0.35)" letterSpacing="0.05em">LOWER VALUE</text>
    <text x="940" y="120" textAnchor="end" fontSize="13" fontWeight="600" fill="rgba(0,0,0,0.35)" letterSpacing="0.05em">HIGHER VALUE</text>

    {/* Trade-in / part-ex */}
    <circle cx="160" cy="150" r="7" fill="#9ca3af" />
    <line x1="160" y1="150" x2="160" y2="182" stroke="#9ca3af" strokeWidth="2" />
    <text x="160" y="204" textAnchor="middle" fontSize="16" fontWeight="600" fill="#6b7280">Trade-in / Part-Ex</text>
    <text x="160" y="225" textAnchor="middle" fontSize="13" fill="#9ca3af">Lowest offer</text>

    {/* Online instant-offer platforms */}
    <circle cx="390" cy="150" r="7" fill="#9ca3af" />
    <line x1="390" y1="150" x2="390" y2="182" stroke="#9ca3af" strokeWidth="2" />
    <text x="390" y="204" textAnchor="middle" fontSize="16" fontWeight="600" fill="#6b7280">Motorway / WBAC</text>
    <text x="390" y="225" textAnchor="middle" fontSize="13" fill="#9ca3af">Online instant offers</text>

    {/* carmoo — private market value */}
    <line x1="650" y1="95" x2="650" y2="150" stroke="#111111" strokeWidth="2.5" />
    <rect x="572" y="52" width="156" height="38" rx="19" fill="#111111" />
    <text x="650" y="77" textAnchor="middle" fontSize="16" fontWeight="700" fill="#ffffff" letterSpacing="0.03em">carmoo</text>
    <circle cx="650" cy="150" r="11" fill="#111111" stroke="#ffffff" strokeWidth="3" />
    <text x="650" y="204" textAnchor="middle" fontSize="17" fontWeight="700" fill="#111111">Private Market Value</text>
    <text x="650" y="225" textAnchor="middle" fontSize="13" fill="rgba(0,0,0,0.5)">The fair price — for everyone</text>

    {/* Dealership retail */}
    <circle cx="880" cy="150" r="7" fill="#9ca3af" />
    <line x1="880" y1="150" x2="880" y2="182" stroke="#9ca3af" strokeWidth="2" />
    <text x="880" y="204" textAnchor="middle" fontSize="16" fontWeight="600" fill="#6b7280">Dealership Retail</text>
    <text x="880" y="225" textAnchor="middle" fontSize="13" fill="#9ca3af">Highest price</text>

    {/* Diverging callouts from the carmoo point */}
    <line x1="650" y1="150" x2="470" y2="290" stroke="#00bf63" strokeWidth="2" />
    <circle cx="470" cy="290" r="4" fill="#00bf63" />
    <text x="470" y="315" textAnchor="middle" fontSize="15" fontWeight="700" fill="#00bf63">Sellers earn more here</text>

    <line x1="650" y1="150" x2="830" y2="290" stroke="#111111" strokeWidth="2" />
    <circle cx="830" cy="290" r="4" fill="#111111" />
    <text x="830" y="315" textAnchor="middle" fontSize="15" fontWeight="700" fill="#111111">Buyers pay less here</text>
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
  const [heroTab, setHeroTab] = useState<"buying" | "selling">("buying");
  const [valueTab, setValueTab] = useState<"selling" | "buying">("selling");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [valForm, setValForm] = useState({ name: "", email: "", phone: "", reg: "", mileage: "", year: "", condition: "", finance: "" });
  const [valSubmitted, setValSubmitted] = useState(false);
  const [valLoading, setValLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-1" : "py-2"}`} style={{ backgroundColor: "rgba(255,255,255,0.95)", zIndex: 20000, boxShadow: "0 1px 8px rgba(0,0,0,0.08)" }}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
              <div style={{
                width: "96px",
                height: "17px",
                backgroundImage: "url('/july23black.svg')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "210px 210px",
                backgroundPosition: "-61px -98px",
              }} aria-label="carmoo" />
            </a>
            <div style={{ width: "1px", height: "16px", backgroundColor: "rgba(0,0,0,0.15)", flexShrink: 0 }} />
            <span className="hidden md:block text-xs font-medium tracking-widest" style={{ color: "rgba(0,0,0,0.35)", letterSpacing: "0.1em" }}>A better deal</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#how-it-works" className="text-sm font-medium hidden md:block" style={{ color: "rgba(0,0,0,0.6)" }}>How it works</a>
            <a href="#valuation" className="text-sm font-medium hidden md:block" style={{ color: "rgba(0,0,0,0.6)" }}>Sell your car</a>
            <a href="#quality" className="text-sm font-medium hidden md:block" style={{ color: "rgba(0,0,0,0.6)" }}>Our vetting</a>
            <a href="#faq" className="text-sm font-medium hidden md:block" style={{ color: "rgba(0,0,0,0.6)" }}>FAQ</a>
            <a href="#waitlist" className="text-sm font-medium hidden md:block" style={{ color: "rgba(0,0,0,0.6)" }}>Get in touch</a>
          </div>
        </div>
      </nav>

      {/* HERO + MARKET SPECTRUM (merged) */}
      <section className="px-6" style={{ marginTop: "115px", position: "relative" }}>

        <div className="mx-auto" style={{ width: "fit-content", maxWidth: "100%", position: "relative" }}>

          <svg
            viewBox="0 0 200 100"
            preserveAspectRatio="none"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}
          >
            <defs>
              <linearGradient id="heroBgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fde2e2" />
                <stop offset="20%" stopColor="#fdf0d5" />
                <stop offset="40%" stopColor="#e3f5e1" />
                <stop offset="60%" stopColor="#dceefb" />
                <stop offset="80%" stopColor="#e6e0f8" />
                <stop offset="100%" stopColor="#fbe2ee" />
              </linearGradient>
              <clipPath id="heroClip">
                <path d="M6,0 L194,0 C197,0 200,3 200,6 L200,94 C200,97 197,100 194,100 L6,100 C3,100 0,97 0,94 L0,6 C0,3 3,0 6,0 Z" />
              </clipPath>
            </defs>
            <path
              d="M6,0 L194,0 C197,0 200,3 200,6 L200,94 C200,97 197,100 194,100 L6,100 C3,100 0,97 0,94 L0,6 C0,3 3,0 6,0 Z"
              fill="url(#heroBgGradient)"
            />
            <g clipPath="url(#heroClip)">
              {[123, 136, 149, 162, 175, 188].map((cx, i) => (
                <rect
                  key={i}
                  x={cx - 1.4}
                  y={-60}
                  width={2.8}
                  height={220}
                  fill="#ffffff"
                  opacity={0.4}
                  transform={`rotate(-22 ${cx} 50)`}
                />
              ))}
            </g>
          </svg>

          {/* Tabbed Buying/Selling card + car image, balanced as a pair */}
          <div className="flex items-center justify-center" style={{ position: "relative", zIndex: 1, padding: "67px 86px", gap: "48px" }}>
            <div className="flex-shrink-0" style={{ width: "528px", maxWidth: "100%" }}>

              {/* Tabs */}
              <div className="flex">
                <button
                  onClick={() => setHeroTab("selling")}
                  className="flex-1 text-center font-semibold uppercase text-sm transition-colors cursor-pointer"
                  style={{
                    color: heroTab === "selling" ? "#111111" : "rgba(0,0,0,0.4)",
                    borderBottom: heroTab === "selling" ? "2px solid #111111" : "1px solid rgba(0,0,0,0.15)",
                    letterSpacing: "0.03em",
                    paddingTop: "19px",
                    paddingBottom: "19px",
                  }}
                >
                  Sell
                </button>
                <button
                  onClick={() => setHeroTab("buying")}
                  className="flex-1 text-center font-semibold uppercase text-sm transition-colors cursor-pointer"
                  style={{
                    color: heroTab === "buying" ? "#111111" : "rgba(0,0,0,0.4)",
                    borderBottom: heroTab === "buying" ? "2px solid #111111" : "1px solid rgba(0,0,0,0.15)",
                    letterSpacing: "0.03em",
                    paddingTop: "19px",
                    paddingBottom: "19px",
                  }}
                >
                  Buy
                </button>
              </div>

              {/* Tab content */}
              <div style={{ padding: "38px" }}>
                {heroTab === "buying" ? (
                  <>
                    <h3 style={{ fontSize: "2.04rem", fontWeight: 500, color: "#111111", lineHeight: 1.2, letterSpacing: "-0.01em", marginBottom: "0.9rem" }}>Buy my new car for less.</h3>
                    <p style={{ fontSize: "1.14rem", color: "rgba(0,0,0,0.6)", marginBottom: "1.8rem", lineHeight: 1.5 }}>Safe, vetted listings — with warranty options. Buy for <strong style={{ fontWeight: 600, color: "#111111" }}>£2,500 less</strong> than at dealerships (on average).</p>
                    <a href="#how-it-works"
                      className="block text-center font-medium rounded-xl transition-opacity hover:opacity-80"
                      style={{ backgroundColor: "#111111", color: "#fff", fontSize: "1.05rem", padding: "17px 19px" }}>
                      Browse cars
                    </a>
                  </>
                ) : (
                  <>
                    <h3 style={{ fontSize: "2.28rem", fontWeight: 500, color: "#111111", lineHeight: 1.15, letterSpacing: "-0.01em", marginBottom: "0.9rem" }}>Sell my car for the max</h3>
                    <p style={{ fontSize: "1.14rem", color: "rgba(0,0,0,0.6)", marginBottom: "1.8rem", lineHeight: 1.5 }}>On average <strong style={{ fontWeight: 600, color: "#111111" }}>£1,500 more</strong> than motorway &amp; <strong style={{ fontWeight: 600, color: "#111111" }}>£2,500 more</strong> than wbac</p>
                    <div className="flex items-stretch" style={{ gap: "10px" }}>
                      <div className="flex items-center rounded-lg overflow-hidden flex-1" style={{ border: "2px solid #e8e3da" }}>
                        <div className="font-medium text-xs" style={{ backgroundColor: "#f6f3ed", color: "#111111", padding: "14px 17px" }}>GB</div>
                        <input
                          type="text"
                          placeholder="YOUR REG"
                          value={valForm.reg}
                          onChange={e => setValForm({ ...valForm, reg: e.target.value.toUpperCase() })}
                          maxLength={8}
                          className="flex-1 font-medium text-center tracking-widest outline-none uppercase"
                          style={{ backgroundColor: "#faf8f4", color: "#111111", letterSpacing: "0.12em", fontSize: "1.05rem", padding: "14px 10px" }}
                        />
                      </div>
                      <button
                        onClick={() => { const el = document.getElementById("valuation"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                        className="font-medium rounded-lg transition-opacity hover:opacity-80 whitespace-nowrap"
                        style={{ backgroundColor: "#111111", color: "#fff", fontSize: "1.05rem", padding: "17px 19px" }}
                      >
                        Value my car
                      </button>
                    </div>
                  </>
                )}

                {/* Trustpilot badge */}
                <div className="flex items-center" style={{ marginTop: "1.5rem", gap: "10px" }}>
                  <div className="flex" style={{ gap: "2px" }}>
                    {[0, 1, 2, 3, 4].map((i) => (
                      <svg key={i} viewBox="0 0 24 24" width="19" height="19" style={{ backgroundColor: "#00b67a" }}>
                        <polygon points="12,2 14.9,9 22,9.2 16.3,13.9 18.3,21 12,16.9 5.7,21 7.7,13.9 2,9.2 9.1,9" fill="#ffffff" />
                      </svg>
                    ))}
                  </div>
                  <span className="font-semibold" style={{ color: "#111111", fontSize: "1.05rem" }}>Trustpilot</span>
                </div>
              </div>

            </div>

            {/* Car image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className="hidden md:block flex-shrink-0" style={{ width: "360px", height: "360px", overflow: "hidden", position: "relative" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/x1M.png" alt="carmoo car" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: "552px", maxWidth: "none", height: "auto" }} />
            </div>
          </div>

        </div>
      </section>

      {/* VALUE PROPOSITION */}
      <section className="py-20 px-6" style={{ backgroundColor: "#ffffff", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-semibold uppercase text-center" style={{ color: "rgba(0,0,0,0.4)", letterSpacing: "0.08em", marginBottom: "2rem" }}>Why choose <Brand />?</p>
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">

            {/* Tab selector */}
            <div className="flex md:flex-col gap-6 md:gap-3 flex-shrink-0" style={{ width: "160px" }}>
              <button
                onClick={() => setValueTab("selling")}
                className="text-left transition-colors"
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: valueTab === "selling" ? "#111111" : "rgba(0,0,0,0.35)",
                  borderLeft: valueTab === "selling" ? "3px solid #111111" : "3px solid transparent",
                  paddingLeft: "16px",
                  paddingTop: "4px",
                  paddingBottom: "4px",
                }}
              >
                Selling
              </button>
              <button
                onClick={() => setValueTab("buying")}
                className="text-left transition-colors"
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: valueTab === "buying" ? "#111111" : "rgba(0,0,0,0.35)",
                  borderLeft: valueTab === "buying" ? "3px solid #111111" : "3px solid transparent",
                  paddingLeft: "16px",
                  paddingTop: "4px",
                  paddingBottom: "4px",
                }}
              >
                Buying
              </button>
            </div>

            {/* Content */}
            <div className="flex-1">
              {valueTab === "selling" ? (
                <>
                  <p className="text-xs font-medium uppercase tracking-widest mb-5" style={{ color: "rgba(0,0,0,0.35)" }}>For sellers</p>
                  <h3 className="text-3xl md:text-4xl font-light mb-5" style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}>More money.<br />Every time.</h3>
                  <p style={{ color: "rgba(0,0,0,0.5)", lineHeight: 1.7, marginBottom: "1.5rem", fontSize: "1rem" }}>
                    Sell direct to genuine buyers — for more than trade-in, Motorway or We Buy Any Car.
                  </p>
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {[
                      ["1", "Get a free valuation", "/step-valuation.jpg"],
                      ["2", "Get approved & listed", "/step-approved.jpg"],
                      ["3", "Sell with confidence", "/step-handover.jpg"],
                    ].map(([num, title, img]) => (
                      <div key={num}>
                        <div className="rounded-xl overflow-hidden mb-2" style={{ aspectRatio: "4/5" }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <div className="rounded-full flex items-center justify-center font-medium text-white mb-1" style={{ width: "24px", height: "24px", fontSize: "0.7rem", backgroundColor: "#111111" }}>{num}</div>
                        <p className="font-medium text-xs" style={{ color: "#111111" }}>{title}</p>
                      </div>
                    ))}
                  </div>
                  <a href="#how-it-works" className="font-medium text-sm" style={{ color: "#111111", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    How selling works
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                </>
              ) : (
                <>
                  <p className="text-xs font-medium uppercase tracking-widest mb-5" style={{ color: "rgba(0,0,0,0.35)" }}>For buyers</p>
                  <h3 className="text-3xl md:text-4xl font-light mb-5" style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}>Pay less.<br />Get more.</h3>
                  <p style={{ color: "rgba(0,0,0,0.5)", lineHeight: 1.7, marginBottom: "1.5rem", fontSize: "1rem" }}>
                    Priced below dealers, listed direct by the owner.
                  </p>
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {[
                      ["1", "Browse checked listings", "/step-valuation.jpg"],
                      ["2", "Arrange a viewing", "/step-approved.jpg"],
                      ["3", "Buy directly", "/step-handover.jpg"],
                    ].map(([num, title, img]) => (
                      <div key={num}>
                        <div className="rounded-xl overflow-hidden mb-2" style={{ aspectRatio: "4/5" }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <div className="rounded-full flex items-center justify-center font-medium text-white mb-1" style={{ width: "24px", height: "24px", fontSize: "0.7rem", backgroundColor: "#111111" }}>{num}</div>
                        <p className="font-medium text-xs" style={{ color: "#111111" }}>{title}</p>
                      </div>
                    ))}
                  </div>
                  <a href="#how-it-works" className="font-medium text-sm" style={{ color: "#111111", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    How buying works
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                </>
              )}
            </div>

          </div>

          <div className="max-w-4xl mx-auto" style={{ marginTop: "4rem" }}>
            <MarketSpectrum />
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="py-12 px-6" style={{ backgroundColor: "#111111" }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-white font-medium text-xl md:text-2xl mb-10">Selling your car? You&apos;re leaving money on the table.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-10">
            {[
              ["Always Free", "List your car. Pay nothing. Ever."],
              ["£2,500 More", "Than We Buy Any Car or trade-in."],
              ["£1,000 More", "Than Motorway."],
              ["Quality Checked", "Every car reviewed before it's listed."],
            ].map(([stat, label]) => (
              <div key={label}>
                <p className="text-white text-2xl md:text-3xl font-medium mb-2">{stat}</p>
                <p className="text-sm md:text-base font-medium" style={{ color: "rgba(255,255,255,0.9)" }}>{label}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-white font-medium text-base md:text-lg max-w-2xl mx-auto">
            Every listing checked before it goes live. Direct from the owner. Without the middleman taking their cut.
          </p>
        </div>
      </section>

      {/* WHY ELECTRIC */}
      <section className="py-24 px-6" style={{ backgroundColor: "#f6f6f6" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-6">Built on belief.</h2>
              <p className="text-lg mb-5 leading-relaxed" style={{ color: "rgba(0,0,0,0.6)" }}>We believe electric is the future of car ownership — and we&apos;re building toward a platform that fully embraces it. Right now we&apos;re open to all vehicles while we build trust and momentum; as we grow, we&apos;ll transition to an EV-only marketplace backed by a full warranty program.</p>
              <p className="text-lg mb-5 leading-relaxed" style={{ color: "rgba(0,0,0,0.6)" }}>Every seller is reviewed and every car is quality-checked before it&apos;s listed. A full warranty and finance program is on the horizon as we grow.</p>
              <p className="text-lg leading-relaxed" style={{ color: "rgba(0,0,0,0.6)" }}>Dealerships have always charged for the reassurance they offer. We&apos;re building that same trust — through vetting, transparency and a warranty program on the way — without the middleman margin. That value goes back to the seller and the buyer, where it belongs.</p>
            </div>
            <div style={{ borderRadius: "20px", overflow: "hidden", aspectRatio: "4/3" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ev-station.jpg" alt="Electric vehicle at charging station" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {([
              [<svg key="bolt" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:28,height:28}}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>, "Electric is the future", "We're not hedging our bets on where the market's going. Right now we're open to all vehicles, but as we grow we'll move to an EV-only platform — because we believe that's where private car ownership is headed."],
              [<svg key="search" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:28,height:28}}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>, "Every car earns its place", "We give every vehicle a quick review before it goes live. If it doesn't meet our standard, it doesn't get listed."],
              [<svg key="shield" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:28,height:28}}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, "Restoring trust in car sales", "Private car buying has a reputation problem. We're here to fix that — with careful vetting, full transparency, and a warranty and finance program on the way as we grow."],
            ] as [React.ReactNode, string, string][]).map(([icon, title, desc]) => (
              <div key={title} className="rounded-2xl p-8 text-left" style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,0,0,0.08)" }}>
                <div className="mb-4">{icon}</div>
                <h3 className="font-medium text-lg mb-2" style={{ color: "#111111" }}>{title}</h3>
                <p style={{ color: "rgba(0,0,0,0.5)" }} className="leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 px-6" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-light mb-4">How it works</h2>
            <p className="text-xl" style={{ color: "rgba(0,0,0,0.5)" }}>Straightforward for sellers. Reassuring for buyers.</p>
          </div>
          <div style={{ borderRadius: "20px", overflow: "hidden", aspectRatio: "21/8", marginBottom: "3.5rem" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ev-interior.jpg" alt="Electric vehicle interior" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%" }} />
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-light mb-8 pb-4 border-b" style={{ color: "#111111", borderColor: "#111111" }}>Selling your car</h3>
              <div className="space-y-8">
                {[
                  ["1", "Tell us about your car", "Submit your car's details and photos. We take a quick look at the ownership history and overall condition to make sure it's one we're happy to put in front of buyers."],
                  ["2", "Get approved & listed", "If your car meets our standard, we create a clean, simple listing. Only quality vehicles make it onto the platform."],
                  ["3", "Connect with genuine buyers", "Interested buyers reach out directly through your listing. No dealer middlemen, no trade-in lowballing."],
                  ["4", "Sell with confidence", "We guide you through every step of the handover — V5, payment, everything covered."],
                ].map(([num, title, desc]) => (
                  <div key={num} className="flex gap-5">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-medium text-white flex-shrink-0 mt-1 text-sm" style={{ backgroundColor: "#111111" }}>{num}</div>
                    <div>
                      <p className="font-medium text-lg mb-1" style={{ color: "#111111" }}>{title}</p>
                      <p className="leading-relaxed text-sm" style={{ color: "rgba(0,0,0,0.5)" }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-light mb-8 pb-4 border-b" style={{ color: "#00bf63", borderColor: "#00bf63" }}>Buying a car</h3>
              <div className="space-y-8">
                {[
                  ["1", "Browse checked listings", "Every car on carmoo has been reviewed by us before it's listed, so you're never browsing blind."],
                  ["2", "Find your car", "Clean listings. Honest descriptions. No fluff, no filler — just the information you actually need."],
                  ["3", "Arrange a viewing", "We put you directly in touch with the seller to arrange a viewing that works for you both."],
                  ["4", "Buy directly, more on the horizon", "Right now you buy directly from the seller, backed by a quality-checked listing. A full warranty and finance program is on our roadmap as we grow, alongside our move to an EV-only marketplace — get in early, before it arrives."],
                ].map(([num, title, desc]) => (
                  <div key={num} className="flex gap-5">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-medium text-white flex-shrink-0 mt-1 text-sm" style={{ backgroundColor: "#00bf63" }}>{num}</div>
                    <div>
                      <p className="font-medium text-lg mb-1" style={{ color: "#111111" }}>{title}</p>
                      <p className="leading-relaxed text-sm" style={{ color: "rgba(0,0,0,0.5)" }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
            <Image src="/july23black.svg" alt="carmoo" width={120} height={32} />
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
