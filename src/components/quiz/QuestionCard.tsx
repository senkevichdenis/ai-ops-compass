import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Question, answerOptions, sectionInfo } from '@/data/questions';
import { AnswerCard } from './AnswerCard';
import { ChevronLeft } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  selectedAnswer: number | null;
  onAnswer: (score: number) => void;
  onBack: () => void;
  canGoBack: boolean;
}

export function QuestionCard({
  question,
  questionNumber,
  selectedAnswer,
  onAnswer,
  onBack,
  canGoBack,
}: QuestionCardProps) {
  const section = sectionInfo[question.section];
  const [isVisible, setIsVisible] = useState(false);
  const prevQuestionRef = useRef(questionNumber);

  // Fade in when question changes or on initial mount
  useEffect(() => {
    // Reset visibility when question changes
    if (prevQuestionRef.current !== questionNumber) {
      setIsVisible(false);
      prevQuestionRef.current = questionNumber;
    }

    // Small delay then fade in as one unit
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, [questionNumber]);

  return (
    <div
      className={cn(
        "w-full max-w-2xl mx-auto px-4 transition-opacity duration-350 ease-out",
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
      style={{ willChange: 'opacity, transform' }}
    >
      {/* Question header */}
      <div className="mb-8 flex items-center justify-center gap-3">
        <span className="text-3xl font-bold text-muted-foreground/50">
          Q{questionNumber}
        </span>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-sm font-medium",
            question.section === 'sales' && "bg-sales/20 text-sales",
            question.section === 'marketing' && "bg-marketing/20 text-marketing",
            question.section === 'ops' && "bg-ops/20 text-ops"
          )}
        >
          {section.shortName}
        </span>
      </div>

      {/* Main question */}
      <h2 className="mb-4 text-center text-2xl font-bold leading-tight text-foreground md:text-3xl">
        {question.main}
      </h2>

      {/* Explanation */}
      <p className="mb-10 text-center text-muted-foreground leading-relaxed">
        {question.explanation}
      </p>

      {/* Answer cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {answerOptions.map((option) => (
          <AnswerCard
            key={option.score}
            score={option.score}
            label={option.label}
            subtitle={option.subtitle}
            isSelected={selectedAnswer === option.score}
            onClick={() => onAnswer(option.score)}
          />
        ))}
      </div>

      {/* Back button */}
      {canGoBack && (
        <button
          onClick={onBack}
          className="mt-8 flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors duration-350"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>
      )}
    </div>
  );
}
