import { Check } from 'lucide-react';
import { getTierByScore } from '@/data/tiers';

interface RecommendationsProps {
  totalScore: number;
}

export function Recommendations({ totalScore }: RecommendationsProps) {
  const tier = getTierByScore(totalScore);

  return (
    <div className="space-y-6">
      {/* Interpretation */}
      <div className="glass-card p-6">
        <h6 className="font-heading mb-3 text-foreground">What This Means</h6>
        <p className="text-muted-foreground leading-relaxed">{tier.interpretation}</p>
      </div>

      {/* Recommendations */}
      <div className="glass-card p-6">
        <h6 className="font-heading mb-4 text-foreground">Quick Wins to Start</h6>
        <ul className="space-y-3">
          {tier.recommendations.map((rec, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
                <Check className="h-3 w-3 text-primary" />
              </div>
              <span className="text-muted-foreground">{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
