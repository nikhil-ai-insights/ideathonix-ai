export interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  createdAt: any;
  updatedAt: any;
  generationCount: number;
  tier: "free" | "premium";
}

export interface HackathonOutput {
  projectName: string;
  tagline: string;
  problemStatement: string;
  whyProblemMatters: string;
  proposedSolution: string;
  targetUsers: string;
  coreFeatures: string[];
  advancedFeatures: string[];
  suggestedTechStack: string[];
  suggestedAPIs: string[];
  suggestedDatabase: string;
  suggestedArchitecture: string;
  implementationRoadmap: { phase: string; description: string }[];
  winningProbability: number;
  innovationScore: number;
  judgeAppealScore: number;
  feasibilityScore: number;
  estimatedBuildTime: string;
  futureScope: string;
  revenueOpportunities: string;
  pitchSummary: string;
  readmeSummary: string;
}

export interface StartupOutput {
  startupIdea: string;
  tagline: string;
  problemValidation: string;
  marketGap: string;
  competitorAnalysis: { competitor: string; weakness: string }[];
  uniqueValueProposition: string;
  revenueModel: string;
  businessModel: string;
  mvpFeatures: string[];
  recommendedTechStack: string[];
  goToMarketStrategy: string[];
  growthPlan: string;
  futureRoadmap: string[];
  investmentReadiness: string;
  innovationScore: number;
  feasibilityScore: number;
}

export interface OrganizerOutput {
  themeOverview: string;
  tagline: string;
  problemStatements: { title: string; description: string; targetAudience: string }[];
  challengeStatements: string[];
  innovationOpportunities: string[];
  expectedWinningProjects: string[];
  evaluationCriteria: { criteriaName: string; description: string; maxPoints: number }[];
  difficultyAnalysis: string;
  recommendedJudgingParameters: string[];
}

export interface GeneratedIdeaDoc {
  id: string;
  userId: string;
  mode: "hackathon" | "startup" | "organizer";
  title: string;
  tagline: string;
  inputs: any;
  output: HackathonOutput | StartupOutput | OrganizerOutput;
  isBookmarked: boolean;
  createdAt: any;
  updatedAt: any;
}
