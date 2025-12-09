import { useEffect, useState } from 'react';

interface Scores {
  sales: number;
  marketing: number;
  ops: number;
}

interface SectionBreakdownProps {
  scores: Scores;
}

export function SectionBreakdown({ scores }: SectionBreakdownProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const sections = [
    { key: 'sales', label: 'Sales', score: scores.sales },
    { key: 'marketing', label: 'Marketing', score: scores.marketing },
    { key: 'ops', label: 'Ops', score: scores.ops },
  ];

  return (
    <div className="glass-card p-6 space-y-4">
      {sections.map((section, index) => (
        <div key={section.key} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-normal text-foreground" style={{ letterSpacing: '0.01em' }}>{section.label}</span>
            <span className="text-sm text-muted-foreground">
              {section.score}/10
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-muted/50">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: animate ? `${(section.score / 10) * 100}%` : '0%',
                transitionDelay: `${index * 150}ms`,
                background: 'linear-gradient(90deg, #e0f7ff 0%, #20d3ee 100%)'
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
