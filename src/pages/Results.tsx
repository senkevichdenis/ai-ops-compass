import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScoreDisplay } from '@/components/results/ScoreDisplay';
import { SectionBreakdown } from '@/components/results/SectionBreakdown';
import { DeepRecommendations } from '@/components/results/DeepRecommendations';
import { EmailCaptureCard } from '@/components/results/EmailCaptureCard';
import { ConsultationModal } from '@/components/results/ConsultationModal';
import { SharedResultsBanner } from '@/components/results/SharedResultsBanner';
import { RefreshCw, Share2, Sparkles, Link, Check } from 'lucide-react';
import { sendConsultationWebhook, sendLeadWebhook } from '@/utils/sendWebhook';
import { toast } from 'sonner';

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
  isSharedView?: boolean;
}

export function Results({ scores, answers, leadData, onRestart, isSharedView = false }: ResultsProps) {
  const [showModal, setShowModal] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const navigate = useNavigate();

  const handleConsultationSubmit = (data: {
    name: string;
    email: string;
    company?: string;
    challenge?: string;
  }) => {
    sendConsultationWebhook(data, scores, answers);
  };

  const handleEmailCapture = async (data: { name: string; email: string }) => {
    await sendLeadWebhook(data, scores, answers);
    toast.success("Sent! You'll receive your detailed results within 5 minutes.");
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/results?s=${scores.sales}&m=${scores.marketing}&o=${scores.ops}`;
    const shareText = `I scored ${scores.total}/30 on the AI Ops Assessment. Check your automation readiness!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My AI Ops Efficiency Score',
          text: shareText,
          url: shareUrl
        });
      } catch (error) {
        // User cancelled or share failed - fall back to clipboard
        copyToClipboard(shareUrl);
      }
    } else {
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setLinkCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setLinkCopied(false), 3000);
  };

  const handleTakeAssessment = () => {
    navigate('/');
    onRestart();
  };

  // Check if user skipped lead capture (no lead data)
  const showEmailCapture = !leadData && !isSharedView;

  return (
    <div className="relative min-h-screen bg-gradient-radial px-4 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Shared results banner */}
        {isSharedView && (
          <SharedResultsBanner onTakeAssessment={handleTakeAssessment} />
        )}

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

        {/* Deep Recommendations - only show for non-shared views or if we have answers */}
        {!isSharedView && answers.some(a => a !== null) && (
          <div className="animate-fade-in mb-8" style={{ animationDelay: '300ms' }}>
            <DeepRecommendations answers={answers} totalScore={scores.total} />
          </div>
        )}

        {/* Email capture for users who skipped */}
        {showEmailCapture && (
          <div className="animate-fade-in mb-8" style={{ animationDelay: '400ms' }}>
            <EmailCaptureCard onSubmit={handleEmailCapture} />
          </div>
        )}

        {/* CTA Section - hide or modify for shared views */}
        {!isSharedView ? (
          <div className="animate-fade-in glass-card p-6 text-center mb-8" style={{ animationDelay: '500ms' }}>
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
        ) : (
          <div className="animate-fade-in glass-card p-6 text-center mb-8" style={{ animationDelay: '400ms' }}>
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/20 p-3">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-foreground">
              Get Your Own Personalized Results
            </h3>
            <p className="mb-6 text-muted-foreground">
              Take the assessment to discover your specific automation opportunities.
            </p>
            <button onClick={handleTakeAssessment} className="btn-primary">
              Take Your Own Assessment
            </button>
          </div>
        )}

        {/* Footer actions */}
        <div className="animate-fade-in flex flex-wrap items-center justify-center gap-4" style={{ animationDelay: '600ms' }}>
          <button
            onClick={onRestart}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <RefreshCw className="h-4 w-4" />
            Retake Assessment
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            {linkCopied ? (
              <>
                <Check className="h-4 w-4 text-success" />
                <span className="text-success">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4" />
                Share Results
              </>
            )}
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
