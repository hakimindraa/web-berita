'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Category {
    id: string;
    name: string;
    slug: string;
    color: string;
}

interface ArticleFormProps {
    categories: Category[];
    initialData?: {
        id?: string;
        title: string;
        excerpt: string;
        content: string;
        image: string;
        imageType: string;
        author: string;
        categoryId: string;
        readTime: number;
        isFeatured: boolean;
        isTrending: boolean;
    };
    mode: 'create' | 'edit';
}

export default function ArticleForm({ categories, initialData, mode }: ArticleFormProps) {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        excerpt: initialData?.excerpt || '',
        content: initialData?.content || '',
        image: initialData?.image || '',
        imageType: initialData?.imageType || 'url',
        author: initialData?.author || '',
        categoryId: initialData?.categoryId || '',
        readTime: initialData?.readTime || 3,
        isFeatured: initialData?.isFeatured || false,
        isTrending: initialData?.isTrending || false,
    });

    const [imageSource, setImageSource] = useState<'url' | 'upload'>(
        initialData?.imageType === 'upload' ? 'upload' : 'url'
    );
    const [uploading, setUploading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleImageUpload = async (file: File) => {
        setUploading(true);
        setError('');

        try {
            const formDataUpload = new FormData();
            formDataUpload.append('file', file);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formDataUpload,
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Upload failed');
            }

            const data = await res.json();
            setFormData(prev => ({ ...prev, image: data.url, imageType: 'upload' }));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const url = mode === 'create'
                ? '/api/articles'
                : `/api/articles/${initialData?.id}`;

            const method = mode === 'create' ? 'POST' : 'PUT';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to save article');
            }

            router.push('/admin/articles');
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save article');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
                    {error}
                </div>
            )}

            {/* Title */}
            <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Judul Artikel *
                </label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                    placeholder="Masukkan judul artikel..."
                    required
                />
            </div>

            {/* Excerpt */}
            <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Ringkasan *
                </label>
                <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors resize-none"
                    placeholder="Ringkasan singkat artikel..."
                    rows={2}
                    required
                />
            </div>

            {/* Content */}
            <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Konten Artikel * (HTML Supported)
                </label>
                <textarea
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors resize-none font-mono text-sm"
                    placeholder="<p>Isi artikel Anda di sini...</p>"
                    rows={10}
                    required
                />
            </div>

            {/* Image Source Toggle */}
            <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Gambar Artikel *
                </label>
                <div className="flex gap-2 mb-4">
                    <button
                        type="button"
                        onClick={() => setImageSource('url')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${imageSource === 'url'
                            ? 'bg-[var(--accent-primary)] text-white'
                            : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                            }`}
                    >
                        URL Link
                    </button>
                    <button
                        type="button"
                        onClick={() => setImageSource('upload')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${imageSource === 'upload'
                            ? 'bg-[var(--accent-primary)] text-white'
                            : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                            }`}
                    >
                        Upload File
                    </button>
                </div>

                {imageSource === 'url' ? (
                    <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value, imageType: 'url' }))}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                        placeholder="https://example.com/image.jpg"
                        required={!formData.image}
                    />
                ) : (
                    <div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageUpload(file);
                            }}
                            className="hidden"
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="w-full px-4 py-8 rounded-xl border-2 border-dashed border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-colors flex flex-col items-center justify-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                        >
                            {uploading ? (
                                <>
                                    <div className="w-8 h-8 border-2 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin" />
                                    <span>Uploading...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>Klik untuk upload gambar</span>
                                    <span className="text-xs text-[var(--text-muted)]">JPG, PNG, WebP, GIF (Max 5MB)</span>
                                </>
                            )}
                        </button>
                    </div>
                )}

                {/* Image Preview */}
                {formData.image && (
                    <div className="mt-4 relative aspect-video w-full max-w-md rounded-xl overflow-hidden">
                        <Image
                            src={formData.image}
                            alt="Preview"
                            fill
                            className="object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                            className="absolute top-2 right-2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            {/* Author & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                        Penulis *
                    </label>
                    <input
                        type="text"
                        value={formData.author}
                        onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                        placeholder="Nama penulis..."
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                        Kategori *
                    </label>
                    <select
                        value={formData.categoryId}
                        onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                        required
                    >
                        <option value="">Pilih kategori...</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Read Time */}
            <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Waktu Baca (menit)
                </label>
                <input
                    type="number"
                    min="1"
                    max="60"
                    value={formData.readTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, readTime: parseInt(e.target.value) || 3 }))}
                    className="w-32 px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                />
            </div>

            {/* Status Toggles */}
            <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={formData.isFeatured}
                        onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                        className="w-5 h-5 rounded border-[var(--border-color)] text-[var(--accent-primary)] focus:ring-[var(--accent-primary)]"
                    />
                    <span className="text-[var(--text-primary)]">Featured Article</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={formData.isTrending}
                        onChange={(e) => setFormData(prev => ({ ...prev, isTrending: e.target.checked }))}
                        className="w-5 h-5 rounded border-[var(--border-color)] text-[var(--accent-primary)] focus:ring-[var(--accent-primary)]"
                    />
                    <span className="text-[var(--text-primary)]">Trending Article</span>
                </label>
            </div>

            {/* Submit Button */}
            <div className="flex items-center gap-4 pt-4">
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
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {mode === 'create' ? 'Publikasikan Artikel' : 'Simpan Perubahan'}
                        </>
                    )}
                </button>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-3 rounded-xl font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
                >
                    Batal
                </button>
            </div>
        </form>
    );
}
