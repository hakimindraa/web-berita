import Link from 'next/link';
import Image from 'next/image';
import { categories } from '../data/news';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative mt-20 overflow-hidden">
            {/* Gradient Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent-primary)]/5 to-[var(--bg-surface)]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--accent-primary)]/10 blur-[120px] rounded-full" />


            {/* Main Footer */}
            <div className="relative bg-gray-100 border-t border-gray-200 pt-12 pb-8">
                <div className="container">
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
                        {/* Brand - Takes 2 columns */}
                        <div className="col-span-2">
                            <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
                                <div className="relative w-11 h-11">
                                    <Image
                                        src="/logo.png"
                                        alt="Faktara Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="font-bold text-xl tracking-tight">
                                    <span className="text-red-600">Fak</span>
                                    <span className="text-black">tara</span>
                                </span>
                            </Link>
                            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6 max-w-xs">
                                Sumber berita terpercaya untuk informasi terkini seputar politik, ekonomi, teknologi, dan berbagai topik menarik lainnya.
                            </p>

                            {/* Social Media */}
                            <div className="flex gap-2">
                                {[
                                    { name: 'Twitter', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z', color: '#1DA1F2' },
                                    { name: 'Facebook', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z', color: '#1877F2' },
                                    { name: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z', color: '#E4405F' },
                                    { name: 'YouTube', icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z', color: '#FF0000' },
                                    { name: 'TikTok', icon: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z', color: '#000000' },
                                ].map((social) => (
                                    <a
                                        key={social.name}
                                        href="#"
                                        className="w-10 h-10 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-white hover:border-transparent transition-all group/social"
                                        style={{ '--hover-color': social.color } as React.CSSProperties}
                                        aria-label={social.name}
                                    >
                                        <svg className="w-4 h-4 group-hover/social:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                            <path d={social.icon} />
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Kategori */}
                        <div className="col-span-1">
                            <h4 className="font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]"></span>
                                Kategori
                            </h4>
                            <ul className="space-y-2.5">
                                {categories.slice(0, 6).map((category) => (
                                    <li key={category.id}>
                                        <Link
                                            href={`/kategori/${category.slug}`}
                                            className="text-sm text-[var(--text-muted)] hover:text-[var(--accent-primary)] hover:translate-x-1 transition-all inline-flex items-center gap-1 group"
                                        >
                                            <span>{category.name}</span>
                                            <svg className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Navigasi */}
                        <div className="col-span-1">
                            <h4 className="font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)]"></span>
                                Navigasi
                            </h4>
                            <ul className="space-y-2.5">
                                {[
                                    { href: '/', label: 'Beranda' },
                                    { href: '/trending', label: 'Trending' },
                                    { href: '/cari', label: 'Pencarian' },
                                    { href: '#', label: 'Tentang Kami' },
                                    { href: '#', label: 'Kontak' },
                                    { href: '#', label: 'Karir' },
                                ].map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-[var(--text-muted)] hover:text-[var(--accent-primary)] hover:translate-x-1 transition-all inline-flex items-center gap-1 group"
                                        >
                                            <span>{link.label}</span>
                                            <svg className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal */}
                        <div className="col-span-1">
                            <h4 className="font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-success)]"></span>
                                Legal
                            </h4>
                            <ul className="space-y-2.5">
                                {[
                                    { href: '#', label: 'Kebijakan Privasi' },
                                    { href: '#', label: 'Syarat & Ketentuan' },
                                    { href: '#', label: 'Pedoman Media' },
                                    { href: '#', label: 'Disclaimer' },
                                ].map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-[var(--text-muted)] hover:text-[var(--accent-primary)] hover:translate-x-1 transition-all inline-flex items-center gap-1 group"
                                        >
                                            <span>{link.label}</span>
                                            <svg className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Download App */}
                        <div className="col-span-1">
                            <h4 className="font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-warning)]"></span>
                                Download App
                            </h4>
                            <div className="space-y-3">
                                <a href="#" className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)] hover:border-[var(--border-light)] hover:bg-[var(--bg-hover)] transition-all group">
                                    <svg className="w-7 h-7 text-[var(--text-secondary)] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                    </svg>
                                    <div>
                                        <div className="text-[10px] text-[var(--text-muted)]">Download on the</div>
                                        <div className="text-sm font-semibold text-[var(--text-primary)]">App Store</div>
                                    </div>
                                </a>
                                <a href="#" className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)] hover:border-[var(--border-light)] hover:bg-[var(--bg-hover)] transition-all group">
                                    <svg className="w-7 h-7 text-[var(--text-secondary)] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z" />
                                    </svg>
                                    <div>
                                        <div className="text-[10px] text-[var(--text-muted)]">Get it on</div>
                                        <div className="text-sm font-semibold text-[var(--text-primary)]">Google Play</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-[var(--border-color)] mt-12 pt-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                                <span>© {currentYear} Faktara.</span>
                                <span className="hidden md:inline">•</span>
                                <span>Dibuat dengan</span>
                                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                                <span>di Indonesia</span>
                            </div>
                            <div className="flex items-center gap-6 text-sm">
                                <span className="text-[var(--text-muted)]">Bahasa:</span>
                                <button className="flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                                    <span>🇮🇩</span>
                                    <span>Indonesia</span>
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
