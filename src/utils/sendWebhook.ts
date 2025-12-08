import { getTierByScore } from '@/data/tiers';

const WEBHOOK_URL_LEAD = '[PLACEHOLDER_WEBHOOK_URL_LEAD]';
const WEBHOOK_URL_CONSULTATION = '[PLACEHOLDER_WEBHOOK_URL_CONSULTATION]';

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

export async function sendLeadWebhook(
  lead: LeadData,
  scores: Scores,
  answers: (number | null)[]
) {
  const tier = getTierByScore(scores.total);
  
  const payload = {
    type: 'lead_capture',
    timestamp: new Date().toISOString(),
    lead,
    scores,
    tier: tier.id,
    answers: answers.map(a => a ?? 0),
  };

  try {
    await fetch(WEBHOOK_URL_LEAD, {
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
  
  const payload = {
    type: 'consultation_request',
    timestamp: new Date().toISOString(),
    lead,
    scores,
    tier: tier.id,
    answers: answers.map(a => a ?? 0),
  };

  try {
    await fetch(WEBHOOK_URL_CONSULTATION, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error('Failed to send consultation webhook:', error);
  }
}
