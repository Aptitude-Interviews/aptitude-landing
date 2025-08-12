import React, { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValueEvent,
} from "framer-motion";
import { CheckCircle, ArrowRight, Mail, Package, MonitorCheck } from "lucide-react";

const AptitudeLogo = ({ className = "w-12 h-12" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 4L38 12V28L24 36L10 28V12L24 4Z" fill="currentColor" />
  </svg>
);

const steps = [
  {
    icon: Mail,
    title: "1. Invite Your Candidate",
    description:
      "Simply provide us with your candidate's email. We handle all the logistics from here, ensuring a white-glove experience from the very first touchpoint.",
  },
  {
    icon: Package,
    title: "2. We Ship The Kit",
    description:
      "A pre-configured, secure hardware kit is shipped directly to your candidate. It contains everything they need for a fair and consistent interview.",
  },
  {
    icon: MonitorCheck,
    title: "3. Conduct a Secure Interview",
    description:
      "The kit boots into a locked-down, monitored environment. You can conduct your interview with confidence, knowing the playing field is level for everyone.",
  },
];

export default function App() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  // --- Scroll logic for the narrative section ---
  const narrativeRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: narrativeRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const step = Math.floor(latest * steps.length);
    setCurrentStep(step < steps.length ? step : steps.length - 1);
  });

  // Crossfade each step as you scroll
  const opacityValues = steps.map((_, i) => {
    const stepSize = 1 / steps.length;
    const start = i * stepSize;
    const end = start + stepSize;
    const fadeInEnd = start + stepSize * 0.2;
    const fadeOutStart = end - stepSize * 0.2;

    if (i === 0) {
      return useTransform(scrollYProgress, [0, fadeOutStart, end], [1, 1, 0]);
    }
    if (i === steps.length - 1) {
      return useTransform(scrollYProgress, [start, fadeInEnd, 1], [0, 1, 1]);
    }
    return useTransform(scrollYProgress, [start, fadeInEnd, fadeOutStart, end], [0, 1, 1, 0]);
  });

  const visualVariants = {
    0: { scale: 1, rotate: -5, x: "0%" },
    1: { scale: 1.05, rotate: 5, x: "5%" },
    2: { scale: 1.1, rotate: -2, x: "10%" },
  };

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  // Optional: narrative height based on steps (more robust than hardcoding 350vh)
  const narrativeHeight = `${steps.length * 120}vh`;

  return (
    <div className="min-h-screen bg-background font-sans text-secondary">
      <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm z-50">
        <nav className="flex justify-between items-center px-6 lg:px-12 py-4 max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <AptitudeLogo className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-heading">Aptitude</span>
          </div>
          <a
            href="#early-access"
            className="bg-primary text-white font-semibold py-2 px-5 rounded-full hover:bg-primary-hover transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Get Early Access
          </a>
        </nav>
      </header>

      <main>
        <section className="text-center px-6 pt-28 pb-20 md:pt-32 md:pb-32">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-black text-heading leading-tight mb-4"
          >
            Interview with <span className="text-primary">Absolute Certainty</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="text-lg md:text-xl max-w-3xl mx-auto text-text"
          >
            Aptitude delivers hardware-secured interview kits to ensure cheating-free, consistent, and premium remote technical hiring.
          </motion.p>
        </section>

        {/* Narrative Section */}
        <section ref={narrativeRef} className="relative" style={{ height: narrativeHeight }}>
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto px-6 gap-12">
              {/* Left: scrolling text (fixed width rules to prevent squish) */}
              <div className="w-full lg:flex-[0_0_50%] lg:shrink-0 relative flex items-center min-h-[20rem]">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    style={{ opacity: opacityValues[index] }}
                    className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center"
                  >
                    <div className="pointer-events-auto w-full max-w-xl min-w-[22rem] bg-card/60 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-border/50">
                      <step.icon aria-hidden="true" className="w-10 h-10 text-primary mb-4" />
                      <h3 className="text-3xl font-bold text-heading mb-3">{step.title}</h3>
                      <p className="text-lg leading-relaxed text-text">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right: visual */}
              <div className="w-full lg:flex-[0_0_50%] lg:shrink-0 h-96 flex items-center justify-center">
                <motion.div
                  variants={visualVariants}
                  animate={currentStep.toString()}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="relative w-80 h-56 rounded-2xl bg-card shadow-2xl flex items-center justify-center border border-border/50"
                >
                  <div className="w-4/5 h-4/5 rounded-lg bg-subtle/30 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, scale: 0.7, rotate: -30 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.7, rotate: 30 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute flex items-center justify-center w-full h-full"
                      >
                        {React.createElement(steps[currentStep].icon, { className: "w-20 h-20 text-primary/60" })}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Early Access */}
        <section id="early-access" className="scroll-mt-24 md:scroll-mt-32 py-20 px-6 bg-background">
          <div className="bg-card rounded-2xl shadow-xl max-w-md mx-auto p-10 border border-border">
            {!submitted ? (
              <>
                <h3 className="text-3xl font-bold text-heading mb-2 text-center">Get Early Access</h3>
                <p className="mb-8 text-center text-text">Join the waitlist to revolutionize your hiring process.</p>
                <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-3 bg-input border border-border rounded-lg text-text placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary mb-4 transition-all"
                  />
                  <button
                    type="submit"
                    className="w-full bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-hover transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow-md"
                  >
                    Join Waitlist
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                  {error && <p className="text-danger text-sm mt-4 text-center">{error}</p>}
                </form>
              </>
            ) : (
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-success mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-heading mb-3">You're on the list!</h3>
                <p className="text-text">Thank you for your interest. We'll be in touch with updates soon.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="text-center py-8 px-6 border-t border-border">
        <p className="text-text">&copy; {new Date().getFullYear()} Aptitude. All rights reserved.</p>
      </footer>
    </div>
  );
}
