import React, { useState } from "react";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail,
  sendEmailVerification
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { Sparkles, Mail, Lock, User, ArrowLeft, ShieldAlert, CheckCircle, Info } from "lucide-react";

interface AuthPageProps {
  onBack: () => void;
  onSuccess: () => void;
}

export default function AuthPage({ onBack, onSuccess }: AuthPageProps) {
  const [view, setView] = useState<"login" | "signup" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onSuccess();
    } catch (err: any) {
      console.error("Google Sign In Error:", err);
      setError(err.message || "Failed to sign in with Google.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setError(null);
    setInfoMessage(null);
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      // Try sending email verification
      if (userCred.user) {
        try {
          await sendEmailVerification(userCred.user);
          setInfoMessage("Verification email sent! Please check your inbox.");
        } catch (verifErr) {
          console.log("Email verification email could not be sent immediately.", verifErr);
        }
      }
      onSuccess();
    } catch (err: any) {
      console.error("Sign Up Error:", err);
      if (err.code === "auth/operation-not-allowed") {
        setError("Email/Password signup is not yet enabled in the Firebase Console. Please sign in using Google Login below, or enable Email/Password provider in your Firebase project.");
      } else {
        setError(err.message || "Failed to create account.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onSuccess();
    } catch (err: any) {
      console.error("Login Error:", err);
      if (err.code === "auth/operation-not-allowed") {
        setError("Email/Password login is not yet enabled in the Firebase Console. Please sign in using Google Login below, or enable Email/Password provider in your Firebase project.");
      } else {
        setError(err.message || "Invalid credentials or login failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError(null);
    setInfoMessage(null);
    try {
      await sendPasswordResetEmail(auth, email);
      setInfoMessage("A password reset email has been sent to your inbox!");
    } catch (err: any) {
      console.error("Password Reset Error:", err);
      setError(err.message || "Failed to send password reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1F2937] text-gray-100 flex flex-col justify-center items-center px-4 py-12 relative selection:bg-[#FFA77F] selection:text-[#1F2937]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,167,127,0.05)_0,transparent_50%)] pointer-events-none" />

      {/* Floating Go Back Button */}
      <button 
        onClick={onBack}
        className="absolute top-6 left-6 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-all bg-gray-800/50 border border-gray-700/50 px-4 py-2 rounded-lg"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </button>

      <div className="w-full max-w-md bg-gray-900 border border-gray-700/50 rounded-3xl p-8 shadow-2xl relative overflow-hidden space-y-6">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#FFA77F] to-[#ff7d47]" />

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#FFA77F] flex items-center justify-center text-[#1F2937] font-display font-bold text-2xl shadow-[0_0_25px_rgba(255,167,127,0.35)] mx-auto">
            I
          </div>
          <h2 className="font-display font-bold text-2xl text-white tracking-tight">
            {view === "login" && "Welcome Back"}
            {view === "signup" && "Create Workspace"}
            {view === "forgot" && "Reset Password"}
          </h2>
          <p className="text-xs text-gray-400">
            {view === "login" && "Access your Ideathonix AI projects archive"}
            {view === "signup" && "Start evaluating winning product ideas"}
            {view === "forgot" && "Retrieve credentials for your SaaS workspace"}
          </p>
        </div>

        {/* Notification Blocks */}
        {error && (
          <div className="bg-red-950/40 border border-red-800/50 rounded-xl p-3.5 flex items-start gap-2 text-xs text-red-200">
            <ShieldAlert className="w-4.5 h-4.5 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {infoMessage && (
          <div className="bg-green-950/40 border border-green-800/50 rounded-xl p-3.5 flex items-start gap-2 text-xs text-green-200">
            <CheckCircle className="w-4.5 h-4.5 text-green-400 shrink-0 mt-0.5" />
            <span>{infoMessage}</span>
          </div>
        )}

        {/* Forms */}
        {view === "login" && (
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#FFA77F] focus:ring-1 focus:ring-[#FFA77F]/30"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-400">Password</label>
                <button 
                  type="button"
                  onClick={() => setView("forgot")}
                  className="text-[11px] text-[#FFA77F] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
                <input 
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#FFA77F] focus:ring-1 focus:ring-[#FFA77F]/30"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-gray-850 hover:bg-gray-800 text-white font-medium text-sm py-2.5 rounded-xl border border-gray-700 transition-all flex items-center justify-center gap-2"
            >
              {loading ? "Authenticating..." : "Sign In with Email"}
            </button>
          </form>
        )}

        {view === "signup" && (
          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
                <input 
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#FFA77F] focus:ring-1 focus:ring-[#FFA77F]/30"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#FFA77F] focus:ring-1 focus:ring-[#FFA77F]/30"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
                <input 
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create password"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#FFA77F] focus:ring-1 focus:ring-[#FFA77F]/30"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-gray-850 hover:bg-gray-800 text-white font-medium text-sm py-2.5 rounded-xl border border-gray-700 transition-all flex items-center justify-center gap-2"
            >
              {loading ? "Creating Account..." : "Create Free Account"}
            </button>
          </form>
        )}

        {view === "forgot" && (
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400">Recovery Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#FFA77F] focus:ring-1 focus:ring-[#FFA77F]/30"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#FFA77F] text-[#1F2937] font-semibold text-sm py-2.5 rounded-xl hover:bg-[#FFA77F]/90 transition-all shadow-[0_4px_12px_rgba(255,167,127,0.2)]"
            >
              {loading ? "Sending link..." : "Send Reset Link"}
            </button>
            
            <button 
              type="button"
              onClick={() => setView("login")}
              className="w-full text-center text-xs text-gray-400 hover:text-white mt-2"
            >
              Return to Sign In
            </button>
          </form>
        )}

        {/* Separator */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-800"></div>
          <span className="flex-shrink mx-4 text-[10px] text-gray-500 uppercase tracking-widest font-bold">Or Continue With</span>
          <div className="flex-grow border-t border-gray-800"></div>
        </div>

        {/* Google Authentication (Highly Encouraged & Automated) */}
        <button 
          type="button"
          disabled={loading}
          onClick={handleGoogleSignIn}
          className="w-full bg-white text-gray-900 font-semibold text-sm py-3 rounded-xl hover:bg-gray-100 transition-all flex items-center justify-center gap-3 shadow-[0_4px_20px_rgba(255,255,255,0.05)]"
        >
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google Authentication Workspace
        </button>

        {/* Helper Note for Local Admin */}
        <div className="bg-gray-800/40 rounded-xl p-3 flex items-start gap-2.5 text-[10px] text-gray-500 leading-normal border border-gray-800">
          <Info className="w-3.5 h-3.5 text-[#FFA77F] shrink-0 mt-0.5" />
          <span>
            Google auth works seamlessly out of the box. To utilize standard email auth, make sure to enable the **Email/Password** sign-in method in your Firebase console under **Build &gt; Authentication**.
          </span>
        </div>

        {/* Footer Toggle */}
        <div className="text-center text-xs text-gray-400 pt-2">
          {view === "login" ? (
            <span>
              Don't have an account?{" "}
              <button onClick={() => setView("signup")} className="text-[#FFA77F] font-bold hover:underline">
                Create free account
              </button>
            </span>
          ) : view === "signup" ? (
            <span>
              Already have an account?{" "}
              <button onClick={() => setView("login")} className="text-[#FFA77F] font-bold hover:underline">
                Sign In
              </button>
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
