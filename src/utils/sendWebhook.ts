import { getTierByScore } from '@/data/tiers';
import { questions, answerOptions } from '@/data/questions';
import { getRecommendationsForWebhook, getDoingWellList } from '@/data/recommendations';

const WEBHOOK_URL = 'https://n8n.isendora.com/webhook/9d16138a-8cb6-49c8-8ed9-d3cbc6d253a1';

interface LeadData {
  name: string;
  email: string;
}

interface ConsultationData extends LeadData {
  company?: string;
  challenge?: string;
}

interface Scores {
  sales: number;
  marketing: number;
  ops: number;
  total: number;
}

function getSectionName(section: 'sales' | 'marketing' | 'ops'): string {
  switch (section) {
    case 'sales': return 'Sales';
    case 'marketing': return 'Marketing';
    case 'ops': return 'Ops';
  }
}

function getAnswerLabel(score: number): string {
  const option = answerOptions.find(o => o.score === score);
  return option?.label || 'Unknown';
}

function buildAnswersArray(answers: (number | null)[]) {
  return answers.map((score, index) => {
    const question = questions[index];
    return {
      section: getSectionName(question.section),
      questionNumber: index + 1,
      question: question.main,
      answer: getAnswerLabel(score ?? 0),
      score: score ?? 0
    };
  });
}

export async function sendLeadWebhook(
  lead: LeadData,
  scores: Scores,
  answers: (number | null)[]
) {
  const tier = getTierByScore(scores.total);
  const recommendations = getRecommendationsForWebhook(answers);
  const doingWell = getDoingWellList(answers);
  
  const payload = {
    requestType: 'FreeAssessment',
    timestamp: new Date().toISOString(),
    lead,
    scores,
    tier: tier.id,
    tierSummary: tier.interpretation,
    answers: buildAnswersArray(answers),
    recommendations,
    doingWell
  };

  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error('Failed to send lead webhook:', error);
  }
}

export async function sendConsultationWebhook(
  lead: ConsultationData,
  scores: Scores,
  answers: (number | null)[]
) {
  const tier = getTierByScore(scores.total);
  const recommendations = getRecommendationsForWebhook(answers);
  const doingWell = getDoingWellList(answers);
  
  const payload = {
    requestType: 'ConsultationRequest',
    timestamp: new Date().toISOString(),
    lead,
    scores,
    tier: tier.id,
    tierSummary: tier.interpretation,
    answers: buildAnswersArray(answers),
    recommendations,
    doingWell
  };

  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error('Failed to send consultation webhook:', error);
  }
}
