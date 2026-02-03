'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simple authentication - you can replace with your own logic
        // Default credentials: admin@portal.com / admin123
        if (email === 'admin@portal.com' && password === 'admin123') {
            // Set authentication in localStorage
            localStorage.setItem('adminAuth', 'true');
            localStorage.setItem('adminEmail', email);
            router.push('/admin');
        } else {
            setError('Email atau password salah');
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2">
                        <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                        </div>
                        <span className="font-bold text-2xl">
                            <span className="text-red-600">Portal</span>
                            <span className="text-gray-900">Berita</span>
                        </span>
                    </div>
                    <p className="text-gray-600 mt-2">Admin Panel</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h1 className="text-xl font-bold text-gray-900 text-center mb-6">
                        Masuk ke Dashboard
                    </h1>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@portal.com"
                                className="w-full h-11 px-4 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full h-11 px-4 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-11 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    <span>Memproses...</span>
                                </>
                            ) : (
                                'Masuk'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-xs text-gray-500 text-center">
                            <strong>Demo:</strong> admin@portal.com / admin123
                        </p>
                    </div>
                </div>

                {/* Back Link */}
                <div className="text-center mt-6">
                    <a href="/" className="text-sm text-gray-600 hover:text-red-600">
                        ← Kembali ke Beranda
                    </a>
                </div>
            </div>
        </div>
    );
}
