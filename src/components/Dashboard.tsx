import React, { useState } from "react";
import { 
  Sparkles, 
  Trash2, 
  Search, 
  Bookmark, 
  Settings, 
  User, 
  Briefcase, 
  Code, 
  Users, 
  LogOut, 
  Filter, 
  Trophy, 
  Eye, 
  FileText,
  BookmarkCheck,
  Check,
  Zap,
  Info
} from "lucide-react";
import { GeneratedIdeaDoc, UserProfile } from "../types";

interface DashboardProps {
  userProfile: UserProfile | null;
  savedIdeas: GeneratedIdeaDoc[];
  onSelectIdea: (idea: GeneratedIdeaDoc) => void;
  onDeleteIdea: (ideaId: string) => void;
  onToggleBookmark: (idea: GeneratedIdeaDoc) => void;
  onLogout: () => void;
  onNewGenerate: () => void;
  onUpdateProfile: (name: string, photo: string) => void;
}

export default function Dashboard({
  userProfile,
  savedIdeas,
  onSelectIdea,
  onDeleteIdea,
  onToggleBookmark,
  onLogout,
  onNewGenerate,
  onUpdateProfile
}: DashboardProps) {
  const [activeSubTab, setActiveSubTab] = useState<"history" | "profile" | "settings">("history");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModeFilter, setSelectedModeFilter] = useState<string>("all");
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);

  // Profile Form States
  const [editName, setEditName] = useState(userProfile?.displayName || "");
  const [editPhoto, setEditPhoto] = useState(userProfile?.photoURL || "");
  const [profileSuccess, setProfileSuccess] = useState(false);

  // Filter ideas
  const filteredIdeas = savedIdeas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          idea.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMode = selectedModeFilter === "all" || idea.mode === selectedModeFilter;
    const matchesBookmark = !onlyBookmarked || idea.isBookmarked;
    return matchesSearch && matchesMode && matchesBookmark;
  });

  // Aggregated Stats
  const totalRuns = userProfile?.generationCount || savedIdeas.length;
  const totalBookmarks = savedIdeas.filter(i => i.isBookmarked).length;
  const hackathonsCount = savedIdeas.filter(i => i.mode === "hackathon").length;
  const startupsCount = savedIdeas.filter(i => i.mode === "startup").length;

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(editName, editPhoto);
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-sans selection:bg-[#FFA77F] selection:text-[#1F2937]">
      {/* Upper Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div className="space-y-1">
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white">
            Welcome, {userProfile?.displayName || userProfile?.email?.split("@")[0] || "Innovator"}
          </h1>
          <p className="text-xs text-gray-400">
            Subscription tier: <span className="text-[#FFA77F] uppercase font-bold text-[10px] bg-[#FFA77F]/10 px-2 py-0.5 rounded ml-1">{userProfile?.tier || "free"}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNewGenerate}
            className="bg-[#FFA77F] text-[#1F2937] font-bold text-xs px-5 py-2.5 rounded-lg hover:bg-[#FFA77F]/90 transition-all shadow-[0_4px_12px_rgba(255,167,127,0.2)] flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Generate New Idea
          </button>
          
          <button
            onClick={onLogout}
            className="p-2.5 bg-gray-900 hover:bg-red-950/20 text-gray-400 hover:text-red-400 border border-gray-800 rounded-lg transition-all"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-gray-800 gap-6">
        <button
          onClick={() => setActiveSubTab("history")}
          className={`pb-3 text-xs uppercase font-bold tracking-wider border-b-2 transition-all flex items-center gap-2 ${
            activeSubTab === "history"
              ? "border-[#FFA77F] text-[#FFA77F]"
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          <Trophy className="w-4.5 h-4.5" />
          Saved Blueprints
        </button>

        <button
          onClick={() => setActiveSubTab("profile")}
          className={`pb-3 text-xs uppercase font-bold tracking-wider border-b-2 transition-all flex items-center gap-2 ${
            activeSubTab === "profile"
              ? "border-[#FFA77F] text-[#FFA77F]"
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          <User className="w-4.5 h-4.5" />
          Profile Space
        </button>

        <button
          onClick={() => setActiveSubTab("settings")}
          className={`pb-3 text-xs uppercase font-bold tracking-wider border-b-2 transition-all flex items-center gap-2 ${
            activeSubTab === "settings"
              ? "border-[#FFA77F] text-[#FFA77F]"
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          <Settings className="w-4.5 h-4.5" />
          SaaS Settings
        </button>
      </div>

      {/* Main Panels */}
      <div>
        {activeSubTab === "history" && (
          <div className="space-y-6">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl space-y-1">
                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Workspace Runs</span>
                <div className="text-2xl font-bold text-white font-mono">{totalRuns}</div>
                <p className="text-[10px] text-gray-500">Evaluations completed total</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl space-y-1">
                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Active Bookmarks</span>
                <div className="text-2xl font-bold text-white font-mono">{totalBookmarks}</div>
                <p className="text-[10px] text-gray-500">Starred ideas saved</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl space-y-1">
                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Hackathons Mapped</span>
                <div className="text-2xl font-bold text-white font-mono">{hackathonsCount}</div>
                <p className="text-[10px] text-gray-500">Hackathon mode executions</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl space-y-1">
                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Startup Business Plans</span>
                <div className="text-2xl font-bold text-white font-mono">{startupsCount}</div>
                <p className="text-[10px] text-gray-500">Startup validation runs</p>
              </div>
            </div>

            {/* Filter controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-900/40 p-4 rounded-2xl border border-gray-800">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search saved templates by name or taglines..."
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-[#FFA77F] focus:ring-1 focus:ring-[#FFA77F]/30"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Filter className="w-3.5 h-3.5 text-[#FFA77F]" />
                  <span>Mode:</span>
                </div>
                <select
                  value={selectedModeFilter}
                  onChange={(e) => setSelectedModeFilter(e.target.value)}
                  className="bg-gray-900 border border-gray-800 rounded-lg text-xs text-white py-2 px-3 focus:outline-none focus:border-[#FFA77F]"
                >
                  <option value="all">All Modes</option>
                  <option value="hackathon">Hackathon</option>
                  <option value="startup">Startup</option>
                  <option value="organizer">Organizer</option>
                </select>

                <button
                  onClick={() => setOnlyBookmarked(!onlyBookmarked)}
                  className={`text-xs font-bold px-3 py-2 rounded-lg border transition-all flex items-center gap-1.5 ${
                    onlyBookmarked
                      ? "bg-[#FFA77F]/10 border-[#FFA77F] text-[#FFA77F]"
                      : "bg-gray-900 border-gray-800 text-gray-400 hover:text-white"
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  Starred Only
                </button>
              </div>
            </div>

            {/* Bento Grid */}
            {filteredIdeas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredIdeas.map((idea) => (
                  <div
                    key={idea.id}
                    className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col justify-between hover:border-gray-700 transition-all hover:-translate-y-0.5 relative group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        {/* Mode badge */}
                        <span className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                          idea.mode === "hackathon" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                          idea.mode === "startup" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                          "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        }`}>
                          {idea.mode}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleBookmark(idea);
                            }}
                            className="text-gray-500 hover:text-[#FFA77F] transition-colors p-1"
                          >
                            {idea.isBookmarked ? (
                              <BookmarkCheck className="w-4 h-4 text-[#FFA77F]" />
                            ) : (
                              <Bookmark className="w-4 h-4" />
                            )}
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteIdea(idea.id);
                            }}
                            className="text-gray-500 hover:text-red-400 transition-colors p-1"
                            title="Delete Template"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-display font-bold text-lg text-white group-hover:text-[#FFA77F] transition-colors">
                          {idea.title}
                        </h3>
                        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                          {idea.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-800/80 mt-4 flex items-center justify-between text-[10px] text-gray-500 font-mono">
                      <span>{new Date(idea.updatedAt?.seconds * 1000 || Date.now()).toLocaleDateString()}</span>
                      <button
                        onClick={() => onSelectIdea(idea)}
                        className="text-[#FFA77F] hover:underline flex items-center gap-1 font-sans font-bold"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Inspect Spec
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-900/20 border border-gray-800 border-dashed rounded-3xl space-y-3">
                <Sparkles className="w-8 h-8 text-gray-500 mx-auto" />
                <h3 className="font-display font-bold text-base text-gray-400">No blueprints saved</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  You don't have any generated ideas matching your search filters yet. Tap below to launch the evaluator.
                </p>
                <button
                  onClick={onNewGenerate}
                  className="bg-[#FFA77F]/10 border border-[#FFA77F]/30 text-[#FFA77F] hover:bg-[#FFA77F]/20 text-xs font-bold px-4 py-2 rounded-lg transition-all"
                >
                  Generate First Idea
                </button>
              </div>
            )}
          </div>
        )}

        {activeSubTab === "profile" && (
          <div className="max-w-xl bg-gray-900 border border-gray-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-gray-800 pb-4">
              <h3 className="font-display font-bold text-lg text-white">Manage Profile Space</h3>
              <p className="text-xs text-gray-400">Modify display configurations for your workspace downloads.</p>
            </div>

            {profileSuccess && (
              <div className="bg-green-950/40 border border-green-800/50 rounded-xl p-3 flex items-center gap-2 text-xs text-green-200">
                <Check className="w-4 h-4 text-green-400" />
                <span>Profile saved successfully!</span>
              </div>
            )}

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400">Email Address (Read Only)</label>
                <input
                  type="text"
                  disabled
                  value={userProfile?.email || ""}
                  className="w-full bg-gray-950 border border-gray-800 text-gray-500 rounded-xl py-2.5 px-4 text-xs font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400">Display Name</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="e.g. Jane Doe"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl py-2.5 px-4 text-xs text-white focus:outline-none focus:border-[#FFA77F]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400">Profile Image URL (Optional)</label>
                <input
                  type="text"
                  value={editPhoto}
                  onChange={(e) => setEditPhoto(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl py-2.5 px-4 text-xs text-white focus:outline-none focus:border-[#FFA77F]"
                />
              </div>

              <button
                type="submit"
                className="bg-[#FFA77F] text-[#1F2937] font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-[#FFA77F]/90 transition-all shadow-[0_4px_12px_rgba(255,167,127,0.2)]"
              >
                Save Profile
              </button>
            </form>
          </div>
        )}

        {activeSubTab === "settings" && (
          <div className="max-w-xl bg-gray-900 border border-gray-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-gray-800 pb-4">
              <h3 className="font-display font-bold text-lg text-white">SaaS Configurations</h3>
              <p className="text-xs text-gray-400">Manage account properties and server keys.</p>
            </div>

            <div className="space-y-4 text-xs text-gray-300">
              <div className="bg-gray-850 p-4 rounded-2xl border border-gray-800 space-y-2">
                <div className="flex items-center gap-2 text-[#FFA77F] font-bold">
                  <Zap className="w-4 h-4" />
                  <span>SaaS Billing Integration</span>
                </div>
                <p className="text-gray-400 leading-normal">
                  Our core applet is fully integrated with Firestore for enterprise security. Monetization gates and billing accounts (Stripe proxies) can be configured instantly in the backend by attaching a paid customer database.
                </p>
              </div>

              <div className="bg-gray-850 p-4 rounded-2xl border border-gray-800 space-y-2">
                <div className="flex items-center gap-2 text-[#FFA77F] font-bold">
                  <Info className="w-4 h-4" />
                  <span>Developer Sandbox Settings</span>
                </div>
                <p className="text-gray-400 leading-normal">
                  All generated blueprints are stored securely under Firebase document rules linked strictly to your credentials `request.auth.uid`. No third-party or unauthorized clients can retrieve your saved models.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
