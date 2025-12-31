import prisma from '@/lib/db';
import ArticleForm from '../../components/ArticleForm';

export const dynamic = 'force-dynamic';

async function getCategories() {
    return prisma.category.findMany({
        orderBy: { name: 'asc' }
    });
}

export default async function NewArticlePage() {
    const categories = await getCategories();

    // If no categories exist, show message
    if (categories.length === 0) {
        return (
            <div>
                <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-8">
                    Tambah Artikel Baru
                </h1>
                <div className="card p-8 text-center">
                    <p className="text-[var(--text-secondary)] mb-4">
                        Belum ada kategori. Silakan tambahkan kategori terlebih dahulu.
                    </p>
                    <a
                        href="/admin/categories"
                        className="btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-lg"
                    >
                        Kelola Kategori
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-8">
                Tambah Artikel Baru
            </h1>
            <div className="card p-6">
                <ArticleForm categories={categories} mode="create" />
            </div>
        </div>
    );
}
