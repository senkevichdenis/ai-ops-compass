import { ArrowRight, Eye } from 'lucide-react';

interface SharedResultsBannerProps {
  onTakeAssessment: () => void;
}

export function SharedResultsBanner({ onTakeAssessment }: SharedResultsBannerProps) {
  return (
    <div className="mb-6 rounded-xl p-4" style={{ backgroundColor: 'rgba(32, 211, 238, 0.1)', border: '1px solid rgba(32, 211, 238, 0.2)' }}>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full" style={{ backgroundColor: 'rgba(32, 211, 238, 0.2)' }}>
            <Eye className="h-5 w-5" style={{ color: '#20d3ee' }} />
          </div>
          <span className="text-foreground font-normal" style={{ letterSpacing: '0.01em' }}>Viewing shared results</span>
        </div>
        <button
          onClick={onTakeAssessment}
          className="btn-primary flex items-center gap-2"
        >
          Take your own assessment
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
