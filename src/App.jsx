import React, { useEffect, useMemo, useRef, useState, forwardRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import { CheckCircle2, ArrowRight, Mail, Package, MonitorCheck, ShieldCheck } from "lucide-react";

/**
 * Goal
 * - Keep the left timeline as the explanatory copy (titles + descriptions).
 * - Make the right "mock browser" complementary instead of duplicative.
 * - On mobile, co-locate each step's micro‑UI with its copy; keep sticky preview desktop-only.
 */

const AptitudeLogo = ({ className = "w-7 h-7" }) => (
  <img src="/aptitude.svg" alt="Aptitude Logo" className={className} />
);

const steps = [
  {
    icon: Mail,
    title: "Invite Your Candidate",
    description:
      "Provide the candidate's email, we'll take of the rest. Seamless scheduling, communication, and onboarding flow.",
  },
  {
    icon: Package,
    title: "We Ship The Kit",
    description:
      "A pre‑configured, secure hardware kit goes straight to your candidate—no setup surprises, no support tickets.",
  },
  {
    icon: MonitorCheck,
    title: "Conduct a Secure Interview",
    description:
      "The kit boots into a locked‑down, monitored environment—ensuring fairness and consistency for every interview.",
  },
];

// --- Right side micro‑UI panels (no repeated copy) ---
function InvitePanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-secondary">
          <Mail className="h-4 w-4" />
          <span>Invite</span>
        </div>
        <span className="text-[11px] text-secondary/70">Auto‑provisioned</span>
      </div>

      <div className="rounded-xl border border-border/60 bg-card/60 p-3">
        <div className="flex items-center gap-2">
          <div className="text-xs text-secondary/80 shrink-0">To</div>
          <input
            disabled
            value="candidate@company.com"
            className="w-full rounded-md bg-input/70 px-2 py-1.5 text-xs text-text outline-none"
          />
          <button disabled className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-white opacity-90">
            Send
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        {[
          { label: "Personalized link", done: true },
          { label: "Pre‑screen checks", done: true },
          { label: "Scheduling", done: true },
        ].map((i) => (
          <div key={i.label} className="rounded-xl border border-border/60 bg-card/40 p-3">
            <CheckCircle2 className={`mx-auto h-4 w-4 ${i.done ? "text-emerald-500" : "text-secondary"}`} />
            <div className="mt-1 text-[11px] text-secondary/90">{i.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShippingPanel() {
  const phases = [
    { key: "reserved", label: "Kit reserved" },
    { key: "label", label: "Label created" },
    { key: "transit", label: "In transit" },
    { key: "delivered", label: "Delivered" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-secondary">
          <Package className="h-4 w-4" />
          <span>Shipment</span>
        </div>
        <span className="text-[11px] text-secondary/70">ETA ~2–3 days</span>
      </div>

      <div className="rounded-xl border border-border/60 bg-card/60 p-4">
        <div className="text-xs text-secondary/80">Tracking</div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {phases.map((p, idx) => (
            <div key={p.key} className="flex flex-col items-center">
              <div className={`h-2 w-full rounded-full ${idx <= 2 ? "bg-primary" : "bg-border/60"}`} />
              <div className="mt-2 text-[11px] text-center text-secondary/90">{p.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border/60 bg-card/40 p-3">
          <div className="text-[11px] text-secondary/70">Recipient</div>
          <div className="mt-1 text-sm text-heading">John Smith</div>
        </div>
        <div className="rounded-xl border border-border/60 bg-card/40 p-3">
          <div className="text-[11px] text-secondary/70">Mode</div>
          <div className="mt-1 text-sm text-heading">Overnight</div>
        </div>
      </div>
    </div>
  );
}

function SecurePanel() {
  const checks = [
    "Locked browser",
    "Device integrity",
    "ID verified",
    "AV verified",
    "Network monitored",
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-secondary">
          <ShieldCheck className="h-4 w-4" />
          <span>Security</span>
        </div>
        <span className="text-[11px] text-secondary/70">Ready</span>
      </div>

      <div className="rounded-xl border border-border/60 bg-card/60 p-4">
        <ul className="grid grid-cols-2 gap-3">
          {checks.map((c) => (
            <li key={c} className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span className="text-sm text-heading">{c}</span>
            </li>
          ))}
        </ul>
      </div>

      <button className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow">
        Start Interview
      </button>
    </div>
  );
}

// Desktop preview device mock
function DeviceMock({ currentStep }) {
  const variants = {
    enter: { opacity: 0, y: 24, scale: 0.98 },
    center: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -24, scale: 0.98 },
  };

  return (
    <motion.div
      className="relative w-full max-w-md rounded-3xl border border-border/70 bg-card/70 backdrop-blur-md shadow-xl"
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.18)" }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/60">
        <div className="flex items-center gap-2 text-sm text-secondary">
          <span className="size-2 rounded-full bg-emerald-500/80" />
          <span className="size-2 rounded-full bg-amber-500/80" />
          <span className="size-2 rounded-full bg-rose-500/80" />
        </div>
        <div className="text-xs text-secondary">aptitude://preview</div>
      </div>

      {/* Screen */}
      <div className="relative p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-secondary">
            <ShieldCheck className="h-4 w-4" />
            <span>Session Preview</span>
          </div>
          <div className="text-xs text-secondary/70">Step {currentStep + 1} / {steps.length}</div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-subtle/20">
          <div className="absolute inset-0 pointer-events-none" aria-hidden />
          <div className="p-6 sm:p-8 min-h-56">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial="enter"
                animate="center"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="flex flex-col gap-4"
              >
                {currentStep === 0 && <InvitePanel />}
                {currentStep === 1 && <ShippingPanel />}
                {currentStep === 2 && <SecurePanel />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6 h-1.5 w-full rounded-full bg-border/60">
          <motion.div
            className="h-1.5 rounded-full bg-primary"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// Mobile-inline panels map
const panels = [InvitePanel, ShippingPanel, SecurePanel];

// Media-query hook to gate scroll logic on desktop only
function useMediaQuery(query) {
  const [matches, setMatches] = React.useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  );
  React.useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = () => setMatches(mq.matches);
    mq.addEventListener?.('change', handler);
    handler();
    return () => mq.removeEventListener?.('change', handler);
  }, [query]);
  return matches;
}

// TimelineItem uses forwarded ref; `active` is driven by the parent.
const TimelineItem = forwardRef(function TimelineItem(
  { index, title, description, Icon, active, Panel },
  ref
) {
  // Local reveal animation observer (does not control active state)
  const revealRef = useRef(null);
  const revealed = useInView(revealRef, { amount: 0.25, margin: "-10% 0px -10% 0px" });

  return (
    <article ref={ref} className="relative pl-10">
      {/* Marker */}
      <div className="absolute left-0 top-1.5 flex items-center">
        <div className="relative">
          <motion.span
            className="absolute -inset-2 rounded-full bg-primary/15"
            initial={{ opacity: 0 }}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className={`size-3 rounded-full border ${active ? "bg-primary border-primary" : "bg-muted border-border"}`}
            aria-hidden
          />
        </div>
      </div>

      <motion.div
        ref={revealRef}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: revealed ? 1 : 0.6, y: revealed ? 0 : 6 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`rounded-2xl border px-6 py-6 md:px-7 md:py-7 ${active ? "bg-card/70 backdrop-blur-sm border-border/70 shadow-sm" : "bg-card/40 border-border/60"}`}
      >
        <div className="flex items-start gap-4">
          <div className="shrink-0">
            <Icon className={`h-6 w-6 ${active ? "text-primary" : "text-secondary"}`} />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-heading">{index + 1}. {title}</h3>
            <p className="mt-2 text-text/90 leading-relaxed">{description}</p>

            {/* Mobile-only preview inline */}
            {Panel && (
              <div className="mt-4 block lg:hidden">
                <Panel />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </article>
  );
});

export default function AptitudeLanding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [state, handleSubmit] = useForm("mblkekbj");

  // Refs to each timeline item
  const itemRefs = useRef([]);
  const setItemRef = (el, idx) => {
    itemRefs.current[idx] = el;
  };

  // Store measured top positions for each item (relative to document)
  const itemTopsRef = useRef([]);
  const stepRef = useRef(0);
  useEffect(() => { stepRef.current = currentStep; }, [currentStep]);

  // Recalculate positions
  const recalcPositions = () => {
    itemTopsRef.current = itemRefs.current.map((el) => (el ? el.getBoundingClientRect().top + window.scrollY : 0));
  };

  // Scroll handler with direction-aware anchor + hysteresis via midpoints
  const tickingRef = useRef(false);
  const lastYRef = useRef(0);

  const isDesktop = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    lastYRef.current = window.scrollY;

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        const goingDown = y > lastYRef.current;
        lastYRef.current = y;

        const tops = itemTopsRef.current;
        if (!tops.length) { tickingRef.current = false; return; }

        // Same anchor + hysteresis you had before — works great on mobile too
        const anchorFactor = goingDown ? 0.58 : 0.42;
        const anchor = y + window.innerHeight * anchorFactor;

        let next = 0;
        for (let i = 0; i < tops.length - 1; i++) {
          const mid = (tops[i] + tops[i + 1]) / 2;
          if (anchor >= mid) next = i + 1;
        }

        if (next !== stepRef.current) setCurrentStep(next);
        tickingRef.current = false;
      });
    };

    const onResize = () => {
      recalcPositions();
      onScroll();
    };

    // Initial measure + first sync
    recalcPositions();
    onScroll();

    // Listeners
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    // Re-measure after layout settles (fonts/images)
    const t = setTimeout(() => { recalcPositions(); onScroll(); }, 250);

    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="min-h-screen bg-background text-secondary selection:bg-primary/20">

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-6">
          <a href="#" className="flex items-center gap-2">
            <AptitudeLogo className="h-7 w-7 text-primary" />
            <span className="text-base font-bold text-heading">Aptitude</span>
          </a>
          <div className="flex items-center gap-3">
            <a href="#early-access" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-95 transition">
              Contact Us <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="relative">
          {/* Hero accent band for contrast/pop */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[220px] md:h-[360px] bg-orange-100 backdrop-blur-md border-b border-border/60 shadow-[0_4px_15px_rgba(0,0,0,0.08)]" />
          <div className="relative z-10 mx-auto max-w-6xl px-6 pt-16 md:pt-24 pb-12">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-black tracking-tight text-heading"
            >
              Interview with <span className="bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">absolute certainty.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
              className="mt-4 max-w-2xl text-base md:text-lg text-text"
            >
              Hardware‑secured, cheating‑resistant interview kits. Consistent, fair, premium remote hiring—no compromises.
            </motion.p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#early-access" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow hover:opacity-95 transition">
                Join the waitlist <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          
        </section>

        

        {/* Timeline + Sticky Visual */}
        <section id="how-it-works" className="relative">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-8 md:py-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: timeline */}
            <div className="relative">
              <div className="absolute left-1.5 top-0 bottom-0 w-px bg-border/60" aria-hidden />
              <div className="space-y-10 md:space-y-16">
                {steps.map((s, i) => {
                  const Panel = panels[i];
                  return (
                    <TimelineItem
                      key={s.title}
                      index={i}
                      title={s.title}
                      description={s.description}
                      Icon={s.icon}
                      active={currentStep === i}
                      Panel={Panel}
                      ref={(el) => setItemRef(el, i)}
                    />
                  );
                })}
              </div>
            </div>

            {/* Right: sticky visual (desktop only) */}
            <div className="hidden lg:block lg:sticky lg:top-24 self-start">
              <DeviceMock currentStep={currentStep} />
            </div>
          </div>
        </section>

        {/* Early Access */}
        <section id="early-access" className="scroll-mt-24 border-t border-border/60 bg-background/80">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <div className="mx-auto max-w-lg rounded-3xl border border-border/70 bg-card/70 p-8 shadow-xl backdrop-blur-md">
              {state.succeeded ? (
                <div className="text-center">
                  <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" />
                  <h3 className="mt-4 text-2xl font-bold text-heading">You're on the list!</h3>
                  <p className="mt-1 text-text">Thanks for your interest. We'll be in touch soon.</p>
                </div>
              ) : (
                <>
                  <div className="mb-6 text-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-heading">Get Early Access</h3>
                    <p className="mt-2 text-text">Join the waitlist to revolutionize your hiring process.</p>
                  </div>
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <label htmlFor="email" className="sr-only">Work email</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="you@company.com"
                      className="w-full rounded-xl border border-border/70 bg-input px-4 py-3 text-sm text-text placeholder-secondary outline-none ring-0 transition focus:border-primary focus:ring-2 focus:ring-primary/30"
                      autoComplete="email"
                      required
                    />
                    <ValidationError 
                      prefix="Email" 
                      field="email"
                      errors={state.errors}
                      className="text-danger text-sm"
                    />
                    <button
                      type="submit"
                      disabled={state.submitting}
                      className="w-full rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow hover:opacity-95 transition disabled:opacity-60"
                    >
                      {state.submitting ? 'Submitting...' : 'Join Waitlist'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 bg-background/80">
        <div className="mx-auto max-w-6xl px-6 py-10 text-center text-sm text-text/80">© {year} Aptitude. All rights reserved.</div>
      </footer>
    </div>
  );
}
