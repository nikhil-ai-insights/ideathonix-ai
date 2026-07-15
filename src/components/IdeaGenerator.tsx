import React, { useState } from "react";
import { 
  Code, 
  Briefcase, 
  Users, 
  Sparkles, 
  Zap, 
  Cpu, 
  DollarSign, 
  Globe, 
  Layers, 
  Target,
  Trophy
} from "lucide-react";

interface IdeaGeneratorProps {
  onGenerate: (mode: "hackathon" | "startup" | "organizer", inputs: any) => void;
  loading: boolean;
}

export default function IdeaGenerator({ onGenerate, loading }: IdeaGeneratorProps) {
  const [activeMode, setActiveMode] = useState<"hackathon" | "startup" | "organizer">("hackathon");

  // Hackathon states
  const [hackathonInputs, setHackathonInputs] = useState({
    theme: "AI-Powered Productivity",
    duration: "36 Hours",
    teamSize: "4",
    skillLevel: "Intermediate",
    preferredTech: "React, TypeScript, Firebase, Tailwind CSS",
    problemDomain: "SaaS / Workspace Collaboration",
    aiRequired: true,
    hardwareAllowed: false,
    preferredIndustry: "Productivity SaaS"
  });

  // Startup states
  const [startupInputs, setStartupInputs] = useState({
    industry: "B2B SaaS Developer Tools",
    budget: "$5,000",
    country: "Global",
    targetCustomers: "Software Engineers & Tech Leads",
    businessType: "API SaaS / Subscription",
    existingSkills: "React, Node.js, Cloud Architecting",
    aiRequired: true,
    problemArea: "API Mocking and Real-time Testing"
  });

  // Organizer states
  const [organizerInputs, setOrganizerInputs] = useState({
    theme: "Generative AI for Sustainable Energy",
    duration: "48 Hours",
    difficulty: "Mixed (All levels)",
    expectedParticipants: "250 Developers",
    industry: "Clean Tech & Sustainability",
    prizePool: "$15,000"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    
    if (activeMode === "hackathon") {
      onGenerate("hackathon", hackathonInputs);
    } else if (activeMode === "startup") {
      onGenerate("startup", startupInputs);
    } else {
      onGenerate("organizer", organizerInputs);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Mode Selectors */}
      <div className="grid grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() => setActiveMode("hackathon")}
          className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all text-center gap-2 relative overflow-hidden group ${
            activeMode === "hackathon"
              ? "border-[#FFA77F] bg-gray-900 shadow-lg shadow-[#FFA77F]/5"
              : "border-gray-800 bg-gray-900/40 hover:border-gray-700 hover:bg-gray-900/60"
          }`}
        >
          {activeMode === "hackathon" && <div className="absolute top-0 left-0 right-0 h-1 bg-[#FFA77F]" />}
          <Code className={`w-6 h-6 ${activeMode === "hackathon" ? "text-[#FFA77F]" : "text-gray-500 group-hover:text-gray-400"}`} />
          <span className={`text-xs font-semibold uppercase tracking-wider ${activeMode === "hackathon" ? "text-white" : "text-gray-400"}`}>
            Hackathon Mode
          </span>
          <span className="text-[10px] text-gray-500 hidden sm:inline">Win the next dev event</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMode("startup")}
          className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all text-center gap-2 relative overflow-hidden group ${
            activeMode === "startup"
              ? "border-[#FFA77F] bg-gray-900 shadow-lg shadow-[#FFA77F]/5"
              : "border-gray-800 bg-gray-900/40 hover:border-gray-700 hover:bg-gray-900/60"
          }`}
        >
          {activeMode === "startup" && <div className="absolute top-0 left-0 right-0 h-1 bg-[#FFA77F]" />}
          <Briefcase className={`w-6 h-6 ${activeMode === "startup" ? "text-[#FFA77F]" : "text-gray-500 group-hover:text-gray-400"}`} />
          <span className={`text-xs font-semibold uppercase tracking-wider ${activeMode === "startup" ? "text-white" : "text-gray-400"}`}>
            Startup Mode
          </span>
          <span className="text-[10px] text-gray-500 hidden sm:inline">Validate SaaS markets</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMode("organizer")}
          className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all text-center gap-2 relative overflow-hidden group ${
            activeMode === "organizer"
              ? "border-[#FFA77F] bg-gray-900 shadow-lg shadow-[#FFA77F]/5"
              : "border-gray-800 bg-gray-900/40 hover:border-gray-700 hover:bg-gray-900/60"
          }`}
        >
          {activeMode === "organizer" && <div className="absolute top-0 left-0 right-0 h-1 bg-[#FFA77F]" />}
          <Users className={`w-6 h-6 ${activeMode === "organizer" ? "text-[#FFA77F]" : "text-gray-500 group-hover:text-gray-400"}`} />
          <span className={`text-xs font-semibold uppercase tracking-wider ${activeMode === "organizer" ? "text-white" : "text-gray-400"}`}>
            Organizer Mode
          </span>
          <span className="text-[10px] text-gray-500 hidden sm:inline">Craft challenge briefs</span>
        </button>
      </div>

      {/* Main Form Container */}
      <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gray-800 to-[#FFA77F]/30" />

        {activeMode === "hackathon" && (
          <div className="space-y-6">
            <div className="border-b border-gray-800 pb-4 mb-4">
              <h3 className="font-display font-bold text-lg text-white">Configure Hackathon Workspace</h3>
              <p className="text-xs text-gray-400">Tailor the evaluator to fit your exact team and event parameters.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Theme */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Event Theme / Topic</label>
                <div className="relative">
                  <Sparkles className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={hackathonInputs.theme}
                    onChange={(e) => setHackathonInputs({ ...hackathonInputs, theme: e.target.value })}
                    placeholder="e.g., Decentralized Finance or AI for Education"
                    className="w-full bg-gray-850 border border-gray-700/50 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#FFA77F] focus:ring-1 focus:ring-[#FFA77F]/30 font-sans"
                  />
                </div>
              </div>

              {/* Problem Domain */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Problem Domain</label>
                <div className="relative">
                  <Target className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={hackathonInputs.problemDomain}
                    onChange={(e) => setHackathonInputs({ ...hackathonInputs, problemDomain: e.target.value })}
                    placeholder="e.g., Sustainability or Remote Collaboration"
                    className="w-full bg-gray-850 border border-gray-700/50 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#FFA77F] focus:ring-1 focus:ring-[#FFA77F]/30 font-sans"
                  />
                </div>
              </div>

              {/* Duration */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Hackathon Duration</label>
                <select
                  value={hackathonInputs.duration}
                  onChange={(e) => setHackathonInputs({ ...hackathonInputs, duration: e.target.value })}
                  className="w-full bg-gray-850 border border-gray-700/50 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[#FFA77F] focus:ring-1 focus:ring-[#FFA77F]/30"
                >
                  <option value="24 Hours">24 Hours (Sprint)</option>
                  <option value="36 Hours">36 Hours (Standard)</option>
                  <option value="48 Hours">48 Hours (Expanded)</option>
                  <option value="72 Hours">72 Hours (Marathon)</option>
                  <option value="1 Week">1 Week (Asynchronous)</option>
                </select>
              </div>

              {/* Team Size */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Team Size</label>
                <select
                  value={hackathonInputs.teamSize}
                  onChange={(e) => setHackathonInputs({ ...hackathonInputs, teamSize: e.target.value })}
                  className="w-full bg-gray-850 border border-gray-700/50 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[#FFA77F] focus:ring-1 focus:ring-[#FFA77F]/30"
                >
                  <option value="1">1 Person (Solo Coder)</option>
                  <option value="2">2 People (Pair)</option>
                  <option value="3">3 People (Balanced)</option>
                  <option value="4">4 People (Optimal)</option>
                  <option value="5">5 People (Large Team)</option>
                </select>
              </div>

              {/* Skill Level */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Team Skill Level</label>
                <select
                  value={hackathonInputs.skillLevel}
                  onChange={(e) => setHackathonInputs({ ...hackathonInputs, skillLevel: e.target.value })}
                  className="w-full bg-gray-850 border border-gray-700/50 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[#FFA77F] focus:ring-1 focus:ring-[#FFA77F]/30"
                >
                  <option value="Beginner">Beginner (Hobbyist)</option>
                  <option value="Intermediate">Intermediate (Competent)</option>
                  <option value="Advanced">Advanced (Production Ready)</option>
                  <option value="Elite">Elite (Startup Veterans)</option>
                </select>
              </div>

              {/* Preferred Industry */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Preferred Industry Category</label>
                <input
                  type="text"
                  required
                  value={hackathonInputs.preferredIndustry}
                  onChange={(e) => setHackathonInputs({ ...hackathonInputs, preferredIndustry: e.target.value })}
                  placeholder="e.g. Edtech, Fintech, Healthtech"
                  className="w-full bg-gray-850 border border-gray-700/50 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[#FFA77F] focus:ring-1 focus:ring-[#FFA77F]/30 font-sans"
                />
              </div>

              {/* Preferred Tech Stack */}
              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Preferred Technologies & Frameworks</label>
                <div className="relative">
                  <Layers className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={hackathonInputs.preferredTech}
                    onChange={(e) => setHackathonInputs({ ...hackathonInputs, preferredTech: e.target.value })}
                    placeholder="e.g., React, TypeScript, Next.js, Node, Firebase"
                    className="w-full bg-gray-850 border border-gray-700/50 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#FFA77F] focus:ring-1 focus:ring-[#FFA77F]/30 font-mono text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-800">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={hackathonInputs.aiRequired}
                  onChange={(e) => setHackathonInputs({ ...hackathonInputs, aiRequired: e.target.checked })}
                  className="w-4.5 h-4.5 bg-gray-850 border-gray-700 text-[#FFA77F] rounded focus:ring-0 focus:ring-offset-0 accent-[#FFA77F]"
                />
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-gray-300 group-hover:text-white transition-colors">Requires AI Engine Integration</span>
                  <p className="text-[10px] text-gray-500">Inject Gemini core intelligence into features</p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={hackathonInputs.hardwareAllowed}
                  onChange={(e) => setHackathonInputs({ ...hackathonInputs, hardwareAllowed: e.target.checked })}
                  className="w-4.5 h-4.5 bg-gray-850 border-gray-700 text-[#FFA77F] rounded focus:ring-0 focus:ring-offset-0 accent-[#FFA77F]"
                />
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-gray-300 group-hover:text-white transition-colors">IoT / Hardware Allowed</span>
                  <p className="text-[10px] text-gray-500">Incorporate microcontrollers, physical hubs or sensors</p>
                </div>
              </label>
            </div>
          </div>
        )}

        {activeMode === "startup" && (
          <div className="space-y-6">
            <div className="border-b border-gray-800 pb-4 mb-4">
              <h3 className="font-display font-bold text-lg text-white">Configure Startup Workspace</h3>
              <p className="text-xs text-gray-400">Evaluate business feasibility, competitors gap and product monetization models.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Industry */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Target Industry Category</label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={startupInputs.industry}
                    onChange={(e) => setStartupInputs({ ...startupInputs, industry: e.target.value })}
                    placeholder="e.g. Developer Tools SaaS"
                    className="w-full bg-gray-850 border border-gray-700/50 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#FFA77F] focus:ring-1 focus:ring-[#FFA77F]/30"
                  />
                </div>
              </div>

              {/* Target Country */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Target Country / Geography</label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={startupInputs.country}
                    onChange={(e) => setStartupInputs({ ...startupInputs, country: e.target.value })}
                    placeholder="e.g. United States or Global"
                    className="w-full bg-gray-850 border border-gray-700/50 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#FFA77F] focus:ring-1 focus:ring-[#FFA77F]/30"
                  />
                </div>
              </div>

              {/* Budget */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Est. Bootstrapping Budget</label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={startupInputs.budget}
                    onChange={(e) => setStartupInputs({ ...startupInputs, budget: e.target.value })}
                    placeholder="e.g., $2,000"
                    className="w-full bg-gray-850 border border-gray-700/50 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#FFA77F] focus:ring-1 focus:ring-[#FFA77F]/30 font-mono"
                  />
                </div>
              </div>

              {/* Target Customers */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Target Customers / Demographics</label>
                <select
                  value={startupInputs.targetCustomers}
                  onChange={(e) => setStartupInputs({ ...startupInputs, targetCustomers: e.target.value })}
                  className="w-full bg-gray-850 border border-gray-700/50 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[#FFA77F] focus:ring-1 focus:ring-[#FFA77F]/30"
                >
                  <option value="B2B - Small & Medium Businesses">B2B - SMBs</option>
                  <option value="B2B - Enterprise Organizations">B2B - Large Enterprises</option>
                  <option value="B2C - General Consumers">B2C - Consumers</option>
                  <option value="Developers & Creators">Developers & Creators</option>
                  <option value="Niche Freelancers">Niche Freelancers</option>
                </select>
              </div>

              {/* Business Type */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Business / Monetization Model</label>
                <select
                  value={startupInputs.businessType}
                  onChange={(e) => setStartupInputs({ ...startupInputs, businessType: e.target.value })}
                  className="w-full bg-gray-850 border border-gray-700/50 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[#FFA77F] focus:ring-1 focus:ring-[#FFA77F]/30"
                >
                  <option value="SaaS Subscription">SaaS Subscription (Recurring)</option>
                  <option value="Transactional Fee / API usage">Transactional / Pay-As-You-Go</option>
                  <option value="Two-Sided Marketplace">Two-Sided Marketplace</option>
                  <option value="Ad-Supported / Premium Content">Freemium / Ad-Supported</option>
                </select>
              </div>

              {/* Existing Skills */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Your Core Skills / Advantage</label>
                <input
                  type="text"
                  required
                  value={startupInputs.existingSkills}
                  onChange={(e) => setStartupInputs({ ...startupInputs, existingSkills: e.target.value })}
                  placeholder="e.g. JavaScript backend developer, UI Designer"
                  className="w-full bg-gray-850 border border-gray-700/50 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[#FFA77F] focus:ring-1 focus:ring-[#FFA77F]/30 font-sans"
                />
              </div>

              {/* Problem Area */}
              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Specific Core Problem Area</label>
                <textarea
                  required
                  rows={2}
                  value={startupInputs.problemArea}
                  onChange={(e) => setStartupInputs({ ...startupInputs, problemArea: e.target.value })}
                  placeholder="Describe the painful user friction you want to resolve..."
                  className="w-full bg-gray-850 border border-gray-700/50 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[#FFA77F] focus:ring-1 focus:ring-[#FFA77F]/30 font-sans"
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="pt-4 border-t border-gray-800">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={startupInputs.aiRequired}
                  onChange={(e) => setStartupInputs({ ...startupInputs, aiRequired: e.target.checked })}
                  className="w-4.5 h-4.5 bg-gray-850 border-gray-700 text-[#FFA77F] rounded focus:ring-0 focus:ring-offset-0 accent-[#FFA77F]"
                />
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-gray-300 group-hover:text-white transition-colors">Leverage AI capabilities</span>
                  <p className="text-[10px] text-gray-500">Structure intelligent agents or analytics into the business strategy</p>
                </div>
              </label>
            </div>
          </div>
        )}

        {activeMode === "organizer" && (
          <div className="space-y-6">
            <div className="border-b border-gray-800 pb-4 mb-4">
              <h3 className="font-display font-bold text-lg text-white">Configure Organizer Workspace</h3>
              <p className="text-xs text-gray-400">Generate developer tracks, detailed judging rubrics and expected submissions metrics.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Theme */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Overall Hackathon Theme</label>
                <div className="relative">
                  <Trophy className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={organizerInputs.theme}
                    onChange={(e) => setOrganizerInputs({ ...organizerInputs, theme: e.target.value })}
                    placeholder="e.g. Decentralized Climate Solvers"
                    className="w-full bg-gray-850 border border-gray-700/50 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#FFA77F] focus:ring-1 focus:ring-[#FFA77F]/30"
                  />
                </div>
              </div>

              {/* Industry */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Target Industry Focus</label>
                <div className="relative">
                  <Cpu className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={organizerInputs.industry}
                    onChange={(e) => setOrganizerInputs({ ...organizerInputs, industry: e.target.value })}
                    placeholder="e.g. Energy Management or Smart Grid Tech"
                    className="w-full bg-gray-850 border border-gray-700/50 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#FFA77F] focus:ring-1 focus:ring-[#FFA77F]/30"
                  />
                </div>
              </div>

              {/* Prize Pool */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Prize Pool Value</label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={organizerInputs.prizePool}
                    onChange={(e) => setOrganizerInputs({ ...organizerInputs, prizePool: e.target.value })}
                    placeholder="e.g. $10,000 Cash + AWS Credits"
                    className="w-full bg-gray-850 border border-gray-700/50 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#FFA77F] focus:ring-1 focus:ring-[#FFA77F]/30 font-mono"
                  />
                </div>
              </div>

              {/* Expected Participants */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Expected Registrations</label>
                <input
                  type="text"
                  required
                  value={organizerInputs.expectedParticipants}
                  onChange={(e) => setOrganizerInputs({ ...organizerInputs, expectedParticipants: e.target.value })}
                  placeholder="e.g. 300+ worldwide participants"
                  className="w-full bg-gray-850 border border-gray-700/50 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[#FFA77F] focus:ring-1 focus:ring-[#FFA77F]/30"
                />
              </div>

              {/* Difficulty Level */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Event Difficulty Level</label>
                <select
                  value={organizerInputs.difficulty}
                  onChange={(e) => setOrganizerInputs({ ...organizerInputs, difficulty: e.target.value })}
                  className="w-full bg-gray-850 border border-gray-700/50 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[#FFA77F] focus:ring-1 focus:ring-[#FFA77F]/30"
                >
                  <option value="Easy (Beginners)">Easy (Beginner-Friendly)</option>
                  <option value="Mixed (All levels)">Mixed (All Levels welcome)</option>
                  <option value="Intermediate">Intermediate (Normal)</option>
                  <option value="Hard (Advanced)">Hard (Advanced Tech Experts)</option>
                </select>
              </div>

              {/* Duration */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Duration of Event</label>
                <select
                  value={organizerInputs.duration}
                  onChange={(e) => setOrganizerInputs({ ...organizerInputs, duration: e.target.value })}
                  className="w-full bg-gray-850 border border-gray-700/50 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[#FFA77F] focus:ring-1 focus:ring-[#FFA77F]/30"
                >
                  <option value="24 Hours">24 Hours (Sprint)</option>
                  <option value="36 Hours">36 Hours (Standard)</option>
                  <option value="48 Hours">48 Hours (Full Weekend)</option>
                  <option value="72 Hours">72 Hours (Long weekend)</option>
                  <option value="1 Week">1 Week (Virtual Challenge)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Generate Button */}
        <div className="pt-6 border-t border-gray-800 flex items-center justify-between gap-4">
          <div className="text-xs text-gray-500">
            Uses high-fidelity **gemini-3.5-flash** scoring model
          </div>
          <button
            id="generator-submit-btn"
            type="submit"
            disabled={loading}
            className="bg-[#FFA77F] text-[#1F2937] font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-[#FFA77F]/90 transition-all shadow-[0_4px_20px_rgba(255,167,127,0.3)] flex items-center gap-2 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-4 h-4" />
            {loading ? "AI is Thinking..." : "Generate SaaS Workspace"}
          </button>
        </div>
      </form>
    </div>
  );
}
