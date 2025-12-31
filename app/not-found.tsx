import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '404 - Halaman Tidak Ditemukan',
};

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center py-12">
            <div className="container">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[var(--bg-surface)] mb-6">
                        <span className="text-5xl font-bold text-gradient">404</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
                        Halaman Tidak Ditemukan
                    </h1>
                    <p className="text-[var(--text-secondary)] max-w-md mx-auto mb-8">
                        Maaf, halaman yang Anda cari tidak ditemukan atau mungkin sudah dipindahkan.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link href="/" className="btn btn-primary">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Kembali ke Beranda
                        </Link>
                        <Link href="/cari" className="btn btn-ghost">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Cari Berita
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
