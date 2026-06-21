import React from 'react';
import Card from '@/Components/Card';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

function CategoryForm({ category, onClose }) {
    const isEdit = Boolean(category?.id);
    const { data, setData, post, patch, processing, errors } = useForm({
        name: category?.name ?? '',
        slug: category?.slug ?? '',
        description: category?.description ?? '',
        is_active: category?.is_active ?? true,
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            patch(route('admin.categories.update', category.id), { onSuccess: onClose });
        } else {
            post(route('admin.categories.store'), { onSuccess: onClose });
        }
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            <div>
                <InputLabel htmlFor={`name-${category?.id ?? 'new'}`} value="Nama Kategori" />
                <input
                    id={`name-${category?.id ?? 'new'}`}
                    className="form-input mt-2"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                />
                {errors.name && <p className="form-error mt-2">{errors.name}</p>}
            </div>
            <div>
                <InputLabel htmlFor={`slug-${category?.id ?? 'new'}`} value="Slug" />
                <input
                    id={`slug-${category?.id ?? 'new'}`}
                    className="form-input mt-2"
                    value={data.slug}
                    onChange={(e) => setData('slug', e.target.value)}
                />
                {errors.slug && <p className="form-error mt-2">{errors.slug}</p>}
            </div>
            <div>
                <InputLabel htmlFor={`description-${category?.id ?? 'new'}`} value="Deskripsi" />
                <textarea
                    id={`description-${category?.id ?? 'new'}`}
                    className="form-input mt-2 min-h-28"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                />
            </div>
            <label className="flex items-center gap-3 text-sm text-neutral-700">
                <input
                    type="checkbox"
                    checked={data.is_active}
                    onChange={(e) => setData('is_active', e.target.checked)}
                />
                Kategori aktif
            </label>
            <div className="flex gap-3">
                <SecondaryButton type="button" onClick={onClose}>Tutup</SecondaryButton>
                <PrimaryButton disabled={processing}>{isEdit ? 'Simpan Perubahan' : 'Tambah Kategori'}</PrimaryButton>
            </div>
        </form>
    );
}

export default function AdminCategoriesIndex({ categories }) {
    const flash = usePage().props.flash ?? {};
    const [editingCategory, setEditingCategory] = React.useState(null);
    const [showCreate, setShowCreate] = React.useState(false);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="eyebrow !text-amber-700">Admin</p>
                        <h2 className="page-title">Kelola Kategori</h2>
                    </div>
                    <PrimaryButton onClick={() => { setShowCreate(true); setEditingCategory(null); }}>
                        Tambah Kategori
                    </PrimaryButton>
                </div>
            }
        >
            <Head title="Kelola Kategori" />
            <div className="py-10">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    {flash.success && (
                        <div className="app-card border-emerald-200 bg-emerald-50 text-sm font-medium text-emerald-700">
                            {flash.success}
                        </div>
                    )}
                    {(showCreate || editingCategory) && (
                        <Card>
                            <CategoryForm
                                category={editingCategory}
                                onClose={() => {
                                    setShowCreate(false);
                                    setEditingCategory(null);
                                }}
                            />
                        </Card>
                    )}
                    <section className="grid gap-4 lg:grid-cols-2">
                        {categories.map((category) => (
                            <Card key={category.id} className="space-y-4">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-lg font-semibold text-neutral-900">{category.name}</p>
                                        <p className="mt-1 text-sm text-neutral-500">{category.slug}</p>
                                    </div>
                                    <SecondaryButton type="button" onClick={() => { setEditingCategory(category); setShowCreate(false); }}>
                                        Edit
                                    </SecondaryButton>
                                </div>
                                <p className="text-sm leading-7 text-neutral-600">{category.description || 'Tanpa deskripsi.'}</p>
                                <div className="flex flex-wrap gap-4 text-sm text-neutral-500">
                                    <span>{category.is_active ? 'Aktif' : 'Nonaktif'}</span>
                                    <span>{category.reports_count} laporan</span>
                                </div>
                            </Card>
                        ))}
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
