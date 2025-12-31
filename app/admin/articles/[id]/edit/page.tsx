import { notFound } from 'next/navigation';
import prisma from '@/lib/db';
import ArticleForm from '../../../components/ArticleForm';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ id: string }>;
}

async function getArticle(id: string) {
    return prisma.article.findUnique({
        where: { id },
        include: { category: true }
    });
}

async function getCategories() {
    return prisma.category.findMany({
        orderBy: { name: 'asc' }
    });
}

export default async function EditArticlePage({ params }: PageProps) {
    const { id } = await params;
    const [article, categories] = await Promise.all([
        getArticle(id),
        getCategories()
    ]);

    if (!article) {
        notFound();
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-8">
                Edit Artikel
            </h1>
            <div className="card p-6">
                <ArticleForm
                    categories={categories}
                    initialData={{
                        id: article.id,
                        title: article.title,
                        excerpt: article.excerpt,
                        content: article.content,
                        image: article.image,
                        imageType: article.imageType,
                        author: article.author,
                        categoryId: article.categoryId,
                        readTime: article.readTime,
                        isFeatured: article.isFeatured,
                        isTrending: article.isTrending,
                    }}
                    mode="edit"
                />
            </div>
        </div>
    );
}
