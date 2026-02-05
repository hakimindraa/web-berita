import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import NewsCard from '../../components/NewsCard';
import CategoryBadge from '../../components/CategoryBadge';
import ShareButtons from '../../components/ShareButtons';
import prisma from '@/lib/db';

interface PageProps {
    params: Promise<{ slug: string }>;
}

// Transform database article to match component props
function transformArticle(article: any) {
    return {
        id: article.id,
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        image: article.image,
        imageCaption: article.imageCaption,
        author: article.author,
        publishedAt: article.publishedAt?.toISOString() || article.createdAt.toISOString(),
        readTime: article.readTime,
        views: article.views,
        isFeatured: article.isFeatured,
        isTrending: article.isTrending,
        category: {
            id: article.category.id,
            name: article.category.name,
            slug: article.category.slug,
            color: article.category.color,
            count: 0,
        },
    };
}

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

// Convert plain text to HTML paragraphs if content doesn't already have HTML tags
function formatContent(content: string): string {
    // If content already has HTML paragraph tags, return as-is
    if (content.includes('<p>') || content.includes('<p ')) {
        return content;
    }

    // Split by newlines (any number of them becomes a new paragraph)
    const paragraphs = content
        .split(/\n+/)
        .map(p => p.trim())
        .filter(p => p.length > 0);

    // Wrap each paragraph in <p> tags with proper styling
    return paragraphs.map((p, index) => {
        // First paragraph gets bold styling for opening line (like JAKARTA, detikcom -)
        if (index === 0 && p.includes(' - ')) {
            const dashIndex = p.indexOf(' - ');
            const location = p.substring(0, dashIndex);
            const rest = p.substring(dashIndex + 3);
            return `<p class="mb-5 text-gray-800 leading-relaxed"><strong class="text-gray-900">${location}</strong> - ${rest}</p>`;
        }
        // Check if it's a "Baca juga:" style line
        if (p.toLowerCase().startsWith('baca juga:') || p.toLowerCase().startsWith('baca juga :')) {
            const linkText = p.substring(p.indexOf(':') + 1).trim();
            return `<div class="my-6 py-3 border-t border-b border-gray-200"><span class="text-gray-600 font-medium">Baca juga:</span> <a href="#" class="text-red-600 hover:underline font-medium">${linkText}</a></div>`;
        }
        // Quote paragraphs (starts with ")
        if (p.startsWith('"') && p.endsWith('"')) {
            return `<p class="mb-5 text-gray-800 leading-relaxed italic">${p}</p>`;
        }
        return `<p class="mb-5 text-gray-800 leading-relaxed">${p}</p>`;
    }).join('\n');
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = await prisma.article.findUnique({
        where: { slug },
        include: { category: true },
    });

    if (!article) {
        return { title: 'Berita Tidak Ditemukan' };
    }

    return {
        title: article.title,
        description: article.excerpt,
        openGraph: {
            title: article.title,
            description: article.excerpt,
            images: [article.image],
            type: 'article',
            publishedTime: article.publishedAt?.toISOString() || article.createdAt.toISOString(),
            authors: [article.author],
        },
    };
}

export default async function BeritaDetailPage({ params }: PageProps) {
    const { slug } = await params;

    const article = await prisma.article.findUnique({
        where: { slug },
        include: { category: true },
    });

    if (!article) {
        notFound();
    }

    // Get related news (same category, excluding current)
    const relatedNews = await prisma.article.findMany({
        where: {
            categoryId: article.categoryId,
            id: { not: article.id },
        },
        include: { category: true },
        take: 3,
        orderBy: { createdAt: 'desc' },
    });

    // Get other latest news for sidebar
    const otherNews = await prisma.article.findMany({
        where: { id: { not: article.id } },
        include: { category: true },
        take: 4,
        orderBy: { createdAt: 'desc' },
    });

    const transformedArticle = transformArticle(article);

    return (
        <article className="py-8 md:py-12">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Article Header */}
                        <header className="mb-8">
                            <CategoryBadge category={transformedArticle.category} size="md" />

                            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] leading-tight mt-4 mb-4">
                                {transformedArticle.title}
                            </h1>

                            <p className="text-lg text-[var(--text-secondary)] mb-6">
                                {transformedArticle.excerpt}
                            </p>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)] pb-6 border-b border-[var(--border-color)]">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <span className="text-[var(--text-primary)] font-medium">{transformedArticle.author}</span>
                                </div>
                                <span>•</span>
                                <span>{formatDate(transformedArticle.publishedAt)}</span>
                                <span>•</span>
                                <span>{transformedArticle.readTime} menit baca</span>
                            </div>
                        </header>

                        {/* Featured Image */}
                        <figure className="mb-8">
                            <div className="relative aspect-video rounded-lg overflow-hidden">
                                <Image
                                    src={transformedArticle.image}
                                    alt={transformedArticle.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <figcaption className="text-xs text-gray-500 mt-2 italic">
                                Foto: {transformedArticle.imageCaption || `${transformedArticle.author}/Faktara`}
                            </figcaption>
                        </figure>

                        {/* Article Content */}
                        <div
                            className="prose prose-invert prose-lg max-w-none
                prose-headings:text-[var(--text-primary)] prose-headings:font-bold
                prose-p:text-[var(--text-secondary)] prose-p:leading-relaxed
                prose-a:text-[var(--accent-primary)] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-[var(--text-primary)]
                prose-ul:text-[var(--text-secondary)]
                prose-li:marker:text-[var(--accent-primary)]
              "
                            dangerouslySetInnerHTML={{ __html: formatContent(transformedArticle.content) }}
                        />

                        {/* Share Buttons */}
                        <ShareButtons
                            title={transformedArticle.title}
                            url={`/berita/${transformedArticle.slug}`}
                        />

                        {/* Related News */}
                        {relatedNews.length > 0 && (
                            <section className="mt-12 pt-8 border-t border-[var(--border-color)]">
                                <h2 className="section-title mb-6">Berita Terkait</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    {relatedNews.map((news) => (
                                        <NewsCard key={news.id} article={transformArticle(news)} />
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Latest News */}
                            <div className="card p-5 rounded-2xl">
                                <h3 className="section-title mb-4">Berita Lainnya</h3>
                                <div className="space-y-0">
                                    {otherNews.map((news) => (
                                        <NewsCard key={news.id} article={transformArticle(news)} variant="compact" />
                                    ))}
                                </div>
                            </div>

                            {/* Tags/Categories */}
                            <div className="card p-5 rounded-2xl">
                                <h3 className="section-title mb-4">Kategori</h3>
                                <div className="flex flex-wrap gap-2">
                                    <CategoryBadge category={transformedArticle.category} size="md" />
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </article>
    );
}
