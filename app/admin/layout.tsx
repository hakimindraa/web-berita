import Link from 'next/link';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[var(--bg-primary)]">
            {/* Admin Header */}
            <header className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)] sticky top-0 z-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-8">
                            <Link href="/admin" className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                    </svg>
                                </div>
                                <span className="font-bold text-[var(--text-primary)]">Admin Panel</span>
                            </Link>

                            <nav className="hidden md:flex items-center gap-6">
                                <Link
                                    href="/admin"
                                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/admin/articles"
                                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                                >
                                    Artikel
                                </Link>
                                <Link
                                    href="/admin/categories"
                                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                                >
                                    Kategori
                                </Link>
                            </nav>
                        </div>

                        <Link
                            href="/"
                            className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Lihat Situs
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
}
