import { questions } from './questions';
import { getTierByScore } from './tiers';

export interface Recommendation {
  questionId: number;
  section: 'sales' | 'marketing' | 'ops';
  title: string;
  shortDescription: string;
  description: string;
}

export const questionRecommendations: Recommendation[] = [
  // SALES (Questions 1-5)
  {
    questionId: 1,
    section: 'sales',
    title: "Automate Lead Scoring",
    shortDescription: "Save 5+ hrs/week on lead prioritization",
    description: "Implement automatic lead scoring based on behavior, company size, and engagement signals. This alone can save your sales team 5+ hours weekly by focusing on high-intent prospects first. Start with simple rules (company size + website visits) before adding AI scoring."
  },
  {
    questionId: 2,
    section: 'sales',
    title: "Set Up Automated Follow-Ups",
    shortDescription: "Never let a lead go cold again",
    description: "Create multi-channel follow-up sequences that trigger automatically. When a lead goes cold, your system should nudge them via email, then LinkedIn, then SMS — without reps manually scheduling each touchpoint. Most deals are lost due to slow or inconsistent follow-up."
  },
  {
    questionId: 3,
    section: 'sales',
    title: "Clean Your CRM Automatically",
    shortDescription: "Stop wasting time on data entry",
    description: "Implement auto-deduplication, data enrichment, and sync rules. Dirty data costs sales teams 30% of their productivity. Tools like Clay or built-in CRM automation can keep records clean without manual data entry."
  },
  {
    questionId: 4,
    section: 'sales',
    title: "Generate Proposals Automatically",
    shortDescription: "Create quotes in minutes, not hours",
    description: "Connect your CRM to proposal tools that auto-populate client data, pricing, and case studies. What takes 2 hours manually can become a 5-minute review. Consider PandaDoc, Qwilr, or custom n8n workflows."
  },
  {
    questionId: 5,
    section: 'sales',
    title: "Automate Pre-Meeting Briefs",
    shortDescription: "Walk into every call prepared",
    description: "Give reps AI-generated briefs before every call: prospect's company news, past interactions, engagement history, and suggested talking points. This prep work typically takes 15-20 minutes per meeting — automate it completely."
  },
  // MARKETING (Questions 6-10)
  {
    questionId: 6,
    section: 'marketing',
    title: "Repurpose Content Automatically",
    shortDescription: "Turn 1 piece into 10+ formats",
    description: "One blog post should become 10+ content pieces automatically: social posts, email snippets, video scripts, carousel slides. Set up workflows that transform long-form content into platform-specific formats without manual reformatting."
  },
  {
    questionId: 7,
    section: 'marketing',
    title: "Automate Lead Routing",
    shortDescription: "Get leads to the right person instantly",
    description: "Route leads to the right person or sequence instantly based on territory, company size, product interest, or lead score. Manual assignment delays mean cold leads. Implement rules-based routing with automatic fallbacks."
  },
  {
    questionId: 8,
    section: 'marketing',
    title: "Implement AI Content Workflows",
    shortDescription: "3x your content output",
    description: "Use AI to consistently produce first drafts of blog posts, social content, ad copy, and emails. Your team reviews and refines rather than starting from blank pages. This can 3x your content output without adding headcount."
  },
  {
    questionId: 9,
    section: 'marketing',
    title: "Automate Content Research",
    shortDescription: "Never run out of content ideas",
    description: "Set up AI workflows that monitor trends, analyze competitors, research keywords, and suggest content ideas weekly. Remove the manual research phase that often bottlenecks your content calendar."
  },
  {
    questionId: 10,
    section: 'marketing',
    title: "Add Dynamic Personalization",
    shortDescription: "Convert 50% more with personalization",
    description: "Automatically adjust messaging, offers, and content based on prospect's industry, behavior, or stage. Generic messaging converts 50% worse than personalized. Implement website personalization and dynamic email content."
  },
  // OPS (Questions 11-15)
  {
    questionId: 11,
    section: 'ops',
    title: "Automate Meeting Notes & Actions",
    shortDescription: "Save 20-30 min per meeting",
    description: "Every meeting should automatically generate: transcript, summary, action items in your PM tool, and follow-up email draft. This saves 20-30 minutes per meeting and ensures nothing falls through cracks. Tools: Fireflies, Otter, or custom AI workflows."
  },
  {
    questionId: 12,
    section: 'ops',
    title: "Auto-Generate Documentation",
    shortDescription: "SOPs that write themselves",
    description: "Create and update SOPs, process docs, and training materials automatically from recordings, Slack conversations, or workflow descriptions. Documentation debt slows onboarding and creates tribal knowledge problems."
  },
  {
    questionId: 13,
    section: 'ops',
    title: "Automate Support Ticket Handling",
    shortDescription: "Resolve Tier 1 tickets automatically",
    description: "Implement AI for ticket categorization, routing, suggested responses, and even full resolution of common issues. Start with auto-categorization and canned responses, then graduate to AI agents for Tier 1 support."
  },
  {
    questionId: 14,
    section: 'ops',
    title: "Automate Your Reporting",
    shortDescription: "Reports that build themselves",
    description: "Weekly reports, dashboards, and performance summaries should compile and send themselves. No one should spend Monday mornings pulling data into spreadsheets. Connect your tools to auto-generate and distribute reports."
  },
  {
    questionId: 15,
    section: 'ops',
    title: "Build Automated Onboarding Flows",
    shortDescription: "Onboarding that scales perfectly",
    description: "Client and employee onboarding should run on autopilot: welcome sequences, account setup, training assignments, check-in scheduling, and milestone tracking. Manual onboarding doesn't scale and creates inconsistent experiences."
  }
];

