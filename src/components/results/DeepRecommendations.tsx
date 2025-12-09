import { useState } from 'react';
import { ChevronDown, ChevronUp, Check, Target, Megaphone, Cog, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { generateRecommendations, Recommendation } from '@/data/recommendations';

interface DeepRecommendationsProps {
  answers: (number | null)[];
  totalScore: number;
}

function RecommendationCard({ 
  rec, 
  isExpanded, 
  onToggle,
  accentColor 
}: { 
  rec: Recommendation; 
  isExpanded: boolean; 
  onToggle: () => void;
  accentColor: string;
}) {
  return (
    <div 
      className={cn(
        "glass-card p-4 cursor-pointer transition-all duration-300 hover:scale-[1.01]",
        "border-l-4",
        accentColor
      )}
      onClick={onToggle}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground mb-1">{rec.title}</h4>
          <p className="text-sm text-muted-foreground">{rec.shortDescription}</p>
        </div>
        <button className="flex-shrink-0 p-1 text-muted-foreground">
          {isExpanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
      </div>
      
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-muted-foreground leading-relaxed">{rec.description}</p>
        </div>
      )}
    </div>
  );
}

function SectionHeader({ 
  icon: Icon, 
  title, 
  count, 
  isExpanded, 
  onToggle,
  colorClass,
  allAutomated
}: { 
  icon: React.ElementType;
  title: string; 
  count: number; 
  isExpanded: boolean; 
  onToggle: () => void;
  colorClass: string;
  allAutomated?: boolean;
}) {
  return (
    <button 
      onClick={onToggle}
      className="w-full flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-all duration-300"
    >
      <div className="flex items-center gap-3">
        <div className={cn("p-2 rounded-lg", colorClass.replace('text-', 'bg-') + '/20')}>
          <Icon className={cn("h-5 w-5", colorClass)} />
        </div>
        <div className="text-left">
          <span className="font-semibold text-foreground">{title}</span>
          {allAutomated ? (
            <span className="ml-2 text-sm text-success">✓ All automated!</span>
          ) : (
            <span className="ml-2 text-sm text-muted-foreground">({count} opportunities)</span>
          )}
        </div>
      </div>
      {!allAutomated && (
        isExpanded ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        )
      )}
    </button>
  );
}

export function DeepRecommendations({ answers, totalScore }: DeepRecommendationsProps) {
  const { sales, marketing, ops, doingWell, tierSummary } = generateRecommendations(answers, totalScore);
  
  const [expandedSections, setExpandedSections] = useState({
    sales: true,
    marketing: true,
    ops: true,
    doingWell: false
  });
  
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleCard = (questionId: number) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-6">
      {/* Tier Summary */}
      <div className="glass-card p-6">
        <h3 className="mb-3 text-lg font-semibold text-foreground flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          What This Means
        </h3>
        <p className="text-muted-foreground leading-relaxed">{tierSummary}</p>
      </div>

      {/* Recommendations by Section - Desktop: 2 columns, Mobile: stacked */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Sales Section */}
        <div className="space-y-3">
          <SectionHeader
            icon={Target}
            title="Sales Opportunities"
            count={sales.length}
            isExpanded={expandedSections.sales}
            onToggle={() => toggleSection('sales')}
            colorClass="text-sales"
            allAutomated={sales.length === 0}
          />
          {expandedSections.sales && sales.length > 0 && (
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {sales.map(rec => (
                <RecommendationCard
                  key={rec.questionId}
                  rec={rec}
                  isExpanded={expandedCards.has(rec.questionId)}
                  onToggle={() => toggleCard(rec.questionId)}
                  accentColor="border-l-sales"
                />
              ))}
            </div>
          )}
        </div>

        {/* Marketing Section */}
        <div className="space-y-3">
          <SectionHeader
            icon={Megaphone}
            title="Marketing Opportunities"
            count={marketing.length}
            isExpanded={expandedSections.marketing}
            onToggle={() => toggleSection('marketing')}
            colorClass="text-marketing"
            allAutomated={marketing.length === 0}
          />
          {expandedSections.marketing && marketing.length > 0 && (
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {marketing.map(rec => (
                <RecommendationCard
                  key={rec.questionId}
                  rec={rec}
                  isExpanded={expandedCards.has(rec.questionId)}
                  onToggle={() => toggleCard(rec.questionId)}
                  accentColor="border-l-marketing"
                />
              ))}
            </div>
          )}
        </div>

        {/* Ops Section */}
        <div className="space-y-3">
          <SectionHeader
            icon={Cog}
            title="Operations Opportunities"
            count={ops.length}
            isExpanded={expandedSections.ops}
            onToggle={() => toggleSection('ops')}
            colorClass="text-ops"
            allAutomated={ops.length === 0}
          />
          {expandedSections.ops && ops.length > 0 && (
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {ops.map(rec => (
                <RecommendationCard
                  key={rec.questionId}
                  rec={rec}
                  isExpanded={expandedCards.has(rec.questionId)}
                  onToggle={() => toggleCard(rec.questionId)}
                  accentColor="border-l-ops"
                />
              ))}
            </div>
          )}
        </div>

        {/* What You're Doing Well */}
        {doingWell.length > 0 && (
          <div className="space-y-3">
            <SectionHeader
              icon={Check}
              title="What You're Doing Well"
              count={doingWell.length}
              isExpanded={expandedSections.doingWell}
              onToggle={() => toggleSection('doingWell')}
              colorClass="text-success"
            />
            {expandedSections.doingWell && (
              <div className="flex flex-wrap gap-2 p-4 rounded-xl bg-success/5 border border-success/20">
                {doingWell.map((item, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success/10 text-success text-sm font-medium"
                  >
                    <Check className="h-3.5 w-3.5" />
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
