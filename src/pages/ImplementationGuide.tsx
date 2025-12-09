import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Rocket, Lock, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const WEBHOOK_URL = 'https://n8n.isendora.com/webhook/9d16138a-8cb6-49c8-8ed9-d3cbc6d253a1';

export function ImplementationGuide() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    businessProcess: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }
    if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (formData.businessProcess.trim().length < 100) {
      newErrors.businessProcess = `Please provide more detail (${formData.businessProcess.length}/100 minimum characters)`;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      requestType: 'ImplementationGuide',
      timestamp: new Date().toISOString(),
      lead: {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim()
      },
      businessProcess: formData.businessProcess.trim()
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setIsSuccess(true);
      toast.success('Request received! Check your inbox in 10 minutes.');
    } catch (error) {
      console.error('Failed to submit:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center animate-fade-in">
          <div className="mb-6 inline-flex items-center justify-center rounded-full bg-success/20 p-4">
            <CheckCircle2 className="h-12 w-12 text-success" />
          </div>
          
          <h1 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
            Request Received!
          </h1>
          
          <p className="mb-6 text-muted-foreground">
            We're analyzing your business process and creating your custom implementation guide.
          </p>
          
          <div className="glass-card p-6 mb-8">
            <p className="text-sm text-muted-foreground mb-4">
              📧 Check your inbox within 10 minutes for your personalized AI automation roadmap.
            </p>
          </div>

          <div className="glass-card p-6 mb-6">
            <p className="text-sm text-muted-foreground mb-4">
              While you wait, why not discover more automation opportunities?
            </p>
            <button
              onClick={() => navigate('/')}
              className="btn-primary w-full"
            >
              Take the Quick Assessment →
            </button>
          </div>

          <button
            onClick={() => navigate('/')}
            className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-radial" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
      <div className="animate-glow-pulse pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl animate-fade-in">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-accent/20 p-3">
              <Rocket className="h-8 w-8 text-accent" />
            </div>
            <h1 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
              Get Your AI Implementation Guide
            </h1>
            <p className="text-muted-foreground">
              Describe your business challenge and we'll create a custom automation roadmap just for you.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-5">
            {/* Name row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="input-field"
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="text-sm text-destructive mt-1">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="input-field"
                  placeholder="Smith"
                />
                {errors.lastName && (
                  <p className="text-sm text-destructive mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Work Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="input-field"
                placeholder="john@company.com"
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email}</p>
              )}
            </div>

            {/* Business Process */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Describe Your Business Process or Challenge
              </label>
              <textarea
                value={formData.businessProcess}
                onChange={(e) => setFormData(prev => ({ ...prev, businessProcess: e.target.value }))}
                className="input-field min-h-[160px] resize-none"
                placeholder="Example: Every day, our sales team spends 2-3 hours manually entering leads from our website forms into HubSpot. They have to copy contact info, company details, and inquiry type, then assign to the right rep based on territory. We also send a welcome email manually. This process is error-prone and slow..."
              />
              <div className="flex justify-between items-center mt-1">
                {errors.businessProcess ? (
                  <p className="text-sm text-destructive">{errors.businessProcess}</p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {formData.businessProcess.length} / 100 minimum characters
                  </p>
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </span>
              ) : (
                <>
                  ✨ Get Your Free Implementation Guide →
                </>
              )}
            </button>

            {/* Privacy */}
            <p className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
              <Lock className="h-4 w-4" />
              Your information is secure and confidential
            </p>
          </form>

          {/* Back link */}
          <div className="text-center mt-6">
            <button
              onClick={() => navigate('/')}
              className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
