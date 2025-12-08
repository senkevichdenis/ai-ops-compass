import { useState } from 'react';
import { ScoreDisplay } from '@/components/results/ScoreDisplay';
import { SectionBreakdown } from '@/components/results/SectionBreakdown';
import { Recommendations } from '@/components/results/Recommendations';
import { ConsultationModal } from '@/components/results/ConsultationModal';
import { RefreshCw, Share2, Sparkles } from 'lucide-react';
import { sendConsultationWebhook } from '@/utils/sendWebhook';

interface Scores {
  sales: number;
  marketing: number;
  ops: number;
  total: number;
}

interface ResultsProps {
  scores: Scores;
  answers: (number | null)[];
  leadData: { name: string; email: string } | null;
  onRestart: () => void;
}

export function Results({ scores, answers, leadData, onRestart }: ResultsProps) {
  const [showModal, setShowModal] = useState(false);

  const handleConsultationSubmit = (data: {
    name: string;
    email: string;
    company?: string;
    challenge?: string;
  }) => {
    sendConsultationWebhook(data, scores, answers);
  };

  const handleShare = async () => {
    const text = `I scored ${scores.total}/30 on the AI Ops Efficiency Scorecard! Check your automation readiness too.`;
    
    if (navigator.share) {
      try {
        await navigator.share({ text, url: window.location.href });
      } catch {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${text} ${window.location.href}`);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-radial px-4 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="animate-fade-in mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
            Your AI Ops Efficiency Score
          </h1>
        </div>

        {/* Score display */}
        <div className="animate-fade-in mb-8" style={{ animationDelay: '100ms' }}>
          <ScoreDisplay total={scores.total} />
        </div>

        {/* Section breakdown */}
        <div className="animate-fade-in mb-8" style={{ animationDelay: '200ms' }}>
          <SectionBreakdown scores={scores} />
        </div>

        {/* Recommendations */}
        <div className="animate-fade-in mb-8" style={{ animationDelay: '300ms' }}>
          <Recommendations totalScore={scores.total} />
        </div>

        {/* CTA Section */}
        <div className="animate-fade-in glass-card p-6 text-center mb-8" style={{ animationDelay: '400ms' }}>
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/20 p-3">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-foreground">
            Want a Detailed Action Plan?
          </h3>
          <p className="mb-6 text-muted-foreground">
            Get a personalized automation roadmap from our team.
          </p>
          <button onClick={() => setShowModal(true)} className="btn-primary">
            Request Free Consultation
          </button>
        </div>

        {/* Footer actions */}
        <div className="animate-fade-in flex flex-wrap items-center justify-center gap-4" style={{ animationDelay: '500ms' }}>
          <button
            onClick={onRestart}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Retake Assessment
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Share2 className="h-4 w-4" />
            Share Results
          </button>
        </div>
      </div>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleConsultationSubmit}
        prefillName={leadData?.name}
        prefillEmail={leadData?.email}
      />
    </div>
  );
}
