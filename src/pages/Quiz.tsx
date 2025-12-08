import { questions } from '@/data/questions';
import { QuizProgress } from '@/components/quiz/QuizProgress';
import { QuestionCard } from '@/components/quiz/QuestionCard';
import { SectionTransition } from '@/components/quiz/SectionTransition';

interface QuizProps {
  currentQuestion: number;
  currentSection: 'sales' | 'marketing' | 'ops';
  answers: (number | null)[];
  showTransition: boolean;
  onAnswer: (score: number) => void;
  onBack: () => void;
  onContinueFromTransition: () => void;
}

export function Quiz({
  currentQuestion,
  currentSection,
  answers,
  showTransition,
  onAnswer,
  onBack,
  onContinueFromTransition,
}: QuizProps) {
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
      {/* Progress section */}
      <div className="w-full px-4 pt-8 pb-4">
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
    </div>
  );
}
