import { useState } from 'react';
import { LogOut } from 'lucide-react';
import { questions } from '@/data/questions';
import { QuizProgress } from '@/components/quiz/QuizProgress';
import { QuestionCard } from '@/components/quiz/QuestionCard';
import { SectionTransition } from '@/components/quiz/SectionTransition';
import { ExitConfirmDialog } from '@/components/quiz/ExitConfirmDialog';

interface QuizProps {
  currentQuestion: number;
  currentSection: 'sales' | 'marketing' | 'ops';
  answers: (number | null)[];
  showTransition: boolean;
  onAnswer: (score: number) => void;
  onBack: () => void;
  onContinueFromTransition: () => void;
  onExit: () => void;
}

export function Quiz({
  currentQuestion,
  currentSection,
  answers,
  showTransition,
  onAnswer,
  onBack,
  onContinueFromTransition,
  onExit,
}: QuizProps) {
  const [showExitDialog, setShowExitDialog] = useState(false);

  const handleExitClick = () => {
    setShowExitDialog(true);
  };

  const handleConfirmExit = () => {
    setShowExitDialog(false);
    onExit();
  };

  if (showTransition) {
    const completedSection = currentQuestion < 5 ? 'sales' : 'marketing';
    const sectionScore = completedSection === 'sales'
      ? answers.slice(0, 5).reduce((a, b) => a + (b ?? 0), 0)
      : answers.slice(5, 10).reduce((a, b) => a + (b ?? 0), 0);

    return (
      <div className="relative min-h-screen bg-gradient-radial">
        <SectionTransition
          completedSection={completedSection as 'sales' | 'marketing'}
          sectionScore={sectionScore}
          onContinue={onContinueFromTransition}
        />
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-radial">
      {/* Exit button */}
      <button
        onClick={handleExitClick}
        className="absolute left-4 top-4 z-10 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
      >
        <LogOut className="h-4 w-4" />
        <span>Exit</span>
      </button>

      {/* Progress section */}
      <div className="w-full px-4 pt-12 pb-4">
        <div className="mx-auto max-w-2xl">
          <QuizProgress
            currentQuestion={currentQuestion}
            currentSection={currentSection}
          />
        </div>
      </div>

      {/* Question content */}
      <div className="flex flex-1 items-center justify-center py-8">
        <QuestionCard
          question={question}
          questionNumber={currentQuestion + 1}
          selectedAnswer={answers[currentQuestion]}
          onAnswer={onAnswer}
          onBack={onBack}
          canGoBack={currentQuestion > 0}
        />
      </div>

      {/* Exit confirmation dialog */}
      <ExitConfirmDialog
        isOpen={showExitDialog}
        onConfirm={handleConfirmExit}
        onCancel={() => setShowExitDialog(false)}
      />
    </div>
  );
}
