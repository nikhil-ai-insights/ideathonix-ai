import React, { useEffect, useState } from "react";
import { Cpu, Check, Loader2, Sparkles } from "lucide-react";

interface ThinkingAnimationProps {
  onComplete: () => void;
  apiFinished: boolean;
}

const STAGES = [
  "Analyzing Theme...",
  "Finding Real Problems...",
  "Researching Industry...",
  "Evaluating Innovation...",
  "Calculating Winning Potential...",
  "Designing Architecture...",
  "Preparing Final Recommendation..."
];

export default function ThinkingAnimation({ onComplete, apiFinished }: ThinkingAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Advance steps every 1.5 seconds
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < STAGES.length - 1) {
          return prev + 1;
        } else {
          // If we are on the last step, wait until API is actually finished
          if (apiFinished) {
            clearInterval(interval);
            setTimeout(() => {
              onComplete();
            }, 800);
          }
          return prev;
        }
      });
    }, 1400);

    return () => clearInterval(interval);
  }, [apiFinished, onComplete]);

  // If API finishes early and we completed all stages, trigger completion
  useEffect(() => {
    if (apiFinished && currentStep === STAGES.length - 1) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [apiFinished, currentStep, onComplete]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 space-y-8 font-sans relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,167,127,0.06)_0,transparent_55%)] pointer-events-none" />

      {/* Futuristic Spinner */}
      <div className="relative">
        <div className="w-24 h-24 rounded-full border border-gray-800 flex items-center justify-center bg-gray-900/50 shadow-[0_0_50px_rgba(255,167,127,0.05)]">
          <Cpu className="w-8 h-8 text-[#FFA77F] animate-pulse" />
        </div>
        <div className="absolute inset-0 w-24 h-24 rounded-full border-2 border-transparent border-t-[#FFA77F] border-b-[#FFA77F] animate-spin" />
      </div>

      {/* Step Status Tracker */}
      <div className="max-w-md w-full bg-gray-900/80 border border-gray-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 border-b border-gray-800 pb-3 text-left">
          <Sparkles className="w-4 h-4 text-[#FFA77F]" />
          <span className="text-xs font-bold uppercase tracking-widest text-white">Ideathonix Engine Running</span>
        </div>

        <div className="space-y-3.5 text-left">
          {STAGES.map((stage, i) => {
            const isCompleted = i < currentStep;
            const isActive = i === currentStep;
            const isUpcoming = i > currentStep;

            return (
              <div 
                key={i} 
                className={`flex items-center gap-3 text-xs transition-all duration-300 ${
                  isActive ? "text-white font-semibold translate-x-1" :
                  isCompleted ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {isCompleted ? (
                  <div className="w-5 h-5 rounded-full bg-[#FFA77F]/10 border border-[#FFA77F]/30 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[#FFA77F]" />
                  </div>
                ) : isActive ? (
                  <div className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center shrink-0">
                    <Loader2 className="w-3 h-3 text-[#FFA77F] animate-spin" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border border-gray-800 flex items-center justify-center shrink-0 text-[10px]">
                    {i + 1}
                  </div>
                )}
                <span>{stage}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 max-w-xs animate-pulse leading-normal">
        Structuring robust database tables, predicting judge appeals and generating 1-minute pitch recommendations...
      </div>
    </div>
  );
}
