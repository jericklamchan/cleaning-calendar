'use client';

import { useState } from 'react';
import { Property } from '@/types/property';
import { addPropertyAction, updatePropertyAction, deletePropertyAction } from '@/app/actions/propertyActions';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { FormActions } from '@/components/ui/FormActions';
import { TableContainer, THead, TBody } from '@/components/ui/Table';

interface Props {
  initialProperties: Property[];
}

export default function PropertiesTable({ initialProperties }: Props) {
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    await addPropertyAction(formData);
    setIsSubmitting(false);
    setIsAdding(false);
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingProperty) return;
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    await updatePropertyAction(editingProperty.id, formData);
    setIsSubmitting(false);
    setEditingProperty(null);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete listing "${name}"?`)) {
      await deletePropertyAction(id);
    }
  };

  const closeModal = () => {
    setIsAdding(false);
    setEditingProperty(null);
  };

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">Property Directory</h2>
          <p className="text-xs text-gray-500">Configure short-term rental listings, regional locations, and default payouts.</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Property</span>
        </button>
      </div>

      {/* Properties Table Container or Empty State */}
      {initialProperties.length === 0 ? (
        <div className="border border-gray-200/85 rounded-xl bg-white py-12 text-center text-xs text-gray-500 shadow-xs">
          No properties found. Click &quot;Add Property&quot; to get started.
        </div>
      ) : (
        <TableContainer>
          <THead>
            <tr>
              <th className="py-2.5 px-4">Property Name</th>
              <th className="py-2.5 px-4">Code</th>
              <th className="py-2.5 px-4">City / Market</th>
              <th className="py-2.5 px-4 text-center">Bedrooms</th>
              <th className="py-2.5 px-4 text-right">Default Payout</th>
              <th className="py-2.5 px-4 text-center">Status</th>
              <th className="py-2.5 px-4 text-right">Actions</th>
            </tr>
          </THead>
          <TBody>
            {initialProperties.map((property) => (
              <tr key={property.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-3 px-4 font-medium text-gray-900">{property.name}</td>
                <td className="py-3 px-4 text-gray-500 font-mono text-[11px]">{property.code || '—'}</td>
                <td className="py-3 px-4 text-gray-600">{property.city}</td>
                <td className="py-3 px-4 text-center">{property.bedrooms} BR</td>
                <td className="py-3 px-4 text-right font-medium">${property.defaultPayout}</td>
                <td className="py-3 px-4 text-center">
                  <StatusBadge active={property.active} />
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setEditingProperty(property)}
                      className="p-1 text-gray-500 hover:text-blue-600 transition-colors cursor-pointer"
                      title="Edit Property"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(property.id, property.name)}
                      className="p-1 text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
                      title="Delete Property"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </TBody>
        </TableContainer>
      )}

      {/* Shared Modal Dialog */}
      <Modal
        isOpen={isAdding || !!editingProperty}
        onClose={closeModal}
        title={isAdding ? 'Add New Property' : `Edit ${editingProperty?.name}`}
      >
        <form onSubmit={isAdding ? handleAddSubmit : handleEditSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-800 mb-1">Property Name</label>
            <input
              type="text"
              name="name"
              required
              defaultValue={editingProperty?.name || ''}
              className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-1">Internal Code</label>
              <input
                type="text"
                name="code"
                defaultValue={editingProperty?.code || ''}
                placeholder="e.g. DT-409"
                className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-1">City / Market</label>
              <input
                type="text"
                name="city"
                required
                defaultValue={editingProperty?.city || ''}
                placeholder="e.g. Los Angeles"
                className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-1">Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                min="1"
                max="10"
                required
                defaultValue={editingProperty?.bedrooms || 1}
                className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-1">Payout ($)</label>
              <input
                type="number"
                name="defaultPayout"
                min="0"
                step="5"
                required
                defaultValue={editingProperty?.defaultPayout || 150}
                className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-1">Status</label>
              <select
                name="active"
                defaultValue={editingProperty ? String(editingProperty.active) : 'true'}
                className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none bg-white"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>

          <FormActions onCancel={closeModal} isSubmitting={isSubmitting} submitLabel="Save Property" />
        </form>
      </Modal>
    </div>
  );
}