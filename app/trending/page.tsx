'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import TrendingCard from '../components/TrendingCard';
import NewsCard from '../components/NewsCard';
import { getTrendingNews, newsArticles } from '../data/news';

type TimeFilter = 'today' | 'week' | 'month';

export default function TrendingPage() {
    const [activeFilter, setActiveFilter] = useState<TimeFilter>('week');

    // Get trending news (in real app, this would be filtered by time)
    const trendingNews = getTrendingNews();
    const allNewsSortedByViews = [...newsArticles].sort((a, b) => b.views - a.views);

    const filterLabels: Record<TimeFilter, string> = {
        today: 'Hari Ini',
        week: 'Minggu Ini',
        month: 'Bulan Ini',
    };

    return (
        <div className="py-8 md:py-12">
            <div className="container">
                {/* Page Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] mb-4">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2Z" />
                        </svg>
                        <span className="font-semibold">Trending</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
                        Berita Trending
                    </h1>
                    <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                        Berita yang paling banyak dibaca dan sedang hangat diperbincangkan
                    </p>
                </div>

                {/* Time Filter */}
                <div className="flex justify-center mb-10">
                    <div className="inline-flex p-1 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
                        {(Object.keys(filterLabels) as TimeFilter[]).map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${activeFilter === filter
                                    ? 'bg-[var(--accent-primary)] text-white shadow-lg'
                                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                    }`}
                            >
                                {filterLabels[filter]}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Top 3 Featured */}
                <section className="mb-12">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
                        {allNewsSortedByViews.slice(0, 3).map((article, index) => (
                            <div key={article.id} className="relative">
                                {/* Rank Badge */}
                                <div className={`absolute -top-3 -left-3 z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg ${index === 0
                                    ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white'
                                    : index === 1
                                        ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-800'
                                        : 'bg-gradient-to-br from-orange-400 to-orange-600 text-white'
                                    }`}>
                                    {index + 1}
                                </div>
                                <NewsCard article={article} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Full Trending List */}
                <section>
                    <h2 className="section-title mb-6">Daftar Lengkap</h2>
                    <div className="card p-6 rounded-2xl">
                        {allNewsSortedByViews.map((article, index) => (
                            <TrendingCard
                                key={article.id}
                                article={article}
                                rank={index + 1}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
