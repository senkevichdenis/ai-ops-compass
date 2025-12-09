import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, ArrowRight, Lightbulb, Loader2 } from 'lucide-react';
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
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const nextSection = completedSection === 'sales' ? 'marketing' : 'ops';
  const completedInfo = sectionInfo[completedSection];
  const nextInfo = sectionInfo[nextSection];
  const insight = getInsight(sectionScore, completedInfo.shortName);

  // Calculate progress bar percentage
  const progressPercent = (sectionScore / 10) * 100;

  // Wait for all data to be ready, then fade in as ONE unit
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Loading state
  if (!isReady) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex min-h-[70vh] flex-col items-center justify-center px-4 text-center transition-opacity duration-400 ease-out",
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
      style={{ willChange: 'opacity' }}
    >
      {/* Checkmark icon */}
      <div
        className={cn(
          "mb-6 rounded-full p-4",
          completedSection === 'sales' && "bg-sales/20",
          completedSection === 'marketing' && "bg-marketing/20"
        )}
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
      <h2 className="mb-6 text-2xl font-bold text-foreground md:text-3xl">
        {completedInfo.name} — Complete!
      </h2>

      {/* Score card with progress bar */}
      <div className="glass-card p-6 mb-6 w-full max-w-md">
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
        className={cn(
          "flex items-center gap-2 font-semibold px-8 py-4 rounded-xl transition-all duration-350 hover:scale-[1.02]",
          nextSection === 'marketing'
            ? "bg-marketing text-white"
            : "bg-ops text-white"
        )}
        style={{
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
