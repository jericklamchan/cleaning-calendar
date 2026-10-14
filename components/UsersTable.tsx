'use client';

import { useState } from 'react';
import { User } from '@/types/user';
import { addUserAction, updateUserAction, deleteUserAction } from '@/app/actions/userActions';
import { Plus, Edit2, Trash2, Shield, Mail } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { FormActions } from '@/components/ui/FormActions';
import { TableContainer, THead, TBody } from '@/components/ui/Table';

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
    if (confirm(`Are you sure you want to remove user ${name}?`)) {
      await deleteUserAction(id);
    }
  };

  const closeModal = () => {
    setIsAdding(false);
    setEditingUser(null);
  };

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">User Management</h2>
          <p className="text-xs text-gray-500">Manage team access, security roles, and system permissions.</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add User</span>
        </button>
      </div>

      {/* Users Table Container */}
      <TableContainer>
        <THead>
          <tr>
            <th className="py-2.5 px-4">Name</th>
            <th className="py-2.5 px-4">Email</th>
            <th className="py-2.5 px-4">Role</th>
            <th className="py-2.5 px-4 text-center">Status</th>
            <th className="py-2.5 px-4 text-right">Actions</th>
          </tr>
        </THead>
        <TBody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="py-3 px-4 font-medium text-gray-900">{user.name}</td>
              <td className="py-3 px-4 text-gray-600">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-gray-400" />
                  <span>{user.email}</span>
                </div>
              </td>
              <td className="py-3 px-4">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
                  <Shield className="w-3 h-3 text-blue-600" /> {user.role}
                </span>
              </td>
              <td className="py-3 px-4 text-center">
                <StatusBadge active={user.active} />
              </td>
              <td className="py-3 px-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => setEditingUser(user)}
                    className="p-1 text-gray-500 hover:text-blue-600 transition-colors cursor-pointer"
                    title="Edit User"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id, user.name)}
                    className="p-1 text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
                    title="Delete User"
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
        isOpen={isAdding || !!editingUser}
        onClose={closeModal}
        title={isAdding ? 'Add New User' : `Edit ${editingUser?.name}`}
      >
        <form onSubmit={isAdding ? handleAddSubmit : handleEditSubmit} className="space-y-3">
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
              <label className="block text-xs font-semibold text-gray-800 mb-1">Role</label>
              <select
                name="role"
                defaultValue={editingUser?.role || 'Operator'}
                className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none bg-white"
              >
                <option value="Admin">Admin</option>
                <option value="Operator">Operator</option>
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

          <FormActions onCancel={closeModal} isSubmitting={isSubmitting} submitLabel="Save User" />
        </form>
      </Modal>
    </div>
  );
}