import Link from 'next/link';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

async function getStats() {
    const [articleCount, categoryCount, featuredCount, trendingCount] = await Promise.all([
        prisma.article.count(),
        prisma.category.count(),
        prisma.article.count({ where: { isFeatured: true } }),
        prisma.article.count({ where: { isTrending: true } }),
    ]);

    return { articleCount, categoryCount, featuredCount, trendingCount };
}

export default async function AdminDashboard() {
    const stats = await getStats();

    const statCards = [
        {
            label: 'Total Artikel',
            value: stats.articleCount,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
            ),
            color: 'from-blue-500 to-blue-600',
            href: '/admin/articles'
        },
        {
            label: 'Kategori',
            value: stats.categoryCount,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
                </svg>
            ),
            color: 'from-purple-500 to-purple-600',
            href: '/admin/categories'
        },
        {
            label: 'Featured',
            value: stats.featuredCount,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
            ),
            color: 'from-yellow-500 to-orange-500',
            href: '/admin/articles?filter=featured'
        },
        {
            label: 'Trending',
            value: stats.trendingCount,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            ),
            color: 'from-green-500 to-emerald-600',
            href: '/admin/articles?filter=trending'
        },
    ];

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Dashboard</h1>
                    <p className="text-[var(--text-secondary)] mt-1">Selamat datang di Admin Panel</p>
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

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {statCards.map((stat, index) => (
                    <Link
                        key={index}
                        href={stat.href}
                        className="card p-6 hover:scale-[1.02] transition-transform"
                    >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4`}>
                            {stat.icon}
                        </div>
                        <div className="text-3xl font-bold text-[var(--text-primary)]">
                            {stat.value}
                        </div>
                        <div className="text-sm text-[var(--text-secondary)]">
                            {stat.label}
                        </div>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="card p-6">
                <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Aksi Cepat</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Link
                        href="/admin/articles/new"
                        className="flex items-center gap-3 p-4 rounded-xl bg-[var(--bg-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
                    >
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <div>
                            <div className="font-medium text-[var(--text-primary)]">Artikel Baru</div>
                            <div className="text-xs text-[var(--text-muted)]">Buat artikel baru</div>
                        </div>
                    </Link>
                    <Link
                        href="/admin/articles"
                        className="flex items-center gap-3 p-4 rounded-xl bg-[var(--bg-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
                    >
                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <div>
                            <div className="font-medium text-[var(--text-primary)]">Kelola Artikel</div>
                            <div className="text-xs text-[var(--text-muted)]">Edit atau hapus artikel</div>
                        </div>
                    </Link>
                    <Link
                        href="/admin/categories"
                        className="flex items-center gap-3 p-4 rounded-xl bg-[var(--bg-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
                    >
                        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                        </div>
                        <div>
                            <div className="font-medium text-[var(--text-primary)]">Kategori</div>
                            <div className="text-xs text-[var(--text-muted)]">Kelola kategori berita</div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
