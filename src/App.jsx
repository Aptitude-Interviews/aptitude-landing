import React, { useState } from "react";
import { CheckCircle, ArrowRight, Lock, Monitor, Users, Star, Zap, Award } from "lucide-react";

// Custom Logo Component
const AptitudeLogo = ({ className = "w-12 h-12" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="50%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>
    
    {/* Outer hexagon */}
    <path 
      d="M24 4L38 12V28L24 36L10 28V12L24 4Z" 
      fill="url(#logoGradient)" 
      stroke="white" 
      strokeWidth="1.5"
    />
    
    {/* Inner circuit pattern */}
    <circle cx="24" cy="16" r="2" fill="white" />
    <circle cx="18" cy="24" r="2" fill="white" />
    <circle cx="30" cy="24" r="2" fill="white" />
    <circle cx="24" cy="32" r="2" fill="white" />
    
    {/* Connecting lines */}
    <line x1="24" y1="18" x2="20" y2="22" stroke="white" strokeWidth="1.5" />
    <line x1="24" y1="18" x2="28" y2="22" stroke="white" strokeWidth="1.5" />
    <line x1="20" y1="26" x2="24" y2="30" stroke="white" strokeWidth="1.5" />
    <line x1="28" y1="26" x2="24" y2="30" stroke="white" strokeWidth="1.5" />
    
    {/* Center secure element */}
    <rect x="22" y="22" width="4" height="4" rx="1" fill="white" />
  </svg>
);

export default function App() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const isValidEmail = (email) =>
    /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden font-poppins">
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-black">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-60 right-20 w-80 h-80 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-float-slower" />
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-gradient-to-r from-pink-600/20 to-blue-600/20 rounded-full blur-3xl animate-float-slowest" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center px-6 py-6">
        <div className="flex items-center space-x-3">
          <AptitudeLogo className="w-10 h-10" />
          <span className="text-2xl font-bold text-white">
            Aptitude<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Interviews</span>
          </span>
        </div>
        <button className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg border border-gray-700 hover:border-gray-500">
          Contact Sales
        </button>
      </nav>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-4">
        
        {/* Hero Section */}
        <div className="text-center max-w-6xl mx-auto mb-20 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-full mb-8">
            <Zap className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-gray-300 text-sm">Launching Q1 2025</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-tight">
            Secure Remote
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Technical Interviews
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto">
            Hardware-secured interview kits that completely eliminate cheating while providing 
            candidates with a seamless, professional interview experience that builds trust.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">99.9%</div>
              <div className="text-gray-400 text-sm">Cheat Prevention</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">&lt;30sec</div>
              <div className="text-gray-400 text-sm">Setup Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-gray-400 text-sm">Remote Compatible</div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="max-w-6xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-white text-center mb-16">
              End-to-End Interview Solution
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-900/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-800 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">1</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Schedule & Ship</h4>
                <p className="text-gray-400 text-sm">Book interviews through our platform. Kits automatically ship to candidates with 2-day delivery.</p>
              </div>
              
              <div className="bg-gray-900/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-800 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">2</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Plug & Interview</h4>
                <p className="text-gray-400 text-sm">Candidate connects the kit and joins the secure interview environment. No downloads or setup required.</p>
              </div>
              
              <div className="bg-gray-900/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-800 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">3</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Secure Interview</h4>
                <p className="text-gray-400 text-sm">Conduct technical interviews with complete confidence in integrity. All sessions are recorded and analyzed.</p>
              </div>
              
              <div className="bg-gray-900/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-800 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">4</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Return & Review</h4>
                <p className="text-gray-400 text-sm">Kit returns via prepaid shipping label. Access interview recordings and performance analytics.</p>
              </div>
            </div>
          </div>

          {/* Platform Features */}
          <div className="max-w-5xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-white text-center mb-16">
              Built for Recruiting Teams
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-900/20 backdrop-blur-xl rounded-2xl p-8 border border-gray-800">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">Centralized Dashboard</h3>
                    <p className="text-gray-400 leading-relaxed mb-4">
                      Manage all interviews from one intuitive platform. Schedule sessions, track kit shipments, 
                      and access candidate performance data in real-time.
                    </p>
                    <ul className="space-y-2 text-gray-400 text-sm">
                      <li className="flex items-center"><span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3"></span>Automated scheduling & notifications</li>
                      <li className="flex items-center"><span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3"></span>Real-time kit tracking</li>
                      <li className="flex items-center"><span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3"></span>Team collaboration tools</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-900/20 backdrop-blur-xl rounded-2xl p-8 border border-gray-800">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">Logistics Handled</h3>
                    <p className="text-gray-400 leading-relaxed mb-4">
                      We handle the entire logistics chain so you can focus on finding great talent. 
                      From shipping to returns, everything is automated and tracked.
                    </p>
                    <ul className="space-y-2 text-gray-400 text-sm">
                      <li className="flex items-center"><span className="w-1.5 h-1.5 bg-violet-400 rounded-full mr-3"></span>Free 2-day shipping nationwide</li>
                      <li className="flex items-center"><span className="w-1.5 h-1.5 bg-violet-400 rounded-full mr-3"></span>Prepaid return labels included</li>
                      <li className="flex items-center"><span className="w-1.5 h-1.5 bg-violet-400 rounded-full mr-3"></span>Damage protection & replacements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20 max-w-5xl mx-auto">
            <div className="group bg-gray-900/30 backdrop-blur-xl rounded-2xl p-8 border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Hardware Secured</h3>
              <p className="text-gray-400 leading-relaxed">
                Tamper-proof hardware with encrypted communications ensures zero possibility 
                of unauthorized access or cheating during interviews.
              </p>
            </div>
            
            <div className="group bg-gray-900/30 backdrop-blur-xl rounded-2xl p-8 border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all">
                <Monitor className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Zero Setup</h3>
              <p className="text-gray-400 leading-relaxed">
                Pre-configured environments with all necessary tools installed. 
                Candidates simply power on and begin their interview immediately.
              </p>
            </div>
            
            <div className="group bg-gray-900/30 backdrop-blur-xl rounded-2xl p-8 border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-pink-500/25 transition-all">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Fair & Trusted</h3>
              <p className="text-gray-400 leading-relaxed">
                Create a level playing field for all candidates with verified integrity 
                that builds confidence in your hiring decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Email Signup */}
        <div className="w-full max-w-lg mx-auto animate-fade-in-delayed">
          <div className="bg-gray-900/40 backdrop-blur-2xl rounded-3xl p-10 border border-gray-700 shadow-2xl">
            {!submitted ? (
              <>
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-white mb-3">Join the Revolution</h3>
                  <p className="text-gray-300">Be among the first to transform technical hiring</p>
                </div>
                
                <div className="space-y-6">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your work email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-6 py-4 bg-black/50 border-2 border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                      required
                    />
                  </div>
                  
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="relative z-10">Join Waitlist</span>
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform relative z-10" />
                  </button>
                </div>
                
                {error && (
                  <p className="text-red-400 text-sm mt-4 text-center font-medium">{error}</p>
                )}
                
                <p className="text-gray-500 text-xs text-center mt-6">
                  Launching Q1 2025. No spam, just updates on our progress.
                </p>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">Welcome Aboard! 🚀</h3>
                <p className="text-gray-300 text-lg">
                  You're now part of the future of technical interviews. 
                  We'll keep you updated on our progress!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-20 text-center animate-fade-in-delayed-2">
          <p className="text-gray-500 text-sm mb-8">Applying the same security principles used by</p>
          <div className="flex justify-center items-center space-x-12 opacity-40">
            <div className="text-gray-600 text-sm">Financial Services</div>
            <div className="w-px h-6 bg-gray-700"></div>
            <div className="text-gray-600 text-sm">Government Agencies</div>
            <div className="w-px h-6 bg-gray-700"></div>
            <div className="text-gray-600 text-sm">Defense Contractors</div>
            <div className="w-px h-6 bg-gray-700"></div>
            <div className="text-gray-600 text-sm">Healthcare Systems</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap');
        
        .font-poppins {
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
        
        @keyframes float-slower {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          50% { transform: translate(-25px, -25px) rotate(180deg); }
        }
        
        @keyframes float-slowest {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          25% { transform: translate(20px, -20px) rotate(90deg); }
          75% { transform: translate(-15px, 15px) rotate(270deg); }
        }
        
        .animate-float-slow { animation: float-slow 20s ease-in-out infinite; }
        .animate-float-slower { animation: float-slower 25s ease-in-out infinite; }
        .animate-float-slowest { animation: float-slowest 30s ease-in-out infinite; }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .animate-fade-in-delayed {
          opacity: 0;
          animation: fadeIn 1s ease-out 0.5s forwards;
        }
        
        .animate-fade-in-delayed-2 {
          opacity: 0;
          animation: fadeIn 1s ease-out 1s forwards;
        }
      `}</style>
    </div>
  );
}
