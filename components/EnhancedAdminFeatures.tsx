'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, UserPlus, Edit, Trash2, Check, X } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import { useToast } from '@/hooks/use-toast'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'viewer'
  status: 'active' | 'inactive'
}

export function EnhancedAdminFeatures() {
  const { language } = useLanguage()
  const { toast } = useToast()

  const t = (key: string) => {
    const translations = {
      en: {
        title: "User Management",
        subtitle: "Manage user accounts, roles, and statuses.",
        searchPlaceholder: "Search users...",
        addUser: "Add User",
        name: "Name",
        email: "Email",
        role: "Role",
        status: "Status",
        actions: "Actions",
        edit: "Edit",
        delete: "Delete",
        save: "Save",
        cancel: "Cancel",
        confirmDelete: "Are you sure you want to delete this user?",
        userAdded: "User added successfully!",
        userUpdated: "User updated successfully!",
        userDeleted: "User deleted successfully!",
        errorAddingUser: "Error adding user.",
        errorUpdatingUser: "Error updating user.",
        errorDeletingUser: "Error deleting user.",
        admin: "Admin",
        user: "User",
        viewer: "Viewer",
        active: "Active",
        inactive: "Inactive",
      },
      ar: {
        title: "إدارة المستخدمين",
        subtitle: "إدارة حسابات المستخدمين، الأدوار، والحالات.",
        searchPlaceholder: "البحث عن المستخدمين...",
        addUser: "إضافة مستخدم",
        name: "الاسم",
        email: "البريد الإلكتروني",
        role: "الدور",
        status: "الحالة",
        actions: "الإجراءات",
        edit: "تعديل",
        delete: "حذف",
        save: "حفظ",
        cancel: "إلغاء",
        confirmDelete: "هل أنت متأكد أنك تريد حذف هذا المستخدم؟",
        userAdded: "تمت إضافة المستخدم بنجاح!",
        userUpdated: "تم تحديث المستخدم بنجاح!",
        userDeleted: "تم حذف المستخدم بنجاح!",
        errorAddingUser: "خطأ في إضافة المستخدم.",
        errorUpdatingUser: "خطأ في تحديث المستخدم.",
        errorDeletingUser: "خطأ في حذف المستخدم.",
        admin: "مسؤول",
        user: "مستخدم",
        viewer: "عارض",
        active: "نشط",
        inactive: "غير نشط",
      },
    }
    return translations[language][key] || key
  }

  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Alice Smith', email: 'alice@example.com', role: 'admin', status: 'active' },
    { id: '2', name: 'Bob Johnson', email: 'bob@example.com', role: 'user', status: 'active' },
    { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'viewer', status: 'inactive' },
  ])
  const [searchTerm, setSearchTerm] = useState('')
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [newUser, setNewUser] = useState<Omit<User, 'id'>>({ name: '', email: '', role: 'user', status: 'active' })

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast({ title: t("errorAddingUser"), description: "Name and Email are required.", variant: "destructive" })
      return
    }
    const id = (users.length + 1).toString()
    setUsers([...users, { ...newUser, id }])
    setNewUser({ name: '', email: '', role: 'user', status: 'active' })
    toast({ title: t("userAdded"), variant: "success" })
  }

  const handleEditUser = (user: User) => {
    setEditingUser({ ...user })
  }

  const handleSaveUser = () => {
    if (editingUser) {
      setUsers(users.map(user => (user.id === editingUser.id ? editingUser : user)))
      setEditingUser(null)
      toast({ title: t("userUpdated"), variant: "success" })
    }
  }

  const handleDeleteUser = (id: string) => {
    if (window.confirm(t("confirmDelete"))) {
      setUsers(users.filter(user => user.id !== id))
      toast({ title: t("userDeleted"), variant: "success" })
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-6 w-6 text-blue-600" />
          {t("title")}
        </CardTitle>
        <p className="text-sm text-gray-500 dark:text-gray-400">{t("subtitle")}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Input
            placeholder={t("searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={handleAddUser}>
            <UserPlus className="h-4 w-4 mr-2" /> {t("addUser")}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-4 rounded-md bg-gray-50 dark:bg-gray-800">
          <Input
            placeholder={t("name")}
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <Input
            type="email"
            placeholder={t("email")}
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value as User['role'] })}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="user">{t("user")}</option>
            <option value="admin">{t("admin")}</option>
            <option value="viewer">{t("viewer")}</option>
          </select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("name")}</TableHead>
              <TableHead>{t("email")}</TableHead>
              <TableHead>{t("role")}</TableHead>
              <TableHead>{t("status")}</TableHead>
              <TableHead className="text-right">{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  {editingUser?.id === user.id ? (
                    <Input
                      value={editingUser.name}
                      onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                    />
                  ) : (
                    user.name
                  )}
                </TableCell>
                <TableCell>
                  {editingUser?.id === user.id ? (
                    <Input
                      type="email"
                      value={editingUser.email}
                      onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    />
                  ) : (
                    user.email
                  )}
                </TableCell>
                <TableCell>
                  {editingUser?.id === user.id ? (
                    <select
                      value={editingUser.role}
                      onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as User['role'] })}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="user">{t("user")}</option>
                      <option value="admin">{t("admin")}</option>
                      <option value="viewer">{t("viewer")}</option>
                    </select>
                  ) : (
                    t(user.role)
                  )}
                </TableCell>
                <TableCell>
                  {editingUser?.id === user.id ? (
                    <select
                      value={editingUser.status}
                      onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value as User['status'] })}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="active">{t("active")}</option>
                      <option value="inactive">{t("inactive")}</option>
                    </select>
                  ) : (
                    t(user.status)
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {editingUser?.id === user.id ? (
                    <div className="flex gap-2 justify-end">
                      <Button size="sm" onClick={handleSaveUser}>
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingUser(null)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2 justify-end">
                      <Button size="sm" variant="outline" onClick={() => handleEditUser(user)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDeleteUser(user.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
