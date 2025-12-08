import { cn } from '@/lib/utils';
import { Circle, CircleDot, CircleCheck } from 'lucide-react';

interface AnswerCardProps {
  score: number;
  label: string;
  subtitle: string;
  isSelected: boolean;
  onClick: () => void;
}

export function AnswerCard({ score, label, subtitle, isSelected, onClick }: AnswerCardProps) {
  const getColorClass = () => {
    if (!isSelected) return '';
    switch (score) {
      case 0: return 'selected-gray';
      case 1: return 'selected-yellow';
      case 2: return 'selected-green';
      default: return '';
    }
  };

  const getIcon = () => {
    const className = "w-6 h-6 mb-3";
    switch (score) {
      case 0:
        return <Circle className={cn(className, isSelected ? "text-muted-foreground" : "text-muted-foreground/50")} />;
      case 1:
        return <CircleDot className={cn(className, isSelected ? "text-warning" : "text-muted-foreground/50")} />;
      case 2:
        return <CircleCheck className={cn(className, isSelected ? "text-success" : "text-muted-foreground/50")} />;
      default:
        return null;
    }
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "answer-card min-h-[140px] w-full",
        getColorClass()
      )}
    >
      {getIcon()}
      <span className="text-lg font-semibold text-foreground">{label}</span>
      <span className="mt-1 text-sm text-muted-foreground">{subtitle}</span>
    </button>
  );
}
