'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface SearchResult {
    id: string;
    title: string;
    slug: string;
    image: string;
    category: {
        name: string;
        slug: string;
    };
}

export default function SearchAutocomplete() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const searchArticles = async () => {
            if (query.length < 2) {
                setResults([]);
                setIsOpen(false);
                return;
            }

            setIsLoading(true);
            try {
                const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=5`);
                const data = await response.json();
                setResults(data.articles || []);
                setIsOpen(true);
            } catch (error) {
                console.error('Search error:', error);
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        };

        const debounce = setTimeout(searchArticles, 300);
        return () => clearTimeout(debounce);
    }, [query]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            window.location.href = `/cari?q=${encodeURIComponent(query.trim())}`;
        }
    };

    const highlightText = (text: string, highlight: string) => {
        if (!highlight.trim()) return text;
        const regex = new RegExp(`(${highlight})`, 'gi');
        const parts = text.split(regex);
        return parts.map((part, i) =>
            regex.test(part) ? <mark key={i} className="bg-yellow-200">{part}</mark> : part
        );
    };

    return (
        <div ref={wrapperRef} className="relative flex-1 max-w-md">
            <form onSubmit={handleSubmit}>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Cari berita..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full h-10 pl-10 pr-4 rounded-lg bg-gray-100 border border-gray-300 text-xs md:text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-colors"
                    />
                    <svg
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    {isLoading && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <div className="w-4 h-4 border-2 border-gray-300 border-t-red-600 rounded-full animate-spin"></div>
                        </div>
                    )}
                </div>
            </form>

            {/* Autocomplete Dropdown */}
            {isOpen && results.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                    {results.map((article) => (
                        <Link
                            key={article.id}
                            href={`/berita/${article.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="flex gap-3 p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                        >
                            <div className="relative w-16 h-12 shrink-0 rounded overflow-hidden">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs md:text-sm font-medium text-gray-900 line-clamp-2">
                                    {highlightText(article.title, query)}
                                </p>
                                <span className="text-[10px] md:text-xs text-red-600 font-semibold uppercase">
                                    {article.category.name}
                                </span>
                            </div>
                        </Link>
                    ))}
                    <Link
                        href={`/cari?q=${encodeURIComponent(query)}`}
                        onClick={() => setIsOpen(false)}
                        className="block p-3 text-center text-xs md:text-sm text-red-600 font-medium hover:bg-gray-50"
                    >
                        Lihat semua hasil untuk "{query}"
                    </Link>
                </div>
            )}

            {isOpen && query.length >= 2 && results.length === 0 && !isLoading && (
                <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 text-center text-sm text-gray-500">
                    Tidak ada hasil untuk "{query}"
                </div>
            )}
        </div>
    );
}
