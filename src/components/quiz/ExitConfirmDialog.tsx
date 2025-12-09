import { X } from 'lucide-react';

interface ExitConfirmDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ExitConfirmDialog({ isOpen, onConfirm, onCancel }: ExitConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="animate-scale-in glass-card relative w-full max-w-sm p-6 text-center">
        <button
          onClick={onCancel}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          <X className="h-5 w-5" />
        </button>

        <h3 className="mb-2 text-xl font-bold text-foreground">
          Exit assessment?
        </h3>
        <p className="mb-6 text-muted-foreground">
          Your progress will be saved and you can resume later.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={onCancel}
            className="px-6 py-2.5 rounded-xl border border-border text-foreground hover:bg-secondary transition-all duration-300"
          >
            Continue Quiz
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 rounded-xl bg-muted text-muted-foreground hover:bg-muted/80 transition-all duration-300"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
