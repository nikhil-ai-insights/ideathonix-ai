import { GoogleGenAI, Type } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required but not configured. Please add it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Define the structured schemas for Gemini response
const hackathonSchema = {
  type: Type.OBJECT,
  properties: {
    projectName: { type: Type.STRING, description: "Catchy and innovative name for the hackathon project" },
    tagline: { type: Type.STRING, description: "Short, high-impact one-liner tagline" },
    problemStatement: { type: Type.STRING, description: "Clearly defined problem statement" },
    whyProblemMatters: { type: Type.STRING, description: "Detailed explanation of why this problem is significant and worth solving" },
    proposedSolution: { type: Type.STRING, description: "Detailed description of the proposed innovative solution" },
    targetUsers: { type: Type.STRING, description: "Who are the direct beneficiaries and target users of this solution" },
    coreFeatures: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of 3-5 core MVP features suitable for the hackathon duration"
    },
    advancedFeatures: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of 2-3 complex/advanced features that make the project stand out"
    },
    suggestedTechStack: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of modern frontend/backend technologies, languages, and tools"
    },
    suggestedAPIs: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Specific APIs, SDKs or integrations (e.g., Gemini API, Maps, Twilio)"
    },
    suggestedDatabase: { type: Type.STRING, description: "Recommended database (e.g. Firebase Firestore, Cloud SQL PostgreSQL, etc.) and brief why" },
    suggestedArchitecture: { type: Type.STRING, description: "Recommended architectural design pattern (e.g., Serverless Full-Stack, Client-Edge-Database)" },
    implementationRoadmap: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          phase: { type: Type.STRING, description: "Phase title or timeframe (e.g., 'Hour 1-8: Setup & DB Schema')" },
          description: { type: Type.STRING, description: "Specific milestones and goals for this phase" }
        },
        required: ["phase", "description"]
      },
      description: "A chronological build roadmap for the hackathon duration"
    },
    winningProbability: { type: Type.INTEGER, description: "Estimated winning potential percentage (0 to 100)" },
    innovationScore: { type: Type.INTEGER, description: "Innovation and uniqueness score (0 to 100)" },
    judgeAppealScore: { type: Type.INTEGER, description: "Estimated appeal to hackathon judges (0 to 100)" },
    feasibilityScore: { type: Type.INTEGER, description: "Technical and execution feasibility score (0 to 100)" },
    estimatedBuildTime: { type: Type.STRING, description: "Estimated physical development time (e.g., '24 hours', '36 hours')" },
    futureScope: { type: Type.STRING, description: "How this project can scale beyond the hackathon" },
    revenueOpportunities: { type: Type.STRING, description: "SaaS monetization, subscription models, or payment models" },
    pitchSummary: { type: Type.STRING, description: "A highly compelling 1-minute elevator pitch script for the team" },
    readmeSummary: { type: Type.STRING, description: "A summary suitable for the GitHub README intro" }
  },
  required: [
    "projectName",
    "tagline",
    "problemStatement",
    "whyProblemMatters",
    "proposedSolution",
    "targetUsers",
    "coreFeatures",
    "advancedFeatures",
    "suggestedTechStack",
    "suggestedAPIs",
    "suggestedDatabase",
    "suggestedArchitecture",
    "implementationRoadmap",
    "winningProbability",
    "innovationScore",
    "judgeAppealScore",
    "feasibilityScore",
    "estimatedBuildTime",
    "futureScope",
    "revenueOpportunities",
    "pitchSummary",
    "readmeSummary"
  ]
};

