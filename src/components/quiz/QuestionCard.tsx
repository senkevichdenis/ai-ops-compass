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
        <span className="font-heading text-3xl text-muted-foreground/50">
          Q{questionNumber}
        </span>
        <span
          className="rounded-full px-3 py-1 text-sm font-normal"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            color: 'rgba(255, 255, 255, 0.7)',
            letterSpacing: '0.01em'
          }}
        >
          {section.shortName}
        </span>
      </div>

      {/* Main question */}
      <h4 className="font-heading mb-4 text-center leading-tight text-foreground">
        {question.main}
      </h4>

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

      {/* Back button - always render to prevent layout shift */}
      <div className="mt-8 h-6">
        {canGoBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors duration-350"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
        )}
      </div>
    </div>
  );
}
