import { cn } from '@/lib/utils';
import { sectionInfo } from '@/data/questions';

interface QuizProgressProps {
  currentQuestion: number;
  currentSection: 'sales' | 'marketing' | 'ops';
}

export function QuizProgress({ currentQuestion, currentSection }: QuizProgressProps) {
  const totalQuestions = 15;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const sections = ['sales', 'marketing', 'ops'] as const;

  return (
    <div className="w-full space-y-4">
      {/* Section indicators */}
      <div className="flex items-center justify-center gap-8">
        {sections.map((section) => (
          <div
            key={section}
            className={cn(
              "flex items-center gap-2 transition-all duration-300",
              currentSection === section ? "opacity-100" : "opacity-40"
            )}
          >
            <div
              className={cn(
                "section-dot",
                currentSection === section && "active",
                section === 'sales' && "bg-sales",
                section === 'marketing' && "bg-marketing",
                section === 'ops' && "bg-ops"
              )}
            />
            <span
              className={cn(
                "text-sm font-medium transition-colors",
                currentSection === section ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {sectionInfo[section].shortName}
            </span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-muted/50">
        <div
          className={cn(
            "progress-bar-fill absolute left-0 top-0 h-full rounded-full",
            currentSection === 'sales' && "bg-gradient-to-r from-sales to-sales/80",
            currentSection === 'marketing' && "bg-gradient-to-r from-marketing to-marketing/80",
            currentSection === 'ops' && "bg-gradient-to-r from-ops to-ops/80"
          )}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question counter */}
      <p className="text-center text-sm text-muted-foreground">
        Question {currentQuestion + 1} of {totalQuestions}
      </p>
    </div>
  );
}
