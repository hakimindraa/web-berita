import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import NewsCard from '../../components/NewsCard';
import { categories, getNewsByCategory, newsArticles } from '../../data/news';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const category = categories.find(c => c.slug === slug);

    if (!category) {
        return { title: 'Kategori Tidak Ditemukan' };
    }

    return {
        title: `Berita ${category.name}`,
        description: `Berita terkini seputar ${category.name.toLowerCase()}. Temukan informasi dan artikel terbaru tentang ${category.name.toLowerCase()} di PortalBerita.`,
    };
}

export function generateStaticParams() {
    return categories.map((category) => ({
        slug: category.slug,
    }));
}

export default async function CategoryPage({ params }: PageProps) {
    const { slug } = await params;
    const category = categories.find(c => c.slug === slug);

    if (!category) {
        notFound();
    }

    // Get news for this category (in real app, this would be filtered from database)
    const categoryNews = newsArticles.filter(n => n.category.slug === slug);

    return (
        <div className="py-8 md:py-12">
            <div className="container">
                {/* Page Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[var(--accent-primary)]/10 flex items-center justify-center">
                            <span className="w-4 h-4 rounded-full bg-[var(--accent-primary)]"></span>
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
                                {category.name}
                            </h1>
                            <p className="text-[var(--text-muted)]">
                                {categoryNews.length} artikel ditemukan
                            </p>
                        </div>
                    </div>
                </div>

                {/* News Grid */}
                {categoryNews.length > 0 ? (
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                        {categoryNews.map((article) => (
                            <NewsCard key={article.id} article={article} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 rounded-full bg-[var(--bg-surface)] flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                            Belum Ada Berita
                        </h2>
                        <p className="text-[var(--text-muted)]">
                            Belum ada berita dalam kategori ini. Silakan cek kembali nanti.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
