import prisma from '@/lib/db';
import CategoryManager from '../components/CategoryManager';

export const dynamic = 'force-dynamic';

async function getCategories() {
    return prisma.category.findMany({
        include: {
            _count: {
                select: { articles: true }
            }
        },
        orderBy: { name: 'asc' }
    });
}

export default async function CategoriesPage() {
    const categories = await getCategories();

    return <CategoryManager initialCategories={categories} />;
}
