import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, BarChart3, Lock, Zap, Clock, Sparkles, FileText, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LandingProps {
  onStart: () => void;
  onResume?: () => void;
  hasSavedProgress: boolean;
}

export function Landing({ onStart, onResume, hasSavedProgress }: LandingProps) {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  // Fade in on mount as ONE unit
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12">
      {/* Background effects - SIMPLE */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-radial" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />

      <div
        className={cn(
          "relative z-10 max-w-4xl w-full text-center transition-opacity duration-400 ease-out",
          isVisible ? 'opacity-100' : 'opacity-0'
        )}
        style={{ willChange: 'opacity' }}
      >
        {/* Badge - top */}
        <div className="badge mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span>AI Ops Compass</span>
        </div>

        {/* Main headline - with cyan gradient */}
        <h1 className="font-heading mb-4 text-foreground">
          Is Your Business Ready for{' '}
          <span className="text-gradient-cyan">AI Automation</span>?
        </h1>

        {/* Subheadline */}
        <p className="mb-10 text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover automation opportunities or get a custom implementation roadmap for your process.
        </p>

        {/* Resume progress notice */}
        {hasSavedProgress && onResume && (
          <div className="mb-8">
            <button
              onClick={onResume}
              className="badge-success inline-flex items-center gap-2 px-4 py-2 rounded-full border border-success/20 hover:bg-success/20 transition-all duration-normal"
            >
              <Clock className="h-4 w-4" />
              Continue where you left off
            </button>
          </div>
        )}

        {/* Choose Your Path heading */}
        <h6 className="font-heading mb-6 text-foreground">
          Choose Your Path
        </h6>

        {/* Two-path cards - SEPARATE with gap */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 max-w-4xl mx-auto">
          {/* Card 1: Quick Assessment */}
          <div
            onClick={onStart}
            className="glass-card text-left cursor-pointer flex flex-col h-full group"
          >
            <div className="flex-1">
              {/* Small label */}
              <p className="text-sm text-muted-foreground mb-3">Assessment</p>

              {/* Title */}
              <h3 className="font-heading text-2xl text-foreground mb-3">
                Quick Assessment
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-6">
                Take our 3-minute quiz to discover automation opportunities in Sales, Marketing, and Operations.
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="feature-pill">
                  <BarChart3 className="h-3.5 w-3.5" />
                  15 Questions
                </span>
                <span className="feature-pill">
                  <Zap className="h-3.5 w-3.5" />
                  Instant
                </span>
                <span className="feature-pill">
                  <Check className="h-3.5 w-3.5" />
                  Free
                </span>
              </div>
            </div>

            {/* Button */}
            <div className="mt-auto">
              <button className="btn-primary w-full flex items-center justify-center gap-2">
                Start Assessment
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Implementation Guide */}
          <div
            onClick={() => navigate('/implementation-guide')}
            className="glass-card text-left cursor-pointer flex flex-col h-full group"
          >
            <div className="flex-1">
              {/* Small label */}
              <p className="text-sm text-muted-foreground mb-3">Roadmap</p>

              {/* Title */}
              <h3 className="font-heading text-2xl text-foreground mb-3">
                Implementation Guide
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-6">
                Describe your business process and receive a detailed AI automation implementation plan.
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="feature-pill">
                  <Sparkles className="h-3.5 w-3.5" />
                  AI Analysis
                </span>
                <span className="feature-pill">
                  <FileText className="h-3.5 w-3.5" />
                  Roadmap
                </span>
                <span className="feature-pill">
                  <TrendingUp className="h-3.5 w-3.5" />
                  ROI
                </span>
              </div>
            </div>

            {/* Button */}
            <div className="mt-auto">
              <button className="btn-primary w-full flex items-center justify-center gap-2">
                Get Your Guide
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Trust badges - feature-pill style */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="feature-pill text-xs">
            <Lock className="h-3 w-3" />
            No signup
          </span>
          <span className="feature-pill text-xs">
            <Check className="h-3 w-3" />
            Free
          </span>
          <span className="feature-pill text-xs">
            <Zap className="h-3 w-3" />
            Instant
          </span>
        </div>
      </div>
    </div>
  );
}
