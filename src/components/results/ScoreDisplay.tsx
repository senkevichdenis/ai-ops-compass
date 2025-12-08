import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { getTierByScore } from '@/data/tiers';

interface ScoreDisplayProps {
  total: number;
  maxScore?: number;
}

export function ScoreDisplay({ total, maxScore = 30 }: ScoreDisplayProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const tier = getTierByScore(total);

  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const increment = total / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= total) {
        setDisplayScore(total);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [total]);

  return (
    <div className="flex flex-col items-center">
      {/* Main score circle */}
      <div className="glass-card relative flex h-40 w-40 flex-col items-center justify-center rounded-full">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-xl" />
        <span className="relative text-5xl font-bold text-foreground">{displayScore}</span>
        <span className="relative text-xl text-muted-foreground">/{maxScore}</span>
      </div>

      {/* Tier badge */}
      <div
        className={cn(
          "mt-6 rounded-full px-4 py-2 text-sm font-semibold",
          tier.id === 'critical' && "bg-destructive/20 text-destructive",
          tier.id === 'developing' && "bg-warning/20 text-warning",
          tier.id === 'progressing' && "bg-primary/20 text-primary",
          tier.id === 'advanced' && "bg-success/20 text-success"
        )}
      >
        {tier.badge}
      </div>
    </div>
  );
}