const startupSchema = {
  type: Type.OBJECT,
  properties: {
    startupIdea: { type: Type.STRING, description: "Unique and scalable startup business concept name and intro" },
    tagline: { type: Type.STRING, description: "A premium, Silicon Valley-style tagline" },
    problemValidation: { type: Type.STRING, description: "Validation of the core customer problem using real-world reasoning" },
    marketGap: { type: Type.STRING, description: "The specific gap in the current market that competitors miss" },
    competitorAnalysis: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          competitor: { type: Type.STRING, description: "Competitor name or category" },
          weakness: { type: Type.STRING, description: "Their primary weakness or where they fall short" }
        },
        required: ["competitor", "weakness"]
      },
      description: "Analysis of existing competitors or alternatives"
    },
    uniqueValueProposition: { type: Type.STRING, description: "A clear statement of why customers will choose this startup over others" },
    revenueModel: { type: Type.STRING, description: "How this business makes money (SaaS tiers, transactional, usage-based)" },
    businessModel: { type: Type.STRING, description: "Full business model (B2B, B2C, enterprise, etc.)" },
    mvpFeatures: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Crucial features required to launch the Minimum Viable Product"
    },
    recommendedTechStack: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Scalable, modern and production-ready tech stack"
    },
    goToMarketStrategy: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Step-by-step launch and marketing strategies to acquire first 100 customers"
    },
    growthPlan: { type: Type.STRING, description: "How to scale user acquisition and revenue after the initial MVP launch" },
    futureRoadmap: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "3-month, 6-month, and 12-month high-level milestones"
    },
    investmentReadiness: { type: Type.STRING, description: "A critical evaluation of how VC-backable or investable this idea is" },
    innovationScore: { type: Type.INTEGER, description: "Score of uniqueness/disruption (0 to 100)" },
    feasibilityScore: { type: Type.INTEGER, description: "Technical and market feasibility score (0 to 100)" }
  },
  required: [
    "startupIdea",
    "tagline",
    "problemValidation",
    "marketGap",
    "competitorAnalysis",
    "uniqueValueProposition",
    "revenueModel",
    "businessModel",
    "mvpFeatures",
    "recommendedTechStack",
    "goToMarketStrategy",
    "growthPlan",
    "futureRoadmap",
    "investmentReadiness",
    "innovationScore",
    "feasibilityScore"
  ]
};

const organizerSchema = {
  type: Type.OBJECT,
  properties: {
    themeOverview: { type: Type.STRING, description: "A deep dive explanation of the hackathon theme and why it is trending" },
    tagline: { type: Type.STRING, description: "An energetic tagline for the hackathon organizers" },
    problemStatements: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Short descriptive title of the challenge/problem" },
          description: { type: Type.STRING, description: "Detailed background of the problem" },
          targetAudience: { type: Type.STRING, description: "Who experiences this problem directly" }
        },
        required: ["title", "description", "targetAudience"]
      },
      description: "3 diverse and challenging problem statements for participants to solve"
    },
    challengeStatements: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Direct challenge statements or tracks (e.g., 'Track 1: Carbon Offset Tracker')"
    },
    innovationOpportunities: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Underexplored areas where participants can find breakthrough solutions"
    },
    expectedWinningProjects: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Hypothetical examples of high-impact winning submissions"
    },
    evaluationCriteria: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          criteriaName: { type: Type.STRING, description: "Evaluation category (e.g., 'Impact', 'Technical Execution')" },
          description: { type: Type.STRING, description: "What judges will look for" },
          maxPoints: { type: Type.INTEGER, description: "Maximum points assigned (e.g., 20, 25)" }
        },
        required: ["criteriaName", "description", "maxPoints"]
      },
      description: "Detailed rubrics for judging"
    },
    difficultyAnalysis: { type: Type.STRING, description: "Analysis of the difficulty level and skill barriers for participants" },
    recommendedJudgingParameters: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Specific guidelines and questions for judges to use during pitches"
    }
  },
  required: [
    "themeOverview",
    "tagline",
    "problemStatements",
    "challengeStatements",
    "innovationOpportunities",
    "expectedWinningProjects",
    "evaluationCriteria",
    "difficultyAnalysis",
    "recommendedJudgingParameters"
  ]
};

