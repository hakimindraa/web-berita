import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

async function getArticles() {
    return prisma.article.findMany({
        include: { category: true },
        orderBy: { createdAt: 'desc' }
    });
}

export default async function ArticlesPage() {
    const articles = await getArticles();

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Kelola Artikel</h1>
                    <p className="text-[var(--text-secondary)] mt-1">
                        {articles.length} artikel tersedia
                    </p>
                </div>
                <Link
                    href="/admin/articles/new"
                    className="btn-primary flex items-center gap-2 px-4 py-2 rounded-lg"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Tambah Artikel
                </Link>
            </div>

            {articles.length === 0 ? (
                <div className="card p-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                        Belum ada artikel
                    </h3>
                    <p className="text-[var(--text-secondary)] mb-6">
                        Mulai dengan menambahkan artikel pertama Anda
                    </p>
                    <Link
                        href="/admin/articles/new"
                        className="btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-lg"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Tambah Artikel
                    </Link>
                </div>
            ) : (
                <div className="card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[var(--bg-tertiary)]">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-[var(--text-secondary)]">
                                        Artikel
                                    </th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-[var(--text-secondary)]">
                                        Kategori
                                    </th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-[var(--text-secondary)]">
                                        Status
                                    </th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-[var(--text-secondary)]">
                                        Views
                                    </th>
                                    <th className="text-right px-6 py-4 text-sm font-semibold text-[var(--text-secondary)]">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--border-color)]">
                                {articles.map((article) => (
                                    <tr key={article.id} className="hover:bg-[var(--bg-tertiary)]/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0">
                                                    <Image
                                                        src={article.image}
                                                        alt={article.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="font-medium text-[var(--text-primary)] line-clamp-1">
                                                        {article.title}
                                                    </div>
                                                    <div className="text-xs text-[var(--text-muted)]">
                                                        {article.author} • {new Date(article.publishedAt).toLocaleDateString('id-ID')}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`badge badge-${article.category.color} px-2 py-1 text-xs`}>
                                                {article.category.name}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {article.isFeatured && (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs">
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                        Featured
                                                    </span>
                                                )}
                                                {article.isTrending && (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-xs">
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                                        </svg>
                                                        Trending
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-[var(--text-secondary)]">
                                            {article.views.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/berita/${article.slug}`}
                                                    target="_blank"
                                                    className="p-2 rounded-lg hover:bg-[var(--bg-primary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                                                    title="Lihat"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </Link>
                                                <Link
                                                    href={`/admin/articles/${article.id}/edit`}
                                                    className="p-2 rounded-lg hover:bg-[var(--bg-primary)] text-[var(--text-muted)] hover:text-blue-500 transition-colors"
                                                    title="Edit"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </Link>
                                                <form action={`/api/articles/${article.id}`} method="DELETE">
                                                    <button
                                                        type="button"
                                                        className="p-2 rounded-lg hover:bg-[var(--bg-primary)] text-[var(--text-muted)] hover:text-red-500 transition-colors delete-btn"
                                                        data-id={article.id}
                                                        title="Hapus"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <script
                dangerouslySetInnerHTML={{
                    __html: `
                        document.querySelectorAll('.delete-btn').forEach(btn => {
                            btn.addEventListener('click', async (e) => {
                                if (confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
                                    const id = btn.dataset.id;
                                    const res = await fetch('/api/articles/' + id, { method: 'DELETE' });
                                    if (res.ok) {
                                        window.location.reload();
                                    } else {
                                        alert('Gagal menghapus artikel');
                                    }
                                }
                            });
                        });
                    `
                }}
            />
        </div>
    );
}
