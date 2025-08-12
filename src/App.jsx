import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  ArrowRight,
  Lock,
  Monitor,
  Users,
  Zap,
  Award,
  ShieldCheck,
  Cpu,
  LineChart,
  Rocket,
  Mail,
  Building,
} from "lucide-react";

// Logo Component
const AptitudeLogo = ({ className = "w-12 h-12" }) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="50%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>

    <path
      d="M24 4L38 12V28L24 36L10 28V12L24 4Z"
      fill="url(#logoGradient)"
      stroke="white"
      strokeWidth="1.5"
    />
    <circle cx="24" cy="16" r="2" fill="white" />
    <circle cx="18" cy="24" r="2" fill="white" />
    <circle cx="30" cy="24" r="2" fill="white" />
    <circle cx="24" cy="32" r="2" fill="white" />
    <line x1="24" y1="18" x2="20" y2="22" stroke="white" strokeWidth="1.5" />
    <line x1="24" y1="18" x2="28" y2="22" stroke="white" strokeWidth="1.5" />
    <line x1="20" y1="26" x2="24" y2="30" stroke="white" strokeWidth="1.5" />
    <line x1="28" y1="26" x2="24" y2="30" stroke="white" strokeWidth="1.5" />
    <rect x="22" y="22" width="4" height="4" rx="1" fill="white" />
  </svg>
);

