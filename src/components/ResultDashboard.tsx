import React, { useState } from "react";
import { 
  ArrowLeft, 
  Bookmark, 
  Copy, 
  Download, 
  FileText, 
  Award, 
  CheckCircle, 
  Cpu, 
  Globe, 
  Activity, 
  Sparkles, 
  TrendingUp, 
  BookOpen, 
  MessageSquare,
  BookmarkCheck,
  Check,
  Code
} from "lucide-react";
import { HackathonOutput, StartupOutput, OrganizerOutput } from "../types";

interface ResultDashboardProps {
  mode: "hackathon" | "startup" | "organizer";
  result: any; // We'll cast to appropriate type based on mode
  isSaved: boolean;
  isBookmarked: boolean;
  onBack: () => void;
  onSave: () => void;
  onToggleBookmark: () => void;
}

export default function ResultDashboard({ 
  mode, 
  result, 
  isSaved, 
  isBookmarked, 
  onBack, 
  onSave, 
  onToggleBookmark 
}: ResultDashboardProps) {
  const [activeTab, setActiveTab] = useState<"summary" | "technical" | "roadmap" | "pitch">("summary");
  const [copied, setCopied] = useState(false);

  // Safe Casts / Fallbacks
  const hResult = result as HackathonOutput;
  const sResult = result as StartupOutput;
  const oResult = result as OrganizerOutput;

  // Title and Tagline extraction based on mode
  const title = mode === "hackathon" ? (hResult.projectName || "Hackathon Project") :
                mode === "startup" ? (sResult.startupIdea || "Startup Concept") :
                (oResult.tagline ? `${oResult.themeOverview ? "Event Challenge: " + oResult.tagline : "Challenge Set"}` : "Hackathon Challenges");

  const tagline = mode === "hackathon" ? hResult.tagline :
                  mode === "startup" ? sResult.tagline :
                  (oResult.themeOverview?.substring(0, 100) + "...");

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadMarkdown = () => {
    let text = `# ${title}\n> ${tagline}\n\n`;
    
    if (mode === "hackathon") {
      text += `## Problem Statement\n${hResult.problemStatement}\n\n`;
      text += `## Proposed Solution\n${hResult.proposedSolution}\n\n`;
      text += `### Why it Matters\n${hResult.whyProblemMatters}\n\n`;
      text += `### Target Users\n${hResult.targetUsers}\n\n`;
      text += `## Core Features\n${hResult.coreFeatures?.map(f => `- ${f}`).join("\n")}\n\n`;
      text += `## Technical Stack\n- Stack: ${hResult.suggestedTechStack?.join(", ")}\n- Database: ${hResult.suggestedDatabase}\n- APIs: ${hResult.suggestedAPIs?.join(", ")}\n\n`;
      text += `## Elevator Pitch\n"${hResult.pitchSummary}"\n`;
    } else if (mode === "startup") {
      text += `## Validation & Gap\n${sResult.problemValidation}\n\nMarket Gap: ${sResult.marketGap}\n\n`;
      text += `## UVP (Unique Value Proposition)\n${sResult.uniqueValueProposition}\n\n`;
      text += `## Revenue Model\n${sResult.revenueModel}\n\n`;
      text += `## MVP Features\n${sResult.mvpFeatures?.map(f => `- ${f}`).join("\n")}\n\n`;
    } else {
      text += `## Theme Overview\n${oResult.themeOverview}\n\n`;
      text += `## Challenge Tracks\n${oResult.challengeStatements?.map(t => `- ${t}`).join("\n")}\n\n`;
    }

    const blob = new Blob([text], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-blueprint.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadReadme = () => {
    let readme = `# ${title}\n> ${tagline}\n\n## Summary\n`;
    readme += mode === "hackathon" ? hResult.readmeSummary :
              mode === "startup" ? sResult.uniqueValueProposition :
              oResult.themeOverview;
              
    readme += `\n\nGenerated with Ideathonix.AI`;

    const blob = new Blob([readme], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `README-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderSummaryTab = () => {
    if (mode === "hackathon") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FFA77F] flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              The Core Problem
            </h4>
            <h3 className="font-display font-semibold text-lg text-white">Problem Statement</h3>
            <p className="text-sm text-gray-300 leading-relaxed font-sans">{hResult.problemStatement}</p>
            <div className="pt-3 border-t border-gray-800/60">
              <span className="text-xs font-semibold text-gray-500 block mb-1">WHY THIS PROBLEM MATTERS</span>
              <p className="text-xs text-gray-400 leading-normal">{hResult.whyProblemMatters}</p>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FFA77F] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              The AI Recommendation
            </h4>
            <h3 className="font-display font-semibold text-lg text-white">Proposed Solution</h3>
            <p className="text-sm text-gray-300 leading-relaxed font-sans">{hResult.proposedSolution}</p>
            <div className="pt-3 border-t border-gray-800/60">
              <span className="text-xs font-semibold text-gray-500 block mb-1">TARGET USERS</span>
              <p className="text-xs text-gray-400 leading-normal">{hResult.targetUsers}</p>
            </div>
          </div>
        </div>
      );
    }

    if (mode === "startup") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FFA77F] flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              Market Validation
            </h4>
            <h3 className="font-display font-semibold text-lg text-white">Problem & Market Gap</h3>
            <p className="text-sm text-gray-300 leading-relaxed">{sResult.problemValidation}</p>
            <div className="pt-3 border-t border-gray-800/60">
              <span className="text-xs font-semibold text-gray-500 block mb-1">THE MARKET GAP</span>
              <p className="text-xs text-gray-400 leading-normal">{sResult.marketGap}</p>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FFA77F] flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              Value Proposition
            </h4>
            <h3 className="font-display font-semibold text-lg text-white">Unique Value Prop & Revenue</h3>
            <p className="text-sm text-gray-300 leading-relaxed">{sResult.uniqueValueProposition}</p>
            <div className="pt-3 border-t border-gray-800/60">
              <span className="text-xs font-semibold text-gray-500 block mb-1">REVENUE MODEL</span>
              <p className="text-xs text-gray-400 leading-normal">{sResult.revenueModel}</p>
            </div>
          </div>
        </div>
      );
    }

    // Organizer Mode
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-widest text-[#FFA77F] flex items-center gap-1.5">
          <Globe className="w-4 h-4" />
          Event Concept
        </h4>
        <h3 className="font-display font-semibold text-lg text-white">Theme Overview</h3>
        <p className="text-sm text-gray-300 leading-relaxed font-sans">{oResult.themeOverview}</p>
        <div className="pt-3 border-t border-gray-800/60">
          <span className="text-xs font-semibold text-gray-500 block mb-1">DIFFICULTY ANALYSIS</span>
          <p className="text-xs text-gray-400 leading-normal">{oResult.difficultyAnalysis}</p>
        </div>
      </div>
    );
  };

  const renderTechnicalTab = () => {
    if (mode === "hackathon") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FFA77F] flex items-center gap-1.5">
              <Cpu className="w-4 h-4" />
              Tech Stack Selection
            </h4>
            <div className="space-y-3">
              <div>
                <span className="text-xs text-gray-500 font-semibold uppercase block">CORE TECH STACK</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {hResult.suggestedTechStack?.map((t, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 bg-gray-800 border border-gray-700 rounded-lg text-white font-mono">{t}</span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs text-gray-500 font-semibold uppercase block">SUGGESTED APIs & SDKs</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {hResult.suggestedAPIs?.map((api, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 bg-gray-800/50 border border-gray-700/50 rounded-lg text-gray-300 font-mono">{api}</span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs text-gray-500 font-semibold uppercase block">DATABASE ARCHITECTURE</span>
                <p className="text-sm text-gray-300 font-mono text-xs mt-1 bg-gray-950 p-2.5 rounded-lg">{hResult.suggestedDatabase}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FFA77F] flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4" />
              Architecture Style
            </h4>
            <span className="text-xs text-gray-500 font-semibold uppercase block">ARCHITECTURE BLUEPRINT</span>
            <p className="text-sm text-gray-300 leading-relaxed font-sans">{hResult.suggestedArchitecture}</p>

            <div className="pt-3 border-t border-gray-800/60">
              <span className="text-xs text-gray-500 font-semibold uppercase block mb-2">CORE MVP FEATURES</span>
              <ul className="space-y-2">
                {hResult.coreFeatures?.map((f, i) => (
                  <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#FFA77F] shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    }

    if (mode === "startup") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FFA77F] flex items-center gap-1.5">
              <Cpu className="w-4 h-4" />
              SaaS Infrastructure
            </h4>
            <div className="space-y-3">
              <div>
                <span className="text-xs text-gray-500 font-semibold uppercase block mb-1">SCALABLE TECH STACK</span>
                <div className="flex flex-wrap gap-1.5">
                  {sResult.recommendedTechStack?.map((t, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 bg-gray-800 border border-gray-700 rounded-lg text-white font-mono">{t}</span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-gray-800/60">
                <span className="text-xs text-gray-500 font-semibold uppercase block mb-1">BUSINESS MODEL DESIGN</span>
                <p className="text-sm text-gray-300">{sResult.businessModel}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FFA77F] flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              MVP Requirements
            </h4>
            <span className="text-xs text-gray-500 font-semibold uppercase block mb-2">ESSENTIAL MVP LAUNCH FEATURES</span>
            <ul className="space-y-2">
              {sResult.mvpFeatures?.map((f, i) => (
                <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FFA77F] shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }

    // Organizer Mode
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#FFA77F] flex items-center gap-1.5">
            <Award className="w-4 h-4" />
            Evaluation Schema
          </h4>
          <span className="text-xs text-gray-500 font-semibold uppercase block mb-3">JUDGING POINT ALLOCATIONS</span>
          <div className="space-y-3">
            {oResult.evaluationCriteria?.map((criteria, i) => (
              <div key={i} className="bg-gray-850 p-3 rounded-xl border border-gray-800 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-white">{criteria.criteriaName}</span>
                  <p className="text-[10px] text-gray-400">{criteria.description}</p>
                </div>
                <div className="text-xs font-bold text-[#FFA77F] bg-[#FFA77F]/10 px-2 py-1 rounded shrink-0">
                  {criteria.maxPoints} pts
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#FFA77F] flex items-center gap-1.5">
            <Globe className="w-4 h-4" />
            Hypothetical Winning Submissions
          </h4>
          <span className="text-xs text-gray-500 font-semibold uppercase block mb-2">EXPECTED WINNING SUBMISSIONS</span>
          <ul className="space-y-2">
            {oResult.expectedWinningProjects?.map((p, i) => (
              <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                <CheckCircle className="w-4.5 h-4.5 text-[#FFA77F] shrink-0 mt-0.5" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const renderRoadmapTab = () => {
    if (mode === "hackathon") {
      return (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-6">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#FFA77F] flex items-center gap-1.5">
            <Activity className="w-4 h-4" />
            Build Timeline
          </h4>
          <h3 className="font-display font-semibold text-lg text-white">48-Hour Execution Roadmap</h3>
          <div className="relative border-l border-gray-800 pl-6 space-y-6">
            {hResult.implementationRoadmap?.map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#FFA77F] border-2 border-gray-900" />
                <span className="text-xs font-bold text-[#FFA77F] font-mono block uppercase">{item.phase}</span>
                <p className="text-xs text-gray-300 mt-1 leading-normal font-sans">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (mode === "startup") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FFA77F] flex items-center gap-1.5">
              <Globe className="w-4 h-4" />
              Go-To-Market
            </h4>
            <h3 className="font-display font-semibold text-sm text-white">First 100 Customers Launch Strategy</h3>
            <ul className="space-y-2">
              {sResult.goToMarketStrategy?.map((s, i) => (
                <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                  <div className="w-5 h-5 bg-gray-850 rounded flex items-center justify-center text-[10px] font-bold text-[#FFA77F] shrink-0 mt-0.5 border border-gray-800">
                    {i+1}
                  </div>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FFA77F] flex items-center gap-1.5">
              <Activity className="w-4 h-4" />
              Milestone Roadmap
            </h4>
            <h3 className="font-display font-semibold text-sm text-white">Expansion Timeline</h3>
            <ul className="space-y-2">
              {sResult.futureRoadmap?.map((milestone, i) => (
                <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#FFA77F] shrink-0 mt-0.5" />
                  <span>{milestone}</span>
                </li>
              ))}
            </ul>
            <div className="pt-3 border-t border-gray-800/60">
              <span className="text-xs text-gray-500 font-semibold block mb-1">GROWTH PLAN</span>
              <p className="text-xs text-gray-400 leading-normal">{sResult.growthPlan}</p>
            </div>
          </div>
        </div>
      );
    }

    // Organizer Mode
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#FFA77F] flex items-center gap-1.5">
            <Code className="w-4 h-4" />
            Event Challenges
          </h4>
          <h3 className="font-display font-semibold text-sm text-white">Developer Brief Challenge Tracks</h3>
          <div className="space-y-3">
            {oResult.problemStatements?.map((statement, i) => (
              <div key={i} className="bg-gray-850 p-4 rounded-xl border border-gray-800 space-y-2">
                <span className="text-xs font-bold text-[#FFA77F] block uppercase font-mono">TRACK 0{i+1}: {statement.title}</span>
                <p className="text-xs text-gray-300 leading-normal">{statement.description}</p>
                <div className="pt-1 text-[10px] text-gray-500">
                  Direct Target Audience: {statement.targetAudience}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#FFA77F] flex items-center gap-1.5">
            <Activity className="w-4 h-4" />
            Organizer Challenge statements
          </h4>
          <ul className="space-y-2">
            {oResult.challengeStatements?.map((stmt, i) => (
              <li key={i} className="text-xs text-gray-300 flex items-start gap-2 bg-gray-850 p-2.5 rounded-lg border border-gray-800/60 font-mono">
                <span className="text-[#FFA77F]">&gt;</span>
                <span>{stmt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const renderPitchTab = () => {
    if (mode === "hackathon") {
      return (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#FFA77F] flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4" />
            Compelling Elevator Pitch
          </h4>
          <h3 className="font-display font-semibold text-lg text-white">1-Minute Pitch Script</h3>
          <p className="text-sm text-gray-200 leading-relaxed italic bg-gray-950 p-5 rounded-2xl border border-gray-800 font-serif">
            "{hResult.pitchSummary}"
          </p>
          <div className="pt-3 border-t border-gray-800/60">
            <span className="text-xs font-semibold text-gray-500 block mb-1">FUTURE SCOPE & SCALE</span>
            <p className="text-xs text-gray-400 leading-normal">{hResult.futureScope}</p>
          </div>
        </div>
      );
    }

    if (mode === "startup") {
      return (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#FFA77F] flex items-center gap-1.5">
            <Award className="w-4 h-4" />
            Investment Evaluation
          </h4>
          <h3 className="font-display font-semibold text-lg text-white">Investment Readiness Assessment</h3>
          <p className="text-sm text-gray-200 leading-relaxed italic bg-gray-950 p-5 rounded-2xl border border-gray-800">
            {sResult.investmentReadiness}
          </p>
        </div>
      );
    }

    // Organizer Mode
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-widest text-[#FFA77F] flex items-center gap-1.5">
          <MessageSquare className="w-4 h-4" />
          Judge Facilitation Guidelines
        </h4>
        <h3 className="font-display font-semibold text-lg text-white">Recommended Judging Parameters</h3>
        <ul className="space-y-3">
          {oResult.recommendedJudgingParameters?.map((param, i) => (
            <li key={i} className="text-xs text-gray-300 flex items-start gap-2 bg-gray-850 p-3 rounded-xl border border-gray-800">
              <Check className="w-4 h-4 text-[#FFA77F] shrink-0 mt-0.5" />
              <span>{param}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Scores rendering helpers
  const scores = mode === "hackathon" ? [
    { label: "Feasibility Score", val: hResult.feasibilityScore },
    { label: "Judge Appeal", val: hResult.judgeAppealScore },
    { label: "Innovation Index", val: hResult.innovationScore },
    { label: "Winning Probability", val: hResult.winningProbability }
  ] : mode === "startup" ? [
    { label: "Feasibility", val: sResult.feasibilityScore },
    { label: "Innovation Index", val: sResult.innovationScore }
  ] : [];

  return (
    <div className="space-y-8 font-sans">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-all bg-gray-800/50 border border-gray-700/50 px-4 py-2 rounded-lg self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Generator
        </button>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onSave}
            disabled={isSaved}
            className={`text-xs font-bold px-4 py-2 rounded-lg transition-all border flex items-center gap-2 ${
              isSaved 
                ? "bg-gray-850 border-gray-800 text-gray-500 cursor-not-allowed" 
                : "bg-gray-800 hover:bg-gray-700 border-gray-700 text-white"
            }`}
          >
            <Check className="w-4 h-4 text-[#FFA77F]" />
            {isSaved ? "Saved to Archive" : "Save Workspace"}
          </button>

          <button
            onClick={onToggleBookmark}
            className="p-2 bg-gray-850 hover:bg-gray-700 text-gray-300 hover:text-[#FFA77F] border border-gray-700/50 rounded-lg transition-all"
            title="Bookmark Idea"
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-4.5 h-4.5 text-[#FFA77F]" />
            ) : (
              <Bookmark className="w-4.5 h-4.5" />
            )}
          </button>

          <div className="h-6 w-px bg-gray-800" />

          {/* Export Actions */}
          <button
            onClick={handleCopy}
            className="p-2 bg-gray-850 hover:bg-gray-700 text-gray-300 hover:text-[#FFA77F] border border-gray-700/50 rounded-lg transition-all"
            title="Copy Raw JSON"
          >
            {copied ? <Check className="w-4.5 h-4.5 text-green-400" /> : <Copy className="w-4.5 h-4.5" />}
          </button>

          <button
            onClick={downloadMarkdown}
            className="p-2 bg-gray-850 hover:bg-gray-700 text-gray-300 hover:text-[#FFA77F] border border-gray-700/50 rounded-lg transition-all"
            title="Download Blueprint MD"
          >
            <Download className="w-4.5 h-4.5" />
          </button>

          <button
            onClick={downloadReadme}
            className="p-2 bg-gray-850 hover:bg-[#FFA77F]/10 text-gray-300 hover:text-[#FFA77F] border border-[#FFA77F]/30 rounded-lg transition-all flex items-center gap-1.5 text-xs font-bold"
            title="Download README.md"
          >
            <FileText className="w-4 h-4 text-[#FFA77F]" />
            README
          </button>
        </div>
      </div>

      {/* Main Pitch Card / Concept Header */}
      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FFA77F] to-[#ff7d47]" />
        
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFA77F]/10 border border-[#FFA77F]/20 text-[#FFA77F] rounded-full text-[10px] font-bold uppercase tracking-wider">
            {mode === "hackathon" && "Hackathon Champion Spec"}
            {mode === "startup" && "VC-Grade Business Model"}
            {mode === "organizer" && "Challenge Briefing Package"}
          </div>

          <div className="space-y-1.5">
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight">{title}</h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-3xl font-sans">{tagline}</p>
          </div>

          {/* Scores Gauge meters */}
          {scores.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-800/80">
              {scores.map((s, i) => (
                <div key={i} className="bg-gray-850 p-4 rounded-2xl border border-gray-800 space-y-2">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="text-gray-500 font-semibold">{s.label}</span>
                    <span className="text-[#FFA77F] font-mono font-bold">{s.val}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-950 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#FFA77F] to-[#ff7d47] rounded-full transition-all duration-1000"
                      style={{ width: `${s.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-800 overflow-x-auto">
        <button
          onClick={() => setActiveTab("summary")}
          className={`py-3.5 px-5 font-semibold text-xs uppercase tracking-wider border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === "summary"
              ? "border-[#FFA77F] text-[#FFA77F] bg-gray-900/20"
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Executive Summary
        </button>

        <button
          onClick={() => setActiveTab("technical")}
          className={`py-3.5 px-5 font-semibold text-xs uppercase tracking-wider border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === "technical"
              ? "border-[#FFA77F] text-[#FFA77F] bg-gray-900/20"
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          <Cpu className="w-4 h-4" />
          Technical Specs
        </button>

        <button
          onClick={() => setActiveTab("roadmap")}
          className={`py-3.5 px-5 font-semibold text-xs uppercase tracking-wider border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === "roadmap"
              ? "border-[#FFA77F] text-[#FFA77F] bg-gray-900/20"
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          <Activity className="w-4 h-4" />
          Roadmap & Tracks
        </button>

        <button
          onClick={() => setActiveTab("pitch")}
          className={`py-3.5 px-5 font-semibold text-xs uppercase tracking-wider border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === "pitch"
              ? "border-[#FFA77F] text-[#FFA77F] bg-gray-900/20"
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          {mode === "hackathon" ? "Elevator Pitch" : mode === "startup" ? "VC Readiness" : "Judging Guide"}
        </button>
      </div>

      {/* Tabs Content */}
      <div>
        {activeTab === "summary" && renderSummaryTab()}
        {activeTab === "technical" && renderTechnicalTab()}
        {activeTab === "roadmap" && renderRoadmapTab()}
        {activeTab === "pitch" && renderPitchTab()}
      </div>
    </div>
  );
}
