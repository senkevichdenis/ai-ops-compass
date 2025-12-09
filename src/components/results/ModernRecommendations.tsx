import { Check, Target, Megaphone, Cog, Sparkles, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { generateRecommendations, Recommendation } from '@/data/recommendations';

interface ModernRecommendationsProps {
  answers: (number | null)[];
  totalScore: number;
}

function RecommendationItem({
  rec,
  index,
  accentColor
}: {
  rec: Recommendation;
  index: number;
  accentColor: string;
}) {
  return (
    <div className="py-4">
      <div className="flex gap-4">
        <span className={cn("flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold", accentColor)}>
          {index + 1}
        </span>
        <div className="flex-1 min-w-0">
          <h6 className="font-heading text-foreground mb-1">{rec.title}</h6>
          <p className="text-sm text-primary mb-2">{rec.shortDescription}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{rec.description}</p>
        </div>
      </div>
    </div>
  );
}

function SectionCard({
  icon: Icon,
  title,
  count,
  recommendations,
  borderColor,
  iconBg,
  numberBg
}: {
  icon: React.ElementType;
  title: string;
  count: number;
  recommendations: Recommendation[];
  borderColor: string;
  iconBg: string;
  numberBg: string;
}) {
  if (count === 0) {
    return (
      <div className={cn("glass-card border-l-4", borderColor)}>
        <div className="flex items-center gap-3 mb-4">
          <div className={cn("flex items-center justify-center w-8 h-8 rounded-full", iconBg)}>
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <span className="font-heading text-foreground">{title}</span>
          </div>
        </div>
        <div className="badge-success flex items-center gap-2 px-4 py-2 rounded-full border border-success/20">
          <Check className="h-4 w-4" strokeWidth={2.5} />
          <span className="font-medium">All areas automated!</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("glass-card border-l-4", borderColor)}>
      <div className="flex items-center gap-3 mb-4">
        <div className={cn("flex items-center justify-center w-8 h-8 rounded-full", iconBg)}>
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <span className="font-heading text-foreground">{title}</span>
          <span className="ml-2 text-sm text-muted-foreground">({count} opportunities)</span>
        </div>
      </div>
      <div className="divide-y divide-white/10">
        {recommendations.map((rec, index) => (
          <RecommendationItem
            key={rec.questionId}
            rec={rec}
            index={index}
            accentColor={numberBg}
          />
        ))}
      </div>
    </div>
  );
}

export function ModernRecommendations({ answers, totalScore }: ModernRecommendationsProps) {
  const { sales, marketing, ops, doingWell, tierSummary } = generateRecommendations(answers, totalScore);
  
  const totalOpportunities = sales.length + marketing.length + ops.length;

  return (
    <div className="space-y-8">
      {/* Tier Summary */}
      <div className="glass-card p-6">
        <p className="text-muted-foreground leading-relaxed">{tierSummary}</p>
      </div>

      {/* What You're Doing Well - horizontal badges */}
      {doingWell.length > 0 && (
        <div className="glass-card">
          <h6 className="font-heading mb-4 text-foreground flex items-center gap-2">
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-success/20">
              <Check className="h-3 w-3 text-success" strokeWidth={2.5} />
            </div>
            What You're Already Doing Well
          </h6>
          <div className="flex flex-wrap gap-2">
            {doingWell.map((item, index) => (
              <span
                key={index}
                className="badge-success inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-success/20"
              >
                <Check className="h-3 w-3" strokeWidth={2.5} />
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Improvement Roadmap */}
      {totalOpportunities > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h5 className="font-heading text-foreground">Your Improvement Roadmap</h5>
              <p className="text-sm text-muted-foreground">
                We found {totalOpportunities} opportunities to automate. Here's where to focus for maximum impact:
              </p>
            </div>
          </div>

          {/* Section Cards */}
          <div className="space-y-6">
            {/* Sales */}
            <SectionCard
              icon={Target}
              title="SALES"
              count={sales.length}
              recommendations={sales}
              borderColor="border-l-sales"
              iconBg="bg-sales/20 text-sales"
              numberBg="bg-sales/20 text-sales"
            />

            {/* Marketing */}
            <SectionCard
              icon={Megaphone}
              title="MARKETING"
              count={marketing.length}
              recommendations={marketing}
              borderColor="border-l-marketing"
              iconBg="bg-marketing/20 text-marketing"
              numberBg="bg-marketing/20 text-marketing"
            />

            {/* Operations */}
            <SectionCard
              icon={Cog}
              title="OPERATIONS"
              count={ops.length}
              recommendations={ops}
              borderColor="border-l-ops"
              iconBg="bg-ops/20 text-ops"
              numberBg="bg-ops/20 text-ops"
            />
          </div>
        </div>
      )}
    </div>
  );
}
