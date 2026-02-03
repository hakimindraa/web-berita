import Link from 'next/link';
import Image from 'next/image';
import { NewsArticle, formatDate, formatViews } from '../data/news';

interface TrendingCardProps {
    article: NewsArticle;
    rank: number;
}

export default function TrendingCard({ article, rank }: TrendingCardProps) {
    const getRankStyle = (rank: number) => {
        switch (rank) {
            case 1:
                return 'bg-gradient-to-br from-yellow-500 to-amber-600 text-white shadow-lg shadow-yellow-500/20';
            case 2:
                return 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-800';
            case 3:
                return 'bg-gradient-to-br from-orange-400 to-orange-600 text-white';
            default:
                return 'bg-gray-100 text-gray-600 border border-gray-300';
        }
    };

    return (
        <Link href={`/berita/${article.slug}`} className="group block">
            <article className="flex items-start gap-4 py-4 border-b border-gray-200 last:border-0 transition-colors hover:bg-gray-50 -mx-2 px-2 rounded-lg">
                {/* Rank Number */}
                <div className={`w-10 h-10 shrink-0 rounded-lg flex items-center justify-center font-bold text-lg ${getRankStyle(rank)}`}>
                    {rank}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors">
                        {article.title}
                    </h4>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                        <span className="badge badge-teknologi">
                            {article.category.name}
                        </span>
                        <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {formatViews(article.views)}
                        </span>
                        <span>{formatDate(article.publishedAt)}</span>
                    </div>
                </div>

                {/* Thumbnail */}
                <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden hidden sm:block">
                    <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            </article>
        </Link>
    );
}
