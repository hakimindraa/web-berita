'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        // Skip auth check for login page
        if (pathname === '/admin/login') {
            setIsAuthenticated(true);
            return;
        }

        // Check if user is authenticated
        const auth = localStorage.getItem('adminAuth');
        if (auth === 'true') {
            setIsAuthenticated(true);
        } else {
            router.push('/admin/login');
        }
    }, [pathname, router]);

    const handleLogout = () => {
        localStorage.removeItem('adminAuth');
        localStorage.removeItem('adminEmail');
        router.push('/admin/login');
    };

    // Show loading while checking auth
    if (isAuthenticated === null) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="flex items-center gap-3">
                    <svg className="animate-spin w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span className="text-gray-600">Memuat...</span>
                </div>
            </div>
        );
    }

    // For login page, just render children without header
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Admin Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-14">
                        <div className="flex items-center gap-8">
                            <Link href="/admin" className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                    </svg>
                                </div>
                                <span className="font-bold text-gray-900">Admin Panel</span>
                            </Link>

                            <nav className="hidden md:flex items-center gap-1">
                                <Link
                                    href="/admin"
                                    className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${pathname === '/admin' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:text-gray-900'}`}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/admin/articles"
                                    className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${pathname.includes('/admin/articles') ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:text-gray-900'}`}
                                >
                                    Artikel
                                </Link>
                                <Link
                                    href="/admin/categories"
                                    className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${pathname === '/admin/categories' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:text-gray-900'}`}
                                >
                                    Kategori
                                </Link>
                            </nav>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link
                                href="/"
                                className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                Lihat Situs
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-sm text-red-600 hover:text-red-700 font-medium"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-6">
                {children}
            </main>
        </div>
    );
}
