import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

interface EmailCaptureCardProps {
  onSubmit: (data: { name: string; email: string }) => void;
}

export function EmailCaptureCard({ onSubmit }: EmailCaptureCardProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email });
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="glass-card p-6 text-center">
        <div className="inline-flex items-center justify-center rounded-full bg-success/20 p-3 mb-4">
          <CheckCircle className="h-6 w-6 text-success" />
        </div>
        <p className="text-foreground font-medium">
          Sent! You'll receive your detailed results within 5 minutes.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center rounded-full bg-primary/20 p-2">
          <Mail className="h-5 w-5 text-primary" />
        </div>
        <h6 className="font-heading text-foreground">
          Get Your Full Results by Email
        </h6>
      </div>

      <p className="mb-6 text-muted-foreground">
        We'll send you this assessment with a detailed breakdown and personalized action plan.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input-field"
          placeholder="Your Name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-field"
          placeholder="Email Address"
        />
        <button type="submit" className="btn-primary w-full">
          Send to My Email →
        </button>
      </form>
    </div>
  );
}
