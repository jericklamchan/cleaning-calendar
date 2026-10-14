'use client';

import { useState } from 'react';
import { User } from '@/types/user';
import { addUserAction, updateUserAction, deleteUserAction } from '@/app/actions/userActions';
import { Plus, Edit2, Trash2, CheckCircle2, XCircle, Shield } from 'lucide-react';

interface Props {
  initialUsers: User[];
}

export default function UsersTable({ initialUsers }: Props) {
  const [users] = useState<User[]>(initialUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    await addUserAction(formData);
    setIsSubmitting(false);
    setIsAdding(false);
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingUser) return;
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    await updateUserAction(editingUser.id, formData);
    setIsSubmitting(false);
    setEditingUser(null);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to revoke access for ${name}?`)) {
      await deleteUserAction(id);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">User Access Control</h2>
          <p className="text-xs text-gray-500">Manage administrative accounts, team permissions, and user roles.</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add User</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="border border-gray-200/80 rounded-xl bg-white overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50/70 border-b border-gray-200/80 text-gray-600 font-medium">
            <tr>
              <th className="py-2.5 px-4">Name</th>
              <th className="py-2.5 px-4">Email</th>
              <th className="py-2.5 px-4">Role</th>
              <th className="py-2.5 px-4">Last Login</th>
              <th className="py-2.5 px-4 text-center">Status</th>
              <th className="py-2.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-800">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-3 px-4 font-medium text-gray-900">{user.name}</td>
                <td className="py-3 px-4 text-gray-600">{user.email}</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1 font-medium text-gray-700">
                    <Shield className="w-3 h-3 text-blue-500" /> {user.role}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-500">{user.lastLogin || 'Never'}</td>
                <td className="py-3 px-4 text-center">
                  {user.active ? (
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
                      onClick={() => setEditingUser(user)}
                      className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                      title="Edit User"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id, user.name)}
                      className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                      title="Delete User"
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
      {(isAdding || editingUser) && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl border border-gray-200 shadow-xl max-w-md w-full p-5 space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">
              {isAdding ? 'Add New User' : `Edit Access for ${editingUser?.name}`}
            </h3>

            <form
              onSubmit={isAdding ? handleAddSubmit : handleEditSubmit}
              className="space-y-3"
            >
              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  defaultValue={editingUser?.name || ''}
                  className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  defaultValue={editingUser?.email || ''}
                  className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-800 mb-1">Access Role</label>
                  <select
                    name="role"
                    defaultValue={editingUser?.role || 'Viewer'}
                    className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none bg-white"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Operations Manager">Operations Manager</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-800 mb-1">Status</label>
                  <select
                    name="active"
                    defaultValue={editingUser ? String(editingUser.active) : 'true'}
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
                    setEditingUser(null);
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
                  {isSubmitting ? 'Saving...' : 'Save User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}