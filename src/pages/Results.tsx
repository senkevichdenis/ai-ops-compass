import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScoreDisplay } from '@/components/results/ScoreDisplay';
import { SectionBreakdown } from '@/components/results/SectionBreakdown';
import { ModernRecommendations } from '@/components/results/ModernRecommendations';
import { EmailCaptureCard } from '@/components/results/EmailCaptureCard';
import { ConsultationModal } from '@/components/results/ConsultationModal';
import { SharedResultsBanner } from '@/components/results/SharedResultsBanner';
import { RefreshCw, Share2, Sparkles, Check } from 'lucide-react';
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
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  // Fade in on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

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

  const showEmailCapture = !leadData && !isSharedView;

  return (
    <div 
      className={`relative min-h-screen bg-gradient-radial px-4 py-12 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="mx-auto max-w-3xl">
        {/* Shared results banner */}
        {isSharedView && (
          <SharedResultsBanner onTakeAssessment={handleTakeAssessment} />
        )}

        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="font-heading mb-2 text-foreground">
            Your Efficiency Score
          </h2>
        </div>

        {/* Score display */}
        <div className="mb-8">
          <ScoreDisplay total={scores.total} />
        </div>

        {/* Section breakdown - horizontal on desktop */}
        <div className="mb-10">
          <SectionBreakdown scores={scores} />
        </div>

        {/* Deep Recommendations - modern design, no accordions */}
        {!isSharedView && answers.some(a => a !== null) && (
          <div className="mb-10">
            <ModernRecommendations answers={answers} totalScore={scores.total} />
          </div>
        )}

        {/* Email capture for users who skipped */}
        {showEmailCapture && (
          <div className="mb-10">
            <EmailCaptureCard onSubmit={handleEmailCapture} />
          </div>
        )}

        {/* CTA Section - with glow effect */}
        {!isSharedView ? (
          <div className="cta-card text-center mb-8">
            <div className="badge mb-4">
              <Sparkles className="h-4 w-4" style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
              <span>Next Step</span>
            </div>
            <h5 className="font-heading mb-2 text-foreground">
              Want a Detailed Action Plan?
            </h5>
            <p className="mb-6 text-muted-foreground">
              Get a personalized automation roadmap from our team.
            </p>
            <button onClick={() => setShowModal(true)} className="btn-primary-white-hover">
              Request Free Consultation
            </button>
          </div>
        ) : (
          <div className="cta-card text-center mb-8">
            <div className="badge mb-4">
              <Sparkles className="h-4 w-4" style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
              <span>Get Started</span>
            </div>
            <h5 className="font-heading mb-2 text-foreground">
              Get Your Own Personalized Results
            </h5>
            <p className="mb-6 text-muted-foreground">
              Take the assessment to discover your specific automation opportunities.
            </p>
            <button onClick={handleTakeAssessment} className="btn-primary-white-hover">
              Take Your Own Assessment
            </button>
          </div>
        )}

        {/* Footer actions */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onRestart}
            className="btn-ghost flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Retake Assessment
          </button>
          <button
            onClick={handleShare}
            className="btn-ghost flex items-center gap-2"
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
