"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const Brand = () => <span style={{ fontFamily: "var(--font-comfortaa), sans-serif" }}>Carmoo</span>;

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
    q: "What types of vehicles are listed on Carmoo?",
    a: "Carmoo is exclusively for electric vehicles. Every car listed on the platform is a private EV — no petrol, no diesel, no hybrids. We believe the future is electric and we've built the simplest, most trustworthy way to buy and sell within it.",
  },
  {
    q: "What warranty is included?",
    a: "Every car purchased through Carmoo comes with a 2-year warranty and breakdown cover as standard. To maintain it, buyers must hold an active telematics-based insurance policy — we provide details of our partner insurers who offer competitive rates and handle everything including fitting. The vehicle must also be kept serviced in line with the manufacturer's guidelines. Both conditions are set out in the welcome pack at the point of purchase. Meet them and the warranty stands for the full two years.",
  },
  {
    q: "Are there any servicing requirements to keep the warranty valid?",
    a: "Yes — as a condition of the 2-year warranty, the vehicle must be maintained and serviced in accordance with the manufacturer's guidelines. For an electric vehicle this is typically straightforward; there's no engine oil, no timing belt, no clutch to worry about. A periodic check-up is usually all that's required. The good news is you don't need to track it yourself — the car will tell you when a service is due. When it does, it's essential that you book it in promptly and have it carried out. Ignoring a service notification and failing to act on it may void the warranty, so it's important to treat it as a priority the moment the car flags it. The specific requirements for your vehicle will be clearly set out in the welcome pack provided at the point of purchase.",
  },
  {
    q: "What is the telematics condition?",
    a: "To benefit from the 2-year warranty, buyers are required to hold an active insurance policy that includes telematics. We work with a number of partner insurance companies that use telematics as standard, and we'll provide every buyer with details of these partners at the point of purchase. Because we're able to direct high volumes of customers to our insurance partners, they can offer our buyers significantly reduced premiums in return — so you get cheaper insurance as part of the deal. The insurance company handles the fitting of the telematics unit, so there's nothing for you to organise. The logic is simple: drivers who are insured on a telematics policy drive more carefully. That means less wear and tear on the vehicle, fewer warranty claims, and a much better ownership experience all round. It's a condition that protects everyone — including you.",
  },
  {
    q: "How does Carmoo vet vehicles before listing?",
    a: "Every EV that applies to be listed goes through our assessment process. We check the ownership history, verify the V5, review the service and charging history, and assess the overall condition and presentation of the car. We only approve vehicles that meet our standard — so if it's on Carmoo, it's earned its place.",
  },
  {
    q: "What vehicles are eligible to be listed?",
    a: "To maintain the quality of our platform and ensure every car is one we can confidently back with a 2-year warranty, we only accept vehicles registered in 2018 or later and with fewer than 80,000 miles on the clock. This isn't arbitrary — it's how we keep the standard high and make sure every buyer gets a car that's genuinely worth buying. If your vehicle falls outside these criteria, we won't be able to list it, but these thresholds allow us to stand behind every sale we facilitate.",
  },
  {
    q: "How much can I save compared to a dealer?",
    a: "On average, buyers save around £2,000 compared to buying the same EV from a dealership. You're buying directly from a private owner — no dealer margin, no forecourt markup. Just a fair price for a properly vetted car.",
  },
  {
    q: "How much more will I get for my EV compared to a trade buyer?",
    a: "Sellers typically earn around £2,600 more through Carmoo than they would through part exchange, and approximately £1,000 more than selling through 'instant offer' dealer bidding sites. You're selling directly to a genuine buyer who wants your car — not a middleman looking to make a margin on it.",
  },
  {
    q: "How does the selling process work?",
    a: "Simple. Tell us about your EV, we assess it, and if it meets our standard we'll help you create a clean, clear listing. Verified buyers come to you — no tyre kickers, no time wasters. We guide you through every step from listing to handover.",
  },
  {
    q: "How does the buying process work?",
    a: "Browse verified EV listings, find the one you want, and we'll arrange the viewing. Every listing comes with a warranty, full ownership verification and a clear history. We walk you through insurance, tax and V5 transfer so nothing gets missed.",
  },
  {
    q: "Do you offer finance?",
    a: "Yes. We offer competitive low APR finance options to help make your EV purchase as straightforward as possible. Rather than having to arrange finance separately, we can handle it as part of the buying process — so you can focus on finding the right car, not chasing the right rate.",
  },
  {
    q: "Is Carmoo free to use?",
    a: "Advertising your EV on Carmoo is completely free — and it always will be. No listing fees, no hidden charges, no catches. We believe sellers shouldn't have to pay to find a buyer, so we've made it free as a permanent commitment, not a promotion.",
  },
  {
    q: "Why only electric vehicles?",
    a: "Because EVs represent the future of private car ownership — and they're uniquely well-suited to a platform like ours. With far fewer moving parts than a combustion engine, a well-maintained electric car is a remarkably low-risk private purchase. No engine wear, no gearbox issues, no clutch. Add a warranty on top and buying privately has never been more straightforward.",
  },
  {
    q: "When is Carmoo launching?",
    a: "We're launching in the South West first, then rolling out nationally. Get in touch and we'll let you know as soon as we're live in your area.",
  },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
              }} aria-label="Carmoo" />
            </a>
            <div style={{ width: "1px", height: "16px", backgroundColor: "rgba(0,0,0,0.15)", flexShrink: 0 }} />
            <span className="hidden md:block text-xs font-medium uppercase tracking-widest" style={{ color: "rgba(0,0,0,0.35)", letterSpacing: "0.1em" }}>Exclusively EV</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#how-it-works" className="text-sm font-medium hidden md:block" style={{ color: "rgba(0,0,0,0.6)" }}>How it works</a>
            <a href="#valuation" className="text-sm font-medium hidden md:block" style={{ color: "rgba(0,0,0,0.6)" }}>Sell your EV</a>
            <a href="#warranty" className="text-sm font-medium hidden md:block" style={{ color: "rgba(0,0,0,0.6)" }}>Warranty</a>
            <a href="#faq" className="text-sm font-medium hidden md:block" style={{ color: "rgba(0,0,0,0.6)" }}>FAQ</a>
            <a href="#waitlist" className="text-sm font-medium hidden md:block" style={{ color: "rgba(0,0,0,0.6)" }}>Contact</a>
            <a href="#waitlist" className="text-sm font-medium hidden md:block" style={{ color: "rgba(0,0,0,0.6)" }}>Get in touch</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        overflow: "hidden",
        minHeight: "88vh",
        maxHeight: "88vh",
        position: "relative",
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center",
      }}>
        {/* Hero photo — right side, fading in */}
        <div style={{
          position: "absolute",
          top: 0, right: 0, bottom: 0,
          width: "48%",
          zIndex: 1,
          backgroundImage: "url('/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center left",
          backgroundRepeat: "no-repeat",
          maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 25%, rgba(0,0,0,0.9) 60%, black 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 25%, rgba(0,0,0,0.9) 60%, black 100%)",
          opacity: 0.5,
        }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, width: "56%", paddingLeft: "8%", paddingRight: "4%", paddingTop: "40px" }}>

          <h1 className="font-extralight" style={{ fontSize: "clamp(3.2rem, 6vw, 5.5rem)", color: "#111111", lineHeight: 1.05, letterSpacing: "-0.04em", marginBottom: "1.25rem" }}>
            Buy for less.<br />Sell for more.
          </h1>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", maxWidth: "620px" }}>

            {/* Sell card */}
            <div className="rounded-2xl p-8" style={{ backgroundColor: "#ffffff", border: "1.5px solid rgba(0,0,0,0.1)", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
              <p className="text-2xl font-semibold uppercase mb-3" style={{ color: "#111111", letterSpacing: "0.03em" }}>Selling</p>
              <p style={{ fontSize: "1.05rem", color: "#111111", marginBottom: "1.5rem", lineHeight: 1.45 }}>Get <strong style={{ fontWeight: 600 }}>more for your car</strong> than anywhere else online</p>
              <div className="flex gap-2 items-stretch">
                <div className="flex items-center rounded-lg overflow-hidden flex-1" style={{ border: "2px solid #f5c400" }}>
                  <div className="px-3 py-3 font-medium text-xs" style={{ backgroundColor: "#f5c400", color: "#000" }}>GB</div>
                  <input
                    type="text"
                    placeholder="YOUR REG"
                    value={valForm.reg}
                    onChange={e => setValForm({ ...valForm, reg: e.target.value.toUpperCase() })}
                    maxLength={8}
                    className="flex-1 px-2 py-3 text-sm font-medium text-center tracking-widest outline-none uppercase"
                    style={{ backgroundColor: "#f5c400", color: "#000", letterSpacing: "0.12em" }}
                  />
                </div>
                <button
                  onClick={() => { const el = document.getElementById("valuation"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                  className="font-medium text-sm px-4 py-3 rounded-lg transition-opacity hover:opacity-80 whitespace-nowrap"
                  style={{ backgroundColor: "#111111", color: "#fff" }}
                >
                  Value my car
                </button>
              </div>
            </div>

            {/* Buy card */}
            <div className="rounded-2xl p-8 flex flex-col justify-between" style={{ backgroundColor: "#111111" }}>
              <p className="text-2xl font-semibold uppercase mb-3" style={{ color: "#00bf63", letterSpacing: "0.03em" }}>Buying</p>
              <p style={{ fontSize: "1.05rem", color: "#ffffff", marginBottom: "1.5rem", lineHeight: 1.45 }}>Cars priced <strong style={{ fontWeight: 600 }}>below dealers</strong> — with a <strong style={{ fontWeight: 600 }}>longer warranty</strong></p>
              <a href="#how-it-works"
                className="block text-center font-medium text-sm px-4 py-3 rounded-xl transition-opacity hover:opacity-80"
                style={{ backgroundColor: "#ffffff", color: "#111111" }}>
                Browse EVs
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION */}
      <section className="py-20 px-6" style={{ backgroundColor: "#ffffff", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row">

            {/* Selling */}
            <div className="flex-1 py-4 md:pr-16 md:border-r" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
              <p className="text-xs font-medium uppercase tracking-widest mb-5" style={{ color: "rgba(0,0,0,0.35)" }}>For sellers</p>
              <h3 className="text-3xl md:text-4xl font-light mb-5" style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}>More money.<br />Every time.</h3>
              <p style={{ color: "rgba(0,0,0,0.5)", lineHeight: 1.7, marginBottom: "2rem", fontSize: "1rem" }}>
                When you sell through Carmoo, your car reaches genuine verified buyers — not a trade buyer looking to flip it for profit. That's why sellers consistently get more through us than through part exchange, dealer trade-in, or any instant offer site.
              </p>
              <a href="#how-it-works" className="font-medium text-sm" style={{ color: "#111111", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                How selling works
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>

            {/* Buying */}
            <div className="flex-1 py-4 md:pl-16 mt-12 md:mt-0">
              <p className="text-xs font-medium uppercase tracking-widest mb-5" style={{ color: "rgba(0,0,0,0.35)" }}>For buyers</p>
              <h3 className="text-3xl md:text-4xl font-light mb-5" style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}>Pay less.<br />Get more.</h3>
              <p style={{ color: "rgba(0,0,0,0.5)", lineHeight: 1.7, marginBottom: "2rem", fontSize: "1rem" }}>
                Every car on Carmoo is priced below what a dealer would charge for the same vehicle — and every purchase comes with a 2-year warranty and breakdown cover as standard. No extras. No catches. Just a better deal.
              </p>
              <a href="#how-it-works" className="font-medium text-sm" style={{ color: "#111111", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                How buying works
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="py-12 px-6" style={{ backgroundColor: "#111111" }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-white font-medium text-xl md:text-2xl mb-10">Selling your EV? You&apos;re leaving money on the table.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-10">
            {[
              ["Always Free", "List your car. Pay nothing. Ever."],
              ["£2,600 More", "Than part exchange. In your pocket."],
              ["£1,000 More", "Than 'instant offer' dealer bidding sites."],
              ["Low APR Finance", "Available for every buyer we introduce."],
            ].map(([stat, label]) => (
              <div key={label}>
                <p className="text-white text-2xl md:text-3xl font-medium mb-2">{stat}</p>
                <p className="text-sm md:text-base font-medium" style={{ color: "rgba(255,255,255,0.9)" }}>{label}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-white font-medium text-base md:text-lg max-w-2xl mx-auto">
            Same security as a dealership. Same warranty. Same vetting. Without the middleman taking their cut.
          </p>
        </div>
      </section>

      {/* WHY ELECTRIC */}
      <section className="py-24 px-6" style={{ backgroundColor: "#f6f6f6" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-6">Built on belief.</h2>
              <p className="text-lg mb-5 leading-relaxed" style={{ color: "rgba(0,0,0,0.6)" }}>We believe electric is the future of car ownership — and we&apos;re building the platform that future deserves. One that puts trust back into a market that has lost too much of it.</p>
              <p className="text-lg mb-5 leading-relaxed" style={{ color: "rgba(0,0,0,0.6)" }}>Every seller is vetted. Every car is assessed. And every sale is backed by our industry-first two-year warranty on private vehicles.</p>
              <p className="text-lg leading-relaxed" style={{ color: "rgba(0,0,0,0.6)" }}>Dealerships have always charged for the security they offer. We offer the same — without the middleman. That margin goes back to the seller and the buyer, where it belongs.</p>
            </div>
            <div style={{ borderRadius: "20px", overflow: "hidden", aspectRatio: "4/3" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ev-station.jpg" alt="Electric vehicle at charging station" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {([
              [<svg key="bolt" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:28,height:28}}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>, "Electric is the future", "We're not hedging our bets. We believe in where this is going — and we're fully committed to making private EV ownership the smart choice."],
              [<svg key="search" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:28,height:28}}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>, "Every car earns its place", "We assess every vehicle before it goes live. If it doesn't meet our standard, it doesn't get listed. No exceptions."],
              [<svg key="shield" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:28,height:28}}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, "Restoring trust in car sales", "Private car buying has a reputation problem. We're here to fix that — with rigorous vetting, full transparency, and a warranty to back it all up."],
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
              <h3 className="text-2xl font-light mb-8 pb-4 border-b" style={{ color: "#111111", borderColor: "#111111" }}>Selling your EV</h3>
              <div className="space-y-8">
                {[
                  ["1", "Tell us about your car", "Submit your EV for assessment. To be eligible, your vehicle must be registered in 2018 or later and have fewer than 80,000 miles on the clock. We then review the ownership history, battery condition, service record and overall presentation."],
                  ["2", "Get approved & listed", "If your car meets our standard, we create a clean, simple listing. Only quality EVs make it onto the platform."],
                  ["3", "Connect with verified buyers", "Serious, identity-verified buyers reach out. No tyre kickers, no time wasters."],
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
              <h3 className="text-2xl font-light mb-8 pb-4 border-b" style={{ color: "#00bf63", borderColor: "#00bf63" }}>Buying an EV</h3>
              <div className="space-y-8">
                {[
                  ["1", "Browse verified listings", "Every EV on Carmoo has been assessed, ownership-verified and battery-checked. Browse with confidence."],
                  ["2", "Find your car", "Clean listings. Honest descriptions. No fluff, no filler — just the information you actually need."],
                  ["3", "We arrange the viewing", "We coordinate everything between you and the seller. Simple, quick and straightforward."],
                  ["4", "Buy with a warranty — and finance if you need it", "Every purchase comes with a Carmoo 2-year warranty as standard. We also offer competitive low APR finance, so you can drive away with peace of mind and a payment plan that works for you."],
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

      {/* WARRANTY */}
      <section id="warranty" className="py-24 px-6" style={{ backgroundColor: "#f6f6f6" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
            <div style={{ borderRadius: "20px", overflow: "hidden", aspectRatio: "4/3" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ev-charging.jpg" alt="EV charging cable" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-widest mb-4" style={{ color: "#111111" }}>The Carmoo Warranty</p>
              <h2 className="text-4xl md:text-5xl font-light mb-6">Every car. Covered.</h2>
              <p className="text-lg mb-5 leading-relaxed" style={{ color: "rgba(0,0,0,0.6)" }}>
                Every EV purchased through <Brand /> comes with a 2-year warranty and breakdown cover as standard. Not an optional extra. Not a premium add-on. Included.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: "rgba(0,0,0,0.6)" }}>
                To make this possible, every buyer holds a telematics-based insurance policy through one of our partner insurers — who fit the unit and offer our buyers reduced premiums in return. The vehicle must also be serviced to manufacturer guidelines, which for an EV is typically just a periodic check-up.
              </p>
            </div>
          </div>
          <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4">
            {([
              [<svg key="w" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:26,height:26}}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, "2 years warranty cover", "Included with every purchase as standard — an industry first for private vehicle sales."],
              [<svg key="b" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:26,height:26}}><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>, "Breakdown cover included", "Every Carmoo car comes with breakdown cover as standard. If you break down, we've got you covered — no extras, no surprises."],
              [<svg key="i" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:26,height:26}}><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1"/></svg>, "Cheaper insurance included", "As a warranty condition, buyers must hold a telematics insurance policy. We partner with insurers who fit the unit and offer our customers reduced premiums — so your cover costs less and your warranty is protected."],
              [<svg key="p" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:26,height:26}}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>, "Peace of mind from day one", "Drive away knowing you're covered — for longer than any dealer will offer."],
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
            <p className="text-xl" style={{ color: "rgba(0,0,0,0.5)" }}>Fill in the details below and we&apos;ll come back to you with what your EV is worth on the Carmoo platform.</p>
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
            <Image src="/july23black.svg" alt="Carmoo" width={120} height={32} />
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
