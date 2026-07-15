import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  serverTimestamp, 
  increment, 
  deleteDoc 
} from "firebase/firestore";
import { auth, db, handleFirestoreError, OperationType } from "./lib/firebase";
import { GeneratedIdeaDoc, UserProfile } from "./types";

// Import Custom Modular Components
import LandingPage from "./components/LandingPage";
import AuthPage from "./components/AuthPage";
import Dashboard from "./components/Dashboard";
import IdeaGenerator from "./components/IdeaGenerator";
import ThinkingAnimation from "./components/ThinkingAnimation";
import ResultDashboard from "./components/ResultDashboard";

import { Sparkles, Trophy, Cpu, ChevronRight, Compass } from "lucide-react";

export default function App() {
  const [user, setUser] = useState<any | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [savedIdeas, setSavedIdeas] = useState<GeneratedIdeaDoc[]>([]);
  const [loadingSession, setLoadingSession] = useState(true);

  // SaaS Router views
  const [view, setView] = useState<"landing" | "auth" | "dashboard" | "generator" | "thinking" | "result">("landing");

  // Selection states
  const [activeIdea, setActiveIdea] = useState<GeneratedIdeaDoc | null>(null);
  
  // Temporary generator memory (before saving to Firestore)
  const [generatorInputs, setGeneratorInputs] = useState<any>(null);
  const [generatorMode, setGeneratorMode] = useState<"hackathon" | "startup" | "organizer">("hackathon");
  const [newGeneratedResult, setNewGeneratedResult] = useState<any>(null);
  const [apiFinished, setApiFinished] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Listen to Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setView("dashboard");
        
        // Sync and load user profile
        const pathForUser = `users/${currentUser.uid}`;
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const snapshot = await getDoc(userRef);
          
          if (!snapshot.exists()) {
            const initialProfile = {
              uid: currentUser.uid,
              email: currentUser.email || "",
              displayName: currentUser.displayName || currentUser.email?.split("@")[0] || "Innovator",
              photoURL: currentUser.photoURL || "",
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
              generationCount: 0,
              tier: "free" as const
            };
            await setDoc(userRef, initialProfile);
            setUserProfile({
              ...initialProfile,
              createdAt: new Date(),
              updatedAt: new Date()
            });
          } else {
            const data = snapshot.data();
            setUserProfile({
              uid: data.uid,
              email: data.email,
              displayName: data.displayName,
              photoURL: data.photoURL,
              createdAt: data.createdAt,
              updatedAt: data.updatedAt,
              generationCount: data.generationCount || 0,
              tier: data.tier || "free"
            });
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, pathForUser);
        }
      } else {
        setUser(null);
        setUserProfile(null);
        setSavedIdeas([]);
        setView("landing");
      }
      setLoadingSession(false);
    });

    return () => unsubscribe();
  }, []);

  // Listen to User Saved Ideas in Firestore (Live listener)
  useEffect(() => {
    if (!user) return;

    const pathForSnapshot = "ideas";
    const q = query(
      collection(db, "ideas"),
      where("userId", "==", user.uid),
      orderBy("updatedAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const ideas: GeneratedIdeaDoc[] = [];
        snapshot.forEach((docSnap) => {
          ideas.push(docSnap.data() as GeneratedIdeaDoc);
        });
        setSavedIdeas(ideas);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, pathForSnapshot);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // Logout Trigger
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout Error:", err);
    }
  };

  // Update Profile Info
  const handleUpdateProfile = async (name: string, photo: string) => {
    if (!user) return;
    const pathForUser = `users/${user.uid}`;
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        displayName: name,
        photoURL: photo,
        updatedAt: serverTimestamp()
      });
      // Update local profile state
      if (userProfile) {
        setUserProfile({
          ...userProfile,
          displayName: name,
          photoURL: photo
        });
      }
      // Also update Firebase Auth profile info
      await updateProfile(user, {
        displayName: name,
        photoURL: photo
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, pathForUser);
    }
  };

  // Trigger Generation Endpoint on Full-Stack Express Server
  const handleTriggerGenerate = async (
    mode: "hackathon" | "startup" | "organizer",
    inputs: any
  ) => {
    setGeneratorMode(mode);
    setGeneratorInputs(inputs);
    setApiFinished(false);
    setIsSaved(false);
    setIsBookmarked(false);
    setView("thinking");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, inputs })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Generation endpoint failed.");
      }

      const data = await response.json();
      setNewGeneratedResult(data.result);
      setApiFinished(true);
    } catch (error: any) {
      console.error("Error generating idea:", error);
      alert(error.message || "Failed to contact Gemini engine. Check console for details.");
      setView("generator");
    }
  };

  // Save temporary generated result to Firestore
  const handleSaveWorkspace = async () => {
    if (!user || !newGeneratedResult) return;

    // Extract appropriate title/tagline from structured output
    const title = generatorMode === "hackathon" ? (newGeneratedResult.projectName || "Hackathon Project") :
                  generatorMode === "startup" ? (newGeneratedResult.startupIdea || "Startup Idea") :
                  (newGeneratedResult.tagline || "Organizer Challenge Set");

    const tagline = generatorMode === "hackathon" ? (newGeneratedResult.tagline || "Catchy one-liner tagline") :
                    generatorMode === "startup" ? (newGeneratedResult.tagline || "SaaS concept") :
                    (newGeneratedResult.themeOverview?.substring(0, 150) || "Challenge briefs");

    const newIdeaId = doc(collection(db, "ideas")).id;
    const pathForSave = `ideas/${newIdeaId}`;

    try {
      const ideaRef = doc(db, "ideas", newIdeaId);
      const ideaDoc: GeneratedIdeaDoc = {
        id: newIdeaId,
        userId: user.uid,
        mode: generatorMode,
        title,
        tagline,
        inputs: generatorInputs,
        output: newGeneratedResult,
        isBookmarked: isBookmarked,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Wrap Firestore timestamps properly
      await setDoc(ideaRef, {
        ...ideaDoc,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      // Increment User Profile generationCount
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        generationCount: increment(1),
        updatedAt: serverTimestamp()
      });

      if (userProfile) {
        setUserProfile({
          ...userProfile,
          generationCount: userProfile.generationCount + 1
        });
      }

      setIsSaved(true);
      setActiveIdea(ideaDoc);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, pathForSave);
    }
  };

  // Toggle saved bookmarked states
  const handleToggleBookmark = async () => {
    if (!user) return;

    // Toggle local boolean
    const nextBookmarked = !isBookmarked;
    setIsBookmarked(nextBookmarked);

    // If already saved to Firestore, update there
    if (isSaved && activeIdea) {
      const pathForUpdate = `ideas/${activeIdea.id}`;
      try {
        const ideaRef = doc(db, "ideas", activeIdea.id);
        await updateDoc(ideaRef, {
          isBookmarked: nextBookmarked,
          updatedAt: serverTimestamp()
        });
        setActiveIdea({
          ...activeIdea,
          isBookmarked: nextBookmarked
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, pathForUpdate);
      }
    }
  };

  // Toggle bookmark from Dashboard List view
  const handleDashboardToggleBookmark = async (idea: GeneratedIdeaDoc) => {
    const pathForToggle = `ideas/${idea.id}`;
    try {
      const ideaRef = doc(db, "ideas", idea.id);
      await updateDoc(ideaRef, {
        isBookmarked: !idea.isBookmarked,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, pathForToggle);
    }
  };

  // Delete Idea from Dashboard List view
  const handleDeleteIdea = async (ideaId: string) => {
    const pathForDelete = `ideas/${ideaId}`;
    if (!confirm("Are you sure you want to permanently delete this AI Generated blueprint?")) return;
    try {
      await deleteDoc(doc(db, "ideas", ideaId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, pathForDelete);
    }
  };

  // Inspect existing saved ideas
  const handleInspectIdea = (idea: GeneratedIdeaDoc) => {
    setGeneratorMode(idea.mode);
    setNewGeneratedResult(idea.output);
    setGeneratorInputs(idea.inputs);
    setIsSaved(true);
    setIsBookmarked(idea.isBookmarked);
    setActiveIdea(idea);
    setView("result");
  };

  // Return Loading Spinner if Session initializing
  if (loadingSession) {
    return (
      <div className="min-h-screen bg-[#1F2937] text-white flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-transparent border-t-[#FFA77F] border-b-[#FFA77F] rounded-full animate-spin" />
        <span className="text-xs text-gray-400 font-mono">Restoring Ideathonix Workspace session...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1F2937] text-gray-100 flex flex-col font-sans select-none">
      {/* Dynamic Main Workspace Renderer */}
      <main className="flex-1">
        {view === "landing" && (
          <LandingPage 
            onStart={() => setView("auth")} 
            onLogin={() => setView("auth")} 
          />
        )}

        {view === "auth" && (
          <AuthPage 
            onBack={() => setView("landing")} 
            onSuccess={() => setView("dashboard")} 
          />
        )}

        {/* Protected Authenticated Views */}
        {view === "dashboard" && (
          <div className="py-8">
            <Dashboard
              userProfile={userProfile}
              savedIdeas={savedIdeas}
              onSelectIdea={handleInspectIdea}
              onDeleteIdea={handleDeleteIdea}
              onToggleBookmark={handleDashboardToggleBookmark}
              onLogout={handleLogout}
              onNewGenerate={() => setView("generator")}
              onUpdateProfile={handleUpdateProfile}
            />
          </div>
        )}

        {view === "generator" && (
          <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#FFA77F] flex items-center justify-center text-[#1F2937] font-bold">
                  I
                </div>
                <h2 className="font-display font-bold text-xl text-white">Ideathonix Generator Space</h2>
              </div>
              <button
                onClick={() => setView("dashboard")}
                className="text-xs text-gray-400 hover:text-white"
              >
                Back to Dashboard
              </button>
            </div>

            <IdeaGenerator 
              onGenerate={handleTriggerGenerate} 
              loading={view === "thinking"}
            />
          </div>
        )}

        {view === "thinking" && (
          <ThinkingAnimation
            apiFinished={apiFinished}
            onComplete={() => setView("result")}
          />
        )}

        {view === "result" && (
          <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <ResultDashboard
              mode={generatorMode}
              result={newGeneratedResult}
              isSaved={isSaved}
              isBookmarked={isBookmarked}
              onBack={() => {
                if (isSaved) {
                  setView("dashboard");
                } else {
                  setView("generator");
                }
              }}
              onSave={handleSaveWorkspace}
              onToggleBookmark={handleToggleBookmark}
            />
          </div>
        )}
      </main>
    </div>
  );
}
