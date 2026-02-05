import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import NewsCard from '../components/NewsCard';
import prisma from '@/lib/db';

export const metadata: Metadata = {
    title: 'Cari Berita',
    description: 'Cari berita terkini berdasarkan kata kunci. Temukan artikel yang Anda cari dari berbagai kategori.',
};

interface PageProps {
    searchParams: Promise<{ q?: string; category?: string; date?: string }>;
}

async function SearchResults({ query, category, date }: { query: string; category?: string; date?: string }) {
    if (!query) {
        return (
            <div className="text-center py-16">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Cari Berita
                </h2>
                <p className="text-gray-600 max-w-md mx-auto">
                    Masukkan kata kunci di atas untuk mencari berita. Anda dapat mencari berdasarkan judul atau isi artikel.
                </p>
            </div>
        );
    }

    // Build where clause
    const where: any = {
        OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { excerpt: { contains: query, mode: 'insensitive' } },
            { content: { contains: query, mode: 'insensitive' } },
        ],
    };

    if (category) {
        where.category = { slug: category };
    }

    if (date) {
        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setDate(endDate.getDate() + 1);
        where.createdAt = {
            gte: startDate,
            lt: endDate,
        };
    }

    const results = await prisma.article.findMany({
        where,
        include: { category: true },
        orderBy: { createdAt: 'desc' },
        take: 50,
    });

    // Transform to match NewsArticle type
    const transformedResults = results.map(article => ({
        ...article,
        category: {
            ...article.category,
            count: 0, // Add missing count property
        },
        publishedAt: article.publishedAt?.toISOString() || article.createdAt.toISOString(),
    }));

    if (transformedResults.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Tidak Ada Hasil
                </h2>
                <p className="text-gray-600 max-w-md mx-auto">
                    Tidak ditemukan berita dengan kata kunci &quot;{query}&quot;.
                    Coba gunakan kata kunci yang berbeda atau ubah filter.
                </p>
            </div>
        );
    }

    const highlightText = (text: string, highlight: string) => {
        if (!highlight.trim()) return text;
        const regex = new RegExp(`(${highlight})`, 'gi');
        const parts = text.split(regex);
        return parts.map((part, i) =>
            regex.test(part) ? <mark key={i} className="bg-yellow-200 px-0.5">{part}</mark> : part
        );
    };

    return (
        <div>
            <p className="text-gray-600 mb-6">
                Ditemukan <span className="font-semibold text-gray-900">{transformedResults.length}</span> hasil untuk &quot;{query}&quot;
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {transformedResults.map((article) => (
                    <NewsCard key={article.id} article={article} />
                ))}
            </div>
        </div>
    );
}

export default async function CariPage({ searchParams }: PageProps) {
    const { q, category, date } = await searchParams;
    const query = q || '';

    const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' },
    });

    return (
        <div className="py-8 md:py-12">
            <div className="container">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        Pencarian Berita
                    </h1>

                    {/* Search Form with Filters */}
                    <form method="get" className="space-y-4">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                name="q"
                                defaultValue={query}
                                placeholder="Cari berita..."
                                className="flex-1 h-12 px-4 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                            />
                            <button
                                type="submit"
                                className="px-6 h-12 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                            >
                                Cari
                            </button>
                        </div>

                        {/* Filters */}
                        <div className="flex flex-wrap gap-2">
                            <select
                                name="category"
                                defaultValue={category || ''}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-red-600"
                            >
                                <option value="">Semua Kategori</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.slug}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="date"
                                name="date"
                                defaultValue={date || ''}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-red-600"
                            />

                            {(category || date) && (
                                <Link
                                    href={`/cari${query ? `?q=${encodeURIComponent(query)}` : ''}`}
                                    className="px-4 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-50 transition-colors"
                                >
                                    Reset Filter
                                </Link>
                            )}
                        </div>
                    </form>
                </div>

                {/* Search Results */}
                <div className="mt-10">
                    <Suspense fallback={
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="card p-4">
                                    <div className="skeleton h-40 mb-4 rounded-lg"></div>
                                    <div className="skeleton h-4 w-20 mb-3"></div>
                                    <div className="skeleton h-6 w-full mb-2"></div>
                                    <div className="skeleton h-4 w-3/4"></div>
                                </div>
                            ))}
                        </div>
                    }>
                        <SearchResults query={query} category={category} date={date} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
