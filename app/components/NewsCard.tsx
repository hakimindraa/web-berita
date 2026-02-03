import Link from 'next/link';
import Image from 'next/image';
import { NewsArticle, formatDate } from '../data/news';
import CategoryBadge from './CategoryBadge';

interface NewsCardProps {
    article: NewsArticle;
    variant?: 'default' | 'featured' | 'compact' | 'horizontal';
}

export default function NewsCard({ article, variant = 'default' }: NewsCardProps) {
    if (variant === 'featured') {
        return (
            <Link href={`/berita/${article.slug}`} className="group block">
                <article className="card relative overflow-hidden rounded-2xl h-[400px] md:h-[500px]">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                        <div className="space-y-3">
                            <CategoryBadge category={article.category} size="md" asLink={false} />
                            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight line-clamp-3 group-hover:text-red-300 transition-colors">
                                {article.title}
                            </h2>
                            <p className="text-gray-300 line-clamp-2 text-sm md:text-base">
                                {article.excerpt}
                            </p>
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                                <span>{article.author}</span>
                                <span>•</span>
                                <span>{formatDate(article.publishedAt)}</span>
                                <span>•</span>
                                <span>{article.readTime} menit baca</span>
                            </div>
                        </div>
                    </div>
                </article>
            </Link>
        );
    }

    if (variant === 'horizontal') {
        return (
            <Link href={`/berita/${article.slug}`} className="group block">
                <article className="card flex gap-4 p-4">
                    {/* Thumbnail */}
                    <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-lg overflow-hidden">
                        <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center min-w-0">
                        <CategoryBadge category={article.category} size="sm" asLink={false} />
                        <h3 className="font-semibold text-gray-900 line-clamp-2 mt-2 group-hover:text-red-600 transition-colors">
                            {article.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                            <span>{formatDate(article.publishedAt)}</span>
                            <span>•</span>
                            <span>{article.readTime} menit</span>
                        </div>
                    </div>
                </article>
            </Link>
        );
    }

    if (variant === 'compact') {
        return (
            <Link href={`/berita/${article.slug}`} className="group block">
                <article className="flex gap-3 py-3 border-b border-gray-200 last:border-0">
                    {/* Thumbnail */}
                    <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden">
                        <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors">
                            {article.title}
                        </h4>
                        <span className="text-xs text-gray-500 mt-1">
                            {formatDate(article.publishedAt)}
                        </span>
                    </div>
                </article>
            </Link>
        );
    }

    // Default variant
    return (
        <Link href={`/berita/${article.slug}`} className="group block h-full">
            <article className="card h-full flex flex-col">
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-2.5 sm:p-4">
                    <CategoryBadge category={article.category} size="sm" asLink={false} />
                    <h3 className="font-semibold text-sm sm:text-base text-gray-900 line-clamp-2 mt-2 sm:mt-3 group-hover:text-red-600 transition-colors">
                        {article.title}
                    </h3>
                    <p className="hidden sm:block text-sm text-gray-600 line-clamp-2 mt-2 flex-1">
                        {article.excerpt}
                    </p>
                    <div className="flex items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3 text-[10px] sm:text-xs text-gray-500">
                        <span className="hidden sm:inline">{article.author}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{formatDate(article.publishedAt)}</span>
                    </div>
                </div>
            </article>
        </Link>
    );
}
