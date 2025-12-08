import { ArrowRight, Check } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
  onResume?: () => void;
  hasSavedProgress: boolean;
}

export function Landing({ onStart, onResume, hasSavedProgress }: LandingProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-radial" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      
      {/* Floating glow orbs */}
      <div className="animate-glow-pulse pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="animate-glow-pulse pointer-events-none absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" style={{ animationDelay: '1.5s' }} />

      <div className="animate-fade-in relative z-10 max-w-3xl text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
          <span className="animate-pulse h-2 w-2 rounded-full bg-primary" />
          Free Assessment • 3 Minutes
        </div>

        {/* Main headline */}
        <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
          Is Your Business Ready for{' '}
          <span className="text-gradient">AI Automation</span>?
        </h1>

        {/* Subheadline */}
        <p className="mb-10 text-lg text-muted-foreground md:text-xl">
          Discover bottlenecks in your Sales, Marketing, and Operations.
          <br className="hidden md:block" />
          Get a personalized efficiency score and actionable recommendations.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col items-center gap-4">
          <button onClick={onStart} className="btn-primary group text-lg">
            Start Your Assessment
            <ArrowRight className="ml-2 inline-block h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>

          {hasSavedProgress && onResume && (
            <button
              onClick={onResume}
              className="text-primary hover:text-primary/80 transition-colors underline underline-offset-4"
            >
              Continue where you left off
            </button>
          )}
        </div>

        {/* Trust elements */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-success" />
            No signup required
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-success" />
            Instant results
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-success" />
            Personalized recommendations
          </div>
        </div>
      </div>
    </div>
  );
}
