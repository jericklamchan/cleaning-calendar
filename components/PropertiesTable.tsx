'use client';

import { useState } from 'react';
import { Property } from '@/types/property';
import { addPropertyAction, updatePropertyAction, deletePropertyAction } from '@/app/actions/propertyActions';
import { Plus, Edit2, Trash2, CheckCircle2, XCircle } from 'lucide-react';

interface Props {
  initialProperties: Property[];
}

export default function PropertiesTable({ initialProperties }: Props) {
  const [properties] = useState<Property[]>(initialProperties);
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

      {/* Properties Table */}
      <div className="border border-gray-200/80 rounded-xl bg-white overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50/70 border-b border-gray-200/80 text-gray-600 font-medium">
            <tr>
              <th className="py-2.5 px-4">Property Name</th>
              <th className="py-2.5 px-4">Code</th>
              <th className="py-2.5 px-4">City / Market</th>
              <th className="py-2.5 px-4 text-center">Bedrooms</th>
              <th className="py-2.5 px-4 text-right">Default Payout</th>
              <th className="py-2.5 px-4 text-center">Status</th>
              <th className="py-2.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-800">
            {properties.map((property) => (
              <tr key={property.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-3 px-4 font-medium text-gray-900">{property.name}</td>
                <td className="py-3 px-4 text-gray-500 font-mono text-[11px]">{property.code || '—'}</td>
                <td className="py-3 px-4 text-gray-600">{property.city}</td>
                <td className="py-3 px-4 text-center">{property.bedrooms} BR</td>
                <td className="py-3 px-4 text-right font-medium">${property.defaultPayout}</td>
                <td className="py-3 px-4 text-center">
                  {property.active ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600 border border-gray-200">
                      <XCircle className="w-3 h-3 text-gray-400" /> Inactive
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setEditingProperty(property)}
                      className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                      title="Edit Property"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(property.id, property.name)}
                      className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                      title="Delete Property"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Dialog */}
      {(isAdding || editingProperty) && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl border border-gray-200 shadow-xl max-w-md w-full p-5 space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">
              {isAdding ? 'Add New Property' : `Edit ${editingProperty?.name}`}
            </h3>

            <form
              onSubmit={isAdding ? handleAddSubmit : handleEditSubmit}
              className="space-y-3"
            >
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

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsAdding(false);
                    setEditingProperty(null);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Save Property'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}