export async function generateIdea(mode: "hackathon" | "startup" | "organizer", inputs: any) {
  const ai = getGeminiClient();
  
  let prompt = "";
  let currentSchema: any = null;
  
  if (mode === "hackathon") {
    currentSchema = hackathonSchema;
    prompt = `
You are an expert Hackathon Director and Veteran Judge.
Create a highly competitive, unique, and winning hackathon project idea based on the following inputs:
- Theme: ${inputs.theme || "General Innovation"}
- Duration: ${inputs.duration || "36 hours"}
- Team Size: ${inputs.teamSize || "3-4 people"}
- Skill Level: ${inputs.skillLevel || "Intermediate"}
- Preferred Technologies: ${inputs.preferredTech || "React, TypeScript, Node.js"}
- Problem Domain: ${inputs.problemDomain || "Sustainability, Productivity or AI"}
- AI Required: ${inputs.aiRequired ? "Yes" : "Optional"}
- Hardware Allowed: ${inputs.hardwareAllowed ? "Yes" : "No"}
- Preferred Industry: ${inputs.preferredIndustry || "SaaS / Fintech / Edtech"}

The idea MUST be original, highly feasible within the stated duration and team size, and have high judge appeal.
    `;
  } else if (mode === "startup") {
    currentSchema = startupSchema;
    prompt = `
You are an elite VC Investor and Y Combinator Partner.
Generate an investable, high-impact startup business idea based on the following inputs:
- Industry: ${inputs.industry || "Artificial Intelligence"}
- Budget: ${inputs.budget || "$5,000"}
- Country: ${inputs.country || "Global"}
- Target Customers: ${inputs.targetCustomers || "Small Businesses"}
- Business Type: ${inputs.businessType || "B2B SaaS"}
- Existing Skills: ${inputs.existingSkills || "Web Development"}
- AI Required: ${inputs.aiRequired ? "Yes" : "Optional"}
- Problem Area: ${inputs.problemArea || "Customer Support Automation"}

The startup idea must have a clear path to monetization, a validated market gap, and a high barrier to entry once scaled.
    `;
  } else {
    currentSchema = organizerSchema;
    prompt = `
You are an expert Hackathon Organizer and Creator of world-class developer challenges.
Create a comprehensive challenge package for a hackathon based on the following organizer inputs:
- Theme: ${inputs.theme || "AI for Good"}
- Duration: ${inputs.duration || "48 hours"}
- Difficulty Level: ${inputs.difficulty || "All levels"}
- Expected Participants: ${inputs.expectedParticipants || "200 developers"}
- Industry: ${inputs.industry || "Healthcare / Sustainability"}
- Prize Pool: ${inputs.prizePool || "$10,000"}

Design problem statements, tracks, evaluation criteria, and judging parameters that inspire maximum developer engagement and truly innovative solutions.
    `;
  }

  const modelCandidates = ["gemini-2.5-flash", "gemini-2.5-pro", "gemini-3.5-flash"];
  let lastError: any = null;

  for (const modelName of modelCandidates) {
    let delayMs = 1000;
    const maxRetriesForModel = 2;

    for (let attempt = 1; attempt <= maxRetriesForModel; attempt++) {
      try {
        console.log(`Attempting generation with model ${modelName} (attempt ${attempt}/${maxRetriesForModel})...`);
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            systemInstruction: "You are Ideathonix AI, the world's most sophisticated and creative AI system for brainstorming, designing, and scoring hackathon projects, startups, and organizer challenges.",
            responseMimeType: "application/json",
            responseSchema: currentSchema,
            temperature: 1.0,
          }
        });

        if (!response.text) {
          throw new Error(`Received empty response from Gemini API using model ${modelName}`);
        }

        console.log(`Successfully generated idea with model ${modelName}`);
        return JSON.parse(response.text.trim());
      } catch (error: any) {
        lastError = error;
        console.error(`Gemini generation with ${modelName} (attempt ${attempt}) failed:`, error);
        
        const errorStr = String(error.message || error);
        const is503 = errorStr.includes("503") || errorStr.includes("UNAVAILABLE") || errorStr.includes("high demand") || errorStr.includes("Service Unavailable");
        const is429 = errorStr.includes("429") || errorStr.includes("RESOURCE_EXHAUSTED");

        if ((is503 || is429) && attempt < maxRetriesForModel) {
          console.warn(`Gemini API experienced load/quota issue. Retrying ${modelName} in ${delayMs}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delayMs));
          delayMs *= 2; // exponential backoff
        } else {
          console.warn(`Moving to next model candidate due to failure of ${modelName}.`);
          break;
        }
      }
    }
  }

  throw new Error(lastError?.message || "Failed to generate idea from AI after trying multiple models");
}
