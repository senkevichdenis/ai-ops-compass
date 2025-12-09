import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, BarChart3, Rocket, Lock, Zap, Clock } from 'lucide-react';
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
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-radial" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />

      {/* Floating glow orbs */}
      <div className="animate-glow-pulse pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="animate-glow-pulse pointer-events-none absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" style={{ animationDelay: '1.5s' }} />

      <div
        className={cn(
          "relative z-10 max-w-4xl w-full text-center transition-opacity duration-400 ease-out",
          isVisible ? 'opacity-100' : 'opacity-0'
        )}
        style={{ willChange: 'opacity' }}
      >
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
          <span className="animate-pulse h-2 w-2 rounded-full bg-primary" />
          AI Ops Compass
        </div>

        {/* Main headline */}
        <h1 className="mb-4 text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
          Is Your Business Ready for{' '}
          <span className="text-gradient">AI Automation</span>?
        </h1>

        {/* Subheadline */}
        <p className="mb-10 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
          Discover automation opportunities or get a custom implementation roadmap for your process.
        </p>

        {/* Resume progress notice */}
        {hasSavedProgress && onResume && (
          <div className="mb-8">
            <button
              onClick={onResume}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-success/10 border border-success/20 text-success hover:bg-success/20 transition-colors duration-350"
            >
              <Clock className="h-4 w-4" />
              Continue where you left off
            </button>
          </div>
        )}

        {/* Choose Your Path heading */}
        <h2 className="mb-6 text-xl font-semibold text-foreground">
          Choose Your Path
        </h2>

        {/* Two-path cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Card 1: Quick Assessment */}
          <div
            onClick={onStart}
            className="glass-card p-8 text-left cursor-pointer hover:border-white/20 transition-all duration-350 group flex flex-col h-full"
          >
            {/* Content area - flex-1 to push button to bottom */}
            <div className="flex-1">
              <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-primary/20 p-3">
                <BarChart3 className="h-7 w-7 text-primary" />
              </div>

              <h3 className="text-xl font-bold text-foreground mb-1">Quick Assessment</h3>
              <p className="text-sm text-primary mb-4">Find Your Automation Opportunities</p>

              <p className="text-muted-foreground text-sm mb-5">
                Not sure where to start? Take our 3-minute quiz to discover bottlenecks in your Sales, Marketing, and Operations.
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-success" />
                  15 quick questions
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-success" />
                  Instant results
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-success" />
                  Personalized recommendations
                </div>
              </div>
            </div>

            {/* Button area - always at bottom */}
            <div className="mt-auto pt-2">
              <button className="btn-primary w-full flex items-center justify-center gap-2">
                Start Assessment
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>

              <p className="text-center text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1">
                <Clock className="h-3 w-3" />
                Takes 3 minutes
              </p>
            </div>
          </div>

          {/* Card 2: Implementation Guide */}
          <div
            onClick={() => navigate('/implementation-guide')}
            className="glass-card p-8 text-left cursor-pointer hover:border-white/20 transition-all duration-350 group flex flex-col h-full"
          >
            {/* Content area - flex-1 to push button to bottom */}
            <div className="flex-1">
              <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-accent/20 p-3">
                <Rocket className="h-7 w-7 text-accent" />
              </div>

              <h3 className="text-xl font-bold text-foreground mb-1">Implementation Guide</h3>
              <p className="text-sm text-accent mb-4">Get a Custom AI Roadmap</p>

              <p className="text-muted-foreground text-sm mb-5">
                Already know your challenge? Describe your business process and receive a detailed automation implementation plan.
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-success" />
                  Custom AI analysis
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-success" />
                  Step-by-step roadmap
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-success" />
                  ROI estimation
                </div>
              </div>
            </div>

            {/* Button area - always at bottom */}
            <div className="mt-auto pt-2">
              <button className="w-full bg-accent text-accent-foreground font-semibold px-8 py-4 rounded-xl transition-all duration-350 flex items-center justify-center gap-2">
                Get Your Guide
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>

              <p className="text-center text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1">
                <Zap className="h-3 w-3" />
                Delivered in 10 minutes
              </p>
            </div>
          </div>
        </div>

        {/* Trust elements */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-success" />
            No signup required
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-success" />
            100% Free
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-success" />
            Actionable insights
          </div>
        </div>
      </div>
    </div>
  );
}
