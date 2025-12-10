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
        className="absolute inset-0 bg-background/95 backdrop-blur-md"
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

        <h5 className="font-heading mb-2 text-foreground">
          Exit assessment?
        </h5>
        <p className="mb-6 text-muted-foreground">
          Your progress will be saved and you can resume later.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={onCancel}
            className="btn-primary"
          >
            Continue Quiz
          </button>
          <button
            onClick={onConfirm}
            className="btn-ghost"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
