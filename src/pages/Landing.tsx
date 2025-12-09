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

      {/* Floating glow orbs - subtle */}
      <div className="animate-glow-pulse pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="animate-glow-pulse pointer-events-none absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl" style={{ animationDelay: '1.5s' }} />

      <div
        className={cn(
          "relative z-10 max-w-4xl w-full text-center transition-opacity duration-400 ease-out",
          isVisible ? 'opacity-100' : 'opacity-0'
        )}
        style={{ willChange: 'opacity' }}
      >
        {/* Badge - ultra subtle */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
          <span className="text-sm text-muted-foreground/80">AI Ops Compass</span>
        </div>

        {/* Main headline */}
        <h1 className="mb-4 text-3xl font-semibold leading-tight text-foreground md:text-4xl lg:text-5xl">
          Is Your Business Ready for{' '}
          <em className="italic text-foreground">AI Automation</em>?
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
        <h2 className="mb-6 text-lg font-medium text-foreground tracking-wide">
          Choose Your Path
        </h2>

        {/* Two-path cards - wrapped in dashed border container */}
        <div className="rounded-2xl border border-dashed border-white/10 p-1 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Card 1: Quick Assessment */}
            <div
              onClick={onStart}
              className="p-8 text-left cursor-pointer hover:bg-white/[0.02] transition-all duration-350 group flex flex-col h-full md:border-r md:border-dashed md:border-white/10"
            >
              {/* Content area - flex-1 to push button to bottom */}
              <div className="flex-1">
                {/* Pill badge with icon */}
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-card border border-white/10 px-3 py-1.5">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20">
                    <BarChart3 className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Assessment</span>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-2">Quick Assessment</h3>
                <p className="text-sm text-primary/80 mb-4">Find Your Automation Opportunities</p>

                <p className="text-muted-foreground text-sm mb-5">
                  Not sure where to start? Take our 3-minute quiz to discover bottlenecks in your Sales, Marketing, and Operations.
                </p>

                <div className="space-y-2.5 mb-6">
                  <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-success/20">
                      <Check className="h-3 w-3 text-success" strokeWidth={3} />
                    </div>
                    15 quick questions
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-success/20">
                      <Check className="h-3 w-3 text-success" strokeWidth={3} />
                    </div>
                    Instant results
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-success/20">
                      <Check className="h-3 w-3 text-success" strokeWidth={3} />
                    </div>
                    Personalized recommendations
                  </div>
                </div>
              </div>

              {/* Button area - always at bottom */}
              <div className="mt-auto pt-2">
                <button className="btn-primary w-full flex items-center justify-center gap-2 px-6 py-3">
                  Start Assessment
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
              className="p-8 text-left cursor-pointer hover:bg-white/[0.02] transition-all duration-350 group flex flex-col h-full border-t md:border-t-0 border-dashed border-white/10"
            >
              {/* Content area - flex-1 to push button to bottom */}
              <div className="flex-1">
                {/* Pill badge with icon */}
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-card border border-white/10 px-3 py-1.5">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-accent/20">
                    <Rocket className="h-3 w-3 text-accent" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Roadmap</span>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-2">Implementation Guide</h3>
                <p className="text-sm text-accent/80 mb-4">Get a Custom AI Roadmap</p>

                <p className="text-muted-foreground text-sm mb-5">
                  Already know your challenge? Describe your business process and receive a detailed automation implementation plan.
                </p>

                <div className="space-y-2.5 mb-6">
                  <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-success/20">
                      <Check className="h-3 w-3 text-success" strokeWidth={3} />
                    </div>
                    Custom AI analysis
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-success/20">
                      <Check className="h-3 w-3 text-success" strokeWidth={3} />
                    </div>
                    Step-by-step roadmap
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-success/20">
                      <Check className="h-3 w-3 text-success" strokeWidth={3} />
                    </div>
                    ROI estimation
                  </div>
                </div>
              </div>

              {/* Button area - always at bottom */}
              <div className="mt-auto pt-2">
                <button className="w-full bg-accent text-accent-foreground font-semibold px-6 py-3 rounded-xl transition-all duration-350 flex items-center justify-center gap-2 hover:bg-accent/90">
                  Get Your Guide
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>

                <p className="text-center text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1">
                  <Zap className="h-3 w-3" />
                  Delivered in 10 minutes
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust elements - pill style */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-card/50 px-4 py-2 text-muted-foreground">
            <Lock className="h-4 w-4" />
            No signup required
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-card/50 px-4 py-2 text-muted-foreground">
            <Check className="h-4 w-4" />
            100% Free
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-card/50 px-4 py-2 text-muted-foreground">
            <Check className="h-4 w-4" />
            Actionable insights
          </div>
        </div>
      </div>
    </div>
  );
}