export default function App() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden font-poppins text-white">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `
          linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
      }} />

      {/* Multiple floating orbs with enhanced animations */}
      <div 
        className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-float-slow transition-transform duration-300"
        style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px) rotate(${mousePos.x * 0.5}deg)`,
        }}
      />
      <div 
        className="absolute top-60 right-20 w-80 h-80 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-float-slower transition-transform duration-300"
        style={{
          transform: `translate(${-mousePos.x * 0.8}px, ${mousePos.y * 0.8}px) scale(${1 + Math.sin(Date.now() * 0.001) * 0.1})`,
        }}
      />
      <div 
        className="absolute bottom-40 left-1/2 w-64 h-64 bg-gradient-to-r from-green-500/15 to-blue-500/15 rounded-full blur-2xl animate-pulse transition-transform duration-300"
        style={{
          transform: `translate(${mousePos.x * 0.5}px, ${-mousePos.y * 0.5}px)`,
        }}
      />

      {/* Navbar */}
      <nav className="relative z-10 flex justify-between items-center px-6 py-6 animate-slide-down">
        <div className="flex items-center space-x-3">
          <div className="hover:rotate-360 hover:scale-110 transition-all duration-600">
            <AptitudeLogo className="w-10 h-10" />
          </div>
          <span className="text-2xl font-bold">
            Aptitude{" "}
            <span className="animated-gradient-text">Interviews</span>
          </span>
        </div>
        <button className="text-gray-300 hover:text-white transition-all duration-300 px-4 py-2 rounded-lg border border-gray-700 hover:border-gray-500 hover:bg-gray-800/50 hover:scale-105 hover:shadow-lg">
          Contact Us
        </button>
      </nav>

      {/* Hero */}
      <section className="relative z-10 text-center px-6 pt-20">
        <div className="animate-fade-up-delayed">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-full mb-8 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 animate-glow-subtle">
            <Rocket className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-gray-300 text-sm">Building the Future of Remote Interviews</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8 animate-slide-up">
            Secure Remote <br />
            <span className="animated-gradient-text">Technical Interviews</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto animate-fade-in-slow">
            We're building hardware-secured interview kits that prevent cheating and deliver a premium candidate experience for remote technical hiring.
          </p>
        </div>
      </section>

      {/* Problem/Solution Cards */}
      <section className="relative z-10 py-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Problem Card */}
          <div className="group bg-gradient-to-br from-red-900/20 to-red-800/10 backdrop-blur-xl p-8 rounded-3xl border border-red-800/30 shadow-2xl relative overflow-hidden hover:transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 animate-slide-in-left">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mr-4 group-hover:rotate-12 transition-transform duration-300">
                  <ShieldCheck className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold">The Problem</h3>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                Remote technical interviews suffer from cheating concerns, inconsistent environments, and lack of trust between companies and candidates.
              </p>
            </div>
          </div>

          {/* Solution Card */}
          <div className="group bg-gradient-to-br from-green-900/20 to-green-800/10 backdrop-blur-xl p-8 rounded-3xl border border-green-800/30 shadow-2xl relative overflow-hidden hover:transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 animate-slide-in-right">
            <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mr-4 group-hover:rotate-12 transition-transform duration-300">
                  <Cpu className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold">Our Solution</h3>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                Hardware-secured interview kits that create a controlled, tamper-proof environment for technical assessments, building trust and ensuring fairness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Will Work */}
      <section className="relative z-10 py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 animate-fade-up">
          How It Will Work
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { 
              icon: Mail, 
              title: "Kit Delivery", 
              desc: "We'll ship secure hardware directly to candidates anywhere in the world.",
              color: "from-blue-500/20 to-blue-600/10",
              iconColor: "text-blue-400",
              borderColor: "border-blue-500/30",
              delay: "0s"
            },
            { 
              icon: Lock, 
              title: "Secure Environment", 
              desc: "The kit boots into a locked, monitored interview environment with built-in integrity checks.",
              color: "from-purple-500/20 to-purple-600/10",
              iconColor: "text-purple-400",
              borderColor: "border-purple-500/30",
              delay: "0.2s"
            },
            { 
              icon: LineChart, 
              title: "Trust & Analytics", 
              desc: "Real-time monitoring and post-interview reports ensure complete transparency.",
              color: "from-pink-500/20 to-pink-600/10",
              iconColor: "text-pink-400",
              borderColor: "border-pink-500/30",
              delay: "0.4s"
            },
          ].map((step, i) => (
            <div
              key={i}
              className={`group bg-gradient-to-br ${step.color} backdrop-blur-xl p-8 rounded-3xl border ${step.borderColor} shadow-2xl text-center relative overflow-hidden transform-gpu hover:transform hover:-translate-y-4 hover:scale-105 hover:rotate-1 transition-all duration-500 animate-scale-in-delayed`}
              style={{ animationDelay: step.delay }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full group-hover:scale-150 group-hover:rotate-180 transition-all duration-700" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gray-900/50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-800/50 transition-all duration-300 group-hover:rotate-360 group-hover:scale-125">
                  <step.icon className={`w-8 h-8 ${step.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Current Status */}
      <section className="relative z-10 py-20 px-6 max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/40 backdrop-blur-2xl rounded-3xl p-10 border border-gray-700/50 shadow-2xl text-center relative overflow-hidden animate-fade-up-delayed">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5 opacity-50" />
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-float-slow" />
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-float-slower" />
          <div className="relative z-10">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-spin-slow hover:animate-spin transition-all duration-300">
              <Building className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-4">We're Just Getting Started</h3>
            <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
              We're a YC-backed startup in the early stages of building the future of secure remote technical interviews. Join us as we revolutionize how companies hire technical talent.
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-yellow-500/10 border border-yellow-500/30 rounded-full animate-glow-subtle">
              <Zap className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-yellow-200 font-medium">Currently in Development • Launching 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section className="relative z-10 py-20 px-6">
        <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/30 backdrop-blur-2xl rounded-3xl p-10 border border-gray-700/50 shadow-2xl max-w-lg mx-auto relative overflow-hidden animate-scale-in-delayed">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 opacity-50" />
          <div className="absolute -top-5 -right-5 w-20 h-20 bg-gradient-to-br from-pink-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse" />
          <div className="relative z-10">
            {!submitted ? (
              <>
                <h3 className="text-3xl font-bold mb-3 text-center animate-fade-in">
                  Get Early Access
                </h3>
                <p className="text-gray-300 mb-6 text-center animate-fade-in-delayed">
                  Be the first to know when we launch and get priority access to our platform
                </p>
                <input
                  type="email"
                  placeholder="Enter your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 bg-black/50 border-2 border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 mb-4 transition-all duration-300 focus:scale-105 animate-fade-in-delayed"
                />
                <button
                  onClick={handleSubmit}
                  className="glow-button w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-xl flex items-center justify-center group hover:scale-105 hover:shadow-2xl animate-fade-in-delayed"
                >
                  Join Early Access List
                  <div className="ml-3 group-hover:translate-x-1 transition-transform duration-200">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </button>
                {error && (
                  <p className="text-red-400 text-sm mt-4 text-center animate-fade-in">
                    {error}
                  </p>
                )}
              </>
            ) : (
              <div className="text-center animate-scale-in">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-once">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-3">You're In! 🚀</h3>
                <p className="text-gray-300">Thanks for joining our early access list. We'll keep you updated on our progress and let you know as soon as we're ready to launch!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Enhanced Styles */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&display=swap");
        .font-poppins { font-family: "Poppins", sans-serif; }
        
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animated-gradient-text {
          background: linear-gradient(270deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6);
          background-size: 600% 600%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientMove 8s ease infinite;
        }
        
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(236, 72, 153, 0.2); }
          50% { box-shadow: 0 0 30px rgba(236, 72, 153, 0.7), 0 0 60px rgba(59, 130, 246, 0.3); }
        }
        .glow-button:hover { animation: glowPulse 2s infinite alternate; }
        
        @keyframes float-slow {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
        .animate-float-slow { animation: float-slow 20s ease-in-out infinite; }
        
        @keyframes float-slower {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          50% { transform: translate(-25px, -25px) rotate(180deg); }
        }
        .animate-float-slower { animation: float-slower 25s ease-in-out infinite; }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fadeUp 0.8s ease-out; }
        .animate-fade-up-delayed { animation: fadeUp 0.8s ease-out 0.2s both; }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slideUp 1s ease-out 0.3s both; }
        
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down { animation: slideDown 0.8s ease-out; }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in-left { animation: slideInLeft 0.8s ease-out 0.4s both; }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in-right { animation: slideInRight 0.8s ease-out 0.6s both; }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in { animation: scaleIn 0.6s ease-out; }
        .animate-scale-in-delayed { animation: scaleIn 0.6s ease-out 0.8s both; }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fadeIn 0.8s ease-out 0.2s both; }
        .animate-fade-in-delayed { animation: fadeIn 0.8s ease-out 0.4s both; }
        .animate-fade-in-slow { animation: fadeIn 1.2s ease-out 0.6s both; }
        
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spinSlow 10s linear infinite; }
        
        @keyframes bounceOnce {
          0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
          40%, 43% { transform: translate3d(0,-30px,0); }
          70% { transform: translate3d(0,-15px,0); }
          90% { transform: translate3d(0,-4px,0); }
        }
        .animate-bounce-once { animation: bounceOnce 1s ease-out; }
        
        @keyframes glowSubtle {
          0%, 100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.2); }
          50% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.4); }
        }
        .animate-glow-subtle { animation: glowSubtle 3s ease-in-out infinite; }
        
        .hover\:rotate-360:hover { transform: rotate(360deg); }
        .hover\:rotate-12:hover { transform: rotate(12deg); }
        .group:hover .group-hover\:rotate-360 { transform: rotate(360deg); }
        .group:hover .group-hover\:rotate-180 { transform: rotate(180deg); }
        .group:hover .group-hover\:scale-150 { transform: scale(1.5); }
        .group:hover .group-hover\:scale-125 { transform: scale(1.25); }
        
        .transform-gpu { transform: translate3d(0, 0, 0); }
        .transition-all { transition: all 0.3s ease; }
        .duration-300 { transition-duration: 300ms; }
        .duration-500 { transition-duration: 500ms; }
        .duration-600 { transition-duration: 600ms; }
        .duration-700 { transition-duration: 700ms; }
      `}</style>
    </div>
  );
}
