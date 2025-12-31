'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Category {
    id: string;
    name: string;
    slug: string;
    color: string;
    _count?: { articles: number };
}

interface CategoryManagerProps {
    initialCategories: Category[];
}

const colorOptions = [
    { value: 'politik', label: 'Politik (Biru)', bg: 'bg-blue-500' },
    { value: 'ekonomi', label: 'Ekonomi (Hijau)', bg: 'bg-green-500' },
    { value: 'teknologi', label: 'Teknologi (Cyan)', bg: 'bg-cyan-500' },
    { value: 'olahraga', label: 'Olahraga (Orange)', bg: 'bg-orange-500' },
    { value: 'hiburan', label: 'Hiburan (Pink)', bg: 'bg-pink-500' },
    { value: 'kesehatan', label: 'Kesehatan (Red)', bg: 'bg-red-500' },
];

export default function CategoryManager({ initialCategories }: CategoryManagerProps) {
    const router = useRouter();
    const [categories, setCategories] = useState(initialCategories);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', slug: '', color: 'politik' });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const res = await fetch('/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to create category');
            }

            const newCategory = await res.json();
            setCategories(prev => [...prev, newCategory]);
            setFormData({ name: '', slug: '', color: 'politik' });
            setShowForm(false);
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create category');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Kelola Kategori</h1>
                    <p className="text-[var(--text-secondary)] mt-1">
                        {categories.length} kategori tersedia
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn-primary flex items-center gap-2 px-4 py-2 rounded-lg"
                >
                    {showForm ? (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Batal
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Tambah Kategori
                        </>
                    )}
                </button>
            </div>

            {/* Add Category Form */}
            {showForm && (
                <div className="card p-6 mb-6">
                    <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                        Tambah Kategori Baru
                    </h2>
                    {error && (
                        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 mb-4">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                    Nama Kategori
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => {
                                        const name = e.target.value;
                                        setFormData(prev => ({
                                            ...prev,
                                            name,
                                            slug: generateSlug(name)
                                        }));
                                    }}
                                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                                    placeholder="Nama kategori..."
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                    Slug
                                </label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                                    placeholder="slug-kategori"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                    Warna
                                </label>
                                <select
                                    value={formData.color}
                                    onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                                >
                                    {colorOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="btn-primary px-6 py-3 rounded-xl font-medium flex items-center gap-2 disabled:opacity-50"
                        >
                            {submitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Menyimpan...
                                </>
                            ) : (
                                'Simpan Kategori'
                            )}
                        </button>
                    </form>
                </div>
            )}

            {/* Categories List */}
            <div className="card overflow-hidden">
                {categories.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                            Belum ada kategori
                        </h3>
                        <p className="text-[var(--text-secondary)]">
                            Tambahkan kategori pertama untuk memulai
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[var(--bg-tertiary)]">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-[var(--text-secondary)]">
                                        Kategori
                                    </th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-[var(--text-secondary)]">
                                        Slug
                                    </th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-[var(--text-secondary)]">
                                        Warna
                                    </th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-[var(--text-secondary)]">
                                        Artikel
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--border-color)]">
                                {categories.map((category) => (
                                    <tr key={category.id} className="hover:bg-[var(--bg-tertiary)]/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className={`badge badge-${category.color} px-3 py-1 text-sm`}>
                                                {category.name}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-[var(--text-secondary)]">
                                            /{category.slug}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-4 h-4 rounded-full badge-${category.color}`} />
                                                <span className="text-[var(--text-secondary)]">{category.color}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-[var(--text-secondary)]">
                                            {category._count?.articles ?? 0} artikel
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
