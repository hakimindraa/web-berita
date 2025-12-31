import React from 'react';
import Link from 'next/link';
import { categories } from '../data/news';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Kategori Berita',
    description: 'Jelajahi berbagai kategori berita mulai dari politik, ekonomi, teknologi, olahraga, hingga hiburan dan kesehatan.',
};

export default function KategoriPage() {
    const getCategoryIcon = (slug: string) => {
        const icons: Record<string, React.ReactNode> = {
            politik: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
            ekonomi: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            teknologi: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            olahraga: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            hiburan: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
            ),
            kesehatan: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            ),
        };
        return icons[slug] || icons.politik;
    };

    return (
        <div className="py-8 md:py-12">
            <div className="container">
                {/* Page Header */}
                <div className="text-center mb-6 sm:mb-10">
                    <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2 sm:mb-4">
                        Kategori Berita
                    </h1>
                    <p className="text-xs sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto">
                        Jelajahi berita berdasarkan topik yang Anda minati.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/kategori/${category.slug}`}
                            className="group"
                        >
                            <div className="card p-3 sm:p-6 h-full flex flex-col items-center text-center">
                                <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-[var(--accent-primary)]/10 flex items-center justify-center mb-2 sm:mb-4 text-[var(--accent-primary)] group-hover:scale-110 transition-transform [&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-8 sm:[&>svg]:h-8">
                                    {getCategoryIcon(category.slug)}
                                </div>
                                <h2 className="text-sm sm:text-xl font-bold text-[var(--text-primary)] mb-1 sm:mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                                    {category.name}
                                </h2>
                                <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                                    {category.count} artikel
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
