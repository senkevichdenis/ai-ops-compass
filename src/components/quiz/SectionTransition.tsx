import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Lightbulb } from 'lucide-react';
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
  const [isVisible, setIsVisible] = useState(false);

  const nextSection = completedSection === 'sales' ? 'marketing' : 'ops';
  const completedInfo = sectionInfo[completedSection];
  const nextInfo = sectionInfo[nextSection];
  const insight = getInsight(sectionScore, completedInfo.shortName);

  // Calculate progress bar percentage
  const progressPercent = (sectionScore / 10) * 100;

  // Fade in immediately on mount as ONE unit - no loader
  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM is ready before fading in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    });
  }, []);

  return (
    <div
      className={cn(
        "flex min-h-[70vh] flex-col items-center justify-center px-4 text-center transition-opacity duration-400 ease-out",
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
      style={{ willChange: 'opacity' }}
    >
      {/* Subtle decorative line */}
      <div className="mb-6 w-16 h-0.5 rounded-full bg-gradient-to-r from-white/30 to-white/5" />

      {/* Completion message */}
      <h4 className="font-heading mb-6 text-foreground">
        {completedInfo.name} — Complete!
      </h4>

      {/* Score card with progress bar */}
      <div className="glass-card p-6 mb-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-3">
          <span className="text-muted-foreground">Your {completedInfo.shortName} Score</span>
          <span className="font-heading text-foreground text-lg">{sectionScore}/10</span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-3 bg-muted/50 rounded-full overflow-hidden mb-4">
          <div
            className="h-full rounded-full progress-bar-fill"
            style={{
              width: `${progressPercent}%`,
              background: 'linear-gradient(90deg, rgba(255,255,255,0.8) 0%, #20d3ee 100%)'
            }}
          />
        </div>

        {/* Insight */}
        <div className="flex items-start gap-3">
          <Lightbulb className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground text-left">
            {insight.text}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-16 h-px bg-border mb-6" />

      {/* Next section preview */}
      <div className="mb-8">
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
        className="btn-primary px-8 py-4"
      >
        Continue to {nextInfo.shortName}
      </button>
    </div>
  );
}
