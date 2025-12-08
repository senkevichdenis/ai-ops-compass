export interface Tier {
  id: string;
  name: string;
  badge: string;
  range: [number, number];
  colorClass: string;
  interpretation: string;
  recommendations: string[];
}

export const tiers: Tier[] = [
  {
    id: 'critical',
    name: 'Critical',
    badge: 'Heavy Bottlenecks',
    range: [0, 7],
    colorClass: 'text-destructive',
    interpretation: "Your organization is operating mostly manually. You're likely spending 20-40 hours per week on repetitive tasks that could be automated. This creates bottlenecks, slows growth, and burns out your team.",
    recommendations: [
      "Start with ONE high-impact automation in your weakest area",
      "Focus on lead follow-ups or meeting notes — quick wins with immediate ROI",
      "Document your most repetitive processes before automating",
      "Consider an automation audit to identify priority opportunities"
    ]
  },
  {
    id: 'developing',
    name: 'Developing',
    badge: 'Early Stage',
    range: [8, 14],
    colorClass: 'text-warning',
    interpretation: "You've started automating, but significant gaps remain. You're probably spending 10-20 hours weekly on tasks that could run automatically. There's strong potential for efficiency gains.",
    recommendations: [
      "Connect your existing automations — isolated tools waste potential",
      "Add AI to your content and documentation workflows",
      "Implement lead scoring to focus sales efforts",
      "Build automated reporting to save weekly admin time"
    ]
  },
  {
    id: 'progressing',
    name: 'Progressing',
    badge: 'Good Foundation',
    range: [15, 21],
    colorClass: 'text-primary',
    interpretation: "You have solid automation foundations. Your team saves significant time, but there are still optimization opportunities. Focus on connecting systems and adding AI intelligence to existing workflows.",
    recommendations: [
      "Layer AI agents onto existing automations",
      "Implement dynamic personalization in marketing",
      "Add predictive elements to lead scoring",
      "Create self-updating documentation systems"
    ]
  },
  {
    id: 'advanced',
    name: 'Advanced',
    badge: 'Well Automated',
    range: [22, 30],
    colorClass: 'text-success',
    interpretation: "Your operations are highly automated. You're ahead of most organizations. Focus on optimization, advanced AI capabilities, and maintaining your competitive edge.",
    recommendations: [
      "Explore autonomous AI agents for complex workflows",
      "Implement advanced analytics and prediction",
      "Consider custom AI solutions for unique processes",
      "Share your automation playbook to scale knowledge internally"
    ]
  }
];

export function getTierByScore(score: number): Tier {
  return tiers.find(tier => score >= tier.range[0] && score <= tier.range[1]) || tiers[0];
}
