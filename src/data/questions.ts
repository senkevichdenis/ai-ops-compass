export interface Question {
  id: number;
  section: 'sales' | 'marketing' | 'ops';
  main: string;
  explanation: string;
}

export const questions: Question[] = [
  // SALES OPERATIONS (1-5)
  {
    id: 1,
    section: 'sales',
    main: "Do you automatically score and prioritize new leads?",
    explanation: "This means using behavior data, company info, or engagement signals to rank leads by likelihood to convert — without manual review."
  },
  {
    id: 2,
    section: 'sales',
    main: "Are follow-ups sent automatically across all channels?",
    explanation: "Including email sequences, LinkedIn messages, SMS, or calls — triggered without reps manually scheduling each touchpoint."
  },
  {
    id: 3,
    section: 'sales',
    main: "Does your CRM stay clean and updated automatically?",
    explanation: "Auto-deduplication, enrichment of contact data, and syncing across tools — without someone manually fixing records."
  },
  {
    id: 4,
    section: 'sales',
    main: "Can you generate proposals or quotes automatically?",
    explanation: "Creating sales decks, quotes, or contracts from CRM data, form inputs, or call summaries — without starting from scratch each time."
  },
  {
    id: 5,
    section: 'sales',
    main: "Do reps get automated pre-meeting briefs?",
    explanation: "AI-generated summaries with prospect history, engagement signals, company news, and recommended talking points before calls."
  },
  // MARKETING OPERATIONS (6-10)
  {
    id: 6,
    section: 'marketing',
    main: "Is your content automatically repurposed across formats?",
    explanation: "Turning blog posts into social clips, emails into carousels, webinars into highlight reels — without manual reformatting."
  },
  {
    id: 7,
    section: 'marketing',
    main: "Are leads automatically routed to the right person or sequence?",
    explanation: "Based on predefined rules like territory, company size, product interest, or lead score — no manual assignment needed."
  },
  {
    id: 8,
    section: 'marketing',
    main: "Do you use AI to consistently create marketing content?",
    explanation: "AI workflows or agents that produce drafts, social posts, ad copy, or email campaigns on a regular schedule."
  },
  {
    id: 9,
    section: 'marketing',
    main: "Is content ideation and research handled by AI?",
    explanation: "AI tools that find trending topics, analyze competitors, research keywords, and suggest content ideas automatically."
  },
  {
    id: 10,
    section: 'marketing',
    main: "Does your marketing personalize automatically for each prospect?",
    explanation: "Adjusting messaging, offers, or content based on industry, behavior, stage, or real-time data — without manual segmentation."
  },
  // BUSINESS & OPS (11-15)
  {
    id: 11,
    section: 'ops',
    main: "Are meeting notes and action items generated automatically?",
    explanation: "Transcripts turned into summaries, tasks created in your PM tool, and follow-up emails drafted — right after the call ends."
  },
  {
    id: 12,
    section: 'ops',
    main: "Can you generate SOPs and process docs automatically?",
    explanation: "Creating or updating standard operating procedures from recordings, chat logs, or workflow descriptions — without writing from scratch."
  },
  {
    id: 13,
    section: 'ops',
    main: "Are support tickets handled automatically by AI?",
    explanation: "Auto-categorization, routing, suggested responses, or full resolution by AI agents — reducing manual ticket handling."
  },
  {
    id: 14,
    section: 'ops',
    main: "Are your reports and dashboards generated automatically?",
    explanation: "Weekly summaries, performance reports, and KPI dashboards that compile and send themselves without manual data pulling."
  },
  {
    id: 15,
    section: 'ops',
    main: "Is client or employee onboarding fully automated?",
    explanation: "End-to-end flows with automated checklists, emails, account setup, and training sequences — minimal manual intervention."
  }
];

export const sectionInfo = {
  sales: {
    name: 'Sales Operations',
    shortName: 'Sales',
    color: 'sales',
    questions: [0, 1, 2, 3, 4]
  },
  marketing: {
    name: 'Marketing Operations',
    shortName: 'Marketing',
    color: 'marketing',
    questions: [5, 6, 7, 8, 9]
  },
  ops: {
    name: 'Business & Ops',
    shortName: 'Ops',
    color: 'ops',
    questions: [10, 11, 12, 13, 14]
  }
};

export const answerOptions = [
  {
    score: 0,
    label: "Not Yet",
    subtitle: "We handle this manually",
    colorClass: "selected-gray"
  },
  {
    score: 1,
    label: "Partially",
    subtitle: "Some automation in place",
    colorClass: "selected-yellow"
  },
  {
    score: 2,
    label: "Fully Automated",
    subtitle: "Runs without manual work",
    colorClass: "selected-green"
  }
];
