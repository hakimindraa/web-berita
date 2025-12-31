import { Suspense } from 'react';
import { Metadata } from 'next';
import SearchBar from '../components/SearchBar';
import NewsCard from '../components/NewsCard';
import { searchNews, newsArticles } from '../data/news';

export const metadata: Metadata = {
    title: 'Cari Berita',
    description: 'Cari berita terkini berdasarkan kata kunci. Temukan artikel yang Anda cari dari berbagai kategori.',
};

interface PageProps {
    searchParams: Promise<{ q?: string }>;
}

async function SearchResults({ query }: { query: string }) {
    const results = query ? searchNews(query) : [];

    if (!query) {
        return (
            <div className="text-center py-16">
                <div className="w-20 h-20 rounded-full bg-[var(--bg-surface)] flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                    Cari Berita
                </h2>
                <p className="text-[var(--text-muted)] max-w-md mx-auto">
                    Masukkan kata kunci di atas untuk mencari berita. Anda dapat mencari berdasarkan judul atau isi artikel.
                </p>
            </div>
        );
    }

    if (results.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="w-20 h-20 rounded-full bg-[var(--bg-surface)] flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                    Tidak Ada Hasil
                </h2>
                <p className="text-[var(--text-muted)] max-w-md mx-auto">
                    Tidak ditemukan berita dengan kata kunci &quot;{query}&quot;.
                    Coba gunakan kata kunci yang berbeda.
                </p>
            </div>
        );
    }

    return (
        <div>
            <p className="text-[var(--text-secondary)] mb-6">
                Ditemukan <span className="font-semibold text-[var(--text-primary)]">{results.length}</span> hasil untuk &quot;{query}&quot;
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {results.map((article) => (
                    <NewsCard key={article.id} article={article} />
                ))}
            </div>
        </div>
    );
}

export default async function CariPage({ searchParams }: PageProps) {
    const { q } = await searchParams;
    const query = q || '';

    return (
        <div className="py-8 md:py-12">
            <div className="container">
                {/* Page Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
                        Pencarian Berita
                    </h1>
                    <p className="text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
                        Temukan berita yang Anda cari dari berbagai kategori
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto">
                        <SearchBar initialQuery={query} placeholder="Ketik kata kunci pencarian..." autoFocus />
                    </div>
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
                        <SearchResults query={query} />
                    </Suspense>
                </div>

                {/* Popular Searches */}
                {!query && (
                    <div className="mt-12 pt-8 border-t border-[var(--border-color)]">
                        <h2 className="section-title mb-6">Berita Populer</h2>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                            {newsArticles.slice(0, 6).map((article) => (
                                <NewsCard key={article.id} article={article} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
