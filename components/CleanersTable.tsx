'use client';

import { useState } from 'react';
import { Cleaner } from '@/types/cleaner';
import { addCleanerAction, updateCleanerAction, deleteCleanerAction } from '@/app/actions/cleanerActions';
import { Plus, Edit2, Trash2, Phone, Mail } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { FormActions } from '@/components/ui/FormActions';
import { TableContainer, THead, TBody } from '@/components/ui/Table';

interface Props {
  initialCleaners: Cleaner[];
}

export default function CleanersTable({ initialCleaners }: Props) {
  const [cleaners] = useState<Cleaner[]>(initialCleaners);
  const [editingCleaner, setEditingCleaner] = useState<Cleaner | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    await addCleanerAction(formData);
    setIsSubmitting(false);
    setIsAdding(false);
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingCleaner) return;
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    await updateCleanerAction(editingCleaner.id, formData);
    setIsSubmitting(false);
    setEditingCleaner(null);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove cleaner ${name}?`)) {
      await deleteCleanerAction(id);
    }
  };

  const closeModal = () => {
    setIsAdding(false);
    setEditingCleaner(null);
  };

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">Cleaner Directory</h2>
          <p className="text-xs text-gray-500">Manage turn team contacts, statuses, and operational notes.</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Cleaner</span>
        </button>
      </div>

      {/* Cleaners Table Container */}
      <TableContainer>
        <THead>
          <tr>
            <th className="py-2.5 px-4">Name</th>
            <th className="py-2.5 px-4">Contact Info</th>
            <th className="py-2.5 px-4">Notes</th>
            <th className="py-2.5 px-4 text-center">Status</th>
            <th className="py-2.5 px-4 text-right">Actions</th>
          </tr>
        </THead>
        <TBody>
          {cleaners.map((cleaner) => (
            <tr key={cleaner.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="py-3 px-4 font-medium text-gray-900">{cleaner.name}</td>
              <td className="py-3 px-4 text-gray-600 space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-gray-400" />
                  <span>{cleaner.phone || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-gray-400" />
                  <span>{cleaner.email || 'N/A'}</span>
                </div>
              </td>
              <td className="py-3 px-4 text-gray-500 max-w-xs truncate">{cleaner.notes || '—'}</td>
              <td className="py-3 px-4 text-center">
                <StatusBadge active={cleaner.active} />
              </td>
              <td className="py-3 px-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => setEditingCleaner(cleaner)}
                    className="p-1 text-gray-500 hover:text-blue-600 transition-colors cursor-pointer"
                    title="Edit Cleaner"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(cleaner.id, cleaner.name)}
                    className="p-1 text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
                    title="Delete Cleaner"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </TBody>
      </TableContainer>

      {/* Shared Modal Dialog */}
      <Modal
        isOpen={isAdding || !!editingCleaner}
        onClose={closeModal}
        title={isAdding ? 'Add New Cleaner' : `Edit ${editingCleaner?.name}`}
      >
        <form onSubmit={isAdding ? handleAddSubmit : handleEditSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-800 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              required
              defaultValue={editingCleaner?.name || ''}
              className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                defaultValue={editingCleaner?.phone || ''}
                className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-1">Status</label>
              <select
                name="active"
                defaultValue={editingCleaner ? String(editingCleaner.active) : 'true'}
                className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none bg-white"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-800 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              defaultValue={editingCleaner?.email || ''}
              className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-800 mb-1">Notes / Special Instructions</label>
            <textarea
              name="notes"
              rows={2}
              defaultValue={editingCleaner?.notes || ''}
              className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none resize-none"
            />
          </div>

          <FormActions onCancel={closeModal} isSubmitting={isSubmitting} submitLabel="Save Cleaner" />
        </form>
      </Modal>
    </div>
  );
}