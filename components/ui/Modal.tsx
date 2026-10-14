'use client';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-xl max-w-md w-full p-5 space-y-4">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        {children}
      </div>
    </div>
  );
}