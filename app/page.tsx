import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/db';
import { formatDate } from './data/news';

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
      take: 20,
    }),
    prisma.article.findMany({
      where: { isTrending: true },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.category.findMany({
      orderBy: { name: 'asc' },
    }),
  ]);

  return { featuredArticle, latestArticles, trendingArticles, categories };
}

export default async function Home() {
  const { featuredArticle, latestArticles, trendingArticles, categories } = await getHomeData();

  // Featured = first featured or first article
  const featured = featuredArticle || latestArticles[0];
  // Get all other articles (excluding the featured one)
  const otherArticles = latestArticles.filter(a => a.id !== featured?.id);
  // Sub-featured = first 2 of other articles
  const subFeatured = otherArticles.slice(0, 2);
  // News feed = all other articles
  const newsFeed = otherArticles;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Detik Style */}
      <section className="border-b border-gray-200">
        <div className="container py-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Main Featured - Large */}
            <div className="lg:col-span-7">
              {featured && (
                <Link href={`/berita/${featured.slug}`} className="group block">
                  <article className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6">
                      <span className="inline-block px-1.5 py-0.5 md:px-2 md:py-1 bg-red-600 text-white text-[10px] md:text-xs font-bold rounded mb-1.5 md:mb-2">
                        {featured.category.name.toUpperCase()}
                      </span>
                      <h1 className="text-sm md:text-2xl font-semibold leading-snug" style={{ color: '#ffffff', textShadow: '1px 1px 3px rgba(0,0,0,0.9)' }}>
                        {featured.title}
                      </h1>
                      <p className="text-xs mt-2 line-clamp-2 hidden md:block drop-shadow-md" style={{ color: '#ffffff', textShadow: '1px 1px 2px rgba(0,0,0,0.9)' }}>
                        {featured.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              )}
            </div>

            {/* Sub Featured - Stack of 3 */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {subFeatured.map((article) => (
                <Link key={article.id} href={`/berita/${article.slug}`} className="group">
                  <article className="flex gap-2 md:gap-3 p-2 md:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="relative w-20 h-16 md:w-32 md:h-24 shrink-0 rounded overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] md:text-xs font-semibold text-red-600">
                        {article.category.name}
                      </span>
                      <h3 className="font-semibold text-gray-900 text-xs md:text-base line-clamp-2 mt-0.5 md:mt-1 group-hover:text-red-600 transition-colors">
                        {article.title}
                      </h3>
                      <span className="text-[10px] md:text-xs text-gray-500 mt-0.5 md:mt-1 block">
                        {formatDate(article.publishedAt?.toISOString() || article.createdAt.toISOString())}
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - News Feed + Sidebar */}
      <section className="py-6">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* News Feed - Left Column */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 mb-3 md:mb-4 pb-2 border-b-2 border-red-600">
                <h2 className="text-base md:text-lg font-bold text-gray-900">News Feed</h2>
              </div>

              <div className="divide-y divide-gray-200">
                {newsFeed.length > 0 ? (
                  newsFeed.map((article) => (
                    <Link key={article.id} href={`/berita/${article.slug}`} className="group block py-3 md:py-4 first:pt-0">
                      <article className="flex gap-3 md:gap-4">
                        <div className="relative w-24 h-18 md:w-40 md:h-28 shrink-0 rounded overflow-hidden">
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] md:text-xs font-semibold text-red-600">
                            {article.category.name}
                          </span>
                          <h3 className="font-semibold text-gray-900 text-sm md:text-lg line-clamp-2 mt-0.5 md:mt-1 group-hover:text-red-600 transition-colors">
                            {article.title}
                          </h3>
                          <div className="flex items-center gap-1.5 md:gap-2 mt-1 md:mt-2 text-[10px] md:text-xs text-gray-500">
                            <span>{article.category.name}</span>
                            <span>•</span>
                            <span>{formatDate(article.publishedAt?.toISOString() || article.createdAt.toISOString())}</span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <p>Belum ada artikel.</p>
                    <Link href="/admin/articles/new" className="text-red-600 hover:underline mt-2 inline-block">
                      Tambah Artikel
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar - Right Column */}
            <aside className="lg:col-span-4">
              {/* Berita Terpopuler */}
              <div className="bg-gray-50 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
                <div className="flex items-center gap-2 mb-3 md:mb-4 pb-2 border-b-2 border-red-600">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2Z" />
                  </svg>
                  <h2 className="text-base md:text-lg font-bold text-gray-900">Berita Terpopuler</h2>
                </div>

                <div className="space-y-2 md:space-y-3">
                  {trendingArticles.length > 0 ? (
                    trendingArticles.map((article, index) => (
                      <Link key={article.id} href={`/berita/${article.slug}`} className="group flex gap-2 md:gap-3">
                        <span className={`shrink-0 w-6 h-6 md:w-7 md:h-7 rounded flex items-center justify-center text-xs md:text-sm font-bold ${index === 0 ? 'bg-red-600 text-white' :
                          index === 1 ? 'bg-orange-500 text-white' :
                            index === 2 ? 'bg-yellow-500 text-white' :
                              'bg-gray-200 text-gray-600'
                          }`}>
                          {index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs md:text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors">
                            {article.title}
                          </h4>
                          <span className="text-[10px] md:text-xs text-gray-500 mt-0.5 md:mt-1 block">
                            {formatDate(article.publishedAt?.toISOString() || article.createdAt.toISOString())}
                          </span>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-gray-500 text-xs md:text-sm">Belum ada artikel trending</p>
                  )}
                </div>
              </div>

              {/* Kategori */}
              <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                <div className="flex items-center gap-2 mb-3 md:mb-4 pb-2 border-b-2 border-red-600">
                  <h2 className="text-base md:text-lg font-bold text-gray-900">Kategori</h2>
                </div>

                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/kategori/${category.slug}`}
                      className="px-2 py-1 md:px-3 md:py-1.5 bg-white border border-gray-200 rounded-full text-xs md:text-sm text-gray-700 hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
