import React from 'react';
import Card from '@/Components/Card';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

function UserForm({ roles, subaks, user, onClose }) {
    const isEdit = Boolean(user?.id);
    const { data, setData, post, patch, processing, errors } = useForm({
        name: user?.name ?? '',
        email: user?.email ?? '',
        phone: user?.phone ?? '',
        role_id: user?.role?.id ? String(user.role.id) : '',
        subak_id: user?.subak?.id ? String(user.subak.id) : '',
        is_active: user?.is_active ?? true,
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            patch(route('admin.users.update', user.id), { onSuccess: onClose });
        } else {
            post(route('admin.users.store'), { onSuccess: onClose });
        }
    };

    return (
        <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
            <div>
                <InputLabel htmlFor="user-name" value="Nama" />
                <input id="user-name" className="form-input mt-2" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                {errors.name && <p className="form-error mt-2">{errors.name}</p>}
            </div>
            <div>
                <InputLabel htmlFor="user-email" value="Email" />
                <input id="user-email" className="form-input mt-2" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                {errors.email && <p className="form-error mt-2">{errors.email}</p>}
            </div>
            <div>
                <InputLabel htmlFor="user-phone" value="Telepon" />
                <input id="user-phone" className="form-input mt-2" value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
            </div>
            <div>
                <InputLabel htmlFor="user-role" value="Role" />
                <select id="user-role" className="form-input mt-2" value={data.role_id} onChange={(e) => setData('role_id', e.target.value)}>
                    <option value="">Pilih role</option>
                    {roles.map((role) => <option key={role.id} value={role.id}>{role.name}</option>)}
                </select>
                {errors.role_id && <p className="form-error mt-2">{errors.role_id}</p>}
            </div>
            <div>
                <InputLabel htmlFor="user-subak" value="Subak" />
                <select id="user-subak" className="form-input mt-2" value={data.subak_id} onChange={(e) => setData('subak_id', e.target.value)}>
                    <option value="">Tidak terikat Subak</option>
                    {subaks.map((subak) => <option key={subak.id} value={subak.id}>{subak.name} - {subak.region}</option>)}
                </select>
            </div>
            <div>
                <InputLabel htmlFor="user-password" value={isEdit ? 'Password Baru (Opsional)' : 'Password'} />
                <input id="user-password" type="password" className="form-input mt-2" value={data.password} onChange={(e) => setData('password', e.target.value)} />
                {errors.password && <p className="form-error mt-2">{errors.password}</p>}
            </div>
            <div className="md:col-span-2">
                <label className="flex items-center gap-3 text-sm text-neutral-700">
                    <input type="checkbox" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} />
                    User aktif
                </label>
            </div>
            <div className="md:col-span-2 flex gap-3">
                <SecondaryButton type="button" onClick={onClose}>Tutup</SecondaryButton>
                <PrimaryButton disabled={processing}>{isEdit ? 'Simpan Perubahan' : 'Tambah User'}</PrimaryButton>
            </div>
        </form>
    );
}

export default function AdminUsersIndex({ users, roles, subaks }) {
    const flash = usePage().props.flash ?? {};
    const [editingUser, setEditingUser] = React.useState(null);
    const [showCreate, setShowCreate] = React.useState(false);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="eyebrow !text-amber-700">Admin</p>
                        <h2 className="page-title">Kelola User</h2>
                    </div>
                    <PrimaryButton onClick={() => { setShowCreate(true); setEditingUser(null); }}>Tambah User</PrimaryButton>
                </div>
            }
        >
            <Head title="Kelola User" />
            <div className="py-10">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    {flash.success && (
                        <div className="app-card border-emerald-200 bg-emerald-50 text-sm font-medium text-emerald-700">
                            {flash.success}
                        </div>
                    )}
                    {(showCreate || editingUser) && (
                        <Card>
                            <UserForm
                                roles={roles}
                                subaks={subaks}
                                user={editingUser}
                                onClose={() => {
                                    setShowCreate(false);
                                    setEditingUser(null);
                                }}
                            />
                        </Card>
                    )}
                    <section className="grid gap-4 lg:grid-cols-2">
                        {users.map((user) => (
                            <Card key={user.id} className="space-y-4">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-lg font-semibold text-neutral-900">{user.name}</p>
                                        <p className="mt-1 text-sm text-neutral-500">{user.email}</p>
                                    </div>
                                    <SecondaryButton type="button" onClick={() => { setEditingUser(user); setShowCreate(false); }}>
                                        Edit
                                    </SecondaryButton>
                                </div>
                                <div className="flex flex-wrap gap-4 text-sm text-neutral-500">
                                    <span>{user.role?.name ?? '-'}</span>
                                    <span>{user.subak?.name ?? 'Tanpa Subak'}</span>
                                    <span>{user.is_active ? 'Aktif' : 'Nonaktif'}</span>
                                </div>
                            </Card>
                        ))}
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
