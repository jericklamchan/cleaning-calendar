interface FormActionsProps {
  onCancel: () => void;
  isSubmitting: boolean;
  submitLabel?: string;
}

export function FormActions({
  onCancel,
  isSubmitting,
  submitLabel = 'Save Changes',
}: FormActionsProps) {
  return (
    <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
      <button
        type="button"
        onClick={onCancel}
        className="px-3 py-1.5 rounded-lg text-xs text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium disabled:opacity-50 transition-colors cursor-pointer shadow-xs"
      >
        {isSubmitting ? 'Saving...' : submitLabel}
      </button>
    </div>
  );
}