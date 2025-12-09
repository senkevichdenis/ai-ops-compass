import { cn } from '@/lib/utils';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { sectionInfo } from '@/data/questions';

interface SectionTransitionProps {
  completedSection: 'sales' | 'marketing';
  sectionScore: number;
  onContinue: () => void;
}

export function SectionTransition({ completedSection, sectionScore, onContinue }: SectionTransitionProps) {
  const nextSection = completedSection === 'sales' ? 'marketing' : 'ops';
  const completedInfo = sectionInfo[completedSection];
  const nextInfo = sectionInfo[nextSection];

  return (
    <div className="animate-fade-in flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      {/* Animated checkmark */}
      <div
        className={cn(
          "mb-6 rounded-full p-4 animate-scale-in",
          completedSection === 'sales' && "bg-sales/20",
          completedSection === 'marketing' && "bg-marketing/20"
        )}
        style={{ animationDelay: '100ms' }}
      >
        <CheckCircle
          className={cn(
            "h-16 w-16",
            completedSection === 'sales' && "text-sales",
            completedSection === 'marketing' && "text-marketing"
          )}
        />
      </div>

      {/* Completion message */}
      <h2 
        className="mb-2 text-2xl font-bold text-foreground animate-fade-in"
        style={{ animationDelay: '200ms' }}
      >
        {completedInfo.name} — Complete!
      </h2>

      {/* Mini score */}
      <p 
        className="mb-6 text-muted-foreground animate-fade-in"
        style={{ animationDelay: '300ms' }}
      >
        Your score: <span className="font-semibold text-foreground">{sectionScore}/10</span>
      </p>

      {/* Next section preview */}
      <div 
        className="mb-8 animate-fade-in"
        style={{ animationDelay: '400ms' }}
      >
        <p className="text-lg text-foreground">
          Next up: <span className="font-semibold">{nextInfo.name}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          {nextSection === 'marketing' 
            ? "5 questions about content, leads, and personalization"
            : "5 questions about operations, support, and documentation"
          }
        </p>
      </div>

      {/* Continue button */}
      <button 
        onClick={onContinue} 
        className="btn-primary flex items-center gap-2 animate-fade-in"
        style={{ animationDelay: '500ms' }}
      >
        Continue
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
}