export interface GeneratedRecommendations {
  sales: Recommendation[];
  marketing: Recommendation[];
  ops: Recommendation[];
  doingWell: string[];
  tierSummary: string;
}

export function generateRecommendations(
  answers: (number | null)[],
  totalScore: number
): GeneratedRecommendations {
  const tier = getTierByScore(totalScore);

  const salesRecs: Recommendation[] = [];
  const marketingRecs: Recommendation[] = [];
  const opsRecs: Recommendation[] = [];
  const doingWell: string[] = [];

  // Process all 15 questions
  answers.forEach((score, index) => {
    const questionId = index + 1;
    const recommendation = questionRecommendations.find(r => r.questionId === questionId);
    const question = questions[index];

    if (!recommendation || !question) return;

    // Score < 2 (including 0, 1, and null treated as 0) = needs improvement
    // Score === 2 = doing well
    if (score === 2) {
      // Doing well - use the recommendation title for labeling
      doingWell.push(recommendation.title.replace('Automate ', '').replace('Auto-Generate ', '').replace('Set Up ', '').replace('Build ', '').replace('Add ', '').replace('Implement ', ''));
    } else {
      // Needs improvement (score is 0, 1, or null)
      if (recommendation.section === 'sales') {
        salesRecs.push(recommendation);
      } else if (recommendation.section === 'marketing') {
        marketingRecs.push(recommendation);
      } else {
        opsRecs.push(recommendation);
      }
    }
  });

  // Debug logging to verify all 15 questions are counted
  if (process.env.NODE_ENV === 'development') {
    const totalProcessed = salesRecs.length + marketingRecs.length + opsRecs.length + doingWell.length;
    console.log('Questions answered:', answers.length);
    console.log('Recommendations generated:', salesRecs.length + marketingRecs.length + opsRecs.length);
    console.log('Doing well items:', doingWell.length);
    console.log('Total (should be 15):', totalProcessed);

    if (totalProcessed !== 15) {
      console.error('BUG: Not all questions accounted for!', {
        expected: 15,
        actual: totalProcessed,
        answers
      });
    }
  }

  return {
    sales: salesRecs,
    marketing: marketingRecs,
    ops: opsRecs,
    doingWell,
    tierSummary: tier.interpretation
  };
}

export function getRecommendationsForWebhook(
  answers: (number | null)[]
): { sales: { title: string; description: string }[]; marketing: { title: string; description: string }[]; ops: { title: string; description: string }[] } {
  const result = {
    sales: [] as { title: string; description: string }[],
    marketing: [] as { title: string; description: string }[],
    ops: [] as { title: string; description: string }[]
  };

  answers.forEach((score, index) => {
    const questionId = index + 1;
    const recommendation = questionRecommendations.find(r => r.questionId === questionId);
    
    if (!recommendation) return;

    if (score !== null && score < 2) {
      const rec = { title: recommendation.title, description: recommendation.description };
      if (recommendation.section === 'sales') {
        result.sales.push(rec);
      } else if (recommendation.section === 'marketing') {
        result.marketing.push(rec);
      } else {
        result.ops.push(rec);
      }
    }
  });

  return result;
}

export function getDoingWellList(answers: (number | null)[]): string[] {
  const doingWell: string[] = [];
  
  answers.forEach((score, index) => {
    if (score === 2) {
      const recommendation = questionRecommendations.find(r => r.questionId === index + 1);
      if (recommendation) {
        doingWell.push(recommendation.title.replace('Automate ', '').replace('Auto-Generate ', '').replace('Set Up ', '').replace('Build ', '').replace('Add ', '').replace('Implement ', ''));
      }
    }
  });

  return doingWell;
}
