import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, BarChart3, Lock, Zap, Clock, Sparkles, FileText, TrendingUp } from 'lucide-react';
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
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />

      {/* Cyan glow at top */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(32, 211, 238, 0.06) 0%, transparent 60%)',
        }}
      />

      <div
        className={cn(
          "relative z-10 max-w-4xl w-full text-center transition-opacity duration-400 ease-out",
          isVisible ? 'opacity-100' : 'opacity-0'
        )}
        style={{ willChange: 'opacity' }}
      >
        {/* Badge - pill style with orange glow */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-normal mb-6"
          style={{
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(253, 186, 114, 0.8)',
            boxShadow: '0 0 25px rgba(253, 186, 114, 0.25)',
            color: 'rgba(255, 255, 255, 0.85)'
          }}
        >
          <span>AI Ops Compass</span>
        </div>

        {/* Main headline - with cyan gradient */}
        <h1 className="font-heading mb-4 text-foreground">
          Is Your Business Ready for{' '}
          <span className="text-gradient-cyan">AI Automation</span>?
        </h1>

        {/* Subheadline - match card title style */}
        <p className="mb-10 text-xl font-normal text-foreground/90 max-w-2xl mx-auto" style={{ letterSpacing: '0.01em' }}>
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

        {/* Choose Your Path - whiter */}
        <p className="text-sm font-normal text-foreground/80 mb-6 uppercase" style={{ letterSpacing: '0.01em' }}>
          Choose Your Path
        </p>

        {/* Two-path cards - SEPARATE with gap */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 max-w-4xl mx-auto">
          {/* Card 1: Quick Assessment */}
          <div
            onClick={onStart}
            className="glass-card text-left cursor-pointer flex flex-col h-full"
          >
            <div className="flex-1">
              {/* Small label - ORANGE */}
              <p className="text-xs font-normal mb-2" style={{ color: '#fdba72', letterSpacing: '0.01em' }}>Assessment</p>

              {/* Title - white, size +1 */}
              <h3 className="font-heading text-[21px] font-normal text-foreground mb-3" style={{ letterSpacing: '0.01em' }}>
                Quick Assessment
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-6">
                Take our 3-minute quiz to discover automation opportunities in Sales, Marketing, and Operations.
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="feature-pill">
                  <BarChart3 className="h-3 w-3" />
                  15 Questions
                </span>
                <span className="feature-pill">
                  <Zap className="h-3 w-3" />
                  Instant
                </span>
                <span className="feature-pill">
                  <Check className="h-3 w-3" />
                  Free
                </span>
              </div>
            </div>

            {/* Button */}
            <div className="mt-auto">
              <button className="btn-primary w-full flex items-center justify-center">
                Start Assessment
              </button>
            </div>
          </div>

          {/* Card 2: Implementation Guide */}
          <div
            onClick={() => navigate('/implementation-guide')}
            className="glass-card text-left cursor-pointer flex flex-col h-full"
          >
            <div className="flex-1">
              {/* Small label - ORANGE */}
              <p className="text-xs font-normal mb-2" style={{ color: '#fdba72', letterSpacing: '0.01em' }}>Roadmap</p>

              {/* Title - WHITE */}
              <h3 className="font-heading text-[21px] font-normal text-foreground mb-3" style={{ letterSpacing: '0.01em' }}>
                Implementation Guide
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-6">
                Describe your business process and receive a detailed AI automation implementation plan.
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="feature-pill">
                  <Sparkles className="h-3 w-3" />
                  AI Analysis
                </span>
                <span className="feature-pill">
                  <FileText className="h-3 w-3" />
                  Roadmap
                </span>
                <span className="feature-pill">
                  <TrendingUp className="h-3 w-3" />
                  ROI
                </span>
              </div>
            </div>

            {/* Button */}
            <div className="mt-auto">
              <button className="btn-primary w-full flex items-center justify-center">
                Get Your Guide
              </button>
            </div>
          </div>
        </div>

        {/* Trust badges - soft green pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-normal"
            style={{
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.25)',
              color: 'rgba(34, 197, 94, 0.9)'
            }}
          >
            <Lock className="h-3 w-3" />
            No signup
          </span>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-normal"
            style={{
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.25)',
              color: 'rgba(34, 197, 94, 0.9)'
            }}
          >
            <Check className="h-3 w-3" />
            Free
          </span>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-normal"
            style={{
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.25)',
              color: 'rgba(34, 197, 94, 0.9)'
            }}
          >
            <Zap className="h-3 w-3" />
            Instant
          </span>
        </div>
      </div>
    </div>
  );
}
