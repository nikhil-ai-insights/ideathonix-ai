import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Sparkles, 
  Lightbulb, 
  ArrowRight, 
  Zap, 
  Award, 
  Terminal, 
  Briefcase, 
  Users, 
  Check, 
  TrendingUp, 
  Cpu, 
  Database,
  Layers,
  Heart,
  HelpCircle,
  Code
} from "lucide-react";

interface LandingPageProps {
  onStart: () => void;
  onLogin: () => void;
}

export default function LandingPage({ onStart, onLogin }: LandingPageProps) {
  const [activeTab, setActiveTab] = useState<"hackathon" | "startup" | "organizer">("hackathon");

  const faqs = [
    {
      q: "What is Ideathonix AI?",
      a: "Ideathonix AI is a premium, full-stack AI brainstorming and evaluation workspace designed for hackathon participants, founders, students, and organizers. It generates fully realized projects and startup concepts with structured roadmaps, architecture, and multi-metric readiness scores."
    },
    {
      q: "How does the Scoring Engine work?",
      a: "We pass your parameters to our custom AI Evaluator based on Gemini 3.5. It evaluates feasibility, market gap, judge appeal, and uniqueness, generating quantitative indices so you can objectively filter your best concepts."
    },
    {
      q: "What technologies can I specify?",
      a: "Absolutely any! You can input your team's exact skill levels, pre-existing tech stack, hardware limits, and preferred database systems, and Ideathonix AI will design the complete architecture accordingly."
    },
    {
      q: "Is there a real database to save my ideas?",
      a: "Yes! Your generated concepts are saved securely in Firestore. You can bookmark, retrieve, search, or export them in PDF, Markdown, and README formats at any time."
    }
  ];

  return (
    <div id="landing-page" className="min-h-screen bg-[#1F2937] text-gray-100 overflow-x-hidden selection:bg-[#FFA77F] selection:text-[#1F2937]">
      {/* Navbar */}
      <header id="navbar" className="sticky top-0 z-50 bg-[#1F2937]/90 backdrop-blur-md border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[#FFA77F] flex items-center justify-center text-[#1F2937] font-display font-bold text-xl shadow-[0_0_20px_rgba(255,167,127,0.3)]">
              I
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">
              Ideathonix<span className="text-[#FFA77F]">.AI</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            <a href="#features" className="hover:text-[#FFA77F] transition-colors">Features</a>
            <a href="#modes" className="hover:text-[#FFA77F] transition-colors">Modes</a>
            <a href="#pricing" className="hover:text-[#FFA77F] transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-[#FFA77F] transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              id="nav-login-btn"
              onClick={onLogin}
              className="text-sm font-medium text-gray-300 hover:text-white hover:underline transition-all px-3 py-1.5"
            >
              Sign In
            </button>
            <button 
              id="nav-get-started-btn"
              onClick={onStart}
              className="bg-[#FFA77F] text-[#1F2937] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#FFA77F]/90 transition-all hover:scale-[1.02] shadow-[0_4px_12px_rgba(255,167,127,0.2)]"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative py-20 lg:py-32 flex flex-col items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,167,127,0.07)_0,transparent_60%)] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <div className="inline-flex items-center gap-2 bg-gray-800/80 border border-gray-700 px-3 py-1.5 rounded-full text-xs text-gray-300">
            <Sparkles className="w-4 h-4 text-[#FFA77F]" />
            <span>Powering the next generation of Hackathons & Startups</span>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-tight">
            From Problem to <br />
            <span className="text-[#FFA77F] bg-gradient-to-r from-[#FFA77F] to-[#ff7d47] bg-clip-text text-transparent">Winning Ideas.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-300 leading-relaxed">
            Stop searching blindly. Ideathonix AI is the expert workspace that structures, evaluates, and architectures high-impact software concepts designed to win.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              id="hero-generate-btn"
              onClick={onStart}
              className="w-full sm:w-auto bg-[#FFA77F] text-[#1F2937] font-semibold text-base px-8 py-3.5 rounded-xl hover:bg-[#FFA77F]/90 transition-all shadow-[0_8px_30px_rgba(255,167,127,0.35)] flex items-center justify-center gap-2 group hover:scale-[1.01]"
            >
              Start Generating Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href="#features"
              className="w-full sm:w-auto bg-gray-800 border border-gray-700 hover:bg-gray-700/50 text-white font-medium px-8 py-3.5 rounded-xl transition-all flex items-center justify-center"
            >
              Explore Features
            </a>
          </div>
        </motion.div>

        {/* Visual Mockup representation */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-5xl mt-16 px-4"
        >
          <div className="relative rounded-2xl bg-gray-900 border border-gray-700/50 p-4 sm:p-6 shadow-2xl overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#FFA77F]" />
            <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs text-gray-500 font-mono">workspace.ideathonix.ai</span>
              <div className="w-10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-[#FFA77F]">
                  <Terminal className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">01. Setup Input</span>
                </div>
                <div className="h-2 w-1/3 bg-gray-700 rounded" />
                <div className="h-2 w-full bg-gray-700/40 rounded" />
                <div className="h-2 w-5/6 bg-gray-700/40 rounded" />
              </div>

              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-[#FFA77F]">
                  <Cpu className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">02. Evaluate</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3/4 bg-[#FFA77F]/20 border border-[#FFA77F]/30 rounded text-[10px] text-[#FFA77F] px-1 font-bold">FEASIBILITY: 94%</div>
                </div>
                <div className="h-2 w-full bg-gray-700/40 rounded" />
                <div className="h-2 w-2/3 bg-gray-700/40 rounded" />
              </div>

              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-[#FFA77F]">
                  <Layers className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">03. Tech Stack</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  <span className="text-[10px] px-1.5 py-0.5 bg-gray-700 rounded text-gray-300">Vite</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-gray-700 rounded text-gray-300">Tailwind</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-gray-700 rounded text-gray-300">Firebase</span>
                </div>
                <div className="h-2 w-full bg-gray-700/40 rounded" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-900/60 relative border-t border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
              Engineered to Brainstorm, Designed to Succeed
            </h2>
            <p className="text-gray-400">
              Stop generating plain paragraphs of AI text. Get actionable production-ready architecture blueprints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6 space-y-4 hover:border-gray-700 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#FFA77F]/10 border border-[#FFA77F]/20 rounded-xl flex items-center justify-center text-[#FFA77F]">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-lg text-white">Durable Firestore Backing</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Save your generated hackathon tracks, startup business ideas, and judging matrixes safely inside Firestore. Keep your workspace completely organized.
              </p>
            </div>

            <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6 space-y-4 hover:border-gray-700 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#FFA77F]/10 border border-[#FFA77F]/20 rounded-xl flex items-center justify-center text-[#FFA77F]">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-lg text-white">Multi-Dimensional Scoring</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Evaluate every idea across 4 key scores: Technical Feasibility, Judge Appeal, Innovation and Market fit. Spot winning projects before building.
              </p>
            </div>

            <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6 space-y-4 hover:border-gray-700 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#FFA77F]/10 border border-[#FFA77F]/20 rounded-xl flex items-center justify-center text-[#FFA77F]">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-lg text-white">Full-Stack Architecture</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Generate tailored database schemas, recommended third-party APIs, precise client-server flow layouts, and production-ready tech stacks instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Modes Interactive Section */}
      <section id="modes" className="py-24 px-4 relative">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">Three Sophisticated Modes</h2>
            <p className="text-gray-400">Tailored generation structures for every profile of our ecosystem.</p>
          </div>

          {/* Interactive Mode Tabs */}
          <div className="flex justify-center border-b border-gray-800">
            <div className="flex gap-4 sm:gap-8 overflow-x-auto pb-px">
              <button
                onClick={() => setActiveTab("hackathon")}
                className={`py-4 px-2 text-sm font-medium border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeTab === "hackathon"
                    ? "border-[#FFA77F] text-[#FFA77F]"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                <Code className="w-4 h-4" />
                Hackathon Mode
              </button>
              <button
                onClick={() => setActiveTab("startup")}
                className={`py-4 px-2 text-sm font-medium border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeTab === "startup"
                    ? "border-[#FFA77F] text-[#FFA77F]"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                <Briefcase className="w-4 h-4" />
                Startup Mode
              </button>
              <button
                onClick={() => setActiveTab("organizer")}
                className={`py-4 px-2 text-sm font-medium border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeTab === "organizer"
                    ? "border-[#FFA77F] text-[#FFA77F]"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                <Users className="w-4 h-4" />
                Organizer Mode
              </button>
            </div>
          </div>

          <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 sm:p-10">
            {activeTab === "hackathon" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-2xl text-white">Unfair Hackathon Advantage</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Build ideas aligned specifically to theme topics, durations, skills, and pre-existing tech. Ideal for solo coders or teams aiming for the podium.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FFA77F]" /> Hour-by-hour build roadmap</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FFA77F]" /> 1-minute pitch & demo script</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FFA77F]" /> Pre-formatted GitHub README summaries</li>
                  </ul>
                </div>
                <div className="bg-gray-850 p-6 rounded-2xl border border-gray-800 space-y-3 font-mono text-xs text-gray-400">
                  <div className="text-green-400">// Hackathon Mode Blueprint</div>
                  <div>projectName: "EcoTrace Ledger"</div>
                  <div>suggestedTechStack: ["React", "Express", "Drizzle SQL"]</div>
                  <div>winningProbability: 91%</div>
                </div>
              </div>
            )}

            {activeTab === "startup" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-2xl text-white">SaaS Product Validation</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Test business assumptions before investing capital. Define target industries, customer segments, budgets, and get actionable plans.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FFA77F]" /> Structured VC Competitor Weakness list</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FFA77F]" /> Multi-channel Go-To-Market strategy</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FFA77F]" /> Future monetization scaling models</li>
                  </ul>
                </div>
                <div className="bg-gray-850 p-6 rounded-2xl border border-gray-800 space-y-3 font-mono text-xs text-gray-400">
                  <div className="text-amber-400">// Startup Mode Strategy</div>
                  <div>startupIdea: "SubZero.io"</div>
                  <div>uniqueValueProposition: "Serverless cold-start caching layer"</div>
                  <div>revenueModel: "SaaS Subscription + API usage pricing"</div>
                </div>
              </div>
            )}

            {activeTab === "organizer" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-2xl text-white">Challenge Set Constructor</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Designed for companies or universities hosting developer events. Simply input a general theme, duration, and target audience, and retrieve pristine organizer parameters.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FFA77F]" /> 3 detailed developer tracks</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FFA77F]" /> Precise judging rubric & point assignments</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FFA77F]" /> Expected submission list</li>
                  </ul>
                </div>
                <div className="bg-gray-850 p-6 rounded-2xl border border-gray-800 space-y-3 font-mono text-xs text-gray-400">
                  <div className="text-blue-400">// Organizer Rubric</div>
                  <div>theme: "AI Ethics & Trust"</div>
                  <div>expectedWinningProjects: ["Deepfake Watermarker", "Bias Guard"]</div>
                  <div>maxPoints: 100</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gray-900/40 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold text-[#FFA77F]">48h</div>
              <div className="text-sm font-medium uppercase tracking-wider text-gray-400">Build-to-Pitch Blueprint</div>
              <p className="text-xs text-gray-500">Chronological build schedules that keep you strictly on track.</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold text-[#FFA77F]">10s</div>
              <div className="text-sm font-medium uppercase tracking-wider text-gray-400">AI Thinking Delay</div>
              <p className="text-xs text-gray-500">Gradual stage-by-stage insights instead of plain unstructured logs.</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold text-[#FFA77F]">3+</div>
              <div className="text-sm font-medium uppercase tracking-wider text-gray-400">Export Options</div>
              <p className="text-xs text-gray-500">Download formatted Markdown, PDF files, or copy to clipboard instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials (Placeholder) */}
      <section className="py-20 bg-gray-900/20 text-center border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-4 space-y-8">
          <h2 className="font-display font-bold text-2xl text-white">Praise from Creators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="bg-gray-800/20 border border-gray-700/30 rounded-xl p-6 space-y-4">
              <p className="text-sm text-gray-300 italic">
                "Ideathonix AI saved our hackathon team 5 hours of brainstorming. We ended up building an offline-first healthcare app that placed 2nd in the track!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold">AL</div>
                <div>
                  <div className="text-xs font-bold text-white">Alex L.</div>
                  <div className="text-[10px] text-gray-500">Fullstack Dev / Hackathon Winner</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/20 border border-gray-700/30 rounded-xl p-6 space-y-4">
              <p className="text-sm text-gray-300 italic">
                "As an event coordinator, generating challenge statements and judging rubrics is the most tedious part. This app gave me three completely fresh paths."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold">SM</div>
                <div>
                  <div className="text-xs font-bold text-white">Sarah M.</div>
                  <div className="text-[10px] text-gray-500">Hackathon Lead, TechHub Global</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing (SaaS Placeholder) */}
      <section id="pricing" className="py-24 bg-gray-900/60 border-t border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center space-y-3 mb-16">
            <h2 className="font-display font-bold text-3xl text-white">Transparent SaaS Pricing</h2>
            <p className="text-gray-400">Generate freely or unlock premium evaluator speeds and limitless archives.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-wider font-bold text-[#FFA77F] bg-[#FFA77F]/10 px-2.5 py-1 rounded">Hobbyist</span>
                <h3 className="font-display font-bold text-2xl text-white">Free Plan</h3>
                <p className="text-sm text-gray-400">Perfect for students and first-time hackathon attendees.</p>
                <div className="text-3xl font-display font-bold text-white">
                  $0 <span className="text-sm text-gray-500 font-sans font-normal">/ forever</span>
                </div>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FFA77F]" /> Generate up to 5 ideas per month</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FFA77F]" /> Essential Multi-Score scoring</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FFA77F]" /> Standard Firestore archive saving</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FFA77F]" /> Basic Markdown & Copier export</li>
                </ul>
              </div>
              <button 
                onClick={onStart}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 rounded-xl transition-all"
              >
                Get Started
              </button>
            </div>

            {/* Premium Tier */}
            <div className="bg-gray-800 border-2 border-[#FFA77F] rounded-2xl p-8 space-y-6 flex flex-col justify-between relative shadow-xl shadow-[#FFA77F]/5">
              <div className="absolute -top-3 right-8 bg-[#FFA77F] text-[#1F2937] text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full">
                Most Popular
              </div>
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-wider font-bold text-[#FFA77F] bg-[#FFA77F]/10 px-2.5 py-1 rounded">Professional</span>
                <h3 className="font-display font-bold text-2xl text-white">Pro Studio</h3>
                <p className="text-sm text-gray-300">For ambitious startup founders and hackathon organizers.</p>
                <div className="text-3xl font-display font-bold text-white">
                  $19 <span className="text-sm text-gray-500 font-sans font-normal">/ month</span>
                </div>
                <ul className="space-y-3 text-sm text-gray-200">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FFA77F]" /> Limitless high-speed generations</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FFA77F]" /> In-depth VC Weakness competitor metrics</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FFA77F]" /> Complete hours-by-hours roadmaps</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FFA77F]" /> Formatted PDF, Markdown & README downloads</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FFA77F]" /> Custom branding export support</li>
                </ul>
              </div>
              <button 
                onClick={onStart}
                className="w-full bg-[#FFA77F] text-[#1F2937] font-bold py-3 rounded-xl transition-all hover:bg-[#FFA77F]/90 shadow-[0_4px_20px_rgba(255,167,127,0.3)]"
              >
                Unlock Pro Workspace
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faq" className="py-24 max-w-4xl mx-auto px-4">
        <div className="text-center space-y-3 mb-16">
          <HelpCircle className="w-10 h-10 text-[#FFA77F] mx-auto" />
          <h2 className="font-display font-bold text-3xl text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-gray-800/40 border border-gray-700/30 rounded-xl p-6">
              <h4 className="font-display font-semibold text-base text-white mb-2">{faq.q}</h4>
              <p className="text-sm text-gray-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-950 py-12 text-center text-gray-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-6 rounded bg-[#FFA77F] flex items-center justify-center text-[#1F2937] font-display font-bold text-sm">
              I
            </div>
            <span className="font-display font-bold text-sm tracking-tight text-white">
              Ideathonix<span className="text-[#FFA77F]">.AI</span>
            </span>
          </div>

          <p className="max-w-md mx-auto leading-relaxed">
            Brainstorm smarter, structure with complete developer stacks, and objectively evaluate your winning concepts instantly.
          </p>

          <div className="flex justify-center gap-6 text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#modes" className="hover:text-white transition-colors">Modes</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="pt-6 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <span>&copy; {new Date().getFullYear()} Ideathonix AI. All rights reserved.</span>
            <span className="flex items-center gap-1">
              Crafted for innovators with <Heart className="w-3 h-3 text-[#FFA77F] fill-[#FFA77F]" />
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
