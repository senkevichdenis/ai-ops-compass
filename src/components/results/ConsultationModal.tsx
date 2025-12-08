import { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string; company?: string; challenge?: string }) => void;
  prefillName?: string;
  prefillEmail?: string;
}

export function ConsultationModal({
  isOpen,
  onClose,
  onSubmit,
  prefillName = '',
  prefillEmail = '',
}: ConsultationModalProps) {
  const [name, setName] = useState(prefillName);
  const [email, setEmail] = useState(prefillEmail);
  const [company, setCompany] = useState('');
  const [challenge, setChallenge] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, company, challenge });
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="animate-scale-in glass-card relative w-full max-w-md p-6 md:p-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {isSubmitted ? (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="mb-4 rounded-full bg-success/20 p-3">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Thanks!</h3>
            <p className="text-muted-foreground">We'll be in touch soon.</p>
          </div>
        ) : (
          <>
            <h2 className="mb-2 text-xl font-bold text-foreground md:text-2xl">
              Get Your Personalized Automation Roadmap
            </h2>
            <p className="mb-6 text-muted-foreground">
              Our team will analyze your results and create a custom action plan for your business.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="input-field"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Work Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Company Name <span className="text-muted-foreground">(optional)</span>
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="input-field"
                  placeholder="Acme Corp"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Biggest automation challenge? <span className="text-muted-foreground">(optional)</span>
                </label>
                <textarea
                  value={challenge}
                  onChange={(e) => setChallenge(e.target.value)}
                  className="input-field min-h-[80px] resize-none"
                  placeholder="We spend too much time on..."
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Request Consultation
              </button>

              <p className="text-center text-xs text-muted-foreground">
                We'll reach out within 24 hours.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
