import { ArrowRight, Eye } from 'lucide-react';

interface SharedResultsBannerProps {
  onTakeAssessment: () => void;
}

export function SharedResultsBanner({ onTakeAssessment }: SharedResultsBannerProps) {
  return (
    <div className="mb-6 rounded-xl bg-primary/10 border border-primary/20 p-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/20">
            <Eye className="h-5 w-5 text-primary" />
          </div>
          <span className="text-foreground font-normal" style={{ letterSpacing: '0.01em' }}>Viewing shared results</span>
        </div>
        <button
          onClick={onTakeAssessment}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-normal hover:bg-primary/90 transition-all duration-300" style={{ letterSpacing: '0.01em' }}
        >
          Take your own assessment
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
