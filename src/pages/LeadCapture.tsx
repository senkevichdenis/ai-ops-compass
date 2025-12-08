import { useState } from 'react';
import { Target } from 'lucide-react';

interface LeadCaptureProps {
  onSubmit: (data: { name: string; email: string }) => void;
  onSkip: () => void;
}

export function LeadCapture({ onSubmit, onSkip }: LeadCaptureProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email });
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12 bg-gradient-radial">
      <div className="animate-fade-in glass-card w-full max-w-md p-8 text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
          <Target className="h-8 w-8 text-primary" />
        </div>

        {/* Headline */}
        <h1 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
          Your Results Are Ready!
        </h1>

        {/* Subtext */}
        <p className="mb-8 text-muted-foreground">
          Enter your details to get your personalized efficiency score and recommendations.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input-field"
              placeholder="Your Name"
            />
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
              placeholder="Email Address"
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Get My Results →
          </button>
        </form>

        {/* Skip link */}
        <button
          onClick={onSkip}
          className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
        >
          Skip for now
        </button>

        {/* Privacy note */}
        <p className="mt-6 text-xs text-muted-foreground">
          We'll send your results. No spam, ever.
        </p>
      </div>
    </div>
  );
}
