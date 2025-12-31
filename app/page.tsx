import Link from 'next/link';
import NewsCard from './components/NewsCard';
import TrendingCard from './components/TrendingCard';
import CategoryBadge from './components/CategoryBadge';
import prisma from '@/lib/db';

// Fetch data from database
async function getHomeData() {
  const [featuredArticle, latestArticles, trendingArticles, categories] = await Promise.all([
    prisma.article.findFirst({
      where: { isFeatured: true },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.article.findMany({
      include: { category: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    }),
    prisma.article.findMany({
      where: { isTrending: true },
      include: { category: true },
      orderBy: { views: 'desc' },
      take: 5,
    }),
    prisma.category.findMany({
      orderBy: { name: 'asc' },
    }),
  ]);

  return { featuredArticle, latestArticles, trendingArticles, categories };
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

export default async function Home() {
  const { featuredArticle, latestArticles, trendingArticles, categories } = await getHomeData();

  // If no featured article, use the first latest article as featured
  const featured = featuredArticle || latestArticles[0];
  const latest = featuredArticle ? latestArticles : latestArticles.slice(1);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-6 md:py-10">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Featured News */}
            <div className="lg:col-span-2">
              {featured && (
                <NewsCard article={transformArticle(featured)} variant="featured" />
              )}
            </div>

            {/* Trending Sidebar */}
            <aside className="lg:col-span-1">
              <div className="card-elevated p-5 rounded-2xl border border-[var(--border-color)] h-full">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="section-title">
                    <svg className="w-5 h-5 text-[var(--accent-secondary)]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2Z" />
                    </svg>
                    Trending
                  </h2>
                  <Link
                    href="/trending"
                    className="text-sm text-[var(--accent-primary)] hover:underline"
                  >
                    Lihat Semua
                  </Link>
                </div>
                <div>
                  {trendingArticles.length > 0 ? (
                    trendingArticles.map((article, index) => (
                      <TrendingCard
                        key={article.id}
                        article={transformArticle(article)}
                        rank={index + 1}
                      />
                    ))
                  ) : (
                    <p className="text-[var(--text-muted)] text-sm">Belum ada artikel trending</p>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Categories Quick Links */}
      <section className="py-6">
        <div className="container">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <span className="text-sm text-[var(--text-muted)] shrink-0">Kategori:</span>
            {categories.map((category) => (
              <CategoryBadge key={category.id} category={{ ...category, count: 0 }} size="md" />
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-8">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Berita Terbaru</h2>
            <Link
              href="/kategori"
              className="text-sm text-[var(--accent-primary)] hover:underline"
            >
              Lihat Semua
            </Link>
          </div>

          {latest.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {latest.map((article) => (
                <NewsCard key={article.id} article={transformArticle(article)} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-[var(--text-muted)]">
              <p>Belum ada artikel. Tambahkan artikel melalui Admin Panel.</p>
              <Link href="/admin/articles/new" className="text-[var(--accent-primary)] hover:underline mt-2 inline-block">
                Tambah Artikel
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Category Sections */}
      {categories.slice(0, 3).map((category) => {
        const categoryNews = latestArticles.filter(a => a.category.slug === category.slug).slice(0, 3);
        if (categoryNews.length === 0) return null;

        return (
          <section key={category.id} className="py-8 border-t border-[var(--border-color)]">
            <div className="container">
              <div className="section-header">
                <h2 className="section-title">
                  <span className={`w-3 h-3 rounded-full bg-[var(--cat-${category.color})]`}></span>
                  {category.name}
                </h2>
                <Link
                  href={`/kategori/${category.slug}`}
                  className="text-sm text-[var(--accent-primary)] hover:underline"
                >
                  Lihat Semua
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categoryNews.map((article) => (
                  <NewsCard key={article.id} article={transformArticle(article)} variant="horizontal" />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
