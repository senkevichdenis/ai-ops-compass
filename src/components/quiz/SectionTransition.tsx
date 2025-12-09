import { cn } from '@/lib/utils';
import { CheckCircle, ArrowRight, Lightbulb } from 'lucide-react';
import { sectionInfo } from '@/data/questions';

interface SectionTransitionProps {
  completedSection: 'sales' | 'marketing';
  sectionScore: number;
  onContinue: () => void;
}

function getInsight(score: number, sectionName: string): { emoji: string; text: string } {
  const lowScoreCount = 10 - score; // max 10, so opportunities = 10 - score
  
  if (score >= 8) {
    return {
      emoji: '🎉',
      text: `Great job! Your ${sectionName} is well automated.`
    };
  } else if (score >= 5) {
    return {
      emoji: '💡',
      text: `You have ${Math.ceil(lowScoreCount / 2)} opportunities to improve ${sectionName} automation.`
    };
  } else {
    return {
      emoji: '🚀',
      text: `There's significant room for automation in ${sectionName} — potential to save 10+ hours/week.`
    };
  }
}

export function SectionTransition({ completedSection, sectionScore, onContinue }: SectionTransitionProps) {
  const nextSection = completedSection === 'sales' ? 'marketing' : 'ops';
  const completedInfo = sectionInfo[completedSection];
  const nextInfo = sectionInfo[nextSection];
  const insight = getInsight(sectionScore, completedInfo.shortName);

  // Calculate progress bar percentage
  const progressPercent = (sectionScore / 10) * 100;

  return (
    <div className="animate-fade-in flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
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
        className="mb-6 text-2xl font-bold text-foreground animate-fade-in md:text-3xl"
        style={{ animationDelay: '200ms' }}
      >
        {completedInfo.name} — Complete!
      </h2>

      {/* Score card with progress bar */}
      <div 
        className="glass-card p-6 mb-6 w-full max-w-md animate-fade-in"
        style={{ animationDelay: '300ms' }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-muted-foreground">Your {completedInfo.shortName} Score</span>
          <span className="font-bold text-foreground text-lg">{sectionScore}/10</span>
        </div>
        
        {/* Progress bar */}
        <div className="w-full h-3 bg-secondary rounded-full overflow-hidden mb-4">
          <div 
            className={cn(
              "h-full rounded-full progress-bar-fill",
              completedSection === 'sales' && "bg-sales",
              completedSection === 'marketing' && "bg-marketing"
            )}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Insight */}
        <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
          <Lightbulb className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground text-left">
            {insight.text}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-16 h-px bg-border mb-6 animate-fade-in" style={{ animationDelay: '400ms' }} />

      {/* Next section preview */}
      <div 
        className="mb-8 animate-fade-in"
        style={{ animationDelay: '450ms' }}
      >
        <p className="text-lg text-foreground mb-1">
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
        className={cn(
          "flex items-center gap-2 animate-fade-in font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-[1.02]",
          nextSection === 'marketing' 
            ? "bg-marketing text-white" 
            : "bg-ops text-white"
        )}
        style={{ 
          animationDelay: '500ms',
          boxShadow: nextSection === 'marketing' 
            ? '0 0 30px hsl(263, 70%, 58%, 0.3)' 
            : '0 0 30px hsl(187, 85%, 43%, 0.3)'
        }}
      >
        Continue to {nextInfo.shortName}
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
}
