import { Eye } from 'lucide-react';

interface SharedResultsBannerProps {
  onTakeAssessment: () => void;
}

export function SharedResultsBanner({ onTakeAssessment }: SharedResultsBannerProps) {
  return (
    <div className="mb-6 rounded-xl p-4 glass-card">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
            <Eye className="h-5 w-5" style={{ color: 'rgba(255, 255, 255, 0.7)' }} />
          </div>
          <span className="text-foreground font-normal" style={{ letterSpacing: '0.01em' }}>Viewing shared results</span>
        </div>
        <button
          onClick={onTakeAssessment}
          className="btn-primary"
        >
          Take Your Assessment
        </button>
      </div>
    </div>
  );
}